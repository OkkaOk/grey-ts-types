interface Set<T> {
	/** Appends a new element with a specified value to the end of the Set. */
	add(value: T): this;

	/** Empties the set */
	clear(): null;

	/**
	 * Removes a specified value from the Set.
	 * @returns Returns true if an element in the Set existed and has been removed, or false if the element does not exist.
	 */
	delete(value: T): boolean;

	/** Executes a provided function once per each value in the Set object, in insertion order. */
	forEach(callbackfn: (value: T, set: Set<T>) => void): void;

	/** @returns a boolean indicating whether an element with the specified value exists in the Set or not. */
	has(value: T): boolean;

	/** Returns an array of the values in the set */
	values(): T[];

	/** @returns the number of (unique) elements in Set. */
	readonly size: number;
}

interface SetConstructor {
	new <T = any>(values?: readonly T[] | null): Set<T>;
}

declare var Set: SetConstructor;