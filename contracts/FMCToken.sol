// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/token/ERC20/extensions/ERC20Burnable.sol";
import "@openzeppelin/contracts/security/Pausable.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

/**
 * @title FMCToken - FreeMillionaireChallenge Token
 * @dev ERC20 Token for the FreeMillionaireChallenge platform
 * 30% of the total supply is allocated to the founder wallet
 */
contract FMCToken is ERC20, ERC20Burnable, Pausable, Ownable {
    // Founder wallet that receives 30% of the token supply
    address public founderWallet;
    
    // Total token supply: 100 million tokens with 18 decimals
    uint256 public constant TOTAL_SUPPLY = 100_000_000 * 10**18;
    
    // Token distribution percentages
    uint256 public constant FOUNDER_ALLOCATION = 30; // 30% to founder
    uint256 public constant OPERATIONS_ALLOCATION = 20; // 20% to operations
    uint256 public constant COMMUNITY_ALLOCATION = 25; // 25% to community rewards
    uint256 public constant ECOSYSTEM_ALLOCATION = 15; // 15% to ecosystem growth
    uint256 public constant RESERVE_ALLOCATION = 10; // 10% to reserve
    
    // Vesting periods (in seconds)
    uint256 public constant VESTING_PERIOD = 365 days;
    
    // Timestamps for vesting schedule
    uint256 public immutable tokenLaunchTime;
    
    // Mapping to track released tokens for vesting
    mapping(string => uint256) private _releasedTokens;
    
    /**
     * @dev Constructor sets up the token with initial supply distribution
     * @param _founderWallet Address of the founder wallet (receives 30%)
     * @param _operationsWallet Address for operations allocation (20%)
     * @param _communityWallet Address for community rewards (25%)
     * @param _ecosystemWallet Address for ecosystem growth (15%)
     * @param _reserveWallet Address for reserve funds (10%)
     */
    constructor(
        address _founderWallet,
        address _operationsWallet,
        address _communityWallet,
        address _ecosystemWallet,
        address _reserveWallet
    ) ERC20("FreeMillionaireChallenge Token", "FMC") {
        require(_founderWallet != address(0), "Founder wallet cannot be zero address");
        
        founderWallet = _founderWallet;
        tokenLaunchTime = block.timestamp;
        
        // Calculate token allocations
        uint256 founderTokens = (TOTAL_SUPPLY * FOUNDER_ALLOCATION) / 100;
        uint256 operationsTokens = (TOTAL_SUPPLY * OPERATIONS_ALLOCATION) / 100;
        uint256 communityTokens = (TOTAL_SUPPLY * COMMUNITY_ALLOCATION) / 100;
        uint256 ecosystemTokens = (TOTAL_SUPPLY * ECOSYSTEM_ALLOCATION) / 100;
        uint256 reserveTokens = (TOTAL_SUPPLY * RESERVE_ALLOCATION) / 100;
        
        // Mint initial token allocations
        _mint(_founderWallet, founderTokens);
        _mint(_operationsWallet, operationsTokens);
        _mint(_communityWallet, communityTokens);
        _mint(_ecosystemWallet, ecosystemTokens);
        _mint(_reserveWallet, reserveTokens);
    }
    
    /**
     * @dev Pauses all token transfers
     * Can only be called by the contract owner
     */
    function pause() public onlyOwner {
        _pause();
    }
    
    /**
     * @dev Unpauses all token transfers
     * Can only be called by the contract owner
     */
    function unpause() public onlyOwner {
        _unpause();
    }
    
    /**
     * @dev Required override for _beforeTokenTransfer in ERC20
     */
    function _beforeTokenTransfer(
        address from,
        address to,
        uint256 amount
    ) internal override whenNotPaused {
        super._beforeTokenTransfer(from, to, amount);
    }
    
    /**
     * @dev Returns the timestamp of when vesting ends
     */
    function vestingEndTime() public view returns (uint256) {
        return tokenLaunchTime + VESTING_PERIOD;
    }
    
    /**
     * @dev Returns whether vesting has ended
     */
    function hasVestingEnded() public view returns (bool) {
        return block.timestamp >= vestingEndTime();
    }
    
    /**
     * @dev Returns the allocation name for the specified percentage
     */
    function getAllocationName(uint256 percentage) public pure returns (string memory) {
        if (percentage == FOUNDER_ALLOCATION) return "founder";
        if (percentage == OPERATIONS_ALLOCATION) return "operations";
        if (percentage == COMMUNITY_ALLOCATION) return "community";
        if (percentage == ECOSYSTEM_ALLOCATION) return "ecosystem";
        if (percentage == RESERVE_ALLOCATION) return "reserve";
        return "unknown";
    }
    
    /**
     * @dev Returns amount of tokens that have been released for a particular allocation
     */
    function getReleasedTokens(string memory allocation) public view returns (uint256) {
        return _releasedTokens[allocation];
    }
    
    /**
     * @dev Updates the founder wallet address
     * @param newFounderWallet New founder wallet address
     */
    function updateFounderWallet(address newFounderWallet) public onlyOwner {
        require(newFounderWallet != address(0), "Founder wallet cannot be zero address");
        founderWallet = newFounderWallet;
    }
}