---
sidebar_position: 2
---

# Join an Organization

Joining an Organization is also known as "accepting a referral invite"

**API Path:** `https://actions.buddy.link/api/actions/join?org=staratlas`

**Preview Link:** https://dial.to/?action=solana-action%3Ahttps%3A%2F%2Factions.buddy.link%2Fapi%2Factions%2Fjoin%3Forg%3Dstaratlas%26ref%3Dnv4u0y9obef3ajp5

![alt text](@site/static/img/blink-join.png)

## Parameters:
- `org` is the organization string to indicate which rewards program to join
- (optional) `ref` is the MEMBER referral string of the wallet for this organization (which is their member name, in this example 'nv4u0y9obef3ajp5')
- (optional) `refwallet` is the WALLET of the referrer, which can be provided instead of the `ref` string. These will be combined in a future release.

## Behaviour:
- Creates a profile and one or more treasuries if required
- Creates a member account for the selected organization
- Attributes referral to the refcode or refwallet provided, if one exists
