var Game = {};

Game.fps = 30;
Game.tiles = 4;
Game.state = "Stopped";
Game.highScore = 0;

Game.keyboardListener = function (e) {
  var key = e.key;

  if (key == " ") {
    if (Game.state == "Stopped")
      Game.initialize();
  }
}

Game.showScore = function () {
  this.context.fillText("Your Score: " + this.score, 10, 10);
  this.context.fillText("High Score: " + this.highScore, 10, 30);
  this.context.fillText("Press space to reset", 10, 50);
}

Game.initialize = function () {
  this.canvas = document.getElementById("canvas");
  this.context = this.canvas.getContext("2d");

  this.width = this.canvas.width;
  this.height = this.canvas.height;

  this.speed = 10;
  this.state = "Running";
  this.score = 0;
  this.ticks = 0;

  Enemies.initialize();
  Player.initialize(this.width/2, Game);
};

Game.draw = function () {
  this.context.clearRect(0, 0, this.width, this.height);

  Enemies.draw(Game);
  Player.draw(Game);

  this.context.fillText("Your Score: " + this.score, 10, 10);
  this.context.fillText("High Score: " + this.highScore, 10, 30);
};

Game.update = function () {
  if (Game.state == "End") {
    Game.showScore();
    Game.state = "Stopped";
  } else if (Game.state == "Running") {
    this.ticks++;
    this.score += Math.floor(this.speed/10);

    Enemies.update(Game);
    Player.update(Game, Enemies.list);

    if (Math.random() < 0.05)
      Enemies.generate(Game);

    if ((this.ticks%90) == 0)
      this.speed++;
  }
};

Game.end = function () {
  this.state = "End";
  this.highScore = Math.max(this.highScore, this.score);
};
