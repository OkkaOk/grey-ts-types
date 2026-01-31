declare namespace GreyHack {
	interface FtpFile extends BaseFile {
		classID: "ftpFile";

		/** The parent folder of the current file or folder */
		parent: FtpFile | null;

		/**
		 * Returns an array of files inside this folder.
		 * 
		 * In case the current entity is a file instead of a folder this method will return null, so it is advisable to first use the isFolder function before calling this method. In case the current folder gets deleted this method will return null as well.
		 */
		getFiles(): FtpFile[] | null;

		/**
		 * Returns an array of folders inside this folder.
		 * 
		 * In case the current entity is a file instead of a folder this method will return null, so it is advisable to first use the isFolder function before calling this method. In case the current folder gets deleted this method will return null as well.
		 */
		getFolders(): FtpFile[] | null;
	}

	interface File extends BaseFile {
		classID: "file";

		/** The parent folder of the current file or folder */
		parent: File | null;

		/** Indicates if the file is a binary and can be imported by other scripts */
		allowImport: boolean;

		/**
		 * Returns an array of files inside this folder.
		 * 
		 * In case the current entity is a file instead of a folder this method will return null, so it is advisable to first use the isFolder function before calling this method. In case the current folder gets deleted this method will return null as well.
		 */
		getFiles(): File[] | null;

		/**
		 * Returns an array of folders inside this folder.
		 * 
		 * In case the current entity is a file instead of a folder this method will return null, so it is advisable to first use the isFolder function before calling this method. In case the current folder gets deleted this method will return null as well.
		 */
		getFolders(): File[] | null;

		/**
		 * Modifies the file permissions.
		 * 
		 * The format for applying permissions is as follows: `[references][operator][modes]`. The references type is defined through three possible types: user `u`, group `g`, and other `o`. The operator is used to define if permissions get added "+" or removed "-". There are three different modes that can be modified: read `r`, write `w`, and execute `x`. So, for example, `o-wrx` would remove all possible permissions for others. To add all permissions for others again, `o+wrx` would be used.
		 * 
		 * In case the modification fails, this method will return a string containing information about the reason. Otherwise, an empty string is returned.
		 * 
		 * @param recursive set the permissions recursively to every file inside this folder
		 */
		chmod(perms: string, recursive?: boolean): string;

		/**
		 * Returns a string representing the content of the file. To read a file, the user requires read access or being root.
		 * 
		 * Note that you cannot read a binary file. In case of failure, null will be returned.
		 * 
		 * If this method is used within an SSH encryption process, an error will be thrown, preventing any further script execution.
		 */
		getContent(): string | null;

		/**
		 * Saves text into a file. The content will not get appended to the file; therefore, existing content will be overridden.
		 * 
		 * To set new content, the user requires write permissions or being root. Keep in mind that text files cannot exceed the character limit of 160,000. In case setting the content was successful, true will be returned. Otherwise, a string with details will be returned.
		 * 
		 * If this method is used within an SSH encryption process, an error will be thrown, preventing any further script execution. If the permissions are lacking, this method will return false. In case the file gets deleted this method will return null.
		 */
		setContent(content: string): string | boolean | null;

		/**
		 * Change the group related to this file.
		 * 
		 * The group name cannot exceed 15 characters. Additionally either write permissions or being root is required. In case of failure, a string with details. On success, an empty string gets returned. In case the current file gets deleted, this method will return null.
		 * 
		 * If the passed group value is empty, the group value is longer than 15 characters, or the passed recursive value deviates from its original type, an error will be thrown, preventing further script execution.
		 * 
		 * @param recursive set the group recursively to every file inside this folder
		 */
		setGroup(group: string, recursive?: boolean): string | null;

		/**
		 * Change the owner of this file.
		 * 
		 * The owner's name cannot exceed 15 characters. Additionally either write permissions or being root is required. In case of failure a string gets returned containing the cause. Otherwise an empty string gets returned. In case the current file gets deleted, this method will return null.
		 * 
		 * If the passed owner value is empty, the owner value is longer than 15 characters, or the passed recursive value deviates from its original type, an error will be thrown, interrupting further script execution.
		 * 
		 * @param recursive set the owner recursively to every file inside this folder
		 */
		setOwner(owner: string, recursive?: boolean): string | null;

		/**
		 * Creates a symlink to the specified path.
		 * 
		 * Symlinks can only be created if the user has write permissions or is root. The new filename must be alphanumeric and under 128 characters. Upon success, this method returns true. On failure, it returns a string with details.
		 * 
		 * If used within an SSH encryption process, if the new name exceeds 128 characters, or if the path is too long, an error will be thrown, interrupting script execution. If the current file is deleted, this method will return null.
		 */
		symlink(path: string, newName: string): true | string | null;
	}

	interface BaseFile {
		classID: "ftpFile" | "file";

		/** The name of the file. Is null if the file gets deleted before accessing this */
		name: string | null;

		/** The name of the group this file belongs to. Is null if the file gets deleted before accessing this */
		group: string | null;

		/** The name of the file owner. Is null if the file gets deleted before accessing this */
		owner: string | null;

		/** 
		 * The permissions of the file. Is null if the file gets deleted before accessing this
		 * 
		 * The format for this permissions string is as follows: `[fileType][wrx](u)[wrx](g)[wrx](o)`. The file type is either `d` in case it's a directory or `-`. The user type gets defined through three possible types: user `u`, group `g`, and other `o`. There are three different permission types: read `r`, write `w`, and execute `x`. An example of a string returned by this method would be `-rwxr-xr-x`.
		 */
		permissions: string | null;

		/** 
		 * The size of the file in bytes. Is null if the file gets deleted before accessing this
		 * 
		 * There is no correlation between file size and actual file content. Instead, the file size is depending on the name of the file
		 */
		size: string | null;

		/**
		 * Copies the file to the provided path.
		 * 
		 * Files can only be copied if the user has read and write permissions or is root. The new filename has to be below 128 characters and alphanumeric. After success, this method will return true. Otherwise, it will return a string containing information about the reason for failure.
		 * 
		 * If this method is used within an SSH encryption process, the new name exceeds 128 characters, or the path is too long, an error will be thrown, causing an interruption of script execution. In case the current file gets deleted, this method will return null.
		 */
		copy(destFolder: string, newName: string): string | true | null;

		/**
		 * Delete the current file.
		 * 
		 * To delete files, write permissions are required or being root. In case of failure, a string with details will be returned. Otherwise, an empty string gets returned. 
		 * 
		 * Note that deleting a file will leave a log entry.
		 */
		delete(): string;

		/**
		 * Returns a boolean indicating if the user who launched the script has the requested permissions.
		 * 
		 * In case the file gets deleted, this method will return null instead.
		 */
		hasPermission(perms: "r" | "w" | "x"): boolean | null;

		/** Returns a boolean indicating if the file is a binary. Returns null if the file gets deleted */
		isBinary(): boolean | null;

		/** Returns a boolean indicating if the file is a folder. Returns null if the file gets deleted */
		isFolder(): boolean | null;

		/** Returns a boolean indicating if the file is a symlink. Returns null if the file gets deleted */
		isSymlink(): boolean | null;

		/**
		 * Moves the file to the provided path.
		 * 
		 * Files can only be moved if the user has read and write permissions or is root. The new filename has to be below 128 characters and alphanumeric. After success, this method will return true. Otherwise, this method will return a string with details.
		 * 
		 * If this method is used within an SSH encryption process, the new name exceeds 128 characters, or the path is too long, an error will be thrown, causing an interruption of script execution. In case the current file gets deleted, this method will return null.
		 */
		move(destFolder: string, newName: string): string | true | null;

		/**
		 * Returns a string containing the file path. If the file has been deleted, this method will still return the path it had prior to deletion.
		 * @param symLinkOriginalPath return the original path of the linked file instead
		 */
		path(symLinkOriginalPath?: boolean): string;

		/**
		 * Rename the file with the name provided.
		 * 
		 * Files can only be renamed if the user has write permissions or is root. The new filename has to be below 128 characters and alphanumeric. On failure, this method will return a string with details. Otherwise, this method will return an empty string.
		 * 
		 * If this method is used within an SSH encryption process, an error will be thrown, causing the script execution to be interrupted.
		 */
		rename(name: string): string;
	}
}