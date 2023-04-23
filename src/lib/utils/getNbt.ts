import Block from "./block";
import { Region } from "./region";
import type { Note } from "@tonejs/midi/dist/Note";
import type { Midi } from "@tonejs/midi";

const AIR = Block.create("minecraft:air");
const REPEATER_NORTH = Block.create("minecraft:repeater[facing=north]");
const WHITE_CONCRETE = Block.create("minecraft:white_concrete");
const REDSTONE_WIRE = Block.create("minecraft:redstone_wire");
const OBSERVER_DOWN = Block.create("minecraft:observer[facing=down]");
const OBSERVER_UP = Block.create("minecraft:observer[facing=up]")
const POWERED_RAIL = Block.create("minecraft:powered_rail[shape=east_west]");
const REDSTONE_BLOCK = Block.create("minecraft:redstone_block");
const REDSTONE_LAMP = Block.create("minecraft:redstone_lamp");
const STICKY_PISTON_SOUTH = Block.create("minecraft:sticky_piston[facing=south]");
const STICKY_PISTON_DOWN = Block.create("minecraft:sticky_piston[facing=down]");
const LEVER = Block.create("minecraft:lever[face=floor]");

const INSTRUMENT_BLOCKS = [
	Block.create("minecraft:oak_planks"),
	Block.create("minecraft:white_wool"),
	Block.create("minecraft:dirt"),
	Block.create("minecraft:clay"),
	Block.create("minecraft:gold_block"),
];

const PLATFORM_WIDTH = 15;
const HALF_PLATFORM_WIDTH = Math.floor(PLATFORM_WIDTH / 2)
const LEVER_PADDING = 5;
const PLATFORM_LEVER_DIST = 7;

const createPlatforms = (reg: Region) => {
	for (let x = 0; x < reg.Width; x++) {
		for (let z = 0; z < reg.Length; z++) {
			reg.setBlock(x, 0, z, WHITE_CONCRETE);
			reg.setBlock(x, 6, z, WHITE_CONCRETE);
		}
	}
};

const createRepeater = (reg: Region, width: number, offset: number) => {
	const first = (LEVER_PADDING + PLATFORM_LEVER_DIST) % 2;
	for (let z = 0; z < reg.Length; z++) {
		if (z >= LEVER_PADDING + PLATFORM_LEVER_DIST) {
			if (z % 2 == first) {
				reg.setBlock(width + 1 + offset, 1, z, REPEATER_NORTH);
				reg.setBlock(width - 1 + offset, 1, z, REPEATER_NORTH);
			} else {
				reg.setBlock(width + 1 + offset, 1, z, REDSTONE_LAMP);
				reg.setBlock(width - 1 + offset, 1, z, REDSTONE_LAMP);
			}
		}
	}
};

const createFirstLayer = (reg: Region, width: number, offset: number) => {
	const first = (LEVER_PADDING + PLATFORM_LEVER_DIST) % 2;
	for (let z = LEVER_PADDING + PLATFORM_LEVER_DIST; z < reg.Length; z++) {
		if (z % 2 !== first) {
			reg.setBlock(width + 1 + offset, 2, z, OBSERVER_DOWN);
		} else {
			reg.setBlock(width - 1 + offset, 2, z, OBSERVER_DOWN);
		}
	}
};

const createTopLayer = (reg: Region) => {
	for (let z = LEVER_PADDING + PLATFORM_LEVER_DIST; z < reg.Length; z++) {
		for (let x = 0; x < reg.Width; x++) {
			reg.setBlock(x, 3, z, WHITE_CONCRETE);
			reg.setBlock(x, 4, z, POWERED_RAIL);
			reg.setBlock(x, 5, z, OBSERVER_DOWN);
		}
	}
};

const createRedstoneLamps = (reg: Region, offset: number) => {
	for (let z = LEVER_PADDING + PLATFORM_LEVER_DIST; z < reg.Length; z++) {
		reg.setBlock(offset, 7, z, REDSTONE_LAMP);
	}
};

const createLayers = (reg: Region, width: number, offset: number) => {
	createRepeater(reg, width, offset);
	createFirstLayer(reg, width, offset);

	createNonPistonConnection(reg, offset + HALF_PLATFORM_WIDTH);
	createPistonConnection(reg, offset + HALF_PLATFORM_WIDTH);

	reg.setBlock(offset + HALF_PLATFORM_WIDTH + 1, 1, PLATFORM_LEVER_DIST, REDSTONE_WIRE);
	reg.setBlock(offset + HALF_PLATFORM_WIDTH - 0, 1, PLATFORM_LEVER_DIST, REDSTONE_WIRE);
	reg.setBlock(offset + HALF_PLATFORM_WIDTH - 1, 1, PLATFORM_LEVER_DIST, REDSTONE_WIRE);

	reg.setBlock(offset + HALF_PLATFORM_WIDTH - 0, 1, PLATFORM_LEVER_DIST - 1, REPEATER_NORTH);
};

const createStart = (reg: Region, offset: number) => {
	reg.setBlock(offset, 7, LEVER_PADDING, LEVER);
	reg.setBlock(offset, 6, LEVER_PADDING, REDSTONE_LAMP);
	reg.setBlock(offset, 5, LEVER_PADDING, OBSERVER_UP);
	reg.setBlock(offset, 4, LEVER_PADDING, REDSTONE_WIRE);
	reg.setBlock(offset, 3, LEVER_PADDING, STICKY_PISTON_DOWN);
	reg.setBlock(offset, 2, LEVER_PADDING, REDSTONE_BLOCK)

	reg.setBlock(offset, 2, LEVER_PADDING, REDSTONE_BLOCK)

	for (let i = 0; i <= 14; i++) {
		reg.setBlock(offset - 1 - i, 1, LEVER_PADDING, REDSTONE_WIRE)
		reg.setBlock(offset + 1 + i, 1, LEVER_PADDING, REDSTONE_WIRE)
	}
};

const createNonPistonConnection = (reg: Region, offset: number) => {
	// One game tick repeater
	reg.setBlock(offset + 1, 1, PLATFORM_LEVER_DIST + 1, REPEATER_NORTH);

	// Connection to noteblock repeaters
	reg.setBlock(offset + 1, 1, PLATFORM_LEVER_DIST + 2, REDSTONE_WIRE);
	reg.setBlock(offset + 1, 1, PLATFORM_LEVER_DIST + 3, REDSTONE_WIRE);
	reg.setBlock(offset + 1, 1, PLATFORM_LEVER_DIST + 4, REDSTONE_WIRE);
};

const createPistonConnection = (reg: Region, offset: number) => {
	// Connection to the right side
	reg.setBlock(offset - 2, 1, PLATFORM_LEVER_DIST, REDSTONE_WIRE);

	// Connection to Piston with block
	reg.setBlock(offset - 2, 1, PLATFORM_LEVER_DIST + 1, WHITE_CONCRETE);
	reg.setBlock(offset - 2, 2, PLATFORM_LEVER_DIST + 1, REDSTONE_WIRE);

	// Piston and block
	reg.setBlock(offset - 2, 2, PLATFORM_LEVER_DIST + 2, STICKY_PISTON_SOUTH);
	reg.setBlock(offset - 2, 2, PLATFORM_LEVER_DIST + 3, WHITE_CONCRETE);

	// Redstone block and redstone wire under piston block
	reg.setBlock(offset - 2, 1, PLATFORM_LEVER_DIST + 3, REDSTONE_WIRE);
	reg.setBlock(offset - 2, 0, PLATFORM_LEVER_DIST + 3, REDSTONE_BLOCK);

	// Connection to noteblock repeaters
	reg.setBlock(offset - 1, 1, PLATFORM_LEVER_DIST + 3, WHITE_CONCRETE);
	reg.setBlock(offset - 1, 2, PLATFORM_LEVER_DIST + 3, REDSTONE_WIRE);
	reg.setBlock(offset - 1, 1, PLATFORM_LEVER_DIST + 4, REDSTONE_WIRE);
};


const timeToCoord = (time: number) => {
	return Math.round(time * 30);
};

const createNoteBlock = (
	reg: Region,
	width: number,
	note: Note,
	instrumentBlock: Block,
	start: number,
) => {
	let velPos = Math.round((note.midi / 128 + (1 - note.velocity)) / 2 * width);
	const coord = timeToCoord(note.time) + start + PLATFORM_LEVER_DIST;
	const noteblock = Block.create(
		`minecraft:note_block[note=${note.midi - 54}]`,
	);

	const velAdd = velPos > width / 2 ? -1 : 1;

	while (velPos > 0 && velPos <= width) {
		if (reg.getBlock(width + velPos, 7, coord) === AIR.index) {
			reg.setBlock(width + velPos, 7, coord, noteblock);
			reg.setBlock(width + velPos, 6, coord, instrumentBlock);
			break;
		} else if (reg.getBlock(width - velPos, 7, coord) === AIR.index) {
			reg.setBlock(width - velPos, 7, coord, noteblock);
			reg.setBlock(width - velPos, 6, coord, instrumentBlock);
			break;
		}
		velPos += velAdd;
	}
};

const createNoteBlocks = (
	reg: Region,
	width: number,
	audio: Midi,
) => {
	audio.tracks.forEach((track, i) => {
		track.notes.forEach((note) => {
			createNoteBlock(reg, width, note, INSTRUMENT_BLOCKS[i], LEVER_PADDING);
		});
	});
};

export const generateNBT = (audio: Midi) => {
	const reg = new Region(PLATFORM_WIDTH * 3, 8, timeToCoord(audio.duration + 1));

	createPlatforms(reg);
	createTopLayer(reg);
	createLayers(reg, HALF_PLATFORM_WIDTH, PLATFORM_WIDTH * 0);
	createLayers(reg, HALF_PLATFORM_WIDTH, PLATFORM_WIDTH * 1);
	createLayers(reg, HALF_PLATFORM_WIDTH, PLATFORM_WIDTH * 2);
	createRedstoneLamps(reg, PLATFORM_WIDTH + HALF_PLATFORM_WIDTH);
	createNoteBlocks(reg, PLATFORM_WIDTH * 3, audio);

	createStart(reg, HALF_PLATFORM_WIDTH + PLATFORM_WIDTH);

	const nbtData = reg.toNBT();
	return nbtData;
};
