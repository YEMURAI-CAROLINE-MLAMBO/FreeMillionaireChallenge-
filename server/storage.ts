import { 
  users, 
  ads, 
  participants, 
  viewers, 
  settings,
  type User, 
  type InsertUser, 
  type Ad, 
  type InsertAd, 
  type Participant, 
  type InsertParticipant, 
  type Viewer, 
  type InsertViewer,
  type Setting,
  type InsertSetting
} from "@shared/schema";

export interface IStorage {
  // User methods
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  getUserByEmail(email: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  getUsersByRole(role: string): Promise<User[]>;
  
  // Ad methods
  getAd(id: number): Promise<Ad | undefined>;
  getAds(limit?: number, offset?: number): Promise<Ad[]>;
  getAdsByStatus(status: string): Promise<Ad[]>;
  getAdsByUser(userId: number): Promise<Ad[]>;
  createAd(ad: InsertAd): Promise<Ad>;
  updateAdStatus(id: number, status: string): Promise<Ad | undefined>;
  updateAdPaymentStatus(id: number, paymentStatus: string): Promise<Ad | undefined>;
  
  // Participant methods
  getParticipant(id: number): Promise<Participant | undefined>;
  getParticipantByUserId(userId: number): Promise<Participant | undefined>;
  getParticipants(): Promise<Participant[]>;
  getActiveParticipantsCount(): Promise<number>;
  createParticipant(participant: InsertParticipant): Promise<Participant>;
  
  // Viewer methods
  getViewer(id: number): Promise<Viewer | undefined>;
  getViewerByEmail(email: string): Promise<Viewer | undefined>;
  getViewers(): Promise<Viewer[]>;
  createViewer(viewer: InsertViewer): Promise<Viewer>;
  
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
  
  private userIdCounter: number;
  private adIdCounter: number;
  private participantIdCounter: number;
  private viewerIdCounter: number;
  private settingIdCounter: number;

  constructor() {
    this.users = new Map();
    this.ads = new Map();
    this.participants = new Map();
    this.viewers = new Map();
    this.settings = new Map();
    
    this.userIdCounter = 1;
    this.adIdCounter = 1;
    this.participantIdCounter = 1;
    this.viewerIdCounter = 1;
    this.settingIdCounter = 1;
    
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

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = this.userIdCounter++;
    const now = new Date();
    const user: User = { 
      ...insertUser, 
      id,
      createdAt: now
    };
    this.users.set(id, user);
    return user;
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
      createdAt: now
    };
    this.ads.set(id, ad);
    return ad;
  }

  async updateAdStatus(id: number, status: string): Promise<Ad | undefined> {
    const ad = this.ads.get(id);
    if (!ad) return undefined;
    
    const updatedAd = { ...ad, status };
    this.ads.set(id, updatedAd);
    return updatedAd;
  }

  async updateAdPaymentStatus(id: number, paymentStatus: string): Promise<Ad | undefined> {
    const ad = this.ads.get(id);
    if (!ad) return undefined;
    
    const updatedAd = { ...ad, paymentStatus };
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
      createdAt: now
    };
    this.participants.set(id, participant);
    return participant;
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
      createdAt: now
    };
    this.viewers.set(id, viewer);
    return viewer;
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
        description: insertSetting.description || existing.description
      };
      this.settings.set(insertSetting.key, updated);
      return updated;
    }
    
    const id = this.settingIdCounter++;
    const setting: Setting = { 
      ...insertSetting, 
      id
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
