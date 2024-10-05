const roleLabTechnician = {

    /** @param {Creep} creep **/
    run: function(creep) {
        const target_room = creep.memory.target_room;
        if (creep.room.name != target_room){
            creep.moveTo(new RoomPosition(25, 25, target_room));
            return;
        }else if (creep.ticksToLive < 50 && creep.store.getUsedCapacity() == 0){
            creep.suicide();
        }
        
        const terminal = creep.room.terminal;
        const storage = creep.room.storage;
        const mineral_1 = labsModule['Forward_' + creep.room.name][0][1];
        const mineral_2 = labsModule['Forward_' + creep.room.name][1][1];
        
        const labs_input_1 = Game.getObjectById(labsModule['Forward_' + creep.room.name][0][0]);
        const labs_input_2 = Game.getObjectById(labsModule['Forward_' + creep.room.name][1][0]);
        const labs_group_output = labsModule.findAllLabs('Forward_' + creep.room.name, '')
        const labs_group_2 = labs_group_output.filter(lab => lab.mineralType).filter(lab => lab.store[lab.mineralType] > 100);

        if (labs_input_1.store[mineral_1] < 2000 && (terminal.store[mineral_1] > 0 || creep.store[mineral_1] > 0 || storage.store[mineral_1] > 0)){
            if (creep.store[mineral_1] > 0){
                if (creep.transfer(labs_input_1, mineral_1) == ERR_NOT_IN_RANGE){
                    creep.moveTo(labs_input_1);
                }
            }else{
                if (terminal.store[mineral_1] > 0){
                    if (creep.withdraw(terminal, mineral_1) == ERR_NOT_IN_RANGE){
                        creep.moveTo(terminal);
                    }
                }else{
                    if (creep.withdraw(storage, mineral_1) == ERR_NOT_IN_RANGE){
                        creep.moveTo(storage);
                    }
                }
            }
        }else if (labs_input_2.store[mineral_2] < 2000 && (terminal.store[mineral_2] > 0 || creep.store[mineral_2] > 0 || storage.store[mineral_2] > 0)){
            if (creep.store[mineral_2] > 0){
                if (creep.transfer(labs_input_2, mineral_2) == ERR_NOT_IN_RANGE){
                    creep.moveTo(labs_input_2);
                }
            }else{
                if (terminal.store[mineral_2] > 0){
                    if (creep.withdraw(terminal, mineral_2) == ERR_NOT_IN_RANGE){
                        creep.moveTo(terminal);
                    }
                }else{
                    if (creep.withdraw(storage, mineral_2) == ERR_NOT_IN_RANGE){
                        creep.moveTo(storage);
                    }
                }
            }
        }else if (labs_group_2.length > 0){
            if (creep.store.getUsedCapacity() == 0){
                if (creep.withdraw(labs_group_2[0], labs_group_2[0].mineralType) == ERR_NOT_IN_RANGE){
                    creep.moveTo(labs_group_2[0]);
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
            lab.runReaction(labs_input_1, labs_input_2);
        }
	}
};

module.exports = roleLabTechnician;