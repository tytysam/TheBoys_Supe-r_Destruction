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
// *** queueOfAttacks could also be looked at from a different angle... we could create a function that... ugh. lost it.
//

// =======================================================================================

// ====================
// CACHED DOM NODES
// ====================

// =======================================================================================

// ====================
// GLOBAL VARIABLES
// ====================

let playerIndex = 0; // Index counter - allows iteration and easier manipulation of members of The Boys
let currentlySelected = theBoys[playerIndex]; // Currently selected member of The Boys

let healIndex = 0; // Index counter - allows specific targeting of heal commands
const healTarget = theBoys[healIndex]; // Currently selected heal target, selected from theBoys array

const staminaRegenAmount = 15; // this variable controls how much stamina each of The Boys regenerate at the end of every round

let homelanderConvoCount = 0; // global counter that affects conversation-tree with Hughie

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

///////////////////////////////////////////////////////////////////////////////////////
// Humans class is the basis of our members of The Boys
// Contains Methods: regenerateStamina(), isDead(), ...
///////////////////////////////////////////////////////////////////////////////////////
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
    this.staminaRegenAmount = staminaRegenAmount; // Stamina will regenerate for each character by <--THIS amount at the end of each turn
    this.accuracy = accuracy; // Each character has a % chance of hitting each shot. Higher^ accuracy value === higher chance of successfully landing your attack/heal/action
  }

  /*
  regenerateStamina()
  • At the end of every round, this regenerateStamina() method will cause 
  The Boys to each regenerate a specified amount of stamina.
  */
  regenerateStamina() {
    //* note: non-ES6 method-declaration (ie, "Traditional Style") would look like ==> Humans.prototype.regenerateStamina = function() {...} | in other words, adding methods to the prototype makes the method available to the class
    if (this.stamina < this.maxStamina - this.staminaRegenAmount) {
      // if current stamina < maxStamina minus staminaRegenerationAmount...
      this.stamina += this.staminaRegenAmount; // then increase current stamina by staminaRegenerationAmount
    } else {
      // if current stamina > maxStamina minus staminaRegenerationAmount...
      this.stamina = this.maxStamina; // then set current stamina equal to the value of maxStamina
    }
  }

  /*
  isDead()
  • At the end of every enemy attack, we will use this isDead()
  method as part of areWeDead(), used to check to 
  see which of The Boys are currently alive, and which 
  are currently dead.
  */
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
  /*
   *** Thinking about including a saySomething() method that calls updateMessage() and does something else... May be unnecessary lol.
   */
}

///////////////////////////////////////////////////////////////////////////////////////
////// • Create Class for M.M. (Mother's Milk)
////// A father, juvenile boys counselor, and former USMC medic, MM has *range*.
////// Use this versatile character to deal out damage, patch up your allies, and maybe even save a life while you're at it…
///////////////////////////////////////////////////////////////////////////////////////
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

  ////// TACTICAL STRIKE – Basic attack on enemy. Damage+, Stamina-
  ///////////////////////////////////////////////////////////////////////////////////////
  tacticalStrike(enemy) {
    // * note: mapping super to non-ES6 ==> MM.prototype.tacticalStrike = function() { return `${Humans.prototype."some-function".call(this)}`;} | in other words, the keyword super can also be used as an instance of our parent class to call Humans class-specific details | <== the super instance is ~basically ParentClassName.prototype.methodName.call(this,...)

    let staminaCost = 10; // bind temporary variable of staminaCost to this attack
    let attackDamage = 50; // bind temporary variable of attackDamage to this attack

    if (this.stamina >= staminaCost) {
      // if current stamina >= the required stamina for this attack...
      if (checkIfHit(this) === true) {
        // if our attack successfully hits the enemy...
        this.stamina -= staminaCost; // then decrease our stamina by stamina cost
        enemy.health -= attackDamage; // then decrease the target's health by attack damage
        // *** updateMessage() with `M.M. landed a tactical strike on ${enemy.name} for ${attackDamage} damage!`
        // *** INCLUDE A FUNCTION CALL THAT PULLS US INTO THE NEXT PHASE OF BATTLE...
        // *** INCLUDE ==> our regenerateStamina() either here or within this^ call???
      } else {
        // if our attack missed the enemy...
        // *** updateMessage() with "M.M.'s attack missed!"
        // *** INCLUDE A FUNCTION CALL THAT PULLS US INTO THE NEXT PHASE OF BATTLE...
        // *** INCLUDE ==> our regenerateStamina() either here or within this^ call???
      }
    } else {
      // if our current stamina < the required stamina for this attack...
      // *** updateMessage() with `You don't have enough stamina! Try choosing a different action.`
    }
  }

  ////// FIELD MEDIC – Basic heal command. Targets one individual, heals moderate amount. Heal+, Stamina-
  ///////////////////////////////////////////////////////////////////////////////////////
  fieldMedic(healTarget) {
    // Passing healTarget, a global variable, as the argument | healTarget references one of the boys in theBoys array

    let staminaCost = 20; // bind temporary variable of staminaCost to this skill... * note: in another life, I would've used a class constructor to build these skills... then attached all of these properties directly to the skill object... one day...
    let healAmount = 100; // bind temporary variable of healAmount to this skill

    if (healTarget.isDead() === false) {
      // if the character we're trying to target is still alive...
      if (this.stamina >= staminaCost) {
        // if current stamina >= the required stamina for this skill...
        if (checkIfHit(this) === true) {
          // if our heal is successful...
          this.stamina -= staminaCost; // then decrease our stamina by stamina cost
          if (healTarget.health < healTarget.maxHealth - healAmount) {
            // if target's current health < their maxHealth minus heal amount...
            healTarget.health += healAmount; // then increase ally's health by heal amount
            // *** updateMessage() with `M.M healed ${ally.name} for ${heal amount} HP!`
          } else {
            // if the target's current health > their maxHealth minus heal amount...
            healTarget.health = healTarget.maxHealth; // then set target's current health equal to the value of the target's maxHealth
            // *** updateMessage() with `M.M. fully restored ${ally.name}'s HP!`
          }
          // *** INCLUDE A FUNCTION CALL THAT PULLS US INTO THE NEXT PHASE OF BATTLE...
          // *** INCLUDE ==> our regenerateStamina() either here or within this^ call???
        } else {
          // if our heal "missed"...
          // *** updateMessage() with "M.M.'s heal attempt failed! Son of a ...!"
          // *** INCLUDE A FUNCTION CALL THAT PULLS US INTO THE NEXT PHASE OF BATTLE...
          // *** INCLUDE ==> our regenerateStamina() either here or within this^ call???
        }
      } else {
        // if current stamina < the required stamina for this skill...
        // *** updateMessage() with `You don't have enough stamina! Try choosing a different action.`
      }
    } else {
      // if the character we're trying to target is dead...
      // *** updateMessage() with `Unfortunately, ${healTarget.name} is already dead! Try changing your heal target, or choosing a different action.`
    }
  }

  ////// *Special*: BATTLEFIELD TRIAGE – FOR A COST... MM can use his skills as a combat medic to revive one teammate. If @ 0 HP, revive (like a phoenix down, with ~some health). Heal+++, Stamina---
  ///////////////////////////////////////////////////////////////////////////////////////
  battlefieldTriage(healTarget) {
    // Passing healTarget, a global variable, as the argument | healTarget references one of the boys in theBoys array

    let staminaCost = 150; // bind temporary variable of staminaCost to this skill
    let healAmount = 50; // bind temporary variable of healAmount to this skill

    if (healTarget.isDead() === true) {
      // if the character we're trying to target is dead...
      if (this.stamina >= staminaCost) {
        // if current stamina >= the required stamina for the skill...
        if (checkIfHit(this) === true) {
          // if our revive is successful...
          this.stamina -= staminaCost; // then decrease current stamina by stamina cost
          healTarget.health = healAmount; // then set target's current health equal to the value of healAmount (ie, revive them!)
          // *** updateMessage() with `M.M. revived ${}! They now have ${healAmount} health.`
          // *** INCLUDE A FUNCTION CALL THAT PULLS US INTO THE NEXT PHASE OF BATTLE...
          // *** INCLUDE ==> our regenerateStamina() either here or within this^ call???
        } else {
          // if our revive "missed"...
          // *** updateMessage() with "M.M.'s revive attempt failed! What a waste!"
          // *** INCLUDE A FUNCTION CALL THAT PULLS US INTO THE NEXT PHASE OF BATTLE...
          // *** INCLUDE ==> our regenerateStamina() either here or within this^ call???
        }
      } else {
        // if current stamina < the required stamina for the skill...
        // *** updateMessage() with `You don't have enough stamina! Try choosing a different action.`
      }
    } else {
      // if the character we're trying to target is actually still alive...
      // *** updateMessage() with `Bloody brilliant – ${ally.name} doesn't need revived! Try choosing another teammate or command.`
    }
  }
}

///////////////////////////////////////////////////////////////////////////////////////
////// Create class for William "Billy" Butcher
////// Use Butcher’s cunning, strength, and sadistic nature to take down Supes.
////// Butcher packs a powerful, varied arsenal: manage his stamina, and he can bring down almost any Supe.
///////////////////////////////////////////////////////////////////////////////////////
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

  ////// GIFTED MARKSMAN – Basic attack. Butcher should be our strongest character so, Damage+ means a little extra for him... Damage+, Stamina-
  ///////////////////////////////////////////////////////////////////////////////////////
  giftedMarksman(enemy) {
    let staminaCost = 10; // bind temporary variable of staminaCost to this attack
    let attackDamage = 70; // bind temporary variable fo attackDamage to this attack

    if (this.stamina >= staminaCost) {
      // if current stamina >= the required stamina for the attack...
      if (checkIfHit() === true) {
        // if our attack successfully hits the enemy...
        this.stamina -= staminaCost; // then decrease current stamina by stamina cost
        enemy.health -= attackDamage; // then decrease the target's health by attack damage
        // *** updateMessage() with `Butcher hit ${enemy.name} for ${attackDamage} damage!`
        // *** INCLUDE A FUNCTION CALL THAT PULLS US INTO THE NEXT PHASE OF BATTLE...
        // *** INCLUDE ==> our regenerateStamina() either here or within this^ call???
      } else {
        // if our attack missed the enemy...
        // *** updateMessage() with "Butcher's attack missed!"
        // *** INCLUDE A FUNCTION CALL THAT PULLS US INTO THE NEXT PHASE OF BATTLE...
        // *** INCLUDE ==> our regenerateStamina() either here or within this^ call???
      }
    } else {
      // if current stamina < the required stamina for the attack...
      // *** updateMessage() with `You don't have enough stamina! Try choosing a different action.`
    }
  }

  ////// BRUTALIZE – Medium attack. Mo' stamina mo' damage, baby. Damage++, Stamina--
  ///////////////////////////////////////////////////////////////////////////////////////
  brutalize(enemy) {
    let staminaCost = 25; // bind temporary variable of staminaCost to this attack
    let attackDamage = 135; // bind temporary variable of attackDamage to this attack

    if (this.stamina >= staminaCost) {
      // if current stamina is >= the required stamina for the attack...
      if (checkIfHit() === true) {
        // if our attack successfully hits the enemy...
        this.stamina -= staminaCost; // then decrease current stamina by stamina cost
        enemy.health -= attackDamage; // then decrease the target's health by attack damage
        // *** updateMessage() with `Butcher hit ${enemy.name} for ${attackDamage} damage!`
        // *** INCLUDE A FUNCTION CALL THAT PULLS US INTO THE NEXT PHASE OF BATTLE...
        // *** INCLUDE ==> our regenerateStamina() either here or within this^ call???
      } else {
        // if our attack missed the enemy...
        // *** updateMessage() with "Butcher's attack missed!"
        // *** INCLUDE A FUNCTION CALL THAT PULLS US INTO THE NEXT PHASE OF BATTLE...
        // *** INCLUDE ==> our regenerateStamina() either here or within this^ call???
      }
    } else {
      // if current stamina < the required stamina for the attack...
      // *** updateMessage() with `You don't have enough stamina! Try choosing a different action.`
    }
  }

  ////// *Special*: F*CKIN DIABOLICAL MATE – FOR A COST... Butcher can put his years in the British SAS to use eviscerating (*ouch*) his opponents. Damage+++, Stamina---
  ///////////////////////////////////////////////////////////////////////////////////////
  diabolicalMate(enemy) {
    let staminaCost = 60; // bind temporary variable staminaCost to this attack
    let attackDamage = 200; // bind temporary variable attackDamage to this attack

    if (this.stamina >= staminaCost) {
      // if current stamina >= the required stamina for the attack...
      if (checkIfHit() === true) {
        // if our attack successfully hits the enemy...
        this.stamina -= staminaCost; // then decrease current stamina by stamina cost
        enemy.health -= attackDamage; // then decrease the target's health by attack damage
        // *** updateMessage() with `F*CKIN' DIABOLICAL, MATE. Butcher hit ${enemy.name} for ${attackDamage} damage!`
        // *** INCLUDE A FUNCTION CALL THAT PULLS US INTO THE NEXT PHASE OF BATTLE...
        // *** INCLUDE ==> our regenerateStamina() either here or within this^ call???
      } else {
        // if our attack missed the enemy...
        // *** updateMessage() with "Bollocks, Butcher's attack missed!"
        // *** INCLUDE A FUNCTION CALL THAT PULLS US INTO THE NEXT PHASE OF BATTLE...
        // *** INCLUDE ==> our regenerateStamina() either here or within this^ call???
      }
    } else {
      // if current stamina < the required stamina for the attack...
      // *** updateMessage() with `You don't have enough stamina! Try choosing a different action.`
    }
  }
}

///////////////////////////////////////////////////////////////////////////////////////
////// Create a class for Hugh "Hughie" Campbell Jr. (see also ==> Petit Hughie, "Wee Hughie")
////// Hughie isn’t much of a fighter, but his skill and cunning in combat may surprise you…
////// Use his intelligence and healing abilities to support your team in battle.
///////////////////////////////////////////////////////////////////////////////////////
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

  ////// TACTICAL NOUS – Tactical skill that deals a small amount of damage AND reveals an enemy's weakness (if they have any!). Damage1/2+, Stamina--
  ///////////////////////////////////////////////////////////////////////////////////////
  tacticalNous(enemy) {
    let staminaCost = 20; // bind temporary variable staminaCost to this skill
    let attackDamage = 5; // bind temporary variable attackDamage to this skill

    if (this.stamina >= staminaCost) {
      // if current stamina is >= the required stamina for the skill...
      if (checkIfHit() === true) {
        // if our action succeeded...
        this.stamina -= staminaCost; // then decrease current stamina by stamina cost
        enemy.health -= attackDamage; // then decrease target's health by attack damage
        if (enemy.name === "Translucent") {
          // if target's name is Translucent...
          // *** updateMessage() with "He's like a turtle: hard exterior, but his insides are still soft... Get creative."
        } else if (enemy.name === "The Deep") {
          // if target's name is The Deep...
          // *** updateMessage() with "We're not even near the ocean — just shoot him!"
        } else if (enemy.name === "A-Train") {
          // if target's name is A-Train...
          // *** updateMessage() with "Compound-V is making him impossibly strong... but how much will his heart be able to take?"
        } else if (enemy.name === "Starlight") {
          // if target's name is Starlight...
          // *** updateMessage() with "Starlight seems to have a soft-spot for Hughie... Maybe we should let him lean into his emotional personality?"
        } else if (enemy.name === "Black Noir") {
          // if target's name is Black Noir...
          // *** updateMessage() with "Rumor has it that Black Noir has a peanut allergy... Just make sure you take his Epi-Pen."
        } else if (enemy.name === "Lamplighter") {
          // if target's name is Lamplighter...
          // *** updateMessage() with "Ironically, Lamplighter's biggest weakness is fire... Frenchie might have an idea or two..."
        } else if (enemy.name === "Homelander") {
          // if target's name is Homelander...
          if (homelanderConvoCount === 0) {
            // if homelanderConvoCount is equal to the value of 0...
            homelanderConvoCount++; // then iterate the counter
            // *** updateMessage() with "Does this guy even have any weaknesses? I mean, we DO know that he can't see through zinc. Who knows if that's helpful..."
          } else if (homelanderConvoCount === 1) {
            // if homelanderConvoCount is equal to the value of 1...
            homelanderConvoCount++; // then iterate the counter
            // *** updateMessage() with "Okay, this is promising... Butcher's CIA contact mentioned something to him about sonic-sensitivity? That's all we've got."
          } else if (homelanderConvoCount > 1) {
            // if homelanderConvoCount is > the value of 1...
            homelanderConvoCount++; // then iterate the counter | * note: we could probably omit this, but I kinda want to leave it there purely for the random easter eggs it could empower...
            // *** updateMessage() with "FRENCHIE'S GOT IT *THE* WEAPON. GO SEE WHAT HE'S INVENTED!!"
          }
        }
        // *** INCLUDE A FUNCTION CALL THAT PULLS US INTO THE NEXT PHASE OF BATTLE...
        // *** INCLUDE ==> our regenerateStamina() either here or within this^ call???
      } else {
        // if our action "missed"...
        // *** updateMessage() with "Missed? How in the hell did you miss?! Damnit Hughie..."
        // *** INCLUDE A FUNCTION CALL THAT PULLS US INTO THE NEXT PHASE OF BATTLE...
        // *** INCLUDE ==> our regenerateStamina() either here or within this^ call???
      }
    } else {
      // if current stamina < the required stamina for the skill...
      // *** updateMessage() with `You don't have enough stamina! Try choosing a different action.`
    }
  }

  ////// FLEETWOOD MAC – Hughie, White Mage and lover of smooth tunes. This move heals the entire team for a moderate amount. Heal++, Stamina--
  ///////////////////////////////////////////////////////////////////////////////////////
  fleetwoodMac() {
    let staminaCost = 20; // bind temporary variable staminaCost to this skill
    let healAmount = 50; // bind temporary variable healAmoutn to this skill

    if (this.stamina >= staminaCost) {
      // if current stamina >= the required stamina for the skill...
      if (checkIfHit() === true) {
        // if our action succeeded...
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
        // *** updateMessage() with "Now that is soul-soothing… the whole team feels revitalized!"
        // *** INCLUDE A FUNCTION CALL THAT PULLS US INTO THE NEXT PHASE OF BATTLE...
        // *** INCLUDE ==> our regenerateStamina() either here or within this^ call???
      } else {
        // if our action "missed"...
        // *** updateMessage() with "Missed? How in the hell did you miss?! Damnit Hughie..."
        // *** INCLUDE A FUNCTION CALL THAT PULLS US INTO THE NEXT PHASE OF BATTLE...
        // *** INCLUDE ==> our regenerateStamina() either here or within this^ call???
      }
    } else {
      // if current stamina < the required stamina for the skill...
      // *** updateMessage() with `You don't have enough stamina! Try choosing a different action.`
    }
  }

  ////// *Special*: LET'S TALK – FOR A COST... Mild-mannered and meek, Hughie believes anything can be worked through if you just talk about it. Let's see how it goes! Damage??, Stamina---
  ///////////////////////////////////////////////////////////////////////////////////////
  letsTalk(enemy) {
    let staminaCost = 50; // bind temporary variable staminaCost to this skill
    let attackDamage = 75; // bind temporary variable attackDamage to this skill | for this skill, attack damage = self-inflicted damage

    if (this.stamina >= staminaCost) {
      // if current stamina >= the required stamina for the skill...
      if (checkIfHit() === true) {
        // if our action succeeded...
        this.stamina -= staminaCost; // then decrease current stamina by stamina cost
        if (enemy.name === "Starlight") {
          // if target name is Starlight...
          // *** updateMessage() with "Missed? How in the hell did you miss?! Damnit Hughie..."
          // *** INCLUDE A FUNCTION CALL THAT PULLS US INTO THE NEXT PHASE OF BATTLE...
          // *** INCLUDE ==> our regenerateStamina() either here or within this^ call???
          // *** then battleEnd()
          // *** nextCutscene()
        } else {
          // if target name is anything other than Starlight...
          this.health -= attackDamage; // then decrease Hughie's current health by attack damage
          // *** updateMessage() with "Hughie, in what world was that going to work? C'mon mate..."
          // *** INCLUDE A FUNCTION CALL THAT PULLS US INTO THE NEXT PHASE OF BATTLE...
          // *** INCLUDE ==> our regenerateStamina() either here or within this^ call???
        }
      } else {
        // if our action "missed"...
        // *** updateMessage() with "Missed? How in the hell did you miss?! Damnit Hughie..."
        // *** INCLUDE A FUNCTION CALL THAT PULLS US INTO THE NEXT PHASE OF BATTLE...
        // *** INCLUDE ==> our regenerateStamina() either here or within this^ call???
      }
    } else {
      // if current stamina < the required stamina for the skill...
      // *** updateMessage() with `You don't have enough stamina! Try choosing a different action.`
    }
  }
}

////// Create a class for Frenchie (real name Serge.. see ==> The Frenchman)
////// Equally adept with a blade as he is with a beaker, Frenchie likes playing mad-scientist, often
////// improvising his own weapons — you never know what he’ll come up with next.
///////////////////////////////////////////////////////////////////////////////////////

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
  ////// GUN RUNNER – Buy, sell, build, shoot – c'est vrai: Frenchie knows his way around guns. Basic attack. Damage+, Stamina-
  ///////////////////////////////////////////////////////////////////////////////////////

  gunRunner(enemy) {
    this.stamina -= 10;
    enemy.health -= 55;
    // *** updateMessage() with ...
  }
  ////// IMPROVISED EXPLOSIVES – Chemical engineering in the modern world. Damage++, Stamina--
  ///////////////////////////////////////////////////////////////////////////////////////

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
  ////// *Special*: SPONTANEOUS INVENTOR – FOR A COST... Frenchie was originally recruited to The Boys thanks to his history of developing impressive gadgets and creative weapons. Notable creations include: • a sniper-rifle round coated in the same carbon metamaterial as Translucent's skin (status: failure) • a xanax-bomb meant to counter the rage-induced powers of the Supe, Behemoth (status: success) • **SPOILERS** inspired by a turtle and its shell, Frenchie builds a plastic bomb meant for Translucent's... insides. (status: null) Damage???, Stamina---
  ///////////////////////////////////////////////////////////////////////////////////////

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

//Array that will house our team, The Boys
let theBoys = [];

// Push each member of The Boys into the array
theBoys.push(mothersMilk);
theBoys.push(butcher);
theBoys.push(hughie);
theBoys.push(frenchie);

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
  // *** Struggling with the targeting a bit... Do I need to just create a super robust
  // function that houses each of these individual components since I'm running into scoping issues?
  // * supeBattlePhase() ==> {check to make sure The Boys aren't all dead already
  // ==> create an array of valid members of The Boys
  // ==> iterate through all members of The Boys to see which are alive
  // ==> add all living members of The Boys to a list of valid targets ( if not alive, log a message that member is dead)
  // ==> have some sort of function that selects a random target from that list of valid targets
  // ==> GIVE EACH SUPE their own selectAttack() that incorporates their unique hit % and unique attacks
  // CALL supe's selectAttack}
  getValidTargets() {
    let validTargets = [];
    for (let member of theBoys) {
      if (member.isDead === false) {
        validTargets.push(member);
      }
    }
  }
  // *** Create a targeting function (  getValidTargets()?  ) that will create a temporary array of The Boys WHO ARE ALIVE.
  // Create an array of valid player-controlled targets ( validTargets = [];)
  // Iterate through all player-controlled units to see which are alive
  // Add all living player-controlled units to a list of valid targets

  // *** Utilize the above function in another function (  chooseRandomTarget()?   ) that will
  // choose a valid, living character that we pushed into the validTargets array by selecting a random index
  // *** Utilize the above function in another function (  chooseAllTarget()?    ) that will
  // select all of the valid, living characters that we pushed into the validTargets array

  // *** Will we need an executeAttack() method as well to then execute our attack on the
  // target selected via one of the above methods...?
}

////// Create a class for Translucent, The Seven's invisible supermember.
////// Bulletproof and pervy, how do The Boys stand a chance?
class Translucent extends Supes {
  // Initialize constructor using super as a "function" to access parent prototype
  constructor(name, health, maxHealth) {
    super((name = "Translucent"), (health = 800), (maxHealth = 800));
  }
  ////// A master of stealth, Translucent strikes from the shadows. Damage+ to 1 random target.
  shadowStrike(goodGuy) {
    // * CAN LIKELY REFACTOR EVERYTHING BELOW but let's leave it until after we get an MVP...
    let randomIndex = Math.floor(Math.random() * 4); // set randomIndex equal to a random value between 0 and 3
    let validTargets = []; // create a temporary array to house our valid, living members of The Boys
    for (let member of theBoys) {
      // for each member of The Boys in theBoys array
      if (member.health > 1) {
        // if member's health is > 1 | ie, if member is alive...
        validTargets.push(member); // then push member into validTargets array
      }
    }
    let selectedTarget = validTargets[randomIndex]; // set selectedTarget to a random, living member of The Boys
    selectedTarget.health -= 55; // deal damage to that randomly selected, living member of The Boys
    // *** updateMessage() with ...
  }
  ////// "No, I don't actually vanish. My skin turns into this carbon meta-material that bends
  ////// the light.Like an invisibility cloak." Damage++
  invisibleLurker(goodGuy) {
    // write a function for randomly selecting one of the boys as target
    // push good guys to an array and choose a random index to choose target
    goodGuy.health -= 85;
    // *** updateMessage() with ...
  }
  ////// A quick re-ordereding-of-carbon-into-metamaterial later and Translucent is good-as-new. Heal+
  carbonRealignment() {
    // to keep from over-healing...
    if (this.health < this.maxHealth - 100) {
      // if current health is less than maxHealth minus heal amount...
      this.health += 100; // then increase current health by 100
      // *** updateMessage() with "Translucent restored his health by ${heal amount}"
    } else {
      // otherwise...
      this.health = this.maxHealth; // set current health equal to the value of maxHealth
      // *** updateMessage() with "Translucent fully restored his health!"
    }
  }
  // Placeholder function that will randomly select and store one of Translucent's above actions.
  // Translucent Temperament: Egotistical, Predatory, Self-Involved | Focus on light attack, then heavy attack, then heal
  // CURRENT: 40% chance of shadowStrike || 35% chance of invisibleLurker || 25% chance of carbonRealignment
  selectAttack() {
    let randomNum = Math.random(); // set temp variable equal to a random number between 0 and limit 1
    if (randomNum < 0.25) {
      // if randomly generated value is between 0 and .25 ...
      this.carbonRealignment(); // then ~25% chance of selecting carbonRealignment as their action each turn
    } else if (randomNum > 0.25 && randomNum < 0.61) {
      // if randomly generated value is between .25 and .6 ...
      this.invisibleLurker(); // then ~35% chance of selecting invisibleLurker as their action each turn
    } else {
      // if neither of the above if statements have been triggered, then the value of randomNum must be between .61 and limit 1 ...
      this.shadowStrike(); // then ~40% chance of selecting shadowStrike as their action each turn
    }
  }
}

////// Create class for The Deep (real name: Kevin Moskowitz | other alias: Lord of the Seven Seas)
class TheDeep extends Supes {
  // Initialize constructor using super as a "function" to access parent prototype
  constructor(name, health, maxHealth) {
    super((name = "The Deep"), (health = 1000), (maxHealth = 1000));
  }
  ////// Luckily, Vought Tower's six-story aquatic exhibit is fresh-water; unfortunately, it's full of piranhas. Don't fall in.
  ////// Summon scaly allies to fight by his side. Damage+ to entire team.
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
  ////// It takes thick skin to swim in the Mariana Trench on the ocean floor. Regenerative skin helps. (fun-fact: MT has a water pressure of 8-tons-per-square-inch, OR 1,000x the standard atmospheric pressure at sea level)
  ////// Just don't touch his gills. Heal+
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

////// Create a class for A-Train. He killed Hughie Campbell's girlfriend, Robin.
////// He ran through her A-Train is fast.
////// *** when you write the battle logic for this fight against A-Train, don't forget to make him go first every round | ie, he needs to go after each of the boys have selected their moves */
class ATrain extends Supes {
  // Initialize constructor using super as a "function" to access the parent prototype
  constructor(name, health, maxHealth) {
    super((name = "A-Train"), (health = 1200), (maxHealth = 1200));
    this.power = 200; // A-Train is the only boss with a power property. Power is an attack damage modifier.
    this.heartBeat = 100; // Only a world-class ath-e-lete could bash heads in battle and maintain 100bpm...
  }
  ////// Starlight shoots light and A-Train can dodge her attacks, ergo: he big-fast. Damage++ to single member of The Boys.
  speedOfLight(goodGuy) {
    goodGuy.health -= Math.floor(Math.random() * power) + 50; // returns a value on average, between 125 and 175 damage at base power of 200
    // *** updateMessage() with ...
  }
  ////// Shooting-up Compound-V keeps him sharp, but how much can his heart take? Heal+, Power+, heartBeat++
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
  fastestManAlive(goodGuys) {
    // Need a function to select every member of the team rather than just 1
    // Attack will deal damage + to every team member
    // *** updateMessage() with ...
  }
  // *** INCLUDE A UNIQUE isDead() method?? Where should I incorporate the heartBeat death condition...?
}

////// Create a class for "The Defender of Des Moines", Starlight. (real name: Annie January)
class Starlight extends Supes {
  // Initialize constructor using super as a "function" to access the parent prototype
  constructor(name, health, maxHealth) {
    super((name = "Starlight"), (health = 1250), (maxHealth = 1250));
  }
  ////// Iron-man-like energy blasts from the hands. Yikes. Damage++ to single member of The Boys
  energyProjection(goodGuy) {
    goodGuy.health -= 120;
    // *** updateMessage() with ...
  }
  ////// As long as there is electricity around, Starlight has near-limitless power... Heal++
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
  energyBlast(goodGuys) {
    // *** loop through goodGuys array | for ( let guy in goodGuys )...
    // Need a function to select every member of the team rather than just 1
    // Attack will deal damage ++ to every team member
    // *** updateMessage() with ...
  }
}

////// Create a class for Black Noir — The Seven's silent, stealthy, superpowered ninja.
////// His super strength and heightened senses are matched only by his proficiency in martial arts.
////// Criminals run at the mere mention of his name.
class BlackNoir extends Supes {
  // Initialize constructor using super as a "function" to access the parent prototype
  constructor(name, health, maxHealth) {
    super((name = "Black Noir"), (health = 2000), (maxHealth = 2000));
  }
  ////// Whether used in close combat or from range, Black
  ////// Noir is a master of daggers. Damage + to all members of The Boys
  throwDaggers(goodGuys) {
    // utilize our functions that parse our validTargets and then select all living members
    // Damage + to all
    // *** updateMessage() with ...
  }
  ////// Noir's body is capable of healing wounds at an astounding rate.
  ////// Whatever the injury, it seems to heal within hours...Heal++
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
  silentAssassin(goodGuy) {
    goodGuy.health -= 200;
    // *** updateMessage() with ...
  }
}

////// Create a class for Lamplighter. He just wants to make his dad proud...
class Lamplighter extends Supes {
  // Initialize constructor using super as a "function" to access parent prototype
  constructor(name, health, maxHealth) {
    super((name = "Lamplighter"), (health = 800), (maxHealth = 800));
  }
  ////// Lamplighter uses his ability to control fire with his mind to create blasts
  ////// strong enough to melt holes in steel plates. Damage++ to a single member of The Boys
  pyrokinesis(goodGuy) {
    goodGuy.health -= 125;
    // *** updateMessage() with ...
  }
  ////// Ironically, one of the only things Lamplighter is weak to is flames... Damage+++ to a single member of The Boys
  burnedAlive(goodGuy) {
    goodGuy.health -= 250;
    // *** updateMessage() with ...
  }
  ////// Like Starlight, Lamplighter has no power if he doesn't have a "source" to draw from...
  ////// Thankfully for him, his staff provides limitless flame. Damage++ to all members of The Boys
  fireStorm(goodGuys) {
    // utilize our functions that parse our validTargets and then select all living members
    // Damage + to all
    // *** updateMessage() with ...
  }
}

////// Create a class for Homelander, Vought's prized-possession.
////// "You see, companies, they come and go. But talent... talent is forever."
class Homelander extends Supes {
  constructor(name, health, maxHealth) {
    super((name = "Homelander"), (health = 2000), (maxHealth = 2000));
  }
  ////// Raised in a lab, Homelander was bred to be a weapon. Unfortunately, this means he doesn't
  ////// know how to process his emotions in a healthy way. When he get's angry, he acts out. Damage++
  bruteForce(goodGuy) {
    goodGuy.health -= 250;
    // *** updateMessage() with ...
  }
  ////// Is he really the most powerful being ever? Is he a god?
  ////// How does his hair always stay so perfect? Heal+++
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

// *** Need to make sure to add a cached DOM node for message (.message class, likely? pop-out modal?)
// const updateMessage = (text) => message.textContent = text;

startGame = () => {
  while (areTheyDead() === false && areWeDead === false) {
    // Battle Phase
    // ==>// ==> check to see if M.M. is still alive
    // ==>// ==>// ==> if alive, set M.M. as our selectedCharacter
    // ==> M.M. acts...
    // ==>// ==> check to see if enemy is still alive
    // ==>// ==> check to see if Butcher is still alive
    // ==>// ==>// ==> if alive, set Butcher as our selectedCharacter
    // ==> Butcher acts...
    // ==>// ==> check to see if enemy is still alive
    // ==>// ==> check to see if Hughie is still alive
    // ==>// ==>// ==> if alive, set Hughie as our selectedCharacter
    // ==> Hughie acts...
    // ==>// ==> check to see if enemy is still alive
    // ==>// ==> check to see if Frenchie is still alive
    // ==>// ==>// ==> if alive, set Frenchie as our selectedCharacter
    // ==> Frenchie acts...
    // ==>// ==> check to see if enemy is still alive
    // ==> Enemy acts...
    // Battle is either over... - OR - Repeat...
  }
};

/*
areWeDead() utilizes each member of The Boy's isDead() method in order
to determine whether if entire team is currently dead or not (will be part of a checkLoss()  )
Dead ==> return true
Alive ==> return false
*/
areWeDead = () => {
  if (
    MM.isDead() === true && // if M.M. is dead...
    Butcher.isDead() === true && // AND Butcher is dead...
    Hughie.isDead() === true && // AND Hughie is dead...
    Frenchie.isDead() === true // AND Frenchie is dead, then...
  ) {
    return true; // return true
  } else {
    // otherwise... (ie, if anyone is still alive)
    return false; // return false
  }
};
// END areWeDead()

/*
areTheyDead() utilized each Supe's isDead() method in order to determine
whether all enemies are currently dead or not (will be part of a checkWin()   )
Dead ==> returns true
Alive ==> returns false
*/
areTheyDead = () => {
  // *** HARDCODING the first boss until after MVP
  // *** eventually refactor to account for multiple enemies
  if (translucent.health < 1) {
    return true;
  } else {
    return false;
  }
};

// selectedCharacter ==> used to determine what actions we can choose from. also gets added to a class that makes it visually stand out (physically move (transform: translate()) it out in front of the others)

/*
checkIfHit() determines if our currentlySelected member of The Boys
is able to successfully complete their action or not.
*/
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

/*
isBattleWon() checks to see if each level has been cleared yet...
Level is cleared by defeating that level's Supe
*/
const isBattleWon = () => {
  if (areTheyDead === true) {
    // *** updateMessage() with ...
    // *** set new level for getLevel to reference for switch...?
    return true;
  } else {
    return false;
  }
};
// END isBattleWon()

/*
  getLevel() determines which opponent we are facing dependent on what 'level' we are on. 
  We will use the level to set our case in our switch statement — each level correlates to a specific opponent.
  (Vought Tower ==> | Level 1 = Translucent, Level 2 = The Deep, Level 3 = A-Train, 
  Level 4 = Starlight, Level 5 = Black Noir, Level 6 = Lamplighter, Level 7 = Homelander)
*/
/*
  Taking a step back to focus on the MVP rather than my loftier goals.
  Get MVP working and circle back to focus on building the rest of the levels.

const getLevel = (level) => {
  let opponent;
  switch (level) {
    case "l1":
      opponent = translucent;
      break;
    case "l2":
      opponent = theDeep;
      break;
    case "l3":
      opponent = aTrain;
      break;
    case "l4":
      opponent = starlight;
      break;
    case "l5":
      opponent = blackNoir;
      break;
    case "l6":
      opponent = lamplighter;
      break;
    case "l7":
      opponent = homelander;
      break;
    default:
      opponent = translucent;
  }
};
// END getLevel()
*/

/////////////////////
//  BATTLE LOGIC  // ==================================================================
///////////////////
// PSEUDO:
//
//
// ====================================================================================

// ====================
// EVENT LISTENERS
// ====================
