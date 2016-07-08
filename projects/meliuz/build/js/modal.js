$(document).ready(function(){
	// All the modal functions its by JS, this event only handle backdrop closing
	$('.backdrop').on('click', function(e) {
  	location.hash = '';
	});
});