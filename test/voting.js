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
})