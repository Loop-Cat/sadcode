const labsModule = require('labs_list');
const extraMethods = require('extras');
const allyModel = require('./allyModel');
const QuadV2 = {
    war_cries: ['WAH!', 'WOMP!'],
    idle_phrazes: ['Nya~', 'Mia~', 'Purr~', 'Mhm <3', 'Bleh!', 'Mrr~'],
    cute_faces: [':3', 'UwU', 'OwO', 'O///O', ':)', '^_^', 'XD', 'x3', ';3', ':P', '>_<'],
    angy_faces: ['>:3', '>:(', '>:)', '>:['],

    randomExpression: function(creeps, pool_name){
        for (var i in creeps){
            const creep = creeps[i];
            creep.say(this[pool_name][Math.floor(Math.random() * this[pool_name].length)], true);
        }
    },

    boostCreeps: function(creeps){
        console.log('The quad is boosting.');
        for (var i in creeps){
            const creep = creeps[i];
            var boost_types = extraMethods.getRequiredBoosts(creep.body, creep.memory.boost_tier);
            if (boost_types.length > 0){
                var boost_type = boost_types[0];
                var lab = labsModule.findLab(creep.room.name, boost_type);
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
        }
        return 0;
    },

    renewCreeps: function(creeps){
        if (creeps.find(creep => {return creep.spawning})){
            console.log('The quad is spawning');
            return;
        }

        if (creeps.some(creep => creep.ticksToLive < creep.memory.minimal_ttl)){
            console.log('The quad is renewing');
            for (let i in creeps){
                const creep = creeps[i];
                if (creep.ticksToLive >= creep.memory.minimal_ttl){
                    continue;
                }
                const spawn = creep.pos.findClosestByRange(Object.values(Game.spawns).filter(spawn => !spawn.spawning));
                if (spawn){
                    if (spawn.renewCreep(creep) == ERR_NOT_IN_RANGE) {
                        creep.moveTo(spawn);
                    }
                }
            }
        }else{
            for (var i in creeps){
                console.log('The quad is spawned successfully!')
                creeps[i].memory.is_spawned = true;
            }
        }
        return 0;
    },

    snake: function (leader, followers, creeps, target) {
        if (leader.pos.isEqualTo(target.pos)){
            console.log('The quad has reached the target.')
            return 1
        }

        if (!creeps.some(creep => creep.fatigue > 0)){
            const middle = creeps.filter(creep => creep.pos.findInRange(creeps, 1).length == creeps.length - 1);
            if (middle.length >= 2 || followers.some(creep => creep.room.name != leader.room.name)){
                console.log('The quad is snaking.');
                leader.moveTo(target.pos, {range: 0, priority: 2000});
            }

            for (let i in followers){
                const creep = followers[i];
                if (i == 0){
                    creep.moveTo(leader, {range: 0});
                }else{
                    creep.moveTo(followers[i - 1], {range: 0})
                }
            }
        }else{
            console.log('The quad is tired');
            return -1
        }
    },

    formQuadMatrix: function(leader) {
        let room = leader.room;
        let terrainData = room.getTerrain();
        let wallMatrix = new PathFinder.CostMatrix();
        let structures = room.find(FIND_STRUCTURES, {filter: (structure) => structure.structureType != STRUCTURE_CONTAINER && structure.structureType != STRUCTURE_ROAD});
        for (let i in structures) {
            let rp = structures[i];
            wallMatrix.set(rp.pos.x - 1, rp.pos.y - 1, 255);
            wallMatrix.set(rp.pos.x - 1, rp.pos.y, 255);
            wallMatrix.set(rp.pos.x, rp.pos.y - 2, 255);
            wallMatrix.set(rp.pos.x, rp.pos.y - 1, 255);
        }
        
        /*let creepss = room.find(FIND_MY_CREEPS, {filter: (creep) => creep.memory.group != leader.memory.group});
        for (let i in creepss) {
            let rp = creepss[i];
            wallMatrix.set(rp.pos.x - 1, rp.pos.y - 1, 255);
            wallMatrix.set(rp.pos.x - 1, rp.pos.y, 255);
            wallMatrix.set(rp.pos.x, rp.pos.y - 2, 255);
            wallMatrix.set(rp.pos.x, rp.pos.y - 1, 255);
        }
        
        let creeps = room.find(FIND_HOSTILE_CREEPS);
        for (let i in creeps) {
            let rp = creeps[i];
            wallMatrix.set(rp.pos.x - 1, rp.pos.y - 1, 255);
            wallMatrix.set(rp.pos.x - 1, rp.pos.y, 255);
            wallMatrix.set(rp.pos.x, rp.pos.y - 2, 255);
            wallMatrix.set(rp.pos.x, rp.pos.y - 1, 255);
        }*/
        //temporary
        /*let ramparts = room.find(FIND_HOSTILE_STRUCTURES, {filter: (structure) => structure.structureType == STRUCTURE_RAMPART});
        let enemyRamparts = ramparts.filter(rampart => !rampart.isPublic);
        for (let i in enemyRamparts) {
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
        }*/
    
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

    findHostilesNear: function(creeps){
        const hostile_creeps = creeps[0].room.find(FIND_HOSTILE_CREEPS);
        let hostiles_in_range_3 = [];
        for (let i in creeps){
            const hostilesInRange_3 = creeps[i].pos.findInRange(hostile_creeps, 2);
            if (hostilesInRange_3.length > 0){
                for (let i2 in hostilesInRange_3){
                    if (allyModel.isAlly(hostilesInRange_3[i2].owner.username)){
                        hostiles_in_range_3.push(hostilesInRange_3[i2]);
                    }
                }
            }
        }
        return hostiles_in_range_3
    },

    findTarget: function(point){
        const stuffs = Game.rooms[point.pos.roomName].lookAt(point.pos.x, point.pos.y);
        let hostile_structure = stuffs.filter(obj => obj.type == 'structure').find(object => !object.structure.my);
        let hostile_creep = stuffs.filter(obj => obj.type == 'creep').find(object => !object.creep.my);
        if (hostile_structure){
            return hostile_structure.structure;
        }/*else if (hostile_creep){
            return hostile_creep.creep;
        }*/
        return;
    },

    getDistanceToTarget: function(creeps, point){
        let max = 0;
        for (let i in creeps){
            const thing = creeps[i].pos.getRangeTo(point.pos)
            if (max < thing){
                max = thing
            }
        }
        return max
    },

    allHeal: function(creeps){
        for (let i in creeps){
            creeps[i].heal(creeps[i]);
        }
    },

    getDamage: function(creeps){
        let damage = 0;
        for (let i in creeps){
            damage += creeps[i].hitsMax - creeps[i].hits;
        }
        return damage
    },

    getLeader: function(creeps){
        return creeps.find(creep => {return creep.memory.is_leader});
    },

    getFollowers: function(creeps){
        return creeps.filter(creep => {return !creep.memory.is_leader});
    },

    getHealers: function(creeps){
        return creeps.filter(creep => creep.body.some(part => part.type == 'heal'));
    },

    getDismantlers: function(creeps){
        return creeps.filter(creep => creep.body.some(part => part.type == 'work'));
    },

    quadFormationCheck: function(creeps, point){
        return true
        for (let i in creeps){
            if(!creeps[i] || !point){
                return false
            }
            if (creeps[i].room.name != point.pos.roomName || 
                creeps[i].pos.x == 49 ||
                creeps[i].pos.y == 49 ||
                creeps[i].pos.x == 0 ||
                creeps[i].pos.y == 0){
                return false;
            }
            if (creeps[i].pos.x + 1 > 49 || creeps[i].pos.y + 1 > 49){
                return false;
            }
        }
        for (let i in creeps){
            const creep = creeps[i];
            const location_1 = creep.room.getPositionAt(creep.pos.x + 1, creep.pos.y).lookFor(LOOK_CREEPS).filter(crep => crep.memory.group == creep.memory.group);
            const location_2 = creep.room.getPositionAt(creep.pos.x, creep.pos.y + 1).lookFor(LOOK_CREEPS).filter(crep => crep.memory.group == creep.memory.group);
            const location_3 = creep.room.getPositionAt(creep.pos.x + 1, creep.pos.y + 1).lookFor(LOOK_CREEPS).filter(crep => crep.memory.group == creep.memory.group);
            if (location_1.length == 1 && location_2.length == 1 && location_3.length == 1){
                return true;
            }
        }

        return false;
    },

    assembleQuad: function(leader, followers, creeps){
        //leader.move(LEFT);
        if (creeps.length != 4){
            console.log('Invalid creep count for a quad.');
            return -1;
        }

        if (extraMethods.isEmpty(leader.room.name, leader.pos.x + 1, leader.pos.y) &&
            extraMethods.isEmpty(leader.room.name, leader.pos.x, leader.pos.y + 1) &&
            extraMethods.isEmpty(leader.room.name, leader.pos.x + 1, leader.pos.y + 1)
        ){
            const quad_coordinates = [
                leader.room.getPositionAt(leader.pos.x, leader.pos.y),
                leader.room.getPositionAt(leader.pos.x + 1, leader.pos.y),
                leader.room.getPositionAt(leader.pos.x, leader.pos.y + 1),
                leader.room.getPositionAt(leader.pos.x + 1, leader.pos.y + 1)
            ];

            if (this.quadFormationCheck(creeps)){
                console.log('Quad assembled successfully!');
                return 0;
            }
            
            const lonely_creeps = followers.filter(creep => {return this.inFormation(creep, creeps) == false});
            const free_spots = quad_coordinates.filter(spot => leader.room.lookForAt(LOOK_CREEPS, spot.x, spot.y).length == 0);
            if (lonely_creeps.length == free_spots.length){
                for (var i in lonely_creeps){
                    const creep = lonely_creeps[i];
                    creep.originalMoveTo(free_spots[i], {range: 0, maxRooms: 1});
                }
                return 1;
            }else{
                console.log('Cannot assemble the quad. Creeps out of place:', lonely_creeps, '; free spots:', free_spots);
                return -2;
            }
        }else{
            leader.move(TOP);
        }
    },
    
    inFormation: function(creep, creeps){
        const leader = creeps.find(creep => {return creep.memory.is_leader});
        if (!leader){
            return
        }
        const followers = creeps.filter(creep => {return !creep.memory.is_leader});
        if (!(creep.pos.x == leader.pos.x) && !(creep.pos.x == leader.pos.x + 1)){
            return false;
        }else if (!(creep.pos.y == leader.pos.y) && !(creep.pos.y == leader.pos.y + 1)){
            return false;
        }
        return true
    },

    asignLeader: function(creeps, point){
        if (this.quadFormationCheck(creeps, point) && creeps[0].room.name == point.pos.roomName){
            for (let i in creeps){
                const creep = creeps[i];
                const location_1 = creep.room.getPositionAt(creep.pos.x + 1, creep.pos.y).lookFor(LOOK_CREEPS).filter(crep => crep.my).filter(crep => crep.memory.group == creep.memory.group);
                const location_2 = creep.room.getPositionAt(creep.pos.x, creep.pos.y + 1).lookFor(LOOK_CREEPS).filter(crep => crep.my).filter(crep => crep.memory.group == creep.memory.group);
                const location_3 = creep.room.getPositionAt(creep.pos.x + 1, creep.pos.y + 1).lookFor(LOOK_CREEPS).filter(crep => crep.my).filter(crep => crep.memory.group == creep.memory.group);
                if (location_1.length == 1 && location_2.length == 1 && location_3.length == 1){
                    for (let i2 in creeps){
                        creeps[i2].memory.is_leader = false;
                    }
                    creep.memory.is_leader = true;
                    break;
                }
            }
        }else{
            for (let i in creeps){
                creeps[i].memory.is_leader = false;
            }
            creeps[0].memory.is_leader = true;
        }

        return 0
    },

    quadRangedAttack: function (creeps, target){
        let attempts = [];
        if (target){
            for (var i in creeps){
                attempts.push(creeps[i].rangedAttack(target));
            }
        }else{
            console.log('Invalid target');
            return -1;
        }
        if (attempts.some(result => result == ERR_NOT_IN_RANGE)){
            console.log('Not in range');
            return ERR_NOT_IN_RANGE;
        }
        return 0;
    },

    quadDismantle: function (damagers, target){
        let attempts = [];
        if (target){
            for (var i in damagers){
                attempts.push(damagers[i].dismantle(target));
            }
        }else{
            console.log('Invalid target');
            return -1;
        }
        if (attempts.some(result => result == ERR_NOT_IN_RANGE)){
            console.log('Not in range');
            return ERR_NOT_IN_RANGE;
        }
        return 0;
    },

    quadRangedMassAttack: function (creeps){
        for (let i in creeps){
            creeps[i].rangedMassAttack();
        }
    },

    quadHeal: function (creeps){
        let damagedCreeps = creeps.filter(creep => creep.hits < creep.hitsMax);
        if (damagedCreeps.length > 0){
            let damagedCreepsSorted = damagedCreeps.sort((a, b) => {
                return a.hits - b.hits;
            });
            for (var i in creeps){
                creeps[i].heal(damagedCreepsSorted[0]);
            }
        }else{
            for (var i in creeps){
                creeps[i].heal(creeps[i]);
            }
        }
    },

    quadMove: function (leader, creeps, target){
        /*if (!this.quadFormationCheck(creeps, target)){
            console.log("Quad is not in formation.");
            return -1;
        }*/

        if (target.room.name != leader.room.name){
            console.log("The target is in another room.");
            return -2;
        }

        if (creeps.some(creep => creep.fatigue > 0)){
            console.log("Fatigue over 0.");
            return -3;
        }

        const rom = leader.room.name;
        const matrix = this.formQuadMatrix(leader);
        const path = leader.room.findPath(leader.pos, target.pos, { range: 0, costCallback(rom, _matrix) { return matrix; }, maxRooms: 1 });
        if (path.length > 0){
            for (var i in creeps){
                creeps[i].move(path[0].direction);
            }
        }
    },

    quadGetDirection: function (damagers, leader){
        if (damagers.length != 2){
            console.log("Bad args");
            return -1;
        }

        if ((damagers[0].pos.x != damagers[1].pos.x) && (damagers[0].pos.y != damagers[1].pos.y)){
            console.log("Invalid position");
            return -2;
        }

        const quad_coordinates = [
            leader.room.getPositionAt(leader.pos.x, leader.pos.y),
            leader.room.getPositionAt(leader.pos.x + 1, leader.pos.y),
            leader.room.getPositionAt(leader.pos.x, leader.pos.y + 1),
            leader.room.getPositionAt(leader.pos.x + 1, leader.pos.y + 1)
        ];

        if (damagers[0].pos.isEqualTo(quad_coordinates[0]) && damagers[1].pos.isEqualTo(quad_coordinates[1])) {return TOP}
        if (damagers[1].pos.isEqualTo(quad_coordinates[0]) && damagers[0].pos.isEqualTo(quad_coordinates[1])) {return TOP}

        if (damagers[0].pos.isEqualTo(quad_coordinates[0]) && damagers[1].pos.isEqualTo(quad_coordinates[2])) {return LEFT}
        if (damagers[1].pos.isEqualTo(quad_coordinates[0]) && damagers[0].pos.isEqualTo(quad_coordinates[2])) {return LEFT}

        if (damagers[0].pos.isEqualTo(quad_coordinates[1]) && damagers[1].pos.isEqualTo(quad_coordinates[3])) {return RIGHT}
        if (damagers[1].pos.isEqualTo(quad_coordinates[1]) && damagers[0].pos.isEqualTo(quad_coordinates[3])) {return RIGHT}

        if (damagers[0].pos.isEqualTo(quad_coordinates[2]) && damagers[1].pos.isEqualTo(quad_coordinates[3])) {return BOTTOM}
        if (damagers[1].pos.isEqualTo(quad_coordinates[2]) && damagers[0].pos.isEqualTo(quad_coordinates[3])) {return BOTTOM}

        return -123123123;
    },

    quadFindDirection: function (damagers, target){
        if (damagers.length != 2){
            console.log("Bad args");
            return -1;
        }

        if ((damagers[0].pos.x != damagers[1].pos.x) && (damagers[0].pos.y != damagers[1].pos.y)){
            console.log("Invalid position");
            return -2;
        }
        
        const direction1 = damagers[0].pos.getDirectionTo(target);
        const direction2 = damagers[1].pos.getDirectionTo(target);

        if (direction1 == direction2){return direction1}
        if (direction1 == LEFT && (direction2 == TOP_LEFT || direction2 == BOTTOM_LEFT)){return LEFT}
        if (direction2 == LEFT && (direction1 == TOP_LEFT || direction1 == BOTTOM_LEFT)){return LEFT}

        if (direction1 == RIGHT && (direction2 == TOP_RIGHT || direction2 == BOTTOM_RIGHT)){return RIGHT}
        if (direction2 == RIGHT && (direction1 == TOP_RIGHT || direction1 == BOTTOM_RIGHT)){return RIGHT}

        if (direction1 == BOTTOM && (direction2 == BOTTOM_LEFT || direction2 == BOTTOM_RIGHT)){return BOTTOM}
        if (direction2 == BOTTOM && (direction1 == BOTTOM_LEFT || direction1 == BOTTOM_RIGHT)){return BOTTOM}

        if (direction1 == TOP && (direction2 == TOP_LEFT || direction2 == TOP_RIGHT)){return TOP}
        if (direction2 == TOP && (direction1 == TOP_LEFT || direction1 == TOP_RIGHT)){return TOP}
        return -2346
    },

    quadTurn: function(creeps, clockwise){
        if (creeps.some(creep => creep.fatigue > 0)){
            console.log("Fatigue over 0.");
            return -3;
        }

        const leader = creeps.find(creep => {return creep.memory.is_leader});
        const quad_coordinates = [
            leader.room.getPositionAt(leader.pos.x, leader.pos.y),
            leader.room.getPositionAt(leader.pos.x + 1, leader.pos.y),
            leader.room.getPositionAt(leader.pos.x, leader.pos.y + 1),
            leader.room.getPositionAt(leader.pos.x + 1, leader.pos.y + 1)
        ];
        let quad_sorted = [{}, {}, {}, {}];
        for (var i in quad_coordinates){
            for (var i2 in creeps){
                if (creeps[i2].pos.isEqualTo(quad_coordinates[i])){
                    quad_sorted[i] = creeps[i2];
                }
            }
        }

        if (clockwise){
            quad_sorted[0].move(RIGHT);
            quad_sorted[1].move(BOTTOM);
            quad_sorted[2].move(TOP);
            quad_sorted[3].move(LEFT);
        }else{
            quad_sorted[0].move(BOTTOM);
            quad_sorted[1].move(LEFT);
            quad_sorted[2].move(RIGHT);
            quad_sorted[3].move(TOP);
        }
    },

    quadShift: function (creeps){
        if (creeps.some(creep => creep.fatigue > 0)){
            console.log("Fatigue over 0.");
            // add pulling logic... later
            return -3;
        }
        
        const leader = creeps.find(creep => {return creep.memory.is_leader});
        const quad_coordinates = [
            leader.room.getPositionAt(leader.pos.x, leader.pos.y),
            leader.room.getPositionAt(leader.pos.x + 1, leader.pos.y),
            leader.room.getPositionAt(leader.pos.x, leader.pos.y + 1),
            leader.room.getPositionAt(leader.pos.x + 1, leader.pos.y + 1)
        ];
        let quad_sorted = [{}, {}, {}, {}];
        for (var i in quad_coordinates){
            for (var i2 in creeps){
                if (creeps[i2].pos.isEqualTo(quad_coordinates[i])){
                    quad_sorted[i] = creeps[i2];
                }
            }
        }
        quad_sorted[0].move(BOTTOM_RIGHT);
        quad_sorted[1].move(BOTTOM_LEFT);
        quad_sorted[2].move(TOP);
        quad_sorted[3].move(TOP);
    },

    quadFlip: function (creeps, horizontal){
        if (creeps.some(creep => creep.fatigue > 0)){
            console.log("Fatigue over 0.");
            // add pulling logic... later
            return -3;
        }

        const leader = creeps.find(creep => {return creep.memory.is_leader});
        const quad_coordinates = [
            leader.room.getPositionAt(leader.pos.x, leader.pos.y),
            leader.room.getPositionAt(leader.pos.x + 1, leader.pos.y),
            leader.room.getPositionAt(leader.pos.x, leader.pos.y + 1),
            leader.room.getPositionAt(leader.pos.x + 1, leader.pos.y + 1)
        ];
        let quad_sorted = [{}, {}, {}, {}];
        for (var i in quad_coordinates){
            for (var i2 in creeps){
                if (creeps[i2].pos.isEqualTo(quad_coordinates[i])){
                    quad_sorted[i] = creeps[i2];
                }
            }
        }

        if (horizontal){
            quad_sorted[0].move(BOTTOM);
            quad_sorted[1].move(BOTTOM);
            quad_sorted[2].move(TOP);
            quad_sorted[3].move(TOP);
        }else{
            quad_sorted[0].move(RIGHT);
            quad_sorted[1].move(LEFT);
            quad_sorted[2].move(RIGHT);
            quad_sorted[3].move(LEFT);
        }
    },

    quadSquirm: function (direction, desired_direction, creeps){
        if (direction == desired_direction){return -1512}

        if ((direction == TOP && desired_direction == BOTTOM) || (direction == BOTTOM && desired_direction == TOP)){
            this.quadFlip(creeps, true);
            return 0;
        }
        if ((direction == RIGHT && desired_direction == LEFT) || (direction == LEFT && desired_direction == RIGHT)){
            this.quadFlip(creeps, false);
            return 0;
        }

        this.quadTurn(creeps, true);
    },
    
    run: function (creeps) {
        if (creeps.find(creep => {return !creep.memory.is_spawned})){
            this.renewCreeps(creeps);
            return;
        }
        
        if (creeps.find(creep => {return !creep.memory.is_boosted})){
            this.boostCreeps(creeps);
            return;
        }
        
        const leader = this.getLeader(creeps);
        
        const followers = this.getFollowers(creeps);

        const laser_pointer = leader.memory.point;
        const point = Game.flags[laser_pointer];
        this.asignLeader(creeps, point);
        
        if (leader.memory.blinky){
            // same body type logic
            //this.allHeal(creeps);
            //this.quadRangedMassAttack(creeps);
            if (!point){
                this.randomExpression(creeps, 'cute_faces');
                this.allHeal(creeps);
                return -123;
            }

            if (creeps.some(creep => creep.room.name != point.pos.roomName)){
                this.randomExpression(creeps, 'idle_phrazes');
                this.snake(leader, followers, creeps, point);
                this.quadRangedMassAttack(creeps);
                this.allHeal(creeps);
                console.log()
                return 1;
            }

            if (!this.quadFormationCheck(creeps, point)){
                this.randomExpression(creeps, 'angy_faces');
                this.assembleQuad(leader, followers, creeps);
                this.quadHeal(creeps);
                //this.quadRangedAttack(creeps, Game.getObjectById('666edba08f3a3c68199e4f0c'));
                this.quadRangedMassAttack(creeps);

                return 2;
            }

            const target = this.findTarget(point);
            this.randomExpression(creeps, 'war_cries');
            if (!target){
                if (this.getDistanceToTarget(creeps, point) > 3){
                    this.quadMove(leader, creeps, point);
                }
                this.quadHeal(creeps);
                this.quadRangedMassAttack(creeps);
                return 3;
            }
            /*this.snake(leader, followers, creeps, point);
            this.quadHeal(creeps);
            this.quadRangedMassAttack(creeps);
            //this.quadRangedAttack(creeps, target);
            //this.quadMove(leader, creeps, point);
            return;*/
            if (this.findHostilesNear(creeps).length > 0){
                this.quadRangedMassAttack(creeps);
                this.quadHeal(creeps);
                return 4;
            }
            if (this.getDistanceToTarget(creeps, point) > 3){
                this.quadMove(leader, creeps, target);
                //this.snake(leader, followers, creeps, point);
                this.quadRangedMassAttack(creeps);
            }else{
                this.quadRangedAttack(creeps, target);
                //this.quadShift(creeps);
            }
            this.quadHeal(creeps);
        }else{
            // split logic for dismantlers
            const dismantlers = this.getDismantlers(creeps);
            const healers = this.getHealers(creeps);

            const point = Game.flags[laser_pointer];
            if (!point){
                this.randomExpression(creeps, 'cute_faces');
                this.allHeal(creeps);
                return -123;
            }

            if (creeps.some(creep => creep.room.name != point.pos.roomName)){
                this.randomExpression(creeps, 'idle_phrazes');
                this.snake(leader, followers, creeps, point);
                if (this.findHostilesNear(creeps).length > 0){
                    this.quadRangedMassAttack(creeps);
                }

                if (this.getDamage(creeps) > 0){
                    this.allHeal(creeps);
                }

                return 1;
            }

            if (!this.quadFormationCheck(creeps, point)){
                this.randomExpression(creeps, 'angy_faces');
                this.assembleQuad(leader, followers, creeps);
                this.quadHeal(creeps);

                if (this.findHostilesNear(creeps).length > 0){
                    this.quadRangedMassAttack(creeps);
                }

                return 2;
            }

            const target = this.findTarget(point);
            this.randomExpression(creeps, 'war_cries');
            if (!target){
                if (this.getDistanceToTarget(creeps, point) > 3){
                    this.quadMove(leader, creeps, point);
                }
                this.quadHeal(creeps);

                if (this.findHostilesNear(creeps).length > 0){
                    this.quadRangedMassAttack(creeps);
                }
                return 3;
            }
            
            if (this.getDistanceToTarget(dismantlers, point) > 1){
                this.quadMove(leader, creeps, target);
            }else{
                const direction = this.quadGetDirection(dismantlers, leader);
                const desired_direction = this.quadFindDirection(dismantlers, target);
                console.log(direction, desired_direction)
                if (direction == -2){
                    this.quadShift(creeps);
                }else if (direction == desired_direction){
                    this.quadDismantle(dismantlers, target);
                }else{
                    this.quadSquirm(direction, desired_direction, creeps);
                }
            }
            let hostiles = this.findHostilesNear(creeps);
            if (hostiles.length > 0){
                this.quadRangedAttack(creeps, hostiles[0]);
            }else{
                this.quadRangedMassAttack(creeps);
            }
            this.quadHeal(creeps);
        }
    }
};

module.exports = QuadV2;