;(function () {
  if (typeof Asteroids === "undefined") {
    window.Asteroids = {};
  }

  var Game = Asteroids.Game = function(height, width){
    this.DIM_X = width;
    this.DIM_Y = height;
    this.asteroids = [];
    this.addAsteroids();
    this.bullets = [];
    this.ship = new Asteroids.Ship({pos:this.randomPosition()}, this);
  };

  Game.NUM_ASTEROIDS = 7;

  Game.prototype.addAsteroids = function(){
    for (var i = 0; i < Game.NUM_ASTEROIDS; i++) {
      this.asteroids.push(new Asteroids.Asteroid({pos:this.randomPosition()}, this));
    }
  };

  Game.prototype.allObjects = function () {
    var allObjects = [this.ship];

    this.asteroids.forEach(function(asteroid){
      allObjects.push(asteroid);
    });
    this.bullets.forEach(function(bullet){
      allObjects.push(bullet);
    });

    return allObjects;
  };

  Game.prototype.draw = function (ctx) {
    ctx.clearRect(0, 0, this.DIM_X, this.DIM_Y);

    this.allObjects().forEach(function(asteroid){
      asteroid.draw(ctx);
    })
  };

  Game.prototype.moveObjects = function () {
    this.allObjects().forEach(function(object){
      object.move();
    })
  };

  Game.prototype.randomPosition = function(){
    var xpos = Math.random() * this.DIM_X;
    var ypos = Math.random() * this.DIM_Y;
    return [xpos, ypos];
  }

  Game.prototype.wrap = function (pos) {
    if (pos[0] < 0) {
      pos[0] = this.DIM_X; }
    else if (pos[0] > this.DIM_X) {
      pos[0] = 0;}
    else if (pos[1] > this.DIM_Y) {
      pos[1] = 0;}
    else if (pos[1] < 0) {
      pos[1] = this.DIM_Y;
    }
    return pos;
  };

  Game.prototype.checkCollisions = function () {
    var objects = this.allObjects();

    for (var i = 0; i < objects.length; i++) {
      for (var j = i + 1; j < objects.length; j++) {
        if (objects[i].isCollidedWith(objects[j])){
          objects[i].collideWith(objects[j]);
        }
      }
    }
  };

  Game.prototype.step = function () {
    this.moveObjects();
    this.checkCollisions();
  };

  Game.prototype.remove = function (obj) {
    if (obj instanceof Asteroids.Asteroid) {
    var removalindex = this.asteroids.indexOf(obj);
    this.asteroids.splice(removalindex, 1);
  } else if (obj instanceof Asteroids.Bullet) {
    var removalindex = this.bullets.indexOf(obj);
    this.bullets.splice(removalindex, 1);
  }
  };

  Game.prototype.isOutOfBounds = function(pos) {
    return (pos[0] > this.DIM_X) || (pos[0] < 0) || (pos[1] > this.DIM_Y) || (pos[1] < 0);
  };

})();
