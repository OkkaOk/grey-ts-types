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
	 * console.log(newString); // Prints "I will eat an ice cream!"
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
	 * console.log(newString); // Prints "I am now offline"
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
	 * console.log(animals); // Prints ["cat", "turtle", "dog", "mouse"]
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

declare var Function: {
	readonly prototype: Function;
};