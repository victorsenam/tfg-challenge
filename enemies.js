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

    Enemy.style = {regular: style, ghost: style};
    Enemy.width = 0.8*(game.width/game.tiles);
    Enemy.height = 1.2*Enemy.width;

    Enemy.x = (tile+0.1)*(game.width/game.tiles);
  } else if (type == "Hole") {
    Enemy.style = {};
    Enemy.style.regular = "rgb(204,102,0)";
    Enemy.style.ghost = "rgba(204,102,0,0.2)";

    Enemy.width = 0.6*(game.width/game.tiles);
    Enemy.height = Enemy.width;

    Enemy.x = (tile+0.2)*(game.width/game.tiles);
  } else if (type == "Oil") {
    Enemy.style = {};
    Enemy.style.regular = "rgb(20,20,20)";
    Enemy.style.ghost = "rgba(20,20,20,0.2)";

    Enemy.width = 0.6*(game.width/game.tiles);
    Enemy.height = Enemy.width;

    Enemy.x = (tile+0.2)*(game.width/game.tiles);
  }


  /* METHODS */
  Enemy.draw = function (game) {
    game.context.fillStyle = this.style.regular;
    if (this.used) {
      game.context.fillStyle = this.style.ghost;
    }
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
  Enemy.isValid = function (game, enemies, player) {
    return enemies.every(function (other) {
      if (other.id == this.id)
        return 1;

      if (other.x == this.x) {
        if (other.y - other.height <= this.y)
          return 0;
        if (this.y - this.height <= other.y)
          return 0;
      }

      if (Math.abs(this.x - other.x) == (game.width/game.tiles)) {
        var dist = game.height - other.y;
        // this should be an easily passable distance
        if (dist <= 1.3*(player.height + 10*player.width/game.speed))
          return 0;
      }
      
      return 1;
    }, this);
  }

  return Enemy;
};

Enemies.initialize = function () {
  Enemies.list = [];
  Enemies.qt = 0;
};

Enemies.generate = function (game, player) {
  var tile = Math.floor(game.tiles*Math.random());
  var rand = Math.random();
  var type = null;

  if (rand < 0.8)
    type = "Car";
  else if (rand < 0.9)
    type = "Oil";
  else
    type = "Hole";

  var enemy = Enemies.build(type, tile, game);

  if (enemy.isValid(game, this.list, player))
    this.list.push(enemy);
};

Enemies.update = function (game) {
  var newList = this.list.filter(function (enemy) {
    enemy.update(game);
    var res = (enemy.inGame(game));
    return res;
  });
  this.list = newList;
};

Enemies.draw = function (game) {
  this.list.forEach(function (enemy) {
    enemy.draw(game);
  });
};
