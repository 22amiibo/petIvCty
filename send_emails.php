<?php
header('Content-Type: application/json');

$data = json_decode(file_get_contents('php://input'), true);

// Validate input
if (!isset($data['firstName'], $data['lastName'], $data['email'], $data['message'])) {
    echo json_encode(['message' => 'Invalid input']);
    exit;
}

// Define recipients NOT VALID DONT USE PHP
$recipients = [
    'mbowser@dc.gov',  // Mayor Muriel Bowser
    'richard.jackson@doee.dc.gov',  // DOEE Interim Director Richard Jackson
    'brian.schwalb@dc.gov',  // Attorney General Brian Schwalb
    'shirley.kwanhui@dc.gov',  // DC DLCP Interim Director Shirley Kwan-Hui
    'pmendelson@dccouncil.us',  // Council Chairman Phil Mendelson
    // Add all the other officials' emails here
];

// Email subject and body
$subject = 'Petition to Address Environmental Injustice';
$message = str_replace('[Your Name]', $data['firstName'] . ' ' . $data['lastName'], $data['message']);
$headers = 'From: ' . $data['email'] . "\r\n" .
           'Reply-To: ' . $data['email'] . "\r\n" .
           'X-Mailer: PHP/' . phpversion();

// Send email to each recipient
foreach ($recipients as $recipient) {
    mail($recipient, $subject, $message, $headers);
}

// Respond to front-end
echo json_encode(['message' => 'Your petition has been sent to all officials!']);
?>
