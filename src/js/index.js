document.addEventListener("lazybeforeunveil", function (e) {
    var bg = e.target.getAttribute("data-bg");
    if (bg) {
        e.target.style.backgroundImage = "url(" + bg + ")";
    }
});

const isRtl = $("html").attr("dir") === "rtl";

$(document).on('ready', function () {
  const header = $(".header");
    const headerOffset = header.offset().top;

    const stickyHeader = () => {
        if (
            $(window).scrollTop() >= headerOffset + header.height() + 200 &&
            $(window).width() >= 992
        ) {
            header.addClass("sticky");
        } else {
            header.removeClass("sticky");
        }
    };

    const UpBtn = $("#upBtn");

    function toTop() {
        if ($(window).scrollTop() > 300) {
            UpBtn.addClass("show");
        } else {
            UpBtn.removeClass("show");
        }
    }

    UpBtn.on("click", function (e) {
        e.preventDefault();
        $("html, body").stop().animate({ scrollTop: 0 }, 300);
    });

    $(window).on("scroll", function () {
        stickyHeader();
        toTop();
    });

    stickyHeader();
    toTop();

    const body = $("body");

    $(".burger-menu").on("click", function () {
        const btn = $(this);
        const menu = $(".menu-list");
        btn.toggleClass("open");
        menu.toggleClass("open");

        if (btn.hasClass("open")) {
            body.css("overflow", "hidden");
            body.addClass("nav-open");
        } else {
            body.css("overflow", "");
            body.removeClass("nav-open");
        }
    });

    function mobileMenu() {
        if ($(window).width() < 992) {
            $(".main-menu-list .has-dropdown > .item").on(
                "click",
                function (e) {
                    e.preventDefault();
                    const parent = $(this).closest(".has-dropdown");
                    const menu = parent.find("> .dropdown-menu");
                    if (!menu.hasClass("open")) {
                        parent.addClass("open");
                        menu.addClass("open");
                        menu.stop().slideDown();
                    } else {
                        parent.removeClass("open");
                        menu.removeClass("open");
                        menu.stop().slideUp();
                    }
                }
            );
        }
    }

    mobileMenu();

    let initMainSlider = false;
        $(window).on('mousemove click touchstart touchmove', function (e) {
            if (!initMainSlider) {
                $('#swiper-main-slider').fadeIn(function () {
                    $('#static-main-slider').remove();
                });
                new Swiper('.main-slider-swiper', {
                    // modules: [pagination, EffectFade, Autoplay],
                    slidesPerView: '1',
                    loop: true,
                    effect: "fade",
                    autoplay: {
                        enabled: true,
                        delay: 5000,
                        pauseOnMouseEnter: true
                    },
                    pagination: {
                        el: ".main-slider-swiper-pagination",
                        clickable: true,
                    },
                    afterInit: function (swiper) {
                        $(swiper.el).closest('.loading').removeClass('loading');
                    }
                });
                initMainSlider = true;
            }
        });

    const containerWidth = $(".container").first().width() || 1400;
    const containerFluidOffset = () => {
        const windowWidth = $(window).width();
        const padding = (windowWidth - containerWidth) / 2 + 80;
        if ($(window).width() >= 1400) {
            if (isRtl) {
                $(".offset-right").css("padding-left", padding);
                $(".offset-left").css("padding-right", padding);
            } else {
                $(".offset-left").css("padding-left", padding);
                $(".offset-right").css("padding-right", padding);
            }
        }
    };

    containerFluidOffset();

    $(window).on("resize", function () {
        mobileMenu();
        containerFluidOffset();
    });

    // footer mobile menu
    if ($(window).width() < 576) {
        $(".footer-item.footer-item-mobile .footer-item-title").on(
            "click",
            function (e) {
                e.preventDefault();
                const btn = $(this);
                const wrapper = btn.closest(".footer-item-mobile");
                const content = wrapper.find(".footer-item-content");
                if (!wrapper.hasClass("active")) {
                    wrapper.addClass("active");
                    content.stop().slideDown();
                } else {
                    wrapper.removeClass("active");
                    content.stop().slideUp();
                }
            }
        );
    }

});
