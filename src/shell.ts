declare namespace GreyHack {
	interface FtpShell {
		classID: "ftpShell";

		/** Returns a computer related to the shell. */
		hostComputer: FtpComputer;

		/**
		 * Send a file to the computer related to the provided shell.
		 * 
		 * You require permission to read the file on the computer from which you are uploading and write permissions in the folder of the computer you are trying to upload to.
		 * 
		 * Via the optional isUpload parameter you can define the direction. 
		 * 
		 * In case of failure, this method will return a string with the cause. Otherwise, true will be returned. In case the string for sourceFile or destinationFolder is empty, an error will be thrown, preventing further script execution. Utilizing this method in an SSH encryption process will trigger an error, halting further script execution.
		 */
		scp: Shell["scp"];
	}

	interface Shell {
		classID: "shell";

		/** Returns a computer related to the shell. */
		hostComputer: Computer;

		/** 
		 * Compiles a plain code file provided in the arguments to a binary. 
		 * 
		 * On success, the new binary will be available under the provided build folder. The binary name will be the same as the source file just without the file extension. Optionally, an allowImport flag can be set which enables the use of import_code on the binary. All provided paths must be absolute. Returns an empty string on success. On failure, it will return a string containing details about the reason for failure.
		 * 
		 * In case any provided values deviate from the defined signature a runtime exception will be thrown.
		 */
		build(sourcePath: string, binaryPath: string, allowImport?: boolean): string;

		/**
		 * Returns a shell if the connection attempt to the provided IP was successful.
		 * 
		 * This method can only connect to ports running an SSH or FTP service. SSH services usually run on port 22 and FTP services usually on port 21. Keep in mind to pass the right service value depending on which service is going to be used. By default, it will use SSH as the service. Please note that connecting will leave a log entry.
		 * 
		 * In case of failure, a string is returned containing details. If this method is run in an SSH encryption process, or if the computer is not connected to the internet, a runtime exception will be thrown.
		 */
		connectService(ip: string, port: number, user: string, password: string, service?: "ssh" | "ftp"): Shell | FtpShell | string | null;

		/**
		 * Launches the binary located at the provided path. 
		 * 
		 * Optionally, parameters can be passed. Returns a boolean indicating the success of the launch. In some cases, a string will be returned containing an error message.
		 * 
		 * If you need to share variables between a launched script and the current process, consider using {@link getCustomObject}.
		 * 
		 * Note that launching a script is not asynchronous, meaning that the current script will pause its execution until the launched script finishes. If any provided values deviate from the method signature or it is used within an SSH encryption process, a runtime exception will be thrown.
		 * 
		 * There is a cooldown of 2 seconds between launches to prevent abuse. If you attempt to launch a script during this cooldown period, the method will return false.
		 */
		launch(program: string, params?: string): string | boolean;

		/**
		 * Pings an IP address. 
		 * 
		 * Return a boolean indicating if the remote address could be reached. Firewalls do not block ping requests. Passing an invalid ip will cause the method to return a string with an error message.
		 */
		ping(ip: string): string | boolean;

		/**
		 * Send a file to the computer related to the provided shell.
		 * 
		 * You require permission to read the file on the computer from which you are uploading and write permissions in the folder of the computer you are trying to upload to.
		 * 
		 * Via the optional isUpload parameter you can define the direction. 
		 * 
		 * In case of failure, this method will return a string with the cause. Otherwise, true will be returned. In case the string for sourceFile or destinationFolder is empty, an error will be thrown, preventing further script execution. Utilizing this method in an SSH encryption process will trigger an error, halting further script execution.
		 */
		scp(file: string, folder: string, remoteShell: Shell, isUpload?: boolean): true | string;
		
		/**
		 * Launches an active terminal.
		 * 
		 * The terminal's color will change, displaying the IP of the connected shell. Script execution will be stopped upon starting a new terminal, unless this is called from another script that was executed via {@link Shell.launch}. In that case, you will enter the shell after closing your root-level script within that terminal window.
		 * 
		 * Using this method within an SSH encryption process will cause an error to be thrown, preventing further script execution.
		 */
		startTerminal(): never;
	}
}