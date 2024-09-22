const hre = require("hardhat");

async function main() {
    const CharityDonation = await ethers.getContractFactory("CharityDonation");
    const charityDonation = await CharityDonation.deploy();
    
    await charityDonation.deployed();

    console.log("CharityDonation deployed to:", charityDonation.address);
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });
