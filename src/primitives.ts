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

	readonly [index: number]: string;
}

interface Number {

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
	pop(): T;
	pull(): T;
	push(value: T): T[];
	remove(index: number): null;
	replace(oldValue: T, newValue: T, maxCount?: number): T[];
	reverse(): null;
	shuffle(): null;
	sort(key: PropertyKey | null, ascending?: boolean): T[];
	sum(): number;
	values(): T[];

	// Custom ones

	concat(...items: (T | T[])[]): T[]; // Transpiler turns this into arr1 + arr2 + etc
	map<U>(callbackfn: (value: T, index: number, array: T[]) => U): U[];
	filter(predicate: (value: T, index: number, array: T[]) => unknown): T[];
	find(predicate: (value: T, index: number, array: T[]) => unknown): T | null;
	some(predicate: (value: T, index: number, array: T[]) => unknown): boolean;
	every(predicate: (value: T, index: number, array: T[]) => unknown): boolean;

	[n: number]: T;
}


interface Function {

}

declare var String: {
	new(value?: string): String;
	(value?: any): string;
	readonly prototype: String;
};

declare var Number: { readonly prototype: Number; };
declare var Boolean: { readonly prototype: Number; };
declare var Array: { readonly prototype: Array<any>; };
declare var Function: { readonly prototype: Function; };
declare var Object: ObjectConstructor;