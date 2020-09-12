pragma solidity >=0.4.25 <0.7.0;


contract 2020Election {
	// Address of the contract owner
	address ownerAddress;
	
	// Vote counts
	uint votesForA;
	uint voltesForB;
	
	// Voter registration
	mapping(address => boolean) public registeredVoters;
	// Whether or not each vote has voted
	mapping (address => boolean) public voterHasVoted;
	
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
	
	function vote (boolean forCantidateA) external {
		// Note that msg.sender is guaranteed authentic 
		address sender = msg.sender;
		if (registeredVoters[sender] == true 
			&& voterHasVoted[sender] == false) {
			voterHasVoted[addr] = true;
			
			if (forCantidateA) {
				votesForA++;
			} else {
				votesForB++;
			}
		}
	}
	
	function cantidateAVotes() external view returns (int) { 
		return votesForA;	
	}
	function cantidateBVotes() external view returns (int) { 
		return votesForB;	
	}
}