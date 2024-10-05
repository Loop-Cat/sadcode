const roleMiner = {
    run: function(creep) {
        const target_room = creep.memory.target_room
        
        if (creep.room.name != target_room){
            creep.moveToRoom(target_room)
            return;
        }
        
        const memory = creep.memory;
        let source
        let container
        let link

        if (!memory.mining_power) {
            creep.memory.mining_power = creep.body.filter(part => part.type == 'work').length * 2
        }

        if (!memory.source_id) {
            source = creep.room.find(FIND_SOURCES).filter(s => s.pos.findInRange(FIND_CREEPS, 1).length == 0)[0]
            if (source){
                memory.source_id = source.id
            }else{
                creep.say('No source?')
                return
            }
        }else{
            source = Game.getObjectById(memory.source_id)
        }

        if (!memory.container_id) {
            container = source.pos.findInRange(FIND_STRUCTURES, 1).filter(s => s.structureType == STRUCTURE_CONTAINER)[0]
            if (container){
                memory.container_id = container.id
            }else{
                creep.say('No cntnr:(')
                return
            }
        }else{
            container = Game.getObjectById(memory.container_id)
        }
        
        if (!container){
            return
        }
        
        if (!memory.link_id && memory.link_id != 0) {
            link = container.pos.findInRange(FIND_STRUCTURES, 1).filter(s => s.structureType == STRUCTURE_LINK)[0]
            if (link){
                memory.link_id = link.id
            }else{
                creep.say('No link')
                memory.link_id = 0
            }
        }else{
            if (memory.link_id != 0){
                link = Game.getObjectById(memory.link_id)
            }
        }

        

        if (!creep.pos.isEqualTo(container.pos)){
            creep.moveTo(container, {range: 0});
            return;
        }
        
        if (source.energy){
            creep.harvest(source);
        }else if (container.hitsMax - container.hits > 600){
            if (creep.store[RESOURCE_ENERGY] == 0){
                creep.withdraw(container, RESOURCE_ENERGY);
            }else{
                creep.repair(container)
            }
        }
        
        if (!link){
            return
        }
        
        if (creep.store.getCapacity() - creep.store.getUsedCapacity() <= memory.mining_power && link){
            creep.transfer(link, RESOURCE_ENERGY, Math.min(creep.store[RESOURCE_ENERGY], link.store.getFreeCapacity()));
        }
	}
};

module.exports = roleMiner;