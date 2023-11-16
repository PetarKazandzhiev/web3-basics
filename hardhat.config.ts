import { HardhatUserConfig, task } from 'hardhat/config';
import '@nomicfoundation/hardhat-toolbox';
require('dotenv').config();

const lazyImport = async (module: any) => {
  return await import(module);
};

task('deploy', 'Deploys contracts').setAction(async () => {
  const { main } = await lazyImport('./scripts/deploy');
  await main();
});

const config: HardhatUserConfig = {
  solidity: {
    compilers: [
      {
        version: '0.8.19',
        settings: {
          optimizer: {
            enabled: true,
            runs: 200,
          },
        },
      },
    ],
  },
  networks: {
    sepolia: {
      url: `https://sepolia.infura.io/v3/${process.env.INFURA_KEY}`,
      chainId: 11155111,
      accounts: [`0x${process.env.SEPOLIA_PRIVATE_KEY}`],
    },
    mumbai: {
      url: `https://polygon-mumbai.infura.io/v3/${process.env.INFURA_KEY}`,
      chainId: 80001,
      accounts: [`0x${process.env.MUMBAI_PRIVATE_KEY}`],
    },
  },
};

export default config;
