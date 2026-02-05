declare namespace GreyHack {
	interface Crypto {
		classID: "cryptoLib";

		/**
		 * Returns a string containing the password based on the file which was generated via aireplay. 
		 * 
		 * In case of failure, it will return null instead. If the provided path is empty, an error will be thrown, interrupting the script execution.
		 * @example
		 * const crypto = includeLib("/lib/crypto.so");
		 * if (!isType(crypto, "cryptoLib"))
		 * 	exit("Failed to load crypto");
		 * 
		 * const capFile = computer.file(currentPath() + "/file.cap");
		 * if (!capFile)
		 * 	exit(".cap file doesn't exist in the current folder");
		 * 
		 * const wifiPassword = crypto.aircrack(currentPath() + "/file.cap");
		 * if (wifiPassword === null)
		 * 	exit("Failed to crack wifi password");
		 * 
		 * console.log(`The wifi password for ${best.essid} is: ${wifiPassword}`);
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
		 * 
		 * @example
		 * const crypto = includeLib("/lib/crypto.so");
		 * if (!isType(crypto, "cryptoLib")) exit("Failed to load crypto");
		 * 
		 * const airmonRes = crypto.airmon("start", "wlan0");
		 * if (airmonRes !== true) exit("Failed to start airmon: " + airmonRes);
		 * 
		 * const computer = getShell().hostComputer;
		 * const networks = computer.wifiNetworks("wlan0") ?? [];
		 * const result: { bssid: string, pwr: number, essid: string; }[] = [];
		 * for (const network of networks) {
		 * 	const parsedItem = network.split(" ");
		 * 	result.push({
		 * 		bssid: parsedItem[0],
		 * 		pwr: parsedItem[1].slice(0, -1).toInt() as number,
		 * 		essid: parsedItem[2],
		 * 	});
		 * }
		 * 
		 * result.sort("pwr", false);
		 * 
		 * const best = result[0];
		 * const aireplayRes = crypto.aireplay(best.bssid, best.essid, 300000 / (best.pwr + 15));
		 * crypto.airmon("stop", "wlan0");
		 * if (isType(aireplayRes, "string")) exit(aireplayRes);
		 * 
		 * const capFile = computer.file(currentPath() + "/file.cap");
		 * if (capFile)
		 * 	console.log(".cap file created!")
		 * else
		 * 	exit("Failed to create .cap file in the current folder");
		 */
		aireplay(bssid: string, essid: string, maxAcks?: number): string | null;

		/**
		 * Enables or disables the monitor mode of a network device. 
		 * 
		 * Monitor mode can only be enabled on Wifi cards. 
		 * 
		 * If it wasn't possible to enable or disable the monitor mode, this method will return either false or a string with details. In case of success, it will return true.
		 * 
		 * @example
		 * const crypto = includeLib("/lib/crypto.so");
		 * if (!isType(crypto, "cryptoLib")) exit("Failed to load crypto");
		 * 
		 * const airmonRes = crypto.airmon("start", "wlan0");
		 * if (airmonRes === true)
		 * 	console.log("Monitoring mode switched successfully.")
		 * else
		 * 	exit("Failed to switch monitoring mode: " + airmonRes);
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
		 * 	console.log(`Password for user '${username}' is: ${password}`);
		 * }
		 */
		decipher(hash: string): string | null;

		/**
		 * Decrypts the specified file using the provided key. 
		 * 
		 * On success, the method returns true. If decryption fails, a descriptive error message is returned as a string.
		 * 
		 * @example
		 * const crypto = includeLib("/lib/crypto.so");
		 * if (!isType(crypto, "cryptoLib")) exit("Failed to load crypto");
		 * 
		 * const decryptionResult = crypto.decrypt("/etc/passwd", "mySecretKey");
		 * if (isType(decryptionResult, "string"))
		 * 	console.log("Failed to decrypt file due to: " + decryptionResult);
		 * else
		 * 	console.log("File got decrypted!");
		 */
		decrypt(filePath: string, password: string): true | string;

		/**
		 * Encrypts the specified file using the provided key. 
		 * 
		 * On success, the method returns true. If encryption fails, a descriptive error message is returned as a string.
		 * 
		 * @example
		 * const crypto = includeLib("/lib/crypto.so");
		 * if (!isType(crypto, "cryptoLib")) exit("Failed to load crypto");
		 * 
		 * const encryptionResult = crypto.encrypt("/etc/passwd", "mySecretKey");
		 * if (isType(encryptionResult, "string"))
		 * 	console.log("Failed to encrypt file due to: " + encryptionResult);
		 * else
		 * 	console.log("File got encrypted!");
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
}