//! EntreChain Smart Contract - Investment Platform on Stellar Soroban
//! This contract manages startup project investments and tracks investor data

#![no_std]
use soroban_sdk::{contract, contractimpl, contracttype, Address, Env};

// Data keys for persistent storage
#[contracttype]
#[derive(Clone)]
pub enum DataKey {
    TotalInvested,
    LastInvestor,
    ProjectTokens,
    InvestorBalance(Address),
    ProjectOwner(Address),
}

#[contract]
pub struct InvestmentContract;

#[contractimpl]
impl InvestmentContract {
    /// Invest in a project - sends XLM to project owner and tracks investment
    /// 
    /// # Arguments
    /// * `env` - Soroban environment
    /// * `investor` - Address of the investor
    /// * `project_owner` - Address of the project owner receiving funds
    /// * `amount` - Investment amount in stroops (1 XLM = 10,000,000 stroops)
    pub fn invest(
        env: Env, 
        investor: Address, 
        project_owner: Address, 
        amount: u64
    ) -> u64 {
        // Ensure the investor has authorized this transaction
        investor.require_auth();

        // Get current total invested amount
        let current_total: u64 = env
            .storage()
            .persistent()
            .get(&DataKey::TotalInvested)
            .unwrap_or(0);

        // Update total invested
        let new_total = current_total + amount;
        env.storage()
            .persistent()
            .set(&DataKey::TotalInvested, &new_total);

        // Set last investor
        env.storage()
            .persistent()
            .set(&DataKey::LastInvestor, &investor);

        // Update investor's personal balance
        let investor_key = DataKey::InvestorBalance(investor.clone());
        let current_investor_balance: u64 = env
            .storage()
            .persistent()
            .get(&investor_key)
            .unwrap_or(0);
        
        let new_investor_balance = current_investor_balance + amount;
        env.storage()
            .persistent()
            .set(&investor_key, &new_investor_balance);        // Calculate and add project tokens (10 tokens per 1 XLM, 1 token per 0.1 XLM)
        let tokens_to_add = (amount / 1_000_000) * 1; // 1 token per 0.1 XLM (1,000,000 stroops)
        let current_tokens: u64 = env
            .storage()
            .persistent()
            .get(&DataKey::ProjectTokens)
            .unwrap_or(0);
        
        let new_token_total = current_tokens + tokens_to_add;
        env.storage()
            .persistent()
            .set(&DataKey::ProjectTokens, &new_token_total);

        // Store project owner mapping
        let project_key = DataKey::ProjectOwner(project_owner.clone());
        env.storage()
            .persistent()
            .set(&project_key, &project_owner);

        new_total
    }

    /// Get total amount invested across all projects
    pub fn get_total_invested(env: Env) -> u64 {
        env.storage()
            .persistent()
            .get(&DataKey::TotalInvested)
            .unwrap_or(0)
    }    /// Get the address of the last investor
    pub fn get_last_investor(env: Env) -> Option<Address> {
        env.storage()
            .persistent()
            .get(&DataKey::LastInvestor)
    }

    /// Submit a new project (placeholder for project owner)
    /// 
    /// # Arguments
    /// * `env` - Soroban environment
    /// * `project_owner` - Address of the project owner
    /// * `target_amount` - Target funding amount for the project
    pub fn project(env: Env, project_owner: Address, target_amount: u64) -> bool {
        // Ensure the project owner has authorized this transaction
        project_owner.require_auth();

        // Store project information
        let project_key = DataKey::ProjectOwner(project_owner.clone());
        env.storage()
            .persistent()
            .set(&project_key, &target_amount);

        true
    }

    /// Get total project tokens distributed
    pub fn send_token_project(env: Env) -> u64 {
        env.storage()
            .persistent()
            .get(&DataKey::ProjectTokens)
            .unwrap_or(0)
    }    /// Get project investment details (alias for get_last_investor)
    pub fn get_invest_project(env: Env) -> Option<Address> {
        Self::get_last_investor(env)
    }

    /// Get investor's total investment amount
    pub fn get_investor_balance(env: Env, investor: Address) -> u64 {
        let investor_key = DataKey::InvestorBalance(investor);
        env.storage()
            .persistent()
            .get(&investor_key)
            .unwrap_or(0)
    }

    /// Check if an address has invested (helper function)
    pub fn has_invested(env: Env, investor: Address) -> bool {
        let investor_key = DataKey::InvestorBalance(investor);
        env.storage()
            .persistent()
            .has(&investor_key)
    }    /// Get project funding progress as percentage (0-100)
    pub fn get_funding_progress(env: Env, target_amount: u64) -> u32 {
        let total_invested = Self::get_total_invested(env);
        if target_amount == 0 {
            return 0;
        }
        
        let percentage = (total_invested * 100) / target_amount;
        if percentage > 100 {
            100
        } else {
            percentage as u32
        }
    }
}

#[cfg(test)]
mod test;
