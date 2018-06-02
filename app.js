// Inicializando la App
var MODULE = 'front-app', // DEJAR CON EL MISMO NOMBRE
    API = {
        'token_name': 'TOKEN-DIGIFUS', // EL NOMBRE DEL TOKEN QUE HAN DEFINIDO PARA SU API
        'base_url': 'http://api.puffalexa.com/public/' // LA URL DE SU API
    };

var frontApp = angular.module(MODULE, [
    'ngRoute',
    'authControllers',
    'solicitudControllers',
    'perfilControllers',
    'terceroControllers',
    'testControllers'
]);

(function(){
    if(typeof(localStorage[API.token_name]) === 'undefined'){
        localStorage[API.token_name] = '';
    }
}());