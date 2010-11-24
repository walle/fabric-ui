var FabricUi = function (canvas, id) {

  // Internal class describes a point in 2d space
  var Point = function(x, y) {
    this.x = x;
    this.y = y;
  };

  //private
  var self = this;
  var canvas = canvas;
  canvas.isDrawingMode = true;
  canvas.freeDrawingLineWidth = 5;

  var id = id;
  var startPoint = new Point(0, 0);
  var endPoint = new Point(0, 0);
  
  $('#'+id).mousedown(function(e) {
    startPoint = new Point((e.pageX - this.offsetLeft), (e.pageY - this.offsetTop));
  });


  $('#'+id).mouseup(function(e) {
    endPoint = new Point((e.pageX - this.offsetLeft), (e.pageY - this.offsetTop));

    var options = {
      left: startPoint.x,
      top: startPoint.y,
      width: Math.abs(endPoint.x - startPoint.x),
      height: Math.abs(endPoint.y - startPoint.y),
      fill: self.getColor()
    };

    switch(activeTool)
    {
      case 'add-image':
        var url = prompt('Image url', '');
        addImage(url, { x: endPoint.x, y: endPoint.y });
      break;
      case 'add-rectangle':
        var rect = new fabric.Rect(options);

        canvas.add(rect);
      break;
      case 'add-ellipse':
        options.rx = options.width / 2;
        options.ry = options.height / 2;

        var ellipse = new fabric.Ellipse(options); 
        canvas.add(ellipse);
      break;
      default:
      break;
    }
  });

  var activeTool = '';

  var deleteSelected = function() {
    var activeObject = canvas.getActiveObject();
    var activeGroup = canvas.getActiveGroup();

    if (activeObject)
    {
      canvas.remove(activeObject);
    }
    else if (activeGroup)
    {
      var objectsInGroup = activeGroup.getObjects();
      canvas.removeActiveGroup();
      $.each(objectsInGroup, function(index, object)
      {
        canvas.remove(object);
      });
    }
  }

  var addImage = function(url, options) {
    var defaults = {
      x: 0,
      y: 0,
      angle: 0,
      scale: 1
    };

    var options = $.extend(defaults, options);

    fabric.Image.fromURL(url, function(image) {
      image.set('left', options.x).set('top', options.y).set('angle', options.angle).scale(options.scale).setCoords();
      canvas.add(image);
    });
  }

  // public
  this.tools = ['pen', 'hand', 'add-image', 'add-rectangle', 'add-ellipse'];
  this.actions = ['delete', 'clear'];

  this.changeTool = function (newTool) {
    activeTool = newTool;

    switch(activeTool)
    {
      case 'pen':
        canvas.isDrawingMode = true;
      break;
      default:
        canvas.isDrawingMode = false;
      break;
    }
  };

  this.doAction = function(action) {
    switch(action)
    {
      case 'delete':
        deleteSelected();
      break;
      case 'clear':
        canvas.clear();
      break;
      default:
      break;
    }
  }

  this.toJSON = function() {
    return JSON.stringify(canvas.toJSON());
  }

  this.loadJSON = function(json) {
    canvas.loadFromJSON(json);
  }

  this.setColor = function(newColor) {
    canvas.freeDrawingColor = newColor;
  };

  this.getColor = function() {
    return canvas.freeDrawingColor;
  };

  this.setLineWidth = function(newWidth) {
    canvas.freeDrawingLineWidth = newWidth;
  };

  this.getLineWidth = function() {
    return canvas.freeDrawingLineWidth;
  };
};

