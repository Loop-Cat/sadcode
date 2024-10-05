const roleScout = {

    /** @param {Creep} creep **/
    run: function(creep) {
        const target_room = creep.memory.target_room;
        const txt = creep.memory.sign;
        if (txt){
            if (creep.room.name != target_room){
                creep.moveToRoom(target_room);
            }else{
                var controller = creep.room.controller;
                if (creep.signController(controller, txt == ERR_NOT_IN_RANGE)){
                    creep.moveTo(controller);
                }
            }
        }
	}
};

module.exports = roleScout;