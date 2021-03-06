function setOnClicksAndOtherThings() {
    
}

var field = document.getElementById('field');
var parentCard;
var tempCard;
var totalCountInAcePiles=0;
field.onmousedown = onMouseDown;

function onMouseDown(e) {
    function isDragable(element) {
        if (element.classList.contains('dragable')) {
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

    if (isDragable(e.target)) {
        var card = e.target;
        card.style.zIndex = 90;
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
            card.style.top = e.pageY -27 - shiftY  + 'px';//27 - это top-margin.
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
            function isAvailable(topCard, bottomCard) {
                if (parseInt(topCard.getAttribute('value')) !== parseInt(bottomCard.getAttribute('value')) + 1) {
                    return false;
                }
                if (isBlackColor(topCard.getAttribute('suit')) === isBlackColor(bottomCard.getAttribute('suit'))) {
                    return false;
                }
                return true;
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
                if (element.classList.contains('js-ace-pile')) {
                    return true;
                }
            };
            function isAvailableForAcePile(bottomCard, pile) {
                var topCard = pile.lastChild;
                if (parseInt(topCard.getAttribute('value')) !== parseInt(bottomCard.getAttribute('value')) - 1) {
                    return false;
                }
                if (topCard.getAttribute('suit') !== bottomCard.getAttribute('suit')) {
                    return false;
                }
                return true;
            };
            function rotateACard(Card) {
                Card.classList.remove('shirt');
                Card.classList.add('card');
                Card.classList.add('dragable');
                Card.classList.add('droppable');
                var card = arrayOfCards.splice(0, 1)[0];
                Card.setAttribute('value', card.value);
                Card.setAttribute('suit', card.suit);
                setBackground(Card, card.path);
            };
            function cancelMove() {
                if(parentCard.classList.contains('blank')){
                    parentCard.classList.remove('blank');
                }
                if (parentCard.classList.contains('open-cards-deck') || parentCard.classList.contains('ace')) {
                    card.style.top = top;
                    card.style.left = left;
                    card.style.position = 'absolute';
                    card.style.zIndex = 0;
                }
                else {
                    card.style.top = 0;
                    card.style.left = 0;
                    card.style.position = 'static';
                    card.style.zIndex = 0;
                }
            }
            function addCard() {
                if(parentCard.classList.contains('open-cards-deck')) {
                    openCardsDeck.splice(openCardsDeck.length - 1, 1);
                }
                el.style.backgroundRepeat = 'no-repeat';
                el.classList.remove('droppable');
                if (parentCard.classList.contains('shirt')) {
                    rotateACard(parentCard);
                }
                if(card.classList.contains('js-ace-pile')){
                    totalCountInAcePiles--;
                    card.classList.remove('js-ace-pile');
                }
                if(parentCard.classList.contains('pile')){
                    parentCard.classList.add('blank')
                }
                if(el.classList.contains('blank')){
                    el.classList.remove('blank');
                }
                el.appendChild(card);
                parentCard.classList.add('droppable');
                card.classList.add('droppable');
                card.style.position = 'static';
                el.style.backgroundRepeat = 'no-repeat';
            }
            if (el === null) {
                cancelMove();
                return;
            }
            if (isAcePile(el)) {
                el.style.backgroundRepeat = 'no-repeat';
                if (!el.classList.contains('card')) {
                    if (card.getAttribute('value') === '1') {
                    }
                    else {
                        cancelMove();
                        return;
                    }
                }
                else {
                    if (isAvailableForAcePile(card, el.parentNode)) {
                        el = el.parentNode;
                    }
                    else {
                        cancelMove();
                        return;
                    }
                }
                var aceTop = getCoords(el).top - 25;
                var aceLeft = getCoords(el).left;
                card.style.position = 'absolute';
                el.appendChild(card);
                if(!parentCard.classList.contains('js-ace-pile')) {
                    ++totalCountInAcePiles;
                }
                console.log(' total number of cards are in :' +totalCountInAcePiles )
                if(totalCountInAcePiles===52){
                    alert('You Win!');
                    document.onmousedown=null;
                    document.onmousemove=null;
                    document.onmouseup=null;
                }
                if (!parentCard.classList.contains('ace')) {
                    parentCard.classList.add('droppable');
                }
                card.style.top = aceTop;
                card.style.left = aceLeft;
                card.classList.add('droppable');
                card.classList.add('js-ace-pile');
                if (parentCard.classList.contains('shirt')) {
                    rotateACard(parentCard);
                }
                if(parentCard.classList.contains('pile')){
                    parentCard.classList.add('blank')
                }
                if(el.classList.contains('blank')){
                    el.classList.remove('blank');
                }
                card.style.zIndex = 0;
                if(parentCard.classList.contains('open-cards-deck')) {
                    openCardsDeck.splice(openCardsDeck.length - 1, 1);
                }
                return;
            }
            else {
                if (el.classList.contains('pile')) {
                    if (card.getAttribute('value') === '13' && el.children.length===0) {
                        addCard();
                    }
                    else {
                        cancelMove();
                        return;
                    }
                }
                else {
                    if (!isAvailable(el, card)) {
                        cancelMove();
                        return;
                    }
                    else {
                        addCard();
                    }
                }
            }
        }
    }
}
