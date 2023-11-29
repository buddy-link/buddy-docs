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

When creating a member, the name specified on initialization is the [referral key](/docs/terminology.md) used to refer other people.

```javascript
import { Client } from "@ladderlabs/buddy-sdk";
import { Connection, PublicKey } from "@solana/web3.js";

const connection = new Connection("https://api.mainnet-beta.solana.com");
const wallet = Keypair.generate();

const client = new Client(connection, wallet.publicKey);
const organizationName = "laddercaster";

const transaction = new Transaction();
transaction.add(...client.initialize.createMember(organizationName, "foo"));

await sendTransaction(transaction, connection, wallet, []);
```

## 2. Refer a new member

In the first example, a member was created without being referred by anyone. This generally is a user creating its member to refer other people to your platform. In the example below member `foo` is referring `bar`.

```javascript
client.initialize.createMember(organizationName, "bar", "for");
```

## 3. Transfer funds

In general, transfers are done through the smart contract by making a cpi call to buddylink (see [Guides](/docs/guides/) for more information) but it can also be done through the SDK. In the example below assume the user is buying an NFT and we are attaching a transfer instruction to the transaction.

```javascript
const client = new Client(connection, wallet.publicKey);
const organizationName = "laddercaster";

const transaction = new Transaction();

// ... building instruction for buying the NFT

const member = await client.member.getByName(organizationName, "bar");

// Transferring 1 SOL to foo's treasury
transaction.add(
  ...client.transfer.transferRewards(member.account.pda, 1 * 1e9)
);

await sendTransaction(transaction, connection, wallet, []);
```

[//]: # "Add buddylink app link here?"

## 4. Claim

Funds are sent to a treasury owned by the referrer where it can be claimed.

```javascript
const client = new Client(connection, wallet.publicKey);
const organizationName = "laddercaster";

const transaction = new Transaction();

const treasury = await client.treasury.getByMemberOwner(
  organizationName,
  "foo"
);

transaction.add(...treasury.claim());

await sendTransaction(transaction, connection, wallet, []);
```
