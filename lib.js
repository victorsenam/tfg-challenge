var Lib = {
  rectangle: {
    getDistance: function (a, b) {
      var dx = 0;
      if (a.x + a.width < b.x)
        dx = b.x - a.x - a.width;
      else if (b.x + b.width < a.x)
        dx = a.x - b.x - b.width;

      var dy = 0;
      if (a.y-a.height < b.y)
        dy = b.y-a.y+a.height;
      else if (b.y-b.height < a.y)
        dy = a.y-b.y-b.height;

      return Math.sqrt(dx*dx + dy*dy);
    }
  }
};
