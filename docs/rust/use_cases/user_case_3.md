---
sidebar_position: 3
---


# Transfer only when requested

This is the case when you **don't want** to do the transfer CPI everytime your referrer receives rewards, but only when he requests them. This can be done via the validate/unchecked transfer flow or the secure transfer flow. The only difference is that the transfer instructions are actually CPI called by a new instruction that you add on your program to claim pending rewards. Obviously this needs validation, but can easily be done permissionless.

**What is needed for this use case**

1. An account where the referrer's pending reward can be saved (usually u64 is fine)
2. The instructions that generate referral reward needs access to the account created at #1
3. Creation of a new instruction to claim their rewards

**When is it a good idea to use this**?

1. If your program does a lot of actions that generate referrer rewards (only need to change a u64 instead of doing a CPI)
2. If you want to keep the liquidity of your platform for a longer time (liquidity will only leave when referrers claim)

**Type of product that would benefit**?

1. Futures / Perpetuals / Options programs
2. Staking programs
3. Liquidity mining programs

## Code

### Rust

#### Instruction (Anchor)
```rust
#[derive(Accounts)]
pub struct ClaimRewards<'info> {
    pub authority: Signer<'info>,

    #[account()]
    pub referee_account: Account<'info, RefereeAccount>,
    
    #[account(
    //Make sure referrer account is the one linked to the referee
    )]
    pub referrer_account: Account<'info, ReferrerAccount>,
     
    /*
     Other needed accounts (make sure they belong to the referrer)
      */
}

pub fn claim_rewards(ctx: Context<ClaimRewards>) -> Result<()> {
    let referee_account = &mut ctx.accounts.referee_account;
    
    let pending_rewards = referee_account.pending_rewards;

    transfer_reward_to_referrer(
        pending_rewards,
        /*
        other params
         */
    );

    referee_account.pending_rewards = 0;
    
    Ok(())
}

```