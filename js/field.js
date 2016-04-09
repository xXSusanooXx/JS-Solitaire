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
var parentCard;
var tempCard;
field.onmousedown=onMouseDown;
console.log(arrayOfCards);

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
        var top = card.style.top;
        var left = card.style.left;
        parentCard = card.parentNode;
        //alert(card.classList[0].margin);
        /*card.ondragstart = function() {
         return false;
         };*/
        var coords = getCoords(card);
        var shiftX = e.pageX - coords.left;
        var shiftY = e.pageY - coords.top;
        card.style.position = 'absolute';
        moveAt(e);

        function moveAt(e) {
            if(card.style.top==='' && card.style.left==='' && parentCard.classList.contains('card'))
            {
                card.style.left = e.pageX - shiftX-coords.left + 'px';
                card.style.top = e.pageY - shiftY-coords.top - 27 + 'px';
            }
            card.style.left = e.pageX - shiftX + 'px';
            card.style.top = e.pageY - shiftY - 27 + 'px';//27 - это top-margin.
        }

        document.onmousemove = function (e) {
            moveAt(e);
        };

        document.onmouseup = function (e) {

            card.style.visibility = 'hidden';
            var el = document.elementFromPoint(e.pageX, e.pageY);
            el = el.closest('.droppable');
            document.onmousemove = null;
            document.onmouseup = null;
            card.style.visibility = 'visible';
            if (el !== null) {
                if (isAcePile(el)) {
                    el.style.backgroundRepeat = 'no-repeat';
                    var aceTop=getCoords(el).top-27;
                    var aceLeft=getCoords(el).left;
                    el.appendChild(card);
                    card.style.position = 'absolute';
                    if(el.classList.contains('card')){
                        aceLeft=0;
                        aceTop=-27;
                    }
                    card.style.top = aceTop;
                    card.style.left = aceLeft;

                    card.classList.add('droppable');
                    card.classList.add('ace');
                    parentCard.innerHtml = '';
                    if (parentCard.classList.contains('shirt')) {
                        rotateACard(parentCard);
                    }
                    return;
                }
                if(isNotAvailable(el,card)){
                    if (parentCard.classList.contains('open-cards-deck') || parentCard.classList.contains('ace')) {
                        card.style.top = top;
                        card.style.left = left;
                        card.style.position = 'absolute';
                        return;
                    }
                    card.style.top = 0;
                    card.style.left = 0;
                    card.style.position = 'static';
                    return;
                }
                openCardsDeck.splice(openCardsDeck.length - 1, 1);
                el.style.backgroundRepeat = 'no-repeat';
                el.classList.remove('dropable');
                if (parentCard.classList.contains('shirt')) {
                    rotateACard(parentCard);
                }
                function rotateACard(shirtCard) {
                    shirtCard.classList.remove('shirt');
                    shirtCard.classList.add('card');
                    shirtCard.classList.add('dragable');
                    shirtCard.classList.add('droppable');
                    var card = arrayOfCards.splice(0, 1)[0];
                    shirtCard.setAttribute('value', card.value);
                    shirtCard.setAttribute('suit', card.suit);
                    setBackground(shirtCard, card.path);
                }

                el.appendChild(card);
                card.classList.add('droppable');
                card.style.position = 'static';

                function isNotAvailable(topCard, bottomCard) {
                    if (parseInt(topCard.getAttribute('value')) !== parseInt(bottomCard.getAttribute('value')) + 1) {
                        return true;
                    }
                    if (isBlackColor(topCard.getAttribute('suit')) === isBlackColor(bottomCard.getAttribute('suit'))) {
                        return true;
                    }
                    function isBlackColor(suit) {
                        switch (suit) {
                            case 'clubs':
                                return true;
                                break;
                            case 'hearts':
                                return false;
                                break;
                            case 'diamonds':
                                return false;
                                break;
                            case 'spades':
                                return true;
                        }
                    };
                };
                function isAcePile(element) {
                    if (element.classList.contains('ace')) {
                        return true;
                    }
                }

            }
            else{
                if (parentCard.classList.contains('open-cards-deck') || parentCard.classList.contains('ace')) {
                    card.style.top = top;
                    card.style.left = left;
                    card.style.position = 'absolute';
                    return;
                }
                card.style.top = 0;
                card.style.left = 0;
                card.style.position = 'static';
                return;
            }
        }
    }
}
/*
ball.ondragstart = function() {
  return false;
};

	var ball = document.getElementById('ball');

ball.onmousedown = function(event)*/