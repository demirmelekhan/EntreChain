//! Tests for EntreChain Investment Contract

#![cfg(test)]
use super::*;
use soroban_sdk::{testutils::Address as _, Address, Env};

#[test]
fn test_investment_flow() {
    let env = Env::default();
    let contract_id = env.register_contract(None, InvestmentContract);
    let client = InvestmentContractClient::new(&env, &contract_id);    // Create test addresses
    let investor = Address::generate(&env);
    let project_owner = Address::generate(&env);

    // Mock all auths to bypass authorization
    env.mock_all_auths();

    // Test initial state
    assert_eq!(client.get_total_invested(), 0);
    assert_eq!(client.send_token_project(), 0);

    // Test investment
    let investment_amount = 10_000_000u64; // 1 XLM in stroops
    let result = client.invest(&investor, &project_owner, &investment_amount);
      // Verify investment was recorded
    assert_eq!(result, investment_amount);
    assert_eq!(client.get_total_invested(), investment_amount);
    let last_investor = client.get_last_investor();
    assert!(last_investor.is_some());
    assert_eq!(last_investor.unwrap(), investor);
    
    // Verify tokens were distributed (10 tokens per XLM)
    assert_eq!(client.send_token_project(), 10);
    
    // Verify investor balance
    assert_eq!(client.get_investor_balance(&investor), investment_amount);
    assert!(client.has_invested(&investor));
}

#[test]
fn test_multiple_investments() {
    let env = Env::default();
    let contract_id = env.register_contract(None, InvestmentContract);
    let client = InvestmentContractClient::new(&env, &contract_id);    // Create test addresses
    let investor1 = Address::generate(&env);
    let investor2 = Address::generate(&env);
    let project_owner = Address::generate(&env);

    // Mock all auths to bypass authorization
    env.mock_all_auths();

    // First investment
    let amount1 = 5_000_000u64; // 0.5 XLM
    client.invest(&investor1, &project_owner, &amount1);
    
    // Second investment
    let amount2 = 15_000_000u64; // 1.5 XLM
    client.invest(&investor2, &project_owner, &amount2);    // Verify totals
    assert_eq!(client.get_total_invested(), amount1 + amount2);
    let last_investor = client.get_last_investor();
    assert!(last_investor.is_some());
    assert_eq!(last_investor.unwrap(), investor2);
    
    // Verify individual balances
    assert_eq!(client.get_investor_balance(&investor1), amount1);
    assert_eq!(client.get_investor_balance(&investor2), amount2);
    
    // Verify tokens (5 tokens for 0.5 XLM + 15 tokens for 1.5 XLM = 20 total)
    assert_eq!(client.send_token_project(), 20);
}

#[test]
fn test_project_submission() {
    let env = Env::default();
    let contract_id = env.register_contract(None, InvestmentContract);
    let client = InvestmentContractClient::new(&env, &contract_id);    let project_owner = Address::generate(&env);
    let target_amount = 100_000_000u64; // 10 XLM target

    // Mock all auths to bypass authorization
    env.mock_all_auths();

    // Test project submission
    let result = client.project(&project_owner, &target_amount);
    assert!(result);
}

#[test]
fn test_funding_progress() {
    let env = Env::default();
    let contract_id = env.register_contract(None, InvestmentContract);
    let client = InvestmentContractClient::new(&env, &contract_id);    let investor = Address::generate(&env);
    let project_owner = Address::generate(&env);
    let target_amount = 100_000_000u64; // 10 XLM target

    // Mock all auths to bypass authorization
    env.mock_all_auths();

    // Test 0% progress
    assert_eq!(client.get_funding_progress(&target_amount), 0);

    // Invest 3 XLM (30% of target)
    let investment = 30_000_000u64;
    client.invest(&investor, &project_owner, &investment);
    
    // Test 30% progress
    assert_eq!(client.get_funding_progress(&target_amount), 30);
    
    // Invest another 7 XLM to reach 100%
    let additional_investment = 70_000_000u64;
    let investor2 = Address::generate(&env);
    client.invest(&investor2, &project_owner, &additional_investment);
    
    // Test 100% progress
    assert_eq!(client.get_funding_progress(&target_amount), 100);
}

#[test]
fn test_edge_cases() {
    let env = Env::default();
    let contract_id = env.register_contract(None, InvestmentContract);
    let client = InvestmentContractClient::new(&env, &contract_id);    let investor = Address::generate(&env);
    let project_owner = Address::generate(&env);

    // Mock all auths to bypass authorization
    env.mock_all_auths();

    // Test zero investment
    client.invest(&investor, &project_owner, &0);
    assert_eq!(client.get_total_invested(), 0);
    assert_eq!(client.send_token_project(), 0);

    // Test very small investment (less than 1 XLM)
    let small_amount = 1_000_000u64; // 0.1 XLM
    client.invest(&investor, &project_owner, &small_amount);
    assert_eq!(client.get_total_invested(), small_amount);
    assert_eq!(client.send_token_project(), 1); // Should get 1 token for 0.1 XLM    // Test funding progress with zero target
    let zero_target = 0u64;
    assert_eq!(client.get_funding_progress(&zero_target), 0);
}
