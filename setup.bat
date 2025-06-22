@echo off
echo 🚀 Setting up EntreChain Development Environment...

REM Frontend setup
echo 📦 Installing frontend dependencies...
cd frontend
call npm install
if errorlevel 1 (
    echo ❌ Frontend setup failed
    pause
    exit /b 1
)

REM Backend setup
echo 🦀 Setting up Rust backend...
cd ..\backend

REM Check if Soroban is installed
soroban --version >nul 2>&1
if errorlevel 1 (
    echo Installing Soroban CLI...
    cargo install --locked soroban-cli
)

REM Build the contract
echo 🔨 Building smart contract...
cargo build --target wasm32-unknown-unknown --release
if errorlevel 1 (
    echo ❌ Contract build failed
    pause
    exit /b 1
)

REM Run tests
echo 🧪 Running contract tests...
cargo test
if errorlevel 1 (
    echo ❌ Tests failed
    pause
    exit /b 1
)

echo ✅ Setup complete!
echo.
echo To start development:
echo 1. cd frontend ^&^& npm run dev (start frontend)
echo 2. Deploy contract to testnet when ready
echo 3. Update NEXT_PUBLIC_CONTRACT_ADDRESS in .env.local
pause
