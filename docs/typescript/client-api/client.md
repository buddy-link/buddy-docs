---
sidebar_position: 1
---

# Client

## Client class

The **Client** class is a central component of the SDK that provides an interface for interacting with the Buddylink program. It encapsulates the functionality of various providers and instruction builders. The **Client** class can be easily instantiated by following this example:

```javascript
import { Client } from "@ladderlabs/buddy-sdk";
import { Connection, PublicKey } from "@solana/web3.js";

const connection = new Connection(/* connection parameters */);
const wallet = new PublicKey(/* wallet public key */);

const client = new Client(connection, wallet);
```

## Methods

- **inject(wallet: PublicKey)**: Allows injecting a new wallet into the Client instance. Returns the updated Client instance with the new wallet.

## Properties

There are multiple properties in the client used for retrieving accounts and construct instructions

- **organization**: Represents a provider that allows you fetch [organization](/) accounts.
- **member**: Represents a provider that allows you fetch [member](/) accounts.
- **treasury**: Represents a provider that allows you fetch [treasury](/) accounts.
- **buddy**: Represents a provider that allows you fetch [buddy](/) accounts.
- **ambassador**: Represents a provider that allows you fetch [ambassador](/) accounts.

* **transfer**: Allows you to build [transfer](/) instructions.
* **initialize**: Allows you to create accounts for specific functions
* **nft**: Allows you to mint and redeem global buddy nfts
