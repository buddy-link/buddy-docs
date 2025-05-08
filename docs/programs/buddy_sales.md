---
sidebar_position: 1
---

# Buddy Sales

[![npm version](https://badge.fury.io/js/buddy.pay.svg)](https://badge.fury.io/js/buddy.pay)
![NPM License](https://img.shields.io/npm/l/buddy.pay)

## About
This program acts as a generic "events contract" that allows anyone to define an onchain purchase in terms of quantity, quantity-per-wallet, price, start-time and end-time. Anyone can then make purchases for a minimal fee and the definitions can be updated over time to close sales early, adjust prices for different phases, or various other scenarios. This is functionality needed to support large areas of online purchases, event ticketing, and more.

## SDK LINK

//TODO: Add NPM package link here

## Example Configurations

| Scenario | Details | Config |
| --- | --- | --- |
| Event Tickets | Total Tickets Available: 1,000<br/>Tickets Per Person: 4<br/>Ticket Price: 39 USDC<br/>(29 USDC earlybird price) | totalForSale: 100,<br/>maxPerWallet: 4<br/>mint: USDC<br/>price: 29 * decimals<br/>startTime: null<br/>endTime: null<br/>(after earlybird ends, price is updated to 39 USDC) |
| Raffle Tickets | Total Tickets Available: unlimited<br/>Tickets Per Person: unlimited<br/>Ticket Price: 0.01 SOL | totalForSale: null,<br/>maxPerWallet: null<br/>mint: null<br/>price: 10_000_000 (0.01 * 9 decimals)<br/>startTime: null<br/>endTime: (unix timestamp for YYYY-MM-31 23:59:59) |
| Selling a custom service | Total Tickets Available: unlimited<br/>Tickets Per Person: unlimited<br/>Ticket Price: 1.5 SOL | totalForSale: null,<br/>maxPerWallet: null<br/>price: 1_500_000_000 (1.5 * 9 decimals)<br/>mint: null<br/>startTime: null<br/>endTime: null |
| Selling 50 physical hoodies | Total Tickets Available: 50<br/>Tickets Per Person: 1<br/>Ticket Price: 0.75 SOL | totalForSale: 50,<br/>maxPerWallet: 1<br/>price: 750_000_000 (0.75 * 9 decimals)<br/>mint: null<br/>startTime: null<br/>endTime: null |
| Offering 10 commissioned paintings this month | Total Tickets Available: 10<br/>Tickets Per Person: 1<br/>Ticket Price: 499 USDC | totalForSale: 10,<br/>maxPerWallet: 1<br/>price: 499 * decimals<br/>mint: USDC<br/>startTime: (unix timestamp for YYYY-MM-01 00:00:00)<br/>endTime: (unix timestamp for YYYY-MM-31 23:59:59) |