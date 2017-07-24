<?php
	// Check for empty fields
	if(empty($_POST['name']) || empty($_POST['email']) || empty($_POST['phone']) || empty($_POST['message']) || !filter_var($_POST['email'],FILTER_VALIDATE_EMAIL)) {
	   		echo "Element non indiqué!";
	   		return false;
	}
	   
	$name = strip_tags(htmlspecialchars($_POST['name']));
	$email_address = strip_tags(htmlspecialchars($_POST['email']));
	$phone = strip_tags(htmlspecialchars($_POST['phone']));
	$message = strip_tags(htmlspecialchars($_POST['message']));
	   
	// Create the email and send the message
	$to = 'michelgolfier@sfr.fr'; // Add your email address inbetween the '' replacing yourname@yourdomain.com - This is where the form will send a message to.
	$email_subject = "Formulaire de contact:  $name";
	$email_body = "Tu as reçu un nouveau message.\n\n"."Voici les détails:\n\nNom: $name\n\nEmail: $email_address\n\nNuméro: $phone\n\nMessage:\n$message";
	$headers = "From: noreply@creatb.gq\n"; // This is the email address the generated message will be from. We recommend using something like noreply@yourdomain.com.
	$headers .= "Reply-To: $email_address"; 

	mail($to,$email_subject,$email_body,$headers);

	return true;         
?>