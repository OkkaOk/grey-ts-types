declare namespace GreyHack {
	interface NetSession {
		classID: "NetSession";

		/**
		 * Returns the {@link MetaLib} associated with the remote service. 
		 * 
		 * For example if the {@link Metaxploit} method netUse was used on a ssh port it will return the MetaLib related to the ssh service. In case the port was zero is will return a MetaLib related to the kernel router.
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
		 *     if (port.isClosed()) continue;
		 * 
		 *     const netSession = metax.netUse(targetRouter.publicIp, port.portNumber);
		 *     if (!netSession) continue;
		 * 
		 *     const metaLib = netSession.dumpLib();
		 *     console.log(`Library: ${metaLib.libName}-${metaLib.version}`);
		 * }
		 */
		dumpLib(): MetaLib;

		/**
		 * Initiates a DDoS attack targeting the computer associated with the currently active NetSession object. 
		 * 
		 * To successfully force a reboot, there must be at least 4 concurrent floodConnection calls for every 1 unit of net speed on the target computer. Keep in mind that these calls need to come from different IPs. So for example PackS would require 12 active floodConnection calls. If the threshold is met, the target computer will be forced to reboot, and the terminal will output: `remote connection interrupted`.
		 * 
		 * This method always returns null and only prints a message upon a successful attack.
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
		 *     if (port.isClosed()) continue;
		 * 
		 *     const netSession = metax.netUse(targetRouter.publicIp, port.portNumber);
		 *     if (!netSession) continue;
		 * 
		 * 	netSession.floodConnection();
		 * }
		*/
		floodConnection(): null;

		/**
		 * Returns the number of devices using this router as a gateway. If you obtained your NetSession from a computer, it will fetch and return the value from its gateway router.
		 * 
		 * @example
		 * const metax = includeLib("/lib/metaxploit.so");
		 * if (!isType(metax, "MetaxploitLib")) exit("Failed to get metaxploit");
		 * 
		 * const targetRouter = getRouter("1.1.1.4");
		 * if (!targetRouter) exit("Failed to get target router");
		 * 
		 * const ports = targetRouter.usedPorts();
		 * const netSession = metax.netUse(targetRouter.publicIp, ports[0].portNumber);
		 * if (netSession) {
		 * 	console.log("Gateway clients: " + netSession.getNumConnGateway())
		 * }
		 */
		getNumConnGateway(): number;

		/** 
		 * Returns the number of ports forwarded by this router. If you obtained your NetSession from a computer, it will fetch and return the value from its gateway router.
		 * 
		 * @example
		 * const metax = includeLib("/lib/metaxploit.so");
		 * if (!isType(metax, "MetaxploitLib")) exit("Failed to get metaxploit");
		 * 
		 * const targetRouter = getRouter("1.1.1.4");
		 * if (!targetRouter) exit("Failed to get target router");
		 * 
		 * const ports = targetRouter.usedPorts();
		 * const netSession = metax.netUse(targetRouter.publicIp, ports[0].portNumber);
		 * if (netSession) {
		 * 	console.log("Port forwards: " + netSession.getNumPortforward())
		 * }
		 */
		getNumPortforward(): number;

		/** Returns the number of user accounts on the system. */
		getNumUsers(): number;

		/** Return a boolean indicating if there is an active user on the system */
		isAnyActiveUser(): boolean;

		/** Return a boolean indicating if there is an active root user on the system */
		isRootActiveUser(): boolean;
	}
}