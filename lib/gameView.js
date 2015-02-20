;(function(){
  if (typeof Asteroids === "undefined") {
    window.Asteroids = {};
  }

  var GameView = Asteroids.GameView = function(game, ctx){
    this.game = game;
    this.ctx = ctx;
  };

  GameView.prototype.start = function () {
    that = this
    this.bindKeyHandlers();
    setInterval(function(){
      this.game.step();
      this.game.draw(that.ctx);
    }, 20);
  };

  GameView.prototype.bindKeyHandlers = function () {
    game = this.game
    key('up', function(){game.ship.power([0,-1])});
    key('down', function(){game.ship.power([0,1])});
    key('left', function(){game.ship.power([-1,0])});
    key('right', function(){game.ship.power([1,0])});
    key('space', function(){game.ship.fireBullet()});
  };

})();
