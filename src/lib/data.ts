import { PlaceHolderImages } from './placeholder-images';

const findImage = (id: string) => {
  const image = PlaceHolderImages.find((img) => img.id === id);
  return image ? image.imageUrl : 'https://placehold.co/600x400';
};

export const artists = [
  {
    id: '1',
    name: 'Amara Kante',
    genre: 'Afrobeat',
    country: 'Nigeria',
    imageUrl: findImage('artist-1'),
    imageHint: 'woman portrait',
    description: 'Amara Kante is a rising star in the Afrobeat scene, known for her powerful vocals and energetic performances. Hailing from Lagos, Nigeria, she blends traditional rhythms with modern sounds to create a unique and captivating musical experience.',
    socialMediaLinks: ['https://twitter.com/amarakante', 'https://instagram.com/amarakante'],
  },
  {
    id: '2',
    name: 'DJ Tunde',
    genre: 'Amapiano',
    country: 'South Africa',
    imageUrl: findImage('artist-2'),
    imageHint: 'dj console',
    description: 'DJ Tunde is a master of the Amapiano sound, bringing infectious grooves from the streets of Soweto to the world. His sets are a journey through the heart of South African house music.',
    socialMediaLinks: ['https://twitter.com/djtunde', 'https://instagram.com/djtunde'],
  },
  {
    id: '3',
    name: 'Kwame Mensah',
    genre: 'Actor',
    country: 'Ghana',
    imageUrl: findImage('artist-3'),
    imageHint: 'actor stage',
    description: 'Kwame Mensah is a celebrated Ghanaian actor, known for his versatile performances in both theatre and film. His powerful stage presence and emotional depth have earned him critical acclaim across the continent.',
    socialMediaLinks: ['https://twitter.com/kwamemensah', 'https://instagram.com/kwamemensah'],
  },
  {
    id: '4',
    name: 'Zola Dia',
    genre: 'R&B',
    country: 'Senegal',
    imageUrl: findImage('artist-4'),
    imageHint: 'singer microphone',
    description: 'Zola Dia\'s soulful voice and poetic lyrics have made her a leading figure in the Senegalese R&B scene. Her music explores themes of love, identity, and social change with a smooth, contemporary sound.',
    socialMediaLinks: ['https://twitter.com/zoladia', 'https://instagram.com/zoladia'],
  },
  {
    id: '5',
    name: 'Nia Imani',
    genre: 'Dancer',
    country: 'Kenya',
    imageUrl: findImage('artist-5'),
    imageHint: 'dancer motion',
    description: 'Nia Imani is a dynamic dancer and choreographer from Nairobi, Kenya. Her work fuses traditional African dance with contemporary styles, creating visually stunning and culturally rich performances.',
    socialMediaLinks: ['https://twitter.com/niaimani', 'https://instagram.com/niaimani'],
  },
  {
    id: '6',
    name: 'Bantu Drums',
    genre: 'Traditional',
    country: 'Uganda',
    imageUrl: findImage('artist-6'),
    imageHint: 'african instrument',
    description: 'Bantu Drums is a collective of master percussionists dedicated to preserving and promoting the rich drumming traditions of Uganda. Their performances are a powerful celebration of rhythm and culture.',
    socialMediaLinks: [],
  },
];

export const events = [
  {
    id: '1',
    name: 'Lagos Vibe Fest',
    date: '2024-12-15',
    location: 'Lagos, Nigeria',
    artistIds: ['1'],
    artist: 'Amara Kante',
    description: 'Experience the best of Afrobeat with a headline performance by Amara Kante at the annual Lagos Vibe Fest.',
    imageURL: findImage('event-banner-1'),
  },
  {
    id: '2',
    name: 'Cape Town Groove',
    date: '2024-11-20',
    location: 'Cape Town, South Africa',
    artistIds: ['2'],
    artist: 'DJ Tunde',
    description: 'DJ Tunde brings the Amapiano sound to the beautiful city of Cape Town for a night of non-stop dancing.',
    imageURL: 'https://picsum.photos/seed/event2/1200/600',
  },
  {
    id: '3',
    name: 'Accra Arts Night',
    date: '2024-10-30',
    location: 'Accra, Ghana',
    artistIds: ['3'],
    artist: 'Kwame Mensah',
    description: 'An evening of theatre and drama featuring a special performance by the acclaimed actor Kwame Mensah.',
    imageURL: 'https://picsum.photos/seed/event3/1200/600',
  },
  {
    id: '4',
    name: 'Dakar Soul Sessions',
    date: '2025-01-05',
    location: 'Dakar, Senegal',
    artistIds: ['4'],
    artist: 'Zola Dia',
    description: 'Join Zola Dia for an intimate night of soulful music and poetic storytelling in the heart of Dakar.',
    imageURL: 'https://picsum.photos/seed/event4/1200/600',
  },
];

export const partners = [
  { id: '1', name: 'NRG Radio', logoUrl: findImage('partner-1'), imageHint: 'media logo', websiteURL: 'https://nrg.radio/', description: 'A leading radio station in Kenya.' },
  { id: '2', name: 'Trace Africa', logoUrl: findImage('partner-2'), imageHint: 'music logo', websiteURL: 'https://trace.tv/trace-africa/', description: 'A major music television channel.' },
  { id: '3', name: 'Boomplay', logoUrl: findImage('partner-3'), imageHint: 'radio logo', websiteURL: 'https://www.boomplay.com/', description: 'A popular music streaming service in Africa.' },
  { id: '4', name: 'Mdundo', logoUrl: findImage('partner-4'), imageHint: 'label logo', websiteURL: 'https://mdundo.com/', description: 'A mobile-first music service for Africa.' },
  { id: '5', name: 'Afrochella', logoUrl: findImage('partner-5'), imageHint: 'festival logo', websiteURL: 'https://www.afrochella.com/', description: 'A cultural festival to celebrate African talent.' },
  { id: '6', name: 'Universal Music Group', logoUrl: findImage('partner-universal'), imageHint: 'music logo', websiteURL: 'https://www.universalmusic.com/', description: 'A global music corporation.' },
  { id: '7', name: 'Sony Music Entertainment', logoUrl: findImage('partner-sony'), imageHint: 'media logo', websiteURL: 'https://www.sonymusic.com/', description: 'A global recorded music company.' },
  { id: '8', name: 'Warner Music Group', logoUrl: findImage('partner-warner'), imageHint: 'record logo', websiteURL: 'https://www.wmg.com/', description: 'A major American multinational entertainment and record label conglomerate.' },
  { id: '9', name: 'Mavin Records', logoUrl: findImage('partner-mavin'), imageHint: 'african music', websiteURL: 'https://mavinrecords.com/', description: 'A Nigerian record label founded by record producer Don Jazzy.' },
  { id: '10', name: 'Gallo Record Company', logoUrl: findImage('partner-gallo'), imageHint: 'retro logo', websiteURL: 'https://gallo.co.za/', description: 'The largest and oldest independent record label in South Africa.' },
  { id: '11', name: 'Chocolate City', logoUrl: findImage('partner-chocolate-city'), imageHint: 'urban logo', websiteURL: 'https://chocolatecitymusic.com/', description: 'A Nigerian record label founded in 2005 by advocate and entrepreneur Audu Maikori.' },
  { id: '12', name: 'Effyzzie Music Group', logoUrl: findImage('partner-effyzzie'), imageHint: 'creative logo', websiteURL: 'https://effyzziemusic.com/', description: 'A Nigerian record label and artist management company.' },
  { id: '13', name: 'WCB Wasafi', logoUrl: findImage('partner-wcb'), imageHint: 'diamond logo', websiteURL: 'https://www.instagram.com/wcb_wasafi/', description: 'A Tanzanian record label founded by musician Diamond Platnumz.' },
];

export type Artist = (typeof artists)[0];
export type Event = (typeof events)[0];
export type Partner = (typeof partners)[0];
