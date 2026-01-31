declare namespace GreyHack {
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
}