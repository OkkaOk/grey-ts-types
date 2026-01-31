declare namespace GreyHack {
	interface Service {
		classID: "service";

		/** 
		 * Installs the necessary files for the correct functioning of the service and starts it.
		 * 
		 * If the installation is completed successfully, it returns true. In case of an error, it returns a string with details.
		 */
		installService(): true | string;

		/**
		 * Starts the service and opens its associated port on the local machine.
		 * 
		 * The service requires a port forwarded to the router to be accessible from the outside.
		 * 
		 * If the service starts correctly, it returns true. In case of an error, it returns a string with details.
		 */
		startService(): true | string;

		/**
		 * Stops the service and closes its associated port on the local machine.
		 * 
		 * If the service is stopped successfully, it returns true.
		 * 
		 * If an error occurs during the process, it returns a string with details. In some cases, the returned value might be false, indicating that the service removal failed.
		 */
		stopService(): boolean | string;
	}

	interface Metaxploit {
		classID: "MetaxploitLib";

		/** 
		 * Returns a {@link MetaLib} object for the provided path to the library binary. Keep in mind that this can only be used on library files.
		 * 
		 * On failure, this method will return null. If the provided path is empty, this method will throw a runtime exception, preventing further script execution.
		 */
		load(path: string): MetaLib | null;

		/** 
		 * Returns a {@link NetSession} object for the provided IP address and port. 
		 * 
		 * Note that if the port is set to zero, it will return a {@link NetSession} related to the kernel router. 
		 * 
		 * The main purpose of this method is to gain a {@link NetSession} and then use {@link NetSession.dumpLib} to receive a {@link MetaLib} object to exploit vulnerabilities. 
		 * 
		 * In case of failure, this method will return null. If this method is used within an SSH encryption process or with disabled internet, or if an invalid target IP is provided, this method will throw a runtime exception. */
		netUse(ip: string, port: number): NetSession | null;

		/**
		 * Launches a process on the victim's computer, silently attempting to continuously connect in the background to the specified address and port. 
		 * 
		 * For the reverse shell to run successfully, the rshell service must be installed, and the port forward must be configured correctly on the machine where the server is waiting for the victim's connection. 
		 * 
		 * If the launch was successful, true will be returned. In case of failure, a string with details will be returned.
		 */
		rshellClient(ip: string, port: number, processName?: string): true | string;

		/**
		 * This method returns an array of {@link Shell} objects that have been reverse shell connected to this computer. 
		 * 
		 * To manage the connections received, the rshell service must be installed on the machine that receives the victims' connections. 
		 * 
		 * In case of failure a string will be returned with details. */
		rshellServer(): Shell[] | string;

		/**
		 * Returns an array where each item is a string representing a memory area which has vulnerabilities related to the provided library.
		 * 
		 * These memory areas can be used to make further scans via {@link Metaxploit.scanAddress}.
		 * 
		 * In case of failure, this method returns null instead.
		 * 
		 * An example of a memory area would be `0x7BFC1EAA`.
		 * 
		 * Using this method within a SSH encryption process will throw a runtime exception. */
		scan(metaLib: MetaLib): string[] | null;

		/**
		 * Returns a string containing information about each vulnerability in the provided library and memory area.
		 * 
		 * In case the scanning fails this method will return null.
		 * 
		 * Using this method within a SSH encryption process will throw a runtime exception.
		 */
		scanAddress(metaLib: MetaLib, memoryAddress: string): string | null;

		/**
		 * The terminal listens to the network packets of any connection that passes through the computer.
		 * 
		 * When any connection information gets captured, it will print a string with the obtained data.
		 * 
		 * In case saving of encryption source is enabled it will download the source code of the script responsible for encryption.
		 * 
		 * In case the operation fails this method will return null.
		 * 
		 * Using this method within a SSH encryption process will throw a runtime exception.
		 */
		sniffer(saveEncSource?: boolean): string | null;
	}

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
		 */
		overflow(memoryAddress: string, unsecZone: string, optArgs?: string): Shell | Computer | File | string | boolean | null;
	}

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

	interface Crypto {
		classID: "cryptoLib";

		/**
		 * Returns a string containing the password based on the file which was generated via aireplay. 
		 * 
		 * In case of failure, it will return null instead. If the provided path is empty, an error will be thrown, interrupting the script execution. 
		 */
		aircrack(path: string): string | null;

		/**
		 * Used to inject frames on wireless interfaces. 
		 * 
		 * Once the command with `Control+C` is stopped, it will save the captured information in a text file called `file.cap` in the path where the terminal is currently located. 
		 * 
		 * Alternatively, a maximum of captured acks can be specified for the command to stop automatically, saving the `file.cap` file as described above. 
		 * 
		 * To figure out how many ACKs are required, you can use the following formula: `300000 / (Power + 15)`. 
		 * 
		 * If there is an error, a string will be returned with the message indicating the problem. On success, it will return null, it is advised though to verify that the capture file actually exists. 
		 * 
		 * In case any of the provided values deviate from the signature types or bssid/essid is empty, an error will be thrown preventing any further script execution. 
		 */
		aireplay(bssid: string, essid: string, maxAcks?: number): string | null;

		/**
		 * Enables or disables the monitor mode of a network device. 
		 * 
		 * Monitor mode can only be enabled on Wifi cards. 
		 * 
		 * If it wasn't possible to enable or disable the monitor mode, this method will return either false or a string with details. In case of success, it will return true. 
		 */
		airmon(option: "start" | "stop", device: netDevice): boolean | string;

		/**
		 * Returns a decrypted password via the provided password MD5 hash. 
		 * 
		 * Keep in mind that this method is not decrypting a password but rather checking for existing passwords within the game world with a matching MD5 hash.
		 * 
		 * So in case a password does not exist in the game world, the decryption will fail. 
		 * 
		 * On failure, this method will return null. Using this method in an SSH encryption process will cause an error to be thrown, aborting further script execution.
		 * @example
		 * const crypto = includeLib("/lib/crypto.so");
		 * if (!isType(crypto, "cryptoLib")) exit("Failed to load crypto.so");
		 * 
		 * const computer = getShell().hostComputer;
		 * const passwdFile = computer.file("/etc/passwd");
		 * if (!passwdFile) exit("Failed to get passwd file");
		 * 
		 * const lines = passwdFile.getContent()!.split(char(10));
		 * for (const line of lines) {
		 * 	const parsed = line.split(":");
		 * 	const username = parsed[0];
		 * 	const passwordhash = parsed[1];
		 * 
		 * 	const password = crypto.decipher(passwordhash);
		 * 	print(`Password for user '${username}' is: ${password}`);
		 * }
		 */
		decipher(hash: string): string | null;

		/**
		 * Decrypts the specified file using the provided key. 
		 * 
		 * On success, the method returns true. If decryption fails, a descriptive error message is returned as a string. 
		 */
		decrypt(filePath: string, password: string): true | string;

		/**
		 * Encrypts the specified file using the provided key. 
		 * 
		 * On success, the method returns true. If encryption fails, a descriptive error message is returned as a string. 
		 */
		encrypt(filePath: string, password: string): true | string;

		/**
		 * Checks whether the specified file is encrypted. 
		 * 
		 * Returns true if the file is encrypted, or false if it is not. If the check fails (e.g., due to a missing or unreadable file), a descriptive error message is returned as a string. 
		 */
		isEncrypted(filePath: string): boolean | string;

		/** 
		 * Returns an array of the existing users on the computer where the SMTP service is running. 
		 * 
		 * If these users also have an email account registered on the SMTP server, it will be indicated in the array. 
		 * 
		 * SMTP services are usually running on port 25. In case of failure, this method will return a string containing the cause.
		 */
		smtpUserList(ip: string, port: number): string[] | string;
	}

	interface BlockChain {
		classID: "blockchainLib";

		/** 
		 * Returns a number representing the total amount of mined coins.
		 * 
		 * In case of an error, it will return a string with the details. 
		 * @example
		 * const blockChain = includeLib("/lib/blockchain.so");
		 * if (!isType(blockChain, "blockchainLib"))
		 * 	exit("Failed to get blockchain.so");
		 * 
		 * const mined = blockChain.amountMined("bitcoin");
		 * if (isType(mined, "string"))
		 * 	exit(`Coudn't get the amount of mined coin: ${mined}`);
		 * 
		 * print(`There are ${mined} coins mined for this coin`);
		 */
		amountMined(coinName: string): number | string;

		/**
		 * Returns a number representing the current unit value of the cryptocurrency. 
		 * 
		 * In case of an error, a string with the error details will be returned. 
		 */
		coinPrice(coinName: string): number | string;

		/** 
		 * Creates a wallet and returns a wallet object on success, which can be used to manage cryptocurrencies. 
		 * 
		 * In case of an error, it will return a string with the details. 
		 */
		createWallet(user: string, password: string): Wallet | string;

		/** 
		 * Removes a cryptocurrency from the world. The credentials used in the creation of the cryptocurrency are required. 
		 * 
		 * On success, it will return a true. 
		 * 
		 * On failure, it will return a string containing details. 
		 */
		deleteCoin(coinName: string, user: string, password: string): true | string;

		/** 
		 * Returns a coin object used to manage the currency. 
		 * 
		 * In case of an error, it will return a string with the details. 
		 */
		getCoin(coinName: string, user: string, password: string): Coin | string;

		/** 
		 * Returns a string with the name of the coin owned by the player. 
		 * 
		 * In case of an error, it returns a string with details. 
		 */
		getCoinName(user: string, password: string): string;

		/** Returns a wallet object on success. In case of an error, it will return a string indicating the reason. */
		loginWallet(user: string, password: string): Wallet | string;

		/** 
		 * Returns an object with the latest changes in the value of a specific cryptocurrency. 
		 * 
		 * The key of the object is an index represented by a number. The value is an array, where index 0 is the historical price of the coin and index 1 is the date when the price change occurred. 
		 * 
		 * If no coin exists with this name, the method will return null. 
		 */
		showHistory(coinName: string): Record<number, [number, string]> | string | null;
	}

	interface AptClient {
		classID: "aptClientLib";

		/** 
		 * Inserts a repository address into the `/etc/apt/sources.txt` file.
		 * 
		 * On success, it will return an empty string. In case of failure, it will return a string with an error message.
		*/
		addRepo(repositoryAddress: string, port?: number): string;

		/** 
		 * Checks if there is a newer version of the program or library in the repository.
		 * 
		 * On success, it will return a boolean, with false indicating that there is no new version, while true indicates that there is a new version available. 
		 * 
		 * In case of failure, it will return a string containing an error message. 
		 */
		checkUpgrade(filePath: string): boolean | string;

		/** 
		 * Deletes a repository address from the `/etc/apt/sources.txt` file. 
		 * 
		 * On success, it will return an empty string. In case of failure, it will return a string with an error message. 
		 */
		delRepo(repositoryAddress: string): string;

		/** 
		 * Installs a program or library from a remote repository listed in `/etc/apt/sources.txt`. 
		 * 
		 * If no path is specified, the program installs in `/lib` if it is a library or in `/bin` otherwise. 
		 * 
		 * On success, this method will return true. In case of failure, it will return a string containing an error message.
		 */
		install(package: string, installPath?: string): true | string;

		/** 
		 * Search specifically looks for a package in any of the repositories listed in `/etc/apt/sources.txt`. 
		 * 
		 * On success, it will return a string containing all packages that partially match the provided search value. 
		 * 
		 * On failure, it will return a string with various error messages. 
		 */
		search(package: string): string;

		/** 
		 * Show displays all the packages available in a repository. The repository must be listed in the `/etc/apt/sources.txt` file. 
		 * 
		 * If it cannot find a repository, it will return various error messages. 
		 * 
		 * On success, it will return a string containing all packages and their descriptions, with each entry separated by a newline. 
		 */
		show(repositoryAddress: string): string;

		/** 
		 * Update refreshes the list of available packages after adding a new repository in `/etc/apt/sources.txt`, or if the remote repository has updated its information in `/server/conf/repod.conf`. 
		 * 
		 * If the update is successful, an empty string will be returned. In case of failure, a string with an error message will be returned. 
		 * 
		 * If for some reason the `/etc/apt/sources.txt` is malformed this method will return false. 
		 */
		update(): string | false;
	}

	interface SmartAppliance {
		classID: "SmartAppliance";

		/** Returns a string with the appliance model ID. */
		model(): string;

		/** 
		 * Overrides the power and temperature settings of the appliance. 
		 * 
		 * If successful, true is returned; otherwise, it returns a string detailing the error. 
		 */
		overrideSettings(power: number, temperature: number): true | string;

		/** 
		 * Activates or deactivates the sound alarm indicating any appliance malfunction. 
		 * 
		 * If successful, true is returned; otherwise, a string containing error details is returned. 
		 */
		setAlarm(enable: boolean): true | string;
	}

	interface TrafficNet {
		classID: "TrafficNet";

		/** 
		 * Accesses the traffic camera system, opening a window with controls to switch between different cameras. 
		 * 
		 * If the window opens successfully, this method returns true. In case of an error, it returns a string with details. 
		 */
		cameraLinkSystem(): true | string;

		/** Returns string which contains job and name of a NPC. If an error occurs, a string with details is returned. */
		getCredentialsInfo(): string;

		/** 
		 * Performs a search for the specified license plate to locate the vehicle. 
		 * 
		 * If the vehicle is visible on any camera, the viewer will switch to the camera currently displaying it and return true. 
		 * 
		 * If the vehicle cannot be located or the license plate is incorrect, a string indicating the error is returned. 
		 */
		locateVehicle(licensePlate: string, password: string): true | string;
	}
}