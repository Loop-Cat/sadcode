const roleRepairer = {
    /*getRepairPowah: function(creep){
        let repair_powah = 0;
        for (let i in creep.body){
            if(creep.body[i].type != 'work'){continue}
            const work = creep.body[i];
            if (work.boost == 'LH'){
                repair_powah += REPAIR_POWER * 1.5
            }else if (work.boost == 'LH2O'){
                repair_powah += REPAIR_POWER * 1.8
            }else if (work.boost == 'LH'){
                repair_powah += REPAIR_POWER * 2
            }else{
                repair_powah += REPAIR_POWER
            }
        }
        return repair_powah;
    },*/

    findRepairTargets: function(creep){
        /*let repair_powah;
        if (!creep.memory.repair_powah){
            const r = this.getRepairPowah(creep);
            creep.memory.repair_powah = r;
            repair_powah = r;
        }else{
            repair_powah = creep.memory.repair_powah;
        }*/
        
        let wall_hp = creep.room.memory.wall_hp;
        if (!wall_hp || wall_hp == 0){
            wall_hp = 1000000;
            creep.room.memory.wall_hp = 1000000;
        }
        const all_structures = creep.room.find(FIND_STRUCTURES);
        for (let i in all_structures){
            const structure = all_structures[i];
            if (structure.structureType == STRUCTURE_ROAD){
                if (structure.hits / structure.hitsMax < 0.8){
                    return structure;
                }
            }else if (structure.structureType == STRUCTURE_CONTAINER){
                if (structure.hits / structure.hitsMax < 0.8){
                    return structure;
                }
            }else if (structure.structureType == STRUCTURE_WALL || structure.structureType == STRUCTURE_RAMPART){
                if (structure.hits < wall_hp){
                    return structure;
                }
            }
        }

        if (wall_hp < 300000000){
            creep.room.memory.wall_hp += 50000;
        }
        
        if (wall_hp > 300000000){
            creep.room.memory.wall_hp == 300000000;
        }

        return 0
    },

    run: function(creep) {
        if (creep.store[RESOURCE_ENERGY] == 0){
            const storage = Game.rooms[creep.room.name].storage;
            if (storage.store[RESOURCE_ENERGY] > 0){
                if (creep.withdraw(storage, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE){
                    creep.moveTo(storage)
                }
            }else{
                const terminal = Game.rooms[creep.room.name].terminal;
                if (creep.withdraw(terminal, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE){
                    creep.moveTo(terminal)
                }
            }
        }else{
            if (creep.memory.cooldown > 0){
                creep.say('Nuh uh :3');
                creep.memory.cooldown = creep.memory.cooldown - 1;
                return;
            }
            
            let target = 0;
            if (creep.memory.target_id){
                target = Game.getObjectById(creep.memory.target_id);
                if (target.hits == target.hitsMax || target.hits > creep.room.memory.wall_hp){
                    target = this.findRepairTargets(creep);
                    if (target && target != 0){
                        creep.memory.target_id = target.id;
                    }
                }
            }else{
                target = this.findRepairTargets(creep);
                if (target != 0){
                    creep.memory.target_id = target.id;
                }else{
                    console.log('No target found');
                    return;
                }
            }

            if (target != 0 && target){
                if (creep.repair(target) == ERR_NOT_IN_RANGE){
                    creep.moveTo(target.pos, {range: 3})
                }
            }
        }
	}
};

module.exports = roleRepairer;