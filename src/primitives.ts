interface RegExp { }
interface CallableFunction { }
interface NewableFunction { }
interface IArguments { }
interface Boolean { }

interface String {
	readonly length: number; // In greyscript this was len()
	/** Returns the Unicode code of the first character of the string */
	code(): number;
	hasIndex(index: number): boolean;
	indexOf(value: string, offset?: number): number | null;
	indexes(): number[];
	insert(index: number, value: string): string;
	isMatch(pattern: string | RegExp, regexOptions?: string): number;
	lastIndexOf(value: string): number;
	lower(): string;
	matches(pattern: string | RegExp, regexOptions?: string): Record<number, string>;
	remove(value: string): string;
	replace(pattern: string | RegExp, newValue: string, regexOptions?: string): string;
	split(pattern: string | RegExp, regexOptions?: string): string[];
	toInt(): string | number;
	trim(): string;
	upper(): string;
	val(): number;
	values(): string[];

	// Extra

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
}

type PropertyKey = number | string | symbol;
interface Object {
	/** Returns the number of items inside the object */
	readonly size: number; // In greyscript this was len()

	hasIndex(key: PropertyKey): boolean;
	indexOf(value: any): any;
	indexes<T extends PropertyKey>(): T[];
	pop(): any;
	pull(): any;
	push(key: PropertyKey): any;
	remove(key: PropertyKey): boolean;
	replace(oldValue: any, newValue: any, maxCount?: number): any;
	shuffle(): null;
	sum(): number;
	values(): any[];

	/** Returns a string representation of an object. */
	toString(): string;
}

interface ObjectConstructor {
	new(value?: any): Object;

	readonly prototype: Object;

	hasOwn<T extends PropertyKey, U = object>(o: U, key: T): o is (T extends keyof U ? U : U & { [K in T]: unknown });

	/** Copy the properties of the source to the target */
	assign<T extends {}, U>(target: T, source: U): T & U;
	assign<T extends {}, U, V>(target: T, source: U, source2: V): T & U & V;
	assign<T extends {}, U, V, W>(target: T, source: U, source2: V, source3: W): T & U & V & W;
	assign(target: object, ...sources: any[]): any;

	keys<T extends Record<any, any>>(o: T): (Exclude<keyof T, symbol>)[];
}

interface Array<T> {
	readonly length: number; // In greyscript this was len()
	hasIndex(index: number): boolean;
	indexOf(value: T, offset?: number): number | null;
	indexes(): number[];
	insert(index: number, value: T): T[];
	join(delimiter: string): string;
	/** Removes the first element from an array and returns it. If the array is empty, null is returned. */
	shift(): T | null;
	/** Inserts new elements at the start of an array, and returns the new length of the array. */
	unshift(...items: T[]): number;
	/** Removes the last element from an array and returns it. If the array is empty, null is returned. */
	pop(): T | null;
	/** Appends new elements to the end of an array, and returns the new length of the array. */
	push(...items: T[]): number;
	remove(index: number): null;
	replace(oldValue: T, newValue: T, maxCount?: number): T[];
	reverse(): null;
	shuffle(): null;
	sort(key: PropertyKey | null, ascending?: boolean): T[];
	sum(): number;
	values(): T[];

	// Custom ones

	/** Combines two or more arrays. This method returns a new array without modifying any existing arrays.
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

	/** Returns a copy of a section of an array. For both start and end, a negative index can be used to indicate an offset from the end of the array.
	 * 
	 * For example, -2 refers to the second to last element of the array. 
	 * @param start The beginning index of the specified portion of the array. If start is undefined, then the slice begins at index 0. 
	 * @param end The end index of the specified portion of the array. This is exclusive of the element at the index 'end'. If end is undefined, then the slice extends to the end of the array.
	 * */
	slice(start?: number, end?: number): T[];

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
	new (value?: any): Boolean;
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