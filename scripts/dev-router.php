<?php
// Solo per prove in locale con il server integrato di PHP (che non legge
// .htaccess):  php -S localhost:8000 -t out scripts/dev-router.php
$path = parse_url($_SERVER['REQUEST_URI'], PHP_URL_PATH) ?: '/';
$root = __DIR__ . '/../out';

if (preg_match('#^/blog/?$#', $path)) { $_GET['slug'] = ''; require $root . '/blog.php'; return true; }
if (preg_match('#^/blog/([a-z0-9-]+)/?$#', $path, $m)) { $_GET['slug'] = $m[1]; require $root . '/blog.php'; return true; }
if (preg_match('#^/eventi/?$#', $path)) { require $root . '/eventi.php'; return true; }

// niente accesso web a cartelle protette (come farebbe .htaccess)
if (preg_match('#^/(inc|data|seed)/#', $path) || preg_match('#^/pannello-redazione/_#', $path)) {
    http_response_code(403); echo 'Forbidden'; return true;
}
// in uploads/ non si esegue mai PHP
if (preg_match('#^/uploads/.*\.(php\d?|phtml|phar)$#i', $path)) { http_response_code(403); echo 'Forbidden'; return true; }
return false; // file statici e index.php/index.html: ci pensa il server
