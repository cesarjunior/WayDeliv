app.directive('maskMoney', function () {
    return {
        restrict: 'A',
        link: function (scope, element, attr) {
            element.on('change keyup', function () {
                var valor = element.val();
                valor = valor.replace(/\D/g, '');
                if (valor.length == 0) {
                    valor = '000';
                } else {
                    if (valor.length < 3) {
                        for (i = valor.length; i < 3; i++) {
                            valor = '0' + valor;
                        }

                    }
                    if (valor.length > 3) {
                        for (i = 1; i <= valor.length; i++) {
                            if (valor.length > 3) {
                                if (valor.slice(0, 1) == 0) {
                                    valor = valor.slice(1);
                                } else {
                                    break;
                                }
                            }
                        }

                    }
                }
                antiVirgula = valor.slice(0, valor.length - 2);
                posVirgula = valor.slice(-2);
                valor = antiVirgula + ',' + posVirgula;
                scope.$apply(function () {
                    arrayModel = attr.ngModel.split('.');
                    scope[arrayModel[0]][arrayModel[1]] = valor;
                });
            });
        }
    };
});