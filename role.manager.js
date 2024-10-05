const Pathing = require('pathing');

const roleManager = {
    shiftAmount: function(creep, dealer, target, resource, amount){
        if (!dealer || !target || !creep){return}
        if (dealer.store[resource] > 0 && creep.store[resource] == 0){
            if (creep.store.getFreeCapacity() == 0){
                creep.transfer(dealer, Object.keys(creep.store)[0])
            }else{
                creep.withdraw(dealer, resource, amount);
            }
        }else if (creep.store[resource] > 0){
            creep.transfer(target, resource);
        }
	},
    
    shift: function(creep, dealer, target, resource, floor){
        if (!dealer || !target || !creep){return}
        if (dealer.store[resource] > floor && creep.store[resource] == 0){
            if (creep.store.getFreeCapacity() == 0){
                creep.transfer(target, Object.keys(creep.store)[0])
            }else{
                creep.withdraw(dealer, resource);
            }
        }else if (creep.store[resource] > 0){
            creep.transfer(target, resource);
        }
	},
	
    run: function(creep) {
        let flag
        if (!creep.memory.spot){
            flag = Game.flags.find(f => f.name.slice(0, 4) == 'Spot')
            if (flag){
                creep.memory.spot = flag.name
            }else{
                creep.say('No spot :(')
                return
            }
        }else{
            flag = Game.flags[creep.memory.spot];
        }
        
        if (!creep.pos.isEqualTo(flag.pos)){
            creep.moveTo(flag.pos, {range: 0, priority: 20000});
            return 1;
        }else{
            Pathing.reservePos(flag.pos, 20000);
        }
        
        let link
        let factory
        
        if (!creep.memory.link_id){
            link = creep.pos.findInRange(FIND_MY_STRUCTURES, 1).filter(s => s.structureType == STRUCTURE_LINK)[0]
            if (link){
                creep.memory.link_id = link.id
            }else{
                creep.say('No link :(')
                return
            }
        }else{
            link = Game.getObjectById(creep.memory.link_id)
        }

        if (!creep.memory.factory_id){
            if (creep.memory.factory_id == 0) {return}
            factory = creep.pos.findInRange(FIND_MY_STRUCTURES, 1).filter(s => s.structureType == STRUCTURE_FACTORY)[0]
            if (factory){
                creep.memory.factory_id = factory.id
            }else{
                creep.say('No fctr :(')
                creep.memory.factory_id = 0
            }
        }else{
            if (creep.memory.factory_id != 0){
                factory = Game.getObjectById(creep.memory.factory_id)
            }
        }

        const terminal = creep.room.terminal;
        const storage = creep.room.storage;
        
        if (!link) {return}
        
        if (creep.store.getUsedCapacity('energy') > 0){
            if (terminal){
                if (terminal.store['energy'] < 100000 && storage.store['energy'] > 100000){
                creep.transfer(terminal, 'energy')
                }else if (factory){
                    if (factory.store['energy'] < 10000){
                        creep.transfer(factory, 'energy')
                    }else{
                        creep.transfer(storage, 'energy')
                    }
                }else{
                    creep.transfer(storage, 'energy')
                }
            }else{
                creep.transfer(storage, 'energy')
            }
        }else{
            if (terminal){
                if (link.store['energy'] > 0){
                    creep.withdraw(link, 'energy')
                    return 0;
                }else if (terminal.store['energy'] < 50000 && storage.store['energy'] > 110000){
                    creep.withdraw(storage, 'energy')
                    return 0;
                }else if (terminal.store['energy'] > 20000 && storage.store['energy'] < 1000000){
                    creep.withdraw(terminal, 'energy')
                    return 0;
                }
            }else{
                creep.withdraw(link, 'energy')
                return 0;
            }
        }
        return 0;
	}
};

module.exports = roleManager;