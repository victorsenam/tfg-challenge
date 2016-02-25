var Enemies = {};

Enemies.list = [];

Enemies.build = function (type, tile, game) {
  var Enemy = {};

  Enemy.width = 0.8*(game.width/game.tiles);
  Enemy.x = (tile+0.1)*(game.width/game.tiles);
  Enemy.y = game.height;
  Enemy.type = type;
  Enemy.style = "rgb(200,0,0)";

  Enemy.draw = function (game) {
    game.context.fillStyle = this.style;
    game.context.fillRect(this.x, game.height - this.height - this.y, this.width, this.height);
  }

  Enemy.update = function (game) {
    this.y -= game.speed;
  }

  // checks if enemy is still on game area
  Enemy.inGame = function () {
    return (this.y + this.height >= 0);
  }

  // checks if enemy will make game impossible or collide with another enemy
  Enemy.isValid = function (enemies) {
    for (var x = 0; x < enemies.length; x++) {
      var other = enemies[x];

      if (other.x == this.x && Lib.rectangle.getDistance(this, other) <= 0)
        return 0;

      // TODO: check if the game will be impossible. Union-Find will do... maybe...
    }
  }
};

Enemies.generate = function (game) {
  var tile = Math.floor(Math.tiles*Math.random());
  var rand = Math.random;
  var type = null;

  if (rand < 1)
    type = 'car';

  var enemy = Enemies.build(type, tile, game);

  if (enemy.isValid(this.list))
    this.list.push(enemy);
}

Enemies.update = function (game) {
  var newList = [];
  for (var x = 0; x < this.list.length; x++) {
    this.list[x].update(game);     
    if (this.list[x].inGame(game))
      newList.push(this.list[x]);
  }
  this.list = newList;
}

Enemies.draw = function (game) {
  for (var x = 0; x < this.list.length; x++) {
    this.list[x].draw(game);
  }
}
