import { time, loadFixture } from '@nomicfoundation/hardhat-network-helpers';
import { expect } from 'chai';
import { ethers } from 'hardhat';

describe('Background', function () {
  // We define a fixture to reuse the same setup in every test.
  // We use loadFixture to run this setup once, snapshot that state,
  // and reset Hardhat Network to that snapshot in every test.
  async function deployBackgroundContract() {
    const ONE_YEAR_IN_SECS = 365 * 24 * 60 * 60;
    const ONE_GWEI = 1_000_000_000;

    const amountForLock = ONE_GWEI;
    const unlockTime = (await time.latest()) + ONE_YEAR_IN_SECS;

    // Contracts are deployed using the first signer/account by default
    const [owner, otherAccount] = await ethers.getSigners();

    const Background = await ethers.getContractFactory('Background');
    const background = await Background.deploy();

    return { background, unlockTime, amountForLock, owner, otherAccount };
  }

  describe('Deployment of Lock contract through Background contract', function () {
    it('Should deploy Lock by calling Background deployAndLockFunds func', async function () {
      const { background, unlockTime, amountForLock } = await loadFixture(
        deployBackgroundContract
      );

      const tx = await background.deployAndLockFunds(unlockTime, {
        value: amountForLock,
      });

      const lockAddress = await background.locks(0);
      const Lock = await ethers.getContractFactory('Lock');
      const lock = Lock.attach(lockAddress);

      expect(await lock.owner()).to.equal(background.address);
      expect(await lock.unlockTime()).to.equal(unlockTime);
    });
  });
});
