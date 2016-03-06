/**
 *
 * Matvän
 * Din personlige shoppingassistent för hälsosammare handling hos Mathem.
 * Per Sandström per@kollegorna.se
 *
 */

(function($) {

  var Matvan = {

    init: function() {

      this.mainNavigation();
      this.extraPriser();
      this.blockedCategory();

    },

    blockedURLs: function() {
      return arr = [
        "varor/amerikansk-lask",
        "varor/bullar",
        "varor/chips",
        "varor/energidryck",
        "varor/frysta-tartor",
        "varor/ginger-ale",
        "varor/ginger-beer",
        "varor/glass",
        "varor/godis",
        "varor/kladdkaka",
        "varor/lask",
        "varor/pizza",
        "varor/saft-",
        "varor/sport--o-energidryck",
        "varor/vaniljglass"
      ];
    },

    blockProducts: function() {
      var blocked_urls = Matvan.blockedURLs();

      $('#productResultContainer .product.prod-info').each(function( index ) {
        var product = $(this);
        var product_url = $('.prodImg a', $(this)).attr('href');

        if (typeof product_url === 'string') {
          $.each( blocked_urls, function( i, val ) {
            if (product_url.indexOf(val) > -1) {
              product.remove();
              console.log('Plockade bort: ' + product_url);
            }
          });
        }
      });
    },

    blockAllProducts: function() {
      var blocked_urls = Matvan.blockedURLs();

      $('#productResultContainer .product.prod-info').each(function( index ) {
        $(this).remove();
      });
    },

    blockedCategory: function() {
      console.log('block category');
      if (window.location.href.indexOf("varor/glass-godis-o-snacks") > -1) {
        console.log('Matvän räddar dig från glass-godis-o-snacks…');
        setInterval(function(){ Matvan.blockAllProducts(); }, 1000);
      }
    },

    extraPriser: function() {
      if (window.location.href.indexOf("varor/extrapriser") > -1) {
        console.log('Matvän filtrerar extrapriserna…');
        setInterval(function(){ Matvan.blockProducts(); }, 1000);
      }
    },

    mainNavigation: function() {
      $('ul.navigation li, .megaContainer ul li').each(function(i) {
        if ($('a', $(this)).attr('href') == '/varor/glass-godis-o-snacks') {
          //$('a', $(this)).css('font-size', '8px !important');
          $(this).remove();
        }
      });
    }

  }

  $(function() {
    Matvan.init();
  });

}(jQuery));
