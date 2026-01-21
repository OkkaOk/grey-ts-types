declare namespace GreyHack {
	interface BaseComputer<FileType extends GreyHack.File | GreyHack.FtpFile> {
		classID: "ftpComputer" | "computer";
		getName: () => string;
		createFolder: (path: string, folderName?: string) => string | boolean;
		file: (path: string) => FileType | null;
	}

	interface FtpComputer extends BaseComputer<FtpFile> {
		classID: "ftpComputer",
	}

	interface Computer extends BaseComputer<File> {
		classID: "computer";
		localIp: string;
		publicIp: string;
		activeNetCard: () => string;
		changePassword: (username: string, password: string) => boolean | string | null;
		closeProgram: (pid: number) => boolean | string | null;
		connectEthernet: (netDevice: netDevice, address: string, gateway: string) => string | null;
		connectWifi: (netDevice: netDevice, bssid: string, essid: string, password: string) => boolean | string | null;
		createGroup: (username: string, group: string) => boolean | string | null;
		createUser: (username: string, password: string) => boolean | string | null;
		deleteGroup: (username: string, group: string) => boolean | string | null;
		deleteUser: (username: string, removeHome?: boolean) => boolean | string | null;
		getPorts: () => Port[];
		groups: (username: string) => string | null;
		isNetworkActive: () => boolean;
		networkDevices: () => string;
		networkGateway: () => string;
		reboot: (safeMode?: boolean) => boolean | string | null;
		showProcs: () => string;
		touch: (destFolder: string, fileName: string) => boolean | string;
		wifiNetworks: (netDevice: netDevice) => string[] | null;

		getName: () => string;
		createFolder: (path: string, folderName?: string) => string | boolean;
	}
}