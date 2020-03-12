$(document).ready(function () {
  $('.projects__child').slick({
    mobileFirst: true,
    dots: false,
    infinite: false,
    rows: 4,
    slidesPerRow: 1,
    appendArrows: $('.projects__controls-buttons'),
    prevArrow: '<button class="arrow arrow--prev projects__controls-button slick-prev"><i class="icon-arrowLeft"></i></button>',
    nextArrow: '<button class="arrow arrow--next projects__controls-button slick-next"><i class="icon-arrowright"></i></button>',
    responsive: [
      {
        breakpoint: 767,
        settings: {
          rows: 1,
          slidesToShow: 2,
        }
      },
      {
        breakpoint: 1023,
        settings: {
          rows: 1,
          slidesToShow: 3,
          swipe: false
        }
      },
      {
        breakpoint: 1774,
        settings: {
          rows: 1,
          slidesToShow: 4,
        }
      },
    ]
  });
});
