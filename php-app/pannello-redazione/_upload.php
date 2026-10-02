<?php
/*
 * Upload immagini dal pannello.
 * - il tipo si decide dal CONTENUTO del file (finfo + getimagesize), mai
 *   dall'estensione o dal tipo dichiarato dal browser;
 * - solo JPEG/PNG/WebP (niente SVG/GIF: possono contenere script);
 * - se c'è GD l'immagine viene ricodificata (elimina ogni dato nascosto nel
 *   file) e ridimensionata a 1600px; senza GD si salva il file validato così
 *   com'è, e comunque uploads/.htaccess impedisce l'esecuzione di codice.
 */
declare(strict_types=1);

const UPLOAD_MAX_BYTES = 8 * 1024 * 1024;
const UPLOAD_MAX_SIDE = 1600;
const UPLOAD_MAX_PIXELS = 25000000;

/** @return array{path:?string, error:?string} path = null e error = null se nessun file inviato */
function handle_image_upload(string $field, string $subdir): array
{
    if (!isset($_FILES[$field]) || !is_array($_FILES[$field])) {
        return ['path' => null, 'error' => null];
    }
    $f = $_FILES[$field];
    $code = (int) ($f['error'] ?? UPLOAD_ERR_NO_FILE);
    if ($code === UPLOAD_ERR_NO_FILE) {
        return ['path' => null, 'error' => null];
    }
    if ($code === UPLOAD_ERR_INI_SIZE || $code === UPLOAD_ERR_FORM_SIZE) {
        return ['path' => null, 'error' => 'L’immagine è troppo pesante (massimo 8 MB).'];
    }
    if ($code !== UPLOAD_ERR_OK) {
        return ['path' => null, 'error' => 'Caricamento non riuscito, riprova.'];
    }
    $tmp = (string) $f['tmp_name'];
    if (!is_uploaded_file($tmp)) {
        return ['path' => null, 'error' => 'Caricamento non valido.'];
    }
    if ((int) $f['size'] > UPLOAD_MAX_BYTES) {
        return ['path' => null, 'error' => 'L’immagine è troppo pesante (massimo 8 MB).'];
    }

    $allowed = ['image/jpeg' => 'jpg', 'image/png' => 'png', 'image/webp' => 'webp'];

    $info = @getimagesize($tmp);
    if ($info === false || !isset($allowed[$info['mime'] ?? ''])) {
        return ['path' => null, 'error' => 'Il file non è un’immagine valida. Usa una foto JPG, PNG o WebP.'];
    }
    $mime = (string) $info['mime'];
    if (class_exists('finfo')) {
        $fi = new finfo(FILEINFO_MIME_TYPE);
        if ($fi->file($tmp) !== $mime) {
            return ['path' => null, 'error' => 'Il file non è un’immagine valida. Usa una foto JPG, PNG o WebP.'];
        }
    }
    [$w, $h] = [(int) $info[0], (int) $info[1]];
    if ($w < 1 || $h < 1 || $w * $h > UPLOAD_MAX_PIXELS) {
        return ['path' => null, 'error' => 'L’immagine ha dimensioni eccessive.'];
    }

    $dir = UPLOAD_DIR . '/' . $subdir;
    if (!is_dir($dir) && !@mkdir($dir, 0755, true)) {
        return ['path' => null, 'error' => 'Cartella di caricamento non scrivibile.'];
    }
    $ext = $allowed[$mime];
    $base = date('Ymd') . '-' . bin2hex(random_bytes(5));
    $dest = $dir . '/' . $base . '.' . $ext;

    if (function_exists('imagecreatetruecolor')) {
        $src = null;
        if ($mime === 'image/jpeg' && function_exists('imagecreatefromjpeg')) {
            $src = @imagecreatefromjpeg($tmp);
        } elseif ($mime === 'image/png' && function_exists('imagecreatefrompng')) {
            $src = @imagecreatefrompng($tmp);
        } elseif ($mime === 'image/webp' && function_exists('imagecreatefromwebp')) {
            $src = @imagecreatefromwebp($tmp);
        }
        if ($src) {
            if ($mime === 'image/jpeg' && function_exists('exif_read_data')) {
                $exif = @exif_read_data($tmp);
                $o = (int) ($exif['Orientation'] ?? 1);
                $angle = [3 => 180, 6 => -90, 8 => 90][$o] ?? 0;
                if ($angle !== 0 && ($rot = imagerotate($src, $angle, 0))) {
                    $src = $rot;
                }
            }
            $sw = imagesx($src);
            $sh = imagesy($src);
            $scale = min(1.0, UPLOAD_MAX_SIDE / max($sw, $sh));
            $nw = max(1, (int) round($sw * $scale));
            $nh = max(1, (int) round($sh * $scale));
            $out = imagecreatetruecolor($nw, $nh);
            if ($mime !== 'image/jpeg') {
                imagealphablending($out, false);
                imagesavealpha($out, true);
            }
            imagecopyresampled($out, $src, 0, 0, 0, 0, $nw, $nh, $sw, $sh);
            $ok = false;
            if ($mime === 'image/jpeg') {
                $ok = imagejpeg($out, $dest, 82);
            } elseif ($mime === 'image/png') {
                $ok = imagepng($out, $dest, 7);
            } else {
                $ok = function_exists('imagewebp') && imagewebp($out, $dest, 80);
            }
            // variante WebP leggera accanto a JPG/PNG (se supportata)
            if ($ok && $ext !== 'webp' && function_exists('imagewebp')) {
                @imagewebp($out, $dir . '/' . $base . '.webp', 78);
            }
            if (PHP_VERSION_ID < 80000) { // da PHP 8 le risorse GD si liberano da sole
                imagedestroy($out);
                imagedestroy($src);
            }
            if ($ok) {
                @chmod($dest, 0644);
                return ['path' => 'uploads/' . $subdir . '/' . $base . '.' . $ext, 'error' => null];
            }
            @unlink($dest);
            return ['path' => null, 'error' => 'Non sono riuscito a elaborare l’immagine.'];
        }
    }

    // Senza GD (o formato non gestito): si salva il file già validato.
    if (!@move_uploaded_file($tmp, $dest)) {
        return ['path' => null, 'error' => 'Non sono riuscito a salvare l’immagine.'];
    }
    @chmod($dest, 0644);
    return ['path' => 'uploads/' . $subdir . '/' . $base . '.' . $ext, 'error' => null];
}

/** Elimina un'immagine caricata dal pannello (mai le immagini del sito). */
function delete_upload(string $path): void
{
    if (!preg_match('#^uploads/(blog|eventi)/[A-Za-z0-9._-]+\.(jpg|png|webp)$#', $path)) {
        return;
    }
    @unlink(SITE_ROOT . '/' . $path);
    $webp = preg_replace('/\.(jpg|png)$/', '.webp', $path);
    if ($webp && $webp !== $path) {
        @unlink(SITE_ROOT . '/' . $webp);
    }
}
