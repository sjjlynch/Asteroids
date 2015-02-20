;(function () {
  if (typeof Asteroids === "undefined") {
    window.Asteroids = {};
  }


  var Asteroid = Asteroids.Asteroid = function(obj, game){
    Asteroids.MovingObject.call(this, obj, game);
    this.color = Asteroid.COLOR;
    this.radius = Asteroid.RADIUS;
    this.vel = Asteroids.Util.randomVec(Math.random()*10);
  };

  Asteroid.COLOR = "#FF0000";
  Asteroid.RADIUS = 20;

  Asteroids.Util.inherits(Asteroid, Asteroids.MovingObject);


})();
