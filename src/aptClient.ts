declare namespace GreyHack {
	interface AptClient {
		classID: "aptClientLib";

		/** 
		 * Inserts a repository address into the `/etc/apt/sources.txt` file.
		 * 
		 * On success, it will return an empty string. In case of failure, it will return a string with an error message.
		*/
		addRepo(repositoryAddress: string, port?: number): string;

		/** 
		 * Checks if there is a newer version of the program or library in the repository.
		 * 
		 * On success, it will return a boolean, with false indicating that there is no new version, while true indicates that there is a new version available. 
		 * 
		 * In case of failure, it will return a string containing an error message. 
		 */
		checkUpgrade(filePath: string): boolean | string;

		/** 
		 * Deletes a repository address from the `/etc/apt/sources.txt` file. 
		 * 
		 * On success, it will return an empty string. In case of failure, it will return a string with an error message. 
		 */
		delRepo(repositoryAddress: string): string;

		/** 
		 * Installs a program or library from a remote repository listed in `/etc/apt/sources.txt`. 
		 * 
		 * If no path is specified, the program installs in `/lib` if it is a library or in `/bin` otherwise. 
		 * 
		 * On success, this method will return true. In case of failure, it will return a string containing an error message.
		 */
		install(package: string, installPath?: string): true | string;

		/** 
		 * Search specifically looks for a package in any of the repositories listed in `/etc/apt/sources.txt`. 
		 * 
		 * On success, it will return a string containing all packages that partially match the provided search value. 
		 * 
		 * On failure, it will return a string with various error messages. 
		 */
		search(package: string): string;

		/** 
		 * Show displays all the packages available in a repository. The repository must be listed in the `/etc/apt/sources.txt` file. 
		 * 
		 * If it cannot find a repository, it will return various error messages. 
		 * 
		 * On success, it will return a string containing all packages and their descriptions, with each entry separated by a newline. 
		 */
		show(repositoryAddress: string): string;

		/** 
		 * Update refreshes the list of available packages after adding a new repository in `/etc/apt/sources.txt`, or if the remote repository has updated its information in `/server/conf/repod.conf`. 
		 * 
		 * If the update is successful, an empty string will be returned. In case of failure, a string with an error message will be returned. 
		 * 
		 * If for some reason the `/etc/apt/sources.txt` is malformed this method will return false. 
		 */
		update(): string | false;
	}
}