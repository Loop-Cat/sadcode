const towersModule = {
    
    findAllTowers: function(){
        var towers = [];
        for (var i in Game.structures){
            const structure = Game.structures[i];
            if (structure.structureType == STRUCTURE_TOWER){
                towers.push(structure);
            }
        }
        return towers;
    },
    
    findTowers: function(room){
        
    },
    
    run: function(tower){
        const closestHostile = tower.pos.findClosestByRange(FIND_HOSTILE_CREEPS);
        if(closestHostile && !allyModel.isAlly(closestHostile.owner.username)) {
            tower.attack(closestHostile);
            return;
        }
        const structures = tower.room.find(FIND_STRUCTURES)
        let damagedStructures = [];
        for (let i in structures){
            const structure = structures[i];
            if (structure.structureType == STRUCTURE_CONTAINER && structure.hits < structure.hitsMax){
                damagedStructures.push(structure)
            }else if (structure.hits < 2000 && structure.hits < structure.hitsMax){
                damagedStructures.push(structure)
            }
        }
        //console.log(damagedStructures)
        const closestDamagedStructure = tower.pos.findClosestByRange(damagedStructures);
        if(closestDamagedStructure) {
            tower.repair(closestDamagedStructure);
            return;
        }
        
        const closestDamagedCreep = tower.pos.findClosestByRange(FIND_MY_CREEPS, {
            filter: (creep) => {return creep.hits < creep.hitsMax}
        });
        if(closestDamagedCreep) {
            tower.heal(closestDamagedCreep);
            return;
        }
    }
};

module.exports = towersModule;