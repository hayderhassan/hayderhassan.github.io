<?php

if(isset($_POST['action']) && $_POST['action'] == 'sendmessage'){

  $name = filter_input(INPUT_POST, 'name', FILTER_SANITIZE_STRING);
  if (!$name) {
    echo "Please enter your name";
    exit;
  }

  $email = filter_input(INPUT_POST, 'email', FILTER_VALIDATE_EMAIL);
  if (!$email) {
    echo "Please enter a valid email address";
    exit;
  }

  $message = filter_input(INPUT_POST, 'message', FILTER_SANITIZE_STRING);
  if (!$message) {
    echo "Please enter your message";
    exit;
  }

  $to = "contact@hayderhassan.co.uk";
  $from = $_POST['email'];
  $name = $_POST['name'];
  $subject = "Message from hayderhassan.co.uk";
  $message = $name . " has sent the following message:" . "\n\n" . $_POST['message'];
  $headers = "From:" . $from;

  if (mail($to,$subject,$message,$headers)) {
    echo "Thanks for your message! I will be in contact with you soon.";
  } else {
    echo "Sorry there seems to be a problem. Please check you have entered the correct email address and try again.";
  }

    }
?>
