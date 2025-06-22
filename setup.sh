#!/bin/bash

# EntreChain Development Setup Script
echo "🚀 Setting up EntreChain Development Environment..."

# Frontend setup
echo "📦 Installing frontend dependencies..."
cd frontend
npm install

# Backend setup
echo "🦀 Setting up Rust backend..."
cd ../backend

# Install Soroban if not already installed
if ! command -v soroban &> /dev/null; then
    echo "Installing Soroban CLI..."
    cargo install --locked soroban-cli
fi

# Build the contract
echo "🔨 Building smart contract..."
cargo build --target wasm32-unknown-unknown --release

# Run tests
echo "🧪 Running contract tests..."
cargo test

echo "✅ Setup complete!"
echo ""
echo "To start development:"
echo "1. cd frontend && npm run dev (start frontend)"
echo "2. Deploy contract to testnet when ready"
echo "3. Update NEXT_PUBLIC_CONTRACT_ADDRESS in .env.local"
