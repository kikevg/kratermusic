const videos = document.querySelectorAll('.plyr');
videos.forEach(v => new Plyr(v));

$('.slick-carousel').slick({
    centerMode: true,
    centerPadding: '60px',
    variableWidth: true,
    slidesToShow: 3,
    responsive: [
        {
            breakpoint: 768,
            settings: {
                arrows: false,
                centerMode: true,
                centerPadding: '40px',
                slidesToShow: 3
            }
        },
        {
            breakpoint: 480,
            settings: {
                arrows: false,
                centerMode: true,
                centerPadding: '40px',
                slidesToShow: 1
            }
        }
    ]
});
