#![allow(clippy::result_large_err)]

use anchor_lang::prelude::*;

declare_id!("coUnmi3oBUtwtd9fjeAvSsJssXh5A5xyPbhpewyzRVF");

#[program]
pub mod vericred {
    use super::*;

  pub fn close(_ctx: Context<CloseVericred>) -> Result<()> {
    Ok(())
  }

  pub fn decrement(ctx: Context<Update>) -> Result<()> {
    ctx.accounts.vericred.count = ctx.accounts.vericred.count.checked_sub(1).unwrap();
    Ok(())
  }

  pub fn increment(ctx: Context<Update>) -> Result<()> {
    ctx.accounts.vericred.count = ctx.accounts.vericred.count.checked_add(1).unwrap();
    Ok(())
  }

  pub fn initialize(_ctx: Context<InitializeVericred>) -> Result<()> {
    Ok(())
  }

  pub fn set(ctx: Context<Update>, value: u8) -> Result<()> {
    ctx.accounts.vericred.count = value.clone();
    Ok(())
  }
}

#[derive(Accounts)]
pub struct InitializeVericred<'info> {
  #[account(mut)]
  pub payer: Signer<'info>,

  #[account(
  init,
  space = 8 + Vericred::INIT_SPACE,
  payer = payer
  )]
  pub vericred: Account<'info, Vericred>,
  pub system_program: Program<'info, System>,
}
#[derive(Accounts)]
pub struct CloseVericred<'info> {
  #[account(mut)]
  pub payer: Signer<'info>,

  #[account(
  mut,
  close = payer, // close account and return lamports to payer
  )]
  pub vericred: Account<'info, Vericred>,
}

#[derive(Accounts)]
pub struct Update<'info> {
  #[account(mut)]
  pub vericred: Account<'info, Vericred>,
}

#[account]
#[derive(InitSpace)]
pub struct Vericred {
  count: u8,
}
