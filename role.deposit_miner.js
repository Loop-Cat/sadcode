const roleDepositMiner = {
    run: function(creep) {
        const target_room = creep.memory.target_room
        const original_room = creep.memory.original_room

        if (creep.store.getUsedCapacity() == 0){
            if (creep.room.name != target_room){
                creep.moveToRoom(target_room)
            }else{
                const deposit = creep.room.find(FIND_DEPOSITS)[0]
                if (creep.moveTo(deposit, {maxRooms: 1}) == IN_RANGE){
                    creep.harvest(deposit)
                }
            }
        }else if (creep.store.getUsedCapacity() == creep.store.getCapacity()){
            if (creep.room.name != original_room){
                creep.moveToRoom(original_room)
            }else{
                const storage = creep.room.storage
                const resource = Object.keys(creep.store)[0];
                if (creep.moveTo(storage, {maxRooms: 1}) == IN_RANGE){
                    creep.transfer(storage, resource)
                }
            }
        }else{
            creep.say('Waht?')
            if (creep.ticksToLive < 250){
                if (creep.room.name != original_room){
                creep.moveToRoom(original_room)
                }else{
                    const storage = creep.room.storage
                    const resource = Object.keys(creep.store)[0];
                    if (creep.moveTo(storage, {maxRooms: 1}) == IN_RANGE){
                        creep.transfer(storage, resource)
                    }
                }
            }else if (creep.room.name = target_room){
                const deposit = creep.room.find(FIND_DEPOSITS)[0]
                if (creep.moveTo(deposit, {maxRooms: 1}) == IN_RANGE){
                    creep.harvest(deposit)
                }
            }else if (creep.room.name = original_room){
                const storage = creep.room.storage
                const resource = Object.keys(creep.store)[0];
                if (creep.moveTo(storage, {maxRooms: 1}) == IN_RANGE){
                    creep.transfer(storage, resource)
                }
            }else{
                creep.moveToRoom(original_room)
            }
        }
	}
};

module.exports = roleDepositMiner;