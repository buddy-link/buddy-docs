---
sidebar_position: 2
---


# Transfer without pre-validation

This is the case when you **don't want** to use the [validate_referrer](../functions/validate) at all. This means that you will be using the *secure* version of the transfer instruction. The first and only step is the transfer instruction to be called.

**What is needed for this use case**

4. ~80k leftover compute budget for the transfer CPI call

**When is it a good idea to use this**?

1. If your program doesn't have a notion of "user" or you don't have any space left in your accounts to save the referrer's information on successful validation.
2. If where the transfer CPI will happen there is compute budget available (~70k), then this function can be used.

**Type of product that would benefit**?

1. NFT lending platforms