import { ethers } from 'hardhat';

export async function main() {
  const currentTimestampInSeconds = Math.round(Date.now() / 1000);
  const ONE_YEAR_IN_SECS = 365 * 24 * 60 * 60;
  //const unlockTime = currentTimestampInSeconds + ONE_YEAR_IN_SECS;
  const unlockTime = currentTimestampInSeconds + 60;

  const lockedAmount = ethers.parseEther('0.001');

  //const Lock = await ethers.getContractFactory('Lock');
  const lock = await ethers.deployContract('Lock', [unlockTime], {
    value: lockedAmount,
  });

  await lock.waitForDeployment();

  console.log(
    `Lock with 0.001 ETH and unlock timestamp ${unlockTime} deployed to ${await lock.getAddress()}`
  );
}
