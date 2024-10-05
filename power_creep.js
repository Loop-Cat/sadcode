const PowerCreep = {
    /*war_cries: ['WAH!', 'WOMP!'],
    idle_phrazes: ['Nya~', 'Mia~', 'Purr~', 'Mhm <3', 'Bleh!', 'Mrr~'],
    cute_faces: [':3', 'UwU', 'OwO', 'O///O', ':)', '^_^', 'XD', 'x3', ';3', ':P', '>_<'],
    angy_faces: ['>:3', '>:(', '>:)', '>:['],

    randomExpression: function(power_creep, pool_name){
        power_creep.say(this[pool_name][Math.floor(Math.random() * this[pool_name].length)], true);
    },

    selectExpression: function(power_creep, pool_name, id){
        power_creep.say(this[pool_name][id], true);
    },
    */
    run: function(power_creep){
        if (power_creep.ticksToLive < 500){
            const power_spawn = power_creep.room.find(FIND_MY_STRUCTURES, {
                filter: structure => structure.structureType == STRUCTURE_POWER_SPAWN
            })[0];
            if (power_creep.moveTo(power_spawn) == IN_RANGE){
                power_creep.renew(power_spawn)
            }
            return;
        }
        
        if (power_creep.powers[PWR_GENERATE_OPS].cooldown == 0){
            power_creep.usePower(PWR_GENERATE_OPS);
        }
        
        const storage = power_creep.room.storage;
        const terminal = power_creep.room.terminal;

        if (power_creep.store.getCapacity - power_creep.store[RESOURCE_OPS] < 100){
            if (power_creep.transfer(storage, RESOURCE_OPS, 100) == ERR_NOT_IN_RANGE){
                power_creep.moveTo(storage);
            }
            return;
        }

        if (power_creep.store[RESOURCE_OPS] <= 150){
            let target;
            if (storage.store[RESOURCE_OPS] > 100){
                target = storage
            }else if (terminal.store[RESOURCE_OPS] > 100){
                target = terminal
            }
            if (target){
                if (power_creep.withdraw(target, RESOURCE_OPS, 100) == ERR_NOT_IN_RANGE){
                    power_creep.moveTo(target);
                }
                return;
            }
        }

        if (power_creep.powers[PWR_OPERATE_EXTENSION]){
            const capacity = power_creep.room.energyCapacityAvailable;
            if (capacity - power_creep.room.energyAvailable > capacity * POWER_INFO[PWR_OPERATE_EXTENSION].effect[power_creep.powers[PWR_OPERATE_EXTENSION].level]){
                if (power_creep.moveTo(storage) == IN_RANGE){
                    power_creep.usePower(PWR_OPERATE_EXTENSION, storage);
                }
            }
        }

        if (power_creep.powers[PWR_OPERATE_LAB]){
            if (power_creep.store[RESOURCE_OPS] >= 100 && power_creep.powers[PWR_OPERATE_LAB].cooldown == 0){
                const all_labs = power_creep.room.find(FIND_STRUCTURES, {
                    filter: (structure) => {return(structure.structureType == STRUCTURE_LAB)}
                })
                let labs = [];
                for (let i in all_labs){
                    const lab = all_labs[i];
                    if (lab.cooldown > 0){
                        if (lab.effects){
                            if (lab.effects.length == 0){
                                labs.push(lab)
                            }
                        }else{
                            labs.push(lab)
                        }
                    }
                }
                
                if (labs.length > 0){
                    if (power_creep.usePower(PWR_OPERATE_LAB, labs[0]) == ERR_NOT_IN_RANGE){
                        power_creep.moveTo(labs[0], {range: 3})
                    }
                }
            }
        }
        
        if (power_creep.powers[PWR_OPERATE_FACTORY]){
            if (power_creep.store[RESOURCE_OPS] >= 100 && power_creep.powers[PWR_OPERATE_FACTORY].cooldown == 0){
                const factory = power_creep.room.find(FIND_STRUCTURES, {
                    filter: (structure) => {return(structure.structureType == STRUCTURE_FACTORY)}
                })[0]
                
                if (factory.effects){
                    if (factory.effects.length > 0){
                        return;
                    }
                    if (power_creep.usePower(PWR_OPERATE_FACTORY, factory) == ERR_NOT_IN_RANGE){
                        power_creep.moveTo(factory, {range: 3})
                    }
                }else{
                    if (power_creep.usePower(PWR_OPERATE_FACTORY, factory) == ERR_NOT_IN_RANGE){
                        power_creep.moveTo(factory, {range: 3})
                    }
                }
            }
        }
	}
};

module.exports = PowerCreep;