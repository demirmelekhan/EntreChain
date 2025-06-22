// Freighter Wallet Connection Utilities
import * as freighterApi from "@stellar/freighter-api";

export interface WalletState {
  isConnected: boolean;
  publicKey: string;
  network: string;
}

export class FreighterWallet {  // Check if Freighter wallet is installed
  static async isInstalled(): Promise<boolean> {
    try {
      const result = await freighterApi.isConnected();
      return result;
    } catch (error) {
      console.error("Freighter not installed:", error);
      return false;
    }
  }

  // Connect to wallet and request access
  static async connect(): Promise<WalletState | null> {
    try {
      // First check if Freighter is installed
      const installed = await this.isInstalled();
      if (!installed) {
        throw new Error("Freighter wallet is not installed");
      }      // Request access to wallet
      const address = await freighterApi.requestAccess();
      if (!address) {
        throw new Error("Failed to get wallet address");
      }

      // Get network information
      const network = await freighterApi.getNetwork();      const walletState: WalletState = {
        isConnected: true,
        publicKey: address,
        network: network || "TESTNET"
      };

      // Save to localStorage
      localStorage.setItem("wallet", JSON.stringify(walletState));
      
      return walletState;
    } catch (error) {
      console.error("Wallet connection failed:", error);
      return null;
    }
  }

  // Get current wallet state from localStorage
  static getStoredWallet(): WalletState | null {
    try {
      const stored = localStorage.getItem("wallet");
      return stored ? JSON.parse(stored) : null;
    } catch (error) {
      console.error("Failed to get stored wallet:", error);
      return null;
    }
  }

  // Disconnect wallet
  static disconnect(): void {
    localStorage.removeItem("wallet");
  }
  // Sign transaction with Freighter
  static async signTransaction(xdr: string, publicKey: string): Promise<string | null> {
    try {
      const result = await freighterApi.signTransaction(xdr, {
        network: "TESTNET",
        accountToSign: publicKey,
      });
      return result;
    } catch (error) {
      console.error("Transaction signing failed:", error);
      return null;
    }
  }
}
