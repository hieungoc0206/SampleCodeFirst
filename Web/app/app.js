

(function () {
    angular.module('tedushop',
        ['tedushop.products',
         'tedushop.application_groups',
         'tedushop.product_categories',
         'tedushop.application_roles',
         'tedushop.application_users',
           'tedushop.statistics',
         'tedushop.common'])
        .config(config)
        .config(configAuthentication);

    config.$inject = ['$stateProvider', '$urlRouterProvider'];

    function config($stateProvider, $urlRouterProvider) {
        $stateProvider
            .state('base', {
                url: '',
                templateUrl: '/app/shared/views/baseView.html',
                abstract: true
            }).state('login', {
                url: "/login",
                templateUrl: "/app/components/login/loginView.html",
                controller: "loginController"
            })
            .state('home', {
                url: "/admin",
                parent: 'base',
                templateUrl: "/app/components/home/homeView.html",
                controller: "homeController"
            });
        $urlRouterProvider.otherwise('/login');
    }

    function configAuthentication($httpProvider) {
        $httpProvider.interceptors.push(function ($q, $location, localStorageService) {
            return {
                request: function (config) {
                    config.headers = config.headers || {};
                    var authData = localStorageService.get('TokenInfo');
                    if (authData) {
                        authData = JSON.parse(authData);
                        config.headers.Authorization = 'Bearer ' + authData.accessToken;
                    }

                    return config;
                },
                responseError: function (rejection) {
                    if (rejection.status === 401) {
                        $location.path('/login');
                        console.log("Không có quyền !")
                    }
                    return $q.reject(rejection);
                }
            };
        });
    }
})();