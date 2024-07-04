console.log("init.js is running");
jQuery(function ($) {
  console.log("DOM is ready");
  ("use strict");

  function modalboxNews() {
    var modalBox = $(".grax_tm_modalbox_news");
    var list = $(".grax_tm_news .news_list ul li");
    var closePopup = modalBox.find(".close");

    list.each(function () {
      var element = $(this);
      var details = element.find(".list_inner").html();
      var buttons = element.find(".details .title a,.grax_tm_full_link");
      var mainImage = element.find(".main");
      var imgData = mainImage.data("img-url");
      var title = element.find(".title");
      var titleHref = element.find(".title a").html();
      buttons.on("click", function (e) {
        e.preventDefault();
        $("body").addClass("modal");
        modalBox.addClass("opened");
        modalBox.find(".description_wrap").html(details);
        mainImage = modalBox.find(".main");
        mainImage.css({ backgroundImage: "url(" + imgData + ")" });
        title = modalBox.find(".title");
        title.html(titleHref);
      });
    });
    closePopup.on("click", function (e) {
      e.preventDefault();
      modalBox.removeClass("opened");
      modalBox.find(".description_wrap").html("");
      $("body").removeClass("modal");
    });
  }

  function colorSwitcher() {
    var list = $(".grax_tm_settings .colors li a");
    list.on("click", function (e) {
      e.preventDefault();
      var element = $(this);
      var elval = element.attr("class");
      element.closest(".grax_tm_all_wrap").attr("data-color", elval);
    });
  }

  function switcherOpener() {
    var settings = $(".grax_tm_settings");
    var button = settings.find(".link");
    var direction = settings.find(".direction li a");

    button.on("click", function (e) {
      e.preventDefault();
      var element = $(this);
      if (element.hasClass("opened")) {
        element.removeClass("opened");
        element.closest(".grax_tm_settings").removeClass("opened");
      } else {
        element.addClass("opened");
        element.closest(".grax_tm_settings").addClass("opened");
      }
    });

    direction.on("click", function (e) {
      e.preventDefault();
      var element = $(this);
      if (!element.hasClass("active")) {
        direction.removeClass("active");
        element.addClass("active");
      }
      if (element.hasClass("dark")) {
        $("body").addClass("dark");
        $(".grax_tm_partners").addClass("opened");
      } else {
        $("body").removeClass("dark");
        $(".grax_tm_partners").removeClass("opened");
      }
    });
  }

  function navBg() {
    $(window).on("scroll", function () {
      var topbar = $(".grax_tm_topbar");
      var progress = $(".progressbar");
      var WinOffset = $(window).scrollTop();

      if (WinOffset >= 100) {
        topbar.addClass("animate");
        progress.addClass("animate");
      } else {
        topbar.removeClass("animate");
        progress.removeClass("animate");
      }
    });
  }

  function anchor() {
    $('a[href^="#"]').on("click", function (e) {
      e.preventDefault();
      var target = this.hash;
      var $target = $(target);
      $("html, body")
        .stop()
        .animate(
          {
            scrollTop: $target.offset().top - 70,
          },
          900,
          "swing",
        );
    });
  }

  function hamburgerMenu() {
    var hamburger = $(".hamburger");
    var mobileMenu = $(".grax_tm_mobile_menu .dropdown");

    hamburger.on("click", function () {
      var element = $(this);
      if (element.hasClass("is-active")) {
        element.removeClass("is-active");
        mobileMenu.slideUp();
      } else {
        element.addClass("is-active");
        mobileMenu.slideDown();
      }
    });

    $(".grax_tm_mobile_menu .dropdown .dropdown_inner ul li a").on(
      "click",
      function () {
        hamburger.removeClass("is-active");
        mobileMenu.slideUp();
      },
    );
  }

  function dataImages() {
    $("*[data-img-url]").each(function () {
      var element = $(this);
      var url = element.data("img-url");
      element.css({ backgroundImage: "url(" + url + ")" });
    });
  }

  function contactForm() {
    $(".contact_form #send_message").on("click", function () {
      var name = $(".contact_form #name").val();
      var email = $(".contact_form #email").val();
      var message = $(".contact_form #message").val();
      var subject = $(".contact_form #subject").val();
      var success = $(".contact_form .returnmessage").data("success");

      $(".contact_form .returnmessage").empty();

      if (name === "" || email === "" || message === "") {
        $("div.empty_notice").slideDown(500).delay(2000).slideUp(500);
      } else {
        $.post(
          "modal/contact.php",
          {
            ajax_name: name,
            ajax_email: email,
            ajax_message: message,
            ajax_subject: subject,
          },
          function (data) {
            $(".contact_form .returnmessage").append(data);
            if ($(".contact_form .returnmessage span.contact_error").length) {
              $(".contact_form .returnmessage")
                .slideDown(500)
                .delay(2000)
                .slideUp(500);
            } else {
              $(".contact_form .returnmessage").append(
                "<span class='contact_success'>" + success + "</span>",
              );
              $(".contact_form .returnmessage")
                .slideDown(500)
                .delay(4000)
                .slideUp(500);
            }
            if (data === "") {
              $("#contact_form")[0].reset();
            }
          },
        );
      }
      return false;
    });
  }

  function progressLine() {
    var line = $(".progressbar .line");
    var documentHeight = $(document).height();
    var windowHeight = $(window).height();
    var winScroll = $(window).scrollTop();
    var value = (winScroll / (documentHeight - windowHeight)) * 100;
    var position = value;

    line.css("height", position + "%");
  }

  function toTop() {
    $(".progressbar a").on("click", function (e) {
      e.preventDefault();
      $("html, body").animate({ scrollTop: 0 }, "slow");
    });
  }

  function heroTitle() {
    var heroText = $(".fn_animation");
    heroText.each(function () {
      var element = $(this);
      var start = '<span class="word">';
      var char = '<span class="character">';
      var end = "</span>";
      var space = "&nbsp;";
      var allHTML = "";
      $.each(element.text().split(" "), function (i, e) {
        if (i !== 0) {
          allHTML += char + space + end;
        }
        allHTML += start;
        $.each(e.split(""), function (ii, ee) {
          allHTML += char + ee + end;
        });
        allHTML += end;
      });
      element.html(allHTML).addClass("ready");
    });
  }

  function heroTitleFade() {
    var mySpan = $(".fn_animation .character");
    var a = 0;
    var speed = 30;
    var wait = 500;
    mySpan.each(function (i) {
      var element = $(this);
      setTimeout(function () {
        element.addClass("opened");
      }, i * speed);
      a = i * speed;
    });
    setTimeout(function () {
      $(".grax_tm_topbar").addClass("opened");
      $(".grax_tm_down").addClass("opened");
    }, 800);
  }

  function preloader() {
    var isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry/i.test(
      navigator.userAgent,
    )
      ? true
      : false;
    var preloader = $("#preloader");

    if (!isMobile) {
      // setTimeout(function () {
      //   preloader.addClass("preloaded");
      // }, 800);
      preloader.addClass("preloaded");
      setTimeout(function () {
        console.log("remove");
        preloader.remove();
      }, 2000);
    } else {
      preloader.remove();
    }
  }

  function cursor() {
    var myCursor = $(".mouse-cursor");
    if (myCursor.length) {
      if ($("body")) {
        const e = document.querySelector(".cursor-inner"),
          t = document.querySelector(".cursor-outer");
        let n,
          i = 0,
          o = !1;
        (window.onmousemove = function (s) {
          o ||
            (t.style.transform =
              "translate(" + s.clientX + "px, " + s.clientY + "px)"),
            (e.style.transform =
              "translate(" + s.clientX + "px, " + s.clientY + "px)"),
            (n = s.clientY),
            (i = s.clientX);
        }),
          $("body").on("mouseenter", "a, .cursor-pointer", function () {
            e.classList.add("cursor-hover"), t.classList.add("cursor-hover");
          }),
          $("body").on("mouseleave", "a, .cursor-pointer", function () {
            ($(this).is("a") && $(this).closest(".cursor-pointer").length) ||
              (e.classList.remove("cursor-hover"),
              t.classList.remove("cursor-hover"));
          }),
          (e.style.visibility = "visible"),
          (t.style.visibility = "visible");
      }
    }
  }

  function imgToSvg() {
    $("img.svg").each(function () {
      var $img = $(this);
      var imgClass = $img.attr("class");
      var imgURL = $img.attr("src");

      $.get(
        imgURL,
        function (data) {
          var $svg = $(data).find("svg");
          if (typeof imgClass !== "undefined") {
            $svg = $svg.attr("class", imgClass + " replaced-svg");
          }
          $svg = $svg.removeAttr("xmlns:a");
          if (
            !$svg.attr("viewBox") &&
            $svg.attr("height") &&
            $svg.attr("width")
          ) {
            $svg.attr(
              "viewBox",
              "0 0 " + $svg.attr("height") + " " + $svg.attr("width"),
            );
          }
          $img.replaceWith($svg);
        },
        "xml",
      );
    });
  }

  // Initialize functions
  modalboxNews();
  colorSwitcher();
  switcherOpener();
  navBg();
  anchor();
  hamburgerMenu();
  dataImages();
  contactForm();
  toTop();
  heroTitle();
  cursor();
  imgToSvg();

  // Window scroll event
  $(window).on("scroll", function () {
    progressLine();
  });

  // Window load event
  $(document).ready(function () {
    preloader();
    heroTitleFade();
    $(".grax_tm_down").addClass("loaded");
  });
});
