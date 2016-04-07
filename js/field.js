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
var parent;
var tempCard;
field.onmousedown=onMouseDown;

function onMouseDown ( e ) {
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

    if (isCard(e.target)) {
        var card = e.target;
        //alert(card.classList[0].margin);
        /*card.ondragstart = function() {
            return false;
        };*/
        var coords = getCoords(card);
        var shiftX = e.pageX - coords.left;
        var shiftY = e.pageY - coords.top;
        card.style.position = 'absolute';
        parent=card.parentNode;
        //document.body.appendChild(card);
        //card.style.zIndex = 1000; // над другими элементами

        function moveAt(e) {
            card.style.left = e.pageX - shiftX + 'px';
            card.style.top = e.pageY - shiftY -27 + 'px';//27 - это top-margin.
        }
        document.onmousemove = function (e) {
            moveAt(e);
        };

        document.onmouseup = function (e) {

            card.style.visibility='hidden';
            var el=document.elementFromPoint(e.pageX, e.pageY);
            el=el.closest('.droppable');
            console.log(el);
            document.onmousemove = null;
            document.onmouseup = null;
            card.style.visibility='visible';
            if(el==null){
                card.style.top=0;
                card.style.left=0;
                card.style.position='static';
                return;
            }
            console.log(el);
            el.appendChild(card);
            card.style.position='static';
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