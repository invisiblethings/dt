import { PRODUCTS } from './site';

export const CLASSICS = [
  {
    slug: 'moonlight-sonata',
    product: PRODUCTS.moonlight,
    composer: 'Beethoven',
    piece: 'Moonlight Sonata, 1st movement',
    h1: 'Learn the Moonlight Sonata by ear',
    title: 'Learn Moonlight Sonata on Piano (1st Movement) by Ear',
    metaDescription: 'Learn the first movement of Beethoven’s Moonlight Sonata step by step: 38 video lessons, keyboard diagrams and annotated sheet music. No reading needed. $49 once.',
    intro:
      'The first movement of the Moonlight Sonata looks frightening on the page: page after page of triplets. Underneath, it is a slow chord progression with a repeating triplet pattern on top. Robin teaches you that pattern first, then walks you through the piece a few bars at a time.',
    level: 'The hardest of the three Classics By Ear courses. Complete beginners have finished it, but most find the Bach or Satie course an easier first piece.',
    youLearn: [
      'The whole first movement, start to finish',
      'The triplet pattern and the chords underneath it',
      'Which bars repeat, so you only learn each idea once',
      'How what you play matches the notes on the page',
      'Fingering and memory tricks for the tricky passages',
    ],
    testimonialIds: ['saygidegere', 'wei', 'kappenberg', 'theotokis'],
    hasVideo: true,
  },
  {
    slug: 'erik-satie-gnossiennes',
    product: PRODUCTS.satie,
    composer: 'Erik Satie',
    piece: 'Three Gnossiennes',
    h1: 'Learn Satie’s Gnossiennes by ear',
    title: 'Learn Satie Gnossienne No. 1, 2 and 3 on Piano by Ear',
    metaDescription: 'Learn all three of Erik Satie’s Gnossiennes step by step: 45 video lessons, keyboard diagrams and sheet music. Chords and patterns first. $49 once.',
    intro:
      'Satie’s Gnossiennes sound mysterious and free, with no bar lines in the original score. The left hand mostly repeats a few simple chord shapes, which makes them a lovely first classical piece. Robin teaches the harmony and rhythm first, then the melody, then puts them together.',
    level: 'A gentle start. Gnossienne No. 1 is one of the most approachable classical pieces you can learn, and students often play it within a few sessions.',
    youLearn: [
      'Gnossiennes No. 1, 2 and 3, start to finish',
      'The left-hand chord patterns that hold each piece together',
      'The melody, phrase by phrase',
      'How to shape Satie’s free, unhurried rhythm',
      'How each section relates to the written music',
    ],
    testimonialIds: ['satie-weekend', 'satie-structure'],
    hasVideo: false,
  },
  {
    slug: 'bach-preludes',
    product: PRODUCTS.bach,
    composer: 'J. S. Bach',
    piece: 'Prelude in C major and Prelude in C minor',
    h1: 'Learn Bach’s Preludes in C major and C minor by ear',
    title: 'Learn Bach Prelude in C Major (and C Minor) on Piano by Ear',
    metaDescription: 'Learn Bach’s Prelude in C major and Prelude in C minor step by step: 48 video lessons, keyboard diagrams and sheet music. Learn the chord shapes first. $49 once.',
    intro:
      'Bach’s Prelude in C major is one long chord progression played as a repeating broken-chord figure. Once you see the shape of each chord, you only need to learn the order, and the piece falls into place. The C minor prelude uses the same idea with more drive. Robin teaches both, a bar or two at a time.',
    level: 'A good first classical course. The C major prelude suits beginners who have learned a few chords.',
    youLearn: [
      'Both preludes, start to finish',
      'The chord progression behind every bar',
      'The broken-chord figure your hands repeat',
      'Memory tricks so you can play without the score',
      'How each chord looks in the sheet music',
    ],
    testimonialIds: ['bach-months', 'bach-humans'],
    hasVideo: false,
  },
] as const;
