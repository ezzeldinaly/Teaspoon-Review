<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $to = 'ezzibrahim.teaspoonlife@gmail.com';
    $name = htmlspecialchars($_POST['name']);
    $email = htmlspecialchars($_POST['email']);
    $feedback = htmlspecialchars($_POST['message']);

    $subject = 'New Feedback from ' . $name;

    $headers = "From: " . $email . "\r\n";
    $headers .= "Reply-To: " . $email . "\r\n";
    $headers .= "Content-Type: text/plain; charset=UTF-8\r\n";

    $body = "Name: $name\n";
    $body .= "Email: $email\n";
    $body .= "Message:\n$feedback\n";

    if (mail($to, $subject, $body, $headers)) {
        echo "<p class='success'>Thank you for your feedback! We will get back to you soon.</p>";
    } else {
        echo "<p class='error'>Sorry, there was a problem sending your feedback. Please try again later.</p>";
    }
}
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Feedback Form</title>
    <link rel="icon" type="image/x-icon" href="img/favicon.ico">
    <link rel="stylesheet" href="style.css">
    <style>
        .success {
            color: green;
        }
        .error {
            color: red;
        }
        .container {
            max-width: 600px;
            margin: auto;
            padding: 20px;
            border: 1px solid #ccc;
            border-radius: 5px;
            box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
            background: #fff;
        }
        label, input, textarea, .home-button {
            display: block;
            width: 100%;
            margin-bottom: 10px;
        }
        input[type="submit"] {
            background-color: #4CAF50;
            color: white;
            border: none;
            padding: 10px;
            border-radius: 5px;
            cursor: pointer;
        }
        input[type="submit"]:hover {
            background-color: #45a049;
        }
        .home-button {
            text-decoration: none;
            color: #007BFF;
            font-size: 16px;
            text-align: center;
        }
        .home-button:hover {
            text-decoration: underline;
        }
    </style>
</head>
<body>
    <div class="container">
        <h1>We Value Your Feedback</h1>
        <form id="feedbackForm" method="post" action="">
            <label for="name">Name:</label>
            <input type="text" id="name" name="name" required>
            
            <label for="email">Email:</label>
            <input type="email" id="email" name="email" required>
            
            <label for="message">Your Feedback:</label>
            <textarea id="message" name="message" rows="5" required></textarea>
            
            <input type="submit" value="Send Feedback">
        </form>
        <a href="mainpage.html" class="home-button">Return to Home</a>
    </div>
</body>
</html>

