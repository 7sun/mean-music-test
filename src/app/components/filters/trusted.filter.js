(function() {
  'use strict';

  angular
      .module('meanMusic')
      .filter('trusted', ['$sce', function ($sce) {
        return function(url) {
            return $sce.trustAsResourceUrl(url);
        };
      }]);
})();