---
sidebar_position: 1
---

# Create your Profile

**API Path:** `https://actions.buddy.link/api/actions/join`

**Preview Link:** https://dial.to/?action=solana-action%3Ahttps%3A%2F%2Factions.buddy.link%2Fapi%2Factions%2Fjoin%3Fref%3Dhmsxibyuyl0p6017on

![alt text](@site/static/img/blink-create.png)

## Parameters:
- (optional) `ref` is the PROFILE referral string of the wallet for this organization (which is their profile name, in this example 'hmsxibyuyl0p6017on')
- (optional) `refwallet` is the WALLET of the referrer, which can be provided instead of the `ref` string. These will be combined in a future release.

## Behaviour:
- Creates a profile and one or more treasuries if required
- Attributes referral to the refcode or refwallet provided, if one exists
