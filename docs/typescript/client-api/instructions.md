---
sidebar_position: 3
---

# Instructions

The client provides builders for setting up instructions to interact with the accounts.

_Note: To ensure these instructions work properly, instantiate the client with the wallet that will perform the transaction. You can also use the .inject function to add the wallet to the instance._

## Transfer

```javascript
transferRewards(memberPDA: PublicKey, amount: number, mint?: PublicKey, allowMultiLevel: boolean = true): Promise<TransactionInstruction[]>
```

Transfers rewards from the specified member to its referrer.

```javascript
transferRewardsNoMultiLevel(receiveMemberPDA: PublicKey, amount: number, mint?: PublicKey): Promise<TransactionInstruction[]>
```

Transfers rewards to a member without multi-level transfers.

```javascript
transferRewardsSecure(memberPDA: PublicKey, receiveMemberPDA: PublicKey, amount: number, mint?: PublicKey, allowMultiLevel: boolean = true): Promise<TransactionInstruction[]>
```

Transfers rewards from the specified member to its referrer with additional validation.

```javascript
transferRewardsWithBPS(memberPDA: PublicKey, amount: number, mint?: PublicKey, allowMultiLevel: boolean = true): Promise<TransactionInstruction[]>
```

Transfers rewards from the specified member to its referrer. The shares calculation is based on the total amount, for example, transferring 10% of 1 SOL instead of the total amount.

## Initializer

_Note: referrerHash usually represents the name of the referrer but in some cases it can represent a shared treasury (denoted by $ at the end of the string)_
_Note: In the functions below, if a mint is not provided, it will default to SOL._

```javascript
createMember(organizationName: string, memberName: string, referrerHash?: string): Promise<TransactionInstruction[]>
```

Creates a new member in an organization. Prior to adding the createMember instruction, this function can contain multiple instructions if the required accounts have not been created yet.

_Note: In rare cases, it may be necessary to split the instructions into multiple transactions._

```javascript
createReferrerMember(organizationName: string, memberName: string): Promise<TransactionInstruction>
```

Similar to `createMember`, but assumes no referrer is attached to the member, making it more lightweight. It is recommended to use this function only when creating the referrer member before the main member if no referrer needs to be attributed.

```javascript
createProfile(buddyName: string, referralHash?: string, mint?: PublicKey): Promise<TransactionInstruction[]>
```

Creates a profile for a buddy.

```javascript
createOrganization(name: string, options: OrganizationConfiguration, ambassadorName?: string): Promise<TransactionInstruction>
```

Creates a new organization.

```javascript
createSharedTreasuryByHash(hash: string, mint?: PublicKey): Promise<TransactionInstruction>
```

Creates a shared treasury using a hash representing the owners and shares.

```javascript
createTreasuryByName(buddyName: string, mint?: PublicKey): Promise<TransactionInstruction>
```

Creates a treasury for a buddy by name.

```javascript
createTreasuryByBuddyPDA(buddyPDA: PublicKey, mint?: PublicKey): Promise<TransactionInstruction>
```

Creates a treasury with a buddyPDA.

```javascript
createSharedTreasuryByName(buddyNames: string[], shares: number[], mint?: PublicKey): Promise<TransactionInstruction>
```

Creates a shared treasury for the specified owners.

```javascript
createSharedTreasuryByPDA(buddyPDAs: PublicKey[], shares: number[], mint?: PublicKey): Promise<TransactionInstruction>
```

Creates a shared treasury for the specified owners.

```javascript
generateProfileName();
```

Generates a random profile name according to the profile name standard (ie. 18 characters in length).

```javascript
decryptHash(hash: string)
```

Decrypts a hash representing owners and shares.

```javascript
encryptHash(owners: string[], shares: number[])
```

Encrypts owners and shares into a hash.

## NFT

```javascript
generateNftMint();
```

Generates a new NFT mint. It performs basic keypair generation to mint an NFT.

```javascript
claimNFTOrganization(organizationName: string, options: OrganizationConfiguration, nftMint: PublicKey)
```

Claims an NFT for an organization.

```javascript
claimNFTPaidBuddy(buddyProfilePDA: PublicKey, paidBuddyName: string, nftMint: PublicKey)
```

Claims an NFT for a paid buddy. Use this function if the paid buddy did not exist previously.

```javascript
redeemPaidBuddy(buddyProfilePDA: PublicKey, paidBuddyPDA: PublicKey, nftMint: PublicKey)
```

Redeems an NFT for a paid buddy and unfreezes the account. Use this function if the paid buddy was minted from an existing buddy.

```javascript
mintPaidBuddy(buddyProfilePDA: PublicKey, paidBuddyPDA: PublicKey, generatedMintAddress: PublicKey)
```

Mints an NFT for a paid buddy and freezes the account.
