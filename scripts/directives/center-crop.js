(function() {

    'use strict'

    angular
        .module('ciwielCosplay')
        .directive('centerCrop', centerCrop);

    function centerCrop() {
       var centerCrop = {
            restrict: 'A',
            replace: true,
            controller: ['$scope', '$element', '$q', '$window', '$timeout', function($scope, $element, $q, $window, $timeout) {
                /* jshint validthis: true */
                var vm          = this;
                vm.image        = {
                    element: null,
                    width: null,
                    height: null
                };
                vm.container    = {
                    width: null,
                    height: null
                };

                vm.fitImage = fitImage;

                angular.element($window).bind('resize', function() {
                    $timeout(function() {
                        vm.container.width  = $element.parent().width();
                        vm.container.height = $element.parent().height();
                        $element.css( vm.fitImage() );
                    }, 500);
                });

                function fitImage() {
                    var styles, 
                        height = vm.container.height, 
                        width  = vm.container.width;

                    if(vm.container.width > vm.container.height) {
                        // Find height
                        height = Math.round( vm.image.height / vm.image.width * vm.container.width );
                        styles = {
                            'width': vm.container.width,
                            'height': height
                        }; 
                        if(height < vm.container.height) {
                            // If width are to small for the container
                            var toSmallBy   = vm.container.height - height;
                            height          = height + toSmallBy;
                            width           = Math.round( vm.image.width / vm.image.height * height);
                            // Setting new sizes
                            styles.width    = width;
                            styles.height   = height;                    
                        }                                 
                    } else {
                        // Find width
                        width = Math.round( vm.image.width / vm.image.height * vm.container.height );
                        styles = {
                            'width': width,
                            'height': vm.container.height
                        }; 
                        if(width < vm.container.width) {
                            var toSmallBy   = vm.container.width - width;
                            height          = width + toSmallBy;
                            width           = Math.round( vm.image.width / vm.image.height * height);
                            // Setting new sizes
                            styles.width    = width;
                            styles.height   = height;
                        }                    
                    }
                    // Position image if to big for container
                    angular.extend(styles, positionImage(width, height) );

                    angular.extend(styles, {
                        'max-width': 'none',
                        'max-height': 'none'
                    });

                    return styles;
                };                

                function positionImage(width, height) {
                    var position = {
                        'position': 'absolute',
                        'left': 0,
                        'top': 0
                    };
                    
                    if(width > vm.container.width) {                
                        var left = -Math.abs( (vm.image.width - vm.container.width) / 2 );
                        angular.extend(position, {
                            'left': left
                        });
                    }

                    if(height > vm.container.height) {
                        var top = -Math.abs( (vm.image.height - vm.container.height) / 2 );
                        angular.extend(position, {
                            'top': top
                        });
                    } 
                    return position;                
                };
            }], 
            controllerAs: 'centerCrop', 
            link: link
        }

        return centerCrop;

        function link(scope, element, attrs, $window) {
            element[0].onload = function() {
                scope.centerCrop.image.element      = element;
                scope.centerCrop.image.width        = element[0].naturalWidth;
                scope.centerCrop.image.height       = element[0].naturalHeight;

                var parent = angular.element(element[0]).parent();
                // If parent is a column 
                if( parent.hasClass('columns') ) {
                    var gparent = parent.parent();
                    angular.element(element[0]).parent().css({
                        height: Math.min( $window.innerHeight, gparent.height() ),
                        position: 'relative',
                        overflow: 'hidden'
                    });
                } else {
                    angular.element(element[0]).parent().css({
                        height: parent.height(),
                        position: 'relative',
                        overflow: 'hidden'
                    });                    
                }
                
                scope.centerCrop.container.width    = parent.width();
                scope.centerCrop.container.height   = angular.element(element[0]).parent().height();

                element.css( scope.centerCrop.fitImage() );
            };
        };
    }
    
})();