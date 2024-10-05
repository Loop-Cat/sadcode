const _ = require('lodash')

global.Matrix = class {

    constructor(width, height, data = undefined) {
        this.width = width;
        this.height = height;
        this.data = data || new Uint32Array(width * height);
    }

    get(x, y) {
        return this.data[x * this.height + y];
    }

    set(x, y, value) {
        this.data[x * this.height + y] = value;
    }

}

let activeTowers = [];
let defenders = [];
let costMatrix;
let damageMatrix;

const Stronghold = {
    observe: function(roomName, observer){
        observer.observeRoom(roomName)
    },

    updateCache: function(roomName){
        activeTowers = this.getTowers(roomName);
        defenders = this.getDefenders(roomName);
        /*if (!damageMatrix){
            damageMatrix = this.getDamageMatrix(roomName, activeTowers, defenders);
            return
        }*/
        costMatrix = this.getSafeCostMatrix(roomName);
    },

    getTowers: function(roomName){
        const room = Game.rooms[roomName];
        if (!room){return}
        return room.find(FIND_HOSTILE_STRUCTURES, s => s.structureType == STRUCTURE_TOWER);
    },

    getActiveTowers: function(roomName){
        const room = Game.rooms[roomName];
        if (!room) {return}
        return room.find(FIND_HOSTILE_STRUCTURES, s => s.structureType == STRUCTURE_TOWER).filter(t => t.store.energy >= C.TOWER_ENERGY_COST);
    },

    dist: function(a, b) {
        if(a.pos) a = a.pos;
        if(b.pos) b = b.pos;
        return Math.max(Math.abs(a.x - b.x), Math.abs(a.y - b.y));
    },

    calcBodyEffectiveness: function(body, bodyPartType, methodName, basePower, withoutOldHits) {
        var power = 0;
        body.forEach(i => {
            if(!(i.hits || !withoutOldHits && i._oldHits) || i.type != bodyPartType) {
                return;
            }
            var iPower = basePower;
            if(i.boost && BOOSTS[bodyPartType][i.boost] && BOOSTS[bodyPartType][i.boost][methodName]) {
                iPower *= BOOSTS[bodyPartType][i.boost][methodName];
            }
            power += iPower;
        });
        return power;
    },

    getDamage: function(pos, activeTowers, defenders){
        if (!pos) {return}
        const room = Game.rooms[pos.roomName];
        if (!room) {return}
        
        let damage = _.sum(activeTowers, tower => {
            let r = this.dist(pos, tower);
            let amount = TOWER_POWER_ATTACK;
            if(r > TOWER_OPTIMAL_RANGE) {
                if(r > TOWER_FALLOFF_RANGE) {
                    r = TOWER_FALLOFF_RANGE;
                }
                amount -= amount * TOWER_FALLOFF * (r - TOWER_OPTIMAL_RANGE) / (TOWER_FALLOFF_RANGE - TOWER_OPTIMAL_RANGE);
            }
            [PWR_OPERATE_TOWER, PWR_DISRUPT_TOWER].forEach(power => {
                const effect = _.find(tower.effects, {power});
                if(effect && effect.endTime > gameTime) {
                    amount *= POWER_INFO[power].effect[effect.level-1];
                }
            });
            return Math.floor(amount);
        });
        damage += _.sum(defenders, defender => {
            let d = 0;
            if((this.dist(defender, pos) <= 3) && _.some(defender.body, {type: RANGED_ATTACK})) {
                d += this.calcBodyEffectiveness(defender.body, RANGED_ATTACK, 'rangedAttack', RANGED_ATTACK_POWER);
            }
            if((this.dist(defender, pos) <= 1) && _.some(defender.body, {type: ATTACK})) {
                d += this.calcBodyEffectiveness(defender.body, ATTACK, 'attack', ATTACK_POWER);
            }
            return d;
        });

        return damage;
    },

    getDamageMatrix: function(roomName, activeTowers, defenders){
        const room = Game.rooms[roomName];
        if (!room) {return}
        if (activeTowers.length == 0 || defenders.length == 0) {return}
        let matrix = new Matrix(50, 50);
        for (let x = 0; x < 50; x++) {
            for (let y = 0; y < 50; y++) {
                matrix.set(x, y, this.getDamage(room.getPositionAt(x, y), activeTowers, defenders))
            }
        }
        return matrix
    },

    getSpotMatrix: function(roomName, spots){
        let room = Game.rooms[roomName];
        if (!room) {return};
        let matrix = new PathFinder.CostMatrix();
        for (let i in spots){
            matrix.set(spots[i].x, spots[i].y, 123)
        }
        return matrix
    },

    getSafeCostMatrix: function(roomName){
        let room = Game.rooms[roomName];
        if (!room) {return};
        const defenders = room.find(FIND_HOSTILE_CREEPS);
        let terrainData = room.getTerrain();
        let matrix = new PathFinder.CostMatrix();

        for(let x = 0; x < 50; x++) {
            for(let y = 0; y < 50; y++) {
                if(matrix.get(x, y) === 255) {
                    continue;
                }
                if (terrainData.get(x, y) == TERRAIN_MASK_SWAMP) {matrix.set(x, y, 5)}
                if (terrainData.get(x, y) == TERRAIN_MASK_WALL) {matrix.set(x, y, 255)}
            }
        }
        
        let structures = room.find(FIND_STRUCTURES, structure => structure.structureType != STRUCTURE_CONTAINER && structure.structureType != STRUCTURE_ROAD);
        for (let i in structures) {
            let rp = structures[i];
            matrix.set(rp.pos.x, rp.pos.y, 255);
        }

        let creeps = room.find(FIND_CREEPS);
        for (let i in creeps) {
            let rp = creeps[i];
            matrix.set(rp.pos.x, rp.pos.y, 255);
        }
        
        let bait = room.find(FIND_MY_CREEPS, creep => creep.memory.role == 'quad');
        for (let i in bait) {
            let rp = bait[i];
            matrix.set(rp.pos.x - 1, rp.pos.y - 1, 255);
            matrix.set(rp.pos.x - 1, rp.pos.y, 255);
            matrix.set(rp.pos.x, rp.pos.y - 1, 255);
            matrix.set(rp.pos.x + 1, rp.pos.y - 1, 255);
            matrix.set(rp.pos.x + 1, rp.pos.y, 255);
            matrix.set(rp.pos.x, rp.pos.y + 1, 255);
            matrix.set(rp.pos.x - 1, rp.pos.y + 1, 255);
            matrix.set(rp.pos.x + 1, rp.pos.y + 1, 255);
        }

        let ramparts = room.find(FIND_STRUCTURES, structure => structure.structureType == STRUCTURE_RAMPART);
        for (let i in ramparts) {
            let rp = ramparts[i];
            matrix.set(rp.pos.x - 1, rp.pos.y - 1, 255);
            matrix.set(rp.pos.x - 1, rp.pos.y, 255);
            matrix.set(rp.pos.x, rp.pos.y - 1, 255);
            matrix.set(rp.pos.x + 1, rp.pos.y - 1, 255);
            matrix.set(rp.pos.x + 1, rp.pos.y, 255);
            matrix.set(rp.pos.x, rp.pos.y + 1, 255);
            matrix.set(rp.pos.x - 1, rp.pos.y + 1, 255);
            matrix.set(rp.pos.x + 1, rp.pos.y + 1, 255);
        }
        
        for (let i in defenders) {
            let rp = defenders[i];
            if (rp.body.some(part => part.type == RANGED_ATTACK)){
                for (let x = -3; x <= 3; x++) {
                    for (let y = -3; y <= 3; y++) {
                        matrix.set(rp.pos.x + x, rp.pos.y + y, 255);
                    }
                }
            }
        }
        
        return matrix;
    },

    getTargets: function(roomName){
        return Game.rooms[roomName].find(FIND_HOSTILE_STRUCTURES, {filter: s => s.structureType != STRUCTURE_KEEPER_LAIR});
    },

    getSpots: function(roomName, matrix, targets){
        const room = Game.rooms[roomName];
        if (!room) {return}

        let safe = [];
        for(let x = 0; x < 50; x++) {
            for(let y = 0; y < 50; y++) {
                if(matrix.get(x, y) != 255) {
                    safe.push(room.getPositionAt(x, y))
                }
            }
        }
        return safe.filter(s => targets.some(t => s.getRangeTo(t) <= 3))
    },

    findSpot: function(creep, spots){
        return creep.pos.findClosestByPath(spots);
    },
    
    visualizeCostMatrix: function(roomName, matrix) {
        const visual = new RoomVisual(roomName);
        for (let x = 0; x < 50; x++) {
            for (let y = 0; y < 50; y++) {
                const cost = matrix.get(x, y);
                if (cost === 255) {
                    visual.circle(x, y, {radius: 0.25, fill: 'red', opacity: 0.6});
                }else if (cost === 5) {
                    visual.circle(x, y, {radius: 0.2, fill: 'yellow', opacity: 0.4});
                }else if (cost === 1) {
                    visual.circle(x, y, {radius: 0.2, fill: 'blue', opacity: 0.6});
                }
                else if (cost === 123) {
                    visual.circle(x, y, {radius: 0.3, fill: 'blue', opacity: 0.8});
                }
            }
        }
    },

    visualizeDamageMatrix: function(roomName, matrix) {
        const visual = new RoomVisual(roomName);
        for (let x = 0; x < 50; x++) {
            for (let y = 0; y < 50; y++) {
                const damage = matrix.get(x, y);
                visual.circle(x, y, {radius: damage/60000, fill: 'red', opacity: damage/60000});
            }
        }
    },

    run: function(roomName){
        
        if (!Game.rooms[roomName]){
            return;
        }
        this.updateCache(roomName);

        let targets = this.getTargets(roomName);
        let spots = this.getSpots(roomName, costMatrix, targets);
        let m = this.getSpotMatrix(roomName, spots);
        this.visualizeCostMatrix(roomName, m);
        return spots
        //this.visualizeDamageMatrix(roomName, damageMatrix);
    },
};

module.exports = Stronghold;