declare namespace GreyHack {
	interface BlockChain {
		classID: "blockchainLib";

		/** 
		 * Returns a number representing the total amount of mined coins.
		 * 
		 * In case of an error, it will return a string with the details. 
		 * @example
		 * const blockChain = includeLib("/lib/blockchain.so");
		 * if (!isType(blockChain, "blockchainLib"))
		 * 	exit("Failed to get blockchain.so");
		 * 
		 * const mined = blockChain.amountMined("bitcoin");
		 * if (isType(mined, "string"))
		 * 	exit(`Coudn't get the amount of mined coin: ${mined}`);
		 * 
		 * print(`There are ${mined} coins mined for this coin`);
		 */
		amountMined(coinName: string): number | string;

		/**
		 * Returns a number representing the current unit value of the cryptocurrency. 
		 * 
		 * In case of an error, a string with the error details will be returned. 
		 */
		coinPrice(coinName: string): number | string;

		/** 
		 * Creates a wallet and returns a wallet object on success, which can be used to manage cryptocurrencies. 
		 * 
		 * In case of an error, it will return a string with the details. 
		 */
		createWallet(user: string, password: string): Wallet | string;

		/** 
		 * Removes a cryptocurrency from the world. The credentials used in the creation of the cryptocurrency are required. 
		 * 
		 * On success, it will return a true. 
		 * 
		 * On failure, it will return a string containing details. 
		 */
		deleteCoin(coinName: string, user: string, password: string): true | string;

		/** 
		 * Returns a coin object used to manage the currency. 
		 * 
		 * In case of an error, it will return a string with the details. 
		 */
		getCoin(coinName: string, user: string, password: string): Coin | string;

		/** 
		 * Returns a string with the name of the coin owned by the player. 
		 * 
		 * In case of an error, it returns a string with details. 
		 */
		getCoinName(user: string, password: string): string;

		/** Returns a wallet object on success. In case of an error, it will return a string indicating the reason. */
		loginWallet(user: string, password: string): Wallet | string;

		/** 
		 * Returns an object with the latest changes in the value of a specific cryptocurrency. 
		 * 
		 * The key of the object is an index represented by a number. The value is an array, where index 0 is the historical price of the coin and index 1 is the date when the price change occurred. 
		 * 
		 * If no coin exists with this name, the method will return null. 
		 */
		showHistory(coinName: string): Record<number, [number, string]> | string | null;
	}
}