const roleReserver = {

    run: function(creep) {
        const target_room = creep.memory.target_room;
        
        if (creep.room.name != target_room){
            creep.moveToRoom(target_room);
        }
        if (creep.room.name == target_room){
            if(creep.reserveController(creep.room.controller) == ERR_NOT_IN_RANGE) {
                if(creep.moveTo(creep.room.controller, {maxRooms: 1}) == ERR_NO_PATH){
                    creep.moveTo(25, 25)
                }
            }
        }
	}
};

module.exports = roleReserver;