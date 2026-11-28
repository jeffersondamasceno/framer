export interface CreativeProcessStep {
  id: string;
  title: string;
  description: string;
  type: 'sketch' | 'wip' | 'video';
  timestamp: string;
  mediaUrl: string;
}

export interface Artwork {
  id: string;
  title: string;
  description: string;
  category: string;
  technique: string;
  dimensions: string;
  price: number;
  imageUrl: string;
  isAvailable?: boolean;
  artistId?: string;
  artistName: string;
  artistAvatar: string;
  artistHandle: string;
  hasDocumentedProcess: boolean;
  creativeProcess: CreativeProcessStep[];
}

export interface CartItem {
  artwork: Artwork;
  quantity: number;
}
