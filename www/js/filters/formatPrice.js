app.filter('formatPrice', function () {
    return function (price) {
        if (price != '' && typeof price != 'undefined' && price != null) {
            var arrayPrice = price.toString().split('.');
            if (arrayPrice.length == 2) {
                if (arrayPrice[1].length == 1) {
                    arrayPrice[1] = arrayPrice[1] + '0';
                }
                price = arrayPrice[0] + ',' + arrayPrice[1];
            } else {
                price = price + ',00';
            }
        } else {
            price = '0,00';
        }
        return price;
    }
});