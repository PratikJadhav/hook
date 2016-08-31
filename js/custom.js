/*Functions for coming soon */
$(document).ready(function(){
	
	
	$('#getNotified1,#getNotified2').click(function(){
		// update user interface
		//$('#response').html('Adding email address...');
		if($(this).attr('id')=='getNotified1'){
			var email = $('#notifiedEmail1').val();
		}else{
			var email = $('#notifiedEmail2').val();
		}		
		
		if(validateEmail(email)) {
			$.gritter.add({
				// (string | mandatory) the heading of the notification
				title: 'Adding email address...',
				// (string | mandatory) the text inside the notification
				text: 'Hold on while we process your request'
			});
			// Prepare query string and send AJAX request
			$.ajax({
				url: 'mailchimp/store-address.php',
				data: 'ajax=true&email=' + escape(email),
				dataType: 'json',
				success: function(data) { console.log(data);
					//$('#response').html(msg);
					$.gritter.add({
						// (string | mandatory) the heading of the notification
						title: data.title,
						// (string | mandatory) the text inside the notification
						text: data.msg
					});

				}
			});
			$('#getNotified').focusout();
			if($(this).attr('id')=='getNotified1'){
				$('#notifiedEmail1').val('').focus();
			}else{
				$('#notifiedEmail2').val('').focus();
			}
			return false;
		}else{
			$.gritter.add({
				// (string | mandatory) the heading of the notification
				title: 'Invalid email-id',
				// (string | mandatory) the text inside the notification
				text: 'The email-id you provided is invalid, Please provide a valid email-id'
			});
		}
	});
	
	//alert('window width : '+$(window).width()+' document width : '+$(document).width()+' window height : '+$(window).height()+' document height : '+$(document).height());
	
	$('#secondPageBtn').on('click',function(){ 
		$('#notifiedEmail1').focus();
	});
});

function validateEmail(email) {
  var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(email);
}
