---
sidebar_position: 1
---

import Tabs from "@theme/Tabs";
import TabItem from "@theme/TabItem";

# Installation

Developers can easily begin utilizing Buddylink's on-chain tools with the help of this SDK. Please take note that this SDK is still actively being developed, which means there may be changes to the core API and interfaces between versions. However, you are welcome to use it and provide early feedback if you would like to contribute to the project's direction.

## Install package

<Tabs>
  <TabItem value="yarn" label="Yarn" default>

```bash
yarn add @ladderlabs/buddy-sdk
```

  </TabItem>

  <TabItem value="npm" label="NPM">

```bash
npm install @ladderlabs/buddy-sdk
```

  </TabItem>

</Tabs>

## Setup

The SDK's entry point is represented by a `Client` instance, providing you with access to its API.
It receives a Connection instance from [@solana/web3.js](https://www.npmjs.com/package/@solana/web3.js), enabling communication with the chain, along with an optional wallet that facilitates the construction of instructions with proper authority.

### Script

Here's a simple setup for a basic typescript page.

```javascript
import { Client } from "@ladderlabs/buddy-sdk";
import { Connection, PublicKey } from "@solana/web3.js";

const connection = new Connection("https://api.mainnet-beta.solana.com");
const wallet = new PublicKey();

const client = new Client(connection, wallet);
```

Additionally, you have the flexibility to modify the client instance by either replacing or adding the authority wallet through the injection method. The wallet serves the purpose of setting authority in the instructions and should also be utilized by the transaction signer.

```javascript
import { Client } from "@ladderlabs/buddy-sdk";
import { Connection, PublicKey } from "@solana/web3.js";

const connection = new Connection("https://api.mainnet-beta.solana.com");
const wallet = new PublicKey();

const client = new Client(connection);
const newClient = client.inject(wallet);
```

To further explore potential use cases, refer to the examples provided as a starting point.

### React wallet adapter

Here's a comprehensive implementation adding the wallet adapter framework to use with buddylink.

#### Install the wallet adapter dependencies

<Tabs>
  <TabItem value="yarn" label="Yarn" default>

```bash
yarn add @solana/wallet-adapter-base \
    @solana/wallet-adapter-react \
    @solana/wallet-adapter-react-ui \
    @solana/wallet-adapter-wallets \
    @solana/web3.js \
    react
```

  </TabItem>

  <TabItem value="npm" label="NPM">

```bash
npm install @solana/wallet-adapter-base \
    @solana/wallet-adapter-react \
    @solana/wallet-adapter-react-ui \
    @solana/wallet-adapter-wallets \
    @solana/web3.js \
    react
```

  </TabItem>

</Tabs>

#### Setup the wallet provider

```javascript
import React, { useMemo } from "react";
import {
  ConnectionProvider,
  WalletProvider,
} from "@solana/wallet-adapter-react";
import { WalletAdapterNetwork } from "@solana/wallet-adapter-base";
import {
  WalletModalProvider,
  WalletDisconnectButton,
  WalletMultiButton,
} from "@solana/wallet-adapter-react-ui";
import { clusterApiUrl } from "@solana/web3.js";

export const App = () => {
  const network = WalletAdapterNetwork.Mainnet;
  const endpoint = useMemo(() => clusterApiUrl(network), [network]);
  const wallets = useMemo(
    () => [
      //Import wallets adapters you want to use
    ],
    [network]
  );

  return (
    <ConnectionProvider endpoint={endpoint}>
      <WalletProvider wallets={wallets} autoConnect>
        <WalletModalProvider>
          <WalletMultiButton />
          <WalletDisconnectButton />
          <MyComponent />
        </WalletModalProvider>
      </WalletProvider>
    </ConnectionProvider>
  );
};
```

For complete usage information, please the visit the [documentation](https://github.com/solana-labs/wallet-adapter/blob/master/APP.md) for the Solana wallet adapter.

#### Usage

Once the wallet adapter is setup you can easily instantiate the buddylink client and start using our program. In the chapter you will

```javascript
import { useEffect } from "react";
import {
  useConnection,
  useWallet,
  useAnchorWallet,
} from "@solana/wallet-adapter-react";
import { Client } from "@ladderlabs/buddy-sdk";

export const MyComponent = () => {
  const { connection } = useConnection();
  const { connected, publicKey } = useWallet();

  useEffect(() => {
    if (connected) {
      const client = new Client(connection, publicKey);
    }
  }, [anchorWallet, connection, connected]);

  return null;
};
```
