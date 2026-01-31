declare namespace GreyHack {
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
}