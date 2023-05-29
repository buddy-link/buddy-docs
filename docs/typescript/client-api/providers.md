---
sidebar_position: 1
---

# Providers

Providers are used to retrieve accounts for specific purposes in a more dynamic and flexible manner.

## Organization

Allows you to retrieve an [organization](/) account to access its configuration information and more

```javascript
client.organization.getByPDA(organizationPDA);
client.organization.getByName(organizationName);
client.organization.getByWallet(wallet);
```

## Ambassador

Allows you to retrieve an [ambassador](/) account to access all the readable data of account

```javascript
client.ambassador.getByOrganizationPDA(organization); // Organization object
client.ambassador.getByPDA(ambassadorPDA);
client.ambassador.getByName(ambassadorName);
```

## Member

Allows you to retrieve an [member](/) account to access all the readable data of account

```javascript
client.member.getByPDA(memberPDA);
client.member.getByName(memberName);
client.member.getByTreasuryOwner(treasuryPDA);
client.member.getByTreasuryReferrer(treasuryPDA);
```

## Buddy

```javascript
client.buddy.getByPDA(buddyPDA);
client.buddy.getByName(buddyName);
client.buddy.getAllByProfile(buddyProfilePDA);
client.buddy.getProfile(wallet);
```

## Treasury

```javascript
client.buddy.getByPDA(treasuryPDA);
client.buddy.getByBuddyName(buddyName, mint);
client.buddy.getByOwner(buddyPDA, mint);
client.buddy.getByOwners([buddy1PDA, buddy2PDA], [share1, share2], mint);
client.buddy.getByOwnerNames([buddy1Name, buddy2Name], [share1, share2], mint);
client.buddy.getByBuddy(buddy, mint);
client.buddy.getAllByBuddy(buddyPDA);
client.buddy.getAllSimpleByBuddy(buddyPDA);
```
