
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

    // let initMainSlider = false;
    //     $(window).on('mousemove click touchstart touchmove', function (e) {
    //         if (!initMainSlider) {
                new Swiper('.main-slider-swiper', {
                    // modules: [pagination, EffectFade, Autoplay],
                    slidesPerView: '1',
                    loop: true,
                    effect: "fade",
                    // autoplay: {
                    //     enabled: true,
                    //     delay: 5000,
                    //     pauseOnMouseEnter: true
                    // },
                    pagination: {
                        el: ".main-slider-swiper-pagination",
                        clickable: true,
                    },
                    afterInit: function (swiper) {
                        $(swiper.el).closest('.loading').removeClass('loading');
                    }
                });
        //         initMainSlider = true;
        //     }
        // });

        new Swiper('.programs-swiper', {
            slidesPerView: '1',
            loop: true,
            spaceBetween: 20,
            centeredSlides: true,
            breakpoints: {
                576: {
                    slidesPerView: 1,
                },
                768: {
                    slidesPerView: 2,
                },
                992: {
                    slidesPerView: 3,
                }
            },
        });

        if ($(window).width() < 992) {
            $(".news-section .tabs-content .tab-content").addClass("swiper list-news-swiper");
            $(".news-section .tabs-content .tab-content .row").addClass("swiper-wrapper").removeClass("row");
            $(".news-section .tabs-content .tab-content .col-md-3").addClass("swiper-slide").removeClass("col-md-3");

            new Swiper('.list-news-swiper', {
                slidesPerView: '2',
                spaceBetween: 20,
                loop: true,
                centeredSlides: true,
                breakpoints: {
                    576: {
                        slidesPerView: 1,
                    },
                    768: {
                        slidesPerView: 2,
                    },
                },
            });
        }

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

    function handleHash(item) {
        const _item = $(item);
        if (_item.length) {
            if (_item.hasClass("tab-hash")) {
                blockTabs(_item);
            } else {
                _item[0].scrollIntoView({ behavior: "smooth", block: "start" });
            }
        }
    }

    function blockTabs(tab) {
        const _tab = $(tab);
        $(".tab, .tab-content, [href^='#']").removeClass("active");
        const _tab_parent = _tab.closest(".tabs-w");
        _tab_parent.find(".tab.active").removeClass("active");
        _tab_parent
            .find(".tab-content.active")
            .removeClass("active")
            .stop()
            .slideUp();
        const hash = "#" + _tab.attr("id");
        const active_tab = $('[href="' + hash + '"]');
        active_tab.addClass("active");
        _tab.addClass("active");
    }

    window.addEventListener("hashchange", function (event) {
        if (window.location.hash) {
            handleHash($(window.location.hash));
        }
    });

    window.addEventListener("load", function (event) {
        if (window.location.hash) {
            handleHash($(window.location.hash));
        }
    });

    $(".news-item").on("click", function (e) {
        $(".news-swiper").removeClass("d-none");
        const bg = e.target.getAttribute("data-bg");
        const title = e.target.getAttribute("data-title");
        const desc = e.target.getAttribute("data-desc");
        const date = e.target.getAttribute("data-date");

        $(".news-selected-details-title").text(title);
        $(".news-selected-details-desc").text(desc);
        $(".news-selected-details-date").text(date);
        $(".news-selected-details-btn").text("اقرأ المزيد");
        $(".news-selected-details-btn").attr("href", "./inner-news.html");
        $(".news-selected-details-image img").attr("src", bg);
    });

    new Swiper('.news-swiper', {
        slidesPerView: '1',
        loop: true,
        navigation: {
            nextEl: ".news-button-next",
            prevEl: ".news-button-prev",
        },
    });

    $(".news-swiper .close-w").on("click", function () {
        $(".news-swiper").addClass("d-none");
    });
});
