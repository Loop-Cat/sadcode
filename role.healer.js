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
        let hostile_creep = stuffs.filter(obj => obj.type == 'creep').find(object => !object.creep.my);
        if (hostile_structure){
            return hostile_structure.structure;
        }else if (hostile_creep){
            return hostile_creep.creep;
        }
        return;
    },

    smartHeal: function (creep, healing_target){
        if (creep.hits < creep.hitsMax){
            creep.heal(creep);
        }else{
            creep.heal(healing_target);
        }
    },

    autoRangedAttack: function (creep, target){
        const hostiles = creep.room.find(FIND_HOSTILE_CREEPS).filter(crep => creep.pos.getRangeTo(crep) <= 3);
        if (hostiles.length == 0){
            if (target){
                creep.rangedAttack(target);
            }
            return 1;
        }

        if (hostiles.length == 1){
            creep.rangedAttack(hostiles[0]);
            return 0;
        }
        
        creep.rangedMassAttack();
        return 2;
    },

    run: function (creep) {
        const healing_target = Game.creeps[creep.memory.healing_target];
        const point = Game.flags[creep.memory.point];
        if (!healing_target){
            creep.say('No frien..');
            return;
        }

        if (!creep.memory.is_spawned){
            creep.say('Renew!');
            this.renewCreep(creep, healing_target);
            return;
        }

        if (!creep.memory.is_boosted){
            creep.say('Drugs! :3');
            this.boostCreep(creep);
            return;
        }

        // combat behaivor
        creep.say('WOMP!', true)
        if (healing_target.pos.isNearTo(point.pos)){
            creep.moveTo(healing_target, {range: 1});
        }else{
            creep.moveTo(healing_target, {range: 0});
        }
        
        if (creep.room.name == point.pos.roomName){
            this.autoRangedAttack(creep, this.findTarget(point));
        }
        this.smartHeal(creep, healing_target);
    }
};

module.exports = roleHealer;