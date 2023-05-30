---
sidebar_position: 2
---

# Examples

All these examples use this function

<details>
    <summary>
    Send Transaction
    </summary>

```typescript
export const sendTransaction = async (
  transaction: Transaction,
  connection: Connection,
  payer: Keypair,
  signers: Signer[],
  commitment?: any
) => {
  const { blockhash } = await connection.getLatestBlockhash();

  transaction.feePayer = payer.publicKey;
  transaction.recentBlockhash = blockhash;

  for (const signer of signers) {
    transaction.partialSign(signer);
  }

  transaction.partialSign(payer);

  const signature = await connection.sendRawTransaction(
    transaction.serialize()
  );

  await connection.confirmTransaction(signature, commitment);
};
```

</details>

## 1. Create a member

```javascript
import { Client } from "@ladderlabs/buddy-sdk";
import { Connection, PublicKey } from "@solana/web3.js";

function createMember() {
  const connection = new Connection("https://api.mainnet-beta.solana.com");
  const wallet = Keypair.generate();
  // Airdrop sol

  const client = new Client(connection, wallet.publicKey);
  const organizationName = "laddercaster";
  const referrerName = "bar";

  const transaction = new Transaction();
  transaction.add(
    ...client.initialize.createMember(organizationName, "foo", referrerName)
  );

  await sendTransaction(transaction, connection, wallet, []);
}
```
