import Block from "./block";
import { Region } from "./region";
import type { Note } from "@tonejs/midi/dist/Note";
import type { Midi } from "@tonejs/midi";

const AIR = new Block('minecraft:air');
const REPEATER = new Block('minecraft:repeater');
const WHITE_CONCRETE = new Block('minecraft:white_concrete');
const REDSTONE_WIRE = new Block('minecraft:redstone_wire');
const OBSERVER_DOWN = new Block('minecraft:observer[facing=down]');
const POWERED_RAIL = new Block('minecraft:powered_rail[shape=east_west]');
const REDSTONE_BLOCK = new Block('minecraft:redstone_block');
const REDSTONE_LAMP = new Block('minecraft:redstone_lamp');
const STICKY_PISTON = new Block('minecraft:sticky_piston[facing=south]');
const LEVER = new Block('minecraft:lever[face=floor]');

const INSTRUMENT_BLOCKS = [
	new Block("minecraft:oak_planks"),
	new Block("minecraft:white_wool"),
	new Block("minecraft:dirt"),
	new Block("minecraft:clay"),
	new Block("minecraft:gold_block"),
];

const createPlatforms = (reg: Region) => {
	for (let x = 0; x < reg.Width; x++) {
		for (let z = 0; z < reg.Length; z++) {
			reg.setBlock(x, 0, z, WHITE_CONCRETE);
			reg.setBlock(x, 6, z, WHITE_CONCRETE);
		}
	}
}

const createRepeater = (reg: Region, width: number, start = 0) => {
	const first = (start + 5) % 2;
	for (let z = 0; z < reg.Length; z++) {
		if (z >= 5) {
			if (z % 2 == first) {
				reg.setBlock(width + 1, 1, z, REPEATER);
				reg.setBlock(width - 1, 1, z, REPEATER);
			} else {
				reg.setBlock(width + 1, 1, z, REDSTONE_LAMP);
				reg.setBlock(width - 1, 1, z, REDSTONE_LAMP);
			}
		}
	}
}

const createFirstLayer = (reg: Region, width: number, start = 0) => {
	const first = (start + 5) % 2;
	for (let z = start + 5; z < reg.Length; z++) {
		if (z % 2 !== first) {
			reg.setBlock(width + 1, 2, z, OBSERVER_DOWN);
		} else {
			reg.setBlock(width - 1, 2, z, OBSERVER_DOWN);
		}
	}
}

const createTopLayer = (reg: Region, start = 0) => {
	for (let z = start + 5; z < reg.Length; z++) {
		for (let x = 0; x < reg.Width; x++) {
			reg.setBlock(x, 3, z, WHITE_CONCRETE);
			reg.setBlock(x, 4, z, POWERED_RAIL);
			reg.setBlock(x, 5, z, OBSERVER_DOWN);
		}
	}
};


const createRedstoneLamps = (reg: Region, width: number, start = 0) => {
	for (let z = start + 5; z < reg.Length; z++) {
		reg.setBlock(width, 7, z, REDSTONE_LAMP);
	}
};

const createLayers = (reg: Region, width: number, start = 0) => {
	createPlatforms(reg);
	createRepeater(reg, width, start);
	createFirstLayer(reg, width, start);
	createTopLayer(reg, start);
	createRedstoneLamps(reg, width, start);
};


const createStart = (reg: Region, width: number, start = 0) => {
	reg.setBlock(width, 7, start, LEVER);

	createStaircase(reg, width, start);
	createNonPistonConnection(reg, width, start);
	createPistonConnection(reg, width, start);
}


const createStaircase = (reg: Region, width: number, start = 0) => {
	// first block
	reg.setBlock(width, 5, start + 0, REDSTONE_WIRE)
	reg.setBlock(width, 4, start + 0, WHITE_CONCRETE)

	// second block
	reg.setBlock(width, 4, start + 1, REDSTONE_WIRE)
	reg.setBlock(width, 3, start + 1, WHITE_CONCRETE)

	// third block
	reg.setBlock(width + 1, 3, start + 1, REDSTONE_WIRE)
	reg.setBlock(width + 1, 2, start + 1, WHITE_CONCRETE)

	// forth block
	reg.setBlock(width + 1, 2, start + 0, REDSTONE_WIRE)
	reg.setBlock(width + 1, 1, start + 0, WHITE_CONCRETE)
}


const createNonPistonConnection = (reg: Region, width: number, start = 0) => {
	// One game tick repeater
	reg.setBlock(width + 1, 1, start + 1, REPEATER);

	// Connection to noteblock repeaters
	reg.setBlock(width + 1, 1, start + 2, REDSTONE_WIRE);
	reg.setBlock(width + 1, 1, start + 3, REDSTONE_WIRE);
	reg.setBlock(width + 1, 1, start + 4, REDSTONE_WIRE);
}

const createPistonConnection = (reg: Region, width: number, start = 0) => {
	// Connection to the right side
	reg.setBlock(width, 1, start, REDSTONE_WIRE);
	reg.setBlock(width - 1, 1, start, REDSTONE_WIRE);
	reg.setBlock(width - 2, 1, start, REDSTONE_WIRE);

	// Connection to Piston with block
	reg.setBlock(width - 2, 1, start + 1, WHITE_CONCRETE);
	reg.setBlock(width - 2, 2, start + 1, REDSTONE_WIRE);

	// Piston and block
	reg.setBlock(width - 2, 2, start + 2, STICKY_PISTON);
	reg.setBlock(width - 2, 2, start + 3, WHITE_CONCRETE);

	// Redstone block and redstone wire under piston block
	reg.setBlock(width - 2, 1, start + 3, REDSTONE_WIRE);
	reg.setBlock(width - 2, 0, start + 3, REDSTONE_BLOCK);

	// Connection to noteblock repeaters
	reg.setBlock(width - 1, 1, start + 3, WHITE_CONCRETE);
	reg.setBlock(width - 1, 2, start + 3, REDSTONE_WIRE);
	reg.setBlock(width - 1, 1, start + 4, REDSTONE_WIRE);
}

const timeToCoord = (time: number) => {
	return Math.round(time * 30);
}

const createNoteBlock = (reg: Region, width: number, note: Note, instrumentBlock: Block, start: number) => {
	let vel_pos = width - Math.round((note.velocity * width) / 128);
	const coord = timeToCoord(note.time) + start + 5;
	const note_block = new Block(`minecraft:note_block[note=${note.midi - 54}]`);

	const vel_add = vel_pos > width / 2 ? -1 : 1;

	while (vel_pos > 0 && vel_pos <= width) {
		if (reg.getBlock(width + vel_pos, 7, coord) === AIR.index) {
			reg.setBlock(width + vel_pos, 7, coord, note_block);
			reg.setBlock(width + vel_pos, 6, coord, instrumentBlock);
			break;
		} else if (reg.getBlock(width - vel_pos, 7, coord) === AIR.index) {
			reg.setBlock(width - vel_pos, 7, coord, note_block);
			reg.setBlock(width - vel_pos, 6, coord, instrumentBlock);
			break;
		}
		vel_pos += vel_add;
	}
}

const createNoteBlocks = (reg: Region, width: number, audio: Midi, start = 0) => {
	audio.tracks.forEach((track, i) => {
		track.notes.forEach(note => {
			createNoteBlock(reg, width, note, INSTRUMENT_BLOCKS[i], start);
		})
	})
}

export const generateNBT = (audio: Midi, width = 7, start = 5) => {
	const reg = new Region(width * 2 + 1, 8, timeToCoord(audio.duration + 1))

	createLayers(reg, width, start)
	createStart(reg, width, start)
	createNoteBlocks(reg, width, audio, start)

	const nbtData = reg.toNBT()
	return nbtData;
}
