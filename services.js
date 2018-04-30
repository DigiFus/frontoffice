frontApp.factory('auth', ['$location', function ($location) {
    var auth = {
        setToken: function (token) {
            localStorage[API.token_name] = token;
            localStorage.setItem('data_sess', JSON.stringify(token));
        },
        getToken: function () {
            return localStorage[API.token_name];
        },
        getUserData: function () {
            try{
                var token = localStorage[API.token_name];
                if (token === '') return;

                var base64Url = token.split('.')[1];
                var base64 = base64Url.replace('-', '+').replace('_', '/');

                return JSON.parse(window.atob(base64)).data;
            }catch (err){
                //lo envia al home
                $location.path('/');
            }
            
        },
        logout: function () {
            localStorage[API.token_name] = '';
            localStorage.removeItem('TOKEN-DIGIFUS');
            localStorage.removeItem('data_sess');
            $location.path('/');
        },
        hasToken: function () {
            return (localStorage[API.token_name] !== '');
        },
        redirectIfNotExists: function () {
            if (!auth.hasToken()) {
                $location.path('/');
            }
        }
    };

    return auth;
}]);

frontApp.service('loader',['$location','auth', function ($location,auth) {
    this.show = function (show) {
        document.querySelector("#loader").style.display = show ? 'block' : 'none';
    };
    //verificamos al iniciar que si exista un token creado,
    //si se encuentra uno creado, lo dirigimos a la pagina principal
    var token = localStorage.getItem('TOKEN-DIGIFUS');
    if (token != "" && token == auth.getToken()) {
        $location.path('/principal');
    }
}]);

frontApp.service('restApi', ['$http', 'loader', 'auth', function ($http, loader, auth) {
    this.call = function (config) {
        var headers = {};
        headers[API.token_name] = auth.getToken();

        loader.show(true);

        var http_config = {
            method: config.method,
            url: API.base_url + config.url,
            data: typeof (config.data) === 'undefined' ? null : config.data,
            headers: headers
        };

        $http(http_config).then(function successCallback(response) {
            loader.show(false);
            config.response(response.data);
        }, function errorCallback(response) {
            loader.show(false);

            switch (response.status) {
                case 401: // No autorizado
                    auth.logout();
                    break;
                case 422: // Validación
                    config.validationError(response.data);
                    break;
                default:
                    config.error(response);
                    console.log(response.statusText);
                    break;
            }
        });
    };
}]);