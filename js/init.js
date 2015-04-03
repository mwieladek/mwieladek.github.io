$(document).ready(function() {

    /**
     * Function that shows and hides bricks
     * @category if null, shows everything otherwise only the @category
     */
    var _showBricks = function(category) {

        var hideSelector;
        var showSelector = '.brick';

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

        masonry = new Masonry(document.querySelector('#brickwall'), {
            itemSelector: '.brick-visible',
            columnWidth: '.brick-sizer'
        });
    };

    var _initMenu = function() {

        var hiddenClass = 'brick-hidden';
        var categories = ['recipes', 'wellness', 'travel', 'life'];
        var $logo = $('header .header-brand');

        // Attach the filter to each navigation like
        categories.forEach(function(category) {

            $('.nav-' + category).on('click', function() {
                _showBricks(category)
            });
        });

        // The logo cancel the filters
        $logo.on('click', function() { _showBricks(); });
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
    _showBricks();

    $('.brick').on('mouseenter focusin', function() {
        $(this).siblings('.brick-visible').addClass('brick-ignored');
    });

    $('.brick').on('mouseleave focusout', function() {
        $('.brick-visible').removeClass('brick-ignored');
    });

});
