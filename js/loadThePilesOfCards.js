function shuffle(a) {
	var j, x, i;
	for (i = a.length; i; i -= 1) {
		j = Math.floor(Math.random() * i);
		x = a[i - 1];
		a[i - 1] = a[j];
		a[j] = x;
	}
}
document.body.onselectstart= function() {return false};
shuffle(arrayOfCards);
var hidenCardsDeck = arrayOfCards.splice(0,24);
var openCardsDeck=[];
var NUMBERoFpILES = 7;



for(var i=0;i<NUMBERoFpILES;i++)
{
    var nowPileDiv=document.getElementById(i+1);
    for(var j=0;j<i;j++)
	{
        var cardToAddDiv = document.createElement('div');
        cardToAddDiv.classList.add('shirt');
		cardToAddDiv.style.backgroundRepeat='no-repeat';
        nowPileDiv.appendChild(cardToAddDiv);
        nowPileDiv=cardToAddDiv;
    }
    var cardToAddDiv = document.createElement('div');
    cardToAddDiv.classList.add('card');
	cardToAddDiv.classList.add('dragable');
	cardToAddDiv.classList.add('droppable');
	var card = arrayOfCards.splice(0,1)[0];
	cardToAddDiv.setAttribute('value',card.value);
	cardToAddDiv.setAttribute('suit',card.suit);
	nowPileDiv.appendChild(cardToAddDiv);
	setBackground(cardToAddDiv,card.path);
	cardToAddDiv.style.backgroundRepeat='no-repeat';

}
var hideDiv=document.getElementsByClassName('hiden-cards-deck')[0];
var openDiv=document.getElementsByClassName('open-cards-deck')[0];
var field=document.getElementById('field');
field.onclick=function (event) {
    if(event.target.classList.contains('hiden-cards-deck')){
        onDeckClick();
    }
}



//hideDiv.onclick=onDeckClick;
function onDeckClick(){
	if(hidenCardsDeck.length!==0)
	{
		var cardToAddDiv = document.createElement('div');
		cardToAddDiv.classList.add('card');
		cardToAddDiv.classList.add('dragable');
		//cardToAddDiv.classList.add('droppable');
		openCardsDeck[openCardsDeck.length] = hidenCardsDeck.splice(0,1)[0];
		cardToAddDiv.setAttribute('value',openCardsDeck[openCardsDeck.length-1].value);
		cardToAddDiv.setAttribute('suit',openCardsDeck[openCardsDeck.length-1].suit);
		setBackground(cardToAddDiv,openCardsDeck[openCardsDeck.length-1].path);
		openDiv=document.getElementsByClassName('open-cards-deck')[0];
		openDiv.appendChild(cardToAddDiv);
	}
	else
	{
		hidenCardsDeck=openCardsDeck;
		openCardsDeck=[];
		openDiv.innerHTML='';
		onDeckClick();
	}
}
function setBackground(element,path){
	element.style.background="url("+path+")";
}
/*
var el = document.getElementById(1);
var child = document.createElement('div');
child.classList.add('card');
setBackground(child,arrayOfCards[0].path);
el.appendChild(child);
*/
























