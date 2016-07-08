/**
 * Basic autocomplete functionallity
 */
(function($) {
  $.fn.autocomplete = function(options) {
    var $input = $(this);
    var $output = $('.matches');
    var words = $.map(options.data, function(el) { return el.name });

    if(typeof options.select === 'function'){
      $output.on('click', 'li', function() {
        var $currentEl = $(this); 
        $input.val($currentEl.text())
        options.select($currentEl.data('id'));
        $output.hide();
      });
    }

    var startsWith = function(letters) {
      return function(word) {
        return word.indexOf(letters) === 0;
      }
    }

    var matches = function(letters) {
      return letters ?
        $.grep(words, startsWith(letters)) : [];
    }

    var getIdByName = function(name){
      return $.grep(options.data, function( indx ) {
        return indx.name === name;
      })[0];
    }

    var render = function(letters, matches) {
      $output.empty();
      $output.hide();
      
      if(matches.length) {
        $output.show();  
        var $highlight = $('<span/>')
          .text(letters)
          .addClass('highlight');

        $.each(matches, function(index, match) {
          var matchObject = getIdByName(match);

          var remaining = match.replace(letters, '');
          $match = $('<li data-id="'+matchObject.id+'"/>')
            .append($highlight.clone(), remaining)
            .addClass('match');
          $output.append($match);
        });
      }
    }

    this.keyup(function() {
      var letters = $(this).val();
      render(letters, matches(letters));
    });
  };
})(jQuery);
