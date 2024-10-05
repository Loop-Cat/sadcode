const roleLabIntern = {

    /** @param {Creep} creep **/
    run: function(creep) {
        const target_room = creep.memory.target_room;
        if (creep.room.name != target_room){
            creep.moveToRoom(target_room);
            return;
        }
        
        const terminal = creep.room.terminal;
        const storage = creep.room.storage;
        
        if (creep.ticksToLive < 50 && creep.store.getUsedCapacity() == 0){
            creep.suicide();
        }else if (creep.ticksToLive < 50){
            const resource = Object.keys(creep.store)[0];
            if (creep.transfer(terminal, resource) == ERR_NOT_IN_RANGE){
                creep.originalMoveTo(terminal);
            }
        }
        
        if (creep.store.getUsedCapacity() > 0){
            const boost_type = Object.keys(creep.store)[0];
            const targets = labsModule[creep.room.name];
            var lab_list = [];
            for (var i in targets){
                const lab = Game.getObjectById(targets[i][0]);
                if (!lab.mineralType){
                    lab_list.push(lab)
                }else{
                    if (lab.store[lab.mineralType] < 3000  && creep.store[lab.mineralType] > 0){
                        lab_list.push(lab)
                    }
                }
            }
            if (lab_list.length > 0){
                if (creep.transfer(lab_list[0], boost_type) == ERR_NOT_IN_RANGE){
                    creep.moveTo(lab_list[0])
                }
            }else{
                if (creep.transfer(terminal, Object.keys(creep.store)[0]) == ERR_NOT_IN_RANGE){
                    creep.originalMoveTo(terminal)
                }
            }
        }else{
            const targets = labsModule[creep.room.name];
            var boost_list = [];
            for (var i in targets){
                const lab = Game.getObjectById(targets[i][0]);
                if (terminal.store[targets[i][1]] || storage.store[targets[i][1]]){
                    if (lab.mineralType){
                        if (lab.store[lab.mineralType] < 3000  && (terminal.store[lab.mineralType] > 0 || storage.store[lab.mineralType] > 0 || creep.store[lab.mineralType] > 0)){
                            boost_list.push(targets[i][1])
                        }
                    }else{
                        boost_list.push(targets[i][1])
                    }
                }
            }
            if (boost_list.length > 0){
                if (terminal.store[boost_list[0]]){
                    if (creep.withdraw(terminal, boost_list[0]) == ERR_NOT_IN_RANGE){
                        creep.originalMoveTo(terminal);
                    }
                }else{
                    if (creep.withdraw(storage, boost_list[0]) == ERR_NOT_IN_RANGE){
                        creep.originalMoveTo(storage);
                    }
                }
            }else{
                const pick_up = creep.room.find(FIND_DROPPED_RESOURCES, {filter: (drop => drop.resourceType != 'energy')});
                if (pick_up[0]){
                    if (creep.pickup(pick_up[0]) == ERR_NOT_IN_RANGE){
                        creep.moveTo(pick_up[0]);
                    }
                }
            }
        }
	}
};

module.exports = roleLabIntern;