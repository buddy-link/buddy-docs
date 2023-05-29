---
sidebar_position: 3
---

# Models

The models provided here offer detailed information and methods to interact with specific account types. Each model includes an **account** property, which contains account information, and a **refresh** method to update the account data by fetching the latest information from the program.

## Organization

<details>
<summary class="summary">
    Account Properties
</summary>

| Property                    | Type          | Description                                                              |
| --------------------------- | ------------- | ------------------------------------------------------------------------ |
| **pda**                     | **PublicKey** | The program-derived account (PDA) public key.                            |
| **authority**               | **PublicKey** | The wallet owning the organization.                                      |
| **dateCreated**             | **BN**        | The date of creation in seconds.                                         |
| **name**                    | **string**    | The name of the organization.                                            |
| **mainTokenMint**           | **PublicKey** | The main spl token the organization will interact with.                  |
| **enforceWalletUniqueness** | **boolean**   | A flag indicating whether wallet uniqueness is enforced.                 |
| **allowMultiLevel**         | **boolean**   | A flag indicating whether multi-level organization structure is allowed. |

</details>

## Ambassador

<details>
<summary class="summary">
    Account Properties
</summary>

| Property      | Type          | Description                                   |
| ------------- | ------------- | --------------------------------------------- |
| **pda**       | **PublicKey** | The program-derived account (PDA) public key. |
| **authority** | **PublicKey** | The wallet owning the ambassador.             |
| **name**      | **string**    | The name of the ambassador.                   |

</details>

## Member

<details>
<summary class="summary">
    Account Properties
</summary>

| Property                  | Type                    | Description                                                                     |
| ------------------------- | ----------------------- | ------------------------------------------------------------------------------- |
| **pda**                   | **PublicKey**           | The program-derived account (PDA) public key.                                   |
| **referrer**              | **PublicKey**           | The referrer's treasury public key.                                             |
| **owner**                 | **PublicKey**           | The owner's treasury public key.                                                |
| **globalReferrerOfBuddy** | **BuddyGlobalReferrer** | The global referrer of the member.                                              |
| **name**                  | **string**              | The name of the member.                                                         |
| **organization**          | **string**              | The organization name associated with the member.                               |
| **referringMembers**      | **PublicKey[]**         | An array of public keys representing the referring members (maximum length: 4). |

</details>

### Methods

```javascript
async isMemberAvailable(organizationName: string, memberName: string): Promise<boolean>
```

Checks if a member name already is taken under a specific organization.

```javascript
async getReferrer(): Promise<Treasury | null>
```

Retrieves the referrer's treasury associated with the member instance.

```javascript
async getOwner(): Promise<Treasury>
```

Retrieves the owners's treasury associated with the member instance.

```javascript
async getReferringMembers(): Promise<Member[]>
```

Retrieves an array of members that referred the current member.

## Buddy

<details>
<summary class="summary">
    Account Properties
</summary>

| Property                | Type             | Description                                             |
| ----------------------- | ---------------- | ------------------------------------------------------- |
| **pda**                 | **PublicKey**    | The program-derived account (PDA) public key.           |
| **authority**           | **PublicKey**    | The authority public key.                               |
| **buddyType**           | **BuddyType**    | The type of the buddy.                                  |
| **dateCreated**         | **BN**           | The date of creation in seconds.                        |
| **isFrozen**            | **boolean**      | A flag indicating whether the buddy is frozen / minted. |
| **referrerTreasuryPda** | **PublicKey**    | The referrer's treasury public key.                     |
| **referrerType**        | **ReferrerType** | The type of the referrer.                               |
| **name**                | **string**       | The name of the buddy.                                  |

</details>

### Methods

```javascript
async isBuddyAvailable(name: string): Promise<boolean>
```

Checks if a buddy with the specified name exists.

```javascript
async buyGlobalBuddy(buddyName: string): Promise<void>
```

Allows the current buddy to purchase a global buddy.

## Treasury

<details>
<summary class="summary">
    Account Properties
</summary>

| Property               | Type                | Description                                      |
| ---------------------- | ------------------- | ------------------------------------------------ |
| **pda**                | **PublicKey**       | The program-derived account (PDA) public key.    |
| **amountNoMultiLevel** | **BN**              | The amount without multi-level shares.           |
| **totalBps**           | **number**          | BPS amount of multi-level                        |
| **mint**               | **PublicKey**       | The mint public key.                             |
| **owners**             | **TreasuryOwner[]** | An array of owners with their respective shares. |

</details>

### Methods

```javascript
async getOwners(): Promise<Buddy[]>
```

Retrieves an array of buddies who own shares in the treasury.

```javascript
async getClaimableBalance(buddyPDA?: PublicKey): Promise<number>
```

Calculates the claimable balance for the treasury. (Removes rent (for SOL), multi-level take and buddylink fee).

```javascript
async claim(buddyPDA?: PublicKey, isMultiLevel: boolean = true): Promise<void>
```

Allows a buddy to claim their share from the treasury.

```javascript
async transferUp(buddyPDA: PublicKey, treasuryPDA: PublicKey): Promise<void>
```

Permission-less instruction allowing to move the referrer's cut and buddylink fee up a level.
