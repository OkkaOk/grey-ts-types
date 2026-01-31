interface Array<T> {
	readonly length: number; // In greyscript this was len()

	/** Returns a boolean indicating if the provided index exists in the array */
	hasIndex(index: number): boolean;

	/** Returns the index of the first occurrence of a value in an array, or null if it is not present. */
	indexOf(value: T, offset?: number): number | null;

	/** Returns an array containing the indexes of the array */
	indexes(): number[];

	/** Inserts a value into the array at the provided index. This method mutates the array and returns a reference to the same array. */
	insert(index: number, value: T): T[];

	/**
	 * Returns a concatenated string containing all stringified values inside the list. These values will be separated via the provided separator.
	 * 
	 * In case the list exceeds `16777215L` items or the delimiter exceeds 128 characters, this method will throw an error, interrupting further script execution.
	 */
	join(delimiter: string): string;

	/** Removes the first element from an array and returns it. If the array is empty, null is returned. */
	shift(): T | null;

	/** Inserts new elements at the start of an array, and returns the new length of the array. */
	unshift(...items: T[]): number;

	/** Removes the last element from an array and returns it. If the array is empty, null is returned. */
	pop(): T | null;

	/** Appends new elements to the end of an array, and returns the new length of the array. */
	push(...items: T[]): number;

	/**
	 * Removes an item from the list with the provided index. Due to the removal the list will get mutated.
	 */
	remove(index: number): null;

	/**
	 * Changes every value of the array that matches `oldValue` into `newValue`
	 * 
	 * This method mutates the array and returns a reference to the same array.
	 */
	replace(oldValue: T, newValue: T, maxCount?: number): T[];

	/** Reverses the elements in an array in place. This method mutates the array and returns a reference to the same array. */
	reverse(): T;

	/** Shuffles all values in the array. This method mutates the array. */
	shuffle(): null;

	/** 
	 * Sorts the values of an array alphanumerically.
	 * 
	 * This operation mutates the original array. Optionally, a key can be provided, which is used if the items are objects or arrays. Finally, this method returns the updated array.
	 * @example
	 * const myArray = [{ key: 123 }, { key: 5 }, { key: 17 }];
	 * myArray.sort("key");
	 * 
	 * const numbers = [1,2,3,4,5];
	 * numbers.sort()
	 */
	sort(key?: PropertyKey | null, ascending?: boolean): T[];

	/** Returns a sum of all values inside the array. Any non-numeric values will be considered a zero. */
	sum(): number;

	values(): T[];

	// Custom ones

	/**
	* Changes all array elements from `start` to `end` index to a static `value` and returns the modified array
	* @param value value to fill array section with
	* @param start index to start filling the array at. If start is negative, it is treated as
	* length+start where length is the length of the array.
	* @param end index to stop filling the array at. If end is negative, it is treated as
	* length+end.
	*/
	fill(value: T, start?: number, end?: number): this;

	/** Determines whether an array includes a certain element, returning true or false as appropriate. */
	includes(searchElement: T, fromIndex?: number): boolean;

	/**
	 * Combines two or more arrays. This method returns a new array without modifying any existing arrays.
	 * @param items Additional arrays and/or items to add to the end of the array.
	 */
	concat(...items: (T | T[])[]): T[];

	/** Calls a defined callback function on each element of an array, and returns an array that contains the results. */
	map<U>(callbackfn: (value: T, index: number, array: T[]) => U): U[];

	/** Returns the elements of an array that meet the condition specified in a callback function. */
	filter(predicate: (value: T, index: number, array: T[]) => unknown): T[];

	/** Returns the value of the first element in the array where predicate is true, and null otherwise. */
	find(predicate: (value: T, index: number, array: T[]) => unknown): T | null;

	/** Determines whether the specified callback function returns true for any element of an array. */
	some(predicate: (value: T, index: number, array: T[]) => unknown): boolean;

	/** Determines whether all the members of an array satisfy the specified test. */
	every(predicate: (value: T, index: number, array: T[]) => unknown): boolean;

	/**
	 * Returns a copy of a section of an array. For both start and end, a negative index can be used to indicate an offset from the end of the array.
	 * 
	 * For example, -2 refers to the second to last element of the array. 
	 * @param start The beginning index of the specified portion of the array. If start is undefined, then the slice begins at index 0. 
	 * @param end The end index of the specified portion of the array. This is exclusive of the element at the index 'end'. If end is undefined, then the slice extends to the end of the array.
	 * */
	slice(start?: number, end?: number): T[];

	/**
	 * Removes elements from an array and returns the deleted elements.
	 * 
	 * For example, -2 refers to the second to last element of the array. 
	 * @param start  The zero-based location in the array from which to start removing elements 
	 * @param end The number of elements to remove. Omitting this argument will remove all elements from the start paramater location to end of the array.
	 * */
	splice(start: number, deleteCount?: number): T[];

	/** Returns a string representation of an array. */
	toString(): string;

	[n: number]: T;
}

declare var Array: {
	readonly prototype: Array<any>;
};