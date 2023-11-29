---
sidebar_position: 1
---

# Basic Integration (in Next.js)

You can find the project example [here](https://github.com/buddy-link/examples).

## Part 1: Introduction and Setting Up Next.js

### What is Next.js?

Next.js is a React framework that enables functionalities such as server-side rendering and static website generation for React-based web applications.

### Setting Up a Basic Next.js Project

1. **Install Node.js and npm**:<br />
   Ensure Node.js and npm are installed on your system. You can download them from the[Node.js official website](https://nodejs.org/en).

2. **Create a Next.js App**:<br />
   Open your terminal and execute the following command to create a new Next.js application:

   ```bash
   npx create-next-app my-next-app
   cd my-next-app
   ```

   Replace `my-next-app` with the name you prefer for your project.

3. **Start the Development Server**: <br />
   Initiate the development server by running:

   ```bash
   npm run dev
   ```

   Access `http://localhost:3000` in your web browser to view your new site.

## Part 2: Understanding Solana Wallet Adapter

### What is Solana Wallet Adapter?

The Solana Wallet Adapter is a toolkit offering React components and hooks, facilitating the integration of Solana wallet functionality into your application. It enables users to connect their Solana wallets for executing transactions. Integrating this adapter is essential for using our React package, as it relies on some of these providers.

### Setting Up Solana Wallet Adapter

1. **Install Dependencies**: <br />
   In your project directory, install the required packages:

   ```bash
   npm install @solana/wallet-adapter-react @solana/wallet-adapter-react-ui @solana/wallet-adapter-wallets @solana/web3.js
   ```

2. **Set Up Wallet Providers**: <br />
   In your `_app.js` file, import and configure the wallet providers as follows:

   ```jsx
   import {
     ConnectionProvider,
     WalletProvider,
   } from "@solana/wallet-adapter-react";
   import { PhantomWalletAdapter } from "@solana/wallet-adapter-wallets";
   import { clusterApiUrl } from "@solana/web3.js";

   function MyApp({ Component, pageProps }) {
     const network = "devnet";
     const endpoint = useMemo(() => clusterApiUrl(network), [network]);
     const wallets = useMemo(() => [new PhantomWalletAdapter()], []);

     return (
       <ConnectionProvider endpoint={endpoint}>
         <WalletProvider wallets={wallets} autoConnect>
           <Component {...pageProps} />
         </WalletProvider>
       </ConnectionProvider>
     );
   }

   export default MyApp;
   ```

   This snippet configures the wallet provider for Solana, enabling your application to connect with Solana wallets.

## Part 3: Integrating @ladderlabs Packages

### Installing @ladderlabs Packages

1. **Install Packages**:<br />
   Run the following command in your project directory to install the necessary @ladderlabs packages:

   ```bash
   npm install @ladderlabs/buddy-sdk @ladderlabs/buddy-react
   ```

2. **Setting Up Referral Provider**: <br />
   In `_app.js`, import and incorporate the ReferralProvider from `@ladderlabs/buddy-react`:

   ```jsx
   import { ReferralProvider } from "@ladderlabs/buddy-react";

   function MyApp({ Component, pageProps }) {
     // ... Previous wallet setup

     return (
       <ConnectionProvider endpoint={endpoint}>
         <WalletProvider wallets={wallets} autoConnect>
           // highlight-next-line
           <ReferralProvider>
             // highlight-next-line
             <Component {...pageProps} />
             // highlight-next-line
           </ReferralProvider>
         </WalletProvider>
       </ConnectionProvider>
     );
   }

   export default MyApp;
   ```

   This code snippet integrates the ReferralProvider into your application, activating referral functionalities throughout.

### Caching the referrer

This example demonstrates a method to store the referrer, replacing the current value with a new one upon receipt.

```jsx
function MyApp() {
  const [referrer, setReferrer] = useState(null);

  //... wallet adapter logic

  useEffect(() => {
    const { r } = router.query;
    setReferrer(r);
    localStorage.setItem("referrer", r);
  }, [router]);

  useEffect(() => {
    setReferrer(localStorage.getItem("referrer"));
  }, []);

  return (
    <>
      {/*...solana adatper*/}
      <ReferralProvider referrer={referrer}>{/*...*/}</ReferralProvider>
    </>
  );
}
```

This approach checks for a stored referrer value on load and then examines the URL for a new referrer to override it. The referrer is crucial for creating a new referral link; however, once the link is established on-chain, it becomes unnecessary for subsequent actions like transfers or claims.

### Creating a referral link

Let's first create a page (`pages/profile.js`) for a user to generate their referral link and use it to share with other people.

#### Initialize the buddy data

```jsx
import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import { useCallback, useEffect, useMemo } from "react";
import { useReferralContext } from "@ladderlabs/buddy-react";

export default function Profile() {
  const { init, members, loadingData, isReady, createMember, refresh } =
    useReferralContext();
  const { publicKey } = useWallet();
  const { connection } = useConnection();

  useEffect(() => {
    if (publicKey && connection && isReady) {
      init({
        depth: "simple",
      });
    }
  }, [publicKey, connection, isReady]);

```

To initiate data fetching, you need to make sure the user has connected a wallet and the buddy client is ready. You need to specify a depth ("simple" or "full") but in most circumstances only "simple" is needed.

#### UI logic

```jsx
const handleClick = useCallback(async () => {
  await createMember();
  await refresh({
    depth: "simple",
  });
}, [createMember]);

const member = useMemo(() => {
  return members[ORGANIZATION_NAME]?.[0];
}, [members]);

if (loadingData) return <div>Loading...</div>;
return (
  <div>
    {member ? (
      <div>
        <p>
          Your referral link:{" "}
          <b>https://localhost:3000/?r={member.account.name}</b>
        </p>
      </div>
    ) : (
      <div onClick={handleClick}>Create link</div>
    )}
  </div>
);
```

The `createMember` function can full handle the signing and execution of the transaction but if you want more control you can also use `createMemberInstructions` which returns the instructions and the member PDA.

Note: Some organizations may have multiple members, but in this case, it's typically just one.

<!-- TODO: add claiming logic -->

### Invited user UI

Let's first create a page (`pages/index.js`) for users to be invited to and engage in an action.

### Setup the UI

```jsx
import { useReferralContext } from "@ladderlabs/buddy-react";
import { useConnection, useWallet } from "@solana/wallet-adapter-react";

export default function Home() {
  const { createMemberInstructions, transferRewardsInstructions } =
    useReferralContext();

  const { signAllTransactions, publicKey } = useWallet();
  const { connection } = useConnection();

  // handleClick definition

  return (
    <div>
      <button onClick={handleClick}>Buy thing!</button>
      <Link href={"/profile"}>Invite friends!</Link>
    </div>
  );
}
```

This simple UI allows the user to perform a simple task

### handleClick logic

This example shows how to execute the transaction of creating a member and perform the needed action. This allows for the referrer to start receiving rewards on the first action.

```jsx
const handleClick = useCallback(async () => {
  if (!publicKey) return;
  // These instructions can get pretty big so we suggest seperating them into 2 transactions (creating the member and the transfer action)

  const transactions = [];

  try {
    const createMember = await createMemberInstructions();

    transactions.push(new transactions().add(...createMember.instructions));

    const transferRewards = await transferRewardsInstructions(
      USDC,
      createMember.memberAccount,
      10
    );

    // In this transaction, the organization's action should be added (ie. buy nft, swap tokens, etc.)
    // See full example to integrate transfers in the contract (coming soon)
    transactions.push(new transactions().add(...transferRewards.instructions));

    const { blockhash } = await connection.getRecentBlockhash("max");
    for (const tx of transactions) {
      tx.recentBlockhash = blockhash;
      tx.feePayer = publicKey;
    }

    const signedTransactions = await signAllTransactions(transactions);

    const txids = [];
    for (const signedTransaction of signedTransactions) {
      try {
        txids.push(
          await connection.confirmTransaction(
            await connection.sendRawTransaction(signedTransaction.serialize())
          )
        );
      } catch (e) {
        console.log(e);
        txids.push(null);
      }
    }
    return txids;
  } catch (e) {
    console.log(e);
  }
}, [
  createMemberInstructions,
  transferRewardsInstructions,
  signAllTransactions,
  connection,
  publicKey,
]);
```
