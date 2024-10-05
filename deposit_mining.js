const array = ['E45S50', 'E46S50', 'E47S50', 'E48S50', 'E49S50']
const Blueprints = require('creep_blueprints');

const DepositMining = {    
    checkRoom: function(roomName){
        const room = Memory.rooms[roomName]
        if (room.deposits){
            if (room.deposits.length > 0){
                return true
            }
        }
        return false
    },

    checkHighway: function(room_name_array){
        let deposits = []
        for (let i in room_name_array){
            if (this.checkRoom(room_name_array[i])){
                deposits.push(room_name_array[i])
            }
        }
        return deposits
    },

    spawnHarvester: function(roomName, target_roomName){
        const room = Game.rooms[roomName]
        if (!room) {return}

        const spawn = room.find(FIND_MY_SPAWNS).find(s => !s.spawning)
        if (!spawn) {return}

        const name = roomName + '_harvester_' + Game.time.toString(16)
        const memory = {role: 'deposit_miner', original_room: roomName, target_room: target_roomName}

        spawn.spawnCreep(Blueprints.deposit_miner, name, {memory: memory})
    },

    run: function(roomName){
        const room = Game.rooms[roomName]
        if (!room) {return}

        const deposits = this.checkHighway(array)

        if (deposits.length == 0) {return}
        for (let i in deposits){
            const target_room = deposits[i]
            const creeps = Game.creeps
            let harvesters = []
            for (let i in creeps){
                if (creeps[i].memory.role == 'deposit_miner' && creeps[i].memory.target_room == target_room){
                    harvesters.push(creeps[i])
                }
            }
            
            if (harvesters.length < 3){
                this.spawnHarvester(roomName, target_room)
            }
        }
    }
};

module.exports = DepositMining;