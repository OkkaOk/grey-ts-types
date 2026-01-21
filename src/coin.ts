declare namespace GreyHack {
	interface Coin {
		classID: "coin";
		createSubWallet(walletID: string, pin: string, subwalletUser: string, subwalletPassword: string): string | true | null;
		getAddress(): string;
		getCycleMining(): number | string;
		getMinedCoins(): number | string;
		getReward(): number | string;
		getSubwallet(subwalletUser: string): SubWallet | string | null;
		getSubwallets(): SubWallet[] | string;
		resetPassword(newPassword: string): true | string;
		setAddress(address: string): true | string | null;
		setCycleMining(rateHours: number): true | string | null;
		setReward(coinAmount: number): true | string | null;
		transaction(subwalletFrom: string, subwalletTo: string, amount: number): true | string | null;
	}

	interface SubWallet {
		classID: "subwallet";
		walletUsername(): string;
		checkPassword(password: string): true | string;
		delete(): boolean | string;
		getBalance(): number | string;
		getInfo(): string;
		getUser(): string;
		lastTransaction(): [string, number, 0 | 1, string] | false | string;
		mining(): true | string;
		setInfo(info: string): true | string;
	}

	interface Wallet {
		classID: "wallet";
		buyCoin(coinName: string, coinAmount: number, unitPrice: number, subwalletUser: string): true | string;
		cancelPendingTrade(coinName: string): string | null;
		getBalance(coinName: string): number | string | null;
		getGlobalOffers(coinName: string): string | Record<string, [string, number, number]> | null;
		getPendingTrade(coinName: string): string | Record<string, [string, number, number]> | null;
		getPin(): string;
		listCoins(): string[] | string;
		listGlobalCoins(): string[] | string;
		resetPassword(newPassword: string): true | string | null;
		sellCoin(coinName: string, coinAmount: number, unitPrice: number, subwalletUser: string): true | string;
		showNodes(coinName: string): string | number | null;
	}
}