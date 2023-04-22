import * as NBT from "nbtify";

export class Block {
	static maxTags = 0;
	static blocks: Block[] = [];
	static palette: { [key: string]: NBT.Int } = {};

	name: string;
	index: number;

	private constructor(name: string) {
		this.name = name;
		this.index = Block.maxTags;
	}

	static create(name: string) {
		if (Block.palette[name]) {
			return Block.blocks[Block.palette[name].valueOf()];
		}

		const block = new Block(name);

		Block.maxTags += 1;
		Block.blocks.push(block);

		Block.palette[this.name] = new NBT.Int(block.index);

		return block;
	}

	static get(index: number): Block {
		return Block.blocks[index];
	}
}

export default Block;
