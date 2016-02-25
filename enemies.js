var Enemies = {};

Enemies.build = function (type, tile, game) {
  var Enemy = {};

  Enemy.y = game.height;
  Enemy.type = type;
  Enemy.id = this.qt++;
  Enemy.used = false;

  if (type == "Car") {
    var style = "rgb(";
    style += Math.floor(Math.random()*256) + ",";
    style += Math.floor(Math.random()*256) + ",";
    style += Math.floor(Math.random()*256) + ")";
    Enemy.style = style;

    Enemy.width = 0.8*(game.width/game.tiles);
    Enemy.height = 1.2*Enemy.width;

    Enemy.x = (tile+0.1)*(game.width/game.tiles);
  } else if (type == "Hole") {
    Enemy.style = "rgb(0,200,0)";

    Enemy.width = 0.6*(game.width/game.tiles);
    Enemy.height = Enemy.width;

    Enemy.x = (tile+0.2)*(game.width/game.tiles);
  } else if (type == "Oil") {
    Enemy.style = "rgb(20,20,20)";

    Enemy.width = 0.6*(game.width/game.tiles);
    Enemy.height = Enemy.width;

    Enemy.x = (tile+0.2)*(game.width/game.tiles);
  }


  /* METHODS */
  Enemy.draw = function (game) {
    game.context.fillStyle = this.style;
    game.context.fillRect(this.x, game.height - this.height - this.y, this.width, this.height);
    game.context.strokeRect(this.x, game.height - this.height - this.y, this.width, this.height);
  }

  Enemy.update = function (game) {
    this.y -= game.speed;
    
    if (this.type == 'Car')
      this.y -= 10;
  }

  // checks if enemy is still on game area
  Enemy.inGame = function () {
    return (this.y + this.height >= 0);
  }

  // checks if enemy will make game impossible or collide with another enemy
  Enemy.isValid = function (enemies) {
    return enemies.every(function (other) {
      if (other.id == this.id)
        return 1;
      if (other.x == this.x) {
        if (other.y - other.height <= this.y)
          return 0;
        if (this.y - this.height <= other.y)
          return 0;
      }
      
      // TODO: check if the game will be impossible. Union-Find will do... maybe...
      return 1;
    }, this);
  }

  return Enemy;
};

Enemies.initialize = function () {
  Enemies.list = [];
  Enemies.qt = 0;
};

Enemies.generate = function (game) {
  var tile = Math.floor(game.tiles*Math.random());
  var rand = Math.random();
  var type = null;

  if (rand < 0.75)
    type = "Car";
  else if (rand < 1)
    type = "Oil";
  // TODO: other tipes of enemies

  var enemy = Enemies.build(type, tile, game);

  if (enemy.isValid(this.list))
    this.list.push(enemy);
}

Enemies.update = function (game) {
  var newList = this.list.filter(function (enemy) {
    enemy.update(game);
    var res = (enemy.inGame(game));
    return res;
  });
  this.list = newList;
}

Enemies.draw = function (game) {
  this.list.forEach(function (enemy) {
    enemy.draw(game);
  });
}
