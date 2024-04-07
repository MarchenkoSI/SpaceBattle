
const shipA = {
    health: 100,
    maxHealth: 100,
    shield: 80,
    maxShield: 80,
    shieldRegen: 1,
    maxModules: 2,
    maxWeapon: 2,
    weapons: [],
    modules: []
};

const shipB = {
    health: 60,
    maxHealth: 60,
    shield: 120,
    maxShield: 120,
    shieldRegen: 1,
    maxModules: 3,
    maxWeapon: 2,
    weapons: [],
    modules: []
};

function addWeapon(weapon, isShipB = false) {
    const ship = isShipB ? shipB : shipA;
    if (ship.maxWeapon <= ship.weapons.length) {
        alert("Max weapons count!");
        return;
    }
    switch(weapon) {
        case 'A':
            ship.weapons.push({delay: 3000, damage: 5});
            break;
        case 'B':
            ship.weapons.push({delay: 2000, damage: 4});
            break;
        case 'C':
            ship.weapons.push({delay: 5000, damage: 20});
            break;
    }

    updateUI();
}

function addModule(module, isShipB = false) {
    const ship = isShipB ? shipB : shipA;
    if (ship.maxModules <= ship.modules.length)  {
        alert("Max modules count!");
        return;
    }
    console.log(ship.maxModules + " " + ship.modules.length);
    switch(module) {
        case 'A':
            ship.shield += 50;
            ship.maxShield += 50;
            break;
        case 'B':
            ship.health += 50;
            ship.maxHealth += 50;
            break;
        case 'C':
            ship.weapons.forEach(weapon => weapon.delay *= 0.8);
            break;
        case 'D':
            ship.shieldRegen *= 1.2;
            break;
    }

    ship.modules.push(module);

    updateUI();
}

function startBattle() {
    let battleInterval = setInterval(() => {
        shipA.weapons.forEach(weapon => {
            if (weapon.lastFired === undefined || Date.now() - weapon.lastFired >= weapon.delay) {
                if(shipB.health > 0) {
                    shipB.shield -= weapon.damage;
                    if(shipB.shield < 0) {
                        shipB.health += shipB.shield;
                        shipB.shield = 0;
                    }
                    weapon.lastFired = Date.now();
                }
            }
        });
        shipB.weapons.forEach(weapon => {
            if (weapon.lastFired === undefined || Date.now() - weapon.lastFired >= weapon.delay) {
                if(shipA.health > 0) {
                    shipA.shield -= weapon.damage;
                    if(shipA.shield < 0) {
                        shipA.health += shipA.shield;
                        shipA.shield = 0;
                    }
                    weapon.lastFired = Date.now();
                }
            }
        });
        shipA.shield += shipA.shieldRegen;
        shipB.shield += shipB.shieldRegen;

        if(shipA.health <= 0 || shipB.health <= 0) {
            clearInterval(battleInterval);
            endBattle();
        }

        updateUI();
    }, 1000);
}


function updateUI() {
    document.getElementById('healthA').textContent = shipA.health;
    document.getElementById('shieldA').textContent = shipA.shield;
    document.getElementById('healthB').textContent = shipB.health;
    document.getElementById('shieldB').textContent = shipB.shield;
}

function endBattle() {
    if(shipA.health <= 0 && shipB.health <= 0) {
        alert("It's a draw!");
    } else if(shipA.health <= 0) {
        alert("Ship B wins!");
    } else {
        alert("Ship A wins!");
    }
}
