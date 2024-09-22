// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.0;

contract CharityDonation {
    struct Donation {
        address donor;
        uint256 amount;
        uint256 timestamp;
    }

    Donation[] public donations;

    function donate() public payable {
        require(msg.value > 0, "Donation amount must be greater than 0");
        donations.push(Donation(msg.sender, msg.value, block.timestamp));
    }

    function getDonationsCount() public view returns (uint256) {
        return donations.length;
    }

    function getDonation(uint256 index) public view returns (address, uint256, uint256) {
        require(index < donations.length, "Invalid donation index");
        Donation memory donation = donations[index];
        return (donation.donor, donation.amount, donation.timestamp);
    }
}
