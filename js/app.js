const qwerty = document.getElementById( 'qwerty' );
const phrase = document.getElementById( '#phrase' );
const title = document.querySelector('.title')
const startGame = document.querySelector( '.btn__reset' );
const overlay = document.getElementById( 'overlay' );
const totalLives = document.querySelector( '#lives' );
const tries = document.querySelector( '.tries' )
let missed = 0;

// listen for the start game btton to be pressed
startGame.addEventListener( 'click', () => {
	overlay.style.display = 'none';
	newGame();
} );
const phrases = [ 
    'The apple of my eye', 
    'A sight for sore eyes', 
    'An apple a day keeps the doctor away', 
    'Cool as a cucumber', 
    'Busy as a bee', 
    'Saved by the bell' 
]

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
			letters[ i ].className += ' show';
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
		title.textContent = "You did it !";
		startGame.textContent = 'Another ?'
		overlay.style.display = 'flex';
		newGame();
	} else if ( missed >= 5 ) {
		overlay.className = 'lose';
		title.textContent = "You ran out of lives !";
		startGame.textContent = 'Another ?'
		overlay.style.display = 'flex';
		newGame();
	}
}

const newGame = () => {
	missed = 0;
	let keyboard = document.querySelectorAll('#qwerty button')
	for (let i = 0; i < keyboard.length; i++ ) {
		keyboard[i].disabled = false;
		keyboard[i].classList.remove('chosen');
	}
	document.querySelector('#phrase ul').innerHTML = "";
	addPhraseToDisplay( getRandomPhraseAsArray() );
	addLives();
	addLives();
	addLives();
	addLives();
	addLives();
}

const addLives = () => {
	let box = document.createElement('LI');
	let heart = document.createElement('IMG')
	heart.src = 'images/liveHeart.png'
	heart.className = 'tries';
	heart.setAttribute('height', '35px');
	heart.setAttribute('width', '30px');
	lives.appendChild(box);
	box.appendChild(heart);
}