#![allow(warnings)]
#![allow(clippy::result_large_err)]

use anchor_lang::prelude::*;

declare_id!("BUnZHEsqHYAnE2k4qiEA93VXcMNqPz9a2e2tYjWct6AH");

#[program]
pub mod test {
    use super::*;



  pub fn initialize(ctx: Context<InitializeTest>,CID:String) -> Result<()> {
    ctx.accounts.test.CID=CID;
    Ok(())
  }
}

#[derive(Accounts)]
pub struct InitializeTest<'info> {
  #[account(mut)]
  pub payer: Signer<'info>,

  #[account(
  init,
  space = 8 + Test::INIT_SPACE,
  payer = payer
  )]
  pub test: Account<'info, Test>,
  pub system_program: Program<'info, System>,
}
#[derive(Accounts)]
pub struct CloseTest<'info> {
  #[account(mut)]
  pub payer: Signer<'info>,

  #[account(
  mut,
  close = payer, // close account and return lamports to payer
  )]
  pub test: Account<'info, Test>,
}

#[derive(Accounts)]
pub struct Update<'info> {
  #[account(mut)]
  pub test: Account<'info, Test>,
}

#[account]
#[derive(InitSpace)]
pub struct Test {
  #[max_len(100)]
  CID:String,
}
