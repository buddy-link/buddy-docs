---
sidebar_position: 3
---

# Create a Treasury

This blink allows you to create a treasury with text-search for any token name or address.

**API Path:** `https://actions.buddy.link/api/actions/treasury`

**Preview Link:** https://dial.to/?action=solana-action%3Ahttps%3A%2F%2Factions.buddy.link%2Fapi%2Factions%2Ftreasury

![alt text](@site/static/img/blink-treasury.png)

## Parameters:
- (optional) `mint` can be provided to set a default treasury to create if no value entered.

## Behaviour:
- This blink creates a treasury for the selected mint for the current wallet
- If the wallet has no profile, it also sets up their profile account
- If no mint is entered, it uses the default 'mint' provided, and if that doesn't exist it creates a SOL treasury
- If the treasury already exists, shows an error to user that it already exists
