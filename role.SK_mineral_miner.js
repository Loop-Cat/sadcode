const roleMineralMiner = {

    /** @param {Creep} creep **/
    run: function(creep) {
        const target_room = creep.memory.target_room;
        const container = Game.getObjectById(creep.memory.container_id);
        
        if (creep.room.name != target_room){
            creep.moveTo(new RoomPosition(25, 25, target_room));
            return
        }
        
        if(!creep.pos.isEqualTo(container.pos)){
            creep.moveTo(container);
            return;
        }
        const mineral = Game.getObjectById(creep.memory.mineral_id);
        creep.harvest(mineral)
	}
};

module.exports = roleMineralMiner;