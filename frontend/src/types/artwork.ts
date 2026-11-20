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
  artistName: string;
  artistHandle: string;
  artistAvatar: string;
  category: 'Pintura' | 'Cerâmica' | 'Ilustração Digital' | 'Escultura' | 'Têxtil';
  price: number;
  imageUrl: string;
  description: string;
  dimensions: string;
  technique: string;
  hasDocumentedProcess: boolean;
  creativeProcess: CreativeProcessStep[];
}

export interface CartItem {
  artwork: Artwork;
  quantity: number;
}
