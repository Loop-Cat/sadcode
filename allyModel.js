const $_ = require('./crypt');
// alliance leader playerName. undefined to disable synchronization
const SYNC_PLAYER_BY_SHARD = {
	shard0: undefined,
	shard1: 'U-238',
	shard2: 'Winnduu',
	shard3: 'Shylo132',
};
// set to `true` if you are alliance leader
const SYNC_LEADER_BY_SHARD = {
	shard0: false,
	shard1: false,
	shard2: false,
	shard3: false,
};
// segment id for data synchronization
const SYNC_SEGMENT = 98;
// interval of synchronization in game ticks
const SYNC_INTERVAL = 100;

const SYNC_PLAYER = SYNC_PLAYER_BY_SHARD[Game.shard.name];
const SYNC_LEADER = SYNC_LEADER_BY_SHARD[Game.shard.name];

class AllyModel {

	constructor() {
		this.localAllies = {};
		this.allies = {};
		this.associates = {};

		if (SYNC_LEADER) {
			// save allies data to memory
			Memory.allies_ = this.allies;
			Memory.associates = this.associates;
			// save allies data to segment
			const data = JSON.stringify({allies: this.allies, associates: this.associates});
			RawMemory.segments[SYNC_SEGMENT] = $_(data);
			RawMemory.setPublicSegments([SYNC_SEGMENT]);
			RawMemory.setDefaultPublicSegment(SYNC_SEGMENT);
		} else {
			// load allies data from memory, if no memory set write default list of allies
			this.allies = Memory.allies_ || (Memory.allies_ = this.allies);
			this.associates = Memory.associates || (Memory.associates = this.associates);
			this.nextSyncTime = Game.time;
		}
	}

	setLocalAllies(localAllies) {
		this.localAllies = localAllies;
	}

	getSegment() {
		return SYNC_SEGMENT;
	}

	sync() {
		if (SYNC_LEADER || !SYNC_PLAYER || Game.time < this.nextSyncTime) {
			return;
		}

		const segment = RawMemory.foreignSegment;
		if (!segment || segment.username !== SYNC_PLAYER || segment.id !== SYNC_SEGMENT) {
			// set public segment for read and wait for next tick
			RawMemory.setActiveForeignSegment(SYNC_PLAYER, SYNC_SEGMENT);
			if (Game.time > this.nextSyncTime + 2) {
				console.log(`Error: foreignSegment ${SYNC_SEGMENT} of ${SYNC_PLAYER} was not loaded or could not be accessed`);
				this.nextSyncTime = Game.time + SYNC_INTERVAL;
			}
			return;
		}
		try {
			let segmentData = $_(segment.data);
			const data = JSON.parse(segmentData || '{}');
			if (typeof data !== 'object' || !data.allies || !data.associates) {
				console.log(`Error: alliance data is missing in ${SYNC_PLAYER} public segment ${SYNC_SEGMENT}`);
			} else {
				// alliance data loaded successfully
				this.allies = Memory.allies_ = data.allies;
				this.associates = Memory.associates = data.associates;
			}
		} catch (error) {
			console.log(`Error: could not parse alliance data from ${SYNC_PLAYER} public segment ${SYNC_SEGMENT}`);
		}
		this.nextSyncTime = Game.time + SYNC_INTERVAL;
	}

	// Method to check if a player is an ally
	isAlly(playerName) {
		return (
			playerName in this.allies ||
			playerName in this.associates ||
			playerName in this.localAllies
		);
	}

}
module.exports = new AllyModel();