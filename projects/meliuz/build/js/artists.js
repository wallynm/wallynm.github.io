(function($) {
	/**
	 * Artist object, fetch data from API, 
	 * render user template and control event bindings
	 */
	window.Artist = function(){
		var self = this;
		var albumListTpl = '<li class="album clearfix"><div class="album-image"><img src="public/images/220px-Slanted_and_Enchanted_album_cover.jpg"></div><div class="album-title ellipsis">Brighten the corners</div><div class="album-year"></div></li>';
		var loadingTpl   = '<div class="loading"></div>';

		var $elAlbumList = $('ul.album-listing');
		var $loadMore = $('#loadmore');

		this.artists = [];
		this.albums = [];
		this.selectedAlbum = undefined;

		// Basic UI bindings
		$elAlbumList.on('click', 'li', function(){
			self.setAlbumDetail($(this).data('id'));
			self.openModal();
		});

		$loadMore.on('click', function(){
			self.loadMoreAlbums();
		});

		/**
		 * Opnes modal 
		 */
		this.openModal = function(){
			location.hash = 'album-detail';
		};

		/**
		 * Updates modal data based on the albumId passed
		 * @param {Int} albumId - AlbumId clicked
		 */
		this.setAlbumDetail = function(albumId){
			$albumModal = $('#album-detail');
			var clickedAlbum = self.albums[albumId];
			var artist = $.grep(self.artists, function( indx ) {
        return indx.id === self.selectedAlbum;
      })[0];

			// Updates modal data based on loaded albums
			$albumModal.find('.album-artist').text(artist.name);
			$albumModal.find('.album-image img').attr('src', clickedAlbum.cover_url);
			$albumModal.find('.album-title').text(clickedAlbum.title);
			$albumModal.find('.album-year').text(clickedAlbum.release_year);
			$albumModal.find('.album-info').text(clickedAlbum.info);
		};

		/**
		 * Feths artist from server to populate autocomplete
		 */
		this.fetchArtists = function(){
			var $defer = $.Deferred();
			$.get('http://private-047f-meliuztestefrontend.apiary-mock.com/artists').then(function(result){
				self.artists = result;
				$defer.resolve(result);
			});

			return $defer;
		};

		/**
		 * Fetch albums from server based on artistId
		 * @param  {Int} id - ArtistId to fetch from server
		 */
		this.fetchAlbums = function(id) {
			var $defer = $.Deferred();
			$.get('http://private-047f-meliuztestefrontend.apiary-mock.com/artists/'+id+'/discography').then(function(result){
				$defer.resolve(result);
				self.albums = result;
			});

			return $defer;
		};

		/**
		 * When an artist gets selected from autcomplete
		 * it loads all the albuns related and populate them
		 */
		this.selectArtist = function(id){
			$elAlbumList.html(loadingTpl);
			self.selectedAlbum = id;

			self.fetchAlbums(id).then(function(result){
				$elAlbumList.html('');
				self.renderAlbums(result);
			});
		};

		/**
		 * Loads more albums based on ther selected artist,
		 * them render them on the list
		 */
		this.loadMoreAlbums = function(){
			$loadMore.parent().append(loadingTpl);
			$loadMore.hide();
			setTimeout(function(){
				var start = $elAlbumList.find('.album').length;
				self.renderAlbums(self.albums, start, start+5);
				$('.loading').remove();
			}, 1000);			
		}

		/**
		 * Controls albuns render on the screen
		 * @param  {Array} data  - List of albums to be rendered on the screen
		 * @param  {Int} start   - Starting index which the list should be rendered
		 * @param  {Int} end     - Ending index to finish rendering list
		 */
		this.renderAlbums = function(data, start, end) {
			start = (typeof start === 'undefined') ? 0 : start;
			end   = (typeof end === 'undefined') ? 5 : end;

			if(end > data.length)
				end = data.length

			for(var i = start; i < end; i++){
				var $tpl = $(albumListTpl);
				var album = data[i];

				$tpl.find('.album-image img').attr('src', album.cover_url);
				$tpl.find('.album-title').text(album.title);
				$tpl.find('.album-year').text(album.release_year);
				$tpl.attr('data-id', i);

				$elAlbumList.append($tpl);
			}
			
			(end >= data.length) ? $('#loadmore').hide() : $('#loadmore').show();
		}
	}
})(jQuery);
