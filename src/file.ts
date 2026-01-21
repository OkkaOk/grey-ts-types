declare namespace GreyHack {
	interface FtpFile extends BaseFile {
		classID: "ftpFile";
		parent: FtpFile | null;
		getFiles: () => FtpFile[] | null;
		getFolders: () => FtpFile[] | null;
	}

	interface File extends BaseFile {
		classID: "file";
		parent: File | null;
		allowImport: boolean;
		getFiles: () => File[] | null;
		getFolders: () => File[] | null;
		chmod: (perms: string, recursive?: boolean) => string;
		getContent: () => string | null;
		setContent: (content: string) => string | boolean | null;
		setGroup: (group: string, recursive?: boolean) => string | null;
		setOwner: (owner: string, recursive?: boolean) => string | null;
		symlink: (path: string, newName?: string) => string | boolean | null;
	}

	interface BaseFile {
		classID: "ftpFile" | "file";
		name: string | null;
		group: string;
		owner: string | null;
		permissions: string | null;
		size: string | null;
		copy: (destFolder?: string, newName?: string) => string | boolean | null;
		delete: () => string;
		hasPermission: (perms: "r" | "w" | "x") => boolean | null;
		isBinary: () => boolean | null;
		isFolder: () => boolean | null;
		isSymlink: () => boolean | null;
		move: (destFolder: string, newName?: string) => string | boolean | null;
		path: (symLinkOriginalPath?: boolean) => string;
		rename: (name: string) => string | boolean;
	}
}