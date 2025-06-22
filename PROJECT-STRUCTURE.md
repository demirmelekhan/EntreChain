# 📁 EntreChain Project Structure

```
entrechain-v2/
├── 📄 README.md                    # Project documentation
├── 📄 PDR-FRONTEND-TEMP.md        # Frontend customization guide
├── 📄 FreighterWalletDocs.md       # Wallet integration documentation
├── 🔧 setup.sh / setup.bat        # Development setup scripts
├── 🚀 deploy.sh                   # Deployment script
│
├── 🎨 frontend/                   # Next.js Frontend Application
│   ├── 📦 package.json            # Dependencies and scripts
│   ├── ⚙️ next.config.js          # Next.js configuration
│   ├── 🎨 tailwind.config.js      # Tailwind CSS configuration
│   ├── 📝 tsconfig.json           # TypeScript configuration
│   ├── 📁 styles/
│   │   └── globals.css            # Global styles with Tailwind
│   ├── 📁 lib/
│   │   ├── wallet.ts              # Freighter wallet utilities
│   │   └── contract.ts            # Stellar contract interaction
│   ├── 📁 pages/
│   │   ├── _app.tsx               # Next.js app component
│   │   ├── index.tsx              # Home/login page
│   │   └── main.tsx               # Investment dashboard
│   └── 📁 .env.example            # Environment variables template
│
└── 🦀 backend/                    # Rust Soroban Smart Contract
    ├── 📦 Cargo.toml              # Rust dependencies
    └── 📁 src/
        ├── lib.rs                 # Main contract logic
        └── test.rs                # Contract tests
```

## 🎯 Key Features

### Frontend Features
- **🔗 Wallet Connection**: Freighter integration with PassKey support
- **💰 Investment Interface**: Clean UI for project investment
- **📊 Dashboard**: Real-time investment tracking
- **🎨 Custom Design**: Orange-themed UI based on PDR specifications
- **📱 Responsive**: Mobile-friendly design

### Backend Features
- **💳 Investment Logic**: Process XLM investments
- **🎯 Token Distribution**: Automatic project token rewards
- **📈 Data Tracking**: Persistent investment and investor data
- **🧪 Comprehensive Tests**: Full test coverage
- **🔒 Security**: Authorization required for transactions

## 🚀 Quick Commands

```bash
# Setup development environment
./setup.sh        # Linux/Mac
setup.bat         # Windows

# Start frontend development
cd frontend && npm run dev

# Test smart contract
cd backend && cargo test

# Deploy to testnet
./deploy.sh
```

## 📝 Development Workflow

1. **Setup**: Run setup script to install dependencies
2. **Develop**: Start frontend with `npm run dev`
3. **Test**: Run contract tests with `cargo test`
4. **Deploy**: Use deploy script for testnet deployment
5. **Configure**: Update .env.local with contract address
6. **Launch**: Frontend connects to deployed contract

---

🎨 **Built with EntreChain PDR specifications for entrepreneur-focused UI**
