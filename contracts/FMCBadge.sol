// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/utils/Strings.sol";

/**
 * @title FMCBadge
 * @dev NFT Badges for FreeMillionaireChallenge affiliates and participants
 * Affiliates can mint these badges for free (paying only gas)
 * Each badge can have revenue sharing capabilities
 */
contract FMCBadge is ERC721Enumerable, Ownable {
    using Counters for Counters.Counter;
    using Strings for uint256;
    
    Counters.Counter private _tokenIdCounter;
    
    // Mapping from token ID to badge type
    mapping(uint256 => string) private _badgeTypes;
    
    // Mapping from token ID to badge metadata URI
    mapping(uint256 => string) private _tokenURIs;
    
    // Mapping from token ID to revenue share percentage (in basis points, 100 = 1%)
    mapping(uint256 => uint256) private _revenueShares;
    
    // Platform wallet that receives 30% of all fees
    address public platformWallet;
    
    // Maximum revenue share for badge holders (in basis points, 1000 = 10%)
    uint256 public maxRevenueShare = 1000;
    
    // Events
    event BadgeMinted(address indexed to, uint256 indexed tokenId, string badgeType);
    event RevenueShareUpdated(uint256 indexed tokenId, uint256 oldShare, uint256 newShare);
    event RevenueDistributed(uint256 indexed tokenId, address indexed holder, uint256 amount);
    
    /**
     * @dev Constructor initializes the ERC721 token and sets the platform wallet
     * @param _platformWallet Address that will receive 30% of all platform fees
     */
    constructor(address _platformWallet) ERC721("FreeMillionaireChallenge Badge", "FMCB") {
        require(_platformWallet != address(0), "Platform wallet cannot be zero address");
        platformWallet = _platformWallet;
    }
    
    /**
     * @dev Mints a new badge to the specified address
     * @param to Address that will receive the badge
     * @param badgeType Type of badge (affiliate, participant, etc.)
     * @param metadataURI URI pointing to the badge metadata
     * @param revenueShare Revenue share percentage in basis points (100 = 1%)
     * @return The ID of the newly minted token
     */
    function mintBadge(
        address to,
        string memory badgeType,
        string memory metadataURI,
        uint256 revenueShare
    ) public returns (uint256) {
        require(revenueShare <= maxRevenueShare, "Revenue share exceeds maximum");
        
        // Get the next token ID
        uint256 tokenId = _tokenIdCounter.current();
        _tokenIdCounter.increment();
        
        // Mint the token to the specified address
        _safeMint(to, tokenId);
        
        // Set badge type, metadata URI, and revenue share
        _badgeTypes[tokenId] = badgeType;
        _tokenURIs[tokenId] = metadataURI;
        _revenueShares[tokenId] = revenueShare;
        
        emit BadgeMinted(to, tokenId, badgeType);
        
        return tokenId;
    }
    
    /**
     * @dev Allows an affiliate to mint their own badge, paying only gas
     * @param badgeType Type of badge (must be "affiliate")
     * @param metadataURI URI pointing to the badge metadata
     * @return The ID of the newly minted token
     */
    function mintAffiliateBadge(string memory metadataURI) public returns (uint256) {
        return mintBadge(msg.sender, "affiliate", metadataURI, 500); // 5% revenue share
    }
    
    /**
     * @dev Allows the platform to mint a participant badge
     * @param to Address that will receive the badge
     * @param metadataURI URI pointing to the badge metadata
     * @return The ID of the newly minted token
     */
    function mintParticipantBadge(address to, string memory metadataURI) 
        public 
        onlyOwner 
        returns (uint256) 
    {
        return mintBadge(to, "participant", metadataURI, 1000); // 10% revenue share
    }
    
    /**
     * @dev Updates the revenue share for a specific badge
     * @param tokenId ID of the badge
     * @param newRevenueShare New revenue share percentage in basis points
     */
    function updateRevenueShare(uint256 tokenId, uint256 newRevenueShare) public onlyOwner {
        require(_exists(tokenId), "Badge does not exist");
        require(newRevenueShare <= maxRevenueShare, "Revenue share exceeds maximum");
        
        uint256 oldShare = _revenueShares[tokenId];
        _revenueShares[tokenId] = newRevenueShare;
        
        emit RevenueShareUpdated(tokenId, oldShare, newRevenueShare);
    }
    
    /**
     * @dev Distributes revenue to a badge holder based on their revenue share
     * @param tokenId ID of the badge
     * @param amount Amount to distribute
     */
    function distributeRevenue(uint256 tokenId, uint256 amount) public payable {
        require(_exists(tokenId), "Badge does not exist");
        require(msg.value >= amount, "Insufficient payment");
        
        address badgeHolder = ownerOf(tokenId);
        uint256 revenueShare = _revenueShares[tokenId];
        
        // Calculate holder's share and platform's share
        uint256 holderAmount = (amount * revenueShare) / 10000;
        uint256 platformAmount = amount - holderAmount;
        
        // Transfer shares
        if (holderAmount > 0) {
            payable(badgeHolder).transfer(holderAmount);
            emit RevenueDistributed(tokenId, badgeHolder, holderAmount);
        }
        
        if (platformAmount > 0) {
            payable(platformWallet).transfer(platformAmount);
        }
    }
    
    /**
     * @dev Returns the badge type for a specific token ID
     * @param tokenId ID of the badge
     * @return Badge type string
     */
    function badgeType(uint256 tokenId) public view returns (string memory) {
        require(_exists(tokenId), "Badge does not exist");
        return _badgeTypes[tokenId];
    }
    
    /**
     * @dev Returns the revenue share for a specific token ID
     * @param tokenId ID of the badge
     * @return Revenue share in basis points
     */
    function revenueShare(uint256 tokenId) public view returns (uint256) {
        require(_exists(tokenId), "Badge does not exist");
        return _revenueShares[tokenId];
    }
    
    /**
     * @dev Returns the metadata URI for a specific token ID
     * @param tokenId ID of the badge
     * @return Metadata URI string
     */
    function tokenURI(uint256 tokenId) public view override returns (string memory) {
        require(_exists(tokenId), "Badge does not exist");
        return _tokenURIs[tokenId];
    }
    
    /**
     * @dev Updates the platform wallet address
     * @param newPlatformWallet New platform wallet address
     */
    function updatePlatformWallet(address newPlatformWallet) public onlyOwner {
        require(newPlatformWallet != address(0), "Platform wallet cannot be zero address");
        platformWallet = newPlatformWallet;
    }
}