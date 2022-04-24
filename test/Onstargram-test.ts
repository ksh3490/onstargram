import { expect } from "chai";
import { ethers } from "hardhat";

describe("Onstagram", function () {
  it("msg.sender should be recorded in ownerHistory of getPhoto", async function () {
    const [owner] = await ethers.getSigners();

    const Onsta = await ethers.getContractFactory("Onstagram");

    const testOnsta = await Onsta.deploy();

    await testOnsta.uploadPhoto([0, 255, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], 'test-title', 'test-location', 'test-desc');

    const testPhotoDetail = await testOnsta.getPhoto(testOnsta.totalSupply());

    expect(await testPhotoDetail[1][0]).to.equal(owner.address)

  })
});
