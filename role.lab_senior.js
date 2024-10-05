const roleLabSenior = {

    /** @param {Creep} creep **/
    run: function(creep) {
        const target_room = creep.memory.target_room;
        if (creep.room.name != target_room){
            creep.moveToRoom(target_room);
            return;
        }else if (creep.ticksToLive < 50 && creep.store.getUsedCapacity() == 0){
            creep.suicide();
        }
        
        const terminal = creep.room.terminal;
        const storage = creep.room.storage;
        const original_compound = labsModule['Reverse_' + creep.room.name][0][1];
        const labs_group_output = labsModule.findAllLabs('Reverse_' + creep.room.name, original_compound);
        const labs_group1 = labs_group_output.filter(lab => lab.store[original_compound] < 2000);
        const labs_group_intake = labsModule.findAllLabs('Reverse_' + creep.room.name, '')
        const labs_group2 = labs_group_intake.filter(lab => lab.mineralType).filter(lab => lab.store[lab.mineralType] > 100);
        
        if (labs_group1.length > 0 && (terminal.store[original_compound] > 0 || creep.store[original_compound] > 0 || storage.store[original_compound] > 0)){
            if (creep.store[original_compound] > 0){
                if (creep.transfer(labs_group1[0], original_compound) == ERR_NOT_IN_RANGE){
                    creep.moveTo(labs_group1[0]);
                }
            }else{
                if (terminal.store[original_compound] > 0){
                    if (creep.withdraw(terminal, original_compound) == ERR_NOT_IN_RANGE){
                        creep.moveTo(terminal);
                    }
                }else{
                    if (creep.withdraw(storage, original_compound) == ERR_NOT_IN_RANGE){
                        creep.moveTo(storage);
                    }
                }
            }
        }else if (labs_group2.length > 0){
            if (creep.store.getUsedCapacity() == 0){
                if (creep.withdraw(labs_group2[0], labs_group2[0].mineralType) == ERR_NOT_IN_RANGE){
                    creep.moveTo(labs_group2[0]);
                }
            }else{
                if (creep.transfer(terminal, Object.keys(creep.store)[0]) == ERR_NOT_IN_RANGE){
                    creep.moveTo(terminal);
                }
            }
        }else if (creep.store.getUsedCapacity() > 0){
            if (creep.transfer(terminal, Object.keys(creep.store)[0]) == ERR_NOT_IN_RANGE){
                creep.moveTo(terminal);
            }
        }
        
        for (var i in labs_group_output){
            const lab = labs_group_output[i];
            lab.reverseReaction(labs_group_intake[0], labs_group_intake[1]);
        }
	}
};

module.exports = roleLabSenior;