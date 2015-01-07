var myApp = angular.module('ciwielCosplay', ['ui.router', 'slick']);


myApp.config(function($stateProvider, $urlRouterProvider) {
  //
  // For any unmatched url, redirect to /
  $urlRouterProvider.otherwise("/");
  //
  // Now set up the states
  $stateProvider
    .state('home', {
      url: '/',
      templateUrl: 'views/home.html'
    })
    .state('about', {
    	url: '/about',
    	templateUrl: 'views/about.html'
    })
    .state('portfolio', {
    	url: '/portfolio',
    	templateUrl: 'views/portfolio.html'
    })
    .state('contact', {
    	url: '/contact',
    	templateUrl: 'views/contact.html'
    })
    .state('item', {
      url: '/portfolio/item',
      templateUrl: 'views/item.html'
    })
});