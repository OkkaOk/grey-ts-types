declare namespace GreyHack {
	interface CtfEvent {
		classID: "ctfEvent";

		/** Returns string with the name of the CTF event creator. */
		getCreatorName(): string;

		/** Returns string with the CTF event description. */
		getDescription(): string;

		/** Returns string with the mail content of the CTF event. */
		getMailContent(): string;

		/** Returns string with the CTF event template. */
		getTemplate(): string;

		/** Returns a boolean indicating if the CTF event got completed successfully */
		playerSuccess(): boolean;
	}

	interface MetaMail {
		classID: "MetaMail";

		/** 
		 * Delete the email corresponding to the provided email ID.
		 * 
		 * Returns true if the email removal was successful. Otherwise, a string with an error message will be returned.
		 */
		delete(mailId: string): true | string;

		/**
		 * Returns an array where each item is a string containing mail id, from, subject and a small preview of the content consisting of the first 125 characters.
		 * 
		 * If there is any issue a string will be returned with details.
		 */
		fetch(): string[] | string;

		/**
		 * Returns a string containing the content of a mail related to the provided mail id.
		 * 
		 * The mail id argument can be obtained with fetch. In case the mail cannot be found this method will return `Mail not found`.
		 */
		read(mailId: string): string;

		/**
		 * Send a new mail to the provided email address.
		 * 
		 * Keep in mind that the subject can not exceed 128 characters and the message size should not exceed 2500 characters.
		 * 
		 * @returns true indicating that the mail has been sent correctly, or a string with an error
		 */
		send(emailAddress: string, subject: string, message: string): string | true;
	}

	interface NetSession {
		classID: "NetSession";

		/**
		 * Returns the {@link MetaLib} associated with the remote service. 
		 * 
		 * For example if the {@link Metaxploit} method netUse was used on a ssh port it will return the MetaLib related to the ssh service. In case the port was zero is will return a MetaLib related to the kernel router.
		 */
		dumpLib(): MetaLib;

		/**
		 * Initiates a DDoS attack targeting the computer associated with the currently active NetSession object. 
		 * 
		 * To successfully force a reboot, there must be at least 4 concurrent floodConnection calls for every 1 unit of net speed on the target computer. Keep in mind that these calls need to come from different IPs. So for example PackS would require 12 active floodConnection calls. If the threshold is met, the target computer will be forced to reboot, and the terminal will output: `remote connection interrupted`.
		 * 
		 * This method always returns null and only prints a message upon a successful attack.
		*/
		floodConnection(): null;

		/** Returns the number of devices using this router as a gateway. If you obtained your NetSession from a computer, it will fetch and return the value from its gateway router. */
		getNumConnGateway(): number;

		/** Returns the number of ports forwarded by this router. If you obtained your NetSession from a computer, it will fetch and return the value from its gateway router. */
		getNumPortforward(): number;

		/** Returns the number of user accounts on the system. */
		getNumUsers(): number;

		/** Return a boolean indicating if there is an active user on the system */
		isAnyActiveUser(): boolean;

		/** Return a boolean indicating if there is an active root user on the system */
		isRootActiveUser(): boolean;
	}

	interface Port {
		classID: "port";

		/** Port number used by this port */
		portNumber: number;

		/** Returns a boolean, where true indicates that the specified port is closed and false indicates that the port is open. */
		isClosed: () => boolean;

		/** Returns a string containing the local IP address of the computer to which the port is pointing. */
		getLanIp: () => string;
	}

	interface Router {
		classID: "router";

		/** BSSID value of the router */
		bssidName: string;

		/** ESSID value of the router */
		essidName: string;

		/** Version of the `kernel_router.so` library */
		kernelVersion: string;

		/** Local IP address of the router. */
		localIp: string;

		/** Public IP address of the router. */
		publicIp: string;

		/**
		 * Returns an array where each item is an open port related to the device of the provided LAN IP address. The device needs to be within the network of the router.
		 * 
		 * In case of failure, this method will return null or a string with details. In case an empty ip is provided this method will throw a runtime exception. */
		devicePorts(ip: string): Port[] | string | null;

		/** 
		 * Returns an array where each item is a string representing a LAN IP address. 
		 * 
		 * All devices are within the network of the router and can be reached by using the ping method. Some of the devices might be behind a firewall.
		*/
		devicesLanIp(): string[];

		/** Returns an array where each item is a string containing a firewall rule. */
		firewallRules(): string[];

		/** Returns a {@link Port} that is behind the port number provided. In case the port does not exist null gets returned. */
		pingPort(portNumber: number): Port | null;

		/** 
		 * Returns a string with information about the provided port, including details about the running service and its version. 
		 * 
		 * For example, the output could be `http 1.0.0`. If the operation fails, null will be returned.
		 */
		portInfo(port: Port): string | null;

		/** Returns an array where each item is a {@link Port} used inside the router. */
		usedPorts(): Port[];
	}

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
		build: (sourcePath: string, binaryPath: string, allowImport?: boolean) => string;

		/**
		 * Returns a shell if the connection attempt to the provided IP was successful.
		 * 
		 * This method can only connect to ports running an SSH or FTP service. SSH services usually run on port 22 and FTP services usually on port 21. Keep in mind to pass the right service value depending on which service is going to be used. By default, it will use SSH as the service. Please note that connecting will leave a log entry.
		 * 
		 * In case of failure, a string is returned containing details. If this method is run in an SSH encryption process, or if the computer is not connected to the internet, a runtime exception will be thrown.
		 */
		connectService: (ip: string, port: number, user: string, password: string, service?: "ssh" | "ftp") => Shell | FtpShell | string | null;

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
		launch: (program: string, params?: string) => string | boolean;

		/**
		 * Pings an IP address. 
		 * 
		 * Return a boolean indicating if the remote address could be reached. Firewalls do not block ping requests. Passing an invalid ip will cause the method to return a string with an error message.
		 */
		ping: (ip: string) => string | boolean;

		/**
		 * Send a file to the computer related to the provided shell.
		 * 
		 * You require permission to read the file on the computer from which you are uploading and write permissions in the folder of the computer you are trying to upload to.
		 * 
		 * Via the optional isUpload parameter you can define the direction. 
		 * 
		 * In case of failure, this method will return a string with the cause. Otherwise, true will be returned. In case the string for sourceFile or destinationFolder is empty, an error will be thrown, preventing further script execution. Utilizing this method in an SSH encryption process will trigger an error, halting further script execution.
		 */
		scp: (file: string, folder: string, remoteShell: Shell, isUpload?: boolean) => boolean | string;
		
		/**
		 * Launches an active terminal.
		 * 
		 * The terminal's color will change, displaying the IP of the connected shell. Script execution will be stopped upon starting a new terminal, unless this is called from another script that was executed via {@link Shell.launch}. In that case, you will enter the shell after closing your root-level script within that terminal window.
		 * 
		 * Using this method within an SSH encryption process will cause an error to be thrown, preventing further script execution.
		 */
		startTerminal: () => never;
	}
}