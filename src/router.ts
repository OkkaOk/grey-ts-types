declare namespace GreyHack {
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
		 * In case of failure, this method will return null or a string with details. In case an empty ip is provided this method will throw a runtime exception. 
		 */
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
}