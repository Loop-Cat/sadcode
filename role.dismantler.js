const labsModule = require('labs_list');
const extraMethods = require('extras');

const roleHealer = {
    renewCreep: function(creep, target){
        if (creep.ticksToLive < creep.memory.minimal_ttl || target.ticksToLive < target.memory.minimal_ttl){
            const spawn = creep.pos.findClosestByRange(Object.values(Game.spawns).filter(spawn => !spawn.spawning));
            if (spawn && creep.ticksToLive < creep.memory.minimal_ttl){
                if (spawn.renewCreep(creep) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(spawn);
                }
            }
        }else{
            console.log('The duo is spawned successfully!')
            creep.memory.is_spawned = true;
        }
        return 0;
    },

    boostCreep: function(creep){
        let boost_types = extraMethods.getRequiredBoosts(creep.body, creep.memory.boost_tier);
        if (boost_types.length > 0){
            let boost_type = boost_types[0];
            let lab = labsModule.findLab(creep.room.name, boost_type);
            if (lab){
                if (lab.boostCreep(creep) == ERR_NOT_IN_RANGE){
                    creep.moveTo(lab)
                }
            }else{
                console.log('Not enough boosts or incorrect type');
                return 1;
            }
        }else{
            creep.memory.is_boosted = true;
        }
        return 0;
    },

    findTarget: function(point){
        const stuffs = Game.rooms[point.pos.roomName].lookAt(point.pos.x, point.pos.y);
        let hostile_structure = stuffs.filter(obj => obj.type == 'structure').find(object => !object.structure.my);
        if (hostile_structure){
            return hostile_structure.structure;
        }
        return;
    },

    run: function (creep) {
        const follower = Game.creeps[creep.memory.follower];
        const point = Game.flags[creep.memory.point];
        /*if (!follower){
            creep.say('No frien..');
            return;
        }

        if (!creep.memory.is_spawned){
            creep.say('Renew!');
            this.renewCreep(creep, follower);
            return;
        }

        if (!creep.memory.is_boosted){
            creep.say('Drugs! :3');
            this.boostCreep(creep);
            return;
        }

        // combat behaivor
        if (!creep.pos.isNearTo(follower) && creep.room.name == follower.room.name){
            creep.say('Frien far.');
            return;
        }*/
        if (point){
            if (creep.room.name != point.pos.roomName){
                creep.moveTo(point.pos, {range: 1});
                return;
            }
        }else{
            creep.say('Flag no');
            return;
        }
        
        const target = this.findTarget(point);
        if (target){
            creep.say('WAH!', true)
            if (creep.dismantle(target) == ERR_NOT_IN_RANGE){
                creep.moveTo(target, {range: 1, maxRooms: 1});
            }
        }else{
            creep.say('No target')
            creep.moveTo(point, {range: 0});
        }
    }
};

module.exports = roleHealer;