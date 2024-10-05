const roleDeliverer = {

    /** @param {Creep} creep **/
    run: function(creep) {
        const target_room = creep.memory.target_room;
        const original_room = creep.memory.original_room;
        
        if (creep.store[RESOURCE_ENERGY] == 0 && creep.room.name != original_room){
            creep.moveToRoom(original_room);
        }else if(creep.store[RESOURCE_ENERGY] == 0 && creep.room.name == original_room){
            const storage = creep.room.storage;
            if (storage[0].store[RESOURCE_ENERGY] > 50000){
                if (creep.withdraw(storage, RESOURCE_ENERGY, Math.min(creep.store[RESOURCE_ENERGY], storage.store.getFreeCapacity())) == ERR_NOT_IN_RANGE){
                    creep.moveTo(storage);
                }
            }
        }
        
        if (creep.store[RESOURCE_ENERGY] > 0 && creep.room.name != target_room){
            creep.moveToRoom(target_room);
        }else if(creep.store[RESOURCE_ENERGY] > 0){
            const storage = creep.room.storage;
            if (creep.transfer(storage, RESOURCE_ENERGY, Math.min(creep.store[RESOURCE_ENERGY], storage.store.getFreeCapacity())) == ERR_NOT_IN_RANGE){
                creep.moveTo(storage);
            }
        }
	}
};

module.exports = roleDeliverer;