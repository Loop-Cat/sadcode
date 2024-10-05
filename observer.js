let counter = 0;

const Observer = {
    cacheHighwayRoom: function(room_name){
        const room = Game.rooms[room_name]
        if (!room) {return}
        
        let und
        room.memory.powerbanks = und
        room.memory.deposits = und
        room.memory.powerbanks = room.find(FIND_STRUCTURES).filter(s => s.structureType == STRUCTURE_POWER_BANK).map(p => p.id)
        room.memory.deposits = room.find(FIND_DEPOSITS).filter(d => d.lastCooldown < 200).map(d => d.id)
    },

    scanRooms: function(observer, room_name_array){
        const current_room = Game.rooms[room_name_array[counter]]
        if (current_room){
            this.cacheHighwayRoom(room_name_array[counter])
            counter += 1
            if (counter >= room_name_array.length){
                counter = 0
            }
        }else{
            observer.observeRoom(room_name_array[counter])
        }
    },
};

module.exports = Observer;