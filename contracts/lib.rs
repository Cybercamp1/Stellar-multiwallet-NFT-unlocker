#![no_std]
use soroban_sdk::{contract, contractimpl, contracttype, symbol_short, Address, Env, Symbol, log};

#[contracttype]
#[derive(Clone)]
pub enum DataKey {
    Access(Address),
}

#[contract]
pub struct NFTAccessControl;

#[contractimpl]
impl NFTAccessControl {
    pub fn pay_and_unlock(env: Env, user: Address, amount: i128) {
        if amount <= 0 {
            panic!("Amount must be greater than 0");
        }

        // Store access state
        let key = DataKey::Access(user.clone());
        env.storage().persistent().set(&key, &true);

        // Emit success event
        env.events().publish(
            (symbol_short!("payment"), symbol_short!("success")),
            user,
        );
        
        log!(&env, "Access granted to user: {}", user);
    }

    pub fn check_access(env: Env, user: Address) -> bool {
        let key = DataKey::Access(user);
        env.storage().persistent().get(&key).unwrap_or(false)
    }
}
