---
sidebar_position: 1
---


# Transfer with pre-validation 

This is the case when you want to use the [validate_referrer](../functions/validate) function on creation of the referee's account. If the validation succeeds, then you need to save that referrer public key (and optionally referrer member to use on-chain analytics) on an account so that you can validate later when a transfer needs to happen. Last step being you [unchecked_transfer](../functions/transfer) making sure the passed referrer's account's key (and optionally referrer's member key) is equal to the one previously saved.

**What is needed for this use case**

1. An account or database where you can save the referrer's public key (and optionally referrer member's key) after a successful validation
2. 2 different CPI calls minimum (one for the validation and one for the transfer of the reward)
3. ~70k leftover compute budget for the validation CPI call
4. ~40k leftover compute budget for the transfer CPI call

**When is it a good idea to use this**?

1. If in your program there is already a notion of user account, then it's easy to add a public key for the referrer to it (or 2 if you want on-chain analytics), then the validation only needs to happen once and then you can transfer (lighter than the secure) any number of times you want.
2. If where the transfer CPI will happen there is not that much compute budget available (~70k), then better to use the unchecked version since it uses way less compute.

**Type of product that would benefit**?

1. Tax reporting programs