(function() {
  'use strict';

  angular
      .module('meanMusic')
      .service('soundService', soundService);

  function soundService($http, $q) {
    var apiKeyParam = 'bda4ada8694db06efcac9cf97b872b3e';

    this.getTracks = getTracks;
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

    function getTracks(artist) {
      if (!artist){
        artist = 'flume';
      }
      var deferred = $q.defer();
      $http.get('http://api.soundcloud.com/users/' + artist + '/tracks.json?client_id=' + apiKeyParam)
        .success(function(data){
          deferred.resolve(data);
        })
        .error(function(errors){
          console.log("track errors: ", errors);
        })
      return deferred.promise;
    }
  }

})();