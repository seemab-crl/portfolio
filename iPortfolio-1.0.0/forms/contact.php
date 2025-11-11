<?php
// Simple contact form handler for iPortfolio template
// - Set $receiving_email_address to the email that should receive messages.
// - This script echoes "OK" on success (matches template validate.js behavior),
//   otherwise echoes an error string.

$receiving_email_address = 'muhammadmuddasir883@gmail.com'; // <-- change to your email

// Only accept POST
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo 'Invalid request method';
    exit;
}

// Read and sanitize inputs
$name    = trim(filter_input(INPUT_POST, 'name', FILTER_SANITIZE_STRING) ?? '');
$email   = trim(filter_input(INPUT_POST, 'email', FILTER_SANITIZE_EMAIL) ?? '');
$subject = trim(filter_input(INPUT_POST, 'subject', FILTER_SANITIZE_STRING) ?? 'Website Contact');
$message = trim(filter_input(INPUT_POST, 'message', FILTER_SANITIZE_STRING) ?? '');

// Basic validation
if (empty($name) || empty($email) || empty($message)) {
    http_response_code(400);
    echo 'Please fill in all required fields.';
    exit;
}
if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    http_response_code(400);
    echo 'Invalid email address.';
    exit;
}

// Prepare email
$headers  = "From: " . mb_encode_mimeheader($name) . " <{$email}>\r\n";
$headers .= "Reply-To: {$email}\r\n";
$headers .= "MIME-Version: 1.0\r\n";
$headers .= "Content-Type: text/plain; charset=UTF-8\r\n";

$body = "Name: {$name}\n";
$body .= "Email: {$email}\n";
$body .= "Subject: {$subject}\n\n";
$body .= "Message:\n{$message}\n";

// Try to send using mail().
// For production use SMTP (PHPMailer) if mail() is unreliable.
$success = @mail($receiving_email_address, $subject, $body, $headers);

if ($success) {
    // Template validate.js expects 'OK' to show success
    echo 'OK';
    exit;
} else {
    http_response_code(500);
    echo 'Could not send email. Configure your PHP mail settings or use SMTP.';
    exit;
}
?>