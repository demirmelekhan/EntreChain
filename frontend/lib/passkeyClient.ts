import { PasskeyKit, SACClient } from "passkey-kit";
import { Server } from "@stellar/stellar-sdk/rpc";

// Environment variables for Next.js
const STELLAR_RPC_URL = process.env.NEXT_PUBLIC_STELLAR_RPC_URL || "https://soroban-testnet.stellar.org";
const STELLAR_NETWORK_PASSPHRASE = process.env.NEXT_PUBLIC_STELLAR_NETWORK_PASSPHRASE || "Test SDF Network ; September 2015";
const WALLET_WASM_HASH = process.env.NEXT_PUBLIC_WALLET_WASM_HASH || "";
const NATIVE_CONTRACT_ADDRESS = process.env.NEXT_PUBLIC_NATIVE_CONTRACT_ADDRESS || "";

/**
 * A configured PasskeyKit instance for managing passkey-based transactions
 */
export const account = new PasskeyKit({
  rpcUrl: STELLAR_RPC_URL,
  networkPassphrase: STELLAR_NETWORK_PASSPHRASE,
  walletWasmHash: WALLET_WASM_HASH,
  timeoutInSeconds: 30, // Optional timeout for requests
});

/**
 * A configured Stellar RPC server instance used to interact with the network
 */
export const rpc = new Server(STELLAR_RPC_URL);

/**
 * A client allowing us to easily create SAC clients for any asset on the
 * network.
 */
const sac = new SACClient({
  rpcUrl: STELLAR_RPC_URL,
  networkPassphrase: STELLAR_NETWORK_PASSPHRASE,
});

/**
 * A SAC client for the native XLM asset.
 */
export const native = sac.getSACClient(NATIVE_CONTRACT_ADDRESS);