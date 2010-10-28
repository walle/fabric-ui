var FabricUi = function (canvas, id) {

  //private
  var canvas = canvas;
  canvas.isDrawingMode = true;
  canvas.freeDrawingLineWidth = 5;

  var id = id;

  $('#'+id).mouseup(function(e) {
    var x = e.pageX - this.offsetLeft;
	  var y = e.pageY - this.offsetTop;

    switch(activeTool)
    {
      case 'add-image':
        var url = prompt('Image url', '');
        addImage(url, { x: x, y: y });
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
      objectsInGroup.forEach(function(object)
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
  this.tools = ['pen', 'hand', 'add-image'];
  this.actions = ['delete', 'clear'];

  this.changeTool = function (newTool) {
    activeTool = newTool;

    switch(activeTool)
    {
      case 'pen':
        canvas.isDrawingMode = true;
      break;
      case 'hand':
        canvas.isDrawingMode = false;
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

