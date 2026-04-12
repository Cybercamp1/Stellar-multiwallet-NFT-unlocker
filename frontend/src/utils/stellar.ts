import { Networks, Horizon, rpc } from '@stellar/stellar-sdk';

// ─── Network Configuration ─────────────────────────────────────────────────
export const STELLAR_NETWORK = Networks.TESTNET;
export const HORIZON_URL = 'https://horizon-testnet.stellar.org';
export const RPC_URL = 'https://soroban-testnet.stellar.org';

// Replace with your deployed contract ID after running: stellar contract deploy
export const CONTRACT_ID = 'CCGZ...YOUR_CONTRACT_ID';

// Treasury address that receives XLM payments on Testnet (until contract is deployed)
// Replace with your own Stellar Testnet address to receive funds
export const TREASURY_ADDRESS = 'GBVM5MJUKE2LAQWE6EKPBMYBHJGIORVXK6SN7HVXJ42OMJHIMVDK2WLK';

// ─── SDK Clients ───────────────────────────────────────────────────────────
// In SDK v13+, Horizon.Server replaces the old top-level Server class
export const horizonServer = new Horizon.Server(HORIZON_URL);
export const rpcServer = new rpc.Server(RPC_URL);

// ─── Helpers ───────────────────────────────────────────────────────────────

/**
 * Checks if a Stellar account exists on Testnet.
 */
export async function checkAccount(address: string) {
  try {
    const account = await horizonServer.loadAccount(address);
    return account;
  } catch {
    return null;
  }
}

/**
 * Shortens a Stellar G-address for display: GABCD...WXYZ
 */
export function shortenAddress(address: string) {
  if (!address) return '';
  return `${address.slice(0, 6)}...${address.slice(-4)}`;
}
