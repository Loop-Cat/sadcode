const allyModel = require('./allyModel');
const roleHarasser = {
    run: function (creep) {
        const hostiles_in_range = creep.room.find(FIND_HOSTILE_CREEPS).filter(crep => creep.pos.getRangeTo(crep) <= 3);
        if (hostiles_in_range.length > 0){
            if (hostiles_in_range.length >= 2){
                creep.rangedMassAttack();
                return
            }

            creep.rangedAttack(hostiles_in_range[0]);
            return;
        }
        
        const point = Game.flags[creep.memory.point];
        if (creep.hits < creep.hitsMax){
            creep.heal(creep);
        }
        
        if (creep.room.name != point.pos.roomName){
            creep.originalMoveTo(point.pos, {maxOps: 1000});
            return;
        }
        const closest_hostile = creep.pos.findClosestByRange(creep.room.find(FIND_HOSTILE_CREEPS));
        if (closest_hostile){
            creep.moveTo(closest_hostile, {range: 3});
        }else{
            if (!creep.room.controller){
                return;
            }
            if (!creep.room.controller.sign){
                if (creep.signController(creep.room.controller, "WAH WAH WOMP WOMP!") == ERR_NOT_IN_RANGE){
                    creep.moveTo(creep.room.controller)
                }
                return;
            }
            if (creep.room.controller.sign.username != 'Loop_Cat'){
                if (creep.signController(creep.room.controller, "WAH WAH WOMP WOMP!") == ERR_NOT_IN_RANGE){
                    creep.moveTo(creep.room.controller)
                }
            }else{
                creep.moveTo(point, {range: 0})
            }
        }
    }
};

module.exports = roleHarasser;