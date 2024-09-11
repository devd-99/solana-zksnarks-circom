// Here we export some useful types and functions for interacting with the Anchor program.
import { AnchorProvider, Program } from '@coral-xyz/anchor';
import { Cluster, PublicKey } from '@solana/web3.js';
import SimpleZkIDL from '../target/idl/simple_zk.json';
import type { SimpleZk } from '../target/types/simple_zk';

// Re-export the generated IDL and type
export { SimpleZk, SimpleZkIDL };

// The programId is imported from the program IDL.
export const SIMPLE_ZK_PROGRAM_ID = new PublicKey(SimpleZkIDL.address);

// This is a helper function to get the SimpleZk Anchor program.
export function getSimpleZkProgram(provider: AnchorProvider) {
  return new Program(SimpleZkIDL as SimpleZk, provider);
}

// This is a helper function to get the program ID for the SimpleZk program depending on the cluster.
export function getSimpleZkProgramId(cluster: Cluster) {
  switch (cluster) {
    case 'devnet':
    case 'testnet':
    case 'mainnet-beta':
    default:
      return SIMPLE_ZK_PROGRAM_ID;
  }
}
