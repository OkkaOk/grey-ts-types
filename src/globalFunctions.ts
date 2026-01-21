
declare var globals: any;
/** The parameters given to this script on launch */
declare var params: string[];

declare namespace GreyHack {
	function abs(value: number): number;
	function acos(value: number): number;
	function activeUser(): string;
	function asin(value: number): number;
	function atan(y: number, x?: number): number;
	function bitAnd(a: number, b: number): number;
	function bitOr(a: number, b: number): number;
	function bitXor(a: number, b: number): number;
	function bitwise(operator: "~" | "&" | "|" | "^" | "<<" | ">>" | ">>>", a: number, b?: number): number;
	function cd(path: string): string;
	function ceil(value: number): number;
	function char(code: number): string;
	function clearScreen(): null;
	function code(char: string): number;
	function commandInfo(commandName: string): string;
	function cos(value: number): number;
	function currentDate(): string;
	function currentPath(): string;
	function exit(message?: string): never;
	function floor(value: number): number;
	function formatColumns(columns: string): string;
	function getAbsPath(path: string, basePath?: string): string;
	function getCtf(user: string, password: string, eventName: string): CtfEvent | string;
	function getCustomObject<T=object>(): T & Record<string, any>;
	/** Returns by default the {@link Router router} to which the executing computer is connected to. 
	 * 
	 * Optionally an IP address can be provided. In case of failure `null` is returned. 
	 * 
	 * If there is no active internet connection, this method will throw an error, interrupting further script execution.
	 * @example
	 * const router = getRouter();
	 * print("Router's essid name is: " + router.essidName);
	 */
	function getRouter(ip?: string): Router | null;
	/**
	 * Returns the {@link Shell shell} that is executing the current script.
	 * 
	 * Optionally, a username and password can be provided, allowing the use of a shell with other user privileges. 
	 * 
	 * If the username or password does not match an existing user or if the provided values deviate from the defined signature, this method will return `null`.
	 * @example
	 * const shell = getShell("root", "test");
	 * print("My public IP is: " + shell.hostComputer.publicIp);
	 */
	function getShell(): Shell;
	function getShell(username?: string, password?: string): Shell | null;
	/** Returns the switch on the local network whose IP address matches
	 * @example
	 * const switch = getSwitch("192.168.1.4");
	 * if (switch) print("This device is a switch!");
	 */
	function getSwitch(ip: string): Router | null;
	function hash(value: any): number;
	function homeDir(): string;
	function importCode(path: string): null;
	function includeLib(path: string): LibTypes[keyof LibTypes] | null;
	function isLanIp(ip: string): boolean;
	function isValidIp(ip: string): boolean;
	function launchPath(): string;
	function log(value: number, base?: number): number;
	function mailLogin(user: string, pass: string): MetaMail | string | null;
	function md5(value: string): string;
	function nslookup(webAddress: string): string;
	function parentPath(path: string): string;
	function pi(): number;
	function print(value: any, replaceText?: boolean): null;
	function programPath(): string;
	function range(start: number, end?: number, increment?: number): number[];
	function resetCtfPassword(newPassword: string): true | string;
	function rnd(seed?: number): number;
	function round(value: number, fixed?: number): number;
	function sign(value: number): number;
	function sin(value: number): number;
	function slice<T extends Array<any> | string>(value: T, startIndex?: number, endIndex?: number): T extends string ? string : T;
	function sqrt(value: number): number;
	function str(value: any): string;
	function tan(value: number): number;
	function time(): number;
	function userBankNumber(): string | null;
	function userInput(message?: string, isPassword?: boolean, anyKey?: boolean, addToHistory?: boolean): string;
	function userMailAddress(): string | null;
	function wait(seconds: number): null;
	function whois(ip: string): string;
	function yield(): null;

	function getType(value: any): keyof GameTypeMap;
	/** Checks if the given object is of a specific type
	 * @example
	 * const metax = includeLib("/lib/metaxploit.so");
	 * if (isType(metax, "MetaxploitLib")) {
	 * 	// Here TypeScript understands that metax is of type Metaxploit
	 * 	// So you can use something like this without errors
	 * 	metax.sniffer();
	 * }
	 */
	function isType<T extends keyof GameTypeMap>(value: any, type: T): value is GameTypeMap[T];
	/** FOR TRANSPILER ONLY
	 * 
	 * Includes the given source to this position. If the file was already transpiled then this does nothing
	 * 
	 * Can be a folder if you want to include all the files inside 
	 * @param file The absolute or relative path of the file */
	function include(file: string): void;

	type LibTypes = {
		"aptclient.so": GreyHack.AptClient,
		"metaxploit.so": GreyHack.Metaxploit,
		"crypto.so": GreyHack.Crypto,
		"libftp.so": GreyHack.Service,
		"libssh.so": GreyHack.Service,
		"libhttp.so": GreyHack.Service,
		"blockchain.so": GreyHack.BlockChain,
		"libsmartappliance.so": GreyHack.SmartAppliance,
		"libtrafficnet.so": GreyHack.TrafficNet,
	}
}

declare var activeUser: typeof GreyHack.activeUser;
declare var bitAnd: typeof GreyHack.bitAnd;
declare var bitOr: typeof GreyHack.bitOr;
declare var bitXor: typeof GreyHack.bitXor;
declare var bitwise: typeof GreyHack.bitwise;
declare var cd: typeof GreyHack.cd;
declare var char: typeof GreyHack.char;
declare var clearScreen: typeof GreyHack.clearScreen;
declare var code: typeof GreyHack.code;
declare var commandInfo: typeof GreyHack.commandInfo;
declare var currentDate: typeof GreyHack.currentDate;
declare var currentPath: typeof GreyHack.currentPath;
declare var exit: typeof GreyHack.exit;
declare var formatColumns: typeof GreyHack.formatColumns;
declare var getAbsPath: typeof GreyHack.getAbsPath;
declare var getCtf: typeof GreyHack.getCtf;
declare var getCustomObject: typeof GreyHack.getCustomObject;
declare var getRouter: typeof GreyHack.getRouter;
declare var getShell: typeof GreyHack.getShell;
declare var getSwitch: typeof GreyHack.getSwitch;
declare var hash: typeof GreyHack.hash;
declare var homeDir: typeof GreyHack.homeDir;
declare var importCode: typeof GreyHack.importCode;
declare var includeLib: typeof GreyHack.includeLib;
declare var isLanIp: typeof GreyHack.isLanIp;
declare var isValidIp: typeof GreyHack.isValidIp;
declare var launchPath: typeof GreyHack.launchPath;
declare var mailLogin: typeof GreyHack.mailLogin;
declare var md5: typeof GreyHack.md5;
declare var nslookup: typeof GreyHack.nslookup;
declare var parentPath: typeof GreyHack.parentPath;
declare var print: typeof GreyHack.print;
declare var programPath: typeof GreyHack.programPath;
declare var range: typeof GreyHack.range;
declare var resetCtfPassword: typeof GreyHack.resetCtfPassword;
declare var slice: typeof GreyHack.slice;
declare var str: typeof GreyHack.str;
declare var time: typeof GreyHack.time;
declare var userBankNumber: typeof GreyHack.userBankNumber;
declare var userInput: typeof GreyHack.userInput;
declare var userMailAddress: typeof GreyHack.userMailAddress;
declare var wait: typeof GreyHack.wait;
declare var whois: typeof GreyHack.whois;
declare var yield: typeof GreyHack.yield;

declare const getType: typeof GreyHack.getType;
declare const isType: typeof GreyHack.isType;

declare const include: typeof GreyHack.include;

type OtherTypeMap = {
	"null": null,
	"pcomputer": unknown,
	"pfile": unknown,
	"prouter": unknown,
	"number": number,
	"list": Array<any>,
	"map": Record<string, any>,
	"function": Function,
	"string": string,
};

type ClassIDMap = {
	"aptClientLib": GreyHack.AptClient,
	"blockChainLib": GreyHack.BlockChain,
	"ctfEvent": GreyHack.CtfEvent,
	"coin": GreyHack.Coin,
	"computer": GreyHack.Computer,
	"ftpComputer": GreyHack.FtpComputer,
	"cryptoLib": GreyHack.Crypto;
	"debugLibrary": GreyHack.DebugLibrary,
	"file": GreyHack.File,
	"ftpFile": GreyHack.FtpFile,
	"MetaLib": GreyHack.MetaLib,
	"MetaMail": GreyHack.MetaMail,
	"MetaxploitLib": GreyHack.Metaxploit,
	"NetSession": GreyHack.NetSession,
	"port": GreyHack.Port,
	"router": GreyHack.Router,
	"service": GreyHack.Service,
	"shell": GreyHack.Shell,
	"ftpShell": GreyHack.FtpShell,
	"SmartAppliance": GreyHack.SmartAppliance,
	"subwallet": GreyHack.SubWallet,
	"TrafficNet": GreyHack.TrafficNet,
	"wallet": GreyHack.Wallet;
};

type GameTypeMap = ClassIDMap & OtherTypeMap;