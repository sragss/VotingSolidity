const Election = artifacts.require("Election")

contract("Election", accounts => {
    it("should have 0 votes and 0 registered voters", () => {
        let election;

        return Election.deployed()
            .then(instance => {
                election = instance;
                return election.getCandidateAVotes();
            })
            .then(AVotes => {
                assert.equal(
                    AVotes,
                    0,
                    "Candidate A should have 0 votes"
                );
                return election.getCandidateBVotes();
            })
            .then(BVotes => {
                assert.equal(
                    BVotes,
                    0,
                    "Candidate B should have 0 votes"
                );
                return election.addressIsRegistered(accounts[0]);
            })
            .then(isRegistered => {
                assert.equal(
                    isRegistered, 
                    false, 
                    "No voters should be registered"
                );
            })
    })

    // Register 5 addrs
    it("should allow registration", async () => {
        let instance = await Election.deployed();
        await instance.registerNewAddress(accounts[0]);
        await instance.registerNewAddress(accounts[1]);
        await instance.registerNewAddress(accounts[2]);

        let registration1 = await instance.addressIsRegistered(accounts[0]);
        let registration2 = await instance.addressIsRegistered(accounts[0]);
        let registration3 = await instance.addressIsRegistered(accounts[0]);

        assert.equal(registration1, true, "should be registered");
        assert.equal(registration2, true, "should be registered");
        assert.equal(registration3, true, "should be registered");
    })
    
    // Vote 5 for A
    it("should have vote for A", async () => {
        let instance = await Election.deployed();

        // Register the voters
        await instance.registerNewAddress(accounts[3]);
        await instance.registerNewAddress(accounts[4]);

        await instance.vote(true, {from: accounts[0]});
        await instance.vote(true, {from: accounts[1]});
        await instance.vote(true, {from: accounts[2]});
        await instance.vote(true, {from: accounts[3]});
        await instance.vote(true, {from: accounts[4]});

        let votesForA = await instance.getCandidateAVotes();
        assert.equal(votesForA.toNumber(), 5, "Votes for A should be 5");

        let votesForB = await instance.getCandidateBVotes();
        assert.equal(votesForB.toNumber(), 0, "Votes for B should be 0");
    })

    // Vote 4 for B
    it("should have vote for B", async () => {
        let instance = await Election.deployed();

        // Register the voters
        await instance.registerNewAddress(accounts[5]);
        await instance.registerNewAddress(accounts[6]);
        await instance.registerNewAddress(accounts[7]);
        await instance.registerNewAddress(accounts[8]);

        await instance.vote(false, {from: accounts[5]});
        await instance.vote(false, {from: accounts[6]});
        await instance.vote(false, {from: accounts[7]});
        await instance.vote(false, {from: accounts[8]});

        let votesForA = await instance.getCandidateAVotes();
        assert.equal(votesForA.toNumber(), 5);

        let votesForB = await instance.getCandidateBVotes();
        assert.equal(votesForB.toNumber(), 4);
    })

    // Voter cannot vote twice
    it("should not allow voter to vote multiple times", async () => {
        let instance = await Election.deployed();

        // Register the voters
        await instance.registerNewAddress(accounts[0]);

        await instance.vote(true, {from: accounts[0]});
        await instance.vote(true, {from: accounts[0]});
        await instance.vote(true, {from: accounts[0]});
        await instance.vote(true, {from: accounts[0]});

        let votesForA = await instance.getCandidateAVotes();
        assert.equal(votesForA.toNumber(), 5);

        let votesForB = await instance.getCandidateBVotes();
        assert.equal(votesForB.toNumber(), 4);
    })

    // Unregistered voter cannot vote
    it("should not allow voter to vote multiple times", async () => {
        let instance = await Election.deployed();

        // Account9 is not registered
        await instance.vote(true, {from: accounts[9]});
        await instance.vote(true, {from: accounts[9]});
        await instance.vote(true, {from: accounts[9]});
        await instance.vote(true, {from: accounts[9]});

        let votesForA = await instance.getCandidateAVotes();
        assert.equal(votesForA.toNumber(), 5);

        let votesForB = await instance.getCandidateBVotes();
        assert.equal(votesForB.toNumber(), 4);
    })
})



