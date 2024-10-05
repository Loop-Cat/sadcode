const roleRemoteHauler = {
    run: function(creep) {
        const target_room = creep.memory.target_room;
        const original_room = creep.memory.original_room;
        let container = Game.getObjectById(creep.memory.container_id);
        
        if (!container){
            container = creep.room.find(FIND_STRUCTURES).filter(s => s.structureType == STRUCTURE_CONTAINER).find(c => c.store[RESOURCE_ENERGY] > 200)
        }
        
        if (creep.room.name == target_room && creep.store[RESOURCE_ENERGY] == 0){
            if (container){
                if (creep.withdraw(container, RESOURCE_ENERGY, Math.min(container.store[RESOURCE_ENERGY], creep.store.getFreeCapacity())) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(container, {range: 1, reusePath: 15, maxOps: 200});
                }
            }
        }else if (creep.room.name != original_room && creep.store[RESOURCE_ENERGY] > 0){
            creep.moveToRoom(original_room);
        }else if (creep.room.name != target_room && creep.store[RESOURCE_ENERGY] == 0){
            creep.moveToRoom(target_room);
        }else if (creep.room.name == original_room && creep.store[RESOURCE_ENERGY] > 0){
            const storage = creep.room.storage;
            if (storage){
                if (creep.transfer(storage, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE){
                    creep.moveTo(storage, {reusePath: 15, maxRooms: 2, maxOps: 200});
                }
            }
        }
	}
};

module.exports = roleRemoteHauler;