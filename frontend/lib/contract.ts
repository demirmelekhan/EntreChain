// Stellar SDK and Contract Interaction
import * as StellarSdk from "@stellar/stellar-sdk";

// Contract address - will be set after deployment
const CONTRACT_ADDRESS = typeof process !== 'undefined' 
  ? process.env.NEXT_PUBLIC_CONTRACT_ADDRESS || "your-contract-address-here"
  : "your-contract-address-here";

// Create server instance when needed
function getServer() {
  return new StellarSdk.Horizon.Server("https://horizon-testnet.stellar.org");
}

export interface InvestmentData {
  totalInvested: number;
  lastInvestor: string;
  projectOwner: string;
  projectTokens: number;
}

export class StellarContract {
  
  // Call contract function: invest
  static async invest(
    publicKey: string, 
    projectOwnerAddress: string, 
    amount: number,
    signTransaction: (xdr: string, publicKey: string) => Promise<string | null>
  ): Promise<boolean> {    try {
      const server = getServer();
      // Load account
      const account = await server.loadAccount(publicKey);
      
      // Build transaction to call invest function
      const transaction = new StellarSdk.TransactionBuilder(account, {
        fee: "10000",
        networkPassphrase: StellarSdk.Networks.TESTNET,
      })
      .addOperation(
        StellarSdk.Operation.payment({
          destination: projectOwnerAddress,
          asset: StellarSdk.Asset.native(),
          amount: amount.toString(),
        })
      )
      .setTimeout(180)
      .build();

      // Sign transaction with Freighter
      const signedXdr = await signTransaction(transaction.toXDR(), publicKey);
      if (!signedXdr) {
        throw new Error("Transaction signing failed");
      }      // Submit transaction
      const signedTx = StellarSdk.TransactionBuilder.fromXDR(signedXdr, StellarSdk.Networks.TESTNET);
      const result = await server.submitTransaction(signedTx);
      
      console.log("Investment successful:", result);
      
      // Update mock data for now
      const currentTotal = await StellarContract.getTotalInvested();
      const newTotal = currentTotal + amount;
      const tokens = Math.floor(amount / 0.1); // 1 token per 0.1 XLM
      
      StellarContract.updateInvestmentData(newTotal, publicKey, tokens);
      
      return true;
    } catch (error) {
      console.error("Investment failed:", error);
      return false;
    }
  }

  // Mock functions for contract calls (replace with actual Soroban calls)
  static async getTotalInvested(): Promise<number> {
    // This would call the actual contract function
    // For now, return mock data
    try {
      const stored = localStorage.getItem("totalInvested");
      return stored ? parseInt(stored) : 0;
    } catch {
      return 0;
    }
  }

  static async getLastInvestor(): Promise<string> {
    // This would call the actual contract function
    try {
      const stored = localStorage.getItem("lastInvestor");
      return stored || "No investors yet";
    } catch {
      return "No investors yet";
    }
  }

  static async getProjectTokens(): Promise<number> {
    // This would call the actual contract function
    try {
      const stored = localStorage.getItem("projectTokens");
      return stored ? parseInt(stored) : 0;
    } catch {
      return 0;
    }
  }

  // Update local storage for mock data
  static updateInvestmentData(totalInvested: number, lastInvestor: string, projectTokens: number) {
    try {
      localStorage.setItem("totalInvested", totalInvested.toString());
      localStorage.setItem("lastInvestor", lastInvestor);
      localStorage.setItem("projectTokens", projectTokens.toString());
    } catch (error) {
      console.error("Failed to update investment data:", error);
    }
  }

  // Get contract address
  static getContractAddress(): string {
    return CONTRACT_ADDRESS;
  }
}

export default StellarContract;
