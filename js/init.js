$(document).ready(function() {

    var  _getUrlCategory = function() {
        return document.location.hash ? document.location.hash.substr(1) : null;
    };

    var _setUrlCategory = function(category) {
        document.location.hash = '#' + (category || '');
    };

    var _goToHomePage = function(category) {
        document.location = category ? '/#' + category : '/';
    };


    /**
     * Highlight the active category by add the "active" class
     * @param category the active category
     */
    var _activateMenu = function(category) {
        $('.header-navigation .nav').removeClass('active');
        if(category) {
            $('.header-navigation .nav.nav-' + category).addClass('active');
        }
    };

    /**
     * Function that shows and hides bricks
     * @category if null, shows everything otherwise only the @category
     */
    var _showBricks = function(event, category) {

        var hideSelector;
        var showSelector = '.brick';
        var $brickwall = document.querySelector('#brickwall');


        if(!$brickwall && event) {
            return _goToHomePage(category);
        }

        _activateMenu(category);
        _setUrlCategory(category);

        if(category) {
            var categoryClass = showSelector + '-' + category;
            hideSelector = showSelector + ':not(' + categoryClass + ')';
            showSelector += categoryClass;
        }

        // Show bricks
        $(showSelector)
            .addClass('brick-visible')
            .removeClass('brick-hidden');

        // Hide bricks when needed
        if(hideSelector) {
            $(hideSelector)
                .removeClass('brick-visible')
                .addClass('brick-hidden');
        }

        // If there's a brick wall, when update the layout
        if($brickwall) {
            new Masonry($brickwall, {
                itemSelector: '.brick-visible',
                columnWidth: '.brick-sizer'
            });
        }
    };

    var _initMenu = function() {

        var hiddenClass = 'brick-hidden';
        var categories = ['recipes', 'wellness', 'travel', 'life'];
        var $logo = $('header .header-brand .nav-home');

        // Attach the filter to each navigation like
        categories.forEach(function(category) {

            $('.nav-' + category).on('click', function(event) {
                _showBricks(event, category)
            });
        });

        // The logo cancel the filters
        $logo.on('click', function(event) { _showBricks(event); });
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


    /**
     * Execute the function
     */
    _initMenu();
    _initHeadRoom();
    _showBricks(null, _getUrlCategory());

    $('.brick').on('mouseenter focusin', function() {
        $(this).siblings('.brick-visible').addClass('brick-ignored');
    });

    $('.brick').on('mouseleave focusout', function() {
        $('.brick-visible').removeClass('brick-ignored');
    });

});
