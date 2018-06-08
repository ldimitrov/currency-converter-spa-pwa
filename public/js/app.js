window.addEventListener('load', () => {
    const element = $('#app');

    // Compile the Handlebar Templates
    const errorTemplate = Handlebars.compile($('#error-template').html());
    const ratesTemplate = Handlebars.compile($('#rates-template').html());
    const exchangeTemplate = Handlebars.compile($('#exchange-template').html());
    const historicalTemplate = Handlebars.compile($('#historical-template').html());

    // Vanilla Router declaration
    const router = new Router({
        mode: 'history',
        page404: (path) => {
            const html = errorTemplate({
                color: 'orange',
                title: 'Error 404 - Page not Found!',
            });
            el.html(html);
        },
    });

    router.add('/', () => {
        let html = ratesTemplate();
        el.html(html);
    });

    router.add('/exchange', () => {
        let html = exchangeTemplate();
        el.html(html);
    });

    router.add('/historical', () => {
        let html = historicalTemplate();
        el.html(html);
    });

    // Navigate app to current url
    router.navigateTo(window.location.pathname);

    // Highlight Active Menu on Refresh/Page Reload
    const link = $(`a[href$='${window.location.pathname}']`);
    link.addClass('active');

    $('a').on('click', (event) => {
        event.preventDefault();

        // Highlight Active Menu on Click
        const target = $(event.target);
        $('.item').removeClass('active');
        target.addClass('active');

        // Navigate to clicked url
        const href = target.attr('href');
        const path = href.substr(href.lastIndexOf('/'));
        router.navigateTo(path);
    });
});