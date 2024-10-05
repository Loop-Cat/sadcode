const CreepList = require('creep_list');

const labsModule = {
    E42S55: [
        ['6644581d14bcaf4412a47077', 'XGHO2'],
        ['6644698d3ea6bd08c387fe0a', 'XZHO2'],
        ['66449f472e42df14e123bf7a', 'XLHO2'],
        ['6651bea1494b78aad4a59f52', 'XKHO2'],
        ['6669fee65ccb92292fefa88c', ''],
        ['6669f8755e813fc006ce9ffa', '']
    ],
    
    E43S56: [
        ['6659e5cd748a8f6d8a42f5ca', 'XGHO2'],
        ['6659feacfd9cf8ac6834ad5d', 'XZHO2'],
        ['6659f2545e813f1c6aca91a8', 'XKHO2'],
        ['664df3b7984be6610202cdc0', 'XLHO2'],
        ['664ddf1430b1a4db9850ab51', 'XZH2O'],
        ['664dcf129ba8b8106d40d3e5', ''],
    ],
    
    E43S53: [
        ['66617f080ffecd01babccbb8', 'XGHO2'],
        ['666170b3d14ff7d62f4df953', 'XZHO2'],
        ['665d678a0852874927fa2afb', 'XKHO2'],
        ['665d07f2d2fc54095f98d4fa', 'XLHO2'],
        ['666188c5494b7827fea95ab9', 'XZH2O'],
        ['665d7bda299444fe413241ee', ''],
    ],
    
    E46S57: [
        ['66663179494b786f76aa7b82', 'XGH2O'],
        ['6666526a89bcac24bdd90911', 'GH2O'],
        ['6666839114aef63872fd21f0', 'GH'],
    ],
    
    E47S51: [
        ['66730c20be38cfca4377c698', 'XGH2O'],
        ['6672fc4f2dedfc0e591c7cc4', 'XGH2O'],
        ['6672ecc35ccb926e74f1dfbd', 'XGH2O'],
    ],
    
    Reverse_E42S55: [
        ['6669d1d1f57cc66a7f722b6f', 'GO'],
        ['6651a1cf5ccb924bb3e9bef1', 'GO'],
        ['6651dc9558b2aa042f5b8c97', 'GO'],
        ['6669efcde527b53990066254', 'GO'],
        ['6651bea1494b78aad4a59f52', 'GO'],
        ['66449f472e42df14e123bf7a', 'GO'],
        ['6669fee65ccb92292fefa88c', 'GO'],
        ['6669f8755e813fc006ce9ffa', 'GO'],
        ['6644581d14bcaf4412a47077', ''],
        ['6644698d3ea6bd08c387fe0a', ''],
    ],
    
    Forward_E42S55: [
        ['6644581d14bcaf4412a47077', 'GH2O'],
        ['6644698d3ea6bd08c387fe0a', 'X'],
        ['6669d1d1f57cc66a7f722b6f', ''],
        ['6651a1cf5ccb924bb3e9bef1', ''],
        ['6651dc9558b2aa042f5b8c97', ''],
        ['6669efcde527b53990066254', ''],
        ['6651bea1494b78aad4a59f52', ''],
        ['66449f472e42df14e123bf7a', ''],
        ['6669fee65ccb92292fefa88c', ''],
        ['6669f8755e813fc006ce9ffa', ''],
    ],
    
    Forward_E43S56: [
        ['6659feacfd9cf8ac6834ad5d', 'O'],
        ['664df3b7984be6610202cdc0', 'H'],
        ['6659f2545e813f1c6aca91a8', ''],
        ['6659e5cd748a8f6d8a42f5ca', ''],
        ['664ddf1430b1a4db9850ab51', ''],
        ['664dcf129ba8b8106d40d3e5', ''],
    ],
    
    Reverse_E43S56: [
        ['6659f2545e813f1c6aca91a8', 'GO'],
        ['6659e5cd748a8f6d8a42f5ca', 'GO'],
        ['664ddf1430b1a4db9850ab51', 'GO'],
        ['664dcf129ba8b8106d40d3e5', 'GO'],
        ['6659feacfd9cf8ac6834ad5d', ''],
        ['664df3b7984be6610202cdc0', ''],
    ],
    
    Forward_E43S53: [
        ['666188c5494b7827fea95ab9', 'G'],
        ['665d7bda299444fe413241ee', 'H'],
        ['66617f080ffecd01babccbb8', ''],
        ['666170b3d14ff7d62f4df953', ''],
        ['665d07f2d2fc54095f98d4fa', ''],
        ['665d678a0852874927fa2afb', ''],
    ],
    
    Reverse_E43S53: [
        ['666170b3d14ff7d62f4df953', 'GO'],
        ['665d678a0852874927fa2afb', 'GO'],
        ['665d07f2d2fc54095f98d4fa', 'GO'],
        ['66617f080ffecd01babccbb8', 'GO'],
        ['665d7bda299444fe413241ee', ''],
        ['666188c5494b7827fea95ab9', ''],
    ],
    
    findLab: function(room, boost_type){
        for (var [id, boost] of this[room]) {
            if (boost == boost_type){
                return Game.getObjectById(id);
            }
        }
    },
    
    findAllLabs: function(list, boost_type){
        var lab_list = [];
        for (var [id, boost] of this[list]) {
            if (boost == boost_type){
                lab_list.push(Game.getObjectById(id));
            }
        }
        return lab_list;
    },
    
    changeRole: function(room_name, role){
        const creeps = Game.rooms[room_name].find(FIND_MY_CREEPS);
        for (var name in creeps){
            const creep = creeps[name];
            if (creep.memory.role == 'lab_intern' || creep.memory.role == 'lab_senior' || creep.memory.role == 'lab_technician' || creep.memory.role == 'lab_unloader'){
                creep.memory.role = role;
            }
        }
    }
};

module.exports = labsModule;