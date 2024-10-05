// Game.market.createOrder({type: ORDER_SELL, resourceType: RESOURCE_ZYNTHIUM, price: 28.868, totalAmount: 224000, roomName: "E423S55"});
// Game.market.deal('667c0d551a26703af02cff7a', 4, "E43S53");
// Game.rooms['E43S53'].terminal.send("H", 40000, 'E43S56');
// Game.rooms['E42S55'].terminal.send("O", 54000, 'E43S53');
// Game.rooms['E43S56'].terminal.send("XKHO2", 8000, 'E42S55');
// Game.rooms['E43S56'].terminal.send("H", 15000, 'E43S53');
// Game.spawns['Spawn1_1'].spawnCreep([MOVE], 'nuh uh');
//const profiler = require('screeps-profiler');
//profiler.enable();

global.allyModel = require('./allyModel');
allyModel.setLocalAllies({
    'player1': true,
    'player2': true,
});

module.exports.loop = function() {
    allyModel.sync();
};

//omega super important stuf
const Pathing = require('pathing');
// important stuf
const Blueprints = require('creep_blueprints');
const CreepList = require('creep_list');
const Spawn = require('creep_spawning')
const TerminalMarket = require('terminal_market')
const extraMethods = require('extras');
const FactoryCode = require('factory_code');
const towersModule = require('tower_code');
const powerSpawn = require('power_spawn');
const Nuker = require('nuker');
const Stronghold = require('Stronghold');
const AutoSpawning = require('auto_spawning');
const Observer = require('observer');
const DepositMining = require('deposit_mining')
global.labsModule = require('labs_list');
//labsModule.changeRole('E42S55', 'lab_intern');

// same room creeps
const roleUpgrader = require('role.upgrader');
const roleBuilder = require('role.builder');
const roleMiner = require('role.miner');
const roleHauler = require('role.hauler');
const roleFiller = require('role.filler');
const roleManager = require('role.manager');
const roleRepairer = require('role.repairer');
const roleHarvester = require('role.harvester');
const roleLabIntern = require('role.lab_intern');
const roleLabSenior = require('role.lab_senior');
const roleLabUnloader = require('role.lab_unloader');
const roleLabTechnician = require('role.lab_technician');
const roleMineralMiner = require('role.mineral_miner');
const roleMineralHauler = require('role.mineral_hauler');

// creeps for proxy mining
const roleReserver = require('role.reserver');
const roleRemoteHauler = require('role.remote_hauler');
const roleClaimer = require('role.claimer');
const roleDeliverer = require('role.deliverer');
const roleDepositMiner = require('role.deposit_miner');

// creeps for combat
const MeleeDefender = require('role.melee_defender');
const RangedDuo = require('role.ranged_duo');
const roleScout = require('role.scout');
const Quad = require('role.quad');
const QuadV2 = require('quadV2');
const roleHealer = require('role.healer');
const roleDismantler = require('role.dismantler');
const roleHarasser = require('role.harasser');
const CoreAttacker = require('core_attacker');

// power miners
/*const rolePowerHauler = require('role.power_hauler');
const rolePowerHealer = require('role.power_healer');
const rolePowerMelee = require('role.power_melee');*/

// source keeper miners
const roleSKBuilder = require('role.SK_builder');
const roleSKHauler = require('role.SK_hauler');
const roleSKKiller = require('role.SK_killer');
const roleSKMiner = require('role.SK_miner');
const roleSKMineralMiner = require('role.SK_mineral_miner');

// powah creeps
const powerCreep = require('power_creep')

const roles = {
    'upgrader': roleUpgrader,
    'builder': roleBuilder,
    'miner': roleMiner,
    'hauler': roleHauler,
    'manager': roleManager,
    'harvester': roleHarvester,
    'lab_intern': roleLabIntern,
    'lab_senior': roleLabSenior,
    'reserver': roleReserver,
    'remote_hauler': roleRemoteHauler,
    'claimer': roleClaimer,
    'deliverer': roleDeliverer,
    'melee_defender': MeleeDefender,
    'mineral_miner': roleMineralMiner,
    'mineral_hauler': roleMineralHauler,
    'SK_builder': roleSKBuilder,
    'SK_hauler': roleSKHauler,
    'SK_killer': roleSKKiller,
    'SK_miner': roleSKMiner,
    'SK_mineral_miner': roleSKMineralMiner,
    'lab_unloader': roleLabUnloader,
    'lab_technician': roleLabTechnician,
    'scout': roleScout,
    'filler': roleFiller,
    'repairer': roleRepairer,
    'dismantler': roleDismantler,
    'healer': roleHealer,
    'harasser': roleHarasser,
    'attacker': CoreAttacker,
    'deposit_miner': roleDepositMiner,
};

// my towers
var towers = towersModule.findAllTowers();

// replace with dynamic thing
const mining_links = ['6644b3754dec39ff42692412', '6644b7e8f354fc6ad0585207', '664c477912d66455c4f4370e',
                      '664c3e131d1f7f2ce80411b6', '6655ebe875e1c57dfbb89026', '665ce222fb9b2462c32865db',
                      '6660dad94797e164c1efe209', '666589d6984be671c20823ab', '666ddb3eddfbc96dde167173',
                      '6672d62c3ea6bd16dd939c27',];
const central_links = ['6644af4a8cf66e8e9678fd68', '6646f1211ad97c034ed9a8d3', '6655affb0f8b07bdc9082ad8', '6660e65a3747656e69942702', '666de036f354fc1e08623f75'];

CoreAttacker.updateCache('E45S56');

module.exports.loop = function () {
    //Game.getObjectById('666a122512d6640856fb6c4a').observeRoom('E45S56');
    if (Game.cpu.bucket < 100){
        console.log(':(')
        return;
    }
    
    /*if (Game.time % 30 == 0){
        CoreAttacker.updateCache('E45S56');
    }*/
    
    //console.log(Stronghold.run('E45S56'));
    
    /*matrix = extraMethods.formQuadMatrix(Game.getObjectById('6665ea3744db2b1e9fca66bb'))
    console.log(matrix)
    extraMethods.visualizeCostMatrix('E45S56', matrix)*/
    
    // memory clean up
    for (let name in Memory.creeps) {
        if (!Game.creeps[name]) {
            delete Memory.creeps[name];
        }
    }
    
    //AutoSpawning.maintainPopulation('E42S55')
    
    /*if (Game.rooms['E42S55'].terminal.store['XGH2O'] > 500){
        Game.rooms['E42S55'].terminal.send('XGH2O', Game.rooms['E42S55'].terminal.store['XGH2O'], 'E46S57');
    }*/
    
    /*if (Game.rooms['E43S56'].terminal.store['GH'] > 100){
        Game.rooms['E43S56'].terminal.send('GH', Game.rooms['E43S56'].terminal.store['GH'] - 100, 'E42S55');
    }*/
    
    /*if (Game.rooms['E43S53'].terminal.store[RESOURCE_ENERGY] > 20000 && Game.rooms['E47S51'].terminal.store[RESOURCE_ENERGY] < 100000){
        Game.rooms['E43S53'].terminal.send(RESOURCE_ENERGY, Game.rooms['E43S53'].terminal.store[RESOURCE_ENERGY] - 20000, 'E47S51');
    }
    
    if (Game.rooms['E43S56'].terminal.store[RESOURCE_ENERGY] > 20000 && Game.rooms['E47S51'].terminal.store[RESOURCE_ENERGY] < 100000){
        Game.rooms['E43S56'].terminal.send(RESOURCE_ENERGY, Game.rooms['E43S56'].terminal.store[RESOURCE_ENERGY] - 20000, 'E47S51');
    }
    
    if (Game.rooms['E46S57'].terminal.store[RESOURCE_ENERGY] > 20000 && Game.rooms['E47S51'].terminal.store[RESOURCE_ENERGY] < 100000){
        Game.rooms['E46S57'].terminal.send(RESOURCE_ENERGY, Game.rooms['E46S57'].terminal.store[RESOURCE_ENERGY] - 20000, 'E47S51');
    }*/
    
    if (Game.rooms['E43S53'].terminal.store[RESOURCE_CELL] > 100){
        Game.rooms['E43S53'].terminal.send(RESOURCE_CELL, Game.rooms['E43S53'].terminal.store[RESOURCE_CELL], 'E42S55');
    }
    
    if (Game.rooms['E47S51'].terminal.store[RESOURCE_CELL] > 100){
        Game.rooms['E47S51'].terminal.send(RESOURCE_CELL, Game.rooms['E47S51'].terminal.store[RESOURCE_CELL], 'E42S55');
    }
    
    /*if (Game.rooms['E43S56'].terminal.store[RESOURCE_OXIDANT] > 300){
        Game.rooms['E43S53'].terminal.send(RESOURCE_OXIDANT, Game.rooms['E43S53'].terminal.store[RESOURCE_OXIDANT], 'E42S55');
    }
    
    if (Game.rooms['E43S56'].terminal.store[RESOURCE_LEMERGIUM_BAR] > 300){
        Game.rooms['E43S56'].terminal.send(RESOURCE_LEMERGIUM_BAR, Game.rooms['E43S56'].terminal.store[RESOURCE_LEMERGIUM_BAR], 'E42S55');
    }*/
    
    /*if (Game.rooms['E46S57'].terminal.store[RESOURCE_LEMERGIUM_BAR] > 300){
        Game.rooms['E46S57'].terminal.send(RESOURCE_LEMERGIUM_BAR, Game.rooms['E46S57'].terminal.store[RESOURCE_LEMERGIUM_BAR], 'E47S51');
    }*/
    
    // tower code
    for (var i in towers){
        const tower = towers[i];
        if (tower) {
            towersModule.run(tower);
        }
    }
    
    // link code
    for (var i in mining_links){
        var link = Game.getObjectById(mining_links[i]);
        if (link.store[RESOURCE_ENERGY] > 100){
            for (var i2 in central_links){
                var target = Game.getObjectById(central_links[i2]);
                link.transferEnergy(target, Math.min(link.store[RESOURCE_ENERGY], target.store.getFreeCapacity()))
            }
        }
    }
    
    // E42S55 mineral creep spawning
    if (Game.getObjectById('5bbcb672d867df5e5420786c').mineralAmount > 0){
        const spawn = Game.spawns['Spawn1'];
        var queue = [];
        for (var count in CreepList.mineral_E42S55){
            var creep = Game.creeps[CreepList.mineral_E42S55[count][0]];
            if (!creep){
                queue.push(count);
            }
        }

        if(queue.length > 0){
            Spawn.run(CreepList.mineral_E42S55[queue[0]], 'Spawn1');
        }
    }
    
    // E43S56 mineral creep spawning
    if (Game.getObjectById('5bbcb67ed867df5e542078d9').mineralAmount > 0){
        const spawn = Game.spawns['Spawn2'];
        var queue = [];
        for (var count in CreepList.mineral_E43S56){
            var creep = Game.creeps[CreepList.mineral_E43S56[count][0]];
            if (!creep){
                queue.push(count);
            }
        }
        if(queue.length > 0){
            Spawn.run(CreepList.mineral_E43S56[queue[0]], 'Spawn2');
        }
    }
    
    // E43S53 mineral creep spawning
    if (Game.getObjectById('5bbcb67dd867df5e542078d6').mineralAmount > 0){
        const spawn = Game.spawns['Spawn3'];
        var queue = [];
        for (var count in CreepList.mineral_E43S53){
            var creep = Game.creeps[CreepList.mineral_E43S53[count][0]];
            if (!creep){
                queue.push(count);
            }
        }
        if(queue.length > 0){
            Spawn.run(CreepList.mineral_E43S53[queue[0]], 'Spawn3');
        }
    }
    
    // E46S57 mineral creep spawning
    if (Game.getObjectById('5bbcb692d867df5e542079b2').mineralAmount > 0){
        const spawn = Game.spawns['Spawn4'];
        var queue = [];
        for (var count in CreepList.mineral_E46S57){
            var creep = Game.creeps[CreepList.mineral_E46S57[count][0]];
            if (!creep){
                queue.push(count);
            }
        }
        if(queue.length > 0){
            Spawn.run(CreepList.mineral_E46S57[queue[0]], 'Spawn4');
        }
    }
    
    // E47S51 mineral creep spawning
    if (Game.getObjectById('5bbcb69dd867df5e54207a18').mineralAmount > 0){
        const spawn = Game.spawns['Spawn5'];
        var queue = [];
        for (var count in CreepList.mineral_E47S51){
            var creep = Game.creeps[CreepList.mineral_E47S51[count][0]];
            if (!creep){
                queue.push(count);
            }
        }
        if(queue.length > 0){
            Spawn.run(CreepList.mineral_E47S51[queue[0]], 'Spawn5');
        }
    }
    
    // more new spawning code
    for (var i in Game.spawns){
        const spawn = Game.spawns[i];
        var queue = [];
        for (var count in CreepList[i]){
            var creep = Game.creeps[CreepList[i][count][0]];
            if (!creep){
                queue.push(count);
            }
        }
        if (queue.length == 1){
            Spawn.run(CreepList[i][queue[0]], i);
        }else if (queue.length > 1){
            var choice = queue[0];
            for (var count in queue){
                var choice2 = queue[count];
                if (CreepList[i][choice][3] < CreepList[i][choice2][3]){
                    choice = choice2;
                }
            }
            Spawn.run(CreepList[i][queue[queue.indexOf(choice)]], i);
        }
    }
    
    // power creep code (move the spawning process to the power creep module when you are done with better autospawning code)
    for (let i in CreepList.PowerCreeps){
        const power_creep = Game.powerCreeps[i];
        if (power_creep.ticksToLive){
            //const cpuBeforeThisCreep = Game.cpu.getUsed();
            powerCreep.run(power_creep);
            //const cpuAfterThisCreep = Game.cpu.getUsed();
            //const delta = cpuAfterThisCreep - cpuBeforeThisCreep;
            //console.log(`Creep ${name} with role ${creep.memory.role} used ${delta} CPU`);
        }else{
            const power_spawn = Game.rooms[CreepList.PowerCreeps[i].target_room].find(FIND_MY_STRUCTURES,{
                filter: (structure) => {
                    return (structure.structureType == STRUCTURE_POWER_SPAWN);
                }
            })[0];
            
            power_creep.spawn(power_spawn)
        }
    }
    let quads = {
        bois: [],
        girls: [],
        creps: [],
    }
    // new creep manager code
    for (var name in Game.creeps){
        const creep = Game.creeps[name];
        //const cpuBeforeThisCreep = Game.cpu.getUsed();
        if (creep.memory.role && creep.memory.role != 'quad'){
            if (roles[creep.memory.role] && creep.spawning == false){
                roles[creep.memory.role].run(creep);
                /*if (creep.memory.role == 'hauler' || creep.memory.role == 'lab_intern' || creep.memory.role == 'manager' || creep.memory.role == 'miner'){
                    roles[creep.memory.role].run(creep);
                }*/
                
            }
        }else if (creep.memory.role == 'quad'){
            quads[creep.memory.group].push(creep);
        }
        //const cpuAfterThisCreep = Game.cpu.getUsed();
        //const delta = cpuAfterThisCreep - cpuBeforeThisCreep;
        //console.log(`Creep ${name} with role ${creep.memory.role} used ${delta} CPU`);
    }
    
    for (let i in quads){
        if (quads[i].length >= 4){
            Quad.run(quads[i]);
        }
    }
    
    // pixel farm :3
    if (Game.cpu.bucket == 10000){
        Game.cpu.generatePixel();
    }
    /*if(Game.resources[PIXEL] > 0) {
        let order = Game.market.getAllOrders({type: ORDER_BUY, resourceType: PIXEL}).sort((a, b) => {
            return b.price - a.price;
        });
        Game.market.deal(order[0].id, Game.resources[PIXEL], order[0].roomName);
    }*/
    
    // factory code
    FactoryCode.autoProduce(Game.getObjectById('6650c93e6bce393cbd5b9f00'), RESOURCE_ENERGY);
    //FactoryCode.autoProduce(Game.getObjectById('665a152fbe38cfe45971af5c'), RESOURCE_LEMERGIUM_BAR);
    //FactoryCode.autoProduce(Game.getObjectById('6661c5ba4416c88931d1c7f3'), RESOURCE_OXIDANT);
    //FactoryCode.autoProduce(Game.getObjectById('6670c5bcddfbc98496171eb8'), RESOURCE_LEMERGIUM_BAR);
    FactoryCode.autoProduce(Game.getObjectById('667a72b3be38cfefb579906f'), RESOURCE_CELL);
    //roleManager.shift(Game.getObjectById('667a40307a42e506fbf4fa82'), Game.rooms['E47S51'].storage, Game.rooms['E47S51'].terminal, 'H', 0)
    //powerSpawn.autoProcessPower(Game.getObjectById('666a07a68e570d04f912a7c5'));
    //Nuker.fill(Game.getObjectById('666a0fe15d02d37e0fe5d0a1'));
    DepositMining.run('E47S51')
    // terminal code
    if (Game.time % 10 == 0){
        Observer.scanRooms(Game.getObjectById('666a122512d6640856fb6c4a'), ['E45S50', 'E46S50', 'E47S50', 'E48S50', 'E49S50'])
        console.log('Checking terminals...')
        for (var i in Game.rooms){
            var terminal = Game.rooms[i].terminal;
            if (terminal){
                if (terminal.room.name == 'E42S55'){
                    //TerminalMarket.auto_buy(terminal, 'X', 160);
                    //TerminalMarket.auto_buy(terminal, 'GO', 270);
                    TerminalMarket.auto_sell(terminal, RESOURCE_COMPOSITE, 1000);
                    TerminalMarket.auto_sell(terminal, RESOURCE_PHLEGM, 200000);
                    //TerminalMarket.auto_sell(terminal, RESOURCE_GHODIUM_MELT, 2400);
                    //TerminalMarket.auto_sell(terminal, 'L', 27);
                    //TerminalMarket.auto_buy(terminal, 'XGHO2', 1000);
                    //TerminalMarket.auto_buy(terminal, 'XZHO2', 5000);
                    //TerminalMarket.auto_buy(terminal, 'XKHO2', 1500);
                    //TerminalMarket.auto_buy(terminal, 'ops', 1500);
                }else if (terminal.room.name == 'E43S56'){
                    //TerminalMarket.auto_buy(terminal, 'XKHO2', 1000);
                    //TerminalMarket.auto_buy(terminal, 'XZHO2', 1200);
                    //TerminalMarket.auto_sell(terminal, RESOURCE_ZYNTHIUM_BAR, 200);
                    //TerminalMarket.auto_sell(terminal, RESOURCE_TISSUE, 1200000);
                    //TerminalMarket.auto_sell(terminal, RESOURCE_PHLEGM, 26000);
                    //TerminalMarket.auto_sell(terminal, RESOURCE_CELL, 6083);
                    //TerminalMarket.auto_sell(terminal, 'O', 30);
                    //console.log(TerminalMarket.auto_buy(terminal, 'GH2O', 1200));
                    //TerminalMarket.auto_sell(terminal, 'G', 350);
                    //TerminalMarket.auto_buy(terminal, 'GO', 170);
                }else if (terminal.room.name == 'E43S53'){
                    //TerminalMarket.auto_buy(terminal, 'XLHO2', 1000);
                    TerminalMarket.auto_sell(terminal, RESOURCE_MUSCLE, 3927415);
                    //TerminalMarket.auto_sell(terminal, 'Z', 20);
                    //TerminalMarket.auto_sell(terminal, 'O', 30);
                    //console.log(TerminalMarket.auto_buy(terminal, 'XGH2O', 1200));
                    //TerminalMarket.auto_sell(terminal, 'G', 350);
                    //TerminalMarket.auto_buy(terminal, 'GO', 270);
                }else if (terminal.room.name == 'E46S57'){
                    //TerminalMarket.auto_sell(terminal, 'energy', 20);
                    //TerminalMarket.auto_sell(terminal, 'Z', 20);
                    //TerminalMarket.auto_sell(terminal, 'O', 30);
                    //console.log(TerminalMarket.auto_buy(terminal, 'GH2O', 1200));
                    //TerminalMarket.auto_sell(terminal, 'G', 350);
                    //TerminalMarket.auto_buy(terminal, 'GO', 270);
                }else if (terminal.room.name == 'E47S51'){
                    //TerminalMarket.auto_buy(terminal, 'XGH2O', 1200);
                }
            }
        }
    }
    
    Pathing.runMoves();
    
    console.log("CPU used:", Math.round(Game.cpu.getUsed()), "; Bucket:", Game.cpu.bucket);
    console.log("Creeps:", Object.keys(Game.creeps).length);
}