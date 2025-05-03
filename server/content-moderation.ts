/**
 * Content moderation service for the FreeMillionaireChallenge platform
 * 
 * This service implements automated content filtering with strict rules to ensure
 * all content on the platform follows community guidelines.
 */

// Forbidden content categories with associated keywords
const MODERATION_RULES = {
  // Adult content/nudity
  adult: {
    keywords: [
      'nude', 'nudity', 'naked', 'sex', 'porn', 'pornography', 'adult content',
      'xxx', 'nsfw', 'sexual', 'explicit', 'erotic', 'erotica'
    ],
    reason: 'Adult content or nudity is not allowed on this platform'
  },
  
  // Hate speech/discrimination
  hate: {
    keywords: [
      'racist', 'racism', 'sexist', 'sexism', 'homophobic', 'homophobia', 
      'transphobic', 'transphobia', 'bigot', 'bigotry', 'discrimination', 
      'hate speech', 'slur', 'offensive'
    ],
    reason: 'Hate speech or discriminatory content is not allowed'
  },
  
  // Scams/fraudulent content
  scam: {
    keywords: [
      'scam', 'fraud', 'fraudulent', 'pyramid scheme', 'ponzi', 'get rich quick',
      'investment scam', 'free money', 'guaranteed returns', 'risk-free investment'
    ],
    reason: 'Potentially fraudulent or scam-related content is not allowed'
  },
  
  // Illegal activities
  illegal: {
    keywords: [
      'illegal', 'unlawful', 'criminal', 'hack', 'hacking', 'piracy', 'pirate',
      'drugs', 'narcotics', 'stolen', 'theft', 'counterfeit', 'weapons'
    ],
    reason: 'Content related to illegal activities is not allowed'
  },
  
  // Violent content
  violence: {
    keywords: [
      'violence', 'violent', 'gore', 'graphic', 'bloody', 'murder', 'kill',
      'death', 'suicide', 'attack', 'assault', 'torture', 'abuse'
    ],
    reason: 'Violent or graphic content is not allowed'
  },
  
  // Misleading health claims
  healthClaims: {
    keywords: [
      'cure', 'miracle cure', 'heal all', 'cancer cure', 'covid cure', 
      'guaranteed healing', 'medical miracle', 'alternative medicine',
      'reject medicine', 'vaccine danger', 'anti-vax'
    ],
    reason: 'Misleading health claims are not allowed'
  },
  
  // Gambling content
  gambling: {
    keywords: [
      'gambling', 'casino', 'bet', 'betting', 'lottery', 'slot', 'poker',
      'roulette', 'blackjack', 'sports betting'
    ],
    reason: 'Gambling-related content is not allowed without proper certification'
  }
};

/**
 * Checks if content contains any forbidden keywords from the moderation rules
 * @param content The text content to moderate
 * @returns Result object with approval status and reason if rejected
 */
export function moderateContent(content: string): { 
  approved: boolean; 
  category?: string;
  reason?: string;
} {
  // If content is empty, consider it safe
  if (!content || content.trim() === '') {
    return { approved: true };
  }
  
  // Normalize content for comparison (lowercase, remove extra spaces)
  const normalizedContent = content.toLowerCase().trim();
  
  // Check against each category of forbidden content
  for (const [category, rule] of Object.entries(MODERATION_RULES)) {
    for (const keyword of rule.keywords) {
      // Check if keyword is present as a full word (using word boundaries)
      const regex = new RegExp(`\\b${keyword}\\b`, 'i');
      if (regex.test(normalizedContent)) {
        return {
          approved: false,
          category,
          reason: rule.reason
        };
      }
    }
  }
  
  // Content passed all checks
  return { approved: true };
}

/**
 * Checks if an image URL contains potentially forbidden content
 * This is a placeholder for a real image moderation service
 * In production, this would integrate with a service like AWS Rekognition or Google Vision API
 * 
 * @param imageUrl The URL of the image to moderate
 * @returns Result object with approval status and reason if rejected
 */
export function moderateImage(imageUrl: string): { 
  approved: boolean; 
  category?: string;
  reason?: string;
} {
  // This is a placeholder implementation that always approves images
  // In a real implementation, this would call an image moderation API
  
  // For demonstration only - checking for obvious problematic URLs
  const normalizedUrl = imageUrl.toLowerCase();
  const suspiciousTerms = ['nsfw', 'xxx', 'adult', 'porn', 'nude'];
  
  for (const term of suspiciousTerms) {
    if (normalizedUrl.includes(term)) {
      return {
        approved: false,
        category: 'adult',
        reason: 'Image URL contains potentially inappropriate terms'
      };
    }
  }
  
  return { approved: true };
}

/**
 * Comprehensive content moderation function for advertisements
 * Checks both text and images against moderation rules
 * 
 * @param adContent Advertisement content object with text fields and image URLs
 * @returns Detailed moderation result with approval status and reasons
 */
export function moderateAdvertisement(adContent: {
  title: string;
  description: string;
  imageUrl?: string;
  targetUrl?: string;
}): {
  approved: boolean;
  rejectionReasons: Array<{
    field: string;
    category: string;
    reason: string;
  }>;
} {
  const rejectionReasons = [];
  
  // Check title
  const titleResult = moderateContent(adContent.title);
  if (!titleResult.approved) {
    rejectionReasons.push({
      field: 'title',
      category: titleResult.category || 'unknown',
      reason: titleResult.reason || 'Title contains prohibited content'
    });
  }
  
  // Check description
  const descriptionResult = moderateContent(adContent.description);
  if (!descriptionResult.approved) {
    rejectionReasons.push({
      field: 'description',
      category: descriptionResult.category || 'unknown',
      reason: descriptionResult.reason || 'Description contains prohibited content'
    });
  }
  
  // Check image URL if provided
  if (adContent.imageUrl) {
    const imageResult = moderateImage(adContent.imageUrl);
    if (!imageResult.approved) {
      rejectionReasons.push({
        field: 'imageUrl',
        category: imageResult.category || 'unknown',
        reason: imageResult.reason || 'Image contains prohibited content'
      });
    }
  }
  
  // Check target URL if provided
  if (adContent.targetUrl) {
    const targetUrlResult = moderateContent(adContent.targetUrl);
    if (!targetUrlResult.approved) {
      rejectionReasons.push({
        field: 'targetUrl',
        category: targetUrlResult.category || 'unknown',
        reason: targetUrlResult.reason || 'Target URL contains prohibited terms'
      });
    }
  }
  
  return {
    approved: rejectionReasons.length === 0,
    rejectionReasons
  };
}

/**
 * Auto-approves or rejects content based on moderation rules
 * Used for streamlining the content moderation process
 * 
 * @param content The content to be auto-moderated
 * @returns Moderation decision with status, reason, and confidence score
 */
export function autoModerateContent(content: {
  title: string;
  description: string;
  imageUrl?: string;
  targetUrl?: string;
}): {
  decision: 'approved' | 'rejected' | 'manual_review';
  reason?: string;
  confidenceScore: number;
  moderationResults: any;
} {
  // Get detailed moderation results
  const moderationResults = moderateAdvertisement(content);
  
  // If content violates any rules, automatic rejection
  if (!moderationResults.approved) {
    return {
      decision: 'rejected',
      reason: moderationResults.rejectionReasons.map(r => r.reason).join('; '),
      confidenceScore: 0.95, // High confidence in rejection
      moderationResults
    };
  }
  
  // For all other content, auto-approve
  return {
    decision: 'approved',
    confidenceScore: 0.90, // High confidence in approval
    moderationResults
  };
}