(function($){
  setupFabricUi = function(options) {
    var canvas = new fabric.Element(options.canvas);
    var fabricUi = new FabricUi(canvas, options.canvas);

    fabricUi.setColor(options.color);
    fabricUi.setLineWidth(options.lineWidth);

    return fabricUi;
  }

  createToolButtons = function(obj, fabricUi) {
    $.each(fabricUi.tools, function(index, value) {
      var button = $('<button name="'+value+'"></button>');
      button.addClass('fabric-ui-tool-button');
      button.addClass('fabric-ui-tool-'+value);
      button.click(function() {
        obj.find('button').removeClass('fabric-ui-item-active');
        $(this).addClass('fabric-ui-item-active');
        fabricUi.changeTool(this.name);
      });
      obj.append(button);
    });
  }

  createActionButtons = function(obj, fabricUi) {
    $.each(fabricUi.actions, function(index, value) {
      var button = $('<button name="'+value+'"></button>');
      button.addClass('fabric-ui-action-button');
      button.addClass('fabric-ui-action-'+value);
      button.click(function() {
        fabricUi.doAction(this.name);
      });
      obj.append(button);
    });
  }

  createColorSelector = function(obj, fabricUi) {
    var color = $('<div></div>');
    color.addClass('fabric-ui-colorselector');
    color.css('backgroundColor', fabricUi.getColor());

    color.ColorPicker({
      color: fabricUi.getColor(),
      onShow: function (c) {
        $(c).fadeIn(500);
        return false;
      },
      onHide: function (c) {
        $(c).fadeOut(500);
        return false;
      },
      onChange: function (hsb, hex, rgb) {
        var c = '#' + hex;
        color.css('backgroundColor', c);
        fabricUi.setColor(c);
      }
    });

    obj.append(color);
  }

  $.fn.extend({
    fabricUi: function(options) {

      var defaults = {
        canvas: 'canvas',
        color: '#ff0000',
        lineWidth: 5
      };

      var options = $.extend(defaults, options);

      return this.each(function () {
        var self = $(this);

        var fabricUi = setupFabricUi(options);

        createToolButtons(self, fabricUi);
        createActionButtons(self, fabricUi);

        createColorSelector(self, fabricUi);

        var button = $('<button name="alert-json"></button>');
        button.addClass('fabric-ui-action-button');
        button.click(function() {
          alert(fabricUi.toJSON());
        });
        self.append(button);

        var button = $('<button name="load-json"></button>');
        button.addClass('fabric-ui-action-button');
        button.click(function() {
          data =prompt('Insert jsqon', '');
          fabricUi.loadJSON(data);
        });
        self.append(button);

      });
    }
  });
})(jQuery);

