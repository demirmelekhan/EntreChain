# 🚀 EntreChain - Startup Investment dApp

A minimal decentralized application for startup investment on Stellar Soroban, built with Next.js and Rust.

## 🌟 Features

- **Freighter Wallet Integration**: Connect with Freighter wallet using PassKey technology
- **Investment Dashboard**: Track your investments and project tokens
- **Startup Project Support**: Invest in entrepreneurial ideas with XLM
- **Token Rewards**: Earn project tokens representing ownership stakes
- **Real-time Updates**: See total investments and latest investor activity

## 🏗️ Architecture

### Frontend (Next.js + TypeScript + Tailwind CSS)
- **Wallet Connection**: Freighter API integration
- **Investment UI**: Clean interface for project investment
- **Real-time Stats**: Investment tracking and progress monitoring

### Backend (Rust + Soroban)
- **Smart Contract**: Investment logic and state management
- **Persistent Storage**: Track investments, investors, and tokens
- **Token Distribution**: Automated token rewards for investors

## 🚀 Quick Start

### Prerequisites
- Node.js 18+
- Rust 1.70+
- Soroban CLI
- Freighter Wallet Extension

### Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

The app will be available at `http://localhost:3000`

### Backend Setup

```bash
cd backend
cargo build --target wasm32-unknown-unknown --release
soroban contract deploy --wasm target/wasm32-unknown-unknown/release/entrechain_contract.wasm --source alice --network testnet
```

### Environment Setup

Create `.env.local` in frontend directory:
```
NEXT_PUBLIC_CONTRACT_ADDRESS=your_deployed_contract_address
```

## 🎯 How It Works

### Investment Flow
1. **Connect Wallet**: Users connect their Freighter wallet
2. **Choose Project**: Enter startup idea and project owner address
3. **Invest**: Send XLM to support the entrepreneurial project
4. **Earn Tokens**: Receive project tokens (10 tokens per 1 XLM)
5. **Track Progress**: Monitor total investments and funding goals

### Smart Contract Functions
- `invest(investor, project_owner, amount)` - Process investment
- `get_total_invested()` - Get total platform investments
- `get_last_investor()` - Get most recent investor
- `send_token_project()` - Get total project tokens distributed
- `project(owner, target)` - Submit new project (placeholder)

## 🔧 Development

### Run Tests
```bash
cd backend
cargo test
```

### Build for Production
```bash
cd frontend
npm run build
npm start
```

## 📱 Pages

- **/** - Wallet connection page
- **/main** - Investment dashboard and project funding interface

## 🎨 Design System

Based on PDR-FRONTEND-TEMP.md specifications:

### Colors
- Primary: `#ff6f00` (Orange)
- Secondary: `#ffd180` (Light Orange)
- Accent: `#FF0059` (Pink)
- Background: `#fefcfb` (Light Gray)
- Foreground: `#212121` (Dark Gray)

### Typography
- Modern, clean fonts (Inter, Roboto)
- Warm and professional tone
- Entrepreneur-focused terminology

## 🔐 Security

- Wallet authorization required for all transactions
- Persistent storage for investment tracking
- No complex access control (minimal viable product)

## 🌐 Deployment

### Frontend (Vercel/Netlify)
```bash
npm run build
# Deploy build folder
```

### Backend (Stellar Testnet)
```bash
soroban contract deploy --wasm target/wasm32-unknown-unknown/release/entrechain_contract.wasm --network testnet
```

## 📄 License

MIT License - Feel free to use this code for your own projects.

---

**🚀💡 Building Bridges Between Entrepreneurs and Backers via Blockchain 💡🚀**

*"Empowering real-world ideas with decentralized trust."*

## Deploy
PS D:\github\Egitim-WEB3\Rust-Stellar\entrechain-v2\backend> cd d:\github\Egitim-WEB3\Rust-Stellar\entrechain-v2\backend;
 soroban contract deploy --wasm target/wasm32v1-none/release/entrechain_contract.wasm --source melek --network testnet   
ℹ️  Simulating install transaction…
ℹ️  Signing transaction: 675ca0e638d028532524d50474fdd398d5edb3136d137041b3b023320c942f48
🌎 Submitting install transaction…
ℹ️  Using wasm hash 425780a03d177e5b6f8996b5d7a6691d22621ff9bc79ea9f4767c1cdc6b7e500
ℹ️  Simulating deploy transaction…
ℹ️  Transaction hash is 0b01053f77bca6f7df44320b9c44f6f6cbc7fde4690c2a2f642caf52eba0edcc
🔗 https://stellar.expert/explorer/testnet/tx/0b01053f77bca6f7df44320b9c44f6f6cbc7fde4690c2a2f642caf52eba0edcc
ℹ️  Signing transaction: 0b01053f77bca6f7df44320b9c44f6f6cbc7fde4690c2a2f642caf52eba0edcc
🌎 Submitting deploy transaction…
🔗 https://stellar.expert/explorer/testnet/contract/CDJMJTTMGMBTJH6UYQPOUB5HWOLVSNLGN23DCRCVVGEEATRAKJGQYMTC
✅ Deployed!
CDJMJTTMGMBTJH6UYQPOUB5HWOLVSNLGN23DCRCVVGEEATRAKJGQYMTC

https://stellar.expert/explorer/testnet/contract/CDJMJTTMGMBTJH6UYQPOUB5HWOLVSNLGN23DCRCVVGEEATRAKJGQYMTC

https://stellar.expert/explorer/testnet/tx/0b01053f77bca6f7df44320b9c44f6f6cbc7fde4690c2a2f642caf52eba0edcc