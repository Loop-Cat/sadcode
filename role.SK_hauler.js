const roleSKHauler = {

    /** @param {Creep} creep **/
    run: function(creep) {
        const target_room = creep.memory.target_room;
        const original_room = creep.memory.original_room;
        if (creep.ticksToLive < 500 && creep.store.getUsedCapacity() == 0){
            creep.suicide();
        }
        
        if (creep.room.name != original_room && creep.store.getUsedCapacity() > 0){
            creep.moveToRoom(original_room)
        }else if (creep.room.name != target_room && creep.store.getUsedCapacity() == 0){
            creep.moveToRoom(target_room)
        }
        
        if (creep.room.name == target_room){
            if (creep.store.getUsedCapacity() < creep.store.getCapacity()){
                var target = Game.getObjectById('667e8e25a63a030db1fcc971');
                
                if (target && target.room.name == creep.room.name){
                    const resource = Object.keys(target.store)[0];
                    if (creep.withdraw(target, resource) == ERR_NOT_IN_RANGE){
                        creep.moveTo(target, {range:1});
                    }
                }else{
                    const pick_up = creep.room.find(FIND_DROPPED_RESOURCES);
                    if (pick_up[0]){
                        if (creep.pickup(pick_up[0]) == ERR_NOT_IN_RANGE){
                            creep.moveTo(pick_up[0]);
                        }
                    }
                }
            }else{
                creep.moveToRoom(original_room)
            }
        }else if (creep.room.name == original_room){
            if (creep.store.getUsedCapacity() == 0){
                creep.originalMoveTo(new RoomPosition(25, 25, target_room), {maxOps: 1000});
            }else{
                const resource = Object.keys(creep.store)[0];
                if (creep.transfer(creep.room.terminal, resource) == ERR_NOT_IN_RANGE){
                    creep.moveTo(creep.room.terminal, {range:1, reusePath: 10});
                }
            }
        }
	}
};

module.exports = roleSKHauler;