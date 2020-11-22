/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////                                         ////////////////////////////////////////////////////
////////////////////////////////////////////////////     THE BOYS  –  SUPE-R DESTRUCTION     ////////////////////////////////////////////////////
////////////////////////////////////////////////////                                         ////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////        a game by tyler samuelson        /////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

//
// ==========================
// CIRCLE-BACK-TO-BONUS LIST:
// ==========================
// • Choose your team of 4 from a larger pool of heroes...
// • More unique stats + moves for each character
// • Work on difficulty of game... Get it working first though!
// • Multiple difficulty levels? (ie, Easy = 3 enemies/floors/battles, Medium = 5 enemies/floors/battles, Hard = all 7 enemies/floors/battles)
// • Ability for characters to utilize a shared item pool..?

// • ANIMATIONS:
////--> Attack animations (One general, one healing, and a few unique to common attacks like The Boys' specials?)
////--> Add a class toggle that visually distinguishes the "current" character from the others (shifts them further in-screen like in FF + highlight their name?) (ie -> selectedChar function that wraps your player move-selection function... )
////--> Cutscenes: Slide in each character card (full-width container, fixed-toward-bottom for Boys, fixed-toward-top for Supes; 8bit images to left for Boys, to right for Supes; commentary text opposite 8bit image)
////-->

// • ADDITIONAL GRAPHICS:
////-->
////-->
////-->

// =======================================================================================
//  ===== DON'T FORGET ======
// • NEED AN updateMessage() function to display text that I would have otherwise console.logged
// • Revisit ~all of the characters to thresh out their stats + methods further! (get it all working-ish first)
// •

// =======================================================================================
// =======================================================================================
//
//                                 CACHED DOM NODES
//
// =======================================================================================
// =======================================================================================

//////////////////////////////////////////////////
//////                                      //////
//////        -----STAT UPDATES-----        //////
//////                                      //////
//////////////////////////////////////////////////
const mmStats = document.getElementById("mm-stats"); // mmStats ==> Targets Mother's Milk's HP and SP info in the DOM
const butcherStats = document.getElementById("butcher-stats"); // butcherStats ==> Targets Butcher's HP and SP info in the DOM
const hughieStats = document.getElementById("hughie-stats"); // hughieStats ==> Targets Hughie's HP and SP info in the DOM
const frenchieStats = document.getElementById("frenchie-stats"); // frenchieStats ==> Targets Frenchie's HP and SP info in the DOM
const opponentStats = document.getElementById("opponent-stats"); //opponentStats ==> Targets current Opponent's HP and SP info in the DOM

//////////////////////////////////////////////////
//////                                      //////
//////           -----BUTTONS-----          //////
//////                                      //////
//////////////////////////////////////////////////

// CORE Action Buttons | dynamically assigned via switch statement (~line ***1800) to each character's 3 CORE actions
///////////////////////////////////////////////////////////////////////////////////////
const actionButton1 = document.getElementById("btn-action-1");
const actionButton2 = document.getElementById("btn-action-2");
const actionButton3 = document.getElementById("btn-action-3");

// Heal Buttons assign healIndex | button 1 ==> targets M.M. | button 2 ==> targets Butcher | button 3 ==> targets Hughie | button 4 ==> targets Frenchie |
///////////////////////////////////////////////////////////////////////////////////////
const healButton1 = document.getElementById("btn-heal-1");
const healButton2 = document.getElementById("btn-heal-2");
const healButton3 = document.getElementById("btn-heal-3");
const healButton4 = document.getElementById("btn-heal-4");

// Get Started Button on Welcome Modal | calls getStarted() which kicks off our game
///////////////////////////////////////////////////////////////////////////////////////
const getStarted = document.getElementById("get-started");

//////////////////////////////////////////////////
//////                                      //////
//////           -----MODALS-----           //////
//////                                      //////
//////////////////////////////////////////////////

// Initial on-start pop-up
///////////////////////////////////////////////////////////////////////////////////////
const welcomeModal = document.getElementById("welcome-modal");

// Core gameplay-communication window. | Pops up when prompted by updatedMessage()
///////////////////////////////////////////////////////////////////////////////////////
const message = document.getElementById("message-modal");

// Main Feedback Channel - The updateMessage Modal | Most every action will respond in-kind with a prompt that can be clicked to close
///////////////////////////////////////////////////////////////////////////////////////
const updateMessage = (text) => {
  message.textContent = text;
  message.classList.toggle("closed");
};

// Enables us to click-to-close our updateMessage window
///////////////////////////////////////////////////////////////////////////////////////
const clearMessage = () => {
  message.classList.toggle("closed");
  // function to close updateMessage modal && ... what else do we need to have it do...
};

// Toggle helper function attached to Get Started Button
// refactor to seek target and be able to close multiple modals...?
///////////////////////////////////////////////////////////////////////////////////////
const toggleModal = () => {
  // helper function to remove our welcome modal
  welcomeModal.classList.toggle("closed");
};

//
// ON-HOVER Modals... eventually...
///////////////////////////////////////////////////////////////////////////////////////
// ==> // ==> Action 1 Break-out
// ==> // ==> Action 2 Break-out
// ==> // ==> Action 3 Break-out
//

// =======================================================================================
// =======================================================================================
//
//                                  GLOBAL DECLARATIONS
//
// =======================================================================================
// =======================================================================================

const staminaRegenAmount = 15; // Amount by which They Boys will regain stamina each turn

let theBoys = []; // Array that will house our team, The Boys

// =======================================================================================
// =======================================================================================
//
//                              CHARACTERS & CONSTRUCTORS
//
// =======================================================================================
// =======================================================================================

//////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                     //
// The Boys                                                                                            //
// ============================                                                                        //
//  --> The Boys are vigilantes. A CIA black-ops team, their job is to police, monitor and             //
// potentially stop the Seven, a group of vain, inglorious superheroes. Founded by Billy Butcher,      //
// The Boys are out to expose the corruption they believe the Seven represent. Although they           //
// may not have superpowers, they do have a lot of blue-collar grit and a willingness to fight dirty.  //
/////////////////////////////////////////////////////////////////////////////////////////////////////////

////// ******** NOTE ******** //////
// No idea what my issue with extending classes is but I HAD to refactor,
// because I just kept running into random issues with 'this' and accessing
// properties and methods on the parent prototype
////// ********************** //////

// Humans class is the basis of our members of The Boys
// • Contains Methods: regenerateStamina(), isDead(), ...
///////////////////////////////////////////////////////////////////////////////////////
// class Humans {
//   // * note: typeof Humans = function  | non-ES6 ==> function Humans(name, health, maxHealth...) (*no constructor*) | non-ES6 has same functionality as ES6 ==> this is what Arthur means when he says "syntactical sugar"
//   constructor() {
//     // Initialize constructor function
//   }

//   // regenerateStamina()
//   // • At the end of every round, this regenerateStamina() method will cause The Boys to each regenerate a specified amount of stamina
//   ///////////////////////////////////////////////////////////////////////////////////////
//   regenerateStamina() {
//     //* note: non-ES6 method-declaration (ie, "Traditional Style") would look like ==> Humans.prototype.regenerateStamina = function() {...} | in other words, adding methods to the prototype makes the method available to the class
//     if (this.stamina < this.maxStamina - staminaRegenAmount) {
//       // if current stamina < maxStamina minus staminaRegenerationAmount...
//       this.stamina += staminaRegenAmount; // then increase current stamina by staminaRegenerationAmount
//     } else {
//       // if current stamina > maxStamina minus staminaRegenerationAmount...
//       this.stamina = this.maxStamina; // then set current stamina equal to the value of maxStamina
//     }
//   }

//   // isDead()
//   // • At the end of every enemy attack, we will use this isDead() method as part of areWeDead(), used to check to see which of The Boys are currently alive, and which are currently dead
//   ////// Dead ==> return true
//   ////// Alive ==> return false
//   ///////////////////////////////////////////////////////////////////////////////////////
//   isDead() {
//     if (this.health < 1) {
//       // if current health < 1...
//       this.health = 0; // then set current health equal to 0
//       return this.health < 1; // then return true
//     } else {
//       // if current health > than 1...
//       return this.health < 1; // then return false
//     }
//   }
// }
// END Humans Class

///////////////////////////////////////////////////////////////////////////////////////
////// • Create Class for M.M. (Mother's Milk)
////// A father, juvenile boys counselor, and former USMC medic, M.M. has *range*.
////// Use this versatile character to deal out damage, patch up your allies, and maybe even save a life while you're at it…
///////////////////////////////////////////////////////////////////////////////////////
class MM {
  // Initialize constructor
  // * note: non-ES6 parent-extension ==> function MM(name, health, maxHealth, ...) {Humans.call(this, name, health, maxHealth, ...);} | cont... | MM.prototype = Object.create(Human.prototype); | cont... | MM.prototype.constructor = MM | in other words, a function for the subclass MM needs to be created. since MM is going to inherit the characteristics and behaviors of Humans, we must call the Humans' constructor function inside MM's constructor (<== this call right here does the same thing as super() in ES6). We also need to explicitly pass our "this" reference to the Humans class to ensure the call was made from our MM class. FURTHERMORE (*whew*) we need to set the MM function's prototype as a new object created from the Humans' prototype. In doing this, we are overriding MM's prototype object. Hence, we need to set the constructor of MM explicitly. | <== THESE steps take care of setting the MM class as a subclass of our Humans class
  constructor() {
    this.name = "Mother's Milk"; // Character Name
    this.health = 600; // Current-Health Value
    this.maxHealth = 600; // Maximum-Health Value
    this.stamina = 600; // Current-Stamina Value
    this.maxStamina = 600; // Maximum-Stamina Value
    this.accuracy = 0.8; // Each character has a % chance of hitting each shot. Higher^ accuracy value === higher chance of successfully landing your attack/heal/action
  }

  //////////////////////////////////////////////////
  //////                                      //////
  //////    -----SUPPLEMENTAL METHODS-----    //////
  //////                                      //////
  //////////////////////////////////////////////////

  // updateStats()
  // • At the end of every round and enemy attack, this updateStats() method will push stat updates for each character's Health Points and Stamina Points
  ///////////////////////////////////////////////////////////////////////////////////////
  updateStats() {
    // update current HP and SP in the DOM
    mmStats.innerHTML = `<h2>M.M. <span>HP ${this.health} / ${this.maxHealth}</span><span>SP ${this.stamina} / ${this.maxStamina}</span></h2>`;
  }

  // regenerateStamina()
  // • At the end of every round, this regenerateStamina() method will cause The Boys to each regenerate a specified amount of stamina
  ///////////////////////////////////////////////////////////////////////////////////////
  regenerateStamina() {
    //* note: non-ES6 method-declaration (ie, "Traditional Style") would look like ==> Humans.prototype.regenerateStamina = function() {...} | in other words, adding methods to the prototype makes the method available to the class
    if (this.stamina < this.maxStamina - staminaRegenAmount) {
      // if current stamina < maxStamina minus staminaRegenerationAmount...
      this.stamina += staminaRegenAmount; // then increase current stamina by staminaRegenerationAmount
    } else {
      // if current stamina > maxStamina minus staminaRegenerationAmount...
      this.stamina = this.maxStamina; // then set current stamina equal to the value of maxStamina
    }
  }

  // isDead()
  // • At the end of every enemy attack, we will use this isDead() method as part of areWeDead(), used to check to see which of The Boys are currently alive, and which are currently dead
  ////// Dead ==> return true
  ////// Alive ==> return false
  ///////////////////////////////////////////////////////////////////////////////////////
  isDead() {
    if (this.health < 1) {
      // if current health < 1...
      this.health = 0; // then set current health equal to 0
      return this.health < 1; // then return true
    } else {
      // if current health > than 1...
      return this.health < 1; // then return false
    }
  }

  //////////////////////////////////////////////////
  //////                                      //////
  //////           -----ATTACKS-----          //////
  //////                                      //////
  //////////////////////////////////////////////////

  ////// TACTICAL STRIKE – Basic attack on enemy. DAMAGE+, STAMINA-
  ///////////////////////////////////////////////////////////////////////////////////////
  tacticalStrike() {
    // * note: mapping super to non-ES6 ==> MM.prototype.tacticalStrike = function() { return `${Humans.prototype."some-function".call(this)}`;} | in other words, the keyword super can also be used as an instance of our parent class to call Humans class-specific details | <== the super instance is ~basically ParentClassName.prototype.methodName.call(this,...)

    let staminaCost = 20; // bind temporary variable of staminaCost to this attack
    let attackDamage = 50; // bind temporary variable of attackDamage to this attack
    console.log(this.stamina);

    if (this.stamina >= staminaCost) {
      // if current stamina >= the required stamina for this attack...
      if (checkIfHit(this) === true) {
        // if our attack successfully hits the enemy...
        console.log("Success! M.M. landed his attack."); // then console.log
        this.stamina -= staminaCost; // then decrease our stamina by stamina cost
        opponent.health -= attackDamage; // then decrease the target's health by attack damage
        // then updateMessage()
        updateMessage(
          `M.M. landed a tactical strike on ${opponent.name} for ${attackDamage} damage!`
        );

        // Post-Attack Stack | refactor out eventually?
        this.regenerateStamina(); // then regenerate stamina for the round
        this.updateStats(); // then updateStats()
        nextCharacter(); // then cycle to the next character
      } else {
        // if our attack missed the enemy...
        console.log("Bummer! M.M. missed his attack."); // then console.log
        updateMessage("M.M.'s attack missed!"); // then updateMessage()

        // Post-Attack Stack | refactor out eventually?
        this.regenerateStamina(); // then regenerate stamina for the round
        this.updateStats(); // then updateStats()
        nextCharacter(); // then cycle to the next character
      }
    } else {
      // if our current stamina < the required stamina for this attack...
      // then updateMessage()
      updateMessage(
        `M.M. doesn't have enough stamina! Try choosing a different action.`
      );
    }
  }

  ////// FIELD MEDIC – Basic heal command. Targets one individual, heals moderate amount. HEAL+, STAMINA-
  ///////////////////////////////////////////////////////////////////////////////////////
  fieldMedic() {
    // This skill targets healTarget, a global variable that references one of the boys in theBoys array
    // healTarget is selected via the four heal-target-select-buttons below the 3 main action buttons

    let staminaCost = 20; // bind temporary variable of staminaCost to this skill... * note: in another life, I would've used a class constructor to build these skills... then attached all of these properties directly to the skill object... one day...
    let healAmount = 100; // bind temporary variable of healAmount to this skill

    if (healTarget.isDead() === false) {
      // if the character we're trying to target is still alive...
      if (this.stamina >= staminaCost) {
        // if current stamina >= the required stamina for this skill...
        if (checkIfHit(this) === true) {
          // if our heal is successful...
          console.log("Success! M.M. landed his heal."); // then console.log
          this.stamina -= staminaCost; // then decrease our stamina by stamina cost
          if (healTarget.health < healTarget.maxHealth - healAmount) {
            // if target's current health < their maxHealth minus heal amount...
            healTarget.health += healAmount; // then increase ally's health by heal amount
            // then updateMessage()
            updateMessage(
              `M.M healed ${healTarget.name} for ${healAmount} HP!`
            );
          } else {
            // if the target's current health > their maxHealth minus heal amount...
            healTarget.health = healTarget.maxHealth; // then set target's current health equal to the value of the target's maxHealth
            // then updateMessage()
            updateMessage(`M.M. fully restored ${healTarget.name}'s HP!`);
          }
          // Post-Attack Stack | refactor out eventually?
          this.regenerateStamina(); // then regenerate stamina for the round
          this.updateStats(); // then updateStats()
          nextCharacter(); // then cycle to the next character
        } else {
          // if our heal "missed"...
          console.log("Bummer! M.M. missed his heal."); // then console.log
          updateMessage("M.M.'s heal attempt failed! Son of a ...!"); // then updateMessage()

          // Post-Attack Stack | refactor out eventually?
          this.regenerateStamina(); // then regenerate stamina for the round
          this.updateStats(); // then updateStats()
          nextCharacter(); // then cycle to the next character
        }
      } else {
        // if current stamina < the required stamina for this skill...
        // then updateMessage()
        updateMessage(
          `M.M. doesn't have enough stamina! Try choosing a different action.`
        );
      }
    } else {
      // if the character we're trying to target is dead...
      // then updateMessage()
      updateMessage(
        `Unfortunately, ${healTarget.name} is already dead! Try changing your heal target, or choosing a different action.`
      );
    }
  }

  ////// *Special*: BATTLEFIELD TRIAGE – FOR A COST... M.M. can use his skills as a combat medic to revive one teammate. If @ 0 HP, revive (like a phoenix down, with ~some health). HEAL+++, STAMINA---
  ///////////////////////////////////////////////////////////////////////////////////////
  battlefieldTriage() {
    // Passing healTarget, a global variable, as the argument | healTarget references one of the boys in theBoys array

    let staminaCost = 75; // bind temporary variable of staminaCost to this skill
    let healAmount = 50; // bind temporary variable of healAmount to this skill

    if (healTarget.isDead() === true) {
      // if the character we're trying to target is dead...
      if (this.stamina >= staminaCost) {
        // if current stamina >= the required stamina for the skill...
        if (checkIfHit(this) === true) {
          // if our revive is successful...
          console.log("Success! M.M. landed his revive."); // then console.log
          this.stamina -= staminaCost; // then decrease current stamina by stamina cost
          healTarget.health = healAmount; // then set target's current health equal to the value of healAmount (ie, revive them!)
          // then updateMessage()
          updateMessage(
            `M.M. revived ${healTarget.name}! They now have ${healAmount} health.`
          );

          // Post-Attack Stack | refactor out eventually?
          this.regenerateStamina(); // then regenerate stamina for the round
          this.updateStats(); // then updateStats()
          nextCharacter(); // then cycle to the next character
        } else {
          // if our revive "missed"...
          console.log("Bummer! M.M. missed his revive."); // then console.log
          updateMessage("M.M.'s revive attempt failed! What a waste!"); // then updateMessage()

          // Post-Attack Stack | refactor out eventually?
          this.regenerateStamina(); // then regenerate stamina for the round
          this.updateStats(); // then updateStats()
          nextCharacter(); // then cycle to the next character
        }
      } else {
        // if current stamina < the required stamina for the skill...
        // then updateMessage()
        updateMessage(
          `M.M. doesn't have enough stamina! Try choosing a different action.`
        );
      }
    } else {
      // if the character we're trying to target is actually still alive...
      // then updateMessage()
      updateMessage(
        `Bloody brilliant – ${healTarget.name} is still alive and doesn't need revived! Try targeting another teammate or selecting a different command.`
      );
    }
  }
}

///////////////////////////////////////////////////////////////////////////////////////
////// Create class for William "Billy" Butcher
////// Use Butcher’s cunning, strength, and sadistic nature to take down Supes.
////// Butcher packs a powerful, varied arsenal: manage his stamina, and he can bring down almost any Supe.
///////////////////////////////////////////////////////////////////////////////////////
class Butcher {
  //Initialize constructor
  constructor() {
    this.name = "Butcher"; // Character Name
    this.health = 800; // Current-Health Value
    this.maxHealth = 800; // Maximum-Health Value
    this.stamina = 500; // Current-Stamina Value
    this.maxStamina = 500; // Maximum-Stamina Value
    this.accuracy = 0.7; // Each character has a % chance of hitting each shot. Higher^ accuracy value === higher chance of successfully landing your attack/heal/action
  }

  //////////////////////////////////////////////////
  //////                                      //////
  //////    -----SUPPLEMENTAL METHODS-----    //////
  //////                                      //////
  //////////////////////////////////////////////////

  // updateStats()
  // • At the end of every round and enemy attack, this updateStats() method will push stat updates for each character's Health Points and Stamina Points
  ///////////////////////////////////////////////////////////////////////////////////////
  updateStats() {
    // update current HP and SP in the DOM
    butcherStats.innerHTML = `<h2>BUTCHER <span>HP ${this.health} / ${this.maxHealth}</span><span>SP ${this.stamina} / ${this.maxStamina}</span></h2>`;
  }

  // regenerateStamina()
  // • At the end of every round, this regenerateStamina() method will cause The Boys to each regenerate a specified amount of stamina
  ///////////////////////////////////////////////////////////////////////////////////////
  regenerateStamina() {
    //* note: non-ES6 method-declaration (ie, "Traditional Style") would look like ==> Humans.prototype.regenerateStamina = function() {...} | in other words, adding methods to the prototype makes the method available to the class
    if (this.stamina < this.maxStamina - staminaRegenAmount) {
      // if current stamina < maxStamina minus staminaRegenerationAmount...
      this.stamina += staminaRegenAmount; // then increase current stamina by staminaRegenerationAmount
    } else {
      // if current stamina > maxStamina minus staminaRegenerationAmount...
      this.stamina = this.maxStamina; // then set current stamina equal to the value of maxStamina
    }
  }

  // isDead()
  // • At the end of every enemy attack, we will use this isDead() method as part of areWeDead(), used to check to see which of The Boys are currently alive, and which are currently dead
  ////// Dead ==> return true
  ////// Alive ==> return false
  ///////////////////////////////////////////////////////////////////////////////////////
  isDead() {
    if (this.health < 1) {
      // if current health < 1...
      this.health = 0; // then set current health equal to 0
      return this.health < 1; // then return true
    } else {
      // if current health > than 1...
      return this.health < 1; // then return false
    }
  }

  //////////////////////////////////////////////////
  //////                                      //////
  //////           -----ATTACKS-----          //////
  //////                                      //////
  //////////////////////////////////////////////////

  ////// GIFTED MARKSMAN – Basic attack. Butcher should be our strongest character so, Damage+ means a little extra for him... DAMAGE+, STAMINA-
  ///////////////////////////////////////////////////////////////////////////////////////
  giftedMarksman() {
    let staminaCost = 10; // bind temporary variable of staminaCost to this attack
    let attackDamage = 70; // bind temporary variable fo attackDamage to this attack

    if (this.stamina >= staminaCost) {
      // if current stamina >= the required stamina for the attack...
      if (checkIfHit(this) === true) {
        // if our attack successfully hits the enemy...
        console.log("Success! Butcher landed his attack."); // then console.log
        this.stamina -= staminaCost; // then decrease current stamina by stamina cost
        opponent.health -= attackDamage; // then decrease the target's health by attack damage
        // then updateMessage()
        updateMessage(
          `Butcher hit ${opponent.name} for ${attackDamage} damage!`
        );

        // Post-Attack Stack | refactor out eventually?
        this.regenerateStamina(); // then regenerate stamina for the round
        this.updateStats(); // then updateStats()
        nextCharacter(); // then cycle to the next character
      } else {
        // if our attack missed the enemy...
        console.log("Bummer! Butcher missed his attack."); // then console.log
        updateMessage("Butcher's attack missed!"); // then updateMessage()

        // Post-Attack Stack | refactor out eventually?
        this.regenerateStamina(); // then regenerate stamina for the round
        this.updateStats(); // then updateStats()
        nextCharacter(); // then cycle to the next character
      }
    } else {
      // if current stamina < the required stamina for the attack...
      // then updateMessage()
      updateMessage(
        `Butcher doesn't have enough stamina! Try choosing a different action.`
      );
    }
  }

  ////// BRUTALIZE – Medium attack. Mo' stamina mo' damage, baby. DAMAGE++, STAMINA--
  ///////////////////////////////////////////////////////////////////////////////////////
  brutalize() {
    let staminaCost = 25; // bind temporary variable of staminaCost to this attack
    let attackDamage = 135; // bind temporary variable of attackDamage to this attack

    if (this.stamina >= staminaCost) {
      // if current stamina is >= the required stamina for the attack...
      if (checkIfHit(this) === true) {
        // if our attack successfully hits the enemy...
        console.log("Success! Butcher landed his attack."); // then console.log
        this.stamina -= staminaCost; // then decrease current stamina by stamina cost
        opponent.health -= attackDamage; // then decrease the target's health by attack damage
        // then updateMessage()
        updateMessage(
          `Butcher hit ${opponent.name} for ${attackDamage} damage!`
        );

        // Post-Attack Stack | refactor out eventually?
        this.regenerateStamina(); // then regenerate stamina for the round
        this.updateStats(); // then updateStats()
        nextCharacter(); // then cycle to the next character
      } else {
        // if our attack missed the enemy...
        console.log("Bummer! Butcher missed his attack."); // then console.log
        updateMessage("Butcher's attack missed!"); // then updateMessage()

        // Post-Attack Stack | refactor out eventually?
        this.regenerateStamina(); // then regenerate stamina for the round
        this.updateStats(); // then updateStats()
        nextCharacter(); // then cycle to the next character
      }
    } else {
      // if current stamina < the required stamina for the attack...
      // then updateMessage
      updateMessage(
        `Butcher doesn't have enough stamina! Try choosing a different action.`
      );
    }
  }

  ////// *Special*: F*CKIN DIABOLICAL MATE – FOR A COST... Butcher can put his years in the British SAS to use eviscerating (*ouch*) his opponents. DAMAGE+++, STAMINA---
  ///////////////////////////////////////////////////////////////////////////////////////
  diabolicalMate() {
    let staminaCost = 60; // bind temporary variable staminaCost to this attack
    let attackDamage = 200; // bind temporary variable attackDamage to this attack

    if (this.stamina >= staminaCost) {
      // if current stamina >= the required stamina for the attack...
      if (checkIfHit(this) === true) {
        // if our attack successfully hits the enemy...
        console.log("Success! Butcher landed his attack."); // then console.log
        this.stamina -= staminaCost; // then decrease current stamina by stamina cost
        opponent.health -= attackDamage; // then decrease the target's health by attack damage
        // then updateMessage()
        updateMessage(
          `F*CKIN' DIABOLICAL, MATE. Butcher hit ${opponent.name} for ${attackDamage} damage!`
        );

        // Post-Attack Stack | refactor out eventually?
        this.regenerateStamina(); // then regenerate stamina for the round
        this.updateStats(); // then updateStats()
        nextCharacter(); // then cycle to the next character
      } else {
        // if our attack missed the enemy...
        console.log("Bummer! Butcher missed his attack."); // then console.log
        updateMessage("Bollocks, Butcher's attack missed!"); // then updateMessage()

        // Post-Attack Stack | refactor out eventually?
        this.regenerateStamina(); // then regenerate stamina for the round
        this.updateStats(); // then updateStats()
        nextCharacter(); // then cycle to the next character
      }
    } else {
      // if current stamina < the required stamina for the attack...
      // then updateMessage()
      updateMessage(
        `Butcher doesn't have enough stamina! Try choosing a different action.`
      );
    }
  }
}

///////////////////////////////////////////////////////////////////////////////////////
////// Create a class for Hugh "Hughie" Campbell Jr. (see also ==> Petit Hughie, "Wee Hughie")
////// Hughie isn’t much of a fighter, but his skill and cunning in combat may surprise you…
////// Use his intelligence and healing abilities to support your team in battle.
///////////////////////////////////////////////////////////////////////////////////////
class Hughie {
  //Initialize constructor
  constructor() {
    this.name = "Hughie"; // Character Name
    this.health = 500; // Current-Health Value
    this.maxHealth = 500; // Maximum-Health Value
    this.stamina = 1000; // Current-Stamina Value
    this.maxStamina = 1000; // Maximum-Stamina Value
    this.accuracy = 0.9; // Each character has a % chance of hitting each shot. Higher^ accuracy value === higher chance of successfully landing your attack/heal/action
  }

  //////////////////////////////////////////////////
  //////                                      //////
  //////    -----SUPPLEMENTAL METHODS-----    //////
  //////                                      //////
  //////////////////////////////////////////////////

  // updateStats()
  // • At the end of every round and enemy attack, this updateStats() method will push stat updates for each character's Health Points and Stamina Points
  ///////////////////////////////////////////////////////////////////////////////////////
  updateStats() {
    // update current HP and SP in the DOM
    hughieStats.innerHTML = `<h2>HUGHIE <span>HP ${this.health} / ${this.maxHealth}</span><span>SP ${this.stamina} / ${this.maxStamina}</span></h2>`;
  }

  // regenerateStamina()
  // • At the end of every round, this regenerateStamina() method will cause The Boys to each regenerate a specified amount of stamina
  ///////////////////////////////////////////////////////////////////////////////////////
  regenerateStamina() {
    //* note: non-ES6 method-declaration (ie, "Traditional Style") would look like ==> Humans.prototype.regenerateStamina = function() {...} | in other words, adding methods to the prototype makes the method available to the class
    if (this.stamina < this.maxStamina - staminaRegenAmount) {
      // if current stamina < maxStamina minus staminaRegenerationAmount...
      this.stamina += staminaRegenAmount; // then increase current stamina by staminaRegenerationAmount
    } else {
      // if current stamina > maxStamina minus staminaRegenerationAmount...
      this.stamina = this.maxStamina; // then set current stamina equal to the value of maxStamina
    }
  }

  // isDead()
  // • At the end of every enemy attack, we will use this isDead() method as part of areWeDead(), used to check to see which of The Boys are currently alive, and which are currently dead
  ////// Dead ==> return true
  ////// Alive ==> return false
  ///////////////////////////////////////////////////////////////////////////////////////
  isDead() {
    if (this.health < 1) {
      // if current health < 1...
      this.health = 0; // then set current health equal to 0
      return this.health < 1; // then return true
    } else {
      // if current health > than 1...
      return this.health < 1; // then return false
    }
  }

  //////////////////////////////////////////////////
  //////                                      //////
  //////           -----ATTACKS-----          //////
  //////                                      //////
  //////////////////////////////////////////////////

  ////// TACTICAL NOUS – Tactical skill that deals a small amount of damage AND reveals an enemy's weakness (if they have any!). DAMAGE 1/2+, STAMINA--
  ///////////////////////////////////////////////////////////////////////////////////////
  tacticalNous() {
    let staminaCost = 20; // bind temporary variable staminaCost to this skill
    let attackDamage = 5; // bind temporary variable attackDamage to this skill

    if (this.stamina >= staminaCost) {
      // if current stamina is >= the required stamina for the skill...
      if (checkIfHit(this) === true) {
        // if our action succeeded...
        console.log("Success! Hughie landed his action."); // then console.log
        this.stamina -= staminaCost; // then decrease current stamina by stamina cost
        opponent.health -= attackDamage; // then decrease target's health by attack damage
        if (opponent.name === "Translucent") {
          // if target's name is Translucent...
          translucentConvoCounter = true; // then set global tracker to true
          // then updateMessage()
          updateMessage(
            "He's like a turtle: hard exterior, but his insides are still soft... Get creative."
          );
        } else if (opponent.name === "The Deep") {
          // if target's name is The Deep...
          updateMessage("We're not even near the ocean — just shoot him!"); // then updateMessage()
        } else if (opponent.name === "A-Train") {
          // if target's name is A-Train...
          // then updateMessage()
          updateMessage(
            "Compound-V is making him impossibly strong... but how much will his heart be able to take?"
          );
        } else if (opponent.name === "Starlight") {
          // if target's name is Starlight...
          // then updateMessage()
          updateMessage(
            "Starlight seems to have a soft-spot for Hughie... Maybe we should let him lean into his emotional personality?"
          );
        } else if (opponent.name === "Black Noir") {
          // if target's name is Black Noir...
          blackNoirConvoCounter = true; // then set global tracker to true
          // then updateMessage()
          updateMessage(
            "Rumor has it that Black Noir has a peanut allergy... Just make sure you take his Epi-Pen."
          );
        } else if (opponent.name === "Lamplighter") {
          // if target's name is Lamplighter...
          lamplighterConvoCounter = true; // then set global tracker to true
          // then updateMessage()
          updateMessage(
            "In the ultimate irony, Lamplighter's biggest weakness is fire... Frenchie might have an idea or two..."
          );
        } else if (opponent.name === "Homelander") {
          // if target's name is Homelander...
          if (homelanderConvoCount === 0) {
            // if homelanderConvoCount is equal to the value of 0...
            homelanderConvoCount++; // then iterate the global counter
            // then updateMessage()
            updateMessage(
              "Does this guy even have any weaknesses? I mean, we DO know that he can't see through zinc. Who knows if that's helpful..."
            );
          } else if (homelanderConvoCount === 1) {
            // if homelanderConvoCount is equal to the value of 1...
            homelanderConvoCount++; // then iterate the global counter
            // then updateMessage()
            updateMessage(
              "Okay, this is promising... Butcher's CIA contact mentioned something to him about sonic-sensitivity? That's all we've got."
            );
          } else if (homelanderConvoCount > 1) {
            // if homelanderConvoCount is > the value of 1...
            homelanderConvoCount++; // then iterate the global counter | * note: we could probably omit this, but I kinda want to leave it there purely for the random easter eggs it could empower...
            // then updateMessage()
            updateMessage(
              "FRENCHIE'S GOT IT! *THE* WEAPON. GO SEE WHAT HE'S INVENTED!!"
            );
          }
        }

        // Post-Attack Stack | refactor out eventually?
        this.regenerateStamina(); // then regenerate stamina for the round
        this.updateStats(); // then updateStats()
        nextCharacter(); // then cycle to the next character
      } else {
        // if our action "missed"...
        console.log("Bummer! Hughie missed his action."); // then console.log
        // then updateMessage()
        updateMessage(
          "Missed? How in the hell did you miss?! Damnit Hughie..."
        );

        // Post-Attack Stack | refactor out eventually?
        this.regenerateStamina(); // then regenerate stamina for the round
        this.updateStats(); // then updateStats()
        nextCharacter(); // then cycle to the next character
      }
    } else {
      // if current stamina < the required stamina for the skill...
      // then updateMessage()
      updateMessage(
        `Hughie doesn't have enough stamina! Try choosing a different action.`
      );
    }
  }

  ////// FLEETWOOD MAC – Hughie, White Mage and lover of smooth tunes. This move heals the entire team for a moderate amount. HEAL++, STAMINA--
  ///////////////////////////////////////////////////////////////////////////////////////
  fleetwoodMac() {
    let staminaCost = 20; // bind temporary variable staminaCost to this skill
    let healAmount = 50; // bind temporary variable healAmoutn to this skill

    if (this.stamina >= staminaCost) {
      // if current stamina >= the required stamina for the skill...
      if (checkIfHit(this) === true) {
        // if our action succeeded...
        console.log("Success! Hughie landed his heal."); // then console.log

        this.stamina -= staminaCost; // then decrease current stamina by stamina cost
        for (let member of theBoys) // for each member of The Boys in theBoys array...
          if (member.isDead() === false) {
            // if member is alive...
            if (member.health < member.maxHealth - healAmount) {
              // if member's current health < their maxHealth minus heal amount...
              member.health += healAmount; // then increase member health by heal amount
            } else {
              // if the member's current health > their maxHealth minus heal amount...
              member.health = member.maxHealth; // then set member's current health equal to the value of the member's maxHealth
            }
          } else {
            // if member is dead...
            return; // then return – cycle back through for loop | *** might need to be "continue"? making note now for future troubleshooting...
          }
        // then updateMessage()
        updateMessage(
          "Now that is soul-soothing… the whole team feels revitalized!"
        );

        // Post-Attack Stack | refactor out eventually?
        this.regenerateStamina(); // then regenerate stamina for the round
        this.updateStats(); // then updateStats()
        nextCharacter(); // then cycle to the next character
      } else {
        // if our action "missed"...
        console.log("Bummer! Hughie missed his heal."); // then console.log
        // then updateMessage()
        updateMessage(
          "Missed? How in the hell did you miss?! Damnit Hughie..."
        );

        // Post-Attack Stack | refactor out eventually?
        this.regenerateStamina(); // then regenerate stamina for the round
        this.updateStats(); // then updateStats()
        nextCharacter(); // then cycle to the next character
      }
    } else {
      // if current stamina < the required stamina for the skill...
      // then updateMessage()
      updateMessage(
        `Hughie doesn't have enough stamina! Try choosing a different action.`
      );
    }
  }

  ////// *Special*: LET'S TALK – FOR A COST... Mild-mannered and meek, Hughie believes anything can be worked through if you just talk about it. Let's see how it goes! DAMAGE??, STAMINA---
  ///////////////////////////////////////////////////////////////////////////////////////
  letsTalk() {
    let staminaCost = 50; // bind temporary variable staminaCost to this skill
    let attackDamage = 75; // bind temporary variable attackDamage to this skill | for this skill, attack damage = self-inflicted damage

    if (this.stamina >= staminaCost) {
      // if current stamina >= the required stamina for the skill...
      if (checkIfHit(this) === true) {
        // if our action succeeded...
        console.log("Success! Hughie landed his action."); // then console.log

        this.stamina -= staminaCost; // then decrease current stamina by stamina cost
        if (opponent.name === "Starlight") {
          // if target name is Starlight...
          // then updateMessage()
          updateMessage(
            `Annie! Listen to me: You're not like the rest of The Seven! Since when did "hopeful" and "naive" become the same thing? I know you are in this business to try to save the world.. We can help! Help us stop Homelander!`
          );

          // Post-Attack Stack | refactor out eventually?
          this.regenerateStamina(); // then regenerate stamina for the round
          this.updateStats(); // then updateStats()
          nextCharacter(); // then cycle to the next character
          // *** then battleEnd()
          // *** nextCutscene()
        } else {
          // if target name is anything other than Starlight...
          this.health -= attackDamage; // then decrease Hughie's current health by attack damage
          // then updateMessage()
          updateMessage(
            "Hughie – in what world was that going to work? Un-f*cking-believeable. C'mon mate..."
          );

          // Post-Attack Stack | refactor out eventually?
          this.regenerateStamina(); // then regenerate stamina for the round
          this.updateStats(); // then updateStats()
          nextCharacter(); // then cycle to the next character
        }
      } else {
        // if our action "missed"...
        console.log("Bummer! Hughie missed his action."); // then console.log
        // then updateMessage()
        updateMessage(
          "Missed? How in the hell did you miss?! Damnit Hughie..."
        );

        // Post-Attack Stack | refactor out eventually?
        this.regenerateStamina(); // then regenerate stamina for the round
        this.updateStats(); // then updateStats()
        nextCharacter(); // then cycle to the next character
      }
    } else {
      // if current stamina < the required stamina for the skill...
      // then updateMessage()
      updateMessage(
        `Hughie doesn't have enough stamina! Try choosing a different action.`
      );
    }
  }
}

////// Create a class for Frenchie (real name Serge.. see ==> The Frenchman)
////// Equally adept with a blade as he is with a beaker, Frenchie likes playing mad-scientist, often
////// improvising his own weapons — you never know what he’ll come up with next.
///////////////////////////////////////////////////////////////////////////////////////
class Frenchie {
  //Initialize constructor
  constructor() {
    this.name = "Frenchie"; // Character Name
    this.health = 700; // Current-Health Value
    this.maxHealth = 700; // Maximum-Health Value
    this.stamina = 550; // Current-Stamina Value
    this.maxStamina = 550; // Maximum-Stamina Value
    this.accuracy = 0.8; // Each character has a % chance of hitting each shot. Higher^ accuracy value === higher chance of successfully landing your attack/heal/action
  }

  //////////////////////////////////////////////////
  //////                                      //////
  //////    -----SUPPLEMENTAL METHODS-----    //////
  //////                                      //////
  //////////////////////////////////////////////////

  // updateStats()
  // • At the end of every round and enemy attack, this updateStats() method will push stat updates for each character's Health Points and Stamina Points
  ///////////////////////////////////////////////////////////////////////////////////////
  updateStats() {
    // update current HP and SP in the DOM
    frenchieStats.innerHTML = `<h2>FRENCHIE <span>HP ${this.health} / ${this.maxHealth}</span><span>SP ${this.stamina} / ${this.maxStamina}</span></h2>`;
  }

  // regenerateStamina()
  // • At the end of every round, this regenerateStamina() method will cause The Boys to each regenerate a specified amount of stamina
  ///////////////////////////////////////////////////////////////////////////////////////
  regenerateStamina() {
    //* note: non-ES6 method-declaration (ie, "Traditional Style") would look like ==> Humans.prototype.regenerateStamina = function() {...} | in other words, adding methods to the prototype makes the method available to the class
    if (this.stamina < this.maxStamina - staminaRegenAmount) {
      // if current stamina < maxStamina minus staminaRegenerationAmount...
      this.stamina += staminaRegenAmount; // then increase current stamina by staminaRegenerationAmount
    } else {
      // if current stamina > maxStamina minus staminaRegenerationAmount...
      this.stamina = this.maxStamina; // then set current stamina equal to the value of maxStamina
    }
  }

  // isDead()
  // • At the end of every enemy attack, we will use this isDead() method as part of areWeDead(), used to check to see which of The Boys are currently alive, and which are currently dead
  ////// Dead ==> return true
  ////// Alive ==> return false
  ///////////////////////////////////////////////////////////////////////////////////////
  isDead() {
    if (this.health < 1) {
      // if current health < 1...
      this.health = 0; // then set current health equal to 0
      return this.health < 1; // then return true
    } else {
      // if current health > than 1...
      return this.health < 1; // then return false
    }
  }

  //////////////////////////////////////////////////
  //////                                      //////
  //////           -----ATTACKS-----          //////
  //////                                      //////
  //////////////////////////////////////////////////

  ////// GUN RUNNER – Buy, sell, build, shoot – c'est vrai: Frenchie knows his way around guns. Basic attack. DAMAGE+, STAMINA-
  ///////////////////////////////////////////////////////////////////////////////////////
  gunRunner() {
    let staminaCost = 10; // bind temporary variable staminaCost to this attack
    let attackDamage = 55; // bind temporary variable attackDamage to this attack

    if (this.stamina >= staminaCost) {
      // if current stamina is >= the required stamina for the attack...
      if (checkIfHit(this) === true) {
        // if our attack successfully hits the enemy...
        console.log("Success! Frenchie landed his attack."); // then console.log
        this.stamina -= staminaCost; // then decrease current stamina by stamina cost
        opponent.health -= attackDamage; // then decrease target's health by attack damage
        // then updateMessage()
        updateMessage(
          `Frenchie hit ${opponent.name} for ${attackDamage} damage!`
        );

        // Post-Attack Stack | refactor out eventually?
        this.regenerateStamina(); // then regenerate stamina for the round
        this.updateStats(); // then updateStats()
        nextCharacter(); // then cycle to the next character
      } else {
        console.log("Bummer! Frenchie missed his attack."); // then console.log
        updateMessage(`Zut-alors! Frenchie's attack missed...`); // then updateMessage()

        // Post-Attack Stack | refactor out eventually?
        this.regenerateStamina(); // then regenerate stamina for the round
        this.updateStats(); // then updateStats()
        nextCharacter(); // then cycle to the next character
      }
    } else {
      // if current stamina is < the required stamina for the attack...
      // then updateMessage()
      updateMessage(
        `Frenchie doesn't have enough stamina! Try choosing a different action.`
      );
    }
  }

  ////// IMPROVISED EXPLOSIVES – Chemical engineering in the modern world. DAMAGE++, STAMINA--
  ///////////////////////////////////////////////////////////////////////////////////////
  improvisedExplosives() {
    let staminaCost = 40; // bind temporary variable staminaCost to this attack
    let attackDamage = 135; // bind temporary variable attackDamage to this attack

    if (this.stamina >= staminaCost) {
      // if current stamina >= the required stamina for the attack...
      if (checkIfHit(this) === true) {
        // if our attack successfully hits the enemy...
        console.log("Success! Frenchie landed his attack."); // then console.log
        this.stamina -= staminaCost; // then decrease current stamina by stamina cost
        if (
          opponent.name === "Translucent" &&
          translucentConvoCounter === true
        ) {
          // if target's name is Translucent AND Hughie has investigated Translucent's weakness...
          // then updateMessage()
          updateMessage(
            "Frenchie did you just... put a bomb... in-.. inside of him?.. F*ck me, mate... That's bloody brilliant."
          );
          //MAY need post attack stack here..?
          // *** battleEnd()
          // *** nextCutscene()
        } else {
          // if our target is anyone other than Translucent, AND/OR Hughie hasn't revealed Translucent's weakness yet.
          opponent.health -= attackDamage; // then decrease target's health by attack damage
        }

        // Post-Attack Stack | refactor out eventually?
        this.regenerateStamina(); // then regenerate stamina for the round
        this.updateStats(); // then updateStats()
        nextCharacter(); // then cycle to the next character
      } else {
        // if our attack missed the enemy...
        console.log("Bummer! Frenchie missed his attack."); // then console.log
        // then updateMessage()
        updateMessage(`Zut-alors! Frenchie's attack missed...`);

        // Post-Attack Stack | refactor out eventually?
        this.regenerateStamina(); // then regenerate stamina for the round
        this.updateStats(); // then updateStats()
        nextCharacter(); // then cycle to the next character
      }
    } else {
      // if current stamina < the required stamina for the attack...
      // then updateMessage()
      updateMessage(
        `Frenchie doesn't have enough stamina! Try choosing a different action.`
      );
    }
  }

  ////// *Special*: SPONTANEOUS INVENTOR – FOR A COST... Frenchie was originally recruited to The Boys thanks to his history of developing impressive gadgets and creative weapons. Notable creations include: • a sniper-rifle round coated in the same carbon metamaterial as Translucent's skin (status: failure) • a xanax-bomb meant to counter the rage-induced powers of the Supe, Behemoth (status: success) • **SPOILERS** inspired by a turtle and its shell, Frenchie builds a plastic bomb meant for Translucent's... insides. (status: null) DAMAGE???, STAMINA---
  ///////////////////////////////////////////////////////////////////////////////////////
  spontaneousInventor() {
    let staminaCost = 100; // bind temporary variable staminaCost to this attack
    let attackDamage = 100; // bind temporary variable attackDamage to this attack
    let damageBonus = 5; // bind temporary variable damageBonus to this attack | Damage multiplier applied when we know a Supe's obvious weakness...
    let modifiedDamage = attackDamage * damageBonus; // bind temporary variable modifiedDamage to this attack
    let homelanderBonus = 3; // bind temporary variable homelanderBonus to this attack | if you jump through the hoops of setting it up, you can deal lots of damage to Homelander...

    if (this.stamina >= staminaCost) {
      //if current stamina >= the required stamina for the attack...
      if (checkIfHit(this) === true) {
        // if our attack successfully hits the enemy...
        console.log("Success! Frenchie landed his attack."); // then console.log

        this.stamina -= -staminaCost; // then decrease current stamina by stamina cost
        if (opponent.name === "Black Noir" && blackNoirConvoCounter === true) {
          // if target's name is Black Noir AND Hughie has investigated Black Noir's weakness...
          opponent.health -= modifiedDamage; // then decrease target's health by the value of modifiedDamage
          // then updateMessage()
          updateMessage(
            `Frenchie! Was that a... PB&J? You just threw a PB&J? *Surprisingly effective!* Black Noir took ${modifiedDamage} damage! Guess that nut allergy was serious...`
          );
        }
        if (
          opponent.name === "Lamplighter" &&
          lamplighterConvoCounter === true
        ) {
          // if target's name is Lamplighter AND Hughie has investigated Lamplighter's weakness...
          opponent.health -= modifiedDamage; // then decrease target's health by the value of modifiedDamage
          // then updateMessage()
          updateMessage(
            `Bonjour, mon amie.. Let us see how much you truly like fire... *Surprisingly effective!* Lamplighter took ${modifiedDamage} damage from Frenchie's molotov cocktail!`
          );
        }
        if (opponent.name === "Homelander" && homelanderConvoCount > 1) {
          // if target's name is Homelander AND Hughie has investigated Homelander's multiple weaknesses...
          opponent.health -= modifiedDamage * homelanderBonus; // then decrease target's health by the value of (modifiedDamage * homelanderBonus)
          // then updateMessage()
          updateMessage(
            `Salut. Let's see how much targeted sonic-energy your ears can take... *Surprisingly effective!* Homelander took ${modifiedDamage} damage from Frenchie's sonic emitter!`
          );
        }

        // Post-Attack Stack | refactor out eventually?
        this.regenerateStamina(); // then regenerate stamina for the round
        this.updateStats(); // then updateStats()
        nextCharacter(); // then cycle to the next character
      } else {
        // if our attack missed the enemy...
        console.log("Bummer! Frenchie missed his attack."); // then console.log
        updateMessage(`Zut-alors! Frenchie's attack missed...`); // then updateMessage()
      }
      // Post-Attack Stack | refactor out eventually?
      this.regenerateStamina(); // then regenerate stamina for the round
      this.updateStats(); // then updateStats()
      nextCharacter(); // then cycle to the next character
    } else {
      // if current stamina < the required stamina for the attack...
      // then updateMessage()
      updateMessage(
        `Frenchie doesn't have enough stamina! Try choosing a different action.`
      );
    }
  }
}

///////////////////////////////////////////////////////////////////////////////////////
////// Declarations for The Boys
///////////////////////////////////////////////////////////////////////////////////////
const mothersMilk = new MM(); // Create mothersMilk object
const butcher = new Butcher(); // Create butcher object
const hughie = new Hughie(); // Create hughie object
const frenchie = new Frenchie(); // Create frenchie object

// Push each member of The Boys into the array
theBoys.push(mothersMilk);
theBoys.push(butcher);
theBoys.push(hughie);
theBoys.push(frenchie);

let healTarget = theBoys[0]; // Currently selected Heal Target

let playerIndex = 0; // Index counter - allows iteration and easier manipulation of members of The Boys
let currentlySelected = theBoys[playerIndex]; // Currently selected member of The Boys

// console.log(mothersMilk);
// console.log(butcher);
// console.log(hughie);
// console.log(frenchie);

// ====================================================================================
// ====================================================================================
// ====================================================================================

////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                //
// The Supes                                                                                      //
// ============================                                                                   //
//  --> The Seven is the most popular and powerful American Superhero team, owned and managed     //
// by Vought International. They consist of seven superheroes; while The Seven oftentimes use     //
// their powers to stop "crimes", their principal pursuit is typically fame and glory.            //
////////////////////////////////////////////////////////////////////////////////////////////////////

////// ******** NOTE ******** //////
// No idea what my issue with extending classes is but I HAD to refactor,
// because I just kept running into random issues with 'this' and accessing
// properties and methods on the parent prototype
////// ********************** //////

///////////////////////////////////////////////////////////////////////////////////////
// Supes class is the basis of each of our Supes
// Contains Methods: isDead(), updateStats()
///////////////////////////////////////////////////////////////////////////////////////
// class Supes {
//   constructor() {
//     // Initialize constructor function...
//   }

//   // isDead()
//   // • At the end of each attack from The Boys, we will use this isDead() method to check to see if the current Supe is still alive.
//   ////// Dead ==> return true
//   ////// Alive ==> return false
//   ///////////////////////////////////////////////////////////////////////////////////////
//   isDead() {
//     // If current health < 1...
//     if (this.health < 1) {
//       this.health = 0; // set current health equal to 0
//       return this.health < 1; // then, return true
//     } else {
//       return this.health < 1; // otherwise, return false
//     }
//   }

//   // updateStats()
//   // • At the end of every round and enemy attack, this updateStats() method will push stat updates for current opponent's Health Points and Stamina Points
//   ///////////////////////////////////////////////////////////////////////////////////////
//   updateStats() {
//     // update current HP and SP in the DOM
//     opponentStats.innerHTML = `<h2>${opponent.name.toUpperCase()}
//     <br />
//     <br />
//     <span>HP ${this.health} / ${this.maxHealth}</span></h2>`;
//   }
// }

///////////////////////////////////////////////////////////////////////////////////////
////// Create a class for Translucent, The Seven's invisible supermember.
////// Bulletproof and pervy, how do The Boys stand a chance?
///////////////////////////////////////////////////////////////////////////////////////
class Translucent {
  // Initialize constructor
  constructor() {
    this.name = "Translucent"; // Character Name
    this.health = 800; // Current-Health Value
    this.maxHealth = 800; // Maximum-Health Value
  }
  //////////////////////////////////////////////////
  //////                                      //////
  //////    -----SUPPLEMENTAL METHODS-----    //////
  //////                                      //////
  //////////////////////////////////////////////////

  // isDead()
  // • At the end of each attack from The Boys, we will use this isDead() method to check to see if the current Supe is still alive.
  ////// Dead ==> return true
  ////// Alive ==> return false
  ///////////////////////////////////////////////////////////////////////////////////////
  isDead() {
    // If current health < 1...
    if (this.health < 1) {
      this.health = 0; // set current health equal to 0
      return this.health < 1; // then, return true
    } else {
      return this.health < 1; // otherwise, return false
    }
  }

  // updateStats()
  // • At the end of every round and enemy attack, this updateStats() method will push stat updates for current opponent's Health Points and Stamina Points
  ///////////////////////////////////////////////////////////////////////////////////////
  updateStats() {
    // update current HP and SP in the DOM
    opponentStats.innerHTML = `<h2>${opponent.name.toUpperCase()} 
    <br />
    <br />
    <span>HP ${this.health} / ${this.maxHealth}</span></h2>`;
  }

  // Placeholder function that will select and execute one of Translucent's CORE actions.
  // Translucent Temperament: Egotistical, Predatory, Self-Involved | Focus on light attack, then heavy attack, then heal
  selectAttack() {
    // CURRENT:
    // • chance of shadowStrike ==> | 40 % |
    // • chance of invisibleLurker ==> | 35 % |
    // • chance of carbonRealignment ==> | 25 % |
    ////////////

    let randomNum = Math.random(); // set temp variable equal to a random number between | 0 | and | limit 1 |
    if (randomNum < 0.25) {
      // if randomly generated value is less than | .25 |...
      return this.carbonRealignment(); // then select and execute carbonRealignment()
    } else if (randomNum > 0.25 && randomNum < 0.61) {
      // if randomly generated value is between | .25 | and | ~.6 |...
      return this.invisibleLurker(); // then select and execute invisibleLurker()
    } else {
      // if neither of the above if statements have been triggered, then the value of randomNum must be between | .61 | and limit | 1 |...
      return this.shadowStrike(); // then select and execute shadowStrike()
    }
  }

  //////////////////////////////////////////////////
  //////                                      //////
  //////           -----ATTACKS-----          //////
  //////                                      //////
  //////////////////////////////////////////////////

  ////// SHADOW STRIKE – A master of stealth, Translucent strikes from the shadows. DAMAGE+ to 1 random target.
  ///////////////////////////////////////////////////////////////////////////////////////
  shadowStrike() {
    // * CAN LIKELY REFACTOR EVERYTHING BELOW but let's leave it until at least after we get an MVP...

    let attackDamage = 55; // bind temporary variable attackDamage to this attack
    let attackAccuracy = 0.9; // bind temporary variable attackAccuracy to this attack

    // * note: keeping these temporary bindings here due to lexical scoping issues when I've tried refactoring them out... So for now, each Supe attack method will have them.
    let randomIndex = Math.floor(Math.random() * 4); // set randomIndex equal to a random value between 0 and 3
    let validTargets = []; // create a temporary array to house our valid, living members of The Boys

    if (Math.random() < attackAccuracy) {
      // if attack successfully hits its target...
      for (let member of theBoys) {
        // for each member of The Boys in theBoys array...
        if (member.health > 1) {
          // if member's health is > 1 | ie, if member is alive...
          validTargets.push(member); // then push member into validTargets array
        }
      }
      console.log("Shit... Translucent's attack landed."); // then console.log
      let selectedTarget = validTargets[randomIndex]; // then set selectedTarget to a random, living member of The Boys
      selectedTarget.health -= attackDamage; // then deal damage to that randomly selected, living member of The Boys
      // then updateMessage()
      updateMessage(
        `Translucent struck from the shadows! ${selectedTarget.name} took ${attackDamage} damage!`
      );
    } else {
      // if attack misses entirely...
      console.log("Nice... Translucent's attack missed."); // then console.log
      updateMessage(`Translucent's attack missed!`); // then updateMessage()
    }
  }

  ////// INVISIBLE LURKER – "No, I don't actually vanish. My skin turns into this carbon meta-material that bends the light.Like an invisibility cloak." DAMAGE++
  ///////////////////////////////////////////////////////////////////////////////////////
  invisibleLurker() {
    let attackDamage = 85; // bind temporary variable attackDamage to this attack
    let attackAccuracy = 0.8; // bind temporary variable attackAccuracy to this attack

    // * note: keeping these temporary bindings here due to lexical scoping issues when I've tried refactoring them out... So for now, each Supe attack method will have them.
    let randomIndex = Math.floor(Math.random() * 4); // set randomIndex equal to a random value between 0 and 3
    let validTargets = []; // create a temporary array to house our valid, living members of The Boys

    if (Math.random() < attackAccuracy) {
      // if attack successfully hits its target...
      for (let member of theBoys) {
        // for each member of The Boys in theBoys array...
        if (member.health > 1) {
          // if member's health is > 1 | ie, if member is alive...
          validTargets.push(member); // then push member into validTargets array
        }
      }
      console.log("Shit... Translucent's attack landed."); // then console.log
      // after our validTargets array has been propagated with our living members of The Boys...
      let selectedTarget = validTargets[randomIndex]; // then set selectedTarget to a random, living member of The Boys
      selectedTarget.health -= attackDamage; // then deal damage to that randomly selected, living member of The Boys
      // then updateMessage()
      updateMessage(
        `Translucent attack from nowhere! ${selectedTarget.name} took ${attackDamage} damage!`
      );
    } else {
      // if attack misses entirely...
      console.log("Nice... Translucent's attack missed."); // then console.log
      updateMessage(`Translucent's attack missed!`); // then updateMessage()
    }
  }

  ////// CARBON REALIGNMENT – A quick re-ordereding-of-carbon-into-metamaterial later and Translucent is good-as-new. HEAL+
  ///////////////////////////////////////////////////////////////////////////////////////
  carbonRealignment() {
    let healAmount = 100; // bind temporary variable healAmount to this skill
    let healAccuracy = 0.75; // bind temporary variable healAccuracy to this skill

    if (Math.random() < healAccuracy) {
      // if heal successfully executes...
      console.log("Shit... Translucent healed himself."); // then console.log

      if (this.health < this.maxHealth - healAmount) {
        // if current health is < maxHealth minus heal amount...
        this.health += healAmount; // then increase current health by heal amount
        updateMessage(`Translucent restored his health by ${healAmount}`); // then updateMessage()
      } else {
        // if current health is > maxHealth minus heal amount...
        this.health = this.maxHealth; // then set current health equal to the value of maxHealth
        updateMessage("Translucent fully restored his health!");
      }
    } else {
      // if heal "misses" entirely...
      console.log("Nice... Translucent missed his heal."); // then console.log
      updateMessage(`Phew, Translucent failed to heal!`); // then updateMessage()
    }
  }
}

///////////////////////////////////////////////////////////////////////////////////////
////// Create class for The Deep
////// (real name: Kevin Moskowitz | other alias: Lord of the Seven Seas)
///////////////////////////////////////////////////////////////////////////////////////
class TheDeep {
  // Initialize constructor
  constructor() {
    this.name = "The Deep"; // Character Name
    this.health = 1000; // Current-Health Value
    this.maxHealth = 1000; // Maximum-Health Value
  }

  //////////////////////////////////////////////////
  //////                                      //////
  //////    -----SUPPLEMENTAL METHODS-----    //////
  //////                                      //////
  //////////////////////////////////////////////////

  // isDead()
  // • At the end of each attack from The Boys, we will use this isDead() method to check to see if the current Supe is still alive.
  ////// Dead ==> return true
  ////// Alive ==> return false
  ///////////////////////////////////////////////////////////////////////////////////////
  isDead() {
    // If current health < 1...
    if (this.health < 1) {
      this.health = 0; // set current health equal to 0
      return this.health < 1; // then, return true
    } else {
      return this.health < 1; // otherwise, return false
    }
  }

  // updateStats()
  // • At the end of every round and enemy attack, this updateStats() method will push stat updates for current opponent's Health Points and Stamina Points
  ///////////////////////////////////////////////////////////////////////////////////////
  updateStats() {
    // update current HP and SP in the DOM
    opponentStats.innerHTML = `<h2>${opponent.name.toUpperCase()} 
    <br />
    <br />
    <span>HP ${this.health} / ${this.maxHealth}</span></h2>`;
  }

  // **** COPY OF TRANSLUCENT'S selectAttack function BELOW ref for structure/style
  //
  // // Placeholder function that will select and execute one of Translucent's CORE actions.
  // // Translucent Temperament: Egotistical, Predatory, Self-Involved | Focus on light attack, then heavy attack, then heal
  // selectAttack() {
  //   // CURRENT:
  //   // • chance of shadowStrike ==> | 40 % |
  //   // • chance of invisibleLurker ==> | 35 % |
  //   // • chance of carbonRealignment ==> | 25 % |
  //   ////////////

  //   let randomNum = Math.random(); // set temp variable equal to a random number between | 0 | and | limit 1 |
  //   if (randomNum < 0.25) {
  //     // if randomly generated value is less than | .25 |...
  //     return this.carbonRealignment(); // then select and execute carbonRealignment()
  //   } else if (randomNum > 0.25 && randomNum < 0.61) {
  //     // if randomly generated value is between | .25 | and | ~.6 |...
  //     return this.invisibleLurker(); // then select and execute invisibleLurker()
  //   } else {
  //     // if neither of the above if statements have been triggered, then the value of randomNum must be between | .61 | and limit | 1 |...
  //     return this.shadowStrike(); // then select and execute shadowStrike()
  //   }
  // }

  //////////////////////////////////////////////////
  //////                                      //////
  //////           -----ATTACKS-----          //////
  //////                                      //////
  //////////////////////////////////////////////////

  ////// AQUATIC TELEPATHY – Luckily, Vought Tower's six-story aquatic exhibit is fresh-water; unfortunately, it's full of piranhas. Don't fall in. Summon scaly allies to fight by his side. Damage+ to entire team.
  ///////////////////////////////////////////////////////////////////////////////////////
  aquaticTelepathy(goodGuys) {
    // Need a function to select every member of the team rather than just 1
    goodGuys.health -= 30;
    // *** updateMessage() with ...
  }

  ////// STRENGTH OF A SHARK - Body of man, spirit of shark. Shark strength. Damage++ to single member of The Boys.
  ///////////////////////////////////////////////////////////////////////////////////////
  sharkStrength(goodGuy) {
    goodGuy.health -= 95;
    // *** updateMessage() with ...
  }

  ////// SECOND SKIN - It takes thick skin to swim in the Mariana Trench on the ocean floor. Regenerative skin helps. (fun-fact: The MT has a water pressure of 8-tons-per-square-inch, OR 1,000x the standard atmospheric pressure at sea level) Just don't touch his gills. Heal+
  ///////////////////////////////////////////////////////////////////////////////////////
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

///////////////////////////////////////////////////////////////////////////////////////
////// Create a class for A-Train. He killed Hughie Campbell's girlfriend, Robin.
////// He ran through her A-Train is fast.
////// *** when you write the battle logic for this fight against A-Train, don't forget to make him go first every round | ie, he needs to go after each of the boys have selected their moves
///////////////////////////////////////////////////////////////////////////////////////
class ATrain {
  // Initialize constructor
  constructor() {
    this.name = "A-train"; // Character Name
    this.health = 1200; // Current-Health Value
    this.maxHealth = 1200; // Maximum-Health Value
    this.power = 200; // A-Train is the only boss with a power property. Power is an attack damage modifier.
    this.heartBeat = 100; // Only a world-class ath-e-lete could bash heads in battle and maintain 100bpm...
  }

  //////////////////////////////////////////////////
  //////                                      //////
  //////    -----SUPPLEMENTAL METHODS-----    //////
  //////                                      //////
  //////////////////////////////////////////////////

  // isDead()
  // • At the end of each attack from The Boys, we will use this isDead() method to check to see if the current Supe is still alive.
  ////// Dead ==> return true
  ////// Alive ==> return false
  ///////////////////////////////////////////////////////////////////////////////////////
  isDead() {
    // If current health < 1...
    if (this.health < 1) {
      this.health = 0; // set current health equal to 0
      return this.health < 1; // then, return true
    } else {
      return this.health < 1; // otherwise, return false
    }
  }

  // updateStats()
  // • At the end of every round and enemy attack, this updateStats() method will push stat updates for current opponent's Health Points and Stamina Points
  ///////////////////////////////////////////////////////////////////////////////////////
  updateStats() {
    // update current HP and SP in the DOM
    opponentStats.innerHTML = `<h2>${opponent.name.toUpperCase()} 
    <br />
    <br />
    <span>HP ${this.health} / ${this.maxHealth}</span></h2>`;
  }

  //////////////////////////////////////////////////
  //////                                      //////
  //////           -----ATTACKS-----          //////
  //////                                      //////
  //////////////////////////////////////////////////

  ////// Starlight shoots light and A-Train can dodge her attacks, ergo: he big-fast. Damage++ to single member of The Boys.
  ///////////////////////////////////////////////////////////////////////////////////////
  speedOfLight(goodGuy) {
    goodGuy.health -= Math.floor(Math.random() * power) + 50; // returns a value on average, between 125 and 175 damage at base power of 200
    // *** updateMessage() with ...
  }

  ////// Shooting-up Compound-V keeps him sharp, but how much can his heart take? Heal+, Power+, heartBeat++
  ///////////////////////////////////////////////////////////////////////////////////////
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

  ////// The fastest speedster on Earth (just don't ask Shockwave)
  ////// Bounces around The Boys like a pinball. Damage+ to all members of The Boys
  ///////////////////////////////////////////////////////////////////////////////////////
  fastestManAlive(goodGuys) {
    // Need a function to select every member of the team rather than just 1
    // Attack will deal damage + to every team member
    // *** updateMessage() with ...
  }
  // *** INCLUDE A UNIQUE isDead() method?? Where should I incorporate the heartBeat death condition...?
}

///////////////////////////////////////////////////////////////////////////////////////
////// Create a class for "The Defender of Des Moines", Starlight.
////// (real name: Annie January)
///////////////////////////////////////////////////////////////////////////////////////
class Starlight {
  // Initialize constructor
  constructor() {
    this.name = "Starlight"; // Character Name
    this.health = 1250; // Current-Health Value
    this.maxHealth = 1250; // Maximum-Health Value
  }

  //////////////////////////////////////////////////
  //////                                      //////
  //////    -----SUPPLEMENTAL METHODS-----    //////
  //////                                      //////
  //////////////////////////////////////////////////

  // isDead()
  // • At the end of each attack from The Boys, we will use this isDead() method to check to see if the current Supe is still alive.
  ////// Dead ==> return true
  ////// Alive ==> return false
  ///////////////////////////////////////////////////////////////////////////////////////
  isDead() {
    // If current health < 1...
    if (this.health < 1) {
      this.health = 0; // set current health equal to 0
      return this.health < 1; // then, return true
    } else {
      return this.health < 1; // otherwise, return false
    }
  }

  // updateStats()
  // • At the end of every round and enemy attack, this updateStats() method will push stat updates for current opponent's Health Points and Stamina Points
  ///////////////////////////////////////////////////////////////////////////////////////
  updateStats() {
    // update current HP and SP in the DOM
    opponentStats.innerHTML = `<h2>${opponent.name.toUpperCase()} 
    <br />
    <br />
    <span>HP ${this.health} / ${this.maxHealth}</span></h2>`;
  }

  //////////////////////////////////////////////////
  //////                                      //////
  //////           -----ATTACKS-----          //////
  //////                                      //////
  //////////////////////////////////////////////////

  ////// Iron-man-like energy blasts from the hands. Yikes. Damage++ to single member of The Boys
  ///////////////////////////////////////////////////////////////////////////////////////
  energyProjection(goodGuy) {
    goodGuy.health -= 120;
    // *** updateMessage() with ...
  }
  ////// As long as there is electricity around, Starlight has near-limitless power... Heal++
  ///////////////////////////////////////////////////////////////////////////////////////
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
  ////// "Electricity goes in, blast comes out." Damage+ to all members of The Boys
  ///////////////////////////////////////////////////////////////////////////////////////
  energyBlast(goodGuys) {
    // *** loop through goodGuys array | for ( let guy in goodGuys )...
    // Need a function to select every member of the team rather than just 1
    // Attack will deal damage ++ to every team member
    // *** updateMessage() with ...
  }
}

///////////////////////////////////////////////////////////////////////////////////////
////// Create a class for Black Noir — The Seven's silent, stealthy, superpowered ninja.
////// His super strength and heightened senses are matched only by his proficiency in martial arts.
////// Criminals run at the mere mention of his name.
///////////////////////////////////////////////////////////////////////////////////////
class BlackNoir {
  // Initialize constructor
  constructor() {
    this.name = "Black Noir"; // Character Name
    this.health = 2000; // Current-Health Value
    this.maxHealth = 2000; // Maximum-Health Value
  }

  //////////////////////////////////////////////////
  //////                                      //////
  //////    -----SUPPLEMENTAL METHODS-----    //////
  //////                                      //////
  //////////////////////////////////////////////////

  // isDead()
  // • At the end of each attack from The Boys, we will use this isDead() method to check to see if the current Supe is still alive.
  ////// Dead ==> return true
  ////// Alive ==> return false
  ///////////////////////////////////////////////////////////////////////////////////////
  isDead() {
    // If current health < 1...
    if (this.health < 1) {
      this.health = 0; // set current health equal to 0
      return this.health < 1; // then, return true
    } else {
      return this.health < 1; // otherwise, return false
    }
  }

  // updateStats()
  // • At the end of every round and enemy attack, this updateStats() method will push stat updates for current opponent's Health Points and Stamina Points
  ///////////////////////////////////////////////////////////////////////////////////////
  updateStats() {
    // update current HP and SP in the DOM
    opponentStats.innerHTML = `<h2>${opponent.name.toUpperCase()} 
    <br />
    <br />
    <span>HP ${this.health} / ${this.maxHealth}</span></h2>`;
  }

  //////////////////////////////////////////////////
  //////                                      //////
  //////           -----ATTACKS-----          //////
  //////                                      //////
  //////////////////////////////////////////////////

  ////// Whether used in close combat or from range, Black
  ////// Noir is a master of daggers. Damage + to all members of The Boys
  ///////////////////////////////////////////////////////////////////////////////////////
  throwDaggers(goodGuys) {
    // utilize our functions that parse our validTargets and then select all living members
    // Damage + to all
    // *** updateMessage() with ...
  }
  ////// Noir's body is capable of healing wounds at an astounding rate.
  ////// Whatever the injury, it seems to heal within hours...Heal++
  ///////////////////////////////////////////////////////////////////////////////////////
  regenerativeHealing() {
    // to keep from over-healing
    if (this.health < this.maxHealth - 300) {
      // if current health is less than maxHealth minus heal amount...
      this.health += 300; // increase current health by heal amount
    } else {
      // otherwise...
      this.health = this.maxHealth; // set current health equal to the value of maxHealth
    }
    // *** updateMessage() with ...
  }
  ////// When he's not clambering across shadowy rooftops, Black Noir also happens to be concert-level pianist. Damage++ to a single member of The Boys
  ///////////////////////////////////////////////////////////////////////////////////////
  silentAssassin(goodGuy) {
    goodGuy.health -= 200;
    // *** updateMessage() with ...
  }
}

///////////////////////////////////////////////////////////////////////////////////////
////// Create a class for Lamplighter. He just wants to make his dad proud...
///////////////////////////////////////////////////////////////////////////////////////
class Lamplighter {
  // Initialize constructor
  constructor() {
    this.name = "Lamplighter"; // Character Name
    this.health = 800; // Current-Health Value
    this.maxHealth = 800; // Maximum-Health Value
  }

  //////////////////////////////////////////////////
  //////                                      //////
  //////    -----SUPPLEMENTAL METHODS-----    //////
  //////                                      //////
  //////////////////////////////////////////////////

  // isDead()
  // • At the end of each attack from The Boys, we will use this isDead() method to check to see if the current Supe is still alive.
  ////// Dead ==> return true
  ////// Alive ==> return false
  ///////////////////////////////////////////////////////////////////////////////////////
  isDead() {
    // If current health < 1...
    if (this.health < 1) {
      this.health = 0; // set current health equal to 0
      return this.health < 1; // then, return true
    } else {
      return this.health < 1; // otherwise, return false
    }
  }

  // updateStats()
  // • At the end of every round and enemy attack, this updateStats() method will push stat updates for current opponent's Health Points and Stamina Points
  ///////////////////////////////////////////////////////////////////////////////////////
  updateStats() {
    // update current HP and SP in the DOM
    opponentStats.innerHTML = `<h2>${opponent.name.toUpperCase()} 
    <br />
    <br />
    <span>HP ${this.health} / ${this.maxHealth}</span></h2>`;
  }

  //////////////////////////////////////////////////
  //////                                      //////
  //////           -----ATTACKS-----          //////
  //////                                      //////
  //////////////////////////////////////////////////

  ////// Lamplighter uses his ability to control fire with his mind to create blasts
  ////// strong enough to melt holes in steel plates. Damage++ to a single member of The Boys
  ///////////////////////////////////////////////////////////////////////////////////////
  pyrokinesis(goodGuy) {
    goodGuy.health -= 125;
    // *** updateMessage() with ...
  }

  ////// Ironically, one of the only things Lamplighter is weak to is flames... Damage+++ to a single member of The Boys
  ///////////////////////////////////////////////////////////////////////////////////////
  burnedAlive(goodGuy) {
    goodGuy.health -= 250;
    // *** updateMessage() with ...
  }

  ////// Like Starlight, Lamplighter has no power if he doesn't have a "source" to draw from...
  ////// Thankfully for him, his staff provides limitless flame. Damage++ to all members of The Boys
  ///////////////////////////////////////////////////////////////////////////////////////
  fireStorm(goodGuys) {
    // utilize our functions that parse our validTargets and then select all living members
    // Damage + to all
    // *** updateMessage() with ...
  }
}

///////////////////////////////////////////////////////////////////////////////////////
////// Create a class for Homelander, Vought's prized-possession.
////// "You see, companies, they come and go. But talent... talent is forever."
///////////////////////////////////////////////////////////////////////////////////////
class Homelander {
  // Initialize constructor
  constructor() {
    this.name = "Homelander"; // Character Name
    this.health = 2000; // Current-Health Value
    this.maxHealth = 2000; // Maximum-Health Value
  }

  //////////////////////////////////////////////////
  //////                                      //////
  //////    -----SUPPLEMENTAL METHODS-----    //////
  //////                                      //////
  //////////////////////////////////////////////////

  // isDead()
  // • At the end of each attack from The Boys, we will use this isDead() method to check to see if the current Supe is still alive.
  ////// Dead ==> return true
  ////// Alive ==> return false
  ///////////////////////////////////////////////////////////////////////////////////////
  isDead() {
    // If current health < 1...
    if (this.health < 1) {
      this.health = 0; // set current health equal to 0
      return this.health < 1; // then, return true
    } else {
      return this.health < 1; // otherwise, return false
    }
  }

  // updateStats()
  // • At the end of every round and enemy attack, this updateStats() method will push stat updates for current opponent's Health Points and Stamina Points
  ///////////////////////////////////////////////////////////////////////////////////////
  updateStats() {
    // update current HP and SP in the DOM
    opponentStats.innerHTML = `<h2>${opponent.name.toUpperCase()} 
    <br />
    <br />
    <span>HP ${this.health} / ${this.maxHealth}</span></h2>`;
  }

  //////////////////////////////////////////////////
  //////                                      //////
  //////           -----ATTACKS-----          //////
  //////                                      //////
  //////////////////////////////////////////////////

  ////// Raised in a lab, Homelander was bred to be a weapon. Unfortunately, this means he doesn't
  ////// know how to process his emotions in a healthy way. When he get's angry, he acts out. Damage++
  ///////////////////////////////////////////////////////////////////////////////////////
  bruteForce(goodGuy) {
    goodGuy.health -= 250;
    // *** updateMessage() with ...
  }

  ////// Is he really the most powerful being ever? Is he a god?
  ////// How does his hair always stay so perfect? Heal+++
  ///////////////////////////////////////////////////////////////////////////////////////
  invulnerability() {
    //to keep from over-healing...
    if (this.health < this.maxHealth - 500) {
      // if current health is less than maxHealth minus heal amount...
      this.health += 500; // increase current health by heal amount
    } else {
      // otherwise...
      this.health = this.maxHealth; // set current health equal to the value of maxHealth
    }
    // *** updateMessage() with ...
  }

  ////// "Wasn't I chosen to save you? It is not my God-given purpose to protect the
  ////// United States of America ? Psalm 58: 10: 'The righteous shall rejoice when he
  ////// sees the vengeance; He shall wash his feet in the blood of the wicked'!"
  ////// Damage++++
  ///////////////////////////////////////////////////////////////////////////////////////
  heatVision(goodGuy) {
    goodGuy.health -= 750;
    // *** updateMessage() with ...
  }
}

///////////////////////////////////////////////////////////////////////////////////////
////// Declarations for our Supes
///////////////////////////////////////////////////////////////////////////////////////
const translucent = new Translucent(); // Create Translucent object
const theDeep = new TheDeep(); // Create The Deep object
const aTrain = new ATrain(); // Create A-Train object
const starlight = new Starlight(); // Create Starlight object
const blackNoir = new BlackNoir(); // Create Black Noir object
const lamplighter = new Lamplighter(); // Create Lamplighter object
const homelander = new Homelander(); // Create Homelander object

// * note  THIS LIVES HERE BECAUSE I'M PLAYING WITH ITS SCOPING
// *** hardcoding opponent for now... will later use a switch (I think..) to change opponent dependent on what level we're on
let opponent = translucent;

// console.log(translucent);
// console.log(theDeep);
// console.log(aTrain);
// console.log(starlight);
// console.log(blackNoir);
// console.log(lamplighter);
// console.log(homelander);

/*
*** EVENTUALLY UTILIZE THIS TO SELECT opponent 
(ie, currentOpponent) from our list/array of Supes

//Array that will house all of our opponents, the Supes
let theSupes = [];

// Push each member of The Boys into the array
theSupes.push(translucent);
theSupes.push(theDeep);
theSupes.push(aTrain);
theSupes.push(starlight);
theSupes.push(blackNoir);
theSupes.push(lamplighter);
theSupes.push(homelander);

let opponentIndex = 0; // Index counter - allows iteration and easier manipulation of the Supes
let opponent = theSupes[opponentIndex]; // Currently selected opponent from theSupes array
*/

// =======================================================================================
// =======================================================================================

// =======================================================================================
// =======================================================================================
//
//                                    GAME LOGIC
//
// =======================================================================================
// =======================================================================================

// startGame()
// NEED IT TO...
// • update everyone's stats in the DOM
// • start our battle
///////////////////////////////////////////////////////////////////////////////////////
const startGame = () => {
  updateAllStats();
  initiateBattlePhase();
};
// END startGame()

// updateAllStats()
// • Compiles all of our individual updateStats methods into one consolidated call
///////////////////////////////////////////////////////////////////////////////////////
const updateAllStats = () => {
  opponent.updateStats();
  mothersMilk.updateStats();
  butcher.updateStats();
  hughie.updateStats();
  frenchie.updateStats();
};
// END updateAllStats

// areWeDead()
// • Utilizes each member of The Boy's isDead() method in order
// to determine whether if entire team is currently dead or not (will serve as our "checkLoss")
////// Dead ==> return true
////// Alive ==> return false
///////////////////////////////////////////////////////////////////////////////////////
const areWeDead = () => {
  if (
    // if everyone is dead...
    mothersMilk.isDead() === true && // if M.M. is dead...
    butcher.isDead() === true && // AND Butcher is dead...
    hughie.isDead() === true && // AND Hughie is dead...
    frenchie.isDead() === true // AND Frenchie is dead, then...
  ) {
    return true; // then return true
  } else {
    // if anyone is still alive...
    return false; // then return false
  }
};
// END areWeDead()

// areTheyDead()
// • Utilize each Supe's isDead() method in order to determine whether
// all enemies are currently dead or not (will serve as our "checkWin")
//// Dead ==> return true
//// Alive ==> return false
/////////////////////////////////////////////////////////////////////////////////////
const areTheyDead = () => {
  // *** HARDCODING the first boss until after MVP
  // *** eventually refactor to account for multiple enemies
  if (translucent.health < 1) {
    return true;
  } else {
    return false;
  }
};
// END areTheyDead

// checkIfHit()
// • Determines if our currentlySelected member of The Boys is able to successfully complete their action or not.
///////////////////////////////////////////////////////////////////////////////////////
const checkIfHit = (ally) => {
  if (Math.random() < ally.accuracy) {
    // if random value between 0 and limit 1 is less than our ally's accuracy level...
    return true; // then return true
  } else {
    // otherwise...
    return false; // return false
  }
};
// END checkIfHit()

// getLevel()
// • Determines which opponent we are facing dependent on what 'level' we are on. We will use
// the level to set our case in our switch statement — each level correlates to a specific opponent.
//////  Vought Tower  ==>  | Level 1 = Translucent |    ==>    | Level 2 = The Deep |     ==>    | Level 3 = A-Train |     ==>    | Level 4 = Starlight |     ==>    | Level 5 = Black Noir |    ==>    | Level 6 = Lamplighter |    ==>    | Level 7 = Homelander |
///////////////////////////////////////////////////////////////////////////////////////
/*
  Taking a step back to focus on the MVP rather than 
  my loftier goals. Get MVP working and circle back 
  to focus on building the rest of the levels and 
  other bonus content

let level = 1;

const getLevel = (level) => {
  let opponent;
  switch (level) {
    case 1:
      opponent = translucent;
      break;
    case 2:
      opponent = theDeep;
      break;
    case 3:
      opponent = aTrain;
      break;
    case 4:
      opponent = starlight;
      break;
    case 5:
      opponent = blackNoir;
      break;
    case 6:
      opponent = lamplighter;
      break;
    case 7:
      opponent = homelander;
      break;
    default:
      opponent = translucent;
  }
};
// END getLevel()
*/

// nextCharacter()
// • Allows us to easily cycle through our theBoys array | start --> end --> start |
// via the playerIndex global variable.
///////////////////////////////////////////////////////////////////////////////////////
const nextCharacter = () => {
  if (playerIndex < theBoys.length) {
    // if playerIndex < the length of theBoys array... | * note: purposely set the comparison against the full length of the array so that we can use playerIndex of 4 to reference our enemy's turn to attack! Spicy!
    playerIndex++; // then increment playerIndex
    currentlySelected = theBoys[playerIndex]; // update currentlySelected
  } else {
    // if playerIndex > the length of theBoys array...
    playerIndex = 0; // then reset playerIndex back to zero
    currentlySelected = theBoys[playerIndex]; // update currenltySelected
  }
  // *** LATER... CREATE A FUNCTION that toggles class/css/visual
  // features I want the currentlySelected character to have...
  // ...INCLUDE THAT FUNCTION HERE <===
};
// END nextCharacter()

// initiateEnemyPhase()
// • Launches the opponent's turn! After each living member of The Boys has gone, then start Enemy Phase:
// select and execute a random attack, update stats for all characters, proceed to the next character, and then initiateBattlePhase.
///////////////////////////////////////////////////////////////////////////////////////
const initiateEnemyPhase = () => {
  setTimeout(() => {
    // setTimeout for...
    opponent.selectAttack(); // then have current opponent select and execute an attack
    updateAllStats(); // then updateStats for opponent + each of The Boys
    nextCharacter(); // then cycle to the nextCharacter | * note: this instance of nextCharacter() should always return playerIndex to 0
    initiateBattlePhase(); // then initiate a fresh round of battle phases for The Boys
  }, 3000); // will execute in ==>  | 3 seconds |
};

// initiateBattlePhase()
// • Kicks-off core battle logic for Supe vs The Boys. Each character will get a turn at their
// own battle phase EACH turn. When playerIndex = 4, then opponent's turn. After they act, opponent resets playerIndex to 0 (back to M.M.)
///////////////////////////////////////////////////////////////////////////////////////
const initiateBattlePhase = () => {
  if (areTheyDead() === false) {
    // if areTheyDead() returns false... | ie ==> as long as at least one of our enemies is alive...
    if (areWeDead() === false) {
      // if areWeDead() returns false... | ie ==> as long as at least one of The Boys is alive...
      if (playerIndex === 0) {
        // if playerIndex is currently pointing at the value of | 0 |... | ie ==> if M.M. is the currentlySelected character...
        if (mothersMilk.isDead() === false) {
          // if M.M. is alive... | * note: we're starting our battle phase with M.M., because he sits at theBoys[0] and is thus the default value that currentlySelected points to via playerIndex
          console.log("It's M.M's turn..."); // then console.log
          setTimeout(() => {
            // then setTimeout for...
            updateMessage(`It's M.M.'s turn...`); // then updateMessage
          }, 3000); // will execute in ==>  | 3 seconds |

          // *** not sure what to put here for the moment... | choosing an action at this point (***SHOULD***) will move us to the next step of Battle Phase
        } else {
          // if M.M. is dead...
          nextCharacter(); // then cycle to the next character
          updateAllStats(); // then update everyone's stats in the DOM just in case
        }
      } else if (playerIndex === 1) {
        // if playerIndex is currently pointing at the value of | 1 |... | ie ==> if Butcher is the currentlySelected character...
        if (butcher.isDead() === false) {
          // if Butcher is alive...
          console.log("It's Butcher's turn..."); // then console.log
          setTimeout(() => {
            // then setTimeout for...
            updateMessage(`It's Butcher's turn...`); // then updateMessage
          }, 3000); // will execute in ==>  | 3 seconds |

          // *** not sure what to put here for the moment... | choosing an action at this point (***SHOULD***) will move us to the next step of Battle Phase
        } else {
          // if Butcher is dead...
          nextCharacter(); // then cycle to the next character
          updateAllStats(); // then update everyone's stats in the DOM just in case
        }
      } else if (playerIndex === 2) {
        // if playerIndex is currently pointing at the value of | 2 |... | ie ==> if Hughie is the currentlySelected character...
        if (hughie.isDead() === false) {
          //if Hughie is alive...
          console.log("It's Hughie's turn..."); // then console.log
          setTimeout(() => {
            // then setTimeout for...
            updateMessage(`It's Hughie's turn...`); // then updateMessage
          }, 3000); // will execute in ==>  | 3 seconds |

          // *** not sure what to put here for the moment... | choosing an action at this point (***SHOULD***) will move us to the next step of Battle Phase
        } else {
          // if Hughie is dead...
          nextCharacter(); // then cycle to the next character
          updateAllStats(); // then update everyone's stats in the DOM just in case
        }
      } else if (playerIndex === 3) {
        // if playerIndex is currently pointing at the value of | 3 |... | ie ==> if Frenchie is the currentlySelected character...
        if (frenchie.isDead() === false) {
          // if Frenchie is alive...
          console.log("It's Frenchie's turn..."); // then console.log
          setTimeout(() => {
            // then setTimeout for...
            updateMessage(`It's Frenchie's turn...`); // then updateMessage
          }, 3000); // will execute in ==>  | 3 seconds |

          // *** not sure what to put here for the moment... | choosing an action at this point (***SHOULD***) will move us to the next step of Battle Phase
        } else {
          // if Frenchie is dead...
          nextCharacter(); // then cycle to the next character
          updateAllStats(); // then update everyone's stats in the DOM just in case
        }
      } else if (playerIndex === 4) {
        // if player index is currently pointing at the value of | 4 |...
        initiateEnemyPhase(); // then initiate Enemy Phase
      }
    } else {
      // if areWeDead returns true... | ie, if every member of The Boys is dead...
      //
      //
      // BATTLE LOSS CONDITION RIGHT HERE... SO... execute functions below accordingly
      // then...
      // endBattle()
      // nextLevel()
      // getNextCutscene()
      // ...something like that...
    }
  } else {
    // if areTheyDead() returns true... | ie, if all enemies are dead...
    //
    // BATTLE WIN CONDITION RIGHT HERE... SO... execute functions below accordingly
    // BATTLE WIN MODAL POP UP
    // ==> GIVE MODAL CONTINUE + QUIT (?) BUTTONS
    // ==> Upon continue...
    // ==> ==> ==> ***  level++ | set new level for getLevel to reference for switch...?
    // ==> ==> ==>
    // ==> ==> ==>
    //
    //
    //
  }
};

// END initiateBattlePhase()

// battleWin()
// • Action will be called in a situation where the battle has ended positively for The Boys.
// Function will open a modal with options for moving on to the next level
///////////////////////////////////////////////////////////////////////////////////////
const battleWin = () => {
  opponent.health = 0;
  // BATTLE WIN MODAL POP UP
};
// END battleWin()

// battleLoss()
// • Action will be called in a situation where the battle has ended negatively for The Boys.
///////////////////////////////////////////////////////////////////////////////////////
const battleLoss = () => {
  // BATTLE LOSS MODAL POP UP
};
// END battleLoss()

//////////////////////////////////////////////////
//////                                      //////
//////     --ACTION BUTTON DELEGATION--     //////
//////                                      //////
//////////////////////////////////////////////////

/*
*** currently trying to set up these action1,2,3 variables so that they I can dynamically control
choose among each character's 3 actions, using only 3 buttons... ie, when currentlySelected = MM, action 1 = tacticalStrike,
action 2 = field medic, and action 3 = battlefield triage | then, when currentlySelected = Butcher, I need action 1 to = giftedMarksman,
action 2 to = brutalize, and so
*/

/*
*** ACTION DELEGATION 
• use the below expressions to 
assign functionality to our Action 1, Action 2,
and Action 3 buttons respectively.
We want each button to correspond to the 
currentlySelected member's moveset.
*/

// // switch / case...
// switch (theBoys[playerIndex]) {
//   // if currently selected...
//   case mothersMilk: {
//     // is mothersMilk...

//     // addEvent (actionButton1, 'click', * ATTACK FUNCTION *)

//     actionButton1.removeEventListener("click", frenchie.gunRunner); // then remove any pre-exiting eventListeners from actionButton1  | * should * always be frenchie's previous addEvent
//     actionButton1.addEventListener("click", mothersMilk.tacticalStrike); // then add MM's actionButton1 function ==> tacticalStrike()

//     actionButton2.removeEventListener("click", frenchie.improvisedExplosives); // then remove any pre-exiting eventListeners from actionButton2  | * should * always be frenchie's previous addEvent
//     actionButton2.addEventListener("click", mothersMilk.fieldMedic); // then add MM's actionButton2 function ==> fieldMedic()

//     actionButton3.removeEventListener("click", frenchie.spontaneousInventor); // then remove any pre-existing eventListeners from actionButton3  | * should * always be frenchie's previous addEvent
//     actionButton3.addEventListener("click", mothersMilk.battlefieldTriage); // then add MM's actionButton3 function ==> battlefieldTriage()
//   }
//   // if currently selected...
//   case butcher: {
//     // is butcher...
//     actionButton1.removeEventListener("click", mothersMilk.tacticalStrike); // then remove any pre-exiting eventListeners from actionButton1  | * should * always be mothersMilk's previous addEvent
//     actionButton1.addEventListener("click", butcher.giftedMarksman); // then add Butcher's actionButton1 function ==> giftedMarksman()

//     actionButton2.removeEventListener("click", mothersMilk.fieldMedic); // then remove any pre-exiting eventListeners from actionButton2   | * should * always be mothersMilk's previous addEvent
//     actionButton2.addEventListener("click", butcher.brutalize); // then add Butcher's actionButton2 function ==> brutalize()

//     actionButton3.removeEventListener("click", mothersMilk.battlefieldTriage); // then remove any pre-existing eventListeners from actionButton3   | * should * always be mothersMilk's previous addEvent
//     actionButton3.addEventListener("click", butcher.diabolicalMate); // then add Butcher's actionButton3 function ==> diabolicalMate()
//   }
//   // if currently selected...
//   case hughie: {
//     // is hughie...
//     actionButton1.removeEventListener("click", butcher.giftedMarksman); // then remove any pre-exiting eventListeners from actionButton1  | * should * always be butcher's previous addEvent
//     actionButton1.addEventListener("click", hughie.tacticalNous); // then add Hughie's actionButton1 function ==> tacticalNous()

//     actionButton2.removeEventListener("click", butcher.brutalize); // then remove any pre-exiting eventListeners from actionButton2  | * should * always be butcher's previous addEvent
//     actionButton2.addEventListener("click", hughie.fleetwoodMac); // then add Hughie's actionButton2 function ==> fleetwoodMac()

//     actionButton3.removeEventListener("click", butcher.diabolicalMate); // then remove any pre-existing eventListeners from actionButton3  | * should * always be butcher's previous addEvent
//     actionButton3.addEventListener("click", hughie.letsTalk); // then add Hughie's actionButton3 function ==> letsTalk()
//   }
//   // if currently selected...
//   case frenchie: {
//     // is frenchie...
//     actionButton1.removeEventListener("click", hughie.tacticalNous); // then remove any pre-exiting eventListeners from actionButton1  | * should * always be hughie's previous addEvent
//     actionButton1.addEventListener("click", frenchie.gunRunner); // then add Frenchie's actionButton1 function ==> gunRunner()

//     actionButton2.removeEventListener("click", hughie.fleetwoodMac); // then remove any pre-exiting eventListeners from actionButton2  | * should * always be hughie's previous addEvent
//     actionButton2.addEventListener("click", frenchie.improvisedExplosives); // then add Frenchie's actionButton2 function ==> improvisedExplosives()

//     actionButton3.removeEventListener("click", hughie.letsTalk); // then remove any pre-existing eventListeners from actionButton3  | * should * always be hughie's previous addEvent
//     actionButton3.addEventListener("click", frenchie.spontaneousInventor); // then add Frenchie's actionButton3 function ==> spontaneousInventor()
//   }
// }

// if / else...
// ** CURRENT ISSUE WITH THE BELOW IS THAT IT'S TRYING TO FIRE OFF THE FIRST COMMAND OF MM'S (THE currentlySelected) AS SOON AS THE PAGE LOADS...

// let action1;
// let action2;
// let action3;

// if (currentlySelected === theBoys[0]) {
//   action1 = mothersMilk.tacticalStrike;
//   action2 = mothersMilk.fieldMedic;
//   action3 = mothersMilk.battlefieldTriage;
// } else if (currentlySelected === theBoys[1]) {
//   action1 = butcher.giftedMarksman;
//   action2 = butcher.brutalize;
//   action3 = butcher.diabolicalMate;
// } else if (currentlySelected === theBoys[2]) {
//   action1 = hughie.tacticalNous;
//   action2 = hughie.fleetwoodMac;
//   action3 = hughie.letsTalk;
// } else if (currentlySelected === theBoys[3]) {
//   action1 = frenchie.gunRunner;
//   action2 = frenchie.improvisedExplosives;
//   action3 = frenchie.spontaneousInventor;
// } else {
//   action1 = null;
//   action2 = null;
//   action3 = null;
// }

// END action delegation...

//////////////////////////////////////////////////
//////                                      //////
//////         -----FUN THINGS-----         //////
//////                                      //////
//////////////////////////////////////////////////

// CONVERSATION COUNTERS – As Hughie uses his tacticalNous() skill, he can unlock extra... capabilities... for certain enemies. The counters for these trackers/toggles are housed here
///////////////////////////////////////////////////////////////////////////////////////
let translucentConvoCounter = false; // global counter/tracker that affects conversation-tree with Hughie + Frenchie's inventions...
let blackNoirConvoCounter = false; // global counter/tracker that affects conversation-tree with Hughie + Frenchie's inventions...
let lamplighterConvoCounter = false; // global counter/tracker that affects conversation-tree with Hughie + Frenchie's inventions...
let homelanderConvoCount = 0; // global counter that affects conversation-tree with Hughie + Frenchie's inventions...

// =======================================================================================

//////////////////////////////////////////////////
//////                                      //////
//////        -----BATTLE LOGIC-----        //////===============================================================
//////                                      //////
//////////////////////////////////////////////////
// PSEUDO:
////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// // Battle Phase
// //
// initiateBattlePhase
// ==> ==> check to see if M.M. is still alive
// ==> ==> ==> if alive, set M.M. as our selectedCharacter
// ==> M.M. acts...
// ==> ==> check to see if enemy is still alive
// ==> ==> check to see if Butcher is still alive
// ==> ==> ==> if alive, set Butcher as our selectedCharacter
// ==> Butcher acts...
// ==> ==> check to see if enemy is still alive
// ==> ==> check to see if Hughie is still alive
// ==> ==> ==> if alive, set Hughie as our selectedCharacter
// ==> Hughie acts...
// ==> ==> check to see if enemy is still alive
// ==> ==> check to see if Frenchie is still alive
// ==> ==> ==> if alive, set Frenchie as our selectedCharacter
// ==> Frenchie acts...
// ==> ==> check to see if enemy is still alive
// ==> Enemy acts... (ENEMY PHASE??)
// Battle is either over... - OR - Repeat...
// //
// //////////////////////////////////////////////////////////////////////////////////////////////////////////////
// // Enemy Phase
// //
// initiateEnemyPhase
// ==> opponent.selectAttack
// ==> ==> Select attack
// ==> ==> ==> Target Validation (ie, not dead)
// ==> ==> ==> ==> Account for accuracy...
// ==> ==> ==> ==> ==> Execute attack
// ==> Update everyone's stats in the DOM
// ==> Cycle to the next character
// ==> initiateBattlePhase??
// //
// ////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// // *** Incorporating Multiple Levels / Bosses...
// //
//
//
//
// ////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// =======================================================================================
// =======================================================================================
//
//                                  EVENT LISTENERS
//
// =======================================================================================
// =======================================================================================

//////////////////////////////////////////////////
//////                                      //////
//////           -----BUTTONS-----          //////
//////                                      //////
//////////////////////////////////////////////////

// Action Buttons
///////////////////////////////////////////////////////////////////////////////////////
// actionButton1.addEventListener("click", action1);
// actionButton2.addEventListener("click", action2);
// actionButton3.addEventListener("click", action3);

actionButton1.addEventListener("click", mothersMilk.tacticalStrike);
actionButton2.addEventListener("click", mothersMilk.fieldMedic);
actionButton3.addEventListener("click", mothersMilk.battlefieldTriage);

// Heal Buttons
///////////////////////////////////////////////////////////////////////////////////////
healButton1.addEventListener("click", () => {
  healTarget = theBoys[0];
});
healButton2.addEventListener("click", () => {
  healTarget = theBoys[1];
});
healButton3.addEventListener("click", () => {
  healTarget = theBoys[2];
});
healButton4.addEventListener("click", () => {
  healTarget = theBoys[3];
});

//////////////////////////////////////////////////
//////                                      //////
//////           -----MODALS-----           //////
//////                                      //////
//////////////////////////////////////////////////

// Get Started button found on Welcome Modal
///////////////////////////////////////////////////////////////////////////////////////
getStarted.addEventListener("click", () => {
  startGame();
  toggleModal();
});

// Add clearMessage() to Message Modal
///////////////////////////////////////////////////////////////////////////////////////
message.addEventListener("click", clearMessage);

//////////////////////////////////////////////////
//////                                      //////
//////           -----ON-HOVERS-----        //////
//////                                      //////
//////////////////////////////////////////////////

// *** include on-hover listener for each action button that will pop-out a modal housing information on the particular attack
