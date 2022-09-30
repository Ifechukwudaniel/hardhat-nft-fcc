const { assert } = require("chai");
const { network, getNamedAccounts, deployments, ethers } = require("hardhat");
const { developmentChains, nftUrl } = require("../../helper-hardhat-config");

!developmentChains.includes(network.name)
  ? describe.skip
  : describe("Basic NFT", () => {
      let deployer, basicNft;
      beforeEach(async () => {
        deployer = await getNamedAccounts().deployer;
        await deployments.fixture(["basicNft"]);
        basicNft = await ethers.getContract("BasicNFT", deployer);
      });

      it("should mint nft ", async () => {
        const txResponse = await basicNft.mintNft();
        txResponse.wait(1);
        const tokenUrl = await basicNft.tokenURL(0);
        const nftCount = await basicNft.getTokenCounter();
        assert.equal(nftCount.toString(), "1");
        assert.equal(tokenUrl, nftUrl);
      });
    });
