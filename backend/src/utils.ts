// Backend utility functions for wallet management

interface WalletInfo {
  keyIdBase64: string;
  contractId: string;
}

// In-memory storage for demonstration (in production, use a database)
const userWallets = new Map<string, WalletInfo>();

export function storeUserWallet(keyIdBase64: string, contractId: string): void {
  const walletInfo: WalletInfo = { keyIdBase64, contractId };
  userWallets.set(keyIdBase64, walletInfo);
  console.log(`Stored wallet for key: ${keyIdBase64}`);
}

export function getUserWallet(keyIdBase64: string): WalletInfo | undefined {
  return userWallets.get(keyIdBase64);
}

export function clearUserWallet(keyIdBase64?: string): void {
  if (keyIdBase64) {
    userWallets.delete(keyIdBase64);
    console.log(`Cleared wallet for key: ${keyIdBase64}`);
  } else {
    userWallets.clear();
    console.log('Cleared all user wallets');
  }
}

export function getAllUserWallets(): WalletInfo[] {
  return Array.from(userWallets.values());
}
