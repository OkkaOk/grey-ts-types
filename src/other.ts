declare namespace GreyHack {
	interface CtfEvent {
		classID: "ctfEvent";
		getCreatorName(): string;
		getDescription(): string;
		getMailContent(): string;
		getTemplate(): string;
		playerSuccess(): boolean;
	}

	interface MetaMail {
		classID: "MetaMail";
		delete(mailId: string): true | string | null;
		fetch(): string[] | string;
		read(mailId: string): string | null;
		send(emailAddress: string, subject: string, message: string): string | true | null;
	}

	interface NetSession {
		classID: "NetSession";
		dumpLib(): MetaLib;
		floodConnection(): null;
		getNumConnGateway(): number;
		getNumPortforward(): number;
		getNumUsers(): number;
		isAnyActiveUser(): boolean;
		isRootActiveUser(): boolean;
	}

	interface Port {
		classID: "port";
		portNumber: number;
		isClosed: () => boolean;
		getLanIp: () => string;
	}

	interface Router {
		classID: "router";
		bssidName: string;
		essidName: string;
		kernelVersion: string;
		localIp: string;
		publicIp: string;
		devicePorts(ip: string): Port[] | string | null;
		devicesLanIp(): string[];
		firewallRules(): string[];
		pingPort(portNumber: number): Port | null;
		portInfo(port: Port): string | null;
		usedPorts(): Port[];
	}

	interface FtpShell {
		classID: "ftpShell";
		hostComputer: FtpComputer;
		scp: Shell["scp"];
	}

	interface Shell {
		classID: "shell";
		hostComputer: Computer;
		build: (sourcePath: string, binaryPath: string, allowImport?: boolean) => string;
		connectService: (ip: string, port: number, user: string, password: string, service?: "ssh" | "ftp") => Shell | FtpShell | string | null;
		launch: (program: string, params?: string) => string | boolean;
		ping: (ip: string) => string | boolean;
		scp: (file: string, folder: string, remoteShell: Shell, isUpload?: boolean) => boolean | string | null;
		startTerminal: () => never;
	}
}