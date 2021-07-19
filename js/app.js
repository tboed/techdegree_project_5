const qwerty = document.getElementById( 'qwerty' );
const phrase = document.getElementById( '#phrase' );
const startGame = document.querySelector( '.btn__reset' );
const overlay = document.getElementById( 'overlay' );
let missed = 0;
// listen for the start game btton to be pressed
startGame.addEventListener( 'click', () => {
	overlay.style.display = 'none';
	addPhraseToDisplay( getRandomPhraseAsArray() )
} );
const phrases = [ 
    'The apple of my eye', 
    'A sight for sore eyes', 
    'An apple a day keeps the doctor away', 
    'Cool as a cucumber', 
    'Busy as a bee', 
    'Saved by the bell' ]
// return a random phrase from phrases array
const getRandomPhraseAsArray = () => {
	let randomIndex = Math.floor( Math.random() * phrases.length );
	return phrases[ randomIndex ].split( '' );
}
// adds the letters of a string to the display
const addPhraseToDisplay = () => {
	let phrase = getRandomPhraseAsArray();
	let ul = document.querySelector( '#phrase ul' )
	for ( let i = 0; i < phrase.length; i++ ) {
		let li = document.createElement( 'li' );
		li.textContent = phrase[ i ];
		if ( phrase[ i ] !== ' ' ) {
			li.className = 'letter';
		} else {
			li.className = 'space';
		};
		ul.appendChild( li );
	}
}
// check if a letter is in the phrase
const checkLetter = ( button ) => {
	let letters = document.querySelectorAll( 'li.letter' );
	let matched = null
	for ( i = 0; i < letters.length; i++ ) {
		if ( letters[ i ].textContent.toUpperCase() === button.textContent.toUpperCase() ) {
			letters[ i ].className += 'show';
			matched = button;
		}
	}
	return matched;
}
// listen for the onscreen keyboard to be clicked
qwerty.addEventListener( 'click', ( e ) => {
	if ( e.target.tagName === 'BUTTON' ) {
		e.target.className = 'chosen';
		e.target.disabled = true;
		let letterFound = checkLetter( e.target );
		if ( letterFound === null ) {
			missed += 1;
			document.querySelector( '.tries' ).remove();
		}
	}
	checkWin();
} );
// check if the game has been won or lost and show the aprropriate screen
const checkWin = () => {
	let answer = document.querySelectorAll( 'li.letter' );
	let correct = document.querySelectorAll( 'li.show' );
	if ( answer.length == correct.length ) {
		overlay.className = 'win';
		startGame.textContent = "Success !";
		overlay.style.display = 'flex';
	} else if ( missed >= 5 ) {
		overlay.className = 'lose';
		startGame.textContent = "Unsuccessful !";
		overlay.style.display = 'flex';
	}
}