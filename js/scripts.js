$(document).ready(function() {

    $('.masthead')
      .visibility({
        once: false,
        onBottomPassed: function() {
          $('.fixed.menu').transition('fade in');
        },
        onBottomPassedReverse: function() {
          $('.fixed.menu').transition('fade out');
        }
      });

    $('.ui.sidebar').sidebar('attach events', '.toc.item');

    $('.nav-link, .scroll-link').click(function(e){
      var dest = $(this).attr('href');
      var new_position = $(dest).offset();

      if ($('.ui.sidebar').sidebar('is visible')) {
        $('.ui.sidebar').sidebar('hide');
      }

      $('html, body').stop().animate({ scrollTop: new_position.top }, 750);
      e.preventDefault();
    });

    update_navbar_links();
    update_about_link();

  });

  $(window).scroll(function(){
    update_navbar_links();
  });

  $(window).resize(function(){
    update_navbar_links();
    update_about_link();
  });

  function update_navbar_links() {
    var scrollPosition = $(document).scrollTop();
    var halfScreen = $(window).height() * 0.5;

    $('.nav-link').each(function () {
      var currentLink = $(this);
      var refElement = $(currentLink.attr("href"));

      if (refElement.position().top - halfScreen <= scrollPosition && refElement.position().top + refElement.height() > scrollPosition) {
        $('a.active').removeClass('active');
        $(this).addClass('active');
      } else {
        currentLink.removeClass("active");
      }
    });
  };

  function update_about_link() {
    if ($(window).width() <= 700) {
      $('a[href="#about"]').attr("href", "#info");
    } else {
      $('a[href="#info"]').attr("href", "#about");
    }
  };


$('.ui.form')
  .form({
    fields: {
      name: {
        identifier: 'name',
        rules: [
          {
            type   : 'empty',
            prompt : 'Please enter your name so I know how to address you'
          }
        ]
      },
      email: {
        identifier: 'email',
        rules: [
          {
            type   : 'email',
            prompt : 'Please enter a valid email address so that I can reply to you'
          }
        ]
      },
      message: {
        identifier: 'message',
        rules: [
          {
            type   : 'empty',
            prompt : 'Please enter a message so that I have something to read'
          }
        ]
      }
    },
    onSuccess: function(event, fields) {
        var form_data = $('#contact-form').serialize();
        event.preventDefault();
            $.ajax({
        type: 'post',
        url: 'includes/email.php',
        data: form_data + '&action=sendmessage',
        success: function () {
          $('#success-message').removeClass("hidden");
          $('#success-message').addClass("visible");
          $('#contact-form').trigger("reset");
          setTimeout(function(){
            $('#success-message').addClass("hidden");
          }, 3500);
          $('#success-message').removeClass("visible");
        }
      });
    }
  });
