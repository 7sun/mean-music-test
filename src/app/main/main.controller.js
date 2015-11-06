(function() {
  'use strict';

  angular
    .module('meanMusic')
    .controller('MainController', MainController);

  /** @ngInject */
  function MainController($timeout, soundService) {
    var vm = this;
    var apiKeyParam = '?client_id=bda4ada8694db06efcac9cf97b872b3e';

    vm.tracks = [];
    vm.artist;
    vm.currentTrack;
    vm.getTracks = getTracks;
    vm.searchArtists = searchArtists;
    vm.loadTrack = loadTrack;

    getTracks();

    function searchArtists(){
      soundService.searchArtists(vm.artist)
      .then(function(data){
        vm.artists = data;
      })
    }

    function getTracks(artist) {
      soundService.getTracks(artist)
      .then(function(data){
        vm.tracks = data;
      })
    }

    function loadTrack(track){
      track.streamable ? vm.currentTrack = track.stream_url + apiKeyParam : alert("This song is not available for streaming");
    }
  }
})();
