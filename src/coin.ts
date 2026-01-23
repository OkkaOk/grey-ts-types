declare namespace GreyHack {
	interface Coin {
		classID: "coin";
		/**
		 * Registers a new account in the coin that can be used to manage services such as stores.
		 * 
		 * It is necessary to provide the PIN of the owner's wallet that wants to register.
		 * 
		 * In case of success, the method will return true. In case of an error, a string with the details is returned.
		 */
		createSubWallet(walletID: string, pin: string, subwalletUser: string, subwalletPassword: string): string | true;

		/** Returns the configured address that will be shown to users who do not have the currency, indicating where they have to register.
		 * 
		 * In case of an error, it returns a string with details.
		 */
		getAddress(): string;

		/**
		 * Returns a number representing the defined interval in which each user receives a coin reward when mining.
		 * 
		 * In case of failure, the method will return a string with details.
		 */
		getCycleMining(): number | string;

		/**
		 * Returns a number representing the amount of coins that have been mined so far.
		 * 
		 * In case of an error, it returns a string with details.
		 */
		getMinedCoins(): number | string;

		/**
		 * Returns a number representing the amount of coins that will be received as a reward after each mining cycle.
		 * 
		 * In case of failure, the method will return a string with details.
		 */
		getReward(): number | string;

		/**
		 * Returns a {@link SubWallet} on success.
		 * 
		 * In case of error, it returns a string with the details.
		 */
		getSubwallet(subwalletUser: string): SubWallet | string;

		/**
		 * Returns an array where each item is a {@link SubWallet}, including all the accounts registered in the cryptocurrency.
		 * 
		 * In case of error, it returns a string with the details.
		 */
		getSubwallets(): SubWallet[] | string;

		/** Resets the password of the coin. It returns true if resetting was successful; otherwise, it will return a string. */
		resetPassword(newPassword: string): true | string;

		/**
		 * Configures a valid address that will be shown to users who do not have the currency, indicating where to register.
		 * 
		 * In case of an error, it returns a string with the details. In case of success, true will be returned.
		 */
		setAddress(address: string): true | string;

		/**
		 * Defines the interval (in-game hours) in which each user receives a coin reward when mining.
		 * 
		 * The interval cannot be lower than 1 and not higher than 2160.
		 * 
		 * On success, it will return true. In case of failure, the method will return a string with details.
		 */
		setCycleMining(rateHours: number): true | string;

		/**
		 * Assigns the reward that miners will receive after each mining cycle. The reward value has to be above one.
		 * 
		 * On success, it will return true. In case of failure, the method will return a string with details.
		 */
		setReward(coinAmount: number): true | string;

		/**
		 * Facilitates a transaction of the currency between the indicated subwallets.
		 * 
		 * In case of an error, a string with the details is returned. In case of success, true will be returned.
		 */
		transaction(subwalletFrom: string, subwalletTo: string, amount: number): true | string;
	}

	interface SubWallet {
		classID: "subwallet";

		/** Returns a boolean indicating if the credentials are correct. For some cases, this method will return a string with an error message. */
		checkPassword(password: string): true | string;

		/** Returns a string with the name of the wallet to which this subwallet belongs. */
		walletUsername(): string;

		/** Deletes the account registered in the cryptocurrency.
		 * 
		 * Returns a boolean indicating if the deletion was successful. In case of certain failures, this method may return a string with details.
		 */
		delete(): boolean | string;

		/** Returns a number of coins of a given currency. In case of error, a string with the details is returned. */
		getBalance(): number | string;

		/** Returns a string with the information stored by the coin creator. */
		getInfo(): string;

		/** Returns a string with the username associated with this subwallet. On failure, this method returns a string with an error message. */
		getUser(): string;

		/**
		 * Returns a list with the information of the last transaction.
		 * 
		 * Index 0 is a string with the other subWallet. Index 1 is an integer with the amount. Index 2 is a number indicating the direction of the transaction (0 for Deposit, 1 for Withdrawal). Index 3 is a string indicating the date of the transaction.
		 * 
		 * On failure, this method will either return false or a string with an error message.
		 */
		lastTransaction(): [string, number, 0 | 1, string] | false | string;

		/** 
		 * Starts the process of mining the cryptocurrency. The process leaves the terminal busy until a coin is mined.
		 * 
		 * On success, this method will return true. On failure, this method will return a string with details.
		 */
		mining(): true | string;

		/**
		 * Stores optional information in the Subwallet for any use.
		 * 
		 * Upon success, true will be returned. In case of failure, a string with details will be returned.
		 */
		setInfo(info: string): true | string;
	}

	interface Wallet {
		classID: "wallet";

		/**
		 * Publishes a purchase offer indicating the number of coins you wish to buy and the price ($) per unit you are willing to pay.
		 * 
		 * The purchase will be finalized if there is any sale offer with a price less than or equal to the one proposed in the purchase.
		 * 
		 * If there is no eligible offer to sell at that time, the offer to buy will remain publicly visible until a new offer to sell satisfies the requirements.
		 * 
		 * If the publication has been successful, true is returned. In case of error, a string with the details is returned.
		 */
		buyCoin(coinName: string, coinAmount: number, unitPrice: number, subwalletUser: string): true | string;

		/**
		 * Cancel any pending offer of a certain coin.
		 * 
		 * On success, an empty string will be returned. On failure, a string with an error message will be returned.
		 */
		cancelPendingTrade(coinName: string): string;
		
		/** Returns a number of coins of a given currency. In case of error, a string with the details is returned. */
		getBalance(coinName: string): number | string;

		/**
		 * Returns a record with all the offers made by any player of a given currency.
		 * 
		 * The key of the record represents the WalletID of the player who has made the offer, and the value of the record is an array where index 0 represents the type of offer with a string (Buy/Sell), index 1 represents the amount to sell or buy, and index 2 represents the price per unit.
		 * 
		 * In case of failure, this method returns a string with details.
		 */
		getGlobalOffers(coinName: string): string | Record<"Buy" | "Sell", [string, number, number]>;

		/**
		 * Returns an array with the pending sale or purchase offer of this wallet for a certain currency.
		 * 
		 * Index 0 of the array represents the type of offer with a string (Buy/Sell), index 1 represents the quantity to be sold or bought, and index 2 represents the price per unit.
		 * 
		 * On failure, this method will return a string with details.
		 */
		getPendingTrade(coinName: string): ["Buy" | "Sell", number, number] | string;

		/** Returns a string with a PIN that refreshes every few minutes. This PIN is used to obtain an account in cryptocurrency services. */
		getPin(): string;

		/**
		 * Returns a list where each item is a string with the names of the coins available in the wallet.
		 * 
		 * On failure this method returns a string with an error message.
		 */
		listCoins(): string[] | string;

		/**
		 * Returns a list where each item is a string containing the names of all the currencies that exist.
		 * 
		 * In case of failure, this method returns a string with details.
		 */
		listGlobalCoins(): string[] | string;

		/**
		 * Change the password of the wallet. Only the account owner can perform this action.
		 * 
		 * If the process is completed successfully, true will be returned. In case of an error, a string with details will be returned.
		 */
		resetPassword(newPassword: string): true | string;

		/**
		 * Publishes a sale offer indicating the amount of coins you want to sell and the price ($) per unit you want to assign.
		 * 
		 * The sale will be finalized if there is any purchase offer with a price greater than or equal to that proposed in the sale. If there is no existing offer to buy that matches the requirements at that time, the offer to sell will remain publicly visible until a new offer to buy satisfies the requirements.
		 * 
		 * If the publication has been successful, true is returned. In case of error, a string with the details is returned.
		 */
		sellCoin(coinName: string, coinAmount: number, unitPrice: number, subwalletUser: string): true | string;

		/**
		 * Returns a number representing the count of devices mining a specific coin for the same wallet.
		 * 
		 * In case of an error, a string with details is returned.
		 */
		showNodes(coinName: string): string | number;
	}
}