'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { FreighterWallet, WalletState } from '../lib/wallet';
import { StellarContract } from '../lib/contract';

export default function MainPage() {
  const [walletState, setWalletState] = useState<WalletState | null>(null);
  const [projectIdea, setProjectIdea] = useState('');
  const [investmentAmount, setInvestmentAmount] = useState('');
  const [projectOwnerAddress, setProjectOwnerAddress] = useState('');
  const [isInvesting, setIsInvesting] = useState(false);
  const [totalInvested, setTotalInvested] = useState(0);
  const [lastInvestor, setLastInvestor] = useState('');
  const [projectTokens, setProjectTokens] = useState(0);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const router = useRouter();

  // Load wallet state and investment data on component mount
  useEffect(() => {
    const stored = FreighterWallet.getStoredWallet();
    if (!stored || !stored.isConnected) {
      // Redirect to home if not connected
      router.push('/');
      return;
    }
    setWalletState(stored);
    loadInvestmentData();
  }, [router]);

  const loadInvestmentData = async () => {
    try {
      const total = await StellarContract.getTotalInvested();
      const investor = await StellarContract.getLastInvestor();
      const tokens = await StellarContract.getProjectTokens();
      
      setTotalInvested(total);
      setLastInvestor(investor);
      setProjectTokens(tokens);
    } catch (error) {
      console.error('Failed to load investment data:', error);
    }
  };

  const handleDisconnect = () => {
    FreighterWallet.disconnect();
    setWalletState(null);
    router.push('/');
  };

  const handleInvest = async () => {
    if (!walletState || !projectOwnerAddress || !investmentAmount) {
      setError('Please fill in all fields');
      return;
    }

    if (parseFloat(investmentAmount) <= 0) {
      setError('Investment amount must be greater than 0');
      return;
    }

    setIsInvesting(true);
    setError('');
    setSuccess('');

    try {
      const success = await StellarContract.invest(
        walletState.publicKey,
        projectOwnerAddress,
        parseFloat(investmentAmount),
        FreighterWallet.signTransaction
      );

      if (success) {
        setSuccess('Investment successful! 🎉');
        
        // Update local data
        const newTotal = totalInvested + parseFloat(investmentAmount);
        const newTokens = projectTokens + Math.floor(parseFloat(investmentAmount) * 10); // 10 tokens per XLM
        
        StellarContract.updateInvestmentData(newTotal, walletState.publicKey, newTokens);
        
        // Refresh display data
        setTotalInvested(newTotal);
        setLastInvestor(walletState.publicKey);
        setProjectTokens(newTokens);
        
        // Clear form
        setInvestmentAmount('');
        setProjectOwnerAddress('');
      } else {
        setError('Investment failed. Please try again.');
      }
    } catch (error) {
      setError('Investment failed. Please check your wallet and try again.');
      console.error('Investment error:', error);
    } finally {
      setIsInvesting(false);
    }
  };

  if (!walletState) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p>Loading wallet...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-3">
              <h1 className="text-2xl font-bold text-primary">🚀 EntreChain</h1>
              <span className="text-sm text-gray-500">Investment Dashboard</span>
            </div>            <div className="flex items-center space-x-4">
              <button
                onClick={() => router.push('/projects')}
                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md text-sm transition-colors"
              >
                ← Back to Projects
              </button>
              <div className="text-sm text-gray-600">
                <span className="font-medium">Connected:</span> 
                <span className="ml-1 font-mono text-xs">
                  {walletState.publicKey.slice(0, 8)}...{walletState.publicKey.slice(-8)}
                </span>
              </div>
              <button
                onClick={handleDisconnect}
                className="bg-gray-100 hover:bg-gray-200 text-gray-700 px-3 py-1 rounded-md text-sm transition-colors"
              >
                Disconnect
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          
          {/* Investment Form */}
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h2 className="text-xl font-semibold text-foreground mb-6 flex items-center">
              💰 Invest in Projects
            </h2>

            {error && (
              <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-4">
                {error}
              </div>
            )}

            {success && (
              <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-lg mb-4">
                {success}
              </div>
            )}

            <div className="space-y-4">
              {/* Project Idea Input */}
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  🚀 Startup Project Idea
                </label>
                <input
                  type="text"
                  value={projectIdea}
                  onChange={(e) => setProjectIdea(e.target.value)}
                  placeholder="e.g., Solar-Powered Street Vendor Carts"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                />
                <p className="text-xs text-gray-500 mt-1">Describe the startup idea you want to support</p>
              </div>

              {/* Project Owner Address */}
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  📬 Project Owner Wallet Address
                </label>
                <input
                  type="text"
                  value={projectOwnerAddress}
                  onChange={(e) => setProjectOwnerAddress(e.target.value)}
                  placeholder="GXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent font-mono text-sm"
                />
                <p className="text-xs text-gray-500 mt-1">Stellar public key of the entrepreneur</p>
              </div>

              {/* Investment Amount */}
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  💎 Investment Amount (XLM)
                </label>
                <input
                  type="number"
                  step="0.1"
                  min="0.1"
                  value={investmentAmount}
                  onChange={(e) => setInvestmentAmount(e.target.value)}
                  placeholder="10.0"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                />
                <p className="text-xs text-gray-500 mt-1">
                  Minimum: 0.1 XLM • You'll receive {investmentAmount ? Math.floor(parseFloat(investmentAmount) * 10) : 0} project tokens
                </p>
              </div>

              {/* Invest Button */}
              <button
                onClick={handleInvest}
                disabled={isInvesting || !projectOwnerAddress || !investmentAmount}
                className="w-full bg-primary text-white py-3 px-4 rounded-lg font-semibold hover:bg-orange-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isInvesting ? (
                  <span className="flex items-center justify-center">
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Processing Investment...
                  </span>
                ) : (
                  "🚀 Invest in Project"
                )}
              </button>
            </div>
          </div>

          {/* Investment Stats */}
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h2 className="text-xl font-semibold text-foreground mb-6 flex items-center">
              📊 Investment Overview
            </h2>

            <div className="space-y-6">
              {/* Stats Cards */}
              <div className="grid grid-cols-1 gap-4">
                <div className="bg-primary/10 rounded-lg p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-600">Total Invested</p>
                      <p className="text-2xl font-bold text-primary">{totalInvested} XLM</p>
                    </div>
                    <div className="text-primary text-2xl">💰</div>
                  </div>
                </div>

                <div className="bg-secondary/20 rounded-lg p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-600">Project Tokens Earned</p>
                      <p className="text-2xl font-bold text-accent">{projectTokens} TOKENS</p>
                    </div>
                    <div className="text-accent text-2xl">🎯</div>
                  </div>
                </div>

                <div className="bg-gray-50 rounded-lg p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-600">Last Investor</p>
                      <p className="text-sm font-mono text-gray-800 break-all">
                        {lastInvestor === 'No investors yet' ? lastInvestor : 
                         `${lastInvestor.slice(0, 12)}...${lastInvestor.slice(-12)}`}
                      </p>
                    </div>
                    <div className="text-gray-600 text-2xl">👤</div>
                  </div>
                </div>
              </div>

              {/* Project Status */}
              <div className="border-t pt-6">
                <h3 className="text-lg font-semibold text-foreground mb-4">Current Project Status</h3>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Target Funding Goal</span>
                    <span className="font-semibold">1000 XLM</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Current Progress</span>
                    <span className="font-semibold">{((totalInvested / 1000) * 100).toFixed(1)}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-primary h-2 rounded-full transition-all duration-300"
                      style={{ width: `${Math.min((totalInvested / 1000) * 100, 100)}%` }}
                    ></div>
                  </div>
                  <p className="text-xs text-gray-500">
                    {1000 - totalInvested > 0 ? `${1000 - totalInvested} XLM remaining to reach goal` : 'Goal reached! 🎉'}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>        {/* Instructions */}
        <div className="mt-8 bg-blue-50 border border-blue-200 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-blue-900 mb-3">💡 How it works</h3>
          
          {/* New Feature Alert */}
          <div className="mb-4 bg-green-50 border border-green-200 rounded-lg p-4">
            <div className="flex items-center space-x-2 mb-2">
              <span className="text-green-600">🆕</span>
              <p className="font-medium text-green-900">New Feature: Browse Projects</p>
            </div>
            <p className="text-sm text-green-800">
              You can now browse existing projects with detailed information and invest directly! 
              Click the "Browse Projects" button above to see available opportunities.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm text-blue-800">
            <div className="flex items-start space-x-2">
              <span className="text-blue-600">1️⃣</span>
              <div>
                <p className="font-medium">Choose a Project</p>
                <p>Browse projects or enter a startup idea manually</p>
              </div>
            </div>
            <div className="flex items-start space-x-2">
              <span className="text-blue-600">2️⃣</span>
              <div>
                <p className="font-medium">Set Investment</p>
                <p>Select from project list or enter wallet address manually</p>
              </div>
            </div>
            <div className="flex items-start space-x-2">
              <span className="text-blue-600">3️⃣</span>
              <div>
                <p className="font-medium">Earn Tokens</p>
                <p>Receive project tokens representing your ownership</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
