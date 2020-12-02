const quoteContainer = document.getElementById('quote-container');
const quoteText = document.getElementById('quote');
const authorText = document.getElementById('author');
const twitterbtn = document.getElementById('twitter');
const newQuotebtn = document.getElementById('new-quote'); 
const loader = document.getElementById('loader');

//show loading
function loading() {
  loader.hidden = false;
  quoteContainer.hidden = true;
}

//hide loading
function complete() {
  if(!loader.hidden) {
    quoteContainer.hidden = false;
    loader.hidden = true;
  }
}


//get quote
async function getQuote() {
    loading(); 
    const proxyUrl = 'https://cors-anywhere.herokuapp.com/'
    const apiUrl = 'http://api.forismatic.com/api/1.0/?method=getQuote&lang=ru&format=json';
    try {
      const response = await fetch(proxyUrl+apiUrl);
      const data = await response.json();
      // если автор неизвестен
      if(data.quoteAuthor === '')
      {
        authorText.innerText = 'Unknown';
      }
      else
      {
        authorText.innerText = data.quoteAuthor;
      }
      // перенос строки если она большая
      if(data.quoteText.length>120) {
        quoteText.classList.add('long-quote');
      }      
      else {
        quoteText.classList.remove('long-quote');
      }
      quoteText.innerText = data.quoteText; 
      complete();
    } catch (error) {
      getQuote();
    }
}
// twiiter fucn
function tweetQuote() {
  const quote = quoteText.innerText;
  const author = authorText.innerText;
  const twitterUrl = 'https://twitter.com/intent/tweet?text='+ quote +' - ' + author;  
  window.open(twitterUrl,'_blank');
  console.log(twitterUrl);
}

// event listener
newQuotebtn.addEventListener('click',getQuote);
twitterbtn.addEventListener('click',tweetQuote);

getQuote();
