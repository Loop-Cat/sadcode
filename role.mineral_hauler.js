const roleMineralHauler = {

    /** @param {Creep} creep **/
    run: function(creep) {
        const target_room = creep.memory.target_room;
        const mineral_id = creep.memory.mineral_id;
        const container_id = creep.memory.container_id;
        
        if (creep.room.name != target_room){
            creep.moveToRoom(target_room);
        }else{
            const container = Game.getObjectById(container_id);
            const mineral_type = Game.getObjectById(mineral_id).mineralType;
            if (!container){return}
            if (creep.store[mineral_type] == 0){
                if (creep.withdraw(container, mineral_type, Math.min(container.store[mineral_type], creep.store.getFreeCapacity())) == ERR_NOT_IN_RANGE){
                    creep.moveTo(container);
                }
            }else{
                const storage = creep.room.storage;
                if (creep.transfer(storage, mineral_type, Math.min(creep.store[mineral_type], storage.store.getFreeCapacity())) == ERR_NOT_IN_RANGE){
                    creep.moveTo(storage);
                }
            }
        }
	}
};

module.exports = roleMineralHauler;