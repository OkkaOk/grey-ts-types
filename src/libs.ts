declare namespace GreyHack {
	interface Service {
		classID: "service";
		installService(): true | string;
		startService(): true | string;
		stopService(): true | string;
	}

	interface Metaxploit {
		classID: "MetaxploitLib";
		load(path: string): MetaLib | null;
		netUse(ip: string, port: number): NetSession | null;
		rshellClient(ip: string, port: number, processName?: string): true | string;
		rshellServer(): Shell[] | string;
		scan(metaLib: MetaLib): string[] | null;
		scanAddress(metaLib: MetaLib, memoryAddress: string): string | null;
		sniffer(saveEncSource?: boolean): string | null;
	}

	interface MetaLib {
		classID: "MetaLib";
		libName: string;
		version: string;
		debugTools(user: string, password: string): string | DebugLibrary | null;
		isPatched(getDate?: boolean): boolean | string | null;
		overflow(memoryAddress: string, unsecZone: string, optArgs?: string): Shell | Computer | File | string | boolean | null;
	}

	interface DebugLibrary {
		classID: "debugLibrary";
		applyPatch(path: string): string | null;
		payload<T extends string | undefined>(memZone: string, filePath?: T): string | null | (T extends string ? [Partial<Computer>, Partial<File>, MetaLib] : [Partial<Computer>]);
		scan(): string;
		unitTesting(errorLines: number[]): string | null;
	}

	interface Crypto {
		classID: "cryptoLib";
		aircrack(path: string): string | null;
		aireplay(bssid: string, essid: string, maxAcks?: number): string | null;
		airmon(option: "start" | "stop", device: netDevice): boolean | string;
		decipher(hash: string): string | null;
		decrypt(filePath: string, password: string): true | string | null;
		encrypt(filePath: string, password: string): true | string | null;
		isEncrypted(filePath: string): boolean | string | null;
		smtpUserList(ip: string, port: number): string[] | string | null;
	}

	interface BlockChain {
		classID: "blockchainLib";
		amountMined(coinName: string): number | string | null;
		coinPrice(coinName: string): number | string | null;
		createWallet(user: string, password: string): Wallet | string | null;
		deleteCoin(coinName: string, user: string, password: string): true | string | null;
		getCoin(coinName: string, user: string, password: string): Coin | string | null;
		getCoinName(user: string, password: string): string | null;
		loginWallet(user: string, password: string): Wallet | string | null;
		showHistory(coinName: string): Record<number, [number, string]> | string | null;
	}

	interface AptClient {
		classID: "aptClientLib";
		addRepo(repositoryAddress: string, port?: number): string | null;
		checkUpgrade(filePath: string): boolean | string | null;
		delRepo(repositoryAddress: string): string | null;
		install(package: string, installPath?: string): true | string | null;
		search(package: string): string | null;
		show(repositoryAddress: string): string | null;
		update(): string | false;
	}

	interface SmartAppliance {
		classID: "SmartAppliance";
		model(): string;
		overrideSettings(power: number, temperature: number): true | string | null;
		setAlarm(enable: boolean): true | string | null;
	}

	interface TrafficNet {
		classID: "TrafficNet";
		cameraLinkSystem(): true | string;
		getCredentialsInfo(): string;
		locateVehicle(licensePlate: string, password: string): true | string | null;
	}
}