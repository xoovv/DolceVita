 <?php
	define("CONTACT_FORM", 'group_metropolis@yahoo.com');
	
 
	function ValidateEmail($value){
		$regex = '/^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i';
 
		if($value == '') { 
			return false;
		} else {
			$string = preg_replace($regex, '', $value);
		}
 
		return empty($string) ? true : false;
	}
 
	$post = (!empty($_POST)) ? true : false;
 
	if($post){
 
		$name = stripslashes($_POST['name']);
		$surname = stripslashes($_POST['surname']);
		$phone = stripslashes($_POST['phone']);
		$email = stripslashes($_POST['email']);
		$subject = 'Заявка';
		$error = '';	
		$message = '
			<html>
					<head>
							<title></title>
					</head>
					<body>
							<p>Имя: '.$name.'</p>
							<p>Фамилия: '.$surname.'</p>
							<p>Телефон : '.$phone.'</p>	
							<p>Email : '.$email.'</p>
					</body>
			</html>';
 
		if (!ValidateEmail($email)){
			$error = 'Поля форми незаповненні!';
		}
 
		if(!$error){
			$mail = mail(CONTACT_FORM, $subject, $message,
			     "From: ".$name." <".$email.">\r\n"
			    ."Reply-To: ".$email."\r\n"
			    ."Content-type: text/html; charset=utf-8 \r\n"
			    ."X-Mailer: PHP/" . phpversion());
 
			if($mail){
				echo 'OK';
			}
		}else{
			echo '<div class="bg-danger">'.$error.'</div>';
		}
 
	}
?>