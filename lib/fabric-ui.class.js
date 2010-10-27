var FabricUi = function (canvas) {

  //private
  var canvas = canvas;
  canvas.isDrawingMode = true;
  canvas.freeDrawingLineWidth = 5;

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

  // public
  this.tools = ['pen', 'hand'];
  this.actions = ['delete'];

  this.changeTool = function (newTool) {
    switch(newTool)
    {
      case 'pen':
        canvas.isDrawingMode = true;
      break;
      case 'hand':
        canvas.isDrawingMode = false;
      break;
      default:
      break;
    }
  };

  this.doAction = function(action) {
    switch(action)
    {
      case 'delete':
        deleteSelected();
      break;
      default:
      break;
    }
  }

  this.toJSON = function() {
    return JSON.stringify(canvas.toJSON()); // TODO: Check if this is intended behaivior
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

