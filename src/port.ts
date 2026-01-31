declare namespace GreyHack {
	interface Port {
		classID: "port";

		/** Port number used by this port */
		portNumber: number;

		/** Returns a boolean, where true indicates that the specified port is closed and false indicates that the port is open. */
		isClosed(): boolean;

		/** Returns a string containing the local IP address of the computer to which the port is pointing. */
		getLanIp(): string;
	}
}