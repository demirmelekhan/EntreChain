#!/bin/bash

# EntreChain Deployment Script for Stellar Testnet
echo "🚀 Deploying EntreChain to Stellar Testnet..."

# Navigate to backend
cd backend

# Build optimized contract
echo "🔨 Building optimized contract..."
cargo build --target wasm32-unknown-unknown --release --quiet

# Check if build was successful
if [ ! -f "target/wasm32-unknown-unknown/release/entrechain_contract.wasm" ]; then
    echo "❌ Build failed - WASM file not found"
    exit 1
fi

# Deploy contract (you'll need to configure your Soroban identity first)
echo "📤 Deploying contract to testnet..."
CONTRACT_ADDRESS=$(soroban contract deploy \
    --wasm target/wasm32-unknown-unknown/release/entrechain_contract.wasm \
    --source alice \
    --network testnet)

if [ $? -eq 0 ]; then
    echo "✅ Contract deployed successfully!"
    echo "📋 Contract Address: $CONTRACT_ADDRESS"
    echo ""
    echo "📝 Next steps:"
    echo "1. Copy the contract address above"
    echo "2. Update frontend/.env.local with: NEXT_PUBLIC_CONTRACT_ADDRESS=$CONTRACT_ADDRESS"
    echo "3. Build and deploy your frontend"
else
    echo "❌ Deployment failed"
    echo "💡 Make sure you have:"
    echo "   - Configured Soroban identity (soroban keys generate alice)"
    echo "   - Funded your account with test XLM"
    echo "   - Connected to Stellar testnet"
fi
