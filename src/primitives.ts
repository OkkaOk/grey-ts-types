interface RegExp { }
interface CallableFunction { }
interface NewableFunction { }
interface IArguments { }
interface Boolean { }

interface String {
	/** Returns the length of the string */
	readonly length: number;

	/** Returns the Unicode code of the first character of the string */
	code(): number;
	hasIndex(index: number): boolean;
	indexOf(value: string, offset?: number): number | null;
	indexes(): number[];
	insert(index: number, value: string): string;

	/**
	 * Uses regular expression to check if a string matches a certain pattern.
	 * 
	 * If the pattern is empty, the provided {@link https://learn.microsoft.com/en-us/dotnet/standard/base-types/regular-expression-options|regexOptions} are invalid, or if the regular expression times out, an error will be thrown, preventing further script execution.
	 */
	isMatch(pattern: string | RegExp, regexOptions?: string): boolean;

	/** Returns the last occurrence of a substring in the string. */
	lastIndexOf(searchString: string): number;

	/** Converts all the alphabetic characters in a string to lowercase. */
	toLowerCase(): string;

	/** Converts all the alphabetic characters in a string to uppercase. */
	toUpperCase(): string;

	/**
	 * Returns an object with all search results for the provided regular expression.
	 * 
	 * Each key contains the index and the value contains the matching string.
	 * 
	 * If the pattern is empty, the provided {@link https://learn.microsoft.com/en-us/dotnet/standard/base-types/regular-expression-options|regexOptions} are invalid, or if the regular expression times out, an error will be thrown, preventing further script execution.
	 */
	matches(pattern: string | RegExp, regexOptions?: string): Record<number, string>;

	/** 
	 * Returns a new string with the provided value removed
	 * @example
	 * const myString = "I will not eat an ice cream!";
	 * const newString = myString.remove("not ");
	 * print(newString); // Prints "I will eat an ice cream!"
	 */
	remove(value: string): string;

	/**
	 * Returns a string with the replaced content by using regular expressions.
	 * 
	 * If the pattern is empty, the provided {@link https://learn.microsoft.com/en-us/dotnet/standard/base-types/regular-expression-options|regexOptions} are invalid or if the regular expression times out, an error will be thrown, preventing further script execution.
	 * 
	 * @example
	 * const myString = "I am now online";
	 * const newString = myString.replace("online", "offline");
	 * print(newString); // Prints "I am now offline"
	 */
	replace(pattern: string | RegExp, newValue: string, regexOptions?: string): string;

	/**
	 * Returns an array where each item is a segment of the string, separated by the provided separator string.
	 * 
	 * This method uses regular expressions for matching, so remember to escape special characters such as dots.
	 * 
	 * In case the pattern is empty, the provided {@link https://learn.microsoft.com/en-us/dotnet/standard/base-types/regular-expression-options|regexOptions} are invalid, or the regular expression times out, an error will be thrown, preventing further script execution.
	 * 
	 * @example
	 * const csvString = "cat,turtle,dog,mouse";
	 * const animals = csvString.split(",");
	 * print(animals); // Prints ["cat", "turtle", "dog", "mouse"]
	 */
	split(pattern: string | RegExp, regexOptions?: string): string[];

	/**
	 * Returns a number which is parsed from the string as an integer.
	 * 
	 * In case the string is not numeric it will return the original string.
	 */
	toInt(): string | number;

	/** Removes the leading and trailing white space characters from a string. */
	trim(): string;

	/** Returns a number which is parsed from the string. In case the string is not numeric it will return a zero. */
	val(): number;

	/** Returns an array where each item is a string representing all available characters in the string. Could be compared to using {@link String.split|split} but with empty separator. */
	values(): string[];

	// Extra

	/** Removes the leading white space characters from a string. */
	trimStart(): string;

	/** Removes the trailing white space characters from a string. */
	trimEnd(): string;

	/**
	 * Returns true if searchString appears as a substring of this string, at one or more positions that are greater than or equal to position; otherwise, returns false.
	 * 
	 * @param searchString search string
	 * @param position If position is undefined, 0 is assumed, so as to search all of the string.
	 */
	includes(searchString: string, position?: number): boolean;

	/** Returns true if this string starts with the searchString. Otherwise returns false. */
	startsWith(searchString: string, position?: number): boolean;

	/** Returns true if this string ends with the searchString. Otherwise returns false. */
	endsWith(searchString: string, endPosition?: number): boolean;

	/**
	 * Returns a string value that is made from count copies appended together.
	 * 
	 * If count is 0, the empty string is returned.
	 */
	repeat(count: number): string;

	/**
	 * Returns a section of a string.
	 * @param start The index to the beginning of the specified portion of string. 
	 * @param end The index to the end of the specified portion of string. The substring includes the characters up to, but not including, the character indicated by end. If this value is not specified, the substring continues to the end of string.
	 */
	slice(start?: number, end?: number): string;

	/** Returns a string representation of a string. */
	toString(): string;

	readonly [index: number]: string;
}

interface Number {
	/** Returns a string representation of a number. */
	toString(): string;

	/**
	 * Returns a string representing a number in fixed-point notation.
	 * @param fractionDigits Number of digits after the decimal point.
	 */
	toFixed(fractionDigits?: number): string;
}

type PropertyKey = number | string | symbol;
interface Object {
	/** Returns a string representation of an object. */
	toString(): string;
}

interface ObjectConstructor {
	new(value?: any): Object;

	readonly prototype: Object;

	/** Determines whether an object has a property with the specified name. */
	hasOwn<T extends PropertyKey, U = object>(o: U, key: T): o is (T extends keyof U ? U : U & { [K in T]: unknown });

	/**
	 * Returns a key of the object that has a value equal to the given value
	 * @example
	 * const myObject = { test: 123, other: 222 };
	 * const key = Object.indexOf(myObject, 222);
	 * print(key); // Prints "other"
	 */
	indexOf<T extends Record<any, any>>(o: T, value: T[keyof T]): keyof T | null;

	/** Copy the properties of the source to the target */
	assign<T extends {}, U>(target: T, source: U): T & U;
	assign<T extends {}, U, V>(target: T, source: U, source2: V): T & U & V;
	assign<T extends {}, U, V, W>(target: T, source: U, source2: V, source3: W): T & U & V & W;
	assign(target: object, ...sources: any[]): any;

	/** Returns the number of items inside the object */
	size<T extends Record<any, any>>(o: T): number;

	/** Returns an array of keys of the object */
	keys<T extends Record<any, any>>(o: T): (Exclude<keyof T, symbol>)[];

	/** Returns an array of values of the object */
	values<T extends Record<any, any>>(o: T): (T[keyof T])[];

	/** Returns sum of all values inside the given object. Any non-numeric values will be considered a zero. */
	sum(o: Record<any, any>): number;

	/** Shuffles all **values** in the object. This operation will mutate the map. */
	shuffle(o: Record<any, any>): null;

	/**
	 * Replaces each value of the object matching `oldValue` with `newValue`.
	 * 
	 * This method will mutate the object
	 * @example
	 * const myObject = { status: "online" };
	 * Object.replace(myObject, "online", "offline");
	 * print(myObject); // Prints { "status": "offline" };
	 */
	replace<T extends Record<any, any>>(o: T, oldValue: T[keyof T], newValue: T[keyof T], maxCount?: number): T;

	/**
	 * Removes a key-value pair from the object. This method mutates the object.
	 * 
	 * @returns a boolean indicating success
	 */
	remove<T extends Record<any, any>>(o: T, key: keyof T): boolean;

	/**
	 * Removes the first item of the object and returns it's key
	 * 
	 * This method mutates the object.
	 */
	shift<T extends Record<any, any>>(o: T): keyof T | null;
}

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


interface Function {
	/** Returns a string representation of a function. */
	toString(): string;
}

declare var String: {
	new(value?: any): String;
	(value?: any): string;
	readonly prototype: String;
};

declare var Number: {
	new(value?: any): Number;
	(value?: any): number;
	readonly prototype: Number;
};

declare var Boolean: {
	new(value?: any): Boolean;
	<T>(value?: T): boolean;
	readonly prototype: Boolean;
};

declare var Array: {
	readonly prototype: Array<any>;
};

declare var Function: {
	readonly prototype: Function;
};

declare var Object: ObjectConstructor;