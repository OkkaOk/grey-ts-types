interface Math {
	/** Returns the value of pi to the precision of 6 */
	readonly PI: number;

	/** Returns the absolute value of number. */
	abs(value: number): number;

	/** Returns the inverse cosine (in radians) of a number. */
	acos(value: number): number;

	/** Returns the inverse sine (in radians) of a number. */
	asin(value: number): number;

	/** Returns the inverse tangent (in radians) of a number. */
	atan(y: number, x?: number | undefined): number;

	/** Returns number rounded up to the integer value of the provided number. */
	ceil(value: number): number;

	/** Returns number rounded down to the integer value of the provided number. */
	floor(value: number): number;

	/** Returns the cosine of a number in radians. */
	cos(value: number): number;

	/** Returns the sine of a number in radians. */
	sin(value: number): number;

	/** Returns the tangent of a number in radians. */
	tan(value: number): number;

	/** Returns the square root of a number. */
	sqrt(value: number): number;

	/** Returns 1 or -1 indicating the sign of the value passed or 0 if the value is 0 */
	sign(value: number): -1 | 0 | 1;

	/** Returns number rounded to the integer value of the provided number. */
	round(value: number, fixed?: number | undefined): number

	/** Returns a random number between 0 and 1. Optionally a seed number can be provided. */
	random(seed?: number | undefined): number;

	/**
	 * Returns the natural logarithm of a number.
	 * 
	 * By default, the base is 10. Optionally the base can be changed.
	 */
	log(value: number, base?: number | undefined): number; // Not quite the same

	/** Returns the smallest number of the given values */
	min(...values: number[]): number;

	/** Returns the largest number of the given values */
	max(...values: number[]): number;
}

declare var Math: Math;