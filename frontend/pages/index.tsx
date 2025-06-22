'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { FreighterWallet, WalletState } from '../lib/wallet';

export default function HomePage() {
  const [walletState, setWalletState] = useState<WalletState | null>(null);
  const [isConnecting, setIsConnecting] = useState(false);
  const [error, setError] = useState<string>("");
  const router = useRouter();

  // Check if wallet is already connected on component mount
  useEffect(() => {    const stored = FreighterWallet.getStoredWallet();
    if (stored && stored.isConnected) {
      setWalletState(stored);
      // Auto redirect to projects page if already connected
      router.push('/projects');
    }
  }, [router]);

  const handleConnect = async () => {
    setIsConnecting(true);
    setError("");

    try {
      // Check if Freighter is installed
      const isInstalled = await FreighterWallet.isInstalled();
      if (!isInstalled) {
        setError("Please install Freighter Wallet extension to continue");
        return;
      }      // Connect to wallet
      const wallet = await FreighterWallet.connect();
      if (wallet) {
        setWalletState(wallet);
        console.log("Wallet connected:", wallet);
        
        // Redirect to projects page
        router.push('/projects');
      } else {
        setError("Failed to connect to wallet. Please try again.");
      }
    } catch (err) {
      setError("Connection failed. Please try again.");
      console.error("Connection error:", err);
    } finally {
      setIsConnecting(false);
    }
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center">
      <div className="max-w-md w-full mx-auto p-6">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-primary mb-2">
            🚀 EntreChain
          </h1>
          <p className="text-foreground text-lg">
            Empowering Ideas with Token-Based Funding
          </p>
          <p className="text-gray-600 mt-2">
            Connect your Freighter Wallet to start investing in entrepreneurial projects
          </p>
        </div>

        {/* Connection Card */}
        <div className="bg-white rounded-lg shadow-lg p-6 border border-gray-200">
          {/* Wallet Status */}
          {walletState ? (
            <div className="text-center">
              <div className="text-green-600 text-xl mb-2">✅</div>
              <h3 className="text-lg font-semibold text-foreground mb-2">
                Wallet Connected
              </h3>
              <p className="text-sm text-gray-600 break-all mb-4">
                {walletState.publicKey}
              </p>
              <p className="text-sm text-gray-500 mb-4">
                Network: {walletState.network}
              </p>
              <button
                onClick={() => router.push('/main')}
                className="w-full bg-primary text-white py-3 px-4 rounded-lg font-semibold hover:bg-orange-600 transition-colors"
              >
                Continue to Dashboard
              </button>
            </div>
          ) : (
            <div className="text-center">
              <div className="text-primary text-4xl mb-4">💼</div>
              <h3 className="text-xl font-semibold text-foreground mb-4">
                Connect Your Wallet
              </h3>
              
              {error && (
                <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-4">
                  {error}
                </div>
              )}

              <button
                onClick={handleConnect}
                disabled={isConnecting}
                className="w-full bg-primary text-white py-3 px-4 rounded-lg font-semibold hover:bg-orange-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isConnecting ? (
                  <span className="flex items-center justify-center">
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Connecting...
                  </span>
                ) : (
                  "🔗 Connect with Freighter"
                )}
              </button>

              <p className="text-xs text-gray-500 mt-4">
                Don't have Freighter? 
                <a 
                  href="https://freighter.app/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-primary hover:underline ml-1"
                >
                  Install it here
                </a>
              </p>
            </div>
          )}
        </div>

        {/* Features Preview */}
        <div className="mt-8 text-center">
          <h4 className="text-lg font-semibold text-foreground mb-4">
            What you can do:
          </h4>
          <div className="grid grid-cols-1 gap-3 text-sm">
            <div className="flex items-center justify-center space-x-2">
              <span className="text-primary">📊</span>
              <span>View investment dashboard</span>
            </div>
            <div className="flex items-center justify-center space-x-2">
              <span className="text-primary">💰</span>
              <span>Invest in startup projects</span>
            </div>
            <div className="flex items-center justify-center space-x-2">
              <span className="text-primary">🚀</span>
              <span>Track your investments</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
