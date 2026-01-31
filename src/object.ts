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

declare var Object: ObjectConstructor;