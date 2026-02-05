interface Map<K, V> {
	/** Deletes all entries from the map */
	clear(): null;

	/** @returns true if an element in the Map existed and has been removed, or false if the element does not exist */
	delete(key: K): boolean;

	/**
	* Executes a provided function once per each key/value pair in the Map, in insertion order.
	*/
	forEach(callbackfn: (value: V, key: K, map: Map<K, V>) => void): void;

	/**
	 * Returns a specified element from the Map object. If the value that is associated to the provided key is an object, then you will get a reference to that object and any change made to that object will effectively modify it inside the Map.
	 * @returns Returns the element associated with the specified key. If no element is associated with the specified key, null is returned.
	 */
	get(key: K): V | null;

	/**
	 * @returns boolean indicating whether an element with the specified key exists or not.
	 */
	has(key: K): boolean;

	/**
	 * Adds a new element with a specified key and value to the Map. If an element with the same key already exists, the element will be updated.
	 */
	set(key: K, value: V): this;

	/** Returns key, value pairs for every entry in the map. */
    entries(): [K, V][];

    /** Returns an array of the keys in the map */
    keys(): K[];

    /** Returns an array of the values in the map */
    values(): V[];

	/**
	 * @returns the number of elements in the Map.
	 */
	readonly size: number;
}

interface MapConstructor {
	new(): Map<any, any>;
	new <K, V>(entries?: readonly (readonly [K, V])[] | null): Map<K, V>;
}

declare var Map: MapConstructor;