var Game = {};

Game.fps = 30;
Game.speed = 10;
Game.tiles = 4;
Game.state = "Stopped";
Game.highScore = 0;

Game.keyboardListener = function (e) {
  var code = e.charCode;

  if (code == 32) {
    if (Game.state == "Stopped")
      Game.initialize();
  }
}

Game.showScore = function () {
  this.context.fillText("High Score: " + this.highScore, 10, 10);
  this.context.fillText("Press space to reset", 10, 30);
}

Game.initialize = function () {
  this.canvas = document.getElementById("canvas");
  this.context = this.canvas.getContext("2d");

  this.width = this.canvas.width;
  this.height = this.canvas.height;

  this.state = "Running";
  this.score = 0;
  this.ticks = 0;

  Player.initialize(this.width/2, Game);
  Enemies.initialize();
};

Game.draw = function () {
  this.context.clearRect(0, 0, this.width, this.height);

  Enemies.draw(Game);
  Player.draw(Game);
};

Game.update = function () {
  this.ticks++;

  Enemies.update(Game);
  Player.update(Game, Enemies.list);

  if (Math.random() < 0.02)
    Enemies.generate(Game);

  if ((this.ticks%180) == 0) {
    this.speed += 1;
    console.log(this.speed);
  }
};

Game.end = function () {
  Game.state = "End";
};
