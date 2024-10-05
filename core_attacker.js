const { getSafeCostMatrix, getSpots, getTargets } = require("./Stronghold");
const labsModule = require('labs_list');
const extraMethods = require('extras');
const boost_tier = 3;

let matrix;
let spots;
let target_room;
let targets;

const coreAttacker = {
    updateCache: function(roomName){
        const room = Game.rooms[roomName];
        if (!room) {return}
        target_room = roomName;
        matrix = getSafeCostMatrix(roomName);
        targets = getTargets(roomName);
        spots = getSpots(roomName, matrix, targets);
    },
    
    boostCreep: function(creep){
        let boost_types = extraMethods.getRequiredBoosts(creep.body, boost_tier);
        if (boost_types.length > 0){
            let boost_type = boost_types[0];
            let all_labs = creep.room.find(FIND_MY_STRUCTURES, {filter: s => s.structureType == STRUCTURE_LAB}).filter(l => l.store[boost_type] > 0);
            let lab = creep.pos.findClosestByRange(all_labs);
            if (lab){
                console.log(lab.boostCreep(creep))
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

    autoHeal: function(creep){
        if (creep.hits < creep.hitsMax){
            creep.heal(creep)
        }
    },

    autoAttack: function(creep, targets){
        if (creep.room.name != target_room) {return -1}
        const target = creep.pos.findClosestByRange(targets);
        if (creep.pos.inRangeTo(target.pos, 3)){
            creep.rangedAttack(target);
        }else{
            return ERR_NOT_IN_RANGE
        }
    },

    walk: function(creep, spots, matrix){
        if (creep.room.name != target_room) {return -1}
        const rom = creep.room.name;
        const spot = creep.pos.findClosestByRange(spots);
        creep.originalMoveTo(spot, {range: 0, costCallback(rom, _matrix) { return matrix; }, maxRooms: 1});
    },

    run: function (creep) {
        if (!creep.memory.is_boosted){
            this.boostCreep(creep);
            return;
        }

        const room = Game.rooms[target_room];
        if (!matrix || !spots || !room || !targets){
            return;
        }
        
        this.autoHeal(creep);
        if (creep.room.name != target_room){
            creep.moveToRoom(target_room);
            creep.rangedMassAttack();
            return;
        }

        if (this.autoAttack(creep, targets) == ERR_NOT_IN_RANGE){
            this.walk(creep, spots, matrix);
        }
    }
};

module.exports = coreAttacker;