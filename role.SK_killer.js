const border = 16;
const lin = 30;

const roleSKKiller = {

    /** @param {Creep} creep **/
    run: function(creep) {
        const target_room = creep.memory.target_room;
        
        if (creep.room.name != target_room){
            creep.moveTo(new RoomPosition(25, 25, target_room));
            return;
        }
        const closestHostile = creep.pos.findClosestByRange(FIND_HOSTILE_CREEPS);
        if (closestHostile && closestHostile.pos.x < border && closestHostile.pos.y > lin){
            if (!creep.pos.inRangeTo(closestHostile, 3) && creep.hits < creep.hitsMax){
                creep.heal(creep);
            }else if (closestHostile.pos.x < border && closestHostile.pos.y > lin){
                if (creep.attack(closestHostile) == ERR_NOT_IN_RANGE){
                    creep.moveTo(closestHostile);
                }
            }else{
                const damaged_creeps = creep.room.find(FIND_MY_CREEPS, {
                    filter: (frien) => {return(frien.hits < frien.hitsMax)} 
                });
                if(damaged_creeps.length > 0){
                    if (creep.heal(damaged_creeps[0]) == ERR_NOT_IN_RANGE){
                        creep.moveTo(damaged_creeps[0])
                    }
                }else{
                    creep.moveTo(Game.flags[creep.memory.flag]);
                }
            }
        }else{
            const damaged_creeps = creep.room.find(FIND_MY_CREEPS, {
                filter: (frien) => {return(frien.hits < frien.hitsMax)} 
            });
            if(damaged_creeps.length > 0){
                if (creep.heal(damaged_creeps[0]) == ERR_NOT_IN_RANGE){
                    creep.moveTo(damaged_creeps[0])
                }
            }else{
                creep.moveTo(Game.getObjectById('5bbcaf9e9099fc012e63ae68'))
            }
        }
	}
};

module.exports = roleSKKiller;