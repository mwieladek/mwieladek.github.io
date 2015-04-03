$(document).ready(function() {

    /**
     * Initialize the menu so it's hides and shows the right elements.
     * It also redirects the user to the right page when accessed from a post
     */
    var _initMenu = function() {

        var hiddenClass = 'brick-hidden';
        var categories = ['recipes', 'wellness', 'travel', 'life'];
        var $logo = $('header .header-brand');

        // Attach the filter to each navigation like
        categories.forEach(function(category) {
            $('.nav-' + category).on('click', function() {
                $('.brick').addClass(hiddenClass);
                $('.brick-' + category).removeClass(hiddenClass);
            });
        });

        // The logo cancel the filters
        $logo.on('click', function() {
            $('.brick').removeClass(hiddenClass);
        });
    };


    /**
     * Initialize head room (scroll up reveal menu)
     * using the right offset so that it's seamless
     */
    var _initHeadRoom = function() {
        var myElement = document.querySelector("header");
        var headroom  = new Headroom(myElement, {
            offset : 213
        });
        headroom.init();
    };


    var _initBrickWall = function() {
        var container = document.querySelector('#brickwall');
        var msnry = new Masonry(container, {
            itemSelector: '.brick',
            columnWidth: '.brick-sizer'
        });
    };



    /**
     * Execute the function
     */
    _initMenu();
    _initHeadRoom();
    _initBrickWall();

});
