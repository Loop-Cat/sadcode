const Blueprints = require('creep_blueprints');
const CreepList = require('creep_list');

const Spawn = {
    run: function(order, i) {
        const spawn = Game.spawns[i];
        return spawn.spawnCreep(Blueprints[order[2]], order[0], {memory: order[1]});
	}
};

module.exports = Spawn;