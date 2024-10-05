const roleUpgrader = {

    /** @param {Creep} creep **/
    run: function(creep) {
        const target_room = creep.memory.target_room;
        
        if (creep.room.name != target_room){
            creep.moveToRoom(target_room);
        }else if (creep.ticksToLive > 1){
            if(creep.memory.working && creep.store[RESOURCE_ENERGY] == 0) {creep.memory.working = false;}
            if(!creep.memory.working && creep.store[RESOURCE_ENERGY] == creep.store.getCapacity()) {creep.memory.working = true;}

            if(creep.memory.working) {
                if(creep.upgradeController(creep.room.controller) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(creep.room.controller, {range: 3});
                }
                /*if(creep.room.name == 'E46S57') {
                    if(creep.signController(creep.room.controller, "Not a psychopath. Trust! UwU")) {
                        creep.moveTo(creep.room.controller);
                    }
                }*/
            }
            else{
                const storage = creep.room.storage;
                const containers = creep.room.find(FIND_STRUCTURES, {
                        filter: (structure) => {
                            return (structure.structureType == STRUCTURE_CONTAINER) && structure.store[RESOURCE_ENERGY] > 500;
                        }
                    });
                const labs = creep.room.find(FIND_STRUCTURES, {
                    filter: (structure) => {
                        return (structure.structureType == STRUCTURE_LAB) && (structure.store['GH'] >= 30 || structure.store['GH2O'] >= 30 || structure.store['XGH2O'] >= 30) && structure.store[RESOURCE_ENERGY] > 20;
                    }
                });
                if (creep.memory.is_boosted || labs.length == 0){
                    if (storage){
                        if (storage.store[RESOURCE_ENERGY]){
                            if(creep.withdraw(storage, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                                creep.moveTo(storage); 
                            }
                        }else{
                            const terminal = creep.room.terminal;
                            if (terminal){
                                if (terminal.store[RESOURCE_ENERGY] > 10000){
                                    if(creep.withdraw(terminal, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                                        creep.moveTo(terminal); 
                                    }
                                }
                            }
                        }
                    }else if (containers.length > 0){
                        if(creep.withdraw(containers[0], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                            creep.moveTo(containers[0]); 
                        }
                    }else{
                        const sources = creep.room.find(FIND_SOURCES, {
                            filter: (source) => {
                                return (source.energy > 0);}
                            });
                        if(creep.harvest(sources[0]) == ERR_NOT_IN_RANGE) {
                            creep.moveTo(sources[0]);
                        }
                    }
                }else{
                    var attempt = labs[0].boostCreep(creep);
                    if (attempt == ERR_NOT_IN_RANGE) {
                        creep.moveTo(labs[0]);
                    }else if (attempt == OK){
                        creep.memory.is_boosted = true;
                    }
                }
            }
        }else{
            const labs = creep.room.find(FIND_STRUCTURES, {
                filter: (structure) => {
                    return (structure.structureType == STRUCTURE_LAB);
                }
            });
            
            if (labs.length > 0){
                var huh = labs[2].unboostCreep(creep);
                if (huh == ERR_NOT_IN_RANGE){
                    creep.moveTo(labs[2]);
                }else if (huh == ERR_TIRED){
                    var huh2 = labs[1].unboostCreep(creep);
                    if (huh2 == ERR_TIRED){
                        if (Game.spawns['Spawn1'].recycleCreep(creep) == ERR_NOT_IN_RANGE){
                            creep.moveTo(Game.spawns['Spawn1'], {ignoreCreeps: true});
                        }else{
                            creep.suicide();
                        }
                    }
                }
            }
        }
	}
};

module.exports = roleUpgrader;