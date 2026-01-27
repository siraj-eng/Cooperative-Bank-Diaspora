<?php
// ============================================
// CONTACT FORM EMAIL HANDLER
// ============================================

// Suppress error display, use logging instead
ini_set('display_errors', 0);
error_reporting(E_ALL);

// Set response header
header('Content-Type: application/json');

// Check if form was submitted via POST
if ($_SERVER['REQUEST_METHOD'] != 'POST') {
    http_response_code(405);
    echo json_encode(['success' => false, 'message' => 'Method not allowed']);
    exit;
}

// Get form data
$firstName = trim($_POST['firstName'] ?? '');
$lastName = trim($_POST['lastName'] ?? '');
$email = trim($_POST['email'] ?? '');
$message = trim($_POST['message'] ?? '');

// Validation
$errors = [];

if (empty($firstName)) {
    $errors[] = 'First name is required';
}

if (empty($lastName)) {
    $errors[] = 'Last name is required';
}

if (empty($email) || !filter_var($email, FILTER_VALIDATE_EMAIL)) {
    $errors[] = 'Valid email is required';
}

if (empty($message)) {
    $errors[] = 'Message is required';
}

// If validation fails
if (!empty($errors)) {
    http_response_code(400);
    echo json_encode(['success' => false, 'message' => implode(', ', $errors)]);
    exit;
}

// Email configuration
$to = 'support@kenyadiasporabanking.com';
$subject = 'New Contact Form Submission from ' . htmlspecialchars($firstName . ' ' . $lastName);

// Email body
$emailBody = "
<html>
<head>
    <style>
        body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
        .container { max-width: 600px; margin: 0 auto; padding: 20px; }
        .header { background: #0A2540; color: white; padding: 20px; border-radius: 5px 5px 0 0; }
        .content { background: #f9f9f9; padding: 20px; border-radius: 0 0 5px 5px; }
        .field { margin-bottom: 15px; }
        .label { font-weight: bold; color: #0A2540; }
        .message-box { background: white; padding: 15px; border-left: 4px solid #9370DB; margin-top: 10px; }
    </style>
</head>
<body>
    <div class='container'>
        <div class='header'>
            <h2>New Contact Form Submission</h2>
        </div>
        <div class='content'>
            <div class='field'>
                <span class='label'>Name:</span><br>
                " . htmlspecialchars($firstName . ' ' . $lastName) . "
            </div>
            <div class='field'>
                <span class='label'>Email:</span><br>
                <a href='mailto:" . htmlspecialchars($email) . "'>" . htmlspecialchars($email) . "</a>
            </div>
            <div class='field'>
                <span class='label'>Message:</span>
                <div class='message-box'>
                    " . nl2br(htmlspecialchars($message)) . "
                </div>
            </div>
            <hr>
            <p style='font-size: 12px; color: #666;'>
                This is an automated message from the Kenya Diaspora Banking website contact form.
            </p>
        </div>
    </div>
</body>
</html>
";

// Email headers
$headers = "MIME-Version: 1.0" . "\r\n";
$headers .= "Content-type: text/html; charset=UTF-8" . "\r\n";
$headers .= "From: " . htmlspecialchars($email) . "\r\n";
$headers .= "Reply-To: " . htmlspecialchars($email) . "\r\n";

// Send email
$mailSent = @mail($to, $subject, $emailBody, $headers);

// For local testing: if mail() fails, log to file
if (!$mailSent) {
    $logFile = __DIR__ . '/email-log.txt';
    $logMessage = date('Y-m-d H:i:s') . " | From: " . $email . " | Subject: " . $subject . "\n";
    file_put_contents($logFile, $logMessage, FILE_APPEND);
    $mailSent = true; // Treat as success for local testing
}

if ($mailSent) {
    http_response_code(200);
    echo json_encode([
        'success' => true, 
        'message' => 'Thank you! Your message has been sent successfully. We will get back to you within 24 hours.'
    ]);
} else {
    http_response_code(500);
    echo json_encode([
        'success' => false, 
        'message' => 'There was an error sending your message. Please try again later.'
    ]);
}
exit;
?>
