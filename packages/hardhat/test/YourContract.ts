import { ethers } from "hardhat";
import { expect } from "chai";

describe("Voting Contract", function () {
  let votingContract: any;

  beforeEach(async function () {
    const Voting = await ethers.getContractFactory("Voting");
    votingContract = await Voting.deploy();
    await votingContract.deployed();
  });

  it("should create a poll", async function () {
    const question = "Who is the best?";
    const options = ["Alice", "Bob"];
    const duration = 60 * 60; // 1 hour

    await votingContract.createPoll(question, options, duration);

    const poll = await votingContract.polls(1);
    expect(poll.question).to.equal(question);
  });

  it("should allow voting", async function () {
    const options = ["Option 1", "Option 2"];
    await votingContract.createPoll("Test Poll", options, 3600);

    await votingContract.vote(1, 0); // Vote for Option 1

    // Ensure votes are counted
    const poll = await votingContract.polls(1);
    const votesForOption1 = await poll.votes[0];
    expect(votesForOption1).to.equal(1);
  });

  it("should conclude a poll", async function () {
    const options = ["Option 1", "Option 2"];
    await votingContract.createPoll("Test Poll", options, 1);

    // Wait for the poll to end
    await new Promise((resolve) => setTimeout(resolve, 2000));

    await votingContract.concludePoll(1);
    const poll = await votingContract.polls(1);
    expect(poll.concluded).to.equal(true);
  });
});
