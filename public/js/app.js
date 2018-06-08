window.addEventListener('load', () => {
    const element = $('#app');

    // Compile the Handlebar Templates
    const errorTemplate = Handlebars.compile($('#error-template').html());
    const ratesTemplate = Handlebars.compile($('#rates-template').html());
    const exchangeTemplate = Handlebars.compile($('#exchange-template').html());
    const historicalTemplate = Handlebars.compile($('#historical-template').html());

    const html = ratesTemplate();

    element.html(html);

});