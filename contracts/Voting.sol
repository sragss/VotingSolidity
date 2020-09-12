pragma solidity >=0.4.25 <0.7.0;


contract Election {
	// Address of the contract owner
	address ownerAddress;
	
	// Vote counts
	uint votesForA;
	uint votesForB;
	
	// Voter registration
	mapping(address => bool) public registeredVoters;
	// Whether or not each vote has voted
	mapping (address => bool) public voterHasVoted;
	
	// Init
	constructor() public {
		ownerAddress = msg.sender;
		votesForA = 0;
		votesForB = 0;
	}
	
	// Assumes the address entered by the owner is a authentically provided link to the voter 
	function registerNewAddress(address newVoter) external {
		require(msg.sender == ownerAddress);
		registeredVoters[newVoter] = true;
	}
	
	function vote (bool forCantidateA) external {
		// Note that msg.sender is guaranteed authentic 
		address sender = msg.sender;
		if (registeredVoters[sender] == true 
			&& voterHasVoted[sender] == false) {
			voterHasVoted[sender] = true;
			
			if (forCantidateA) {
				votesForA++;
			} else {
				votesForB++;
			}
		}
	}
	
	function getCandidateAVotes() external view returns (uint) { 
		return votesForA;	
	}
	function getCandidateBVotes() external view returns (uint) { 
		return votesForB;	
	}

	function addressIsRegistered(address voterAddr) external view returns (bool) { 
        return registeredVoters[voterAddr] == true;
	}
}