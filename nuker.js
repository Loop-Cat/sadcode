const TerminalMarket = require('terminal_market')
const roleManager = require('role.manager');
const Prices = require('price_list');

const Nuker = {
    fill: function(nuker){
        if (!nuker){
            return -237861237
        }
        
        let manager = 0;
        const storage = nuker.room.storage;
        const terminal = nuker.room.terminal;
        for (let name in nuker.room.find(FIND_MY_CREEPS)){
            const creep = nuker.room.find(FIND_MY_CREEPS)[name];
            if (creep.memory.role == 'manager' && creep.memory.target_room == nuker.room.name){
                manager = creep;
            }
        }

        if (nuker.store[RESOURCE_GHODIUM] < nuker.store.getCapacity(RESOURCE_GHODIUM)){
            if (terminal.store[RESOURCE_GHODIUM] > 0){
                roleManager.shift(manager, terminal, nuker, RESOURCE_GHODIUM, 0);
            }
        }else if (nuker.store[RESOURCE_ENERGY] < nuker.store.getCapacity(RESOURCE_ENERGY)){
            if (storage.store[RESOURCE_ENERGY] > 50000){
                roleManager.shift(manager, storage, nuker, RESOURCE_ENERGY, 50000);
            }
        }
    },
};

module.exports = Nuker;