// Shared utility functions for wallet management
// This is a client-safe version of the backend utils

interface WalletInfo {
  keyIdBase64: string;
  contractId: string;
}

// Client-side storage using localStorage (browser only)
export function storeUserWallet(keyIdBase64: string, contractId: string): void {
  if (typeof window === 'undefined') return; // Server-side safety
  
  const walletInfo: WalletInfo = { keyIdBase64, contractId };
  localStorage.setItem(`wallet_${keyIdBase64}`, JSON.stringify(walletInfo));
  console.log(`Stored wallet for key: ${keyIdBase64}`);
}

export function getUserWallet(keyIdBase64: string): WalletInfo | undefined {
  if (typeof window === 'undefined') return undefined; // Server-side safety
  
  const stored = localStorage.getItem(`wallet_${keyIdBase64}`);
  return stored ? JSON.parse(stored) : undefined;
}

export function clearUserWallet(keyIdBase64?: string): void {
  if (typeof window === 'undefined') return; // Server-side safety
  
  if (keyIdBase64) {
    localStorage.removeItem(`wallet_${keyIdBase64}`);
    console.log(`Cleared wallet for key: ${keyIdBase64}`);
  } else {
    // Clear all wallet keys
    const keys = Object.keys(localStorage).filter(key => key.startsWith('wallet_'));
    keys.forEach(key => localStorage.removeItem(key));
    console.log('Cleared all user wallets');
  }
}

export function getAllUserWallets(): WalletInfo[] {
  if (typeof window === 'undefined') return []; // Server-side safety
  
  const wallets: WalletInfo[] = [];
  const keys = Object.keys(localStorage).filter(key => key.startsWith('wallet_'));
  
  keys.forEach(key => {
    const stored = localStorage.getItem(key);
    if (stored) {
      wallets.push(JSON.parse(stored));
    }
  });
  
  return wallets;
}

// API wrapper functions for backend communication
export async function storeUserWalletAPI(keyIdBase64: string, contractId: string): Promise<boolean> {
  try {
    const response = await fetch('/api/wallet/store', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ keyIdBase64, contractId }),
    });
    
    return response.ok;
  } catch (error) {
    console.error('Failed to store wallet via API:', error);
    return false;
  }
}

export async function getUserWalletAPI(keyIdBase64: string): Promise<WalletInfo | undefined> {
  try {
    const response = await fetch(`/api/wallet/${keyIdBase64}`);
    
    if (response.ok) {
      return await response.json();
    }
    return undefined;
  } catch (error) {
    console.error('Failed to get wallet via API:', error);
    return undefined;
  }
}
