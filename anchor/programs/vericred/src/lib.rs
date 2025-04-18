#![allow(warnings)]
#![allow(clippy::result_large_err)]

use anchor_lang::prelude::*;

declare_id!("coUnmi3oBUtwtd9fjeAvSsJssXh5A5xyPbhpewyzRVF");

#[program]
pub mod vericred {
    use super::*;

  pub fn initialize(ctx: Context<InitializeVericred>,CID:String) -> Result<()> {
    ctx.accounts.vericred.CID=CID;
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

#[account]
#[derive(InitSpace)]
pub struct Vericred {
  #[max_len(100)]
  CID:String

}
