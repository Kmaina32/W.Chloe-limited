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
  },
  {
    id: '2',
    name: 'DJ Tunde',
    genre: 'Amapiano',
    country: 'South Africa',
    imageUrl: findImage('artist-2'),
    imageHint: 'dj console',
  },
  {
    id: '3',
    name: 'Kwame Mensah',
    genre: 'Actor',
    country: 'Ghana',
    imageUrl: findImage('artist-3'),
    imageHint: 'actor stage',
  },
  {
    id: '4',
    name: 'Zola Dia',
    genre: 'R&B',
    country: 'Senegal',
    imageUrl: findImage('artist-4'),
    imageHint: 'singer microphone',
  },
  {
    id: '5',
    name: 'Nia Imani',
    genre: 'Dancer',
    country: 'Kenya',
    imageUrl: findImage('artist-5'),
    imageHint: 'dancer motion',
  },
  {
    id: '6',
    name: 'Bantu Drums',
    genre: 'Traditional',
    country: 'Uganda',
    imageUrl: findImage('artist-6'),
    imageHint: 'african instrument',
  },
];

export const events = [
  {
    id: '1',
    name: 'Lagos Vibe Fest',
    date: '2024-12-15',
    location: 'Lagos, Nigeria',
    artist: 'Amara Kante',
  },
  {
    id: '2',
    name: 'Cape Town Groove',
    date: '2024-11-20',
    location: 'Cape Town, South Africa',
    artist: 'DJ Tunde',
  },
  {
    id: '3',
    name: 'Accra Arts Night',
    date: '2024-10-30',
    location: 'Accra, Ghana',
    artist: 'Kwame Mensah',
  },
  {
    id: '4',
    name: 'Dakar Soul Sessions',
    date: '2025-01-05',
    location: 'Dakar, Senegal',
    artist: 'Zola Dia',
  },
];

export const partners = [
  { id: '1', name: 'NRG Radio', logoUrl: findImage('partner-1'), imageHint: 'media logo' },
  { id: '2', name: 'Trace Africa', logoUrl: findImage('partner-2'), imageHint: 'music logo' },
  { id: '3', name: 'Boomplay', logoUrl: findImage('partner-3'), imageHint: 'radio logo' },
  { id: '4', name: 'Mdundo', logoUrl: findImage('partner-4'), imageHint: 'label logo' },
  { id: '5', name: 'Afrochella', logoUrl: findImage('partner-5'), imageHint: 'festival logo' },
  { id: '6', name: 'Universal Music Group', logoUrl: findImage('partner-universal'), imageHint: 'music logo' },
  { id: '7', name: 'Sony Music Entertainment', logoUrl: findImage('partner-sony'), imageHint: 'media logo' },
  { id: '8', name: 'Warner Music Group', logoUrl: findImage('partner-warner'), imageHint: 'record logo' },
  { id: '9', name: 'Mavin Records', logoUrl: findImage('partner-mavin'), imageHint: 'african music' },
  { id: '10', name: 'Gallo Record Company', logoUrl: findImage('partner-gallo'), imageHint: 'retro logo' },
  { id: '11', name: 'Chocolate City', logoUrl: findImage('partner-chocolate-city'), imageHint: 'urban logo' },
  { id: '12', name: 'Effyzzie Music Group', logoUrl: findImage('partner-effyzzie'), imageHint: 'creative logo' },
  { id: '13', name: 'WCB Wasafi', logoUrl: findImage('partner-wcb'), imageHint: 'diamond logo' },
];

export type Artist = typeof artists[0];
export type Event = typeof events[0];
export type Partner = typeof partners[0];
