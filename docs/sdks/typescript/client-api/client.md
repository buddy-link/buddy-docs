---
sidebar_position: 1
---

# Client

## Client class

The **Client** class is the central component of the SDK that provides an interface for interacting with the Buddylink program. It encapsulates the functionality of various providers and instruction builders. The **Client** class can be easily instantiated by following this example:

## Methods

```javascript
const newClient = client.inject(wallet);
```

Allows injecting a new wallet into the Client instance. Returns the updated Client instance with the new wallet.

## Providers

There are multiple properties in the client used for retrieving accounts and construct instructions

#### Organization Provider

<!-- (/docs/typescript/client-api/providers.md?id=organization) -->

```javascript
const organizationProvider = client.organization;
```

Represents a provider that allows you fetch organization accounts.

#### Member Provider

<!-- (/docs/typescript/client-api/providers.md?id=member) -->

```javascript
const memberProvider = client.member;
```

Represents a provider that allows you fetch member accounts.

#### Treasury Provider

<!-- (/docs/typescript/client-api/providers.md?id=treasury) -->

```javascript
const treasuryProvider = client.treasury;
```

Represents a provider that allows you fetch treasury accounts.

#### Buddy Provider

<!-- (/docs/typescript/client-api/providers.md?id=buddy) -->

```javascript
const buddyProvider = client.buddy;
```

Represents a provider that allows you fetch buddy accounts.

#### Ambassador Provider

<!-- (/docs/typescript/client-api/providers.md?id=ambassador) -->

```javascript
const ambassadorProvider = client.ambassador;
```

Represents a provider that allows you fetch ambassador accounts.

## Builders

Builders are used to create instructions for multiple purposes. These functions can also be found in models for specific purposes related that specific account.

#### Transfer Builder

<!-- (/docs/typescript/client-api/instructions.md?id=transfer) -->

```javascript
const transferBuilder = client.transfer;
```

Allows you to build transfer instructions.

#### Initialize Builder

<!-- (/docs/typescript/client-api/instructions.md?id=initializer) -->

```javascript
const initializeBuilder = client.initialize;
```

Allows you to create accounts for specific functions.

#### NFT Builder

<!-- (/docs/typescript/client-api/instructions.md?id=nft) -->

```javascript
const nftBuilder = client.nft;
```

Allows you to mint and redeem global buddy nfts
