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

/**
 * API wrapper functions for easier client-side access to our backend endpoints
 */

/**
 * A wrapper function so it's easier for our client-side code to access the
 * `/api/send` endpoint we have created.
 *
 * @param xdr - The base64-encoded, signed transaction. This transaction
 * **must** contain a Soroban operation
 * @returns JSON object containing the RPC's response
 */
export async function send(xdr: string) {
  return fetch("/api/send", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      xdr,
    }),
  }).then(async (res) => {
    if (res.ok) return res.json();
    else throw await res.text();
  });
}

/**
 * A wrapper function so it's easier for our client-side code to access the
 * `/api/contract/[signer]` endpoint we have created.
 *
 * @param signer - The passkey ID we want to find an associated smart wallet for
 * @returns The contract address to which the specified signer has been added
 */
export async function getContractId(signer: string) {
  return fetch(`/api/contract/${signer}`).then(async (res) => {
    if (res.ok) return res.text();
    else throw await res.text();
  });
}

/**
 * A wrapper function so it's easier for our client-side code to access the
 * `/api/fund/[address]` endpoint we have created.
 *
 * @param address - The contract address to fund on the Testnet
 */
export async function fundContract(address: string) {
  return fetch(`/api/fund/${address}`).then(async (res) => {
    if (res.ok) return res.json();
    else throw await res.text();
  });
}