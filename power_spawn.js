const TerminalMarket = require('terminal_market')
const roleManager = require('role.manager');
const Prices = require('price_list');

const PowerSpawn = {
    autoProcessPower: function(power_spawn){
        if (!power_spawn){
            return -237861237
        }
        
        if (power_spawn.processPower() == OK){
            return OK;
        }
        
        let manager = 0;
        const storage = power_spawn.room.storage;
        const terminal = power_spawn.room.terminal;
        for (let name in power_spawn.room.find(FIND_MY_CREEPS)){
            const creep = power_spawn.room.find(FIND_MY_CREEPS)[name];
            if (creep.memory.role == 'manager' && creep.memory.target_room == power_spawn.room.name){
                manager = creep;
            }
        }

        if (power_spawn.store[RESOURCE_ENERGY] < 50){
            roleManager.shift(manager, storage, power_spawn, RESOURCE_ENERGY, 0);
        }else if (power_spawn.store[RESOURCE_POWER] == 0){
            if (storage.store[RESOURCE_POWER] > 100){
                roleManager.shiftAmount(manager, storage, power_spawn, RESOURCE_POWER, 100);
            }else if (terminal.store[RESOURCE_POWER] > 100){
                roleManager.shiftAmount(manager, terminal, power_spawn, RESOURCE_POWER, 100);
            }else{
                TerminalMarket.auto_buy(terminal, RESOURCE_POWER, 2000); // spooky
            }
        }
    },
};

module.exports = PowerSpawn;