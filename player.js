var Player = {};

Player.speed = 20;
Player.setKeys = {r:0,l:0,u:0,d:0};

Player.keyboardListener = function(value) {
  return function (e) {
    var code = e.keyCode;

    if (code == 37)
      Player.setKeys.l = value;
    else if (code == 39)
      Player.setKeys.r = value;
    else if (code == 38)
      Player.setKeys.u = value;
    else if (code == 40)
      Player.setKeys.d = value;
  };
};

Player.initialize = function(x, game) {
  this.x = x - this.width/2;
  this.y = 0;

  this.width = 0.9*(game.width/game.tiles);
  this.height = 1.5*this.width;

  this.frameCommands = [];
  document.addEventListener("keypress", this.keyboardListener(1));
  document.addEventListener("keyup", this.keyboardListener(0));
}

Player.draw = function(game) {
  game.context.fillStyle = "rgb(0,0,0)";
  game.context.fillRect(this.x, game.height - this.height - this.y, this.width, this.height);
}

Player.update = function(game) {
  var keys = this.setKeys;

  if (keys.l)
    this.x = Math.max(this.x - this.speed, 0);
  if (keys.r)
    this.x = Math.min(this.x + this.speed, Game.width - this.width);
  if (keys.u)
    this.y = Math.min(this.y + this.speed, Game.height - this.height);
  if (keys.d)
    this.y = Math.max(this.y - this.speed, 0);
}
