'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { FreighterWallet, WalletState } from '../lib/wallet';
import { StellarContract } from '../lib/contract';

// Project interface
interface Project {
  id: string;
  title: string;
  description: string;
  ownerAddress: string;
  targetAmount: number;
  currentAmount: number;
  category: string;
  createdAt: string;
  imageUrl?: string;
}

// Example projects with the provided public keys
const EXAMPLE_PROJECTS: Project[] = [
  {
    id: "1",
    title: "GreenTech Solar Panel Innovation",
    description: "Revolutionary solar panel technology that increases efficiency by 40% while reducing manufacturing costs. Our patented nano-coating technology allows for better light absorption and weather resistance.",
    ownerAddress: "GAYEVLJWNKMKXJWVBGBTGISI6JLVSJDM4UK224VN24U2IZ5YURXXQJUM",
    targetAmount: 50000,
    currentAmount: 12500,
    category: "Clean Energy",
    createdAt: "2024-11-15",
    imageUrl: "https://images.unsplash.com/photo-1509391366360-2e959784a276?w=400&h=300&fit=crop"
  },
  {
    id: "2", 
    title: "AI-Powered Healthcare Diagnostics",
    description: "Machine learning platform that can diagnose rare diseases 10x faster than traditional methods. Our AI model has been trained on over 1 million medical cases and shows 95% accuracy in early detection.",
    ownerAddress: "GD7HCHCYMGK6SWPNAVOSXOYZFUK7F2JWC5DYIJBIJOUVBB6XJSO2GY2Q",
    targetAmount: 100000,
    currentAmount: 35000,
    category: "Healthcare",
    createdAt: "2024-11-20",
    imageUrl: "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=400&h=300&fit=crop"
  },  {
    id: "3",
    title: "Sustainable Food Packaging Solutions",
    description: "Biodegradable packaging made from agricultural waste that decomposes in 30 days. Our innovative process converts rice husks and wheat straw into durable, waterproof packaging material.",
    ownerAddress: "GDII2D6NPJKWM5WQEZVPILGSAR3QYJPXQB7OROILL7XSNIO6FP3EXO2F",
    targetAmount: 25000,
    currentAmount: 8750,
    category: "Sustainability",
    createdAt: "2024-11-25",
    imageUrl: "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=400&h=300&fit=crop"
  }
];

export default function ProjectsPage() {
  const [walletState, setWalletState] = useState<WalletState | null>(null);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [investmentAmount, setInvestmentAmount] = useState('');
  const [isInvesting, setIsInvesting] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [showInvestModal, setShowInvestModal] = useState(false);
  const router = useRouter();

  // Load wallet state on component mount
  useEffect(() => {
    const stored = FreighterWallet.getStoredWallet();
    if (!stored || !stored.isConnected) {
      router.push('/');
      return;
    }
    setWalletState(stored);
  }, [router]);

  const handleDisconnect = () => {
    FreighterWallet.disconnect();
    setWalletState(null);
    router.push('/');
  };

  const handleSelectProject = (project: Project) => {
    setSelectedProject(project);
    setShowInvestModal(true);
    setError('');
    setSuccess('');
    setInvestmentAmount('');
  };

  const handleCloseModal = () => {
    setShowInvestModal(false);
    setSelectedProject(null);
    setInvestmentAmount('');
    setError('');
    setSuccess('');
  };

  const handleInvest = async () => {
    if (!walletState || !selectedProject) return;

    const amount = parseFloat(investmentAmount);
    if (isNaN(amount) || amount <= 0) {
      setError('Please enter a valid investment amount');
      return;
    }

    setIsInvesting(true);
    setError('');
    setSuccess('');

    try {      const success = await StellarContract.invest(
        walletState.publicKey,
        selectedProject.ownerAddress,
        amount,
        FreighterWallet.signTransaction
      );

      if (success) {
        setSuccess(`Successfully invested ${amount} XLM in ${selectedProject.title}!`);
        setInvestmentAmount('');
        // Close modal after successful investment
        setTimeout(() => {
          handleCloseModal();
        }, 2000);
      } else {
        setError('Investment failed. Please try again.');
      }
    } catch (err) {
      setError('Investment failed. Please check your wallet and try again.');
      console.error('Investment error:', err);
    } finally {
      setIsInvesting(false);
    }
  };

  const formatAddress = (address: string) => {
    return `${address.slice(0, 6)}...${address.slice(-6)}`;
  };

  const calculateProgress = (current: number, target: number) => {
    return Math.min((current / target) * 100, 100);
  };

  if (!walletState) {
    return <div className="flex justify-center items-center min-h-screen">Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Header */}
      <header className="bg-white shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div className="flex items-center">
              <h1 className="text-3xl font-bold text-gray-900">🚀 EntreChain</h1>
              <span className="ml-4 text-lg text-gray-600">Projects</span>
            </div>            <div className="flex items-center space-x-4">
              <div className="text-right">
                <p className="text-sm text-gray-600">Connected Wallet</p>
                <p className="text-sm font-mono text-gray-800">
                  {formatAddress(walletState.publicKey)}
                </p>
              </div>
              <button
                onClick={() => router.push('/main')}
                className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-medium"
              >
                📊 Entering Key
              </button>
              <button
                onClick={handleDisconnect}
                className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
              >
                Disconnect
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            Discover Innovative Projects
          </h2>
          <p className="text-gray-600">
            Support entrepreneurs and their groundbreaking ideas with your investment
          </p>
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {EXAMPLE_PROJECTS.map((project) => (
            <div
              key={project.id}
              className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow"
            >
              {/* Project Image */}
              <div className="h-48 bg-gradient-to-r from-blue-400 to-purple-500 relative">
                {project.imageUrl && (
                  <img
                    src={project.imageUrl}
                    alt={project.title}
                    className="w-full h-full object-cover"
                  />
                )}
                <div className="absolute top-4 left-4">
                  <span className="px-3 py-1 bg-white bg-opacity-90 text-sm font-medium text-gray-700 rounded-full">
                    {project.category}
                  </span>
                </div>
              </div>

              {/* Project Content */}
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-2">
                  {project.title}
                </h3>
                <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                  {project.description}
                </p>

                {/* Project Owner */}
                <div className="mb-4">
                  <p className="text-xs text-gray-500 mb-1">Project Owner</p>
                  <p className="text-sm font-mono text-gray-700">
                    {formatAddress(project.ownerAddress)}
                  </p>
                </div>

                {/* Funding Progress */}
                <div className="mb-4">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm font-medium text-gray-700">
                      Progress
                    </span>
                    <span className="text-sm text-gray-500">
                      {calculateProgress(project.currentAmount, project.targetAmount).toFixed(1)}%
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-blue-600 h-2 rounded-full transition-all"
                      style={{
                        width: `${calculateProgress(project.currentAmount, project.targetAmount)}%`
                      }}
                    ></div>
                  </div>
                  <div className="flex justify-between items-center mt-2">
                    <span className="text-sm text-gray-600">
                      {project.currentAmount.toLocaleString()} XLM raised
                    </span>
                    <span className="text-sm font-medium text-gray-900">
                      {project.targetAmount.toLocaleString()} XLM goal
                    </span>
                  </div>
                </div>

                {/* Invest Button */}
                <button
                  onClick={() => handleSelectProject(project)}
                  className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg font-medium hover:bg-blue-700 transition-colors"
                >
                  Invest in Project
                </button>
              </div>
            </div>
          ))}
        </div>
      </main>

      {/* Investment Modal */}
      {showInvestModal && selectedProject && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-8 max-w-md w-full mx-4">
            <div className="mb-6">
              <h3 className="text-2xl font-bold text-gray-900 mb-2">
                Invest in Project
              </h3>
              <h4 className="text-lg font-medium text-gray-700 mb-4">
                {selectedProject.title}
              </h4>
              <div className="bg-gray-50 p-4 rounded-lg">
                <p className="text-sm text-gray-600 mb-2">Project Owner</p>
                <p className="text-sm font-mono text-gray-800">
                  {selectedProject.ownerAddress}
                </p>
              </div>
            </div>

            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Investment Amount (XLM)
              </label>
              <input
                type="number"
                value={investmentAmount}
                onChange={(e) => setInvestmentAmount(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Enter amount in XLM"
                min="0"
                step="0.1"
              />
            </div>

            {error && (
              <div className="mb-4 p-3 bg-red-100 border border-red-300 text-red-700 rounded-lg">
                {error}
              </div>
            )}

            {success && (
              <div className="mb-4 p-3 bg-green-100 border border-green-300 text-green-700 rounded-lg">
                {success}
              </div>
            )}

            <div className="flex space-x-4">
              <button
                onClick={handleCloseModal}
                className="flex-1 px-4 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                disabled={isInvesting}
              >
                Cancel
              </button>
              <button
                onClick={handleInvest}
                disabled={isInvesting || !investmentAmount}
                className="flex-1 px-4 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed"
              >
                {isInvesting ? 'Processing...' : 'Invest Now'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
