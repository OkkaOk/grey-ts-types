interface Console {
	/**
	 * Print a message on the Terminal.
	 * 
	 * There is also the possibility of styling output by using {@link https://docs.unity3d.com/Packages/com.unity.textmeshpro@4.0/manual/index.html|TextMeshPro rich-text tags}.
	 */
	log(...data: any[]): null;

	/**
	 * Removes any text existing in a Terminal prior to this point.
	 * 
	 * Utilizing this method in an SSH encryption process will trigger an error, halting further script execution.
	 */
	clear(): null;
}

declare var console: Console;