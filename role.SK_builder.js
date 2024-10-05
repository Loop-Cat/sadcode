const roleSKBuilder = {
    run: function(creep) {
        const target_room = creep.memory.target_room;
        if (creep.room.name != target_room){
            creep.moveTo(new RoomPosition(25, 25, target_room));
            return;
        }
        if(creep.memory.working && creep.store[RESOURCE_ENERGY] == 0) {creep.memory.working = false}
	    if(!creep.memory.working && creep.store[RESOURCE_ENERGY] == creep.store.getCapacity()) {creep.memory.working = true}
	    
	    if(creep.memory.working) {
            const targets = creep.room.find(FIND_CONSTRUCTION_SITES);
                    
            if(targets.length) {
                if(creep.build(targets[0]) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(targets[0], {maxRooms: 1});
                }  
            }else{
                const closestDamagedStructure = creep.pos.findClosestByRange(FIND_STRUCTURES, {
                        filter: (structure) => {return(structure.hits < 1000000 && structure.hits < structure.hitsMax)}
                    });
                if(closestDamagedStructure) {
                    if(creep.repair(closestDamagedStructure) == ERR_NOT_IN_RANGE) {
                        creep.moveTo(closestDamagedStructure, {maxRooms: 1});
                    }
                }
            }
        }else{
            const containers = creep.room.find(FIND_STRUCTURES, {
                    filter: (structure) => {
                        return (structure.structureType == STRUCTURE_CONTAINER) && structure.store[RESOURCE_ENERGY] > 500;
                    }
                });
            if (containers.length > 0){
                if(creep.withdraw(containers[0], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(containers[0], {maxRooms: 1}); 
                }
            }else{
                const source = creep.pos.findClosestByPath(FIND_SOURCES);
                const pick_up = creep.room.find(FIND_DROPPED_RESOURCES, {
                    filter: (pick_up) => {
                        return (pick_up.energy > 0);}
                    });

                if (pick_up.length > 0){
                    if(creep.pickup(pick_up[0]) == ERR_NOT_IN_RANGE) {
                        creep.moveTo(pick_up[0], {maxRooms: 1});
                    }
                }else{
                    if(creep.harvest(source) == ERR_NOT_IN_RANGE) {
                        creep.moveTo(source, {maxRooms: 1});
                    }
                }
            }
        }
	}
};

module.exports = roleSKBuilder;