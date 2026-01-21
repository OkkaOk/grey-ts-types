interface Math {
	readonly PI: number;
	readonly abs: typeof GreyHack.abs;
	readonly acos: typeof GreyHack.acos;
	readonly asin: typeof GreyHack.asin;
	readonly atan: typeof GreyHack.atan;
	readonly ceil: typeof GreyHack.ceil;
	readonly floor: typeof GreyHack.floor;
	readonly cos: typeof GreyHack.cos;
	readonly sin: typeof GreyHack.sin;
	readonly tan: typeof GreyHack.tan;
	readonly sqrt: typeof GreyHack.sqrt;
	readonly sign: typeof GreyHack.sign;
	readonly round: typeof GreyHack.round;
	readonly random: typeof GreyHack.rnd;
	readonly log: typeof GreyHack.log; // Not quite the same
	readonly min: (...values: number[]) => number;
	readonly max: (...values: number[]) => number;
}

declare var Math: Math;