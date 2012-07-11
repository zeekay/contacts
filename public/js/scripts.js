$(document).ready(function (){

	$('#add-user').click(function(){
		$('#form').animate({top: '0px'}, 500);
		$('#overlay').fadeIn(500);
	});

	$('#form .close').click(function(){
		$('#form').animate({top: '-280px'}, 500);
		$('#overlay').fadeOut(500);
	});

});