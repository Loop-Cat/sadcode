const roleMineralMiner = {

    /** @param {Creep} creep **/
    run: function(creep) {
        const target_room = creep.memory.target_room;
        const mineral_id = creep.memory.mineral_id;
        const container_id = creep.memory.container_id;
        
        if (!creep){
            return
        }
        
        if (creep.room.name != target_room){
            creep.moveToRoom(target_room);
        }else{
            creep.originalMoveTo(Game.getObjectById(container_id));
            if(creep.harvest(Game.getObjectById(mineral_id)) == ERR_NOT_IN_RANGE){
                creep.originalMoveTo(Game.getObjectById(container_id), {range: 0});
            }
        }
	}
};

module.exports = roleMineralMiner;