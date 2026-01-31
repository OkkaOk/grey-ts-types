declare namespace GreyHack {
	interface DebugLibrary {
		classID: "debugLibrary";

		/**
		 * Applies a patch containing corrected code to the specified text file at the provided path. 
		 * 
		 * Returns a string with the result of the operation.
		 */
		applyPatch(path: string): string;

		/**
		 * Returns a list containing a single partial computer object if zero-day vulnerabilities are detected within the specified memory zone. 
		 * 
		 * If a file path is provided, a partial file object associated with this path will also be included in the array. 
		 * 
		 * Additionally, if this file is a library, its corresponding metaLib object is added to the returned array. 
		 * 
		 * In case of an error, a string with details is returned. 
		 */
		payload(memZone: string): string | [Partial<Computer>];
		payload(memZone: string, filePath: string): string | [Partial<Computer>, Partial<File>] | [Partial<Computer>, Partial<File>, MetaLib];

		/**
		 * Scans the library in debug mode to identify potential code errors that may lead to vulnerabilities. 
		 * 
		 * If issues are detected, the relevant code snippets are printed. In case of an error, a string containing the error message is returned. 
		 */
		scan(): string;

		/**
		 * Conducts automated tests on the specified lines of code. 
		 * 
		 * If potential vulnerabilities are detected due to errors in these lines, this method will print partial objects that could be obtained by exploiting the vulnerability, along with the affected memory zone and detailed vulnerability information. 
		 * 
		 * In case of failure, this function returns a string with an error message. 
		 */
		unitTesting(errorLines: number[]): string;
	}
}