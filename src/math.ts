interface Math {
	readonly PI: number;
	readonly abs: (value: number) => number;
	readonly acos: (value: number) => number;
	readonly asin: (value: number) => number;
	readonly atan: (y: number, x?: number | undefined) => number;
	readonly ceil: (value: number) => number;
	readonly floor: (value: number) => number;
	readonly cos: (value: number) => number;
	readonly sin: (value: number) => number;
	readonly tan: (value: number) => number;
	readonly sqrt: (value: number) => number;
	readonly sign: (value: number) => number;
	readonly round: (value: number, fixed?: number | undefined) => number
	readonly random: (seed?: number | undefined) => number;
	readonly log: (value: number, base?: number | undefined) => number; // Not quite the same
	readonly min: (...values: number[]) => number;
	readonly max: (...values: number[]) => number;
}

declare var Math: Math;