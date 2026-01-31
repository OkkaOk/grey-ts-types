
/** Provides access to global variables of this script */
declare var globals: any;

/** The parameters given to this script on launch */
declare var params: string[];

declare namespace GreyHack {
	/** Returns a string with the name of the user who is executing the current script. */
	function activeUser(): string;

	/** Performs a bitwise AND for the provided values. Warning: If either operand is >= `0x80000000`, it'll always return 0. */
	function bitAnd(a: number, b: number): number;

	/** Performs a bitwise OR for the provided values. Warning: If either operand is >= `0x80000000`, it'll always return 0. */
	function bitOr(a: number, b: number): number;

	/** Performs a bitwise XOR for the provided values. Warning: If either operand is >= `0x80000000`, it'll always return 0. */
	function bitXor(a: number, b: number): number;

	/**
	 * Returns a number by performing bitwise operations.
	 * 
	 * Warning: If either operand is >= `0x80000000`, it'll always returns 0.
	 */
	function bitwise(operator: "~", a: number): number;
	function bitwise(operator: "&" | "|" | "^" | "<<" | ">>" | ">>>", a: number, b: number): number;

	/**
	 * Changes the current working directory of the active shell to the specified path.
	 * 
	 * On success, an empty string is returned. If the operation fails, a descriptive error message is returned as a string.
	 * 
	 * If this method is invoked during an SSH encryption process, a runtime error is thrown and further script execution is halted.
	 */
	function cd(path: string): string;

	/**
	 * Returns the UTF-16 character string related to the provided unicode number.
	 * 
	 * The provided number needs to be between 0 and 65535. Any number which is outside this range will cause the script to throw a runtime error.
	 * 
	 * Beware when passing non-ASCII values to intrinsics as they will likely get re-encoded as UTF-8. For example, `md5(char(255))` will actually return the hash of the two-byte sequence `0xC3 0xBF`.
	 */
	function char(code: number): string;

	/**
	 * Removes any text existing in a Terminal prior to this point.
	 * 
	 * Utilizing this method in an SSH encryption process will trigger an error, halting further script execution.
	 */
	function clearScreen(): null;

	/** Returns the Unicode number of the first character of the string. In case an empty string is provided the script execution will crash. */
	function code(char: string): number;

	/**
	 * Returns a string value of a translation. Translations include commands, documentation and other game-related things.
	 * 
	 * Checkout {@link https://github.com/LoadingHome/Grey-Texts/blob/main/EnglishLang.json|Grey-Texts} for an overview of all available keys.
	 * 
	 * If the provided command name is empty this method will throw an error causing the script to stop.
	 */
	function commandInfo(commandName: string): string;

	/**
	 * Returns a string containing the current date and time. Ingame time passes 15 times as fast as real-time - 4 seconds per in-game minute.
	 * 
	 * The initial time after every wipe will be the 1st of January 2000 at 6:00 AM. Additionally, the game time will not proceed while the server is offline.
	 * 
	 * Output schema: `[day]/[month]/[year] - [hours]:[minutes]`
	 * 
	 * Example output: `27/Jan/2000 - 08:19`
	 */
	function currentDate(): string;

	/** Returns a string with the current active working directory. The working directory can be changed via the `cd` command. */
	function currentPath(): string;

	/**
	 * Stops execution of the currently running script.
	 * 
	 * Optionally a message can be provided which will be shown in the Terminal. There is also the possibility of styling output by using {@link https://docs.unity3d.com/Packages/com.unity.textmeshpro@4.0/manual/index.html|TextMeshPro rich-text tags}.
	 */
	function exit(message?: string): never;

	/**
	 * Returns a string which is the formatted version of the provided text.
	 * 
	 * Keep in mind that {@link https://docs.unity3d.com/Packages/com.unity.textmeshpro@4.0/manual/index.html|TextMeshPro rich-text tags} might screw up the output. When using tags consider applying these after formatting.
	 */
	function formatColumns(columns: string): string;

	/**
	 * Returns the absolute path of the given path string.
	 * 
	 * If the path is already absolute, it is returned unchanged. Otherwise, it is resolved against the current working path by default, or against the provided base path if specified.
	 * 
	 * If the path exceeds 1024 characters, the base path exceeds 64 characters, a runtime exception is thrown.
	 */
	function getAbsPath(path: string, basePath?: string): string;

	/**
	 * Returns {@link CtfEvent} if there is one available.
	 * 
	 * In case of failure this method will return a string with details.
	 */
	function getCtf(user: string, password: string, eventName: string): CtfEvent | string;

	/**
	 * Returns an object which is shared throughout script execution.
	 * 
	 * Can be helpful if it desired to pass or receive values when using {@link Shell.launch}.
	 * 
	 * Using this method in a SSH encryption process will cause an error to be thrown preventing further script execution.
	 */
	function getCustomObject<T = object>(): T & Record<string, any>;

	/**
	 * Returns by default the {@link Router router} to which the executing computer is connected to. 
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

	/**
	 * Returns the switch on the local network whose IP address matches
	 * @example
	 * const switch = getSwitch("192.168.1.4");
	 * if (switch) print("This device is a switch!");
	 */
	function getSwitch(ip: string): Router | null;

	/**
	 * Returns numeric hash for the provided data.
	 * 
	 * Using this method within a SSH encryption process will cause an error to be thrown causing the script execution to stop.
	 */
	function hash(value: any): number;

	/** Returns a string with the home folder path of the user who is executing the current script. */
	function homeDir(): string;

	/** Enables to import code from different sources into one file. */
	function importCode(path: string): null;

	/**
	 * Enables the inclusion of library binaries, which can be used inside your script.
	 * 
	 * If successful, an object related to the provided library will be returned; otherwise, null is returned.
	 * 
	 * This function is exclusively for importing library binaries. If you want to import custom scripts or binaries into your project, use {@link importCode} instead. That is only for files ingame. For files in your editor, use {@link include}
	 * 
	 * Leaving the path empty will cause an error to be thrown, interrupting further script execution.
	 */
	function includeLib(path: string): LibTypes[keyof LibTypes] | null;

	/** Returns a boolean indicating if the given IP is a valid LAN address */
	function isLanIp(ip: string): boolean;

	/** Returns a boolean indicating if the given IP is valid */
	function isValidIp(ip: string): boolean;

	/** Returns a string containing the path of the script that was initially executed, meaning that even when using {@link Shell.launch}, it will still return the path of the initially executed script. */
	function launchPath(): string;

	/**
	 * Returns a {@link MetaMail} entity if the login was successful.
	 * 
	 * On failure a string with details gets returned.
	 * 
	 * Utilizing this method in an SSH encryption process will trigger an error, halting further script execution.
	 */
	function mailLogin(user: string, pass: string): MetaMail | string;

	/**
	 * Returns the MD5 hash string of the provided string.
	 * 
	 * Using this method within an SSH encryption process will cause an error to be thrown, stopping any further script execution.
	 */
	function md5(value: string): string;

	/**
	 * Returns the IP address for the provided web address.
	 * 
	 * In case the web address cannot be found a string gets returned containing the following message: `Not found`.
	 * 
	 * If the provided web address is empty this method will throw an error preventing further script execution.
	 */
	function nslookup(webAddress: string): string;

	/**
	 * Returns a string which is the parent path of the provided path.
	 * 
	 * The path provided needs to be properly formatted. If the path is empty, this method will throw an error interrupting further script execution.
	 */
	function parentPath(path: string): string;

	/**
	 * Print a message on the Terminal.
	 * 
	 * There is also the possibility of styling output by using {@link https://docs.unity3d.com/Packages/com.unity.textmeshpro@4.0/manual/index.html|TextMeshPro rich-text tags}.
	 * 
	 * @param replaceText Clear the terminal before printing. This can be useful for creating a loading bar for example. 
	 */
	function print(value: any, replaceText?: boolean): null;

	/** Returns a string containing the path of the script that is currently executing. It will update when using {@link Shell.launch|launch}, which makes it different from {@link launchPath}. */
	function programPath(): string;

	/**
	 * Generates an array where each item is a number. By default, if only one argument is provided, the list starts at the given value and decrements by one for each item.
	 * 
	 * You can optionally define a start and end value, as well as customize the incremental value. However, if the incremental value is zero, or if the list exceeds `16777215L` items, the function will throw a runtime error.
	 */
	function range(start: number, end?: number, increment?: number): number[];

	/**
	 * Resets the password of your CTF account.
	 * 
	 * Returns true if resetting was successful; otherwise, it will return a string containing the reason for failure.
	 */
	function resetCtfPassword(newPassword: string): true | string;

	/**
	 * Returns a sliced version of the passed object.
	 * 
	 * The returned object will contain all elements related to the provided start and end index. If no start or end index is provided this method will essentially return a shallow copy of the passed object.
	 */
	function slice<T extends Array<any> | string>(value: T, startIndex?: number, endIndex?: number): T extends string ? string : T;

	/** Returns the string value of provided data. */
	function str(value: any): string;

	/** Returns a number of seconds representing the elapsed time since the script started. */
	function time(): number;

	/**
	 * Returns a string containing the bank account number of the player who is executing the script.
	 * 
	 * If the user does not have a bank this method will return null.
	 */
	function userBankNumber(): string | null;

	/**
	 * Pauses script execution to receive input from the user.
	 * 
	 * The prompt message can include {@link https://docs.unity3d.com/Packages/com.unity.textmeshpro@4.0/manual/index.html|TextMeshPro rich-text tags} for styling. Input is submitted by pressing Enter.
	 * 
	 * Using this function during an SSH encryption process will throw a runtime error and halt further script execution.
	 * 
	 * @param message A message to display on the terminal
	 * @param isPassword hide what's being typed
	 * @param anyKey capture a single key press and return
	 * @param addToHistory saves the input to the input history, allowing it to be recalled with the arrow keys
	 */
	function userInput(message?: string, isPassword?: boolean, anyKey?: boolean, addToHistory?: boolean): string;

	/** 
	 * Returns a string containing the email address of the player who is executing the script.
	 * 
	 * If the user does not have an email address this method will return null.
	 */
	function userMailAddress(): string | null;

	/**
	 * Pauses the script execution. Optionally, the duration can be provided via the time argument. By default, the duration will be 1 second.
	 * 
	 * The duration cannot be below 0.01 or above 300; otherwise, this method will throw a runtime exception.
	 */
	function wait(seconds?: number): null;

	/**
	 * Returns a string containing the administrator information behind an IP address provided.
	 * 
	 * In case of failure the returned string will contain an error message instead. If the provided ip is empty this method will throw an error causing the script to stop.
	 */
	function whois(ip: string): string;

	/** Waits for the next tick. */
	function yield(): null;

	/** Returns the type of the object */
	function getType(value: any): string;

	/**
	 * Checks if the given object is of a specific type
	 * @example
	 * const metax = includeLib("/lib/metaxploit.so");
	 * if (isType(metax, "MetaxploitLib")) {
	 * 	// Here TypeScript understands that metax is of type Metaxploit
	 * 	// So you can use something like this without errors
	 * 	metax.sniffer();
	 * }
	 */
	function isType<T extends keyof GameTypeMap>(value: any, type: T): value is GameTypeMap[T];

	/**
	 * FOR TRANSPILER ONLY
	 * 
	 * Includes the given source to this position. If the file was already transpiled then this does nothing
	 * 
	 * Can be a folder if you want to include all the files inside
	 * 
	 * @param file The absolute or relative path of the file
	 * 
	 * @example
	 * include("./commands");
	 */
	function include(file: string): void;

	interface LibTypes {
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

interface PrimitiveTypeMap {
	"null": null,
	"number": number,
	"list": Array<any>,
	"map": Record<string, any>,
	"function": Function,
	"string": string,
};

interface ClassIDMap {
	"pcomputer": unknown,
	"pfile": unknown,
	"prouter": unknown,
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

type GameTypeMap = ClassIDMap & PrimitiveTypeMap;