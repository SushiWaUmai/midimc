import * as NBT from "nbtify";

export class Block {
	static maxTags = 0;
	static blocks: Block[] = [];
	static palette: { [key: string]: NBT.Int } = {};

	name: string;
	index: number;

	constructor(name: string) {
		this.name = name;
		this.index = Block.maxTags;

		Block.maxTags += 1;
		Block.blocks.push(this);

		Block.palette[this.name] = new NBT.Int(this.index);

		return this;
	}

	static get(index: number): Block {
		return Block.blocks[index];
	}
}

export default Block;
