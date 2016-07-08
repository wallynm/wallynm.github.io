$(document).ready(function() {
	location.hash = '';
	var artist = new Artist();
	
	// Loads initial artist data
	artist.fetchArtists()
	.then(function(result){
		$('#loadmore').hide();
		$('input').autocomplete({
			data: result,
			select: function(id){
				artist.selectArtist(id);
			}
		});
	})
});