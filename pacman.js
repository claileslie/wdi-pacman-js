// Setup initial game stats
var score = 0;
var lives = 2;
var powerPellets = 4;

// Define your ghosts here
var Inky = {
  menu_option: '1',
  name: 'Inky',
  colour: 'red',
  character: 'Shadow',
  edible: false
};

var Blinky = {
  menu_option: '2',
  name: 'Blinky',
  colour: 'cyan',
  character: 'Speedy',
  edible: false
};

var Pinky = {
  menu_option: '3',
  name: 'Pinky',
  colour: 'pink',
  character: 'Bashful',
  edible: false
};

var Clyde = {
  menu_option: '4',
  name: 'Clyde',
  colour: 'orange',
  character: 'Bashful',
  edible: false
};

var ghosts = [Inky, Blinky, Pinky, Clyde];
// replace this comment with your four ghosts setup as objects


// Draw the screen functionality
function drawScreen() {
  clearScreen();
  setTimeout(function() {
    displayStats();
    displayMenu();
    displayPrompt();
  }, 10);
}

function clearScreen() {
  console.log('\x1Bc');
}

function displayStats() {
  console.log('Score: ' + score + '     Lives: ' + lives + '     Power-Pellets: ' + powerPellets);
}

function displayMenu() {
  console.log('\n\nSelect Option:\n');  // each \n creates a new line
  console.log('(d) Eat Dot');
    ghosts.forEach(function(ghost) {
      console.log('(' + ghost.menu_option + ') ' + 'Eat ' + ghost.name)
    });
  console.log('(p) Eat PowerPellet')
  console.log('(q) Quit');
}

function displayPrompt() {
  // process.stdout.write is similar to console.log except it doesn't add a new line after the text
  process.stdout.write('\nWaka Waka :v '); // :v is the Pac-Man emoji.
}


// Menu Options
function eatDot() {
  console.log('\nChomp!');
  score += 10;
}


// Process Player's Input
function processInput(key) {
  switch(key) {
    case '\u0003': // This makes it so CTRL-C will quit the program
    case 'q':
      process.exit();
      break;
    case 'd':
      eatDot();
      break;
    case '1':
      eatGhost(Inky);
      break;
    case '2':
      eatGhost(Blinky);
      break;
    case '3':
      eatGhost(Pinky);
      break;
    case '4':
      eatGhost(Clyde);
      break;
    case 'p':
      eatPowerPellet();
      break;
    default:
      console.log('\nInvalid Command!');
  }
}

function eatPowerPellet() {
  if (powerPellets === 0) {
    console.log('\nNo Power-Pellets Left!');
  }
  else {
    score += 50;
    powerPellets -= 1;
    ghosts.forEach(function(ghost) {
      ghost.edible = true
    });
  }
}

function eatGhost(ghost) {
  if (ghost.edible === false) {
    lives -= 1
    console.log('\nYou were killed by the '+ ghost.colour + ' ghost, ' + ghost.name)
    checkLives();
  }
  else {
    console.log('\nPac-Man ate ' + ghost.name + " ...NOM!");
    score += 200;
    ghost.edible = false;
  }
}

function checkLives() {
  if (lives === 0) {
    process.exit();
  }
}
//
// YOU PROBABLY DON'T WANT TO CHANGE CODE BELOW THIS LINE
//

// Setup Input and Output to work nicely in our Terminal
var stdin = process.stdin;
stdin.setRawMode(true);
stdin.resume();
stdin.setEncoding('utf8');

// Draw screen when game first starts
drawScreen();

// Process input and draw screen each time player enters a key
stdin.on('data', function(key) {
  process.stdout.write(key);
  processInput(key);
  setTimeout(drawScreen, 300); // The command prompt will flash a message for 300 milliseoncds before it re-draws the screen. You can adjust the 300 number to increase this.
});

// Player Quits
process.on('exit', function() {
  console.log('\n\nGame Over!\n');
});
