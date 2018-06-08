window.addEventListener('load', () => {
    const element = $('#app');

    // Compile the Handlebar Templates
    const errorTemplate = Handlebars.compile($('#error-template').html());
    const ratesTemplate = Handlebars.compile($('#rates-template').html());
    const exchangeTemplate = Handlebars.compile($('#exchange-template').html());
    const historicalTemplate = Handlebars.compile($('#historical-template').html());

    // Instantiate api handler
    const api = axios.create({
        baseURL: 'http://localhost:3000/api',
        timeout: 5000,
    });

    // Vanilla Router declaration
    const router = new Router({
        mode: 'history',
        page404: (path) => {
            const html = errorTemplate({
                color: 'orange',
                title: 'Error 404 - Page not Found!',
                message: 'This is not the page you are looking for!',
            });
            element.html(html);
        },
    });

    // Display Error Banner
    const showError = (error) => {
        const { title, message } = error.response.data;
        const html = errorTemplate({ color: 'red', title, message });
        element.html(html);
    };

    // Display Latest Currency Rates
    router.add('/', async () => {
        let html = ratesTemplate();
        element.html(html);
        try {
            // Load Currency Rates
            const response = await api.get('/rates');
            const { base, date, rates } = response.data;
            // Display rates
            html = ratesTemplate({ base, date, rates });
            element.html(html);
        } catch (error) {
            showError(error);
        } finally {
            // Remove loading animation
            $('.loading').removeClass('loading');
        }
    });


    router.add('/exchange', () => {
        let html = exchangeTemplate();
        element.html(html);
    });

    router.add('/historical', () => {
        let html = historicalTemplate();
        element.html(html);
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