declare namespace GreyHack {
	interface SmartAppliance {
		classID: "SmartAppliance";

		/** Returns a string with the appliance model ID. */
		model(): string;

		/** 
		 * Overrides the power and temperature settings of the appliance. 
		 * 
		 * If successful, true is returned; otherwise, it returns a string detailing the error. 
		 */
		overrideSettings(power: number, temperature: number): true | string;

		/** 
		 * Activates or deactivates the sound alarm indicating any appliance malfunction. 
		 * 
		 * If successful, true is returned; otherwise, a string containing error details is returned. 
		 */
		setAlarm(enable: boolean): true | string;
	}
}