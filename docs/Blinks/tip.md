---
sidebar_position: 5
---

# Send Tips/Donations

This blink allows you to send a tip or donation to a wallet's treasuries or directly with text-search for any token name or address.

**API Path:** `https://actions.buddy.link/api/actions/tip`

**Preview Link:** https://dial.to/?action=solana-action%3Ahttps%3A%2F%2Factions.buddy.link%2Fapi%2Factions%2Ftip%3Fsendto%3DHee5dhEmNToekzuaKVHyejYVCc6bz7BneGh1YhsvA9rw

![alt text](@site/static/img/blink-tip.png)

## Parameters:
- `sendto` is the wallet address that is receiving the tips
- (optional) `mint` can be provided to set the default token to tip/donate if no value entered.
- (optional) `org` can be provided to attribute the treasury claim to a specific organization, reducing the user's accumulated earning appropriately
- (optional) `skiptreasury` can be provided to force sending directly to token accounts for the receiver instead of sending to treasury accounts

## Behaviour:
- This blink sends a tip to the wallet specified in the URL in any token, either to their token treasury or directly to a token account
