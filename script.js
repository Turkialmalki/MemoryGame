/* To store cards in the array */
let toggledCards=[]; 

/*
for checking if we mathed all cards together to print final score model
*/
let matched= 0;
const allPairs= 8;

/* To count the number of move */
let moves= 0;

/* For checking the time */
let time= 0;
let clockOff= true;
let clockId;


// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}


// create a deck variable to store elements with deck class!
const deck= document.querySelector('.deck');

// create a function to shuffle tke cards every new game!

function shuffleDeck() {
  const cardsForShuffling= Array.from(document.querySelectorAll('.deck li'));
  const shuffledCards= shuffle(cardsForShuffling);
  for(card of shuffledCards){
    deck.appendChild(card);
  }
}
 shuffleDeck();

// adding an event listener card on the deck
deck.addEventListener('click', appearCard);

function appearCard (){
  const press= event.target;
  if (press.classList.contains('card') && !press.classList.contains('match') && toggledCards.length < 2 && !toggledCards.includes(press)){
   // initilaize the time for each new game
     if (clockOff){
       clockBegins();
       clockOff= false;
     }

     // call To flip over the card and add them into array
     toggleCard(press);
     addToggledCard(press);

     // To check 2 crad mathech or not in array
     if (toggledCards.length === 2){
       isMatch(press);
       addMoves();
       checkingScore();
     }
  }
}

// Flip over the card
function toggleCard(press){
  press.classList.toggle('open');
  press.classList.toggle('show');
}

// Push the filped card into the Array

function addToggledCard(press){
  toggledCards.push(press);
  console.log(toggledCards);
}


// For checking if cards matched.

function isMatch() {
  if (toggledCards[0].firstElementChild.className ===
       toggledCards[1].firstElementChild.className) {
         toggledCards[0].classList.toggle('match');
         toggledCards[1].classList.toggle('match');
         toggledCards= [];
         matched++;
         setTimeout(function(){
           win();
         },1000)
       }
       // If they not matched will filped back over again.
       else {
         setTimeout(function (){
           toggleCard(toggledCards[0]);
           toggleCard(toggledCards[1]);
           toggledCards= [];
         }, 1000);
       }
     }

// To increase player moves!

 function addMoves() {
   moves = moves + 1;
   const movesCount= document.querySelector('.moves');
   movesCount.innerHTML= moves;
 }

// Check for the game score 

 function checkingScore(){
   if(moves===16 || moves === 32){
     removingStar();
   }
 }


function removingStar(){
  const stars= document.querySelectorAll('.stars li');
  for (star of stars){
    if(star.style.display !== 'none'){
      star.style.display= 'none';
      break
    }
  }
}

function clockBegins () {
  clockId= setInterval(function(){
    time +=1;
    showTime();
    console.log(time);
  }, 1000);
}

function showTime() {
  const clock= document.querySelector('.clock');
  clock.innerHTML= time;
  const minutes= Math.floor(time/60);
  const seconds= time % 60;
  if (seconds < 10){
    clock.innerHTML= `${minutes}:0${seconds}`;
  } else {
    clock.innerHTML= `${minutes}:${seconds}`;
  }
}

function stopClock() {
  clearInterval(clockId);
}


// Here will show the popupMessage or The model 

function toggleModel() {
  const model= document.querySelector('.backgroundModel');
  model.classList.toggle('hide');
}

// Showing information on the Box Model 

function printModelStats() {
  const timeStats= document.querySelector('.timeModel');
  const clockTime= document.querySelector('.clock').innerHTML;
  const movesStats= document.querySelector('.movesModel');
  const starsStats= document.querySelector('.starsModel');
  const stars= getStars();
  timeStats.innerHTML= `Time = ${clockTime}`;
  movesStats.innerHTML= `Moves = ${moves}`;
  starsStats.innerHTML= `Stars = ${stars}`;
}

function getStars() {
  stars= document.querySelectorAll('.stars li');
  starCount= 0;
  for (star of stars) {
    if (star.style.display !== 'none'){
      starCount +=1;
    }
  }
  console.log(starCount);
  return starCount;
}


// Here the Reset of the whole game
function resetGame() {

    // reset time
      stopClock();
      clockOff= true;
      time= 0;
      showTime();
    
    // reset moves
     moves= 0;
     document.querySelector('.moves').innerHTML= moves;
    
    // reset stars
      stars= 0;
      const starsList= document.querySelectorAll('.stars li');
      for (star of starsList){
        star.style.display= 'inline';
      }
    
    // reset matching
      matched= 0;
      shuffleDeck();
      resetCards();
    }
    
    document.querySelector('.restart').addEventListener('click', resetGame);
    
    
     function gameOver() {
       stopClock();
       printModelStats();
       toggleModel();
       resetCards();
     }
    
    function resetCards() {
      const cards= document.querySelectorAll('.deck li');
      for (card of cards){
        card.className= 'card';
      }
    }
    
    function win () {
      if (matched === allPairs){
        gameOver();
      }
    }
    
    function replayGame() {
      resetGame();
      toggleModel();
      resetCards();
    }
    

// event listener for repaly and cancel button

document.querySelector('.cancelModel').addEventListener('click', function(){
  toggleModel();
});
document.querySelector('.replayModel').addEventListener('click', replayGame);

