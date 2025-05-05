import { 
  users, 
  ads, 
  participants, 
  viewers, 
  settings,
  nftBadges,
  vrExperiences,
  awards,
  votes,
  progressUpdates,
  transactions,
  type User, 
  type InsertUser, 
  type Ad, 
  type InsertAd, 
  type Participant, 
  type InsertParticipant, 
  type Viewer, 
  type InsertViewer,
  type Setting,
  type InsertSetting,
  type NFTBadge,
  type InsertNFTBadge,
  type VrExperience,
  type InsertVrExperience,
  type Award,
  type InsertAward,
  type Vote,
  type InsertVote,
  type ProgressUpdate,
  type InsertProgressUpdate,
  type Transaction,
  type InsertTransaction
} from "@shared/schema";

export interface IStorage {
  // User methods
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  getUserByEmail(email: string): Promise<User | undefined>;
  getUserByWalletAddress(walletAddress: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  updateUserWalletAddress(id: number, walletAddress: string): Promise<User | undefined>;
  updateUserNFTBadge(id: number, nftBadgeId: number): Promise<User | undefined>;
  getUsersByRole(role: string): Promise<User[]>;
  
  // Ad methods
  getAd(id: number): Promise<Ad | undefined>;
  getAds(limit?: number, offset?: number): Promise<Ad[]>;
  getAdsByStatus(status: string): Promise<Ad[]>;
  getAdsByUser(userId: number): Promise<Ad[]>;
  createAd(ad: InsertAd): Promise<Ad>;
  updateAdStatus(id: number, status: string, reason?: string): Promise<Ad | undefined>;
  updateAdPaymentStatus(id: number, paymentStatus: string, txHash?: string): Promise<Ad | undefined>;
  
  // Participant methods
  getParticipant(id: number): Promise<Participant | undefined>;
  getParticipantByUserId(userId: number): Promise<Participant | undefined>;
  getParticipants(): Promise<Participant[]>;
  getActiveParticipantsCount(): Promise<number>;
  createParticipant(participant: InsertParticipant): Promise<Participant>;
  updateParticipantWalletAddress(id: number, walletAddress: string): Promise<Participant | undefined>;
  
  // Viewer methods
  getViewer(id: number): Promise<Viewer | undefined>;
  getViewerByEmail(email: string): Promise<Viewer | undefined>;
  getViewers(): Promise<Viewer[]>;
  createViewer(viewer: InsertViewer): Promise<Viewer>;
  updateViewerWalletAddress(id: number, walletAddress: string): Promise<Viewer | undefined>;
  
  // NFT Badge methods
  getNFTBadge(id: number): Promise<NFTBadge | undefined>;
  getNFTBadgeByUserId(userId: number): Promise<NFTBadge | undefined>;
  getNFTBadgeByTokenId(tokenId: string): Promise<NFTBadge | undefined>;
  createNFTBadge(badge: InsertNFTBadge): Promise<NFTBadge>;
  updateNFTBadgeTransaction(id: number, txHash: string): Promise<NFTBadge | undefined>;
  getNFTBadges(): Promise<NFTBadge[]>;
  
  // VR Experience methods
  getVrExperience(id: number): Promise<VrExperience | undefined>;
  getVrExperiences(): Promise<VrExperience[]>;
  getActiveVrExperiences(): Promise<VrExperience[]>;
  createVrExperience(experience: InsertVrExperience): Promise<VrExperience>;
  
  // Settings methods
  getSetting(key: string): Promise<Setting | undefined>;
  createOrUpdateSetting(setting: InsertSetting): Promise<Setting>;
  getSettings(): Promise<Setting[]>;
  
  // Award methods
  getAward(id: number): Promise<Award | undefined>;
  getAwards(): Promise<Award[]>;
  getActiveAwards(): Promise<Award[]>;
  createAward(award: InsertAward): Promise<Award>;
  updateAwardStatus(id: number, status: string): Promise<Award | undefined>;
  
  // Vote methods
  getVote(id: number): Promise<Vote | undefined>;
  getVotesByParticipant(participantId: number): Promise<Vote[]>;
  getVotesByUser(userId: number): Promise<Vote[]>;
  getVotesByAward(awardId: number): Promise<Vote[]>;
  createVote(vote: InsertVote): Promise<Vote>;
  countVotesForParticipant(participantId: number): Promise<number>;
  
  // Progress Update methods
  getProgressUpdate(id: number): Promise<ProgressUpdate | undefined>;
  getProgressUpdatesByParticipant(participantId: number): Promise<ProgressUpdate[]>;
  getProgressUpdatesByMonth(month: number): Promise<ProgressUpdate[]>;
  createProgressUpdate(update: InsertProgressUpdate): Promise<ProgressUpdate>;
  updateInteractionCount(id: number, count: number): Promise<ProgressUpdate | undefined>;
  
  // Transaction methods
  getTransaction(id: number): Promise<Transaction | undefined>;
  getTransactionsByUser(userId: number): Promise<Transaction[]>;
  getTransactionsByType(txType: string): Promise<Transaction[]>;
  createTransaction(tx: InsertTransaction): Promise<Transaction>;
  updateTransactionStatus(id: number, status: string): Promise<Transaction | undefined>;
  getFounderProfitTotal(): Promise<string>; // Total profit accumulated for founder
}

export class MemStorage implements IStorage {
  private users: Map<number, User>;
  private ads: Map<number, Ad>;
  private participants: Map<number, Participant>;
  private viewers: Map<number, Viewer>;
  private settings: Map<string, Setting>;
  private nftBadges: Map<number, NFTBadge>;
  private vrExperiences: Map<number, VrExperience>;
  private awards: Map<number, Award>;
  private votes: Map<number, Vote>;
  private progressUpdates: Map<number, ProgressUpdate>;
  private transactions: Map<number, Transaction>;
  
  private userIdCounter: number;
  private adIdCounter: number;
  private participantIdCounter: number;
  private viewerIdCounter: number;
  private settingIdCounter: number;
  private nftBadgeIdCounter: number;
  private vrExperienceIdCounter: number;
  private awardIdCounter: number;
  private voteIdCounter: number;
  private progressUpdateIdCounter: number;
  private transactionIdCounter: number;

  constructor() {
    this.users = new Map();
    this.ads = new Map();
    this.participants = new Map();
    this.viewers = new Map();
    this.settings = new Map();
    this.nftBadges = new Map();
    this.vrExperiences = new Map();
    this.awards = new Map();
    this.votes = new Map();
    this.progressUpdates = new Map();
    this.transactions = new Map();
    
    this.userIdCounter = 1;
    this.adIdCounter = 1;
    this.participantIdCounter = 1;
    this.viewerIdCounter = 1;
    this.settingIdCounter = 1;
    this.nftBadgeIdCounter = 1;
    this.vrExperienceIdCounter = 1;
    this.awardIdCounter = 1;
    this.voteIdCounter = 1;
    this.progressUpdateIdCounter = 1;
    this.transactionIdCounter = 1;
    
    // Initialize with default settings
    this.initializeSettings();
  }

  private initializeSettings() {
    // Set the countdown target date
    this.createOrUpdateSetting({
      key: "challengeEndDate",
      value: "2025-08-01T00:00:00.000Z",
      description: "The end date for the challenge"
    });
    
    // Challenge start date (12 months before end date)
    this.createOrUpdateSetting({
      key: "challengeStartDate",
      value: "2024-08-01T00:00:00.000Z",
      description: "The start date for the challenge"
    });
    
    // Set the maximum participants
    this.createOrUpdateSetting({
      key: "maxParticipants",
      value: "9",
      description: "Maximum number of participants allowed"
    });
    
    // Set the participant eligibility rules
    this.createOrUpdateSetting({
      key: "maxParticipantAge",
      value: "35",
      description: "Maximum age for participants"
    });
    
    this.createOrUpdateSetting({
      key: "maxWorkExperience",
      value: "36",
      description: "Maximum work experience in months (3 years)"
    });
    
    // Set the participant whitelist (comma-separated emails)
    this.createOrUpdateSetting({
      key: "participantWhitelist",
      value: "admin@freemillionaire.com",
      description: "Comma-separated list of emails allowed to register as participants"
    });
    
    this.createOrUpdateSetting({
      key: "requireRecentGraduate",
      value: "true",
      description: "Require participants to be recent graduates"
    });
    
    // Award details
    this.createOrUpdateSetting({
      key: "viewersChoiceAward",
      value: "1.0",
      description: "Amount in BNB for Viewers' Choice Award"
    });
    
    this.createOrUpdateSetting({
      key: "judgesChoiceAward",
      value: "1.5",
      description: "Amount in BNB for Judges' Choice Award"
    });
    
    this.createOrUpdateSetting({
      key: "socialMediaAward",
      value: "1.0",
      description: "Amount in BNB for Social Media Interaction Award"
    });
    
    // Founder profit settings
    this.createOrUpdateSetting({
      key: "founderProfitPercentage",
      value: "30",
      description: "Percentage of transaction fees that go to founder (30%)"
    });
    
    // Transaction fee settings
    this.createOrUpdateSetting({
      key: "adSubmissionFee",
      value: "0.05",
      description: "Fee in BNB for submitting an ad"
    });
    
    this.createOrUpdateSetting({
      key: "votingFee",
      value: "0.005",
      description: "Fee in BNB for casting a vote"
    });
    
    // Platform wallet address
    this.createOrUpdateSetting({
      key: "platformWalletAddress",
      value: "0xDebF00937a402ebffaF25ABeF1BdE9aA8fe2c330",
      description: "Platform wallet address for receiving fees"
    });
  }

  // User methods
  async getUser(id: number): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async getUserByEmail(email: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.email === email,
    );
  }

  async getUserByWalletAddress(walletAddress: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.walletAddress === walletAddress,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = this.userIdCounter++;
    const now = new Date();
    const user: User = { 
      ...insertUser, 
      id,
      createdAt: now,
      nftBadgeId: null, // Initialize with null
      walletAddress: null, // Initialize with null
      language: insertUser.language || "en"
    };
    this.users.set(id, user);
    return user;
  }

  async updateUserWalletAddress(id: number, walletAddress: string): Promise<User | undefined> {
    const user = this.users.get(id);
    if (!user) return undefined;
    
    const updatedUser = { ...user, walletAddress };
    this.users.set(id, updatedUser);
    return updatedUser;
  }

  async updateUserNFTBadge(id: number, nftBadgeId: number): Promise<User | undefined> {
    const user = this.users.get(id);
    if (!user) return undefined;
    
    const updatedUser = { ...user, nftBadgeId };
    this.users.set(id, updatedUser);
    return updatedUser;
  }

  async getUsersByRole(role: string): Promise<User[]> {
    return Array.from(this.users.values()).filter(
      user => user.role === role
    );
  }

  // Ad methods
  async getAd(id: number): Promise<Ad | undefined> {
    return this.ads.get(id);
  }

  async getAds(limit = 10, offset = 0): Promise<Ad[]> {
    const allAds = Array.from(this.ads.values()).sort((a, b) => {
      return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
    });
    
    return allAds.slice(offset, offset + limit);
  }

  async getAdsByStatus(status: string): Promise<Ad[]> {
    return Array.from(this.ads.values()).filter(
      ad => ad.status === status
    );
  }

  async getAdsByUser(userId: number): Promise<Ad[]> {
    return Array.from(this.ads.values()).filter(
      ad => ad.userId === userId
    );
  }

  async createAd(insertAd: InsertAd): Promise<Ad> {
    const id = this.adIdCounter++;
    const now = new Date();
    const ad: Ad = { 
      ...insertAd, 
      id,
      status: "pending",
      reason: null,
      transactionHash: null,
      paymentMethod: insertAd.paymentMethod || null,
      paymentStatus: insertAd.paymentStatus || "pending",
      imageUrl: insertAd.imageUrl || null,
      createdAt: now
    };
    this.ads.set(id, ad);
    return ad;
  }

  async updateAdStatus(id: number, status: string, reason?: string): Promise<Ad | undefined> {
    const ad = this.ads.get(id);
    if (!ad) return undefined;
    
    const updatedAd = { 
      ...ad, 
      status,
      reason: reason || ad.reason 
    };
    this.ads.set(id, updatedAd);
    return updatedAd;
  }

  async updateAdPaymentStatus(id: number, paymentStatus: string, txHash?: string): Promise<Ad | undefined> {
    const ad = this.ads.get(id);
    if (!ad) return undefined;
    
    const updatedAd = { 
      ...ad, 
      paymentStatus,
      transactionHash: txHash || ad.transactionHash
    };
    this.ads.set(id, updatedAd);
    return updatedAd;
  }

  // Participant methods
  async getParticipant(id: number): Promise<Participant | undefined> {
    return this.participants.get(id);
  }
  
  async getParticipantByUserId(userId: number): Promise<Participant | undefined> {
    return Array.from(this.participants.values()).find(
      participant => participant.userId === userId
    );
  }

  async getParticipants(): Promise<Participant[]> {
    return Array.from(this.participants.values())
      .filter(p => p.isActive)
      .sort((a, b) => a.order - b.order);
  }

  async getActiveParticipantsCount(): Promise<number> {
    return Array.from(this.participants.values())
      .filter(p => p.isActive)
      .length;
  }

  async createParticipant(insertParticipant: InsertParticipant): Promise<Participant> {
    const id = this.participantIdCounter++;
    const now = new Date();
    const participant: Participant = { 
      ...insertParticipant, 
      id,
      isActive: true,
      walletAddress: insertParticipant.walletAddress || null,
      impactGoals: insertParticipant.impactGoals || null,
      profileImageUrl: insertParticipant.profileImageUrl || null,
      socialTwitter: insertParticipant.socialTwitter || null,
      socialLinkedin: insertParticipant.socialLinkedin || null,
      socialWebsite: insertParticipant.socialWebsite || null,
      createdAt: now
    };
    this.participants.set(id, participant);
    return participant;
  }

  async updateParticipantWalletAddress(id: number, walletAddress: string): Promise<Participant | undefined> {
    const participant = this.participants.get(id);
    if (!participant) return undefined;
    
    const updatedParticipant = { ...participant, walletAddress };
    this.participants.set(id, updatedParticipant);
    return updatedParticipant;
  }

  // Viewer methods
  async getViewer(id: number): Promise<Viewer | undefined> {
    return this.viewers.get(id);
  }

  async getViewerByEmail(email: string): Promise<Viewer | undefined> {
    return Array.from(this.viewers.values()).find(
      viewer => viewer.email === email
    );
  }

  async getViewers(): Promise<Viewer[]> {
    return Array.from(this.viewers.values());
  }

  async createViewer(insertViewer: InsertViewer): Promise<Viewer> {
    const id = this.viewerIdCounter++;
    const now = new Date();
    const viewer: Viewer = { 
      ...insertViewer, 
      id,
      walletAddress: insertViewer.walletAddress || null,
      interests: insertViewer.interests || null,
      userId: insertViewer.userId || null,
      createdAt: now
    };
    this.viewers.set(id, viewer);
    return viewer;
  }

  async updateViewerWalletAddress(id: number, walletAddress: string): Promise<Viewer | undefined> {
    const viewer = this.viewers.get(id);
    if (!viewer) return undefined;
    
    const updatedViewer = { ...viewer, walletAddress };
    this.viewers.set(id, updatedViewer);
    return updatedViewer;
  }

  // NFT Badge methods
  async getNFTBadge(id: number): Promise<NFTBadge | undefined> {
    return this.nftBadges.get(id);
  }

  async getNFTBadgeByUserId(userId: number): Promise<NFTBadge | undefined> {
    return Array.from(this.nftBadges.values()).find(
      badge => badge.userId === userId
    );
  }

  async getNFTBadgeByTokenId(tokenId: string): Promise<NFTBadge | undefined> {
    return Array.from(this.nftBadges.values()).find(
      badge => badge.tokenId === tokenId
    );
  }

  async createNFTBadge(insertBadge: InsertNFTBadge): Promise<NFTBadge> {
    const id = this.nftBadgeIdCounter++;
    const now = new Date();
    const badge: NFTBadge = {
      ...insertBadge,
      id,
      tokenId: insertBadge.tokenId || null,
      tokenUri: insertBadge.tokenUri || null,
      imageUrl: insertBadge.imageUrl || null,
      transactionHash: insertBadge.transactionHash || null,
      metadata: insertBadge.metadata || null,
      createdAt: now
    };
    this.nftBadges.set(id, badge);
    return badge;
  }

  async updateNFTBadgeTransaction(id: number, txHash: string): Promise<NFTBadge | undefined> {
    const badge = this.nftBadges.get(id);
    if (!badge) return undefined;
    
    const updatedBadge = { ...badge, transactionHash: txHash };
    this.nftBadges.set(id, updatedBadge);
    return updatedBadge;
  }

  async getNFTBadges(): Promise<NFTBadge[]> {
    return Array.from(this.nftBadges.values());
  }

  // VR Experience methods
  async getVrExperience(id: number): Promise<VrExperience | undefined> {
    return this.vrExperiences.get(id);
  }

  async getVrExperiences(): Promise<VrExperience[]> {
    return Array.from(this.vrExperiences.values());
  }

  async getActiveVrExperiences(): Promise<VrExperience[]> {
    return Array.from(this.vrExperiences.values())
      .filter(exp => exp.isActive);
  }

  async createVrExperience(insertExperience: InsertVrExperience): Promise<VrExperience> {
    const id = this.vrExperienceIdCounter++;
    const now = new Date();
    const experience: VrExperience = {
      ...insertExperience,
      id,
      modelUrl: insertExperience.modelUrl || null,
      sceneData: insertExperience.sceneData || null,
      isActive: true,
      createdAt: now
    };
    this.vrExperiences.set(id, experience);
    return experience;
  }

  // Settings methods
  async getSetting(key: string): Promise<Setting | undefined> {
    return this.settings.get(key);
  }

  async createOrUpdateSetting(insertSetting: InsertSetting): Promise<Setting> {
    const existing = await this.getSetting(insertSetting.key);
    
    if (existing) {
      const updated: Setting = { 
        ...existing, 
        value: insertSetting.value,
        description: insertSetting.description !== undefined ? insertSetting.description : existing.description
      };
      this.settings.set(insertSetting.key, updated);
      return updated;
    }
    
    const id = this.settingIdCounter++;
    const setting: Setting = { 
      ...insertSetting, 
      id,
      description: insertSetting.description || null
    };
    this.settings.set(insertSetting.key, setting);
    return setting;
  }

  async getSettings(): Promise<Setting[]> {
    return Array.from(this.settings.values());
  }
  
  // Award methods
  async getAward(id: number): Promise<Award | undefined> {
    return this.awards.get(id);
  }
  
  async getAwards(): Promise<Award[]> {
    return Array.from(this.awards.values());
  }
  
  async getActiveAwards(): Promise<Award[]> {
    return Array.from(this.awards.values()).filter(
      award => award.status === "active"
    );
  }
  
  async createAward(insertAward: InsertAward): Promise<Award> {
    const id = this.awardIdCounter++;
    const now = new Date();
    const award: Award = {
      ...insertAward,
      id,
      status: insertAward.status || "upcoming",
      startDate: insertAward.startDate || null,
      endDate: insertAward.endDate || null,
      createdAt: now
    };
    this.awards.set(id, award);
    return award;
  }
  
  async updateAwardStatus(id: number, status: string): Promise<Award | undefined> {
    const award = this.awards.get(id);
    if (!award) return undefined;
    
    const updatedAward = { ...award, status };
    this.awards.set(id, updatedAward);
    return updatedAward;
  }
  
  // Vote methods
  async getVote(id: number): Promise<Vote | undefined> {
    return this.votes.get(id);
  }
  
  async getVotesByParticipant(participantId: number): Promise<Vote[]> {
    return Array.from(this.votes.values()).filter(
      vote => vote.participantId === participantId
    );
  }
  
  async getVotesByUser(userId: number): Promise<Vote[]> {
    return Array.from(this.votes.values()).filter(
      vote => vote.userId === userId
    );
  }
  
  async getVotesByAward(awardId: number): Promise<Vote[]> {
    return Array.from(this.votes.values()).filter(
      vote => vote.awardId === awardId
    );
  }
  
  async createVote(insertVote: InsertVote): Promise<Vote> {
    const id = this.voteIdCounter++;
    const now = new Date();
    const vote: Vote = {
      ...insertVote,
      id,
      value: insertVote.value || 1,
      comment: insertVote.comment || null,
      transactionHash: insertVote.transactionHash || null,
      createdAt: now
    };
    this.votes.set(id, vote);
    return vote;
  }
  
  async countVotesForParticipant(participantId: number): Promise<number> {
    return Array.from(this.votes.values()).filter(
      vote => vote.participantId === participantId
    ).length;
  }
  
  // Progress Update methods
  async getProgressUpdate(id: number): Promise<ProgressUpdate | undefined> {
    return this.progressUpdates.get(id);
  }
  
  async getProgressUpdatesByParticipant(participantId: number): Promise<ProgressUpdate[]> {
    return Array.from(this.progressUpdates.values())
      .filter(update => update.participantId === participantId)
      .sort((a, b) => a.month - b.month);
  }
  
  async getProgressUpdatesByMonth(month: number): Promise<ProgressUpdate[]> {
    return Array.from(this.progressUpdates.values()).filter(
      update => update.month === month
    );
  }
  
  async createProgressUpdate(insertUpdate: InsertProgressUpdate): Promise<ProgressUpdate> {
    const id = this.progressUpdateIdCounter++;
    const now = new Date();
    const update: ProgressUpdate = {
      ...insertUpdate,
      id,
      milestone: insertUpdate.milestone || null,
      videoUrl: insertUpdate.videoUrl || null,
      images: insertUpdate.images || [],
      socialPosts: insertUpdate.socialPosts || [],
      interactionCount: 0, // Initialize with 0
      createdAt: now
    };
    this.progressUpdates.set(id, update);
    
    // Update the participant's current milestone
    const participant = await this.getParticipant(insertUpdate.participantId);
    if (participant) {
      const completionPercentage = Math.floor((insertUpdate.month / 12) * 100);
      const updatedParticipant = { 
        ...participant, 
        currentMilestone: insertUpdate.milestone || participant.currentMilestone,
        challengeCompletion: completionPercentage
      };
      this.participants.set(participant.id, updatedParticipant);
    }
    
    return update;
  }
  
  async updateInteractionCount(id: number, count: number): Promise<ProgressUpdate | undefined> {
    const update = this.progressUpdates.get(id);
    if (!update) return undefined;
    
    const updatedUpdate = { ...update, interactionCount: count };
    this.progressUpdates.set(id, updatedUpdate);
    
    // Also update the participant's social interactions total
    const participant = await this.getParticipant(update.participantId);
    if (participant) {
      // Get all progress updates for this participant
      const updates = await this.getProgressUpdatesByParticipant(participant.id);
      const totalInteractions = updates.reduce((sum, update) => sum + update.interactionCount, 0);
      
      // Update the participant's social interactions count
      const updatedParticipant = { ...participant, socialInteractions: totalInteractions };
      this.participants.set(participant.id, updatedParticipant);
    }
    
    return updatedUpdate;
  }
  
  // Transaction methods
  async getTransaction(id: number): Promise<Transaction | undefined> {
    return this.transactions.get(id);
  }
  
  async getTransactionsByUser(userId: number): Promise<Transaction[]> {
    return Array.from(this.transactions.values()).filter(
      tx => tx.userId === userId
    );
  }
  
  async getTransactionsByType(txType: string): Promise<Transaction[]> {
    return Array.from(this.transactions.values()).filter(
      tx => tx.txType === txType
    );
  }
  
  async createTransaction(insertTx: InsertTransaction): Promise<Transaction> {
    const id = this.transactionIdCounter++;
    const now = new Date();
    const tx: Transaction = {
      ...insertTx,
      id,
      status: insertTx.status || "pending",
      createdAt: now
    };
    this.transactions.set(id, tx);
    return tx;
  }
  
  async updateTransactionStatus(id: number, status: string): Promise<Transaction | undefined> {
    const tx = this.transactions.get(id);
    if (!tx) return undefined;
    
    const updatedTx = { ...tx, status };
    this.transactions.set(id, updatedTx);
    return updatedTx;
  }
  
  async getFounderProfitTotal(): Promise<string> {
    // Sum up all confirmed founder profits
    const confirmedTxs = Array.from(this.transactions.values()).filter(
      tx => tx.status === "confirmed"
    );
    
    // Convert string BNB values to numbers, sum them, then convert back to string
    // Using string representation to avoid floating point precision issues with crypto amounts
    const totalProfit = confirmedTxs.reduce((sum, tx) => {
      return sum + parseFloat(tx.founderProfit);
    }, 0);
    
    return totalProfit.toString();
  }
}

// Export a singleton instance of the storage
export const storage = new MemStorage();
