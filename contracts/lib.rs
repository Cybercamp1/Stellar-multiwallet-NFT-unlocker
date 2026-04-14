#![no_std]
use soroban_sdk::{contract, contracterror, contractimpl, contracttype, symbol_short, Address, Env, Symbol, log};

#[contracttype]
#[derive(Clone)]
pub enum DataKey {
    Access(Address),
}

#[contracterror]
#[derive(Copy, Clone, Debug, Eq, PartialEq, PartialOrd, Ord)]
#[repr(u32)]
pub enum Error {
    InvalidAmount = 1,
    AlreadyUnlocked = 2,
    NotAuthorized = 3,
}

#[contract]
pub struct NFTAccessControl;

#[contractimpl]
impl NFTAccessControl {
    pub fn pay_and_unlock(env: Env, user: Address, amount: i128) -> Result<(), Error> {
        if amount <= 0 {
            return Err(Error::InvalidAmount);
        }

        let key = DataKey::Access(user.clone());
        if env.storage().persistent().has(&key) {
             // Example of second error type (Although not strictly required by original logic, makes it better)
             return Err(Error::AlreadyUnlocked);
        }

        // Store access state
        env.storage().persistent().set(&key, &true);

        // Emit success event
        env.events().publish(
            (symbol_short!("payment"), symbol_short!("success")),
            user.clone(),
        );
        
        log!(&env, "Access granted to user: {}", user);
        
        Ok(())
    }

    pub fn check_access(env: Env, user: Address) -> bool {
        let key = DataKey::Access(user);
        env.storage().persistent().get(&key).unwrap_or(false)
    }
}

#[cfg(test)]
mod test {
    use super::*;
    use soroban_sdk::{testutils::Address as _, Env};

    #[test]
    fn test_pay_and_unlock_success() {
        let env = Env::default();
        let contract_id = env.register_contract(None, NFTAccessControl);
        let client = NFTAccessControlClient::new(&env, &contract_id);

        let user = Address::generate(&env);
        let amount = 100;

        // Initially no access
        assert!(!client.check_access(&user));

        // Unlock
        client.pay_and_unlock(&user, &amount);

        // Access granted
        assert!(client.check_access(&user));
    }

    #[test]
    fn test_already_unlocked_error() {
        let env = Env::default();
        let contract_id = env.register_contract(None, NFTAccessControl);
        let client = NFTAccessControlClient::new(&env, &contract_id);

        let user = Address::generate(&env);
        let amount = 100;

        client.pay_and_unlock(&user, &amount);
        
        // Try again, should error (but since it returns Result, we check it)
        let result = client.try_pay_and_unlock(&user, &amount);
        assert_eq!(result, Err(Ok(Error::AlreadyUnlocked)));
    }

    #[test]
    fn test_invalid_amount_error() {
        let env = Env::default();
        let contract_id = env.register_contract(None, NFTAccessControl);
        let client = NFTAccessControlClient::new(&env, &contract_id);

        let user = Address::generate(&env);
        let amount = 0;

        let result = client.try_pay_and_unlock(&user, &amount);
        assert_eq!(result, Err(Ok(Error::InvalidAmount)));
    }
}

