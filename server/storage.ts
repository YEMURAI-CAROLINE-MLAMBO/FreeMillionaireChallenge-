import { 
  users, 
  ads, 
  participants, 
  viewers, 
  settings,
  nftBadges,
  vrExperiences,
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
  type InsertVrExperience
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
}

export class MemStorage implements IStorage {
  private users: Map<number, User>;
  private ads: Map<number, Ad>;
  private participants: Map<number, Participant>;
  private viewers: Map<number, Viewer>;
  private settings: Map<string, Setting>;
  private nftBadges: Map<number, NFTBadge>;
  private vrExperiences: Map<number, VrExperience>;
  
  private userIdCounter: number;
  private adIdCounter: number;
  private participantIdCounter: number;
  private viewerIdCounter: number;
  private settingIdCounter: number;
  private nftBadgeIdCounter: number;
  private vrExperienceIdCounter: number;

  constructor() {
    this.users = new Map();
    this.ads = new Map();
    this.participants = new Map();
    this.viewers = new Map();
    this.settings = new Map();
    this.nftBadges = new Map();
    this.vrExperiences = new Map();
    
    this.userIdCounter = 1;
    this.adIdCounter = 1;
    this.participantIdCounter = 1;
    this.viewerIdCounter = 1;
    this.settingIdCounter = 1;
    this.nftBadgeIdCounter = 1;
    this.vrExperienceIdCounter = 1;
    
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
    
    // Set the maximum participants
    this.createOrUpdateSetting({
      key: "maxParticipants",
      value: "9",
      description: "Maximum number of participants allowed"
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
}

// Export a singleton instance of the storage
export const storage = new MemStorage();
