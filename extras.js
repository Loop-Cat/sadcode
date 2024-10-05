const extraMethods = {
    // temporary, only use for fighting creeps
    1: {
        move: 'ZO',
        work: 'ZH',
        attack: 'UH',
        ranged_attack: 'KO',
        tough: 'GO',
        heal: 'LO',
    },
    
    2: {
        move: 'ZHO2',
        work: 'ZH2O',
        attack: 'UH2O',
        ranged_attack: 'KHO2',
        tough: 'GHO2',
        heal: 'LHO2',
    },
    
    3: {
        move: 'XZHO2',
        work: 'XZH2O',
        attack: 'XUH2O',
        ranged_attack: 'XKHO2',
        tough: 'XGHO2',
        heal: 'XLHO2',
    },
    
    isEmpty: function(room_name, x, y){
        const stuffs = Game.rooms[room_name].lookAt(x, y);
        const structures = stuffs.filter(obj => obj.type == 'structure');
        const terrains = stuffs.filter(obj => obj.type == 'terrain');
        if (structures.length > 0){
            for (var i in structures){
                if (structures[i].structure.structureType != STRUCTURE_ROAD && structures[i].structure.structureType != STRUCTURE_CONTAINER){
                    return false;
                }
            }
        }

        if (terrains.length > 0){
            for (var i in terrains){
                if (terrains[i].terrain == 'wall'){
                    return false;
                }
            }
        }

        return true;
    },
    
    getRequiredBoosts: function(body, tier){
        var boost_type_list = [];
        for (var i in body){
            const part = body[i];
            if (!part.boost){
                if (this[tier][part.type]){
                    boost_type_list.push(this[tier][part.type])
                }
            }
        }
        return boost_type_list;
    },
    
    enemyMatrix: function(creep) {
        let room = creep.room;
        let wallMatrix = new PathFinder.CostMatrix();
        let enemyRamparts = room.find(FIND_STRUCTURES, {filter: (structure) => structure.structureType == STRUCTURE_RAMPART});
        let creeps = room.find(FIND_CREEPS);
        for (i in enemyRamparts) {
            let rp = enemyRamparts[i];
            wallMatrix.set(rp.pos.x - 1, rp.pos.y - 1, 255);
            wallMatrix.set(rp.pos.x - 1, rp.pos.y, 255);
            wallMatrix.set(rp.pos.x - 1, rp.pos.y + 1, 255);
            wallMatrix.set(rp.pos.x + 1, rp.pos.y - 1, 255);
            wallMatrix.set(rp.pos.x + 1, rp.pos.y, 255);
            wallMatrix.set(rp.pos.x + 1, rp.pos.y + 1, 255);
            wallMatrix.set(rp.pos.x, rp.pos.y - 1, 255);
            wallMatrix.set(rp.pos.x, rp.pos.y, 255);
            wallMatrix.set(rp.pos.x, rp.pos.y + 1, 255);
        }
        
        return wallMatrix;
    },
    
    formQuadMatrix: function(leader) {
        let room = leader.room;
        let terrainData = room.getTerrain();
        let wallMatrix = new PathFinder.CostMatrix();
        let structures = room.find(FIND_STRUCTURES, {filter: (structure) => structure.structureType != STRUCTURE_ROAD && structure.structureType != STRUCTURE_ROAD});
        for (var i in structures) {
            let rp = structures[i];
            wallMatrix.set(rp.pos.x - 1, rp.pos.y - 1, 255);
            wallMatrix.set(rp.pos.x - 1, rp.pos.y, 255);
            wallMatrix.set(rp.pos.x, rp.pos.y - 2, 255);
            wallMatrix.set(rp.pos.x, rp.pos.y - 1, 255);
        }
        
        let hostiles = room.find(FIND_HOSTILE_CREEPS);
        for (var i in hostiles) {
            let rp = hostiles[i];
            wallMatrix.set(rp.pos.x - 1, rp.pos.y - 1, 255);
            wallMatrix.set(rp.pos.x - 1, rp.pos.y, 255);
            wallMatrix.set(rp.pos.x, rp.pos.y - 2, 255);
            wallMatrix.set(rp.pos.x, rp.pos.y - 1, 255);
        }
        
        let creepss = room.find(FIND_MY_CREEPS, {filter: (creep) => creep.memory.group != leader.memory.group});
        for (let i in creepss) {
            let rp = creepss[i];
            wallMatrix.set(rp.pos.x - 1, rp.pos.y - 1, 255);
            wallMatrix.set(rp.pos.x - 1, rp.pos.y, 255);
            wallMatrix.set(rp.pos.x, rp.pos.y - 2, 255);
            wallMatrix.set(rp.pos.x, rp.pos.y - 1, 255);
        }
        
        //temporary
        let ramparts = room.find(FIND_HOSTILE_STRUCTURES, {filter: (structure) => structure.structureType == STRUCTURE_RAMPART});
        let enemyRamparts = ramparts.filter(rampart => !rampart.isPublic);
        for (var i in enemyRamparts) {
            let rp = enemyRamparts[i];
            wallMatrix.set(rp.pos.x - 2, rp.pos.y - 2, 255);
            wallMatrix.set(rp.pos.x - 1, rp.pos.y - 2, 255);
            wallMatrix.set(rp.pos.x, rp.pos.y - 2, 255);
            wallMatrix.set(rp.pos.x + 1, rp.pos.y - 2, 255);
            wallMatrix.set(rp.pos.x - 2, rp.pos.y - 1, 255);
            wallMatrix.set(rp.pos.x - 1, rp.pos.y - 1, 255);
            wallMatrix.set(rp.pos.x, rp.pos.y - 1, 255);
            wallMatrix.set(rp.pos.x + 1, rp.pos.y - 1, 255);
            wallMatrix.set(rp.pos.x - 2, rp.pos.y, 255);
            wallMatrix.set(rp.pos.x - 1, rp.pos.y, 255);
            wallMatrix.set(rp.pos.x, rp.pos.y, 255);
            wallMatrix.set(rp.pos.x + 1, rp.pos.y, 255);
            wallMatrix.set(rp.pos.x - 2, rp.pos.y + 1, 255);
            wallMatrix.set(rp.pos.x - 1, rp.pos.y + 1, 255);
            wallMatrix.set(rp.pos.x, rp.pos.y + 1, 255);
            wallMatrix.set(rp.pos.x + 1, rp.pos.y + 1, 255);
        }
    
        for(let x = 0; x < 50; x++) {
              for(let y = 0; y < 50; y++) {
                  if(wallMatrix.get(x, y) === 255) {
                      continue;
                  }
                  if(terrainData.get(x, y) === TERRAIN_MASK_WALL) {
                      wallMatrix.set(x, y, 255);
                  } else if(terrainData.get(x + 1, y) === TERRAIN_MASK_WALL) {
                      wallMatrix.set(x, y, 255);
                  } else if(terrainData.get(x, y + 1) === TERRAIN_MASK_WALL) {
                      wallMatrix.set(x, y, 255);
                  } else if(terrainData.get(x + 1, y + 1) === TERRAIN_MASK_WALL) {
                      wallMatrix.set(x, y, 255);
                  } else if(terrainData.get(x, y) === TERRAIN_MASK_SWAMP) {
                      wallMatrix.set(x, y, 5);
                  } else if(terrainData.get(x + 1, y) === TERRAIN_MASK_SWAMP) {
                      wallMatrix.set(x, y, 5);
                  } else if(terrainData.get(x, y + 1) === TERRAIN_MASK_SWAMP) {
                      wallMatrix.set(x, y, 5);
                  } else if(terrainData.get(x + 1, y + 1) === TERRAIN_MASK_SWAMP) {
                      wallMatrix.set(x, y, 5);
                  }
              }
        }
        return wallMatrix;
    },
    
    visualizeCostMatrix: function(roomName, matrix) {
        const visual = new RoomVisual(roomName);
        for (let x = 0; x < 50; x++) {
            for (let y = 0; y < 50; y++) {
                const cost = matrix.get(x, y);
                if (cost === 255) {
                    visual.circle(x, y, {radius: 0.25, fill: 'red', opacity: 0.6});
                } else if (cost === 5) {
                    visual.circle(x, y, {radius: 0.2, fill: 'yellow', opacity: 0.4});
                } else if (cost === 1) {
                    visual.circle(x, y, {radius: 0.1, fill: 'blue', opacity: 0.6});
                }
            }
        }
    }
};

module.exports = extraMethods;