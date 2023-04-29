import * as NBT from "nbtify";
import Block from "./block";

export class Region {
	width: NBT.Short;
	height: NBT.Short;
	length: NBT.Short;
	blockData: NBT.ByteArrayTag;

	constructor(width: number, height: number, length: number, fill: Block) {
		this.width = new NBT.Short(width);
		this.height = new NBT.Short(height);
		this.length = new NBT.Short(length);
		this.blockData = new Int8Array(width * height * length).fill(fill.index);
	}

	positionToIndex(x: number, y: number, z: number): number {
		return (
			x +
			z * this.width.valueOf() +
			y * this.width.valueOf() * this.length.valueOf()
		);
	}

	setBlock(x: number, y: number, z: number, block: Block): void {
		this.blockData[this.positionToIndex(x, y, z)] = block.index.valueOf();
	}

	getBlock(x: number, y: number, z: number): number {
		return this.blockData[this.positionToIndex(x, y, z)];
	}

	get Width(): number {
		return this.width.valueOf();
	}

	get Height(): number {
		return this.height.valueOf();
	}

	get Length(): number {
		return this.length.valueOf();
	}

	toNBT(): NBT.NBTData {
		const root: NBT.CompoundTag = {
			Version: new NBT.Int(2),
			DataVersion: new NBT.Int(2975),
			Width: this.width,
			Height: this.height,
			Length: this.length,
			BlockData: this.blockData,
			PaletteMax: new NBT.Int(Block.maxTags),
			Palette: Block.palette,
		};

		const data = new NBT.NBTData(root, { name: "Schematic" });
		return data;
	}
}
