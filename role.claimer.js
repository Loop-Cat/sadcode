const roleClaimer = {

    /** @param {Creep} creep **/
    run: function(creep) {
        const target_room = creep.memory.target_room;
        const target = Game.flags['here1'];
        if (creep.room.name != target_room){
            creep.moveTo(target.pos, {maxOps: 200});
        }else{
            var controller = creep.room.controller;
            if (controller.owner && !controller.my){
                if (creep.attackController(controller) == ERR_NOT_IN_RANGE){
                    creep.moveTo(controller);
                }
            }else{
                if (creep.claimController(controller) == ERR_NOT_IN_RANGE){
                    creep.moveTo(controller);
                }else{
                    creep.signController(controller, "In the silly we trust!");
                }
            }
        }
	}
};

module.exports = roleClaimer;