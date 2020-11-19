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
// • Multiple difficulty levels? (ie, Easy = 3 enemies/floors/battles, Medium = 5 enemies/floors/battles, Hard = all 7 enemies/floors/battles)
// • Ability for characters to utilize a shared item pool..?
// • ANIMATIONS:
////--> Attack animations (One general, one healing, and a few unique to common attacks like The Boys' specials?)
////--> Add a class toggle that visually distinguishes the "current" character from the others (animation shake or something) (ie -> selectedChar function that wraps your player move-selection function... )
////--> Cutscenes: Slide in each character card (full-width container, fixed-toward-bottom for Boys, fixed-toward-top for Supes; 8bit images to left for Boys, to right for Supes; commentary text opposite 8bit image)
////-->
// • ADDITIONAL GRAPHICS:
////-->
////-->
////-->

// =======================================================================================
//  ===== DON'T FORGET ======
// • NEED AN updateMessage() function to display text that I would have otherwise console.logged
// • Create a goodGuys array so that enemy's can randomly target them
// • Every method attached to a Supe will need its own accuracy calculation (each attack has a different hit %)
// • Revisit ~all of the characters to thresh out their stats + methods further! (get it all working-ish first)
// • Account for maxHealth and maxStamina in all functions (check your classes)
// •

// *** IDEAS
// queueOfAttacks = array with each function selected by the player stored in it sequentially (* maybe give speed stats one day who knows).
// after player selects all of the moves, we then execute the series of commands in this stack
// after this stack in queueOfAttacks is executed, the enemy will select their move (* or before, in the case of A-Train?)
// after the enemy selects their move, the enemy attack is immediately executed (* unless I make one battle a 2v4 at some point?)

// =======================================================================================

// ====================
// CACHED DOM NODES
// ====================

// =======================================================================================

// ====================
// GLOBAL VARIABLES
// ====================

// =======================================================================================

// ==========================
// CHARACTERS & CONSTRUCTORS
// ==========================

// ==========
// The Boys
// ==========
//  --> The Boys are vigilantes. A CIA black-ops team, their job is to police, monitor and
// potentially stop the Seven, a group of vainglorious superheroes. Founded by Billy Butcher,
// The Boys are out to expose the corruption they believe the Seven represent. Although they
// may not have superpowers, they do have a lot of blue - collar grit and a willingness to fight dirty.

// Humans class is the basis of our members of The Boys
// Contains Methods: regenerateStamina(), isDead(), ...
class Humans {
  // * note: typeof Humans = function  | non-ES6 ==> function Humans(name, health, maxHealth...) (*no constructor*) | non-ES6 has same functionality as ES6 ==> this is what Arthur means when he says "syntactical sugar"
  constructor(
    name,
    health,
    maxHealth,
    stamina,
    maxStamina,
    staminaRegenAmount,
    accuracy
  ) {
    this.name = name; // Character Name
    this.health = health; // Current-Health Value
    this.maxHealth = maxHealth; // Maximum-Health Value
    this.stamina = stamina; // Current-Stamina Value
    this.maxStamina = maxStamina; // Maximum-Stamina Value
    this.staminaRegenAmount = staminaRegenAmount; // Stamina will regenerate for each character by <--THIS amount at the end of each turn.
    this.accuracy = accuracy; // Each character has a % chance of hitting each shot. Higher^ accuracy value === higher chance of successfully landing your attack/heal.
  }
  /*
  At the end of every round, this regenerateStamina() method will cause 
  The Boys to each regenerate a specified amount of stamina.
  */
  regenerateStamina() {
    //* note: non-ES6 method-declaration (ie, "Traditional Style") would look like ==> Humans.prototype.regenerateStamina = function() {...} | in other words, adding methods to the prototype makes the method available to the class
    if (this.stamina < this.maxStamina - this.staminaRegenAmount) {
      // If currenet stamina is less than maxStamina minus staminaRegenerationAmount...
      this.stamina += this.staminaRegenAmount; // then set current stamina equal to the value of current stamina + staminaRegenerationAmount
    } else {
      // Otherwise... (to prevent from giving more stamina than our character's max...)
      this.stamina = this.maxStamina; // Set current stamina equal to the value of maxStamina
    }
  }
  /*
  At the end of every enemy attack, we will use this isDead()
  method as part of areWeDead(), used to check to 
  see which of The Boys are currently alive, and which 
  are currently dead.
  */
  isDead() {
    // If current health < 1...
    if (this.health < 1) {
      this.health = 0; // set current health equal to 0
      return this.health < 1; // then, return true
    } else {
      return this.health < 1; // otherwise, return false
    }
  }
  /*
   *** Thinking about including a saySomething() method that calls updateMessage() and does something else... May be unnecessary lol.
   */
}

// Create Class for M.M. (Mother's Milk)
// A father, juvenile boys counselor, and former USMC medic, MM has *range*.
// Use this versatile character to deal out damage, patch up your allies, and maybe even save a life while you're at it…
class MM extends Humans {
  //Initialize constructor using super as a "function" to access parent prototype
  // * note: non-ES6 parent-extension ==> function MM(name, health, maxHealth, ...) {Humans.call(this, name, health, maxHealth, ...);} | cont... | MM.prototype = Object.create(Human.prototype); | cont... | MM.prototype.constructor = MM | in other words, a function for the subclass MM needs to be created. since MM is going to inherit the characteristics and behaviors of Humans, we must call the Humans' constructor function inside MM's constructor (<== this call right here does the same thing as super() in ES6). We also need to explicitly pass our "this" reference to the Humans class to ensure the call was made from our MM class. FURTHERMORE (*whew*) we need to set the MM function's prototype as a new object created from the Humans' prototype. In doing this, we are overriding MM's prototype object. Hence, we need to set the constructor of MM explicitly. | <== THESE steps take care of setting the MM class as a subclass of our Humans class
  constructor(name, health, maxHealth, stamina, maxStamina, accuracy) {
    super(
      (name = "Mother's Milk"),
      (health = 800),
      (maxHealth = 800),
      (stamina = 400),
      (maxStamina = 400),
      (accuracy = 0.8)
    );
  }
  // Basic attack on enemy. Damage+, Stamina-
  tacticalStrike(enemy) {
    // * note: mapping super to non-ES6 ==> MM.prototype.tacticalStrike = function() { return `${Humans.prototype."some-function".call(this)}`;} | in other words, the keyword super can also be used as an instance of our parent class to call Humans class-specific details | <== the super instance is ~basically ParentClassName.prototype.methodName.call(this,...)
    this.stamina -= 10;
    enemy.health -= 50;
    // *** updateMessage() with ...
  }
  // Basic heal command. Targets one individual, heals moderate amount. Heal+, Stamina-
  fieldMedic(ally) {
    this.stamina -= 20;
    ally.health += 100;
    // *** updateMessage() with ...
  }
  // *Special*: FOR A COST... MM can use his skills as a combat medic to revive one teammate. If @ 0 HP, revive (like a phoenix down, with ~some health). Heal+++, Stamina---
  battlefieldTriage(ally) {
    if ((ally.health = 0)) {
      ally.health = 50;
    } else {
      // *** Include a message via updateMessage() that says:
      // ${ally.name} doesn't need revived! Try choosing another teammate or command.
      // --> AFTER THINKING ABOUT THIS MORE will probably need to think about how to circle back to select a new action if this selection fails... A moveSelect() function of some sort or something...
    }
    // *** updateMessage() with ...
  }
}

// Create class for William "Billy" Butcher
// Use Butcher’s cunning, strength, and sadistic nature to take down Supes.
// Butcher packs a powerful, varied arsenal: manage his stamina, and he can bring down almost any Supe.
class Butcher extends Humans {
  //Initialize constructor using super as a "function" to access parent prototype
  constructor(name, health, maxHealth, stamina, maxStamina, accuracy) {
    super(
      (name = "Butcher"),
      (health = 800),
      (maxHealth = 800),
      (stamina = 500),
      (maxStamina = 500),
      (accuracy = 0.7)
    );
  }
  // Basic attack. Butcher should be our strongest character so, Damage+ means a little extra for him... Damage+, Stamina-
  giftedMarksman(enemy) {
    this.stamina -= 10;
    enemy.health -= 70;
    // *** updateMessage() with ...
  }
  // Medium attack. Mo' stamina mo' damage, baby. Damage++, Stamina--
  brutalize(enemy) {
    this.stamina -= 25;
    enemy.health -= 135;
    // *** updateMessage() with ...
  }
  // *Special*: FOR A COST... Butcher can put his years in the British SAS to use eviscerating (*ouch*) his opponents. Damage+++, Stamina---
  diabolicalMate(enemy) {
    this.stamina -= 60;
    enemy.health -= 200;
    // *** updateMessage() with "F*CKIN' DIABOLICAL, MATE"
  }
}

// Create a class for Hugh "Hughie" Campbell Jr. (see also ==> Petit Hughie, "Wee Hughie")
// Hughie isn’t much of a fighter, but his skill and cunning in combat may surprise you…
// Use his intelligence and healing abilities to support your team in battle.
class Hughie extends Humans {
  //Initialize constructor using super as a "function" to access parent prototype
  constructor(name, health, maxHealth, stamina, maxStamina, accuracy) {
    super(
      (name = "Hughie"),
      (health = 500),
      (maxHealth = 500),
      (stamina = 900),
      (maxStamina = 900),
      (accuracy = 0.95)
    );
  }
  // Tactical skill that deals a small amount of damage AND reveals an enemy's weakness (if they have any!). Damage1/2+, Stamina-
  tacticalNous(enemy) {
    this.stamina -= 10;
    enemy.health -= 5;
    // *** include a way to reveal an enemy's specific weakness!
    // Nested if, else if statements for each target/character...?
    // if enemy.name === XYZ, then log xyz via updateMessage()
    // *** updateMessage() with ...
  }
  // Hughie, White Mage and lover of smooth tunes. This move heals the entire team for a moderate amount. Heal++, Stamina--
  fleetwoodMac() {
    this.stamina -= 5;
    // *** is there a better way to be healing/targeting everyone at once?
    mothersMilk.health += 50;
    butcher.health += 50;
    hughie.health += 50;
    frenchie.health += 50;
    // *** updateMessage() with ...
  }
  // *Special*: FOR A COST... Mild-mannered and meek, Hughie believes anything can be worked through if you just talk about it. Let's see how it goes!
  letsTalk(enemy) {
    if (enemy.name === "Starlight") {
      // *** THEN battleEnd()
      // *** nextCutscene()
    } else {
      this.health -= 75;
    }
    // *** updateMessage() with ...
  }
}

// Create a class for Frenchie (real name Serge.. see ==> The Frenchman)
// Equally adept with a blade as he is with a beaker, Frenchie likes playing mad-scientist, often
// improvising his own weapons — you never know what he’ll come up with next.
class Frenchie extends Humans {
  //Initialize constructor using super as a "function" to access parent prototype
  constructor(name, health, maxHealth, stamina, maxStamina, accuracy) {
    super(
      (name = "Frenchie"),
      (health = 800),
      (maxHealth = 800),
      (stamina = 400),
      (maxStamina = 400),
      (accuracy = 0.8)
    );
  }
  // Buy, sell, build, shoot – c'est vrai: Frenchie knows his way around guns. Basic attack. Damage+, Stamina-
  gunRunner(enemy) {
    this.stamina -= 10;
    enemy.health -= 55;
    // *** updateMessage() with ...
  }
  // Chemical engineering in the modern world. Damage++, Stamina--
  improvisedExplosives(enemy) {
    if (enemy.name === "Translucent") {
      this.stamina -= 25;
      // *** battleEnd()
      // *** updateMessage() "something something bomb in the butt"
      // *** nextCutscene()
    } else {
      this.stamina -= 25;
      enemy.health -= 135;
      // *** updateMessage() with ...
    }
  }
  // *Special*: FOR A COST... Frenchie was originally recruited to The Boys thanks to his history of developing impressive gadgets and creative weapons.
  // Notable creations include: • a sniper-rifle round coated in the same carbon metamaterial as Translucent's skin (status: failure) • a xanax-bomb meant to counter the rage-induced powers of the Supe, Behemoth (status: success) • **SPOILERS** inspired by a turtle and its shell, Frenchie builds a plastic bomb meant for Translucent's... insides. (status: null)
  // Damage???, Stamina---
  spontaneousInventor() {
    // different outcomes dependent on battle/target...
    // one of the main methods for taking advantage of weaknesses...
    // *** updateMessage() with ...
  }
}

/*
Instantiations for The Boys
*/
const mothersMilk = new MM(); // Create MM object
const butcher = new Butcher(); // Create Butcher object
const hughie = new Hughie(); // Create Hughie object
const frenchie = new Frenchie(); // Create Frenchie object

// console.log(mothersMilk);
// console.log(butcher);
// console.log(hughie);
// console.log(frenchie);

/*
*** Create an array to house the boys. 
This will help allow targeting both from 
the enemy + for directing heals and revives.

Push each of the boys into the array.

Include a currentlySelected variable that references above array.
*/

// ==========
// The Supes
// ==========
//  --> The Seven is the most popular and powerful American Superhero team, owned and managed
// by Vought International. They consist of seven superheroes; while The Seven oftentimes use
// their powers to stop "crimes", their principal pursuit is typically fame and glory.

// Humans class is the basis of our Supes characters
// Contains Methods: isDead(), ...
class Supes {
  constructor(name, health, maxHealth) {
    this.name = name; // Character Name
    this.health = health; // Current-Health Value
    this.maxHealth = maxHealth; // Maximum-Health Value
  }
  /*
  *** At the end of every enemy attack, we will use this isDead()
  method as part of areTheyDead(), used to check to 
  see which of The Supes are currently alive, and which 
  are currently dead.
  */

  // Currently the below checks to see if a single enemy is dead or not. Returns boolean.
  isDead() {
    // If current health < 1...
    if (this.health < 1) {
      this.health = 0; // set current health equal to 0
      return this.health < 1; // then, return true
    } else {
      return this.health < 1; // otherwise, return false
    }
  }
}

// Create a class for Translucent, The Seven's invisible supermember.
// Bulletproof and pervy, how do The Boys stand a chance?
class Translucent extends Supes {
  // Initialize constructor using super as a "function" to access parent prototype
  constructor(name, health, maxHealth) {
    super((name = "Translucent"), (health = 800), (maxHealth = 800));
  }
  // A master of stealth, Translucent strikes from the shadows. Damage+ to 1 random target.
  shadowStrike(goodGuy) {
    // write a function for randomly selecting one of the boys as target
    // push good guys to an array and choose a random index to choose target
    // ****** Also need to include an accuracy calculation for each attack so that all
    // attacks don't always hit always...
    // *** ALSO *** Also: will need to build a function that randomly selects one of these attacks
    // to then perform on a random target..
    goodGuy.health -= 55;
    // *** updateMessage() with ...
  }
  // "No, I don't actually vanish. My skin turns into this carbon meta-material that bends
  // the light.Like an invisibility cloak." Damage++
  invisibleLurker(goodGuy) {
    // write a function for randomly selecting one of the boys as target
    // push good guys to an array and choose a random index to choose target
    goodGuy.health -= 85;
    // *** updateMessage() with ...
  }
  // A quick re-ordereding-of-carbon-into-metamaterial later and Translucent is good-as-new. Heal+
  carbonRealignment() {
    // to keep from over-healing...
    if (this.health < this.maxHealth - 100) {
      // if current health is less than maxHealth minus heal amount...
      this.health += 100; // then increase current health by 100
    } else {
      // otherwise...
      this.health = this.maxHealth; // set current health equal to the value of maxHealth
    }
    // *** updateMessage() with ...
  }
}

// Create class for The Deep (real name: Kevin Moskowitz | other alias: Lord of the Seven Seas)
class TheDeep extends Supes {
  // Initialize constructor using super as a "function" to access parent prototype
  constructor(name, health, maxHealth) {
    super((name = "The Deep"), (health = 1000), (maxHealth = 1000));
  }
  // Luckily, Vought Tower's six-story aquatic exhibit is fresh-water; unfortunately, it's full of piranhas. Don't fall in.
  // Summon scaly allies to fight by his side. Damage+ to entire team.
  aquaticTelepathy(goodGuys) {
    // Need a function to select every member of the team rather than just 1
    goodGuys.health -= 30;
    // *** updateMessage() with ...
  }
  // Body of man, spirit of shark. Shark strength. Damage++ to single member of The Boys.
  sharkStrength(goodGuy) {
    goodGuy.health -= 95;
    // *** updateMessage() with ...
  }
  // It takes thick skin to swim in the Mariana Trench on the ocean floor. Regenerative skin helps. (fun-fact: MT has a water pressure of 8-tons-per-square-inch, OR 1,000x the standard atmospheric pressure at sea level)
  // Just don't touch his gills. Heal+
  secondSkin() {
    // to keep from over-healing...
    if (this.health < this.maxHealth - 250) {
      // if current health is less than maxHealth minus heal amount...
      this.health += 250; // increase current health by heal amount
    } else {
      // otherwise...
      this.health = this.maxHealth; // set current health equal to the value of maxHealth
    }
    // *** updateMessage() with ...
  }
}

// Create a class for A-Train. He killed Hughie Campbell's girlfriend, Robin.
// He ran through her A-Train is fast.
// *** when you write the battle logic for this fight against A-Train, don't forget to make him go first every round | ie, he needs to go after each of the boys have selected their moves */
class ATrain extends Supes {
  // Initialize constructor using super as a "function" to access the parent prototype
  constructor(name, health, maxHealth) {
    super((name = "A-Train"), (health = 1200), (maxHealth = 1200));
    this.power = 200; // A-Train is the only boss with a power property. Power is an attack damage modifier.
    this.heartBeat = 100; // Only a world-class ath-e-lete could bash heads in battle and maintain 100bpm...
  }
  // Starlight shoots light and A-Train can dodge her attacks, ergo: he big-fast. Damage++ to single member of The Boys.
  speedOfLight(goodGuy) {
    goodGuy.health -= Math.floor(Math.random() * power) + 50; // returns a value on average, between 125 and 175 damage at base power of 200
    // *** updateMessage() with ...
  }
  // Shooting-up Compound-V keeps him sharp, but how much can his heart take? Heal+, Power+, heartBeat++
  compoundV() {
    this.power += 50; // increase power and thus, damage potential
    this.heartBeat += 100; // increase heart-rate. harder, better, faster, stronger.
    // *** I think I'll eventually need a isDead()? function call around here...
    // to keep from over-healing...
    if (this.health < this.maxHealth - 150) {
      // if current health is less than maxHealth minus heal amount...
      this.health += 150; // increase current health by heal amount
    } else {
      // otherwise...
      this.health = this.maxHealth; // set current health equal to the value of maxHealth
    }
    // *** updateMessage() with ...
  }
  // The fastest speedster on Earth (just don't ask Shockwave)
  // Bounces around The Boys like a pinball. Damage+ to all members of The Boys
  fastestManAlive(goodGuys) {
    // Need a function to select every member of the team rather than just 1
    // Attack will deal damage + to every team member
    // *** updateMessage() with ...
  }
  // *** INCLUDE A UNIQUE isDead() method?? Where should I incorporate the heartBeat death condition...?
}

// Create a class for "The Defender of Des Moines", Starlight. (real name: Annie January)
class Starlight extends Supes {
  // Initialize constructor using super as a "function" to access the parent prototype
  constructor(name, health, maxHealth) {
    super((name = "Starlight"), (health = 1250), (maxHealth = 1250));
  }
  // Iron-man-like energy blasts from the hands. Yikes. Damage++ to single member of The Boys
  energyProjection(goodGuy) {
    goodGuy.health -= 120;
    // *** updateMessage() with ...
  }
  // As long as there is electricity around, Starlight has near-limitless power... Heal++
  harnessElectricity() {
    // to keep from over-healing...
    if (this.health < this.maxHealth - 235) {
      //if current health is less than maxHealth minus heal amount...
      this.health += 235; // increase current health by heal amount
    } else {
      //otherwise...
      this.health = this.maxHealth; //set current health equal to the value of maxHealth
    }
    // *** updateMessage() with ...
  }
  // "Electricity goes in, blast comes out." Damage+ to all members of The Boys
  energyBlast(goodGuys) {
    // *** loop through goodGuys array | for ( let guy in goodGuys )...
    // Need a function to select every member of the team rather than just 1
    // Attack will deal damage ++ to every team member
    // *** updateMessage() with ...
  }
}

class BlackNoir extends Supes {
  constructor(name, health, maxHealth) {
    super((name = "Black Noir"), (health = 2000), (maxHealth = 2000));
  }
  hiddenBlade(goodGuy) {
    goodGuy.health -= 75;
    // *** updateMessage() with ...
  }
  regenerativeHealing() {
    if (this.health < this.maxHealth - 300) {
      this.health += 300;
    } else {
      this.health = this.maxHealth;
    }
    // *** updateMessage() with ...
  }
  silentAssassin(goodGuy) {
    goodGuy.health -= 200;
    // *** updateMessage() with ...
  }
}

class Lamplighter extends Supes {
  constructor(name, health, maxHealth) {
    super((name = "Lamplighter"), (health = 800), (maxHealth = 800));
  }
  pyrokinesis(goodGuy) {
    goodGuy.health -= 125;
    // *** updateMessage() with ...
  }
  burnedAlive(goodGuy) {
    goodGuy.health -= 250;
    // *** updateMessage() with ...
  }
  fireStorm(goodGuys) {
    // Need a function to select every member of the team rather than just 1
    // Attack will deal damage + to every team member
    // *** updateMessage() with ...
  }
}

class Homelander extends Supes {
  constructor(name, health, maxHealth) {
    super((name = "Homelander"), (health = 2000), (maxHealth = 2000));
  }
  // Raised in a lab, Homelander was bred to be a weapon. Unfortunately, this means he doesn't
  // know how to process his emotions in a healthy way. When he get's angry, he acts out. Damage++
  bruteForce(goodGuy) {
    goodGuy.health -= 250;
    // *** updateMessage() with ...
  }
  // Is he really the most powerful being ever? Is he a god? How does his hair always stay so perfect? Heal+++
  invulnerability() {
    this.health += 500;
    // *** updateMessage() with ...
  }
  // "Wasn't I chosen to save you? It is not my God-given purpose to protect the
  // United States of America ? Psalm 58: 10: 'The righteous shall rejoice when he
  // sees the vengeance; He shall wash his feet in the blood of the wicked'!"
  // Damage++++
  heatVision(goodGuy) {
    goodGuy.health -= 750;
    // *** updateMessage() with ...
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

// areWeDead() ==>
// areTheyDead() ==>
// selectedCharacter ==> used to determine what actions we can choose from. also gets added to a class that makes it visually stand out (physically move (transform: translate()) it out in front of the others)

// checkIfHit() determines if our currentlySelected member of The Boys
// is able to successfully complete their action or not.
const checkIfHit = (ally) => {
  if (Math.random() < ally.accuracy) {
    return true;
  } else {
    return false;
  }
};

// ====================
// EVENT LISTENERS
// ====================
