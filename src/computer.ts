declare namespace GreyHack {
	interface BaseComputer<FileType extends GreyHack.File | GreyHack.FtpFile> {
		classID: "ftpComputer" | "computer";

		/** Returns the hostname of the machine. */
		getName(): string;

		/**
		 * Creates a folder at the path provided in the arguments.
		 * 
		 * There are certain limitations to creating a folder: the folder name has to be alphanumeric and below 128 characters. Creation will fail if there is already a folder in place or if there are lacking permissions. Additionally, there is a folder limit of about 250 in each folder and 3125 folders in the computer overall.
		 * 
		 * In case the folder creation fails, the method will return a string with details. In case of success, it will return true.
		 * 
		 * Using this method in an SSH encryption process will cause an error to be thrown, aborting further script execution.
		 */
		createFolder(path: string, folderName?: string): string | true;

		/**
		 * Returns a file located at the path provided in the argument.
		 * 
		 * The path can be either relative or absolute. It's important to note that any file object can represent a folder as well.
		 * 
		 * If the provided path cannot be resolved, meaning that no file or folder exists, this method will return null.
		 * 
		 * Providing an empty string for the path will result in an error, interrupting the script execution.
		 * @example
		 * const computer = getShell().hostComputer;
		 * const passwd = computer.file("/etc/passwd");
		 * if (passwd) {
		 * 	console.log(`Content of passwd file\n${passwd.getContent()}`)
		 * }
		 */
		file(path: string): FileType | null;
	}

	interface FtpComputer extends BaseComputer<FtpFile> {
		classID: "ftpComputer",
	}

	interface Computer extends BaseComputer<File> {
		classID: "computer";

		/** The local IP address of the computer */
		localIp: string;

		/** The public IP address of the computer */
		publicIp: string;

		/** Returns `WIFI` or `ETHERNET` depending on the connection type the computer is currently using */
		activeNetCard(): "WIFI" | "ETHERNET";

		/**
		 * Changes the password of an existing user on the computer.
		 * 
		 * Root access is necessary to successfully change the password. Passwords can only include alphanumeric characters and cannot exceed 15 characters. If the password change fails, this method will return a string containing information on why it failed. If the change succeeds, it will return true.
		 * 
		 * If the provided username is empty, an error will be thrown, preventing any further script execution.
		 */
		changePassword(username: string, password: string): true | string;

		/**
		 * Closes a program associated with the provided PID.
		 * 
		 * You can see the list of active programs by either using {@link showProcs} or typing ps into your terminal. To close a program, you need to either be the owner of the running process or root. If closing the program fails, this method will return a string containing details. On success, it will return true. If there is no process with the provided PID, this method will return false.
		 */
		closeProgram(pid: number): boolean | string;

		/**
		 * Sets up a new IP address on the computer through the Ethernet connection.
		 * 
		 * It's not possible to set up a new IP address while being logged in as a guest. On failure, this method will either return a string with details or null. On success, it will return an empty string.
		 * 
		 * If the computer is not connected to the internet, an error will be thrown, preventing any further script execution.
		 */
		connectEthernet(netDevice: netDevice, address: string, gateway: string): string | null;

		/**
		 * Connects to the indicated Wi-Fi network.
		 * 
		 * It's not possible to connect to a new Wi-Fi while being logged in as a guest. If connecting to a new Wi-Fi fails, this method will return a string containing details. On success, it will return true.
		 * 
		 * Wi-Fi networks can be found via {@link wifiNetworks} or by typing iwlist as a command in the terminal.
		 */
		connectWifi(netDevice: netDevice, bssid: string, essid: string, password: string): true | string;

		/**
		 * Creates a new group associated with an existing user on the computer.
		 * 
		 * Root access is necessary to successfully create a group. There are limitations when creating a group, such as a character limit of 15 and that the group name may only contain alphanumeric characters. If the group creation fails, this method will return a string containing the cause of failure. On success, it will return true. If the provided arguments are empty or the username exceeds 15 characters, an error will be thrown, interrupting further script execution.
		 */
		createGroup(username: string, group: string): true | string;

		/**
		 * Creates a user on the computer with the specified name and password.
		 * 
		 * Root access is necessary to successfully create a user. Both the username and password cannot exceed more than 15 characters and must be alphanumeric. There cannot be more than 15 users created on the same computer. If the creation fails, this method will return a string containing the reason for the failure. On success, it will return true. If the provided username is empty or either of the values exceeds 15 characters, an error will be thrown, interrupting further script execution.
		 */
		createUser(username: string, password: string): true | string;

		/**
		 * Deletes an existing group associated with an existing user on the computer.
		 * 
		 * Root access is necessary to successfully delete a group. If the group deletion fails, this method will return a string containing the cause of failure. On success, it will return true. If either of the provided values is empty, an error will be thrown, preventing further script execution.
		 */
		deleteGroup(username: string, group: string): true | string;

		/**
		 * Deletes the indicated user from the computer.
		 * 
		 * Root access is necessary to successfully delete a user. Keep in mind that you cannot delete the root user.
		 * 
		 * If the deletion fails, this method will return a string containing the cause of failure. On success, it will return true. If the provided username is empty, an error will be thrown, interrupting further script execution.
		 * 
		 * @param username the user to remove
		 * @param removeHome remove the user's home folder as well
		 */
		deleteUser(username: string, removeHome?: boolean): true | string;

		/** Returns an array of ports on the computer that are active. */
		getPorts(): Port[];

		/**
		 * Returns a string containing groups associated with an existing user on the computer.
		 * 
		 * If the user does not exist, a string with an error message will be returned. If the provided username is empty, an error will be thrown, preventing further script execution.
		 */
		groups(username: string): string;

		/** Returns a boolean indicating if the computer has internet access */
		isNetworkActive(): boolean;

		/**
		 * Returns a string containing information about all network devices available on the computer.
		 * 
		 * Each item includes details about the interface name, chipset, and whether monitoring support is enabled.
		 */
		networkDevices(): string;

		/** Returns a string with the gateway IP address configured on the computer. */
		networkGateway(): string;

		/**
		 * Reboots the computer. By default, it reboots in standard mode.
		 * 
		 * On success, the method returns true. If the reboot fails, a descriptive error message is returned as a string.
		 * 
		 * Calling this method in an SSH encryption process will trigger an error, halting further script execution.
		 * 
		 * @param safeMode reboot the system in safe mode instead
		 */
		reboot(safeMode?: boolean): true | string;

		/**
		 * Returns a string with an overview of all active processes on the computer, including information about the user, PID, CPU, memory, and command.
		 * 
		 * Using this method in an SSH encryption process will cause an error to be thrown, preventing any further script execution.
		 */
		showProcs(): string;

		/**
		 * Creates an empty text file at the provided path.
		 * 
		 * Certain limitations apply to file creation: the file name must be alphanumeric and below 128 characters. Creation will fail if there is already a file in place or if permissions are lacking. Additionally, there is a file limit of about 250 in each folder and 3125 files in the computer overall.
		 * 
		 * Using this method in an SSH encryption process will cause an error to be thrown, preventing any further script execution.
		 */
		touch(destFolder: string, fileName: string): true | string;

		/**
		 * Returns an array of the Wi-Fi networks that are available for the provided interface.
		 * 
		 * Each item in the array is a string containing information on the BSSID, PWR, and ESSID.
		 * 
		 * If the active network card is not a Wi-Fi card, an error will be thrown, preventing any further script execution.
		 * 
		 * @returns null if no matching netDevice can be found, otherwise the available networks
		 */
		wifiNetworks(netDevice: netDevice): string[] | null;
	}
}