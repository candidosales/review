$(document).ready(function(){
			
	$('.side-nav li').click(function(){
		$('.side-nav li').each(function(){
			$(this).removeClass('active');
		});
			$(this).addClass('active');
	});

});
