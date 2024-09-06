<?php

error_reporting(E_ALL);
ini_set('display_errors', 1);

$to = 'ezzibrahim.teaspoonlife@gmail.com';


$name = htmlspecialchars($_POST['name']);
$email = htmlspecialchars($_POST['email']);
$message = htmlspecialchars($_POST['message']);


$subject = 'New Feedback from ' . $name;
$body = "Name: $name\nEmail: $email\nMessage:\n$message\n";

$headers = "From: " . $email . "\r\n";
$headers .= "Reply-To: " . $email . "\r\n";
$headers .= "Content-Type: text/plain; charset=UTF-8\r\n";


if (mail($to, $subject, $body, $headers)) {
    
    echo "<p>Thank you for your feedback! We will get back to you soon.</p>";
} else {
    
    echo "<p>Sorry, there was a problem sending your feedback. Please try again later.</p>";
}
?>

