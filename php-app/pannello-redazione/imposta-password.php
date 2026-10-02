<?php
/*
 * Imposta (o reimposta) utente e password del pannello. SOLO da riga di
 * comando, mai dal web:
 *
 *     php imposta-password.php [utente]
 *
 * Crea data/admin.php con l'hash della password. Poi il file va caricato sul
 * server nella cartella data/ (insieme al resto del sito). La password
 * non viene mai salvata in chiaro, solo il suo hash.
 */
declare(strict_types=1);

if (PHP_SAPI !== 'cli') {
    http_response_code(404);
    exit;
}

$user = $argv[1] ?? 'redazione';
fwrite(STDOUT, "Nuova password per l'utente \"$user\" (minimo 10 caratteri): ");
@shell_exec('stty -echo');
$pw = rtrim((string) fgets(STDIN), "\r\n");
@shell_exec('stty echo');
fwrite(STDOUT, "\nRipeti la password: ");
@shell_exec('stty -echo');
$pw2 = rtrim((string) fgets(STDIN), "\r\n");
@shell_exec('stty echo');
fwrite(STDOUT, "\n");

if (strlen($pw) < 10 || $pw !== $pw2) {
    fwrite(STDERR, "Password troppo corta o diversa dalla ripetizione. Niente è stato salvato.\n");
    exit(1);
}

$dir = dirname(__DIR__) . '/data';
if (!is_dir($dir) && !mkdir($dir, 0755, true)) {
    fwrite(STDERR, "Impossibile creare $dir\n");
    exit(1);
}
$php = "<?php\n// Generato da imposta-password.php. Contiene solo l'hash della password.\nreturn "
    . var_export(['user' => $user, 'hash' => password_hash($pw, PASSWORD_DEFAULT)], true) . ";\n";
file_put_contents($dir . '/admin.php', $php);
@chmod($dir . '/admin.php', 0600);
fwrite(STDOUT, "Fatto: $dir/admin.php\nCaricalo sul server in data/admin.php.\n");
