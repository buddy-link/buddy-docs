---
sidebar_position: 2
---

import Tabs from "@theme/Tabs";
import TabItem from "@theme/TabItem";

# Transfer

There are many different versions of the transfer instruction that can be used (contact the team if you want more details).

The main 2 types are the ones that will be *unchecked* which means we don't really do any validations of the Accounts on the BuddyLink program and the *secure* one which means we do all the required checks.

**TLDR**

- You should use the *unchecked* transfer if you already validated the referral accounts via the [validate_referrer](validate) function.
- You should use the *secure* one if you did not validate anything beforehand.

## Code

### Rust

<Tabs>
    <TabItem value="unchecked" label="Unchecked">

Instruction (Anchor)
```rust
#[account]
pub struct UserAccount
{
  pub referrer: Pubkey,
  pub referrer_member: Pubkey, //optional if you want on-chain analytics
}

#[derive(Accounts)]
pub struct TransferRewardReferrer<'info>
{
  #[account(mut)]
  pub authority: Signer<'info>,

  #[account()]
  pub user_account: Account<'info, UserAccount>,

  /// If using SPL for reward, should be present
  #[account()]
  pub mint: Option<Account<'info, Mint>>,

  #[account(mut)]
  pub from_token_account: Option<Account<'info, TokenAccount>>,

  pub token_program: Program<'info, Token>,
}

pub fn transfer_reward_referrer(ctx: Context<TransferRewardReferrer>, amount: u64) -> Result<()>
{
  if !transfer_reward_to_referrer(
    &ctx.accounts.authority.to_account_info(),
    &ctx.accounts.user_account.referrer,
    &ctx.accounts.user_account.referrer_member,
    amount,
    &ctx.remaining_accounts,
    &ctx.accounts.token_program.to_account_info(),
    &ctx.accounts.from_token_account.to_account_info(),
  ) {
    return Err(error!(InvalidReferralProvided));
  }
  
  Ok(())
}

```

#### Utility function to transfer reward to referrer
```rust
pub fn transfer_reward_to_referrers<'info>(
  authority: &AccountInfo<'info>,
  referrer: &Pubkey,
  referrer_member: &Pubkey,
  amount: u64,
  remaining_accounts: &[AccountInfo<'info>],
  token_program: &AccountInfo<'info>,
  from_account: &AccountInfo<'info>,
) -> bool {
  /*
  Remaining accounts

  -Buddy Link Program
  -Mint
  -Referrer treasury or token account
  -Referrer member (optional for on-chain analytics)
   */

  if remaining_accounts.len() != 3 { //or 4 if using on-chain analytics
    return false;
  }
  
  if *referrer != remaining_accounts[2].key() {
    return false;
  }

  //optional for on-chain analytics
  if *referrer_member != remaining_accounts[3].key() {
      return false;
  }

  let buddy_link_program = remaining_accounts[0].to_account_info();

  if buddy_link_program.key() != BUDDY_LINK_PROGRAM_ID {
    return false;
  }

  let mut accounts_metas = vec![
    AccountMeta::new(authority.key(), true),
    AccountMeta::new_readonly(buddy_link_program.key(), false), //System program (not null if SOL, else null so program id of Buddylink)
    AccountMeta::new_readonly(remaining_accounts[1].key(), false), //Mint, if for SOL, send default public key
    AccountMeta::new_readonly(token_program.key(), false), //Token program
    AccountMeta::new(from_account.key(), false),
    AccountMeta::new(remaining_accounts[2].key(), false), //Referrer treasury or token account
    AccountMeta::new(remaining_accounts[3].key(), false), //Referrer member (optional)
  ];

  let mut account_infos = vec![
    authority.to_account_info(),
    buddy_link_program.to_account_info(),
    remaining_accounts[1].to_account_info(), 
    token_program.to_account_info(),
    from_account.to_account_info(),
    remaining_accounts[2].to_account_info(),
    remaining_accounts[3].to_account_info(), //Optional
  ];

  let mut instruction_data: Vec<u8> = vec![];

  instruction_data.extend_from_slice(&hash("global:transfer_reward_unchecked_multiple".as_bytes()).to_bytes()[..8]);
  instruction_data.extend_from_slice(&amount.try_to_vec().unwrap());
  instruction_data.extend_from_slice(&vec![10_000].try_to_vec().unwrap());

  let instruction = Instruction {
    program_id: buddy_link_program.key(),
    accounts: accounts_metas,
    data: instruction_data,
  };

  invoke(
    &instruction,
    &account_infos,
  ).expect("Error transferring reward to referrer");

  true
}
```

#### This how you would call it from your frontend

This is an example function of how you would get all the remaining accounts required for the validate_referrer BuddyLink CPI call

```javascript
async function getRemainingAccounts(wallet: PublicKey, mint: PublicKey) {
    if (!client) throw new Error("Client not set");

    const buddyProfile = await client.buddy.getProfile(wallet);
    if (!buddyProfile) return [];

    const treasuryPDA = client.pda.getTreasuryPDA(
        [buddyProfile.account.pda],
        [10_000],
        organization.account.mainTokenMint
    );

    const member =
        (await client.member.getByTreasuryOwner(treasuryPDA))[0] || null;

    if (!member) return [];

    const remainingAccounts =
        await client.initialize.validateReferrerAccounts(
            mint,
            member.account.pda
        );

    if (
        remainingAccounts.memberPDA.toString() === PublicKey.default.toString()
    ) {
        return [];
    }

    return [
        {
            pubkey: remainingAccounts.programId,
            isWritable: false,
            isSigner: false,
        },
        {
            pubkey: remainingAccounts.mint,
            isWritable: false,
            isSigner: false,
        },
        ...(remainingAccounts.mint ? {
            pubkey: remainingAccounts.referrerATA,
            isWritable: false,
            isSigner: false,
        } : {
            pubkey: remainingAccounts.referrerTreasury,
            isWritable: false,
            isSigner: false,
        }),
        {
            pubkey: remainingAccounts.referrerMember,
            isWritable: true,
            isSigner: false,
        },
    ];
}
```

</TabItem>
    
    <TabItem value="secure" label="Secure">

Instruction (Anchor)
```rust
#[derive(Accounts)]
pub struct TransferRewardReferrer<'info>
{
  #[account(mut)]
  pub authority: Signer<'info>,
}

pub fn transfer_reward_referrer(ctx: Context<TransferRewardReferrer>, amount: u64) -> Result<()>
{
  if !transfer_reward_to_referrer(
    &ctx.accounts.authority.to_account_info(),
    amount,
    &ctx.remaining_accounts,
  ) {
    return Err(error!(InvalidReferralProvided));
  }
  
  Ok(())
}

```

#### Utility function to transfer reward to referrer
```rust
pub fn transfer_reward_to_referrer<'info>(
  authority: &AccountInfo<'info>,
  amount: u64,
  remaining_accounts: &[AccountInfo<'info>],
) -> bool {
  /*
  Remaining accounts

  -Buddy Link Program
  -Authority
  -Referrer
  -Referrer treasury  
  -Buddy profile
  -Buddy
  -Member
  -Buddy treasury
  
  Nullable
  
  -System program
  -Mint
  -Token program
  -From token account
  -Referrer token account
   */

  if remaining_accounts.len() != 12 {
    return false;
  }
    
  let buddy_link_program = remaining_accounts[0].to_account_info();

  if buddy_link_program.key() != BUDDY_LINK_PROGRAM_ID {
    return false;
  }

  let accounts_metas = remaining_accounts
      .iter()
      .map(|account| AccountMeta {
          pubkey: account.key(),
          is_signer: account.is_signer,
          is_writable: account.is_writable,
      })
      .collect::<Vec<AccountMeta>>();

  let mut instruction_data: Vec<u8> = vec![];

  instruction_data.extend_from_slice(&hash("global:transfer_reward_secure".as_bytes()).to_bytes()[..8]);
  instruction_data.extend_from_slice(&amount.try_to_vec().unwrap());

  let instruction = Instruction {
    program_id: buddy_link_program.key(),
    accounts: accounts_metas,
    data: instruction_data,
  };

  invoke(
    &instruction,
    &remaining_accounts,
  ).expect("Error transferring reward to referrer");

  true
}
```

#### This how you would call it from your frontend

This is an example function of how you would get all the remaining accounts required for the validate_referrer BuddyLink CPI call

```javascript
async function getRemainingAccounts(wallet: PublicKey, mint: PublicKey) {
    if (!client) throw new Error("Client not set");

    const buddyProfile = await client.buddy.getProfile(wallet);
    if (!buddyProfile) return [];

    const treasuryPDA = client.pda.getTreasuryPDA(
        [buddyProfile.account.pda],
        [10_000],
        organization.account.mainTokenMint
    );

    const member =
        (await client.member.getByTreasuryOwner(treasuryPDA))[0] || null;

    if (!member) return [];

    const remainingAccounts =
        await client.initialize.validateReferrerAccounts(
            mint,
            member.account.pda
        );

    if (
        remainingAccounts.memberPDA.toString() === PublicKey.default.toString()
    ) {
        return [];
    }

    return [
        {
            pubkey: remainingAccounts.programId,
            isWritable: false,
            isSigner: false,
        },
        {
            pubkey: wallet,
            isWritable: true,
            isSigner: true,
        },
        {
            pubkey: remainingAccounts.referrer,
            isWritable: false,
            isSigner: false,
        },
        {
            pubkey: remainingAccounts.referrerTreasury,
            isWritable: false,
            isSigner: false,
        },
        {
            pubkey: remainingAccounts.buddyProfile,
            isWritable: false,
            isSigner: false,
        },
        {
            pubkey: remainingAccounts.buddy,
            isWritable: false,
            isSigner: false,
        },
        {
            pubkey: remainingAccounts.memberPDA,
            isWritable: false,
            isSigner: false,
        },
        {
            pubkey: remainingAccounts.buddyTreasury,
            isWritable: false,
            isSigner: false,
        },
        {
            pubkey: SystemProgram.programId,
            isWritable: false,
            isSigner: false,
        },
        {
            pubkey: remainingAccounts.mint,
            isWritable: false,
            isSigner: false,
        },
        {
            pubkey: TOKEN_PROGRAM_ID,
            isWritable: false,
            isSigner: false,
        },
        {
            pubkey: new PublicKey(""), //Where the tokens are taken from
            isWritable: true,
            isSigner: false,
        },
        {
            pubkey: remainingAccounts.referrerATA,
            isWritable: false,
            isSigner: false,
        },
    ];
}
```

</TabItem>
</Tabs>
