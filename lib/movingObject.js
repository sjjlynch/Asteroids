;(function () {
  if (typeof Asteroids === "undefined") {
    window.Asteroids = {};
  }

  var MovingObject = Asteroids.MovingObject = function(obj, game){
    this.pos = obj.pos;
    this.vel = obj.vel;
    this.radius = obj.radius;
    this.color = obj.color;
    this.game = game;
  };

  MovingObject.prototype.draw = function(ctx){
    ctx.fillStyle = this.color;
    ctx.beginPath();

    ctx.arc(
      this.pos[0],
      this.pos[1],
      this.radius,
      0,
      2 * Math.PI,
      false
    );

    ctx.fill();
  };

  MovingObject.prototype.isWrappable = true;

  MovingObject.prototype.move = function(){
    this.pos[0] += this.vel[0];
    this.pos[1] += this.vel[1];
    // that = this
    // this.pos = this.game.wrap(this.pos);
    if (this.game.isOutOfBounds(this.pos)) {
      if (this.isWrappable) {
        this.pos = this.game.wrap(this.pos);
      }
      else {
        game.remove(this);
      }
    };
  };

  MovingObject.prototype.distance = function (otherObject) {
    var xDist = otherObject.pos[0] - this.pos[0];
    var yDist = otherObject.pos[1] - this.pos[1];
    return Math.sqrt((xDist * xDist) + (yDist * yDist));
  };

  MovingObject.prototype.isCollidedWith = function (otherObject) {
    return (this.distance(otherObject) < (this.radius + otherObject.radius));
  };

  MovingObject.prototype.collideWith = function (otherObject) {
    if (((this instanceof Asteroids.Bullet) && (otherObject instanceof Asteroids.Ship)) ||
      ((this instanceof Asteroids.Ship) && (otherObject instanceof Asteroids.Bullet))) {}
    else if (otherObject instanceof Asteroids.Ship) {
      otherObject.relocate();
    } else if ( this instanceof Asteroids.Ship){
      this.relocate();
    } else if ((this instanceof Asteroids.Bullet) || (otherObject instanceof Asteroids.Bullet)) {
    this.game.remove(otherObject);
    this.game.remove(this);
  }
  };

})();
