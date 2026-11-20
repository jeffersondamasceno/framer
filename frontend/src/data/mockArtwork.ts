import type { Artwork } from '../types/artwork';

export const MOCK_ARTWORKS: Artwork[] = [
  {
    id: 'art-1',
    title: 'Horizonte Terracota II',
    artistName: 'Clara Mendes',
    artistHandle: '@claramendes.ceramica',
    artistAvatar:
      'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80',
    category: 'Cerâmica',
    price: 420.0,
    imageUrl:
      'https://images.unsplash.com/photo-1610701596007-11502861dcfa?auto=format&fit=crop&w=800&q=80',
    description:
      'Vaso esculpido manualmente em argila terracota regional, com esmaltação fosca e queima em alta temperatura.',
    dimensions: '28cm x 16cm',
    technique: 'Modelagem manual (pinching) e queima em forno elétrico',
    hasDocumentedProcess: true,
    creativeProcess: [
      {
        id: 'step-1',
        title: 'Estudo de Proporções e Esboço',
        description:
          'Desenho técnico inicial definindo a silhueta orgânica e espessura das paredes.',
        type: 'sketch',
        timestamp: '12 Out 2026',
        mediaUrl:
          'https://images.unsplash.com/photo-1513364776144-60967b0f800f?auto=format&fit=crop&w=600&q=80',
      },
      {
        id: 'step-2',
        title: 'Modelagem em Ponto de Couro',
        description:
          'Acabamento das curvas externas antes da primeira queima (biscoito).',
        type: 'wip',
        timestamp: '18 Out 2026',
        mediaUrl:
          'https://images.unsplash.com/photo-1565193566173-7a0ee3dbe261?auto=format&fit=crop&w=600&q=80',
      },
    ],
  },
  {
    id: 'art-2',
    title: 'Luzes da Baía do Guajará',
    artistName: 'Mateus Oliveira',
    artistHandle: '@mateus.oleo',
    artistAvatar:
      'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80',
    category: 'Pintura',
    price: 890.0,
    imageUrl:
      'https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?auto=format&fit=crop&w=800&q=80',
    description:
      'Óleo sobre tela retratando o entardecer amazônico com pinceladas expressionistas e textura espessa.',
    dimensions: '60cm x 80cm',
    technique: 'Óleo sobre tela de linho cru',
    hasDocumentedProcess: true,
    creativeProcess: [
      {
        id: 'step-2-1',
        title: 'Imprimatura e Bloqueio de Cores',
        description:
          'Aplicação da base tonal quente e definição das massas de luz e sombra.',
        type: 'wip',
        timestamp: '02 Nov 2026',
        mediaUrl:
          'https://images.unsplash.com/photo-1460661419201-fd4cecdf8a8b?auto=format&fit=crop&w=600&q=80',
      },
    ],
  },
  {
    id: 'art-3',
    title: 'Botânica Fantástica — Print Fine Art',
    artistName: 'Helena Sato',
    artistHandle: '@helenasato.art',
    artistAvatar:
      'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=150&q=80',
    category: 'Ilustração Digital',
    price: 185.0,
    imageUrl:
      'https://images.unsplash.com/photo-1541961017774-22349e4a1262?auto=format&fit=crop&w=800&q=80',
    description:
      'Ilustração autoral pintada quadro a quadro, impressa em papel algodão Hahnemühle 308g. Processo 100% livre de IA.',
    dimensions: '42cm x 59.4cm (A2)',
    technique: 'Pintura digital autoral + Impressão Giclée',
    hasDocumentedProcess: true,
    creativeProcess: [
      {
        id: 'step-3-1',
        title: 'Lineart e Rascunho Inicial',
        description:
          'Traço livre realizado em mesa digitalizadora sem uso de referências sintéticas.',
        type: 'sketch',
        timestamp: '05 Nov 2026',
        mediaUrl:
          'https://images.unsplash.com/photo-1515405295579-ba7b45403062?auto=format&fit=crop&w=600&q=80',
      },
      {
        id: 'step-3-2',
        title: 'Timelapse de Camadas de Pintura',
        description:
          'Registro das 14 horas de renderização manual de luz e textura.',
        type: 'video',
        timestamp: '10 Nov 2026',
        mediaUrl:
          'https://images.unsplash.com/photo-1513364776144-60967b0f800f?auto=format&fit=crop&w=600&q=80',
      },
    ],
  },
  {
    id: 'art-4',
    title: 'Tapeçaria Trama Viva',
    artistName: 'Dandara Costa',
    artistHandle: '@dandara.fios',
    artistAvatar:
      'https://images.unsplash.com/photo-1531123897727-8f129e1688ce?auto=format&fit=crop&w=150&q=80',
    category: 'Têxtil',
    price: 540.0,
    imageUrl:
      'https://images.unsplash.com/photo-1528459801416-a9e53bbf4e17?auto=format&fit=crop&w=800&q=80',
    description:
      'Painel têxtil tecido em tear manual com fios de algodão cru tingidos naturalmente com urucum e cúrcuma.',
    dimensions: '50cm x 90cm',
    technique: 'Tecelagem manual e tingimento botânico',
    hasDocumentedProcess: true,
    creativeProcess: [
      {
        id: 'step-4-1',
        title: 'Tingimento Natural dos Fios',
        description:
          'Extração de pigmentos orgânicos e preparação da urdidura no tear.',
        type: 'wip',
        timestamp: '28 Out 2026',
        mediaUrl:
          'https://images.unsplash.com/photo-1606722590583-6951b5ea92ad?auto=format&fit=crop&w=600&q=80',
      },
    ],
  },
];

export const CATEGORIES = [
  'Todas',
  'Pintura',
  'Cerâmica',
  'Ilustração Digital',
  'Escultura',
  'Têxtil',
] as const;
