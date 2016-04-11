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
        card.style.zIndex=90;
        var top = card.style.top;
        var left = card.style.left;
        parentCard = card.parentNode;
        var coords = getCoords(card);
        var shiftX = e.pageX - coords.left;
        var shiftY = e.pageY - coords.top;
        card.style.position = 'absolute';
        moveAt(e);

        function moveAt(e) {
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
            };
            function isAvailableForAcePile(bottomCard,pile) {
                var topCard = pile.lastChild;
                if (parseInt(topCard.getAttribute('value')) !== parseInt(bottomCard.getAttribute('value')) - 1) {
                    return false;
                }
                if (topCard.getAttribute('suit') !== bottomCard.getAttribute('suit')) {
                    return false;
                }
                return true;

            };
            function rotateACard(shirtCard) {
                shirtCard.classList.remove('shirt');
                shirtCard.classList.add('card');
                shirtCard.classList.add('dragable');
                shirtCard.classList.add('droppable');
                var card = arrayOfCards.splice(0, 1)[0];
                shirtCard.setAttribute('value', card.value);
                shirtCard.setAttribute('suit', card.suit);
                setBackground(shirtCard, card.path);
            };
            if (el !== null) {
                if (isAcePile(el)) {
                    el.style.backgroundRepeat = 'no-repeat';
                    if(!el.classList.contains('card')){
                        if(card.getAttribute('value')==='1'){

                        }
                        else {
                            card.style.top = top;
                            card.style.left = left;
                            card.style.position = 'absolute';
                            card.style.zIndex = 0;
                            return;
                        }
                    }
                    else {
                        if(isAvailableForAcePile(card,el.parentNode)){
                        el = el.parentNode;
                        }
                        else{
                            card.style.top = top;
                            card.style.left = left;
                            card.style.position = 'absolute';
                            card.style.zIndex = 0;
                            return;
                        }
                    }
                    var aceTop=getCoords(el).top-27;
                    var aceLeft=getCoords(el).left;
                    card.style.position = 'absolute';
                    el.appendChild(card);
                    card.style.top = aceTop;
                    card.style.left = aceLeft;
                    card.classList.add('droppable');
                    card.classList.add('ace');
                    if (parentCard.classList.contains('shirt')) {
                        rotateACard(parentCard);
                    }
                    card.style.zIndex=0;
                    openCardsDeck.splice(openCardsDeck.length - 1, 1);
                    return;
                }
                else {
                    if (el.classList.contains('pile')) {
                        if(card.getAttribute('value')==='13'){
                            openCardsDeck.splice(openCardsDeck.length - 1, 1);
                            el.style.backgroundRepeat = 'no-repeat';
                            el.classList.remove('droppable');
                            if (parentCard.classList.contains('shirt')) {
                                rotateACard(parentCard);
                            }
                            el.appendChild(card);
                            card.classList.add('droppable');
                            card.style.position='static';
                            //card.style.position = 'absolute';
                            el.style.backgroundRepeat='no-repeat';
                        }
                        else{
                            if (parentCard.classList.contains('open-cards-deck') || parentCard.classList.contains('ace')) {
                                card.style.top = top;
                                card.style.left = left;
                                card.style.position = 'absolute';
                                card.style.zIndex = 0;
                                return;
                            }
                            card.style.top = 0;
                            card.style.left = 0;
                            card.style.position = 'static';
                            card.style.zIndex = 0;
                            return;
                        }
                    }
                    else {
                        if (isNotAvailable(el, card)) {
                            if (parentCard.classList.contains('open-cards-deck') || parentCard.classList.contains('ace')) {
                                card.style.top = top;
                                card.style.left = left;
                                card.style.position = 'absolute';
                                card.style.zIndex = 0;
                                return;
                            }
                            card.style.top = 0;
                            card.style.left = 0;
                            card.style.position = 'static';
                            card.style.zIndex = 0;
                            return;
                        }
                        openCardsDeck.splice(openCardsDeck.length - 1, 1);
                        el.style.backgroundRepeat = 'no-repeat';
                        el.classList.remove('droppable');
                        if (parentCard.classList.contains('shirt')) {
                            rotateACard(parentCard);
                        }
                        parentCard.classList.add('droppable');
                        el.appendChild(card);
                        card.classList.add('droppable');
                        card.style.position = 'static';
                    }
                }

            }
            else{
                if (parentCard.classList.contains('open-cards-deck') || parentCard.classList.contains('ace')) {
                    card.style.top = top;
                    card.style.left = left;
                    card.style.position = 'absolute';
                    card.style.zIndex=0;
                    return;
                }
                card.style.top = 0;
                card.style.left = 0;
                card.style.position = 'static';
                card.style.zIndex=0;
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