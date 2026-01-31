declare namespace GreyHack {
	interface MetaLib {
		classID: "MetaLib";

		/** The name of the library. An example of a name would be `init.so`. */
		libName: string;

		/** Version number of the library. An example of a version number would be `1.0.0`. */
		version: string;

		/** 
		 * Returns a library in debug mode as a {@link DebugLibrary} object. 
		 * 
		 * A valid Neurobox engineer's username and password are required to access this mode. 
		 * 
		 * If successful, the {@link DebugLibrary} object is returned; in case of an error, a string with details is provided. */
		debugTools(user: string, password: string): DebugLibrary | string;

		/** 
		 * Returns by default a boolean indicating whether the library has been patched. 
		 * 
		 * True indicates that the library has been patched, while false indicates that it has not. 
		 * 
		 * If the getdate parameter is set to true, the function will return a string containing the date of the last patch. The data format is as follows: `dd/MM/yyyy`. 
		 * 
		 * Additionally if there is any error the return value will be a string.
		 */
		isPatched(getDate?: boolean): boolean | string;

		/**
		 * Exploits vulnerabilities in target systems by executing various attack vectors against libraries located in the `/lib` folder. 
		 * 
		 * The function requires a memory address, vulnerability identifier, and optional arguments that are mandatory for password changes (new password) and computer exploits (LAN IP address). 
		 * 
		 * The system validates that the target library exists and is properly located in the `/lib` directory before proceeding otherwise it will return null. 
		 * 
		 * If the network where the library is located is disabled, the function returns a string indicating the network status.
		 * 
		 * The exploit will fail and return null if the target is behind a firewall or if any of the specific vulnerability requirements aren't met, such as insufficient registered users, missing required libraries with correct versions, inadequate port forwards, absence of required user types like active guests or root users, or invalid file paths. 
		 * 
		 * If the target vulnerability is identified as a zero-day exploit, the system will load the appropriate zero-day vulnerability before execution. 
		 * 
		 * During execution, if a super admin intercepts the exploit attempt, user privileges are automatically lowered to guest level. 
		 * 
		 * Shell exploits, once all requirements are met, always return a shell object. 
		 * 
		 * Random folder exploits return a file object if the specified path exists or null if the folder cannot be found. 
		 * 
		 * Password change exploits return true for successful password modification or false for failure due to guest user restrictions, invalid alphanumeric format, or exceeding the 15-character limit.
		 * 
		 * Settings override exploits work only on smart appliances like fridges or microwaves and return true for success or false for failure.
		 * 
		 * Traffic light exploits require targets on the police station's network and return true for success or false for failure. 
		 * 
		 * Firewall exploits need router targets and return true for success or false for failure. 
		 * 
		 * Computer exploits return a computer object when successful or false if the LAN IP is invalid, the computer doesn't exist, or no non-root user is available. 
		 * 
		 * Using {@link isType} or {@link getType} to verify return value types is essential before processing results due to the variety of possible return types.
		 * 
		 * @example
		 * const metax = includeLib("/lib/metaxploit.so");
		 * if (!isType(metax, "MetaxploitLib")) exit("Failed to get metaxploit");
		 * 
		 * const metaLib = metax.load("/lib/init.so");
		 * if (!metaLib) exit("Failed to load the library");
		 * 
		 * const result = metaLib.overflow("0x14F45286", "Eyworde");
		 * if (isType(result, "shell")) {
		 * 	// Do stuff with shell
		 * }
		 * else if (isType(result, "computer")) {
		 * 	// Do stuff with computer
		 * }
		 * else if (isType(result, "file")) {
		 * 	// Do stuff with file
		 * 	console.log("Obtained file: " + result.name);
		 * }
		 */
		overflow(memoryAddress: string, unsecZone: string, optArgs?: string): Shell | Computer | File | string | boolean | null;
	}
}