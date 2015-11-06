(function() {
  'use strict';

  angular
      .module('meanMusic')
      .service('soundService', soundService);

  function soundService($http, $q) {
    var apiKeyParam = 'bda4ada8694db06efcac9cf97b872b3e';

    this.getSounds = getSounds;
    this.searchArtists = searchArtists;

    function searchArtists(artist){
      var deferred = $q.defer();
      $http.get('http://api.soundcloud.com/users' + apiKeyParam + '&q=' + artist)
      .success(function(data){
        deferred.resolve(data);
      })
      .error(function(errors){
        console.log("search errors: ", errors);
      })
      return deferred.promise
    }

    function getSounds(artist) {
      if (!artist){
        artist = 'flume';
      }
      var deferred = $q.defer();
      $http.get('http://api.soundcloud.com/users/' + artist + '/tracks.json?client_id=' + apiKeyParam)
        .success(function(data){
          deferred.resolve(data);
        })
        .error(function(errors){
          console.log("sound errors: ", errors);
        })
      return deferred.promise;
    }
  }

})();