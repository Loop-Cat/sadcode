const target_id = '6661713ea596f62ec56c8d3d';
const target_room_name = 'E46S54';
const labsModule = require('labs_list');
const extraMethods = require('extras');
const minimal_ttl = 1450;
const boost_tier = 1;

let matrix = [];

const roleRangedDuo = {
    run: function (creep1, creep2) {
        if (!creep1.memory.spawned || !creep2.memory.spawned) {
            console.log('The duo is sad :(');
            if (creep1 && creep2) {
                if (creep1.ticksToLive < minimal_ttl || creep2.ticksToLive < minimal_ttl) {
                    const spawn = creep1.pos.findClosestByRange(Object.values(Game.spawns));
                    if (creep1.ticksToLive < minimal_ttl) {
                        if (spawn.renewCreep(creep1) == ERR_NOT_IN_RANGE) {
                            creep1.moveTo(spawn);
                        }
                    }
                    if (creep2.ticksToLive < minimal_ttl) {
                        if (spawn.renewCreep(creep2) == ERR_NOT_IN_RANGE) {
                            creep2.moveTo(spawn);
                        }
                    }
                }else{
                    creep1.memory.spawned = true;
                    creep2.memory.spawned = true;
                }
            }
        }else if(!creep1.memory.boosted || !creep2.memory.boosted){
            console.log('The duo is snorting boosts :P')
            if (!creep1.memory.boosted){
                var boost_types = extraMethods.getRequiredBoosts(creep1.body, boost_tier);
                if (boost_types.length > 0){
                    var boost_type = boost_types[0];
                    var lab = labsModule.findLab('E42S55', boost_type);
                    if (lab.boostCreep(creep1) == ERR_NOT_IN_RANGE){
                        creep1.moveTo(lab)
                    }
                }else{
                    creep1.memory.boosted = true;
                }
            }
            
            if (!creep2.memory.boosted){
                var boost_types = extraMethods.getRequiredBoosts(creep2.body, boost_tier);
                if (boost_types.length > 0){
                    var boost_type = boost_types[0];
                    var lab = labsModule.findLab('E42S55', boost_type);
                    if (lab.boostCreep(creep2) == ERR_NOT_IN_RANGE){
                        creep2.moveTo(lab)
                    }
                }else{
                    creep2.memory.boosted = true;
                }
            }
        }else if ((creep1.memory.spawned && creep2.memory.spawned) && (creep1.memory.boosted && creep2.memory.boosted)){
            var target = Game.getObjectById(target_id);
            if (!target){
                console.log('No target. We won?')
                creep1.say('Nya~', true);
                creep2.say('Miaa~', true);
                if (creep1.hits < creep2.hits){
                    creep1.heal(creep1);
                    creep2.heal(creep1);
                }else if (creep2.hits < creep1.hits){
                    creep1.heal(creep1);
                    creep2.heal(creep1);
                }else{
                    creep1.heal(creep1);
                    creep2.heal(creep2);
                }
                var target_room = target_room_name;
            }else{
                var target_room = target.room.name;
            }
            
            if (creep1.room.name != target_room || creep2.room.name != target_room){
                console.log('Duo is walking to the target room :|')
                if (!creep1.pos.isNearTo(creep2) && creep1.room.name == creep2.room.name){
                    creep2.moveTo(creep1, {range: 0});
                    creep1.rangedMassAttack();
                    creep2.rangedMassAttack();
                    creep1.heal(creep1);
                    creep2.heal(creep2);
                }else if (creep1.fatigue == 0 && creep2.fatigue == 0){
                    creep1.moveTo(new RoomPosition(25, 25, target_room));
                    creep1.say('UwU', true);
                }
                creep2.moveTo(creep1, {range: 0});
                creep1.rangedMassAttack();
                creep2.rangedMassAttack();
                creep1.heal(creep1);
                creep2.heal(creep2);
            }else{
                console.log('Duo has engaged the target in combat >:3');
                creep1.say('WAH! WAH!', true);
                creep2.say('WAH! WAH!', true);
                
                if (matrix.length == 0){
                    matrix = extraMethods.enemyMatrix(creep1);
                }
                
                const hostiles = creep1.room.find(FIND_HOSTILE_CREEPS);
                const hostilesInRange_1 = creep1.pos.findInRange(hostiles, 1);
                const hostilesInRange_2 = creep2.pos.findInRange(hostiles, 1);
                
                if (hostilesInRange_1.length > 0 || hostilesInRange_2.length > 0){
                    creep1.rangedMassAttack();
                    creep2.rangedMassAttack();
                }else{
                    var creep1Attack = creep1.rangedAttack(target);
                    var creep2Attack = creep2.rangedAttack(target);
                    var rom = creep1.room.name;
                    
                    if (creep1.pos.isNearTo(creep2) && creep1.fatigue == 0 && creep2.fatigue == 0){
                        if (creep1Attack == ERR_NOT_IN_RANGE && creep2Attack == ERR_NOT_IN_RANGE){
                            creep1.moveTo(target, { range: 3, costCallback(rom, _matrix) { return matrix; }, swampCost: 2, maxRooms: 1 });
                            creep2.moveTo(creep1, { range: 0, costCallback(rom, _matrix) { return matrix; }, swampCost: 2, maxRooms: 1 });
                        }else if (creep1Attack == ERR_NOT_IN_RANGE){
                            creep1.moveTo(target, { range: 3, costCallback(rom, _matrix) { return matrix; }, swampCost: 2, maxRooms: 1 });
                            creep2.moveTo(creep1, { range: 0, costCallback(rom, _matrix) { return matrix; }, swampCost: 2, maxRooms: 1 });
                        }else if (creep2Attack == ERR_NOT_IN_RANGE){
                            creep1.move(RIGHT);
                            creep2.moveTo(target, { range: 3, costCallback(rom, _matrix) { return matrix; }, swampCost: 2, maxRooms: 1 });
                        }
                    }else{
                        creep2.moveTo(creep1, { range: 0, costCallback(rom, _matrix) { return matrix; }, swampCost: 2, maxRooms: 1 });
                    }
                }

                if (creep1.hits < creep2.hits){
                    creep1.heal(creep1);
                    creep2.heal(creep1);
                }else if (creep2.hits < creep1.hits){
                    creep1.heal(creep1);
                    creep2.heal(creep1);
                }else{
                    creep1.heal(creep1);
                    creep2.heal(creep2);
                }
            }
        }
    }
};

module.exports = roleRangedDuo;