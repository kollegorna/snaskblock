/**
 *
 * Matvän
 * Din personlige shoppingassistent för hälsosammare handling hos Mathem.
 * Per Sandström per@kollegorna.se
 *
 */

(function($) {

  var Mathem = {

    init: function() {

      this.Navigation();
      this.Home();
      this.Products();

    },

    blockedURLs: function() {
      return arr = [
        "varor/amerikansk-lask",
        "varor/bullar",
        "varor/chips",
        "varor/chokladpraliner",
        "varor/energidryck",
        "varor/fardiga-efterratter",
        "varor/frysta-tartor",
        "varor/ginger-ale",
        "varor/ginger-beer",
        "varor/glass",
        "varor/godis",
        "varor/kladdkaka",
        "varor/kondisbitar",
        "varor/lask",
        "varor/lchf-glass",
        "varor/pizza",
        "varor/presentchoklad",
        "varor/rawfood-glass",
        "varor/saft-",
        "varor/sport--o-energidryck",
        "varor/vaniljglass"
      ];
    },

    blockProducts: function() {
      var blocked_urls = Mathem.blockedURLs();

      $('.product.prod-info').each(function( index ) {
        var product = $(this);
        var product_url = $('.prodImg a', $(this)).attr('href');

        if (typeof product_url === 'string') {
          $.each( blocked_urls, function( i, val ) {
            if (product_url.includes(val)) {
              product.remove();
              console.log('Snaskblock: ' + product_url);
            }
          });
        }
      });
    },

    Navigation: function() {
      $('ul.navigation li, .megaContainer ul li').each(function(i) {
        if ($('a', $(this)).attr('href') == '/varor/glass-godis-o-snacks') {
          $(this).remove();
        } else if ($('a', $(this)).attr('href') == '/deli/godsaker') {
          $(this).remove();
        }
      });
    },

    Home: function() {
      if (window.location.href == 'https://www.mathem.se/') {
        setInterval(function(){ Mathem.blockProducts(); }, 1000);
      }
    },

    Products: function() {
      if (
          window.location.href.indexOf("varor") > -1 ||
          window.location.href.indexOf("deli") > -1 ||
          window.location.href.indexOf("inspiration") > -1 ||
          window.location.href.indexOf("/sok") > -1
      ) {
        setInterval(function(){ Mathem.blockProducts(); }, 1000);
      }
    }

  }

  $(function() {
    Mathem.init();
  });

}(jQuery));
