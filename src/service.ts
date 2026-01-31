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
}