/**
 *
 * Matvän
 * Din personlige shoppingassistent för hälsosammare handling hos Mathem.
 * Per Sandström per@kollegorna.se
 *
 */

(function($) {

  var Snaskblock = {

    init: function() {

      //this.Products();


    },

    /*Products: function() {
      if (
          window.location.href == 'https://www.mathem.se/' ||
          window.location.href.indexOf("varor") > -1 ||
          window.location.href.indexOf("deli") > -1 ||
          window.location.href.indexOf("inspiration") > -1 ||
          window.location.href.indexOf("/sok") > -1
      ) {
        setInterval(function(){ Mathem.blockProducts(); }, 1000);
      }
    }*/

  }

  $(function() {
    Snaskblock.init();
  });

}(jQuery));

function snaskBlockOverlay() {
  $('body').append('<div class="snackblock-overlay">');
}
