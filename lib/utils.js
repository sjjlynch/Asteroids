;(function(){
  if (typeof Asteroids.Util === "undefined"){
    window.Asteroids.Util = {};
  }
  
  Asteroids.Util.inherits = function(ChildClass, ParentClass) {
    Surrogate = function(){};
    Surrogate.prototype = ParentClass.prototype;
    ChildClass.prototype = new Surrogate();
  };

  Asteroids.Util.randomVec = function(length){
    var x = Math.random() * length;
    var y = Math.sqrt(length*length - x*x);
    return [x,y];
  };


})();
