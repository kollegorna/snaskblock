/**
 * Snaskblock for Mathem
 */

(function($) {

  var Mathem = {

    Init: function() {

      this.Navigation();
      this.Products();
      this.Pages();
      this.Cart();

    },

    Snask: function() {
      return arr = [
        "deli/godsaker",
        "varor/alkoholfritt",
        "varor/amerikansk-lask",
        "varor/bullar",
        "varor/chips",
        "varor/chokladkaka-ljus",
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
        "varor/ostbagar",
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
      $('.product.prod-info:not(.snaskblock)').each(function( index ) {
        var product = $(this);
        var product_url = $('.prodImg a', $(this)).attr('href');
        $(this).addClass('snaskblock');

        if (typeof product_url === 'string') {
          $.each(Mathem.Snask(), function(i, val) {
            if (product_url.includes(val)) {
              product.remove();
            }
          });
        }
      });
    },

    BlockNavigation: function() {
      $('ul.navigation li, .megaContainer ul li').each(function( index ) {
        var nav = $(this);
        var nav_url = $('a', $(this)).attr('href');

        if (typeof nav_url === 'string') {
          $.each(Mathem.Snask(), function(i, val) {
            if (nav_url.includes(val)) {
              nav.remove();
            }
          });
        }
      });
    },

    SoundAlarm: function() {
      if ($('body').hasClass('alarm-sounding')) {
        return false;
      }

      $('body').addClass('alarm-sounding');
      $('body').prepend('<div class="snaskblock-warning" style="height: ' + $( document ).height() + 'px"><audio controls="controls" autoplay="autoplay" loop="true"><source src="' + chrome.extension.getURL('audio/warning.wav') + '" type="audio/mpeg"></audio></div>');
    },

    TurnOffAlarm: function() {
      if (!$('body').hasClass('alarm-sounding')) {
        return false;
      }

      $('.snaskblock-warning').remove();
      $('body').removeClass('alarm-sounding');
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

    CartLoop: function() {
      var alarm = false;
      var bad_products = 0;

      $('.prodRow').each(function( index ) {
        var product = $(this);
        var product_url = $('.prodTitle', $(this)).attr('href');

        if (typeof product_url === 'string') {
          $.each(Mathem.Snask(), function(i, val) {
            if (product_url.includes(val)) {
              bad_products++;

              if ($('.snaskblock-clicker').length < 1) {
                $('#shoppingCartList').append('<div class="snaskblock-challenge snaskblock-clicker">Du har snask i varukorgen! Klicka här 1000 gånger för att kunna slutföra din order.<strong><span>0</span> av 1000 klick gjorda</div>');
                $('.saveButton').attr('disabled', 'disabled');
              }

              if (alarm == false) {
                Mathem.SoundAlarm();
                alarm = true;
              }

              product.addClass('cart-snask');
            }
          });
        }
      });

      if (bad_products < 1) {
        Mathem.TurnOffAlarm();
        $('.saveButton').removeAttr('disabled');
        $('.snaskblock-clicker').remove();
      }
    },

    Cart: function() {
      if (window.location.href.includes('/kassan')) {
        setInterval(function(){ Mathem.CartLoop(); }, 500);

        var clicks = 0;
        $(document).on('click', '.snaskblock-clicker', function() {
          clicks++;

          $('span', $(this)).html(clicks);

          if (clicks > 999 && $('.snaskblock-clicker-ok').length < 1) {
            $('#shoppingCartList').append('<div class="snaskblock-challenge snaskblock-clicker-ok">Genom att klicka 1000 gånger så brände du åtminstone 1400 kalorier. Men känn dig inte nöjd för det.<br>Jaja, nu får du väl köpa ditt snask då…</div>');

            $('.snaskblock-clicker').slideUp("medium", function() {
              $('.snaskblock-clicker-ok').slideDown('medium');
              $('body').addClass('snaskblock-clicker-complete');
              $('.saveButton').removeAttr('disabled');
            });
          }
        });
      }
    }

  }

  $(function() {
    Mathem.Init();
  });

}(jQuery));
