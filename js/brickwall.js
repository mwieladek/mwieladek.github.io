$(document).ready(function() {

    var hiddenClass = 'brick-hidden';
    var categories = ['recipes', 'wellness', 'travel', 'life'];
    var $logo = $('header .header-brand');

    // Attach the filter to each navigation like
    categories.forEach(function(category) {
        $('#nav-' + category).on('click', function() {
            $('.brick').addClass(hiddenClass);
            $('.brick-' + category).removeClass(hiddenClass);
        });
    });

    // The logo cancel the filters
    $logo.on('click', function() {
        $('.brick').removeClass(hiddenClass);
    });

});
