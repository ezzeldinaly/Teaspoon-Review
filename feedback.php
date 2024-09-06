<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Feedback Form</title>
    <link rel="icon" type="image/x-icon" href="img/favicon.ico">
    <link rel="stylesheet" href="style.css">
</head>
<body>
    <div class="container">
        <h1>We Value Your Feedback</h1>

        <?php
        $message = '';
        $error = '';

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
                $message = "<p class='success'>Thank you for your feedback! We will get back to you soon.</p>";
            } else {
                $error = "<p class='error'>Sorry, there was a problem sending your feedback. Please try again later.</p>";
            }
        }
        ?>

        <?php if ($message): ?>
            <?php echo $message; ?>
        <?php elseif ($error): ?>
            <?php echo $error; ?>
        <?php endif; ?>

        <form action="feedback.php" method="post">
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