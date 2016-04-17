/**
 *
 * Matvän
 * Din personlige shoppingassistent för hälsosammare handling hos Mathem.
 * Per Sandström per@kollegorna.se
 *
 */

(function($) {

  var Mathem = {

    Init: function() {

      this.Navigation();
      this.Products();
      this.Pages();

    },

    Snask: function() {
      return arr = [
        "deli/godsaker",
        "varor/alkoholfritt",
        "varor/amerikansk-lask",
        "varor/bullar",
        "varor/chips",
        "varor/chokladpraliner",
        "varor/chokladstycksaker",
        "varor/cider",
        "varor/drinkmix",
        "varor/energidryck",
        "varor/fardiga-efterratter",
        "varor/festlig-dricka",
        "varor/fikabrod-o-tartor",
        "varor/frysta-tartor",
        "varor/ginger-ale",
        "varor/ginger-beer",
        "varor/glass",
        "varor/glogg",
        "varor/godis",
        "varor/kladdkaka",
        "varor/kondisbitar",
        "varor/lask",
        "varor/lchf-glass",
        "varor/mazariner",
        "varor/muffins",
        "varor/ol",
        "varor/pizza",
        "varor/presentchoklad",
        "varor/rawfood-glass",
        "varor/saft-",
        "varor/sport--o-energidryck/",
        "varor/sport--o-aterhamtn--dryck",
        "varor/tartor",
        "varor/tonic",
        "varor/vaniljglass",
        "varor/vaniljlangd"
      ];
    },

    BlockProducts: function() {
      var blocked_urls = Mathem.Snask();

      $('.product.prod-info:not(.snaskblock)').each(function( index ) {
        var product = $(this);
        var product_url = $('.prodImg a', $(this)).attr('href');
        $(this).addClass('snaskblock');

        if (typeof product_url === 'string') {
          $.each( blocked_urls, function( i, val ) {
            if (product_url.includes(val)) {
              product.remove();
            }
          });
        }
      });
    },

    BlockNavigation: function() {
      var blocked_urls = Mathem.Snask();

      $('ul.navigation li, .megaContainer ul li').each(function( index ) {
        var nav = $(this);
        var nav_url = $('a', $(this)).attr('href');

        if (typeof nav_url === 'string') {
          $.each( blocked_urls, function( i, val ) {
            if (nav_url.includes(val)) {
              nav.remove();
            }
          });
        }
      });
    },

    SoundAlarm: function() {
      $('body').prepend('<div class="snaskblock-warning" style="height: ' + $( document ).height() + 'px"><audio controls="controls" autoplay="autoplay" loop="true"><source src="' + chrome.extension.getURL('audio/warning.wav') + '" type="audio/mpeg"></audio></div>');
    },

    Navigation: function() {
      setInterval(function(){ Mathem.BlockNavigation(); }, 1000);
    },

    Products: function() {
      if (
          window.location.href == 'https://www.mathem.se/' ||
          window.location.href.indexOf("varor") > -1 ||
          window.location.href.indexOf("deli") > -1 ||
          window.location.href.indexOf("inspiration") > -1 ||
          window.location.href.indexOf("/sok") > -1
      ) {
        setInterval(function(){ Mathem.BlockProducts(); }, 1000);
      }
    },

    Pages: function() {
      $.each(Mathem.Snask(), function(i, val) {
        if (window.location.href.includes(val)) {
          Mathem.SoundAlarm();
          return false;
        }
      });
    },

    Cart: function() {

    }

  }

  $(function() {
    Mathem.Init();
  });

}(jQuery));
