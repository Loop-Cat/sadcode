const roleLabUnloader = {

    /** @param {Creep} creep **/
    run: function(creep) {
        const target_room = creep.memory.target_room;
        if (creep.room.name != target_room){
            creep.moveToRoom(target_room);
            return;
        }
        
        if (creep.store.getUsedCapacity() == 0){
            
            const labs = creep.room.find(FIND_STRUCTURES, {
                filter: (structure) => {return(structure.structureType == STRUCTURE_LAB)}
            });
            const targets = labs.filter(lab => lab.mineralType);
            if (targets.length > 0){
                if (creep.withdraw(targets[0], targets[0].mineralType) == ERR_NOT_IN_RANGE){
                    creep.moveTo(targets[0]);
                }
            }
        }else{
            const resource = Object.keys(creep.store)[0];
            const terminal = creep.room.terminal;
            if (creep.transfer(creep.room.terminal, resource) == ERR_NOT_IN_RANGE){
                creep.moveTo(creep.room.terminal);
            }
        }
	}
};

module.exports = roleLabUnloader;