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
field.onmousedown=onMouseDown;

function onMouseDown ( event ) {
    function isCard(element) {
        if (element.classList.contains('card')) {
            return true;
        }
        return false;
    }

    function getCoords(element) {
        var box = element.getBoundingClientRect();

        return {
            top: box.top + pageYOffset,
            left: box.left + pageXOffset
        };

    }

    if (isCard(event.target)) {
        var card = event.target;
        /*card.ondragstart = function() {
            return false;
        };*/
        var coords = getCoords(card);
        var shiftX = event.pageX - coords.left;
        var shiftY = event.pageY - coords.top;
        card.style.position = 'absolute';
        //moveAt(event);

        //document.body.appendChild(card);
        //card.style.zIndex = 1000; // над другими элементами

        function moveAt(event) {
            card.style.left = event.pageX - shiftX + 'px';
            card.style.top = event.pageY - shiftY + 'px';
        }
        document.onmousemove = function (event) {
            moveAt(event);
        };

        card.onmouseup = function () {
            document.onmousemove = null;
            card.onmouseup = null;
           // card.style.position="static";
           // card.style.zIndex=0;
        };

    }
}
/*
ball.ondragstart = function() {
  return false;
};

	var ball = document.getElementById('ball');

ball.onmousedown = function(event)*/