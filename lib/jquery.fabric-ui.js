(function($){
  setupFabricUi = function(options) {
    var canvas = new fabric.Element(options.canvasId);
    var fabricUi = new FabricUi(canvas, options.canvasId);

    fabricUi.setColor(options.color);
    fabricUi.setLineWidth(options.lineWidth);

    return fabricUi;
  }

  createToolButtons = function(obj, fabricUi) {
    var tools = $('<div></div>');
    tools.addClass('fabric-ui-tools');
    $.each(fabricUi.tools, function(index, value) {
      var button = $('<button name="'+value+'"></button>');
      button.addClass('button');
      button.addClass(value);
      button.click(function() {
        tools.find('button').removeClass('active');
        $(this).addClass('active');
        fabricUi.changeTool(this.name);
      });
      tools.append(button);
    });

    obj.append(tools);

    $('.fabric-ui-tools .'+ fabricUi.tools).click(); // Activate first tool as default
  }

  createActionButtons = function(obj, fabricUi) {
    var actions = $('<div></div>');
    actions.addClass('fabric-ui-actions');
    $.each(fabricUi.actions, function(index, value) {
      var button = $('<button name="'+value+'"></button>');
      button.addClass('button');
      button.addClass(value);
      button.click(function() {
        fabricUi.doAction(this.name);
      });
      actions.append(button);
    });

    obj.append(actions);
  }

  createColorSelector = function(obj, fabricUi) {
    var color = $('<div></div>');

    color.css('backgroundColor', fabricUi.getColor());
    var setColor = function(value)
    {
      var c = '#' + value;
      color.css('backgroundColor', c);
      fabricUi.setColor(c);
    }

    if ($().ColorPicker) 
    {
      color.addClass('fabric-ui-colorselector');

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
          setColor(hex);
        }
      });
    }
    else
    {
      var input = $('<input type="text" />');
      input.val(fabricUi.getColor().substr(1));
      input.keyup(function() {
        if (this.value.length == 6 && this.value.match(/^([0-9a-f]{1,2}){3}$/i))
        {
          setColor(this.value);
        }
      });
      color.append(input);
    }

    obj.append(color);
  }

  $.fn.extend({
    fabricUi: function(options) {

      var defaults = {
        canvasId: 'canvas',
        color: '#ff0000',
        lineWidth: 5
      };

      var options = $.extend(defaults, options);

      return this.each(function () {
        var self = $(this);

        if (self.data('fabricUi')) return;

        var fabricUi = setupFabricUi(options);

        self.data('fabricUi', fabricUi); // Save object for acces outside plugin

        createToolButtons(self, fabricUi);
        createActionButtons(self, fabricUi);

        createColorSelector(self, fabricUi);
      });
    }
  });
})(jQuery);

