// Rutas
frontApp.config(['$routeProvider',
  function($routeProvider) {
    $routeProvider.
      when('/', {
        templateUrl: 'partials/auth/login.html',
        controller: 'AuthLoginCtrl'
      }).
      when('/logout', {
        templateUrl: 'partials/empty.html',
        controller: 'AuthLogoutCtrl'
      }).

      when('/principal', {
        templateUrl: 'partials/solicitudes/principal.html',
        controller: 'solicitudListarCtrl'
      }).
      when('/principal/registrar', {
        templateUrl: 'partials/solicitudes/registrar.html',
        controller: 'solicitudRegistrarCtrl'
      }).
      when('/principal/visualizar/:id',{
        templateUrl: 'partials/solicitudes/visualizar.html',
        controller: 'SolicitudVisualizarCtrl'
      }).
      when('/test', {
        templateUrl: 'partials/test/test.html',
        controller: 'TestCtrl'
      }).
      when('/perfil/visualizar/:usuario',{
          templateUrl: 'partials/perfil/visualizar.html',
          controller: 'PerfilVisualizarCtrl'
      }).

      otherwise({
        redirectTo: '/'
      });
  }]);