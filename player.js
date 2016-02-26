var Player = {};

Player.setKeys = {r:0,l:0,u:0,d:0};

Player.keyboardListener = function(value) {
  return function (e) {
    var key = e.code;
    if (key == "ArrowLeft" || key == "KeyA")
      Player.setKeys.l = value;
    else if (key == "ArrowRight" || key == "KeyD")
      Player.setKeys.r = value;
    else if (key == "ArrowUp" || key == "KeyW")
      Player.setKeys.u = value;
    else if (key == "ArrowDown" || key == "KeyS")
      Player.setKeys.d = value;
  };
};

Player.initialize = function(x, game) {
  this.width = 0.7*(game.width/game.tiles);
  this.height = 1.3*this.width;
  this.score = 0;
  this.slide = 0;
  this.style = "rgb(0,0,0)";

  this.x = x - this.width/2;
  this.y = 0;

  this.frameCommands = [];
  document.addEventListener("keydown", this.keyboardListener(1));
  document.addEventListener("keyup", this.keyboardListener(0));
}

Player.draw = function(game) {
  game.context.fillStyle = this.style;
  game.context.fillRect(this.x, game.height - this.height - this.y, this.width, this.height);
}

Player.checkCollision = function (game) {
  return function(enemy) {
    var dx = 0;
    if (enemy.x <= this.x && enemy.x + enemy.width >= this.x)
      dx = 1;
    if (this.x <= enemy.x && this.x + this.width >= enemy.x)
      dx = 1;

    var dy = 0;
    if (enemy.y <= this.y && enemy.y + enemy.height >= this.y)
      dy = 1;
    if (this.y <= enemy.y && this.y + this.height >= enemy.y)
      dy = 1;

    if (dx === 1 && dy === 1) {
      if (enemy.type === "Car") {
        return 1;
      } else if (enemy.type === "Oil") {
        if (!enemy.used)
          this.setSlide();
        enemy.used = true;
      } else if (enemy.type === "Hole") {
        if (!enemy.used)
          game.score = Math.max(0, game.score - game.speed*5);
        enemy.used = true;
      }
    }
    return 0;
  }
}

Player.setSlide = function () {
  this.slide = 10;
  this.slideDir = Math.random()*2*Math.PI;
}

Player.update = function(game, enemies) {
  var keys = this.setKeys;

  if (this.slide > 0) {
    this.x += Math.sin(this.slideDir) * game.speed*1.5;
    this.y += Math.cos(this.slideDir) * game.speed*1.5;
    this.slide--;
  } else {
    if (keys.l)
      this.x = this.x - game.speed*1.2;
    if (keys.r)
      this.x = this.x + game.speed*1.2;
    if (keys.u)
      this.y = this.y + game.speed*1.2;
    if (keys.d)
      this.y = this.y - game.speed*1.2;
  }

  this.x = Math.max(Math.min(this.x, game.width - this.width), 0);
  this.y = Math.max(Math.min(this.y, game.height - this.height), 0);

  if (enemies.some(this.checkCollision(game), this)) {
    game.end();
  }
}
