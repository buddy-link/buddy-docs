---
sidebar_position: 4
---

# Claim Rewards

This blink allows you to claim rewards from a treasury with text-search for any token name or address.

**API Path:** `https://actions.buddy.link/api/actions/claim`

**Preview Link:** https://dial.to/?action=solana-action%3Ahttps%3A%2F%2Factions.buddy.link%2Fapi%2Factions%2Fclaim

![alt text](@site/static/img/blink-claim.png)

## Parameters:
- (optional) `mint` can be provided to set a default treasury to claim if no value entered.

## Behaviour:
- This blink claims from the treasury of the mint entered for the current wallet
- If the wallet has no profile or treasury, it warns the user and cancels the claim attempt
- If no mint is entered, it uses the default 'mint' provided, and if that doesn't exist it claims their SOL treasury
