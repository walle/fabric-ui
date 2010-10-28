$(function(){
  var fabricUiDiv = $('#fabric-ui');
  var fabricUi = fabricUiDiv.fabricUi().data('fabricUi');

  var button = $('<button>Alert JSON</button>');
  button.click(function() {
    alert(fabricUi.toJSON());
  });
  fabricUiDiv.append(button);

  var button = $('<button>LOAD JSON</button>');
  button.click(function() {
    var data = prompt('Insert jsqon', '');
    fabricUi.loadJSON(data);
  });
  fabricUiDiv.append(button);
});

