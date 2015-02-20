;(function(){
  if (typeof Asteroids === "undefined") {
    window.Asteroids = {};
  }

  var Ship = Asteroids.Ship = function(pos, game){
    Asteroids.MovingObject.call(this, pos, game);
    this.vel = [0,0];
    this.color = Ship.COLOR;
    this.radius = Ship.RADIUS;
  }

  Asteroids.Util.inherits(Ship, Asteroids.MovingObject);

  Ship.RADIUS = 20;
  Ship.COLOR = "#0000FF"

  Ship.prototype.relocate = function () {
    this.pos = game.randomPosition();
    this.vel = [0, 0];
  };

  Ship.prototype.power = function (impulse) {
    this.vel[0] += impulse[0];
    this.vel[1] += impulse[1];
  };

  Ship.prototype.fireBullet = function () {
    var bullet = new Asteroids.Bullet({pos: [this.pos[0], this.pos[1]], vel: [this.vel[0] * 2, this.vel[1] * 2 - 1]}, this.game);
    this.game.bullets.push(bullet);
  };

})();
