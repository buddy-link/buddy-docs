---
sidebar_position: 1
---

# Validate

The validate function is a CPI call that will return an error if the information provided isn't valid.

The validate referrer function validates that the referrer that you send (either the treasury or the token account if a mint is present), is the referrer (within your organization) of the wallet of the user that is currently using your website.

**There the steps are the following**
1. You send the proper remaining accounts using our Buddy SDK
2. Within your instruction you CPI call buddy link to validate the accounts passed
3. If there is an error from the CPI, error back to the caller because the accounts passed for the referral program are invalid.
4. If there is a success, then you save the referrer's information on the Account of the user, so when a transfer is required, you can validate against if the destination for the reward is the correct one.

## Code

### Rust

#### Instruction (Anchor)
```rust
#[account]
pub struct UserAccount
{
  pub referrer: Pubkey,
}

#[derive(Accounts)]
pub struct ReferUser<'info>
{
    #[account(mut)]
    pub authority: Signer<'info>,

    #[account(init, payer = authority, space = 40)]
    pub user_account: Account<'info, UserAccount>,
  
    #[account()]
    pub referrer: UncheckedAccount<'info>,
}

pub fn refer_user(ctx: Context<ReferUser>) -> Result<()>
{
  let user_account = &mut ctx.accounts.user_account;
  
  let mut referrer_key = ctx.accounts.referrer.key();
  
  match validate_referrer(&ctx.accounts.authority, &ctx.accounts.authority, &ctx.remaining_accounts) {
    Some(parsed_referrer_key) => referrer = parsed_referrer_key,
    _ => return Err(error!(InvalidReferralProvided)),
  }

  user_account.referrer = referrer_key;

  Ok(())
}

```

#### Utility function to validate your referrer
```rust
pub fn validate_referrer<'info>(
  payer: &AccountInfo<'info>,
  authority: &AccountInfo<'info>,
  remaining_accounts: &[AccountInfo<'info>],
) -> Option<Pubkey> {
  /*
  Remaining accounts

  Buddy link program
  Buddy profile
  Buddy
  Buddy treasury
  Member
  Referrer treasury
  Referrer treasury reward

  Optional:
  Mint
  Referrer token account
   */

  let remaining_account_length = remaining_accounts.len();
  if remaining_account_length != 7 && remaining_account_length != 9 {
    return None;
  }

  let buddy_link_program = remaining_accounts[0].to_account_info();

  if buddy_link_program.key() != BUDDY_LINK_PROGRAM_ID {
    return None;
  }
  
  let other_remaining_accounts = &remaining_accounts[1..];

  let mut account_metas = vec![
    AccountMeta::new(payer.key(), true),
    AccountMeta::new_readonly(authority.key(), false),
  ];

  account_metas.extend_from_slice(
    &other_remaining_accounts
            .iter()
            .map(|account| AccountMeta {
              pubkey: account.key(),
              is_signer: account.is_signer,
              is_writable: account.is_writable,
            })
            .collect::<Vec<AccountMeta>>()
  );

  let mut account_infos = vec![
    payer.to_account_info(),
    authority.to_account_info(),
  ];

  account_infos.extend_from_slice(&other_remaining_accounts);

  let mut instruction_data: Vec<u8> = vec![];
  instruction_data.extend_from_slice(&hash("global:validate_referrer".as_bytes()).to_bytes()[..8]);

  let instruction = Instruction {
    program_id: buddy_link_program.key(),
    accounts: account_metas,
    data: instruction_data,
  };

  invoke(
    &instruction,
    &account_infos,
  ).expect("Error validating referrer");

  Some(if remaining_account_length == 5 {
    remaining_accounts[5].key() //the treasury pda (if no spl, a.k.a. sol)
  } else {
    remaining_accounts[7].key() //the token account
  })
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
          pubkey: remainingAccounts.buddyTreasury,
          isWritable: false,
          isSigner: false,
        },
        {
          pubkey: remainingAccounts.memberPDA,
          isWritable: false,
          isSigner: false,
        },
        {
          pubkey: remainingAccounts.referrerTreasury,
          isWritable: false,
          isSigner: false,
        },
        {
          pubkey: remainingAccounts.referrerTreasuryReward,
          isWritable: false,
          isSigner: false,
        },
        {
          pubkey: remainingAccounts.mint,
          isWritable: false,
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