const Blueprints = require('creep_blueprints');

const autoSpawning = {
    RCL7: {
        filler: 1,
        miners: 2,
        manager: 1,
        repairer: 1,
        upgrader: 1,
        mineral_miner: 1,
        mineral_hauler: 1,
    },
    
    RCL8: {
        miner: 2,
        manager: 1,
        filler: 1,
        repairer: 1,
        upgrader: 1,
        mineral_miner: 1,
        mineral_hauler: 1,
    },

    spawnCondition: function(role_name, room_name){
        const room = Game.rooms[room_name]
        if (!room) {return false}
        
        if (role_name == 'upgrader'){
            if (room.controller.ticksToDowngrade < 80000){
                
            }else{
                return false
            }
        }else if (role_name == 'mineral_miner' || role_name == 'mineral_hauler'){
            if (room.find(FIND_MINERALS)[0].mineralAmount > 0){
                
            }else{
                return false
            }
        }
        
        const spawnings = room.find(FIND_MY_SPAWNS).find(s => s.spawning)
        
        if (spawnings.length == 0){
            return true
        }
        
        if (spawnings.some(s => s.name.slice(room_name.length + 1, room_name.length + 1 + role_name.length) == role_name)){
            return false
        }
    },

    maintainPopulation: function(room_name){
        const room = Game.rooms[room_name]
        if (!room) {return}
        
        const controller = room.controller
        if (!controller) {return}
        
        const level = controller.level
        if (level < 6) {return}

        const spawn = room.find(FIND_MY_SPAWNS).find(s => !s.spawning)
        if (!spawn) {return}

        const creeps_in_room = room.find(FIND_MY_CREEPS)
        let population_count = this['RCL' + level]
        for (let i in creeps_in_room){
            const creep = creeps_in_room[i]
            console.log(creep.name.slice(0, room_name.length), creep.ticksToLive > creep.body.length * 3)
            if (creep.name.slice(0, room_name.length) == room_name){
                if (creep.ticksToLive > creep.body.length * 3){
                    population_count[creep.memory.role] -= 1
                }
            }
        }
        
        for (let i in population_count){
            if (population_count[i] > 0 && this.spawnCondition(i, room_name)){
                const body = Blueprints['RCL' + level + '_' + i]
                const name = room_name + '_' + i + '_' + Game.time
                const memory = {role: i, original_room: room_name, target_room: room_name}
                spawn.spawnCreep(body, name, {memory: memory})
                return
            }
        }
	},

    maintainLowLevelRemote: function(room_name, remote_room_name) {
        
	},

    maintainRemote: function(room_name, remote_room_name) {
        
	},
};

module.exports = autoSpawning;