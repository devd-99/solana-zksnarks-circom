import * as anchor from '@coral-xyz/anchor';
import { Program } from '@coral-xyz/anchor';
import { Keypair } from '@solana/web3.js';
import { SimpleZk } from '../target/types/simple_zk';

describe('simple-zk', () => {
  // Configure the client to use the local cluster.
  const provider = anchor.AnchorProvider.env();
  anchor.setProvider(provider);
  const payer = provider.wallet as anchor.Wallet;

  const program = anchor.workspace.SimpleZk as Program<SimpleZk>;

  const simpleZkKeypair = Keypair.generate();

  it('Initialize SimpleZk', async () => {
    await program.methods
      .initialize()
      .accounts({
        simpleZk: simpleZkKeypair.publicKey,
        payer: payer.publicKey,
      })
      .signers([simpleZkKeypair])
      .rpc();

    const currentCount = await program.account.simpleZk.fetch(
      simpleZkKeypair.publicKey
    );

    expect(currentCount.count).toEqual(0);
  });

  it('Increment SimpleZk', async () => {
    await program.methods
      .increment()
      .accounts({ simpleZk: simpleZkKeypair.publicKey })
      .rpc();

    const currentCount = await program.account.simpleZk.fetch(
      simpleZkKeypair.publicKey
    );

    expect(currentCount.count).toEqual(1);
  });

  it('Increment SimpleZk Again', async () => {
    await program.methods
      .increment()
      .accounts({ simpleZk: simpleZkKeypair.publicKey })
      .rpc();

    const currentCount = await program.account.simpleZk.fetch(
      simpleZkKeypair.publicKey
    );

    expect(currentCount.count).toEqual(2);
  });

  it('Decrement SimpleZk', async () => {
    await program.methods
      .decrement()
      .accounts({ simpleZk: simpleZkKeypair.publicKey })
      .rpc();

    const currentCount = await program.account.simpleZk.fetch(
      simpleZkKeypair.publicKey
    );

    expect(currentCount.count).toEqual(1);
  });

  it('Set simpleZk value', async () => {
    await program.methods
      .set(42)
      .accounts({ simpleZk: simpleZkKeypair.publicKey })
      .rpc();

    const currentCount = await program.account.simpleZk.fetch(
      simpleZkKeypair.publicKey
    );

    expect(currentCount.count).toEqual(42);
  });

  it('Set close the simpleZk account', async () => {
    await program.methods
      .close()
      .accounts({
        payer: payer.publicKey,
        simpleZk: simpleZkKeypair.publicKey,
      })
      .rpc();

    // The account should no longer exist, returning null.
    const userAccount = await program.account.simpleZk.fetchNullable(
      simpleZkKeypair.publicKey
    );
    expect(userAccount).toBeNull();
  });
});
