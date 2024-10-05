let laser_pointer = ':3';
const labsModule = require('labs_list');
const extraMethods = require('extras');
const minimal_ttl = 1475;
const boost_tier = 3;

let matrix = [];

const Quad = {
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
    
    idle: function (creeps){
        for (var i in creeps){
            const creep = creeps[i];
            creep.heal(creep);
            creep.rangedMassAttack();
        }
    },

    snake: function (creeps, target) {
        const leader = creeps.find(creep => {return creep.memory.is_leader});
        const followers = creeps.filter(creep => {return !creep.memory.is_leader});

        /*if (leader.pos.isEqualTo(target.pos)){
            console.log('The quad has reached the target.')
            return
        }*/
        const middle = creeps.filter(creep => creep.pos.findInRange(creeps, 1).length == creeps.length - 1);
        if (middle.length >= 2 || followers.some(creep => creep.room.name != leader.room.name)){
            if (!creeps.some(creep => creep.fatigue > 0)){
                console.log('The quad is snaking.');
                leader.moveTo(target.pos, {range: 0/*, ignoreRoads: true*/});
            }
        }
        for (var i in followers){
            const creep = followers[i];
            if (i == 0){
                creep.moveTo(leader, {range: 0, priority: 2000});
            }else{
                creep.moveTo(followers[i - 1], {range: 0/*, ignoreRoads: true*/})
            }
        }
    },

    quadFormationCheck: function(creeps){
        const leader = creeps.find(creep => {return creep.memory.is_leader});
        const followers = creeps.filter(creep => {return !creep.memory.is_leader});

        for (var i in followers){
            if (!this.inFormation(followers[i], creeps)){
                return false
            }
        }

        return true;
    },

    inFormation: function(creep, creeps){
        const leader = creeps.find(creep => {return creep.memory.is_leader});
        const followers = creeps.filter(creep => {return !creep.memory.is_leader});
        if (!(creep.pos.x == leader.pos.x) && !(creep.pos.x == leader.pos.x + 1)){
            return false;
        }else if (!(creep.pos.y == leader.pos.y) && !(creep.pos.y == leader.pos.y + 1)){
            return false;
        }
        return true
    },

    assembleQuad: function(creeps){
        if (creeps.length != 4){
            console.log('Invalid creep count for a quad, use a different configuration.');
            return -1;
        }

        const leader = creeps.find(creep => {return creep.memory.is_leader});
        const followers = creeps.filter(creep => {return !creep.memory.is_leader});

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
            leader.move(TOP_LEFT);
        }
    },

    quadMove: function (creeps, target){
        if (!this.quadFormationCheck(creeps)){
            console.log("Quad is not in formation.");
            return -1;
        }

        const leader = creeps.find(creep => {return creep.memory.is_leader});

        if (target.room.name != leader.room.name){
            console.log("The target is in another room.");
            return -2;
        }

        if (creeps.some(creep => creep.fatigue > 0)){
            console.log("Fatigue over 0.");
            // add pulling logic... later
            return -3;
        }

        const rom = leader.room.name;
        if (matrix.length == 0){
            matrix = extraMethods.formQuadMatrix(leader);
        }
        matrix = extraMethods.formQuadMatrix(leader);
        const path = leader.room.findPath(leader.pos, target.pos, { range: 0, costCallback(rom, _matrix) { return matrix; }, maxRooms: 1 });

        if (path.length > 0){
            for (var i in creeps){
                creeps[i].move(path[0].direction);
            }
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

    quadAttack: function (creeps, target){
        let attempts = [];
        if (target){
            for (let i in creeps){
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

        
        for (var i in creeps){
            if (creeps[i].pos.isEqualTo(quad_coordinates[2])){
                creeps[i].memory.is_leader = true;
            }else{
                creeps[i].memory.is_leader = false;
            }
        }
    },

    findTarget: function(point){
        const stuffs = Game.rooms[point.pos.roomName].lookAt(point.pos.x, point.pos.y);
        const hostile_structure = stuffs.filter(obj => obj.type == 'structure').find(object => !object.structure.my);;
        const hostile_creep = stuffs.filter(obj => obj.type == 'creep').find(object => !object.creep.my);;
        if (hostile_structure){
            return hostile_structure.structure;
        }else if (hostile_creep){
            return hostile_creep.creep;
        }
        return;
    },

    findHostileNear: function(creeps){
        const leader = creeps.find(creep => {return creep.memory.is_leader});
        const hostile_creeps = leader.room.find(FIND_HOSTILE_CREEPS);
        for (var i in creeps){
            const hostilesInRange_1 = creeps[i].pos.findInRange(hostile_creeps, 1);
            if (hostilesInRange_1.length > 0){
                return hostilesInRange_1[0];
            }
        }
    },

    boostCreeps: function(creeps){
        console.log('The quad is boosting.');
        for (let i in creeps){
            const creep = creeps[i];
            const boost_types = extraMethods.getRequiredBoosts(creep.body, boost_tier);
            if (boost_types.length > 0){
                const boost_type = boost_types[0];
                let all_labs = creep.room.find(FIND_MY_STRUCTURES, {filter: s => s.structureType == STRUCTURE_LAB}).filter(l => l.store[boost_type] > 30);
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
        }
        return 0;
    },

    renewCreeps: function(creeps){
        if (creeps.find(creep => {return creep.spawning})){
            console.log('The quad is spawning');
            return;
        }
        if (creeps.find(creep => {return creep.ticksToLive < minimal_ttl})){
            console.log('The quad is renewing');
            for (var i in creeps){
                const creep = creeps[i];
                const spawn = creep.pos.findClosestByPath(Object.values(Game.spawns).filter(spawn => !spawn.spawning));
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

    run: function (creeps) {
        if (creeps.find(creep => {return !creep.memory.is_spawned})){
            this.renewCreeps(creeps);
            return;
        }
    
        if (creeps.find(creep => {return !creep.memory.is_boosted})){
            this.boostCreeps(creeps);
            return;
        }
        // desired behavior goes here
        if (creeps.filter(creep => {return creep.memory.is_leader}).length != 1){
            for (var i in creeps){
                creeps[i].memory.is_leader = false;
            }
            creeps[0].memory.is_leader = true;
        }
        laser_pointer = creeps[0].memory.point;
        
        const point = Game.flags[laser_pointer];
        if (!point){
            this.randomExpression(creeps, 'cute_faces');
            this.idle(creeps);
            return;
        }
        if (creeps.some(creep => creep.room.name != point.pos.roomName)){
            this.randomExpression(creeps, 'idle_phrazes');
            this.snake(creeps, point);
            this.quadHeal(creeps);
        }else{
            this.quadHeal(creeps);
            if (this.quadFormationCheck(creeps)){
                if (this.findHostileNear(creeps)){
                    this.randomExpression(creeps, 'angy_faces');
                    this.quadAttack(creeps, this.findHostileNear(creeps));
                }else{
                    this.randomExpression(creeps, 'war_cries');
                    
                    let target = this.findTarget(point);
                    if (target){
                        let attack_attempt = this.quadAttack(creeps, target);
                        if (attack_attempt == ERR_NOT_IN_RANGE){
                            this.quadMove(creeps, target);
                        }else{
                            this.quadShift(creeps);
                        }
                    }else{
                        /*this.quadShift(creeps);
                        return*/
                        if (this.getDistanceToTarget(creeps, point) > 1){
                            this.quadMove(creeps, point);
                        }else{
                            this.quadShift(creeps);
                        }
                    }
                }
            }else{
                this.randomExpression(creeps, 'cute_faces');
                this.assembleQuad(creeps);
                this.quadHeal(creeps);
            }
        }
    }
};

module.exports = Quad;