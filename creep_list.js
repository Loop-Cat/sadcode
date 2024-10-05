const creep_list = {
    // note: add some extra spawn info like what room to spawn in if matters or make it not matter
    
    PowerCreeps: {
        PowahGoober: {role: 'power_creep', target_room: 'E42S55'},
    },
    
    Spawn1: [
        ['Miner_E42S55_A', {role: 'miner', target_room: 'E42S55', container_id: '663d17f04804405b01968db5'}, 'miner', 7, 'Spawn1'],
        ['Miner_E42S55_B', {role: 'miner', target_room: 'E42S55', container_id: '663d135a085287263cf26803'}, 'miner', 7, 'Spawn1'],
        ['Manager_E42S55', {role: 'manager', target_room: 'E42S55', spot: 'Spot_1'}, 'big_hauler', 10, 'Spawn1'],
        ['Hauler_E42S55_1', {role: 'hauler', target_room: 'E42S55', task: 'from_storage'}, 'big_hauler', 8, 'Spawn1'],
        //['Upgrader_E42S55_1', {role: 'upgrader', target_room: 'E42S55', is_boosted: true}, 'RCL8_upgrader', 5, 'Spawn1'],
        ['Repairer_E42S55_1', {role: 'repairer', is_boosted: true}, 'builder', 5, 'Spawn1'],
        //['Bob_The_Builder_E42S55_1', {role: 'builder', target_room: 'E42S55', working: false}, 'builder', 6, 'Spawn1'],
        //['Payed_Senior_E43S56', {role: 'lab_technician', target_room: 'E42S55'}, 'road_hauler', 4, 'Spawn1'],
    ],
    
    Spawn1_1: [
        //['Wah Wah!', {role: 'ranged_duo', spawned: false, boosted: false}, 'ranged_duo_tier1', 7, 'Spawn1_1'],
        //['Womp Womp!', {role: 'ranged_duo', spawned: false, boosted: false}, 'ranged_duo_tier1', 7, 'Spawn1_1'],
        
        /*['Good_boy_1', {role: 'quad', is_spawned: false, is_boosted: false, is_leader: false}, 'test_quad', 'Spawn1_1'],
        ['Good_boy_2', {role: 'quad', is_spawned: false, is_boosted: false, is_leader: false}, 'test_quad', 'Spawn1_1'],
        ['Good_boy_3', {role: 'quad', is_spawned: false, is_boosted: false, is_leader: false}, 'test_quad', 'Spawn1_1'],
        ['Good_boy_4', {role: 'quad', is_spawned: false, is_boosted: false, is_leader: false}, 'test_quad', 'Spawn1_1'],*/
        //['Payed_Senior_E43S56', {role: 'lab_technician', target_room: 'E42S55'}, 'road_hauler', 4, 'Spawn1'],
        ['Miner_E43S55', {role: 'miner', target_room: 'E43S55', container_id: '6671dc0dcf682873fe4fe85e'}, 'miner', 3, 'Spawn1'],
        ['Hauler_E43S55', {role: 'remote_hauler', target_room: 'E43S55', original_room: 'E42S55', container_id: '6671dc0dcf682873fe4fe85e'}, 'big_hauler', 3, 'Spawn1'],
        ['Builder_E43S55', {role: 'builder', target_room: 'E43S55', working: false}, 'cheap_worker', 3, 'Spawn1'],
        ['Reserver_E43S55', {role: 'reserver', target_room: 'E43S55'}, 'reserver', 3, 'Spawn1'],
        
        /*['Good_boy_1', {role: 'quad', group: 'bois', boost_tier: 3, point: ';3', minimal_ttl: 1470, blinky: true, is_spawned: false, is_boosted: false, is_leader: true}, 'RCL8_lvl4_quad', 8, 'Spawn3'],
        ['Good_boy_2', {role: 'quad', group: 'bois', boost_tier: 3, point: ';3', minimal_ttl: 1470, blinky: true, is_spawned: false, is_boosted: false, is_leader: false}, 'RCL8_lvl4_quad', 8, 'Spawn3'],*/
        /*['Good_crep_1', {role: 'quad', group: 'creps', boost_tier: 3, point: '=3', minimal_ttl: 1470, blinky: true, is_spawned: false, is_boosted: false, is_leader: true}, 'RCL8_lvl4_quad', 8, 'Spawn3'],
        ['Good_crep_2', {role: 'quad', group: 'creps', boost_tier: 3, point: '=3', minimal_ttl: 1470, blinky: true, is_spawned: false, is_boosted: false, is_leader: false}, 'RCL8_lvl4_quad', 8, 'Spawn3'],*/
    ],
    
    Spawn1_2: [
        /*['Good_boy_3', {role: 'quad', group: 'bois', boost_tier: 3, point: ';3', minimal_ttl: 1470, blinky: true, is_spawned: false, is_boosted: false, is_leader: false}, 'RCL8_lvl4_quad', 8, 'Spawn3'],
        ['Good_boy_4', {role: 'quad', group: 'bois', boost_tier: 3, point: ';3', minimal_ttl: 1470, blinky: true, is_spawned: false, is_boosted: false, is_leader: false}, 'RCL8_lvl4_quad', 8, 'Spawn3'],*/
        /*['Good_crep_3', {role: 'quad', group: 'creps', boost_tier: 3, point: '=3', minimal_ttl: 1470, blinky: true, is_spawned: false, is_boosted: false, is_leader: false}, 'RCL8_lvl4_quad', 8, 'Spawn3'],
        ['Good_crep_4', {role: 'quad', group: 'creps', boost_tier: 3, point: '=3', minimal_ttl: 1470, blinky: true, is_spawned: false, is_boosted: false, is_leader: false}, 'RCL8_lvl4_quad', 8, 'Spawn3'],*/
        
        ['Miner_E42S56', {role: 'miner', target_room: 'E42S56', container_id: '66655f16fd9cf80a9b3773e3'}, 'miner', 3, 'Spawn1'],
        ['Hauler_E42S56', {role: 'remote_hauler', target_room: 'E42S56', original_room: 'E42S55', container_id: '66655f16fd9cf80a9b3773e3'}, 'max_hauler', 3, 'Spawn1'],
        ['Hauler_E42S56_2', {role: 'remote_hauler', target_room: 'E42S56', original_room: 'E42S55', container_id: '66655f16fd9cf80a9b3773e3'}, 'road_hauler', 3, 'Spawn1'],
        ['Builder_E42S56', {role: 'builder', target_room: 'E42S56', working: false}, 'cheap_worker', 3, 'Spawn1'],
        ['Reserver_E42S56', {role: 'reserver', target_room: 'E42S56'}, 'cheap_reserver', 4, 'Spawn1'],
    ],
    
    Spawn2: [
        ['Miner_E43S56_A', {role: 'miner', target_room: 'E43S56', container_id: '664244d7be38cf3a6b6c210a'}, 'miner', 7, 'Spawn2'],
        ['Miner_E43S56_B', {role: 'miner', target_room: 'E43S56', container_id: '6642643a068fbdb53fd18154'}, 'miner', 7, 'Spawn2'],
        ['Manager_E43S56', {role: 'manager', target_room: 'E43S56', spot: 'Spot_2'}, 'big_hauler', 11, 'Spawn2'],
        ['Hauler_E43S56_1', {role: 'hauler', target_room: 'E43S56', task: 'from_storage'}, 'cheap_hauler', 12, 'Spawn2'],
        ['Hauler_E43S56_2', {role: 'hauler', target_room: 'E43S56', task: 'from_storage'}, 'big_hauler', 10, 'Spawn2'],
        ['Upgrader_E43S56', {role: 'upgrader', target_room: 'E43S56', is_boosted: true}, 'cheap_worker', 5, 'Spawn2'],
        //['Unpayed_intern_E43S56', {role: 'lab_technician', target_room: 'E43S56'}, 'road_hauler', 4, 'Spawn2'],
        ['Repairer_E43S56_1', {role: 'repairer', is_boosted: true}, 'builder', 5, 'Spawn2'],
        //['Repairer_E43S56_1', {role: 'repairer', is_boosted: true}, 'builder', 5, 'Spawn2'],
        //['Bill_The_Builder_E43S56_2', {role: 'builder', target_room: 'E43S56', working: false}, 'builder', 6, 'Spawn2'],
        //['Roomba_E43S55', {role: 'melee_defender', target_room: 'E43S55'}, 'remote_cleaner', 9, 'Spawn2'],
        //['Signer', {role: 'scout', target_room: 'E44S57', sign: 'Nya uh! No spawn here pwease~'}, 'scout', 1, 'Spawn2'],
        //['Claimer_E43S53', {role: 'claimer', target_room: 'E46S57'}, 'claimer', 4, 'Spawn2'],
        //['SK_kila_E44S56_2', {role: 'SK_killer', target_room: 'E44S56', original_room: 'E43S56'}, 'SK_killer', 9, 'Spawn2'],
        //['Miner_E43S55', {role: 'SK_miner', target_room: 'E44S56', container_id: '66530176136e72343505e2d1'}, 'SK_miner', 6, 'Spawn2'],
        //['Builder_E44S56', {role: 'SK_builder', target_room: 'E44S56', working: false}, 'SK_builder', 4, 'Spawn1'],
        /*['Good_girl_1', {role: 'quad', group: 'girls', boost_tier: 3, point: ';3', minimal_ttl: 1450, blinky: true, is_spawned: false, is_boosted: false, is_leader: true}, 'RCL7_lvl4_quad', 10, 'Spawn3'],
        ['Good_girl_2', {role: 'quad', group: 'girls', boost_tier: 3, point: ';3', minimal_ttl: 1450, blinky: true, is_spawned: false, is_boosted: false, is_leader: false}, 'RCL7_lvl4_quad', 10, 'Spawn3'],*/
    ],
    
    Spawn3_1: [
        /*['CoreBuster', {role: 'attacker'}, 'hydralisk', 5, 'Spawn3_1'],
        ['CoreBuster', {role: 'attacker'}, 'hydralisk', 5, 'Spawn3_1'],
        ['CoreBuster', {role: 'attacker'}, 'hydralisk', 5, 'Spawn3_1'],
        ['CoreBuster', {role: 'attacker'}, 'hydralisk', 5, 'Spawn3_1'],*/
        /*['CoreBuster', {role: 'attacker'}, 'hydralisk', 5, 'Spawn3_1'],
        ['CoreBuster', {role: 'attacker'}, 'hydralisk', 5, 'Spawn3_1'],*/
        /*['Good_girl_3', {role: 'quad', group: 'girls', boost_tier: 3, point: ';3', minimal_ttl: 1450, blinky: true, is_spawned: false, is_boosted: false, is_leader: false}, 'RCL7_lvl4_quad', 10, 'Spawn3'],
        ['Good_girl_4', {role: 'quad', group: 'girls', boost_tier: 3, point: ';3', minimal_ttl: 1450, blinky: true, is_spawned: false, is_boosted: false, is_leader: false}, 'RCL7_lvl4_quad', 10, 'Spawn3'],*/
        /*['Good_boy_1', {role: 'quad', is_spawned: false, is_boosted: false, is_leader: false}, 'RCL7_quad_tier_2', 'Spawn3_1'],
        ['Good_boy_2', {role: 'quad', is_spawned: false, is_boosted: false, is_leader: false}, 'RCL7_quad_tier_2', 'Spawn3_1'],
        ['Good_boy_3', {role: 'quad', is_spawned: false, is_boosted: false, is_leader: false}, 'RCL7_quad_tier_2', 'Spawn3_1'],
        ['Good_boy_4', {role: 'quad', is_spawned: false, is_boosted: false, is_leader: false}, 'RCL7_quad_tier_2', 'Spawn3_1'],*/
        //['SK_kila_E44S56_1', {role: 'SK_killer', target_room: 'E44S56', original_room: 'E43S56'}, 'SK_killer', 9, 'Spawn2'],
        //['SK_Hauler_E44S56_1', {role: 'SK_hauler', target_room: 'E44S56', original_room: 'E43S56'}, 'SK_hauler', 5, 'Spawn2'],
        //['SK_Hauler_E44S56_2', {role: 'SK_hauler', target_room: 'E44S56', original_room: 'E43S56'}, 'SK_hauler', 5, 'Spawn2'],
    ],
    
    Spawn3: [
        ['Upgrader_1', {role: 'upgrader', target_room: 'E43S53', is_boosted: true}, 'cheap_worker', 5, 'Spawn3'],
        ['Harvester_E43S53', {role: 'harvester'}, 'cheaper_worker', 20, 'Spawn1'],
        //['Repairer_E43S53_1', {role: 'repairer', is_boosted: true}, 'builder', 5, 'Spawn3'],
        ['Miner_E43S53_A', {role: 'miner', target_room: 'E43S53', container_id: '664fabe3494b78793fa52556'}, 'miner', 7, 'Spawn3'],
        ['Miner_E43S53_B', {role: 'miner', target_room: 'E43S53', container_id: '664fb61be74387407027418e'}, 'miner', 7, 'Spawn3'],
        ['Hauler_E43S53_1', {role: 'hauler', target_room: 'E43S53', task: 'from_storage'}, 'cheap_hauler', 12, 'Spawn2'],
        ['Hauler_E43S53_2', {role: 'hauler', target_room: 'E43S53', task: 'from_storage'}, 'big_hauler', 10, 'Spawn3'],
        ['Manager_E43S53', {role: 'manager', target_room: 'E43S53', spot: 'Spot_3'}, 'manager', 9, 'Spawn3'],
        //['Drug_Dealer_E43S53', {role: 'lab_intern', target_room: 'E43S53'}, 'road_hauler', 4, 'Spawn3'],
        //['Claimer_E45S50', {role: 'claimer', target_room: 'E45S50'}, 'claimer', 4, 'Spawn3'],
        ['Builder_E43S53_1', {role: 'builder', target_room: 'E43S53', working: false}, 'builder', 2, 'Spawn3'],
        //['Builder_E45S50_2', {role: 'builder', target_room: 'E47S51', working: false}, 'builder', 2, 'Spawn3'],
        
        /*['Good_boy_1', {role: 'quad', group: 'bois', boost_tier: 3, point: ':3', minimal_ttl: 1450, blinky: true, is_spawned: false, is_boosted: false, is_leader: true}, 'cheap_tier_quad', 5, 'Spawn3'],
        ['Good_boy_2', {role: 'quad', group: 'bois', boost_tier: 3, point: ':3', minimal_ttl: 1450, blinky: true, is_spawned: false, is_boosted: false, is_leader: false}, 'cheap_tier_quad', 5, 'Spawn3'],
        ['Good_boy_3', {role: 'quad', group: 'bois', boost_tier: 3, point: ':3', minimal_ttl: 1450, blinky: true, is_spawned: false, is_boosted: false, is_leader: false}, 'cheap_tier_quad', 5, 'Spawn3'],
        ['Good_boy_4', {role: 'quad', group: 'bois', boost_tier: 3, point: ':3', minimal_ttl: 1450, blinky: true, is_spawned: false, is_boosted: false, is_leader: false}, 'cheap_tier_quad', 5, 'Spawn3'],*/
        /*['Good_girl_1', {role: 'quad', group: 'girls', boost_tier: 3, point: ':3', minimal_ttl: 1470, blinky: true, is_spawned: false, is_boosted: false, is_leader: true}, 'lvl2_invader_quad', 8, 'Spawn3'],
        ['Good_girl_2', {role: 'quad', group: 'girls', boost_tier: 3, point: ':3', minimal_ttl: 1470, blinky: true, is_spawned: false, is_boosted: false, is_leader: false}, 'lvl2_invader_quad', 8, 'Spawn3'],*/
    ],
    
    Spawn3_2: [
        /*['Good_girl_3', {role: 'quad', group: 'girls', boost_tier: 3, point: ':3', minimal_ttl: 1470, blinky: true, is_spawned: false, is_boosted: false, is_leader: false}, 'lvl2_invader_quad', 8, 'Spawn3'],
        ['Good_girl_4', {role: 'quad', group: 'girls', boost_tier: 3, point: ':3', minimal_ttl: 1470, blinky: true, is_spawned: false, is_boosted: false, is_leader: false}, 'lvl2_invader_quad', 8, 'Spawn3'],*/
        //['SK_Hauler_E44S56_1', {role: 'SK_hauler', target_room: 'E44S54', original_room: 'E43S53'}, 'SK_hauler', 5, 'Spawn3'],
        //['SK_Hauler_E44S56_2', {role: 'SK_hauler', target_room: 'E44S54', original_room: 'E43S53'}, 'SK_hauler', 5, 'Spawn3'],
        //['SK_Hauler_E44S56_3', {role: 'SK_hauler', target_room: 'E44S54', original_room: 'E43S53'}, 'SK_hauler', 5, 'Spawn3'],
        /*['Miner_E43S54', {role: 'miner', target_room: 'E43S54', container_id: '6661cc677b5aea50b5c3a63b'}, 'miner', 3, 'Spawn3'],
        ['Remote_Hauler_E43S54_1', {role: 'remote_hauler', target_room: 'E43S54', original_room: 'E43S53', container_id: '6661cc677b5aea50b5c3a63b'}, 'road_hauler', 3, 'Spawn3'],
        ['Remote_Hauler_E43S54_2', {role: 'remote_hauler', target_room: 'E43S54', original_room: 'E43S53', container_id: '6661cc677b5aea50b5c3a63b'}, 'road_hauler', 3, 'Spawn3'],
        ['Builder_E43S54', {role: 'builder', target_room: 'E43S54', working: false}, 'cheap_worker', 4, 'Spawn3'],
        ['Reserver_E43S54', {role: 'reserver', target_room: 'E43S54'}, 'cheap_reserver', 3, 'Spawn3'],*/
        //['Roomba_E43S54', {role: 'melee_defender', target_room: 'E43S54'}, 'remote_cleaner', 9, 'Spawn3'],
        
        /*['Good_boy_1', {role: 'quad', group: 'bois', boost_tier: 3, point: ':3', is_spawned: false, is_boosted: false, is_leader: false}, 'test_quad', 10, 'Spawn3'],
        ['Good_boy_2', {role: 'quad', group: 'bois', boost_tier: 3, point: ':3', is_spawned: false, is_boosted: false, is_leader: false}, 'test_quad', 10, 'Spawn3'],
        ['Good_boy_3', {role: 'quad', group: 'bois', boost_tier: 3, point: ':3', is_spawned: false, is_boosted: false, is_leader: false}, 'test_quad', 10, 'Spawn3'],
        ['Good_boy_4', {role: 'quad', group: 'bois', boost_tier: 3, point: ':3', is_spawned: false, is_boosted: false, is_leader: false}, 'test_quad', 10, 'Spawn3'],*/
        
        
        //['wah wah', {role: 'dismantler', boost_tier: 3, point: 'UwU', follower: 'womp womp', is_spawned: false, is_boosted: false}, 'test_dismantler', 10, 'Spawn3'],
        //['womp womp', {role: 'healer', boost_tier: 3, point: 'UwU', healing_target: 'wah wah', is_spawned: false, is_boosted: false}, 'test_healer', 10, 'Spawn3'],
        //['Claimer', {role: 'claimer', target_room: 'E47S51'}, 'scout', 4, 'Spawn3_2'],
        
        /*['Miner_E43S52', {role: 'miner', target_room: 'E43S52', container_id: '666188ba1d83c31f32354c0b'}, 'miner', 3, 'Spawn3'],
        ['Remote_Hauler_E43S52_1', {role: 'remote_hauler', target_room: 'E43S52', original_room: 'E43S53', container_id: '666188ba1d83c31f32354c0b'}, 'max_hauler', 3, 'Spawn3'],
        ['Miner_E43S52_', {role: 'miner', target_room: 'E43S52', container_id: '66616b64da8491c672f498ea'}, 'miner', 3, 'Spawn3'],
        ['Remote_Hauler_E43S52_1_', {role: 'remote_hauler', target_room: 'E43S52', original_room: 'E43S53', container_id: '66616b64da8491c672f498ea'}, 'max_hauler', 3, 'Spawn3'],
        ['Builder_E43S52', {role: 'builder', target_room: 'E43S52', working: false}, 'cheap_worker', 4, 'Spawn3'],
        ['Reserver_E43S52', {role: 'reserver', target_room: 'E43S52'}, 'cheap_reserver', 3, 'Spawn3'],*/
        
        /*['Miner_E42S53', {role: 'miner', target_room: 'E42S53', container_id: '6658300b06b509754506446b'}, 'cheap_miner', 3, 'Spawn3'],
        ['Remote_Hauler_E42S53_1', {role: 'remote_hauler', target_room: 'E42S53', original_room: 'E43S53', container_id: '6658300b06b509754506446b'}, 'cheap_hauler', 3, 'Spawn3'],
        ['Remote_Hauler_E42S53_2', {role: 'remote_hauler', target_room: 'E42S53', original_room: 'E43S53', container_id: '6658300b06b509754506446b'}, 'road_hauler', 3, 'Spawn3'],
        ['Builder_E42S53_1', {role: 'builder', target_room: 'E42S53', working: false}, 'cheap_worker', 4, 'Spawn3'],
        ['Reserver_E42S53', {role: 'reserver', target_room: 'E42S53'}, 'cheap_reserver', 3, 'Spawn3'],*/
    ],
    
    Spawn4: [
        ['Harvester_E43S53', {role: 'harvester'}, 'cheaper_worker', 20, 'Spawn1'],
        ['Miner_E46S57_A', {role: 'miner', target_room: 'E46S57', container_id: '665c1508748a8f54a3437e0e'}, 'cheap_miner', 7, 'Spawn4'],
        ['Miner_E46S57_B', {role: 'miner', target_room: 'E46S57', container_id: '665c28432e42df6eac2937b9'}, 'cheap_miner', 7, 'Spawn4'],
        ['Manager_E46S57', {role: 'manager', target_room: 'E46S57', spot: 'Spot_4'}, 'manager', 9, 'Spawn4'],
        ['Hauler_E46S57_1', {role: 'hauler', target_room: 'E46S57', task: 'from_storage'}, 'big_hauler', 7, 'Spawn4'],
        ['Hauler_E46S57_2', {role: 'hauler', target_room: 'E46S57', task: 'from_storage'}, 'cheap_hauler', 12, 'Spawn4'],
        //['Lab_guy_E46S57', {role: 'lab_intern', target_room: 'E46S57'}, 'road_hauler', 4, 'Spawn4'],
        ['Upgrader_1_E46S57', {role: 'upgrader', target_room: 'E46S57', is_boosted: true}, 'cheap_worker', 6, 'Spawn4'],
        /*['Upgrader_2_E46S57', {role: 'upgrader', target_room: 'E46S57', is_boosted: false}, 'RCL6_upgrader', 6, 'Spawn4'],
        ['Upgrader_3_E46S57', {role: 'upgrader', target_room: 'E46S57', is_boosted: false}, 'RCL6_upgrader', 6, 'Spawn4'],
        ['Upgrader_4_E46S57', {role: 'upgrader', target_room: 'E46S57', is_boosted: false}, 'RCL6_upgrader', 6, 'Spawn4'],
        ['Upgrader_5_E46S57', {role: 'upgrader', target_room: 'E46S57', is_boosted: false}, 'RCL6_upgrader', 6, 'Spawn4'],*/
        //['Upgrader_4_E46S57', {role: 'upgrader', target_room: 'E46S57', is_boosted: false}, 'RCL6_upgrader', 6, 'Spawn4'],
        //['Upgrader_5_E46S57', {role: 'upgrader', target_room: 'E46S57', is_boosted: false}, 'RCL6_upgrader', 6, 'Spawn4'],
        //['Repairer_E46S57_1', {role: 'repairer', is_boosted: true}, 'builder', 5, 'Spawn4'],
        ['Builder_1_E46S57', {role: 'builder', target_room: 'E46S57'}, 'builder', 8, 'Spawn4'],
        //['Builder_2_E46S57', {role: 'builder', target_room: 'E46S57'}, 'builder', 8, 'Spawn4'],
        //['Builder_3_E46S57', {role: 'builder', target_room: 'E46S57'}, 'builder', 8, 'Spawn4'],
    ],
    
    Spawn4_1: [
        /*['Miner_E47S57_A', {role: 'miner', target_room: 'E47S57', container_id: '6677eb877a42e58e1cf46d4e'}, 'miner', 3, 'Spawn4'],
        ['Remote_Hauler_E47S57_1_A', {role: 'remote_hauler', target_room: 'E47S57', original_room: 'E46S57', container_id: '6677eb877a42e58e1cf46d4e'}, 'max_hauler', 3, 'Spawn4'],
        ['Miner_E47S57', {role: 'miner', target_room: 'E47S57', container_id: '6677f7ccb8a360617460b250'}, 'miner', 3, 'Spawn4'],
        ['Remote_Hauler_E47S57_1', {role: 'remote_hauler', target_room: 'E47S57', original_room: 'E46S57', container_id: '6677f7ccb8a360617460b250'}, 'max_hauler', 3, 'Spawn4'],
        ['Reserver_E47S57', {role: 'reserver', target_room: 'E47S57'}, 'cheap_reserver', 3, 'Spawn4'],
        ['Builder_E47S57', {role: 'builder', target_room: 'E47S57', working: false}, 'cheap_worker', 4, 'Spawn4'],*/
        //['Roomba_E47S57', {role: 'melee_defender', target_room: 'E47S57'}, 'remote_cleaner', 9, 'Spawn4'],
        //['Builder_E47S57_', {role: 'builder', target_room: 'E47S57', working: false}, 'cheap_worker', 4, 'Spawn4'],
    ],
    
    Spawn5: [
        ['Harvester_E43S53', {role: 'harvester'}, 'cheaper_worker', 20, 'Spawn1'],
        /*['Good_boy_1', {role: 'quad', group: 'bois', boost_tier: 3, point: ':3', minimal_ttl: 1450, blinky: true, is_spawned: false, is_boosted: true, is_leader: true}, 'cheap_quad', 5, 'Spawn3'],
        ['Good_boy_2', {role: 'quad', group: 'bois', boost_tier: 3, point: ':3', minimal_ttl: 1450, blinky: true, is_spawned: false, is_boosted: true, is_leader: false}, 'cheap_quad', 5, 'Spawn3'],
        ['Good_boy_3', {role: 'quad', group: 'bois', boost_tier: 3, point: ':3', minimal_ttl: 1450, blinky: true, is_spawned: false, is_boosted: true, is_leader: false}, 'cheap_quad', 5, 'Spawn3'],
        ['Good_boy_4', {role: 'quad', group: 'bois', boost_tier: 3, point: ':3', minimal_ttl: 1450, blinky: true, is_spawned: false, is_boosted: true, is_leader: false}, 'cheap_quad', 5, 'Spawn3'],*/
        //['Claimer', {role: 'claimer', target_room: 'E52S47'}, 'cheap_claimer', 4, 'Spawn5'],
        /*['wah wah', {role: 'dismantler', boost_tier: 3, point: 'UwU', follower: 'womp womp', is_spawned: false, is_boosted: true}, 'ah_dismantler', 3, 'Spawn5'],
        ['womp womp', {role: 'healer', boost_tier: 3, point: 'UwU', healing_target: 'wah wah', is_spawned: false, is_boosted: true}, 'ah_healer', 3, 'Spawn5'],
        ['wah wah1', {role: 'dismantler', boost_tier: 3, point: 'UwU1', follower: 'womp womp1', is_spawned: false, is_boosted: true}, 'ah_dismantler', 10, 'Spawn5'],
        ['womp womp1', {role: 'healer', boost_tier: 3, point: 'UwU1', healing_target: 'wah wah1', is_spawned: false, is_boosted: true}, 'ah_healer', 10, 'Spawn5'],
        ['wah wah2', {role: 'dismantler', boost_tier: 3, point: 'UwU2', follower: 'womp womp2', is_spawned: false, is_boosted: true}, 'ah_dismantler', 10, 'Spawn5'],
        ['womp womp2', {role: 'healer', boost_tier: 3, point: 'UwU2', healing_target: 'wah wah2', is_spawned: false, is_boosted: true}, 'ah_healer', 10, 'Spawn5'],*/
        ['Miner_E47S51_A', {role: 'miner', target_room: 'E47S51', container_id: '666971f10ee1c978e2c5c2cb'}, 'cheap_miner', 7, 'Spawn5'],
        ['Miner_E47S51_B', {role: 'miner', target_room: 'E47S51', container_id: '6669851d04b05430194890c5'}, 'cheap_miner', 7, 'Spawn5'],
        ['Hauler_E47S51_2', {role: 'hauler', target_room: 'E47S51', task: 'from_storage'}, 'big_hauler', 7, 'Spawn5'],
        ['Hauler_E47S51_3', {role: 'hauler', target_room: 'E47S51', task: 'from_storage'}, 'cheap_hauler', 11, 'Spawn5'],
        ['Manager_E47S51', {role: 'manager', target_room: 'E47S51', spot: 'Spot_5'}, 'manager', 9, 'Spawn4'],
        //['Hauler_E47S51_4', {role: 'hauler', target_room: 'E47S51', task: 'from_containers'}, 'cheap_road_hauler', 6, 'Spawn5'],
        //['Lab_guy_E47S51', {role: 'lab_unloader', target_room: 'E47S51'}, 'road_hauler', 4, 'Spawn5'],
        //['Harvester_E47S51_1', {role: 'harvester', target_room: 'E47S51'}, 'cheaper_worker', 10, 'Spawn5'],
        
        ['Upgrader_E47S51_4', {role: 'upgrader', target_room: 'E47S51'}, 'cheap_worker', 4, 'Spawn5'],
        ['Builder_E47S51_1', {role: 'builder', target_room: 'E47S51'}, 'builder', 2, 'Spawn5'],
        /*['Builder_E47S51_2', {role: 'builder', target_room: 'E47S51'}, 'builder', 2, 'Spawn5'],
        ['Builder_E47S51_3', {role: 'builder', target_room: 'E47S51'}, 'builder', 2, 'Spawn5'],
        ['Builder_E47S51_4', {role: 'builder', target_room: 'E47S51'}, 'builder', 2, 'Spawn5'],
        ['Builder_E47S51_5', {role: 'builder', target_room: 'E47S51'}, 'builder', 2, 'Spawn5'],
        ['Builder_E47S51_6', {role: 'builder', target_room: 'E47S51'}, 'builder', 2, 'Spawn5'],*/
        ///['Builder_E47S51_3', {role: 'builder', target_room: 'E47S51'}, 'cheaper_worker', 6, 'Spawn5'],
        //['Builder_E47S51_4', {role: 'builder', target_room: 'E47S51'}, 'cheaper_worker', 5, 'Spawn5'],
        
        //['DEATH', {role: 'harasser', point: 'here1'}, 'RCL5_harasser', 5, 'Spawn5'],
        /*['DEATH_2', {role: 'harasser', point: 'here2'}, 'RCL5_harasser', 5, 'Spawn5'],
        ['DEATH_3', {role: 'harasser', point: 'here3'}, 'RCL5_harasser', 5, 'Spawn5'],*/
        /*['Builder_E55S51_1', {role: 'builder', target_room: 'E55S51'}, 'RCL5_builder', 6, 'Spawn5'],
        ['Builder_E55S51_2', {role: 'builder', target_room: 'E55S51'}, 'RCL5_builder', 6, 'Spawn5'],
        ['Builder_E55S51_3', {role: 'builder', target_room: 'E55S51'}, 'RCL5_builder', 5, 'Spawn5'],*/
        
    ],
    
    Spawn5_1: [
        //['Upgrader_E47S51_1', {role: 'upgrader', target_room: 'E47S51'}, 'RCL7_upgrader', 6, 'Spawn5'],
        //['Upgrader_E47S51_2', {role: 'upgrader', target_room: 'E47S51'}, 'RCL7_upgrader', 6, 'Spawn5'],
        //['Upgrader_E47S51_3', {role: 'upgrader', target_room: 'E47S51'}, 'RCL7_upgrader', 5, 'Spawn5'],
    ],
    
    mineral_E42S55: [
        ['Mineral_Miner_E42S55', {role: 'mineral_miner', target_room: 'E42S55', container_id: '6671d79649fb687cd5553c2d', mineral_id: '5bbcb672d867df5e5420786c'}, 'mineral_miner', 2, 'Spawn1'],
        ['Mineral_Hauler_E42S55', {role: 'mineral_hauler', target_room: 'E42S55', container_id: '6671d79649fb687cd5553c2d', mineral_id: '5bbcb672d867df5e5420786c'}, 'road_hauler', 2, 'Spawn1'],
    ],
    
    mineral_E43S56: [
        ['Mineral_Miner_E43S56', {role: 'mineral_miner', target_room: 'E43S56', container_id: '665ae68306b509f7db06ed34', mineral_id: '5bbcb67ed867df5e542078d9'}, 'mineral_miner', 2, 'Spawn2'],
        ['Mineral_Hauler_E43S56', {role: 'mineral_hauler', target_room: 'E43S56', container_id: '665ae68306b509f7db06ed34', mineral_id: '5bbcb67ed867df5e542078d9'}, 'road_hauler', 2, 'Spawn2'],
    ],
    
    mineral_E43S53: [
        ['Mineral_Miner_E43S53', {role: 'mineral_miner', target_room: 'E43S53', container_id: '665ac909494b78a7e6a7bb0e', mineral_id: '5bbcb67dd867df5e542078d6'}, 'mineral_miner', 2, 'Spawn3'],
        ['Mineral_Hauler_E43S53', {role: 'mineral_hauler', target_room: 'E43S53', container_id: '665ac909494b78a7e6a7bb0e', mineral_id: '5bbcb67dd867df5e542078d6'}, 'road_hauler', 2, 'Spawn3'],
    ],
    
    mineral_E46S57: [
        ['Mineral_Miner_E46S57', {role: 'mineral_miner', target_room: 'E46S57', container_id: '666627b593c29e07436b85eb', mineral_id: '5bbcb692d867df5e542079b2'}, 'mineral_miner', 2, 'Spawn4'],
        ['Mineral_Hauler_E46S57', {role: 'mineral_hauler', target_room: 'E46S57', container_id: '666627b593c29e07436b85eb', mineral_id: '5bbcb692d867df5e542079b2'}, 'road_hauler', 2, 'Spawn4'],
    ],
    
    mineral_E47S51: [
        ['Mineral_Miner_E47S51', {role: 'mineral_miner', target_room: 'E47S51', container_id: '66733c124dec39286774c400', mineral_id: '5bbcb69dd867df5e54207a18'}, 'mineral_miner', 2, 'Spawn5'],
        ['Mineral_Hauler_E47S51', {role: 'mineral_hauler', target_room: 'E47S51', container_id: '66733c124dec39286774c400', mineral_id: '5bbcb69dd867df5e54207a18'}, 'road_hauler', 2, 'Spawn5'],
    ],
};

module.exports = creep_list;