(function() {
  'use strict';

  angular
    .module('meanMusic')
    .controller('MainController', MainController);

  /** @ngInject */
  function MainController($timeout, soundService) {
    var vm = this;
    var apiKeyParam = '?client_id=bda4ada8694db06efcac9cf97b872b3e';

    vm.sounds = [];
    vm.artist;
    vm.currentTrack;
    vm.getSounds = getSounds;
    vm.searchArtists = searchArtists;
    vm.loadTrack = loadTrack;

    getSounds();

    function searchArtists(){
      soundService.searchArtists(vm.artist)
      .then(function(data){
        vm.artists = data;
      })
    }

    function getSounds(artist) {
      soundService.getSounds(artist)
      .then(function(data){
        vm.sounds = data;
      })
    }

    function loadTrack(sound){
      sound.streamable ? vm.currentTrack = sound.stream_url + apiKeyParam : alert("This song is not available for streaming");
    }
  }
})();
