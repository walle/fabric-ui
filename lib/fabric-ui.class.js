var FabricUi = function (canvas) {

  //private
  var canvas = canvas;
  canvas.isDrawingMode = true;
  canvas.freeDrawingLineWidth = 5;

  // public
  this.tools = ['pen', 'hand'];

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

