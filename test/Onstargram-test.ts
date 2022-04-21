import { expect } from "chai";
import { ethers } from "hardhat";

describe("Onstargram", function () {
  it("msg.sender should be recorded in ownerHistory of getPhoto", async function () {
    const [owner] = await ethers.getSigners();

    const Onstar = await ethers.getContractFactory("Onstargram");

    const testOnstar = await Onstar.deploy();

    await testOnstar.uploadPhoto([0, 255, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], 'test-title', 'test-location', 'test-desc');

    const testPhotoDetail = await testOnstar.getPhoto(testOnstar.totalSupply());

    expect(await testPhotoDetail[1][0]).to.equal(owner.address)

  })
});
