const DOMelement = {
    quoteContainer:document.getElementById('quote-container'),
    quoteText:document.getElementById('quote'),
    author:document.getElementById('author'),
    twitterBtn:document.getElementById('twitter'),
    newQuoteBtn:document.getElementById('new-quote'),
    loader:document.getElementById('loader')

}

// show loader

function loading(){
    DOMelement.loader.hidden = false;
    DOMelement.quoteContainer.hidden = true;
}
// hide looder
function complete(){
    if(!DOMelement.loader.hidden){
        DOMelement.loader.hidden = true;
        DOMelement.quoteContainer.hidden = false;
    }
}
// fetch quote api
async function getQuote(){
    loading();
    const proxyURL = 'https://cors-anywhere.herokuapp.com/'
    const apiURL = 'http://api.forismatic.com/api/1.0/?method=getQuote&lang=en&format=json';
    try{
         const response = await fetch(proxyURL + apiURL);
         const data = await response.json()
         displayQuote(data);
         console.log(data)
        complete();
    }catch(error){
        //  getQuote();
        console.log("whooops no quote",error)
    }
};

// tweet function
function tweetQuote(){
    const auther = DOMelement.author.innerText;
    const quote = DOMelement.quoteText.innerText;
    const tweetURl = `https://twitter.com/intent/tweet?text=${quote} - ${auther}`;

     window.open(tweetURl, '_blank')

};

// event button
DOMelement.newQuoteBtn.addEventListener('click', getQuote);
DOMelement.twitterBtn.addEventListener('click', tweetQuote);

// on load
getQuote();

//display quote to UI
function displayQuote(data){
    if( data.quoteText.length > 120){
        DOMelement.quoteText.classList.add('long-quote')
    }else{
        DOMelement.quoteText.classList.remove('long-quote')
    }
    if(data.quoteAuthor === ''){
        DOMelement.author.innerText = 'UnKnown'
    }else{
        DOMelement.author.innerText = data.quoteAuthor
    }
    DOMelement.quoteText.innerText = data.quoteText;
};

