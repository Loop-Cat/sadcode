const TerminalMarket = require('terminal_market')
const roleManager = require('role.manager');
const Prices = require('price_list');

const FactoryCode = {
    autoProduce: function(factory, commoditie_type){
        let required_resources = [];
        for (let type in COMMODITIES[commoditie_type].components){
            const amount = COMMODITIES[commoditie_type].components[type];
            if (factory.store[type] < amount){
                required_resources.push(type);
            }
        }
        let manager = 0;
        const terminal = factory.room.terminal;
        const storage = factory.room.storage;
            
        for (let name in Game.creeps){
            const creep = Game.creeps[name];
            if (creep.memory.role == 'manager' && creep.memory.target_room == factory.room.name){
                manager = creep;
            }
        }
        
        if (required_resources.length > 0){
            let orders = [];
            for (let i in required_resources){
                const type = required_resources[i];
                if (manager){
                    if (manager.store[type]){
                        roleManager.shift(manager, terminal, factory, type, 0);
                        return;
                    }
                }
                
                if (storage.store[type] == 0){
                    if (terminal.store[type] == 0){
                        orders.push(type);
                    }else{
                        if (manager){
                            roleManager.shift(manager, terminal, factory, type, 0);
                        }
                    }
                }else{
                    if (manager){
                        if (type == 'energy'){
                            roleManager.shift(manager, storage, factory, type, 50000);
                        }else{
                            roleManager.shift(manager, storage, factory, type, 0);
                        }
                    }
                }
            }
            
            if (orders.length > 0){
                console.log("The factory", factory.room.name, "requests:", orders)
                TerminalMarket.auto_buy(terminal, orders[0], 150);
            }
        }else{
            factory.produce(commoditie_type);
            if (manager){
                if (commoditie_type == RESOURCE_ENERGY){
                    roleManager.shift(manager, factory, storage, commoditie_type, 0);
                }else{
                    roleManager.shift(manager, factory, terminal, commoditie_type, 0);
                }
            }
        }
    },
};

module.exports = FactoryCode;