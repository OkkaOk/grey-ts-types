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
}