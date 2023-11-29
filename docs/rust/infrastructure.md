---
sidebar_position: 2
---

# Infrastructure

Learning about the relationship between accounts is important in understanding how they interact with each other and why some actions are necessary. This section provides insights into:

- [Buddies](#buddies)
- [Unique Treasuries](#global-buddies)
- [Shared Treasuries](#treasuries)
- [Organizations](#organizations)
- [Members](#members)
- [How referral works?](#how-referral-works)

## Buddies

At the root of all users coming into the system there are global buddies and more specifically buddy profiles. Once a wallet interacts with the system, it requires you to create a buddy profile which is unique to every user (ie. their name is a random string of 18 characters) and isn't linked to any organization (See [Organizations](/) below). In turn, a buddy can also own other buddies (ie. global buddies) to obtain vanity names that can be used across all participating organizations.

### Global buddies

By obtaining a global buddy, the user locks in the name across all participating organizations unless the name was used before. For example, I get the buddy called "john" and now i create all the members i want with the name "john". In the buddy app, you will be prompted to create these members and choose alternatives if that name has been taking before you created the global buddy "john".

<img src="/img/buddy-infra.png" alt="buddylink diagram of the buddy structure" />

## Treasuries

In order to store funds received from your referrees, these treasuries are created on a mint per mint basis (ie. 1 treasury for SOL, 1 treasury for USDC, etc.) but also unique per buddies.

In a simple scenario, a member does an action which rewards the referrer in some way. The program will do a transfer to the treasury instantly after that transaction is performed. Once the funds are received, the referrer can immediately claim the amount.

<img src="/img/treasury-infra.png" alt="buddylink diagram of the treasury structure" />

## Shared treasuries

A more sophisticated way of doing attribution is through shared treasuries. It allows to share a referral with others by splitting the rewards amongst many.

<img src="/img/shared-treasury-infra.png" alt="buddylink diagram of the shared treasury structure" />

## Organizations

A company wanting to offer referral rewards creates an organization which lets you to keep track of the attribution "tree" within its own organzation. The organization can also choose to participate in the global system or be its own cluster (ie. not allow name locking from global buddies).

<img src="/img/organization-infra.png" alt="buddylink diagram of the member structure" />

## Members

To associate a user to an organization, you create a member which is used for creating attribution with others within the organization and allow for validating reward transfers to referrers.

<img src="/img/member-infra.png" alt="buddylink diagram of the member structure" />

## How referral works

Depending on the application that is currently being used you can either refer someone through an organization or through the buddylink global system. The member route allows for more tracking and analytics to your specific organization but going with global buddy is more to integrate the buddylink system itself and not the referral component which can bring other sort of benefits (See [Roadmap](/) for more information).

_\*Comprehensive explanations and examples coming soon_

<!-- ### Referring global buddies

When you refer someone to the buddylink platform, you also get attribution for bringing them into the system and benefit from them using the system. Assume the following the steps follow each other.

#### 1. Simple attribution

In this example, _Buddy John_ just created a buddy profile and refers someone else to the platform. This user creates _Buddy Jane_ and now the link is made between the two. _Buddy Jane_ buys an NFT and according to the referral promotion she gets 5% off fees for being referred and _Buddy John_ gets 25% of the remaining referral fee. The transfer is done instantly during the purchase and sent to _Buddy John_

#### 2. Multi-level attribution

_Buddy Jane_ now decides to also invite people. _Buddy Max_ is now a new buddy under _Buddy Jane_........

#### 3. Multi-attribution

### Referring members

Lets run through a couple scenarios -->
