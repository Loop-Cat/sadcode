const roleMeleeDefender = {

    /** @param {Creep} creep **/
    run: function(creep) {
        const target_room = creep.memory.target_room;
        
        if (creep.room.name != target_room){
            creep.moveToRoom(target_room);
        }else{
            const closestHostile = creep.pos.findClosestByRange(FIND_HOSTILE_CREEPS);
            const invaderCore = creep.pos.findClosestByRange(FIND_HOSTILE_STRUCTURES, {
                filter: (structure) => {return (structure.structureType == STRUCTURE_INVADER_CORE)}
            });
            
            if (closestHostile) {
                if (creep.attack(closestHostile) == ERR_NOT_IN_RANGE){
                    creep.moveTo(closestHostile, {maxRooms: 1});
                }
            }else if (invaderCore){
                if (creep.attack(invaderCore) == ERR_NOT_IN_RANGE){
                    creep.moveTo(invaderCore, {maxRooms: 1});
                }
            }else{
                creep.say('UwU')
            }
        }
	}
};

module.exports = roleMeleeDefender;