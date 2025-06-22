import { PasskeyServer } from "passkey-kit";
import { storeUserWallet, clearUserWallet } from "./utils";
import * as dotenv from "dotenv";

// Load environment variables
dotenv.config();

// Environment variables for Node.js backend
const STELLAR_RPC_URL = process.env.STELLAR_RPC_URL || "https://soroban-testnet.stellar.org";
const LAUNCHTUBE_URL = process.env.LAUNCHTUBE_URL || "";
const LAUNCHTUBE_JWT = process.env.LAUNCHTUBE_JWT || "";
const MERCURY_URL = process.env.MERCURY_URL || "";
const MERCURY_JWT = process.env.MERCURY_JWT || "";

/**
 * PasskeyServer instance for server-side operations
 */
export const server = new PasskeyServer({
  rpcUrl: STELLAR_RPC_URL,
  launchtubeUrl: LAUNCHTUBE_URL,
  launchtubeJwt: LAUNCHTUBE_JWT,
  mercuryUrl: MERCURY_URL,
  mercuryJwt: MERCURY_JWT,
  // mercuryKey: process.env.MERCURY_KEY, // optionally
});

/**
 * Server-side login function
 * Note: This should be called from a client-side context, not server-side
 */
export async function handleLogin(walletData: { keyIdBase64: string; contractId: string }) {
  try {
    storeUserWallet(walletData.keyIdBase64, walletData.contractId);
    return { success: true, message: "Wallet stored successfully" };
  } catch (error) {
    console.error("Login error:", error);
    return { success: false, message: "Failed to store wallet" };
  }
}

/**
 * Server-side logout function
 */
export async function handleLogout(keyIdBase64?: string) {
  try {
    clearUserWallet(keyIdBase64);
    return { success: true, message: "User logged out successfully" };
  } catch (error) {
    console.error("Logout error:", error);
    return { success: false, message: "Failed to logout user" };
  }
}