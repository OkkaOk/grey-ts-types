declare namespace GreyHack {
	interface TrafficNet {
		classID: "TrafficNet";

		/** 
		 * Accesses the traffic camera system, opening a window with controls to switch between different cameras. 
		 * 
		 * If the window opens successfully, this method returns true. In case of an error, it returns a string with details. 
		 */
		cameraLinkSystem(): true | string;

		/** Returns string which contains job and name of a NPC. If an error occurs, a string with details is returned. */
		getCredentialsInfo(): string;

		/** 
		 * Performs a search for the specified license plate to locate the vehicle. 
		 * 
		 * If the vehicle is visible on any camera, the viewer will switch to the camera currently displaying it and return true. 
		 * 
		 * If the vehicle cannot be located or the license plate is incorrect, a string indicating the error is returned. 
		 */
		locateVehicle(licensePlate: string, password: string): true | string;
	}
}