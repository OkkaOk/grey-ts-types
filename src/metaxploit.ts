declare namespace GreyHack {
	interface Metaxploit {
		classID: "MetaxploitLib";

		/** 
		 * Returns a {@link MetaLib} object for the provided path to the library binary. Keep in mind that this can only be used on library files.
		 * 
		 * On failure, this method will return null. If the provided path is empty, this method will throw a runtime exception, preventing further script execution.
		 * @example
		 * const metax = includeLib("/lib/metaxploit.so");
		 * if (!isType(metax, "MetaxploitLib")) exit("Failed to get metaxploit");
		 * 
		 * const libFolder = getShell().hostComputer.file("/lib")!;
		 * for (const file of libFolder.getFiles()!) {
		 * 	const metaLib = metax.load(file.path());
		 * 	if (!metaLib) continue; // Failed to load
		 * 
		 * 	console.log(`Library: ${metaLib.libName}-${metaLib.version}`);
		 * }
		 */
		load(path: string): MetaLib | null;

		/** 
		 * Returns a {@link NetSession} object for the provided IP address and port. 
		 * 
		 * Note that if the port is set to zero, it will return a {@link NetSession} related to the kernel router. 
		 * 
		 * The main purpose of this method is to gain a {@link NetSession} and then use {@link NetSession.dumpLib} to receive a {@link MetaLib} object to exploit vulnerabilities. 
		 * 
		 * In case of failure, this method will return null. If this method is used within an SSH encryption process or with disabled internet, or if an invalid target IP is provided, this method will throw a runtime exception.
		 * 
		 * @example
		 * const metax = includeLib("/lib/metaxploit.so");
		 * if (!isType(metax, "MetaxploitLib")) exit("Failed to get metaxploit");
		 * 
		 * const targetRouter = getRouter("1.1.1.1");
		 * if (!targetRouter) exit("Failed to get target router");
		 * 
		 * const ports = targetRouter.usedPorts();
		 * for (const port of ports) {
		 * 	if (port.isClosed()) continue;
		 * 
		 * 	const netSession = metax.netUse(targetRouter.publicIp, port.portNumber);
		 * 	if (!netSession) continue;
		 * 
		 * 	const metaLib = netSession.dumpLib();
		 * 	console.log(`Library: ${metaLib.libName}-${metaLib.version}`);
		 * }
		 */
		netUse(ip: string, port: number): NetSession | null;

		/**
		 * Launches a process on the victim's computer, silently attempting to continuously connect in the background to the specified address and port. 
		 * 
		 * For the reverse shell to run successfully, the rshell service must be installed, and the port forward must be configured correctly on the machine where the server is waiting for the victim's connection. 
		 * 
		 * If the launch was successful, true will be returned. In case of failure, a string with details will be returned.
		 * 
		 * @example
		 * const metax = includeLib("/lib/metaxploit.so");
		 * if (!isType(metax, "MetaxploitLib")) exit("Failed to get metaxploit");
		 * 
		 * const result = metax.rshellClient("1.1.1.1", 1222, "bgprocess");
		 * if (isType(result, "string"))
		 * 	console.log("Failed to launch rshell client: " + result);
		 */
		rshellClient(ip: string, port: number, processName?: string): true | string;

		/**
		 * This method returns an array of {@link Shell} objects that have been reverse shell connected to this computer. 
		 * 
		 * To manage the connections received, the rshell service must be installed on the machine that receives the victims' connections. 
		 * 
		 * In case of failure a string will be returned with details. 
		 * 
		 * @example
		 * const metax = includeLib("/lib/metaxploit.so");
		 * if (!isType(metax, "MetaxploitLib")) exit("Failed to get metaxploit");
		 * 
		 * const shells = metax.rshellServer();
		 * if (isType(shells, "string"))
		 * 	exit("Failed to get reverse shells: " + shells)
		 * 
		 * console.log(`You have access to ${shells.length} shells`);
		 */
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
		 * Using this method within a SSH encryption process will throw a runtime exception.
		 * @example
		 * const metax = includeLib("/lib/metaxploit.so");
		 * if (!isType(metax, "MetaxploitLib")) exit("Failed to get metaxploit");
		 * 
		 * const metaLib = metax.load("/lib/init.so");
		 * if (!metaLib) exit("Failed to load the library");
		 * 
		 * const addresses = metax.scan(metaLib) ?? [];
		 * for (const address of addresses) {
		 * 	console.log("Memory address containing a vulnerability: " + address);
		 * }
		 */
		scan(metaLib: MetaLib): string[] | null;

		/**
		 * Returns a string containing information about each vulnerability in the provided library and memory area.
		 * 
		 * In case the scanning fails this method will return null.
		 * 
		 * Using this method within a SSH encryption process will throw a runtime exception.
		 * 
		 * @example
		 * const metax = includeLib("/lib/metaxploit.so");
		 * if (!isType(metax, "MetaxploitLib")) exit("Failed to get metaxploit");
		 * 
		 * const metaLib = metax.load("/lib/init.so");
		 * if (!metaLib) exit("Failed to load the library");
		 * 
		 * const addresses = metax.scan(metaLib) ?? [];
		 * for (const address of addresses) {
		 * 	const info = metax.scanAddress(metaLib, address);
		 * 	if (!info) continue;
		 * 
		 * 	const segments = info.split("Unsafe check: ").slice(1);
		 * 	for (const segment of segments) {
		 * 		const labelStart = segment.indexOf("<b>")!;
		 * 		const labelEnd = segment.indexOf("</b>")!;
		 * 
		 * 		const unsecZone = segment.slice(labelStart + 3, labelEnd);
		 * 
		 * 		const result = metaLib.overflow(address, unsecZone);
		 * 		// Do stuff with result...
		 * 	}
		 * }
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
		 * 
		 * @example
		 * const metax = includeLib("/lib/metaxploit.so");
		 * if (!isType(metax, "MetaxploitLib")) exit("Failed to get metaxploit");
		 * 
		 * metax.sniffer()
		 */
		sniffer(saveEncSource?: boolean): string | null;
	}
}