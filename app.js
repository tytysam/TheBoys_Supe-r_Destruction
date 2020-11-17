// ===================
// The Boys - Supe-r Destruction?
// OR
// Final Fantasy XXIIXV
// OR
// BATTLE GAME FIGHT.
// ===================

// =======================================================================================

// ==========================
// CIRCLE-BACK-TO LIST:
// ==========================
// • Choose your team of 4 from a larger pool of heroes...
// • More unique stats + moves for each character
// • Work on difficulty of game... Get it working first though!
// • Ability for characters to utilize a shared item pool..?
// •

// =======================================================================================
//  ===== DON'T FORGET ======
// • NEED AN updateMessage() function to display text that I would have otherwise console.logged
// • Create a goodGuys array so that enemy's can randomly target them
// • Every method attached to a Supe will need its own accuracy calculation (each attack has a different hit %)
// • Revisit ~all of the characters to thresh out their stats + methods further! (get it all working-ish first)
// •
// •

// =======================================================================================

// ====================
// CACHED DOM NODES
// ====================

// ====================
// GLOBAL VARIABLES
// ====================

// ==========================
// CHARACTERS & CONSTRUCTORS
// ==========================

// ==========
// The Boys
// ==========

// Humans class is the basis of our The Boys characters
class Humans {
  constructor(name, health, stamina, accuracy) {
    this.name = name;
    this.health = health;
    this.stamina = stamina;
    this.accuracy = accuracy;
  }
}

class MM extends Humans {
  constructor(name, health, stamina, accuracy) {
    super(
      (name = "Mother's Milk"),
      (health = 800),
      (stamina = 400),
      (accuracy = 0.8)
    );
  }
  tacticalStrike(enemy) {
    this.stamina -= 10;
    enemy.health -= 50;
  }
  fieldMedic(ally) {
    this.stamina -= 20;
    ally.health += 100;
  }
  battlefieldTriage(ally) {
    if (ally.health <= 0) {
      ally.health = 50;
    } else {
      // Include a message via updateMessage() that says:
      // ${ally.name} doesn't need revived! Try choosing another teammate or command.
      // create some kind of array to house the "Uses" of this abililty, like
      // you did with missles in Space Battle
    }
  }
}

class Butcher extends Humans {
  constructor(name, health, stamina, accuracy) {
    super(
      (name = "Butcher"),
      (health = 800),
      (stamina = 500),
      (accuracy = 0.7)
    );
  }
  giftedMarksman(enemy) {
    this.stamina -= 20;
    enemy.health -= 150;
  }
  brutalize(enemy) {
    this.stamina -= 10;
    enemy.health -= 60;
  }
  diabolicalMate() {
    // damage +++
    //create some kind of array to house the "Uses" of this abililty, like
    //you did with missles in Space Battle
  }
}

class Hughie extends Humans {
  constructor(name, health, stamina, accuracy) {
    super(
      (name = "Hughie"),
      (health = 500),
      (stamina = 900),
      (accuracy = 0.95)
    );
  }
  tacticalNous(enemy) {
    this.stamina -= 5;
    enemy.health -= 10;
    //include a way to reveal an enemy's specific weakness!
    // Nested if statements for each target/character...?
    // if enemy.name === XYZ, then log xyz via updateMessage()
  }
  fleetwoodMac() {
    this.stamina -= 5;
    mothersMilk.health += 50;
    butcher.health += 50;
    hughie.health += 50;
    frenchie.health += 50;
  }
  letsTalk(enemy) {
    if (enemy.name === "Starlight") {
      // THEN battleEnd()
      // nextCutscene()
    } else {
      this.health -= 75;
    }
  }
}

class Frenchie extends Humans {
  constructor(name, health, stamina, accuracy) {
    super(
      (name = "Frenchie"),
      (health = 800),
      (stamina = 400),
      (accuracy = 0.8)
    );
  }
  improvisedExplosives(enemy) {
    this.stamina -= 25;
    enemy.health -= 175;
  }
  gunRunner(enemy) {
    this.stamina -= 10;
    enemy.health -= 75;
  }
  spontaneousInventor() {
    // different outcomes dependent on battle/target...
    // one of the main methods for taking advantage of weaknesses...
    // create some kind of array to house the "Uses" of this abililty, like
    // you did with missles in Space Battle
  }
}

/*
Declarations for The Boys
*/
const mothersMilk = new MM(); // Create MM object
const butcher = new Butcher(); // Create Butcher object
const hughie = new Hughie(); // Create Hughie object
const frenchie = new Frenchie(); // Create Frenchie object

// console.log(mothersMilk);
// console.log(butcher);
// console.log(hughie);
// console.log(frenchie);

// ==========
// The Supes
// ==========

// Humans class is the basis of our Supes characters
class Supes {
  constructor(name, health) {
    this.name = name;
    this.health = health;
  }
}

class Translucent extends Supes {
  constructor(name, health) {
    super((name = "Translucent"), (health = 800));
  }
  shadowStrike(goodGuy) {
    // write a function for randomly selecting one of the boys as target
    // push good guys to an array and choose a random index to choose target
    // ****** Also need to include an accuracy calculation for each attack so that all
    // attacks don't always hit always...
    goodGuy.health -= 25;
  }
  invisibleLurker(goodGuy) {
    // write a function for randomly selecting one of the boys as target
    // push good guys to an array and choose a random index to choose target
    goodGuy.health -= 35;
  }
  carbonRealignment() {
    this.health += 100;
  }
}

class TheDeep extends Supes {
  constructor(name, health) {
    super((name = "The Deep"), (health = 1000));
  }
  aquaticTelepathy(goodGuy) {
    // Need a function to select every member of the team rather than just 1
    goodGuy.health -= 30;
  }
  sharkStrength(goodGuy) {
    goodGuy.health -= 45;
  }
  secondSkin() {
    this.health += 250;
  }
}

class ATrain extends Supes {
  constructor(name, health, power) {
    super((name = "A-Train"), (health = 1200));
    this.power = 200;
  }
  speedOfLight(goodGuy) {
    goodGuy.health -= 40;
  }
  compoundV() {
    this.power += 50;
    // include a counter of some sort so that if this move is used 3x (?)
    // it will lead to A-Train's heart exploding
  }
  fastestManAlive() {
    // Need a function to select every member of the team rather than just 1
    // Attack will deal damage + to every team member
  }
}

class Starlight extends Supes {
  constructor(name, health) {
    super((name = "Starlight"), (health = 1250));
  }
  energyProjection(goodGuy) {
    goodGuy.health -= 50;
  }
  electricShock(goodGuy) {
    goodGuy.health -= 75;
  }
  energyBlast() {
    // Need a function to select every member of the team rather than just 1
    // Attack will deal damage ++ to every team member
  }
}

class BlackNoir extends Supes {
  constructor(name, health) {
    super((name = "Black Noir"), (health = 2000));
  }
  hiddenBlade(goodGuy) {
    goodGuy.health -= 75;
  }
  regenerativeHealing() {
    this.health += 300;
  }
  silentAssassin(goodGuy) {
    goodGuy.health -= 200;
  }
}

class Lamplighter extends Supes {
  constructor(name, health) {
    super((name = "Lamplighter"), (health = 800));
  }
  pyrokinesis(goodGuy) {
    goodGuy.health -= 125;
  }
  burnedAlive(goodGuy) {
    goodGuy.health -= 250;
  }
  fireStorm() {
    // Need a function to select every member of the team rather than just 1
    // Attack will deal damage + to every team member
  }
}

class Homelander extends Supes {
  constructor(name, health) {
    super((name = "Homelander"), (health = 2000));
  }
  bruteForce(goodGuy) {
    goodGuy.health -= 250;
  }
  invulnerability() {
    this.health += 500;
  }
  heatVision(goodGuy) {
    goodGuy.health -= 750;
  }
}

/*
Declarations for our Supes
*/
const translucent = new Translucent(); // Create Translucent object
const theDeep = new TheDeep(); // Create The Deep object
const aTrain = new ATrain(); // Create A-Train object
const starlight = new Starlight(); // Create Starlight object
const blackNoir = new BlackNoir(); // Create Black Noir object
const lamplighter = new Lamplighter(); // Create Lamplighter object
const homelander = new Homelander(); // Create Homelander object

// console.log(translucent);
// console.log(theDeep);
// console.log(aTrain);
// console.log(starlight);
// console.log(blackNoir);
// console.log(lamplighter);
// console.log(homelander);

// =======================================================================================
// =======================================================================================

// ====================
// GAME LOGIC
// ====================

// ====================
// EVENT LISTENERS
// ====================
