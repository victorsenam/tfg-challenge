var Player = {};

Player.speed = 20;
Player.setKeys = {r:0,l:0,u:0,d:0};

Player.keyboardListener = function(value) {
  return function (e) {
    var key = e.key;

    if (key == "ArrowLeft" || key == "a")
      Player.setKeys.l = value;
    else if (key == "ArrowRight" || key == "d")
      Player.setKeys.r = value;
    else if (key == "ArrowUp" || key == "w")
      Player.setKeys.u = value;
    else if (key == "ArrowDown" || key == "s")
      Player.setKeys.d = value;
  };
};

Player.initialize = function(x, game) {
  this.width = 0.7*(game.width/game.tiles);
  this.height = 1.3*this.width;
  this.style = "rgb(0,0,0)";

  this.x = x - this.width/2;
  this.y = 0;

  this.frameCommands = [];
  document.addEventListener("keypress", this.keyboardListener(1));
  document.addEventListener("keyup", this.keyboardListener(0));
}

Player.draw = function(game) {
  game.context.fillStyle = this.style;
  game.context.fillRect(this.x, game.height - this.height - this.y, this.width, this.height);
}

Player.checkCollision = function(enemy) {
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
    }
  }
  return 0;
}

Player.setSlide = function () {
  this.slide = 10;
  this.slideDir = Math.floor(Math.random()*2)*2 - 1;
}

Player.update = function(game, enemies) {
  var keys = this.setKeys;

  if (this.slide > 0) {
    this.x += this.slideDir * this.speed * 0.75;
    this.slide--;
  }

  if (keys.l)
    this.x = this.x - this.speed;
  if (keys.r)
    this.x = this.x + this.speed;
  if (keys.u)
    this.y = this.y + this.speed;
  if (keys.d)
    this.y = this.y - this.speed;

  this.x = Math.max(Math.min(this.x, game.width - this.width), 0);
  this.y = Math.max(Math.min(this.y, game.height - this.height), 0);

  if (enemies.some(this.checkCollision, this)) {
    game.end();
  }
}
