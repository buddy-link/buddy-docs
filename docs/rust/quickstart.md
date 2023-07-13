---
sidebar_position: 1
---

import Tabs from "@theme/Tabs";
import TabItem from "@theme/TabItem";

# Quick Start



## Program IDs

<Tabs>
    <TabItem value="mainnet" label="Mainnet-Beta">

```rust
use solana_program::pubkey;
use solana_program::pubkey::Pubkey;

pub const BUDDY_LINK_PROGRAM_ID: Pubkey = pubkey!("BUDDYtQp7Di1xfojiCSVDksiYLQx511DPdj2nbtG9Yu5");

```
</TabItem>
<TabItem value="devnet" label="Devnet">

```rust
use solana_program::pubkey;
use solana_program::pubkey::Pubkey;

pub const BUDDY_LINK_PROGRAM_ID: Pubkey = pubkey!("9zE4EQ5tJbEeMYwtS2w8KrSHTtTW4UPqwfbBSEkUrNCA");
 
```
</TabItem>
</Tabs>

## Usage

- Functions will show the different ways to use the buddy link CPIs.

- The use cases will show examples for different type of projects and different flows that are possible depending on how you want to
design the integration.