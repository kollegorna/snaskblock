/**
 * Snaskblock for Coop
 */

(function($) {

  var Coop = {

    Init: function() {

      if (!window.location.href.includes("handla-online/varukorg")) {
        this.TurnOffAlarm();
      }
      //
      this.PageWatcher();
      this.Navigation();
      this.Products();
      this.Pages();
      this.Cart();

    },

    Snask: function() {
      return arr = [
        "brod/fika",
        "dryck/energi/energidryck",
        "dryck/ol-cider-vin",
        "dryck/vatten-lask/stor-lask",
        "dryck/vatten-lask/liten-lask",
        "dryck/vatten-lask/light-lask",
        "dryck/vatten-lask/pa-back",
        "fika/fikabrod",
        "frys/brod-dessert/fikabrod",
        "frys/glass-frukt-bar/paketglass",
        "frys/glass-frukt-bar/familjepack",
        "frys/glass-frukt-bar/styckglassar",
        "frys/glass-frukt-bar/strossel-ran-glassas",
        "frys/glass-frukt-bar/laktosfritt-frys",
        "frys/glass-frukt-bar/mjolkfritt-fryst",
        "frys/brod-dessert/tarta-paj-dessert",
        "skafferi/godis-konfektyr",
        "skafferi/snacks",
        "muffins",
        "kladdkaka"
      ];
    },

    SnaskNames: function() {
      return arr = [
        "Energidryck",
        "Familjepack",
        "Fika",
        "Fikabröd",
        "Godis",
        "Laktosfritt Frys",
        "Läsk",
        "Mjölkfritt Frys",
        "Paketglass",
        "På Back",
        "Snacks",
        "Styckglassar",
        "Strössel",
        "Tårta, Paj",
        "Öl - Cider - Vin"
      ];
    },

    BlockProducts: function() {
      $('.StoreGrid-item:not(.snaskblock)').each(function( index ) {
        var product = $(this);
        var product_url = $('meta[itemprop="url"]', $(this)).attr('content');
        $(this).addClass('snaskblock');

        if (typeof product_url === 'string') {
          $.each(Coop.Snask(), function(i, val) {
            if (product_url.includes(val)) {
              product.remove();
            }
          });
        }
      });
    },

    BlockNavigation: function() {
      $('.Tree-action').each(function( index ) {
        var nav = $(this);
        var nav_title = $(this).text();

        if (typeof nav_title === 'string') {
          $.each(Coop.SnaskNames(), function(i, val) {
            if (nav_title.includes(val)) {
              nav.parent().remove();
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
      $('body').prepend('<div class="snaskblock-warning" style="height: ' + $( document ).height() + 'px"><!--<audio controls="controls" autoplay="autoplay" loop="true"><source src="' + chrome.extension.getURL('audio/warning.wav') + '" type="audio/mpeg"></audio>--></div>');
    },

    TurnOffAlarm: function() {
      if (!$('body').hasClass('alarm-sounding')) {
        return false;
      }

      $('.snaskblock-warning').remove();
      $('body').removeClass('alarm-sounding');
    },

    Navigation: function() {
      setInterval(function(){ Coop.BlockNavigation(); }, 1000);
    },

    CheckTitle: function(title) {
      var check_title = $('.Plate-title.u-text32').text();

      if (title != check_title) {
        Coop.Init();
      }
    },

    PageWatcher: function() {
      localStorage.setItem("snaskblock_title", $('.Plate-title.u-text32').text());

      setInterval(function(){ Coop.CheckTitle(localStorage.getItem("snaskblock_title")); }, 500);
    },

    Products: function() {
      if (
          window.location.href == 'https://www.coop.se/handla-online' ||
          window.location.href.includes("varor") ||
          window.location.href.includes("handla-online/sok") ||
          window.location.href.includes("Aktuella-erbjudanden")
      ) {
        setInterval(function(){ Coop.BlockProducts(); }, 1000);
      }
    },

    Pages: function() {
      $.each(Coop.Snask(), function(i, val) {
        if (window.location.href.includes(val)) {
          Coop.SoundAlarm();
          return false;
        }
      });
    },

    CartLoop: function() {
      var alarm = false;
      var bad_products = 0;

      $('.Cart-row').each(function( index ) {
        var product = $(this);
        var product_url = $('a[itemprop="url"]', $(this)).attr('href');

        if (typeof product_url === 'string') {
          $.each(Coop.Snask(), function(i, val) {
            if (product_url.includes(val)) {
              bad_products++;

              if ($('.snaskblock-clicker').length < 1) {
                $('.Cart-footer').prepend('<div class="snaskblock-challenge snaskblock-clicker">Du har snask i varukorgen! Klicka här 1000 gånger för att kunna slutföra din order.<strong><span>0</span> av 1000 klick gjorda</div>');
                $('button.FlatButton--green').attr('disabled', 'disabled');
              }

              if (alarm == false) {
                Coop.SoundAlarm();
                alarm = true;
              }

              product.addClass('cart-snask');
            }
          });
        }
      });

      if (bad_products < 1) {
        Coop.TurnOffAlarm();
        $('.snaskblock-clicker').remove();
        $('button.FlatButton--green').removeAttr('disabled');
      }
    },

    Cart: function() {
      if (window.location.href.includes('handla-online/varukorg')) {
        setInterval(function(){ Coop.CartLoop(); }, 500);

        var clicks = 0;
        $(document).on('click', '.snaskblock-clicker', function() {
          clicks++;

          $('span', $(this)).html(clicks);

          if (clicks > 10 && $('.snaskblock-clicker-ok').length < 1) {
            $('.Cart-footer').prepend('<div class="snaskblock-challenge snaskblock-clicker-ok">Genom att klicka 1000 gånger så brände du åtminstone 1400 kalorier. Men känn dig inte nöjd för det.<br>Jaja, nu får du väl köpa ditt snask då…</div>');

            $('.snaskblock-clicker').slideUp("medium", function() {
              $('.snaskblock-clicker-ok').slideDown('medium');
              $('body').addClass('snaskblock-clicker-complete');
              $('button.FlatButton--green').removeAttr('disabled');
            });
          }
        });
      }
    }

  }

  $(function() {
    Coop.Init();
  });

}(jQuery));
