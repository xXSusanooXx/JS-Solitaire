function shuffle(a) {
	var j, x, i;
	for (i = a.length; i; i -= 1) {
		j = Math.floor(Math.random() * i);
		x = a[i - 1];
		a[i - 1] = a[j];
		a[j] = x;
	}
}

shuffle(arrayOfCards);
var hidenCardsDeck = arrayOfCards.splice(0,24);
var openCardsDeck=[];
var piles=[];
var NUMBERoFpILES = 7;
for(var i=0;i<NUMBERoFpILES;i++)
{
	piles[i]=[i];
	for(var j=0;j<i+1;j++)
	{
		piles[i][j]=arrayOfCards.splice(0,1);
	}
	console.log(piles[i]);
}

var hideDiv=document.getElementsByClassName('hiden-cards-deck')[0];
hideDiv.onclick=onDeckClick;
function onDeckClick(){
	if(hidenCardsDeck.length!==0)
	{
		openCardsDeck[openCardsDeck.length]=hidenCardsDeck.splice(0,1)[0];
		var openDiv=document.getElementsByClassName('open-cards-deck')[0];
		console.log(openCardsDeck);
		setBackground(openDiv,openCardsDeck[openCardsDeck.length-1].path);
	}
	else
	{
		hidenCardsDeck=openCardsDeck;
		openCardsDeck=[];
		onDeckClick();
	}
}
function setBackground(element,path){
	element.style.background="url("+path+")";
}