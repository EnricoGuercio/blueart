<?php
declare(strict_types=1);
require __DIR__ . '/_auth.php';
panel_headers();
panel_session();
require_post_csrf();
do_logout();
header('Location: /pannello-redazione/login.php');
exit;
