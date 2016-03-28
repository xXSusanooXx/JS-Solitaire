function onClick ( event ) {
        cell=event.target;
		if(!cell.classList.contains('marked-cell')) {
			if (cell.classList.contains ('hide-mine')) {
				clickOnMine (cell);
			}
			else {
				clickOnSafeCell(cell);
                cell.disabled='disabled';
			}
		}
	}

var field=document.getElementById('field');
field.onmousedown=mouseDown;


function mouseDown ( e ) {
/*
  var coords = getCoords(ball);
  var shiftX = e.pageX - coords.left;
  var shiftY = e.pageY - coords.top;
*/
  ball.style.position = 'absolute';
  document.body.appendChild(ball);
  moveAt(e);

  ball.style.zIndex = 1000; // над другими элементами

  function moveAt(e) {
    ball.style.left = e.pageX - shiftX + 'px';
    ball.style.top = e.pageY - shiftY + 'px';
  }

  document.onmousemove = function(e) {
    moveAt(e);
  };

  ball.onmouseup = function() {
    document.onmousemove = null;
    ball.onmouseup = null;
  };

}

ball.ondragstart = function() {
  return false;
};

	var ball = document.getElementById('ball');

ball.onmousedown = function(e)