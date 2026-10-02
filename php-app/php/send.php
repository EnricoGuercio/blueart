<?php
/*
 * Invio form contatti BlueArt — adattato dalla versione precedente
 * (blueart-website/php/send.php) per essere chiamato via fetch/POST
 * dalla pagina Contatti del sito Next.js esportato staticamente.
 * Risponde sempre in JSON, non con un redirect, perché il form non è
 * un submit nativo ma una fetch lato client.
 *
 * Prima della pubblicazione:
 * - verificare che il piano hosting Aruba abbia la funzione mail() attiva;
 * - configurare un indirizzo mittente reale e coerente con il dominio;
 * - valutare CAPTCHA, consenso privacy e logiche antispam più robuste;
 * - questo endpoint non è mai stato testato contro un server PHP reale.
 */

declare(strict_types=1);

header('Content-Type: application/json; charset=UTF-8');

function respond(int $status, bool $ok, string $message): never
{
    http_response_code($status);
    echo json_encode(['ok' => $ok, 'message' => $message]);
    exit;
}

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    respond(405, false, 'Metodo non consentito.');
}

// Honeypot antispam: il campo deve restare vuoto per gli utenti reali.
if (!empty($_POST['company'])) {
    respond(200, true, 'Richiesta ricevuta.');
}

function clean_field(string $value): string
{
    $value = trim($value);
    $value = str_replace(["\r", "\n"], ' ', $value);
    return strip_tags($value);
}

$name = clean_field($_POST['name'] ?? '');
$email = filter_var(trim($_POST['email'] ?? ''), FILTER_VALIDATE_EMAIL);
$message = trim($_POST['message'] ?? '');

if ($name === '' || !$email || $message === '') {
    respond(422, false, 'Compila tutti i campi obbligatori e riprova.');
}

$recipient = 'info@blueart.media';
$sender = 'info@blueart.media'; // Su Aruba può essere necessario usare una casella esistente del dominio.
$subject = 'Nuova richiesta dal sito BlueArt';

$body = "Nuova richiesta dal sito BlueArt\n\n";
$body .= "Nome: {$name}\n";
$body .= "Email: {$email}\n\n";
$body .= "Messaggio:\n" . trim($message) . "\n";

$headers = [
    'From: BlueArt Website <' . $sender . '>',
    'Reply-To: ' . $email,
    'Content-Type: text/plain; charset=UTF-8',
];

$sent = mail($recipient, $subject, $body, implode("\r\n", $headers));

if ($sent) {
    respond(200, true, 'Messaggio inviato correttamente.');
}

respond(500, false, 'Invio non riuscito. Scrivi direttamente a info@blueart.media.');
