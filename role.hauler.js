const roleHauler = {

    /** @param {Creep} creep **/
    run: function(creep) {
        const target_room = creep.memory.target_room;
        const task = creep.memory.task;
        
        if (creep.room.name != target_room){
            creep.moveTo(new RoomPosition(25, 25, target_room), {maxOps: 200});
            return;
        }
        if (task == 'to_storage'){
            if (creep.store[RESOURCE_ENERGY] < 100){
                const containers = creep.room.find(FIND_STRUCTURES, {
                    filter: (structure) => {
                        return (structure.structureType == STRUCTURE_CONTAINER) && structure.store[RESOURCE_ENERGY] > 500;
                    }
                });
                
                const full_containers = creep.room.find(FIND_STRUCTURES, {
                    filter: (structure) => {
                        return (structure.structureType == STRUCTURE_CONTAINER) && structure.store[RESOURCE_ENERGY] == 2000;
                    }
                });
                
                const pick_up = creep.pos.findClosestByRange(FIND_DROPPED_RESOURCES);
                
                if (full_containers.length > 0){
                    if (creep.withdraw(full_containers[0], RESOURCE_ENERGY, Math.min(full_containers[0].store[RESOURCE_ENERGY], creep.store.getCapacity())) == ERR_NOT_IN_RANGE){
                        creep.moveTo(full_containers[0]);
                    }
                }else if (pick_up){
                    if (pick_up.amount > 50){
                        if (creep.pickup(pick_up) == ERR_NOT_IN_RANGE){
                            creep.moveTo(pick_up);
                        }else{
                            return;
                        }
                    }
                }else if (containers.length > 0){
                    if (creep.withdraw(containers[0], RESOURCE_ENERGY, Math.min(containers[0].store[RESOURCE_ENERGY], creep.store.getCapacity())) == ERR_NOT_IN_RANGE){
                        creep.moveTo(containers[0]);
                    }
                }
            }else{
                const storage = creep.room.storage;
                if (creep.transfer(storage, RESOURCE_ENERGY, Math.min(creep.store[RESOURCE_ENERGY], storage.store.getFreeCapacity())) == ERR_NOT_IN_RANGE){
                    creep.moveTo(storage);
                }
            }
        }else if (task == 'from_storage'){
            if (creep.store[RESOURCE_ENERGY] == 0){
                const storage = creep.room.storage;
                
                if (creep.withdraw(storage, RESOURCE_ENERGY, Math.min(storage.store[RESOURCE_ENERGY], creep.store.getCapacity())) == ERR_NOT_IN_RANGE){
                    creep.originalMoveTo(storage, {maxRooms: 1, maxOps: 200});
                }
            }else{
                
                const targets_1 = creep.room.find(FIND_MY_STRUCTURES, {
                    filter: (structure) => {
                        return (structure.structureType == STRUCTURE_TOWER) &&
                            structure.store[RESOURCE_ENERGY] < 600;
                    }
                });
                
                const targets_2 = creep.room.find(FIND_MY_STRUCTURES, {
                    filter: (structure) => {
                        return (structure.structureType == STRUCTURE_EXTENSION || structure.structureType == STRUCTURE_SPAWN) &&
                            structure.store.getFreeCapacity(RESOURCE_ENERGY) > 0;
                    }
                });
                
                const targets_3 = creep.room.find(FIND_MY_STRUCTURES, {
                    filter: (structure) => {
                        return (structure.structureType == STRUCTURE_LAB) &&
                            structure.store.getFreeCapacity(RESOURCE_ENERGY) > 0;
                    }
                });
                
                if (targets_3.length > 0){
                    var target = creep.pos.findClosestByRange(targets_3);
                    if(target){
                        if (creep.transfer(target, RESOURCE_ENERGY, Math.min(creep.store[RESOURCE_ENERGY], target.store.getFreeCapacity())) == ERR_NOT_IN_RANGE){
                            creep.moveTo(target, {maxRooms: 1, maxOps: 200});
                        }
                    }
                }else if (targets_2.length > 0){
                    var target = creep.pos.findClosestByRange(targets_2);
                    if(target){
                        if (creep.transfer(target, RESOURCE_ENERGY, Math.min(creep.store[RESOURCE_ENERGY], target.store.getFreeCapacity())) == ERR_NOT_IN_RANGE){
                            creep.moveTo(target, {maxRooms: 1, maxOps: 200});
                        }
                    }
                }else if (targets_1.length > 0){
                    var target = creep.pos.findClosestByRange(targets_1);
                    if(target){
                        if (creep.transfer(target, RESOURCE_ENERGY, Math.min(creep.store[RESOURCE_ENERGY], target.store.getFreeCapacity())) == ERR_NOT_IN_RANGE){
                            creep.moveTo(target, {maxRooms: 1, maxOps: 200});
                        }
                    }
                }
            }
        }else{
            if (creep.store[RESOURCE_ENERGY] == 0){
                const containers = creep.room.find(FIND_STRUCTURES, {filter: (structure) => {return (structure.structureType == STRUCTURE_CONTAINER) && structure.store[RESOURCE_ENERGY] > 100}});
                const enrgy = creep.room.find(FIND_DROPPED_RESOURCES, {
                    filter: (pick_up) => {
                        return (pick_up.resourceType == RESOURCE_ENERGY) && pick_up.amount > 200;
                    }
                });
                if (enrgy.length > 0){
                    if (creep.pickup(enrgy[0]) == ERR_NOT_IN_RANGE){
                        creep.moveTo(enrgy[0]);
                    }
                }else if (containers.length > 0){
                    if (creep.withdraw(containers[0], RESOURCE_ENERGY, Math.min(containers[0].store[RESOURCE_ENERGY], creep.store.getCapacity())) == ERR_NOT_IN_RANGE){
                        creep.moveTo(containers[0]);
                    }
                }
                
            }else{
                
                const targets_1 = creep.room.find(FIND_MY_STRUCTURES, {
                    filter: (structure) => {
                        return (structure.structureType == STRUCTURE_TOWER) &&
                            structure.store[RESOURCE_ENERGY] < 600;
                    }
                });
                
                const targets_2 = creep.room.find(FIND_MY_STRUCTURES, {
                    filter: (structure) => {
                        return (structure.structureType == STRUCTURE_EXTENSION || structure.structureType == STRUCTURE_SPAWN) &&
                            structure.store.getFreeCapacity(RESOURCE_ENERGY) > 0;
                    }
                });
                
                const targets_3 = creep.room.find(FIND_MY_STRUCTURES, {
                    filter: (structure) => {
                        return (structure.structureType == STRUCTURE_STORAGE) &&
                            structure.store.getFreeCapacity(RESOURCE_ENERGY) > 0;
                    }
                });
                
                if (targets_1.length > 0){
                    if (creep.transfer(targets_1[0], RESOURCE_ENERGY, Math.min(creep.store[RESOURCE_ENERGY], targets_1[0].store.getFreeCapacity())) == ERR_NOT_IN_RANGE){
                        creep.moveTo(targets_1[0]);
                    }
                }else if (targets_2.length > 0){
                    if (creep.transfer(targets_2[0], RESOURCE_ENERGY, Math.min(creep.store[RESOURCE_ENERGY], targets_2[0].store.getFreeCapacity())) == ERR_NOT_IN_RANGE){
                        creep.moveTo(targets_2[0]);
                    }
                }else if (targets_3.length > 0){
                    if (creep.transfer(targets_3[0], RESOURCE_ENERGY, Math.min(creep.store[RESOURCE_ENERGY], targets_3[0].store.getFreeCapacity())) == ERR_NOT_IN_RANGE){
                        creep.moveTo(targets_3[0]);
                    }
                }
            }
        }
	}
};

module.exports = roleHauler;