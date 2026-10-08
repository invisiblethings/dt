import { PRODUCTS, GUARANTEE_DAYS, LINKS, BRAND } from './site';

const pfa = PRODUCTS.pianoforall;

export type Faq = { id: string; q: string; a: string; group: string };

// Plain text answers: rendered on the page as paragraphs and reused verbatim
// in FAQPage structured data, so the markup always matches what people see.
export const FAQS: Faq[] = [
  // Is it right for me?
  {
    id: 'beginner',
    group: 'Is Pianoforall right for me?',
    q: 'I’m a complete beginner. Will Pianoforall be too hard?',
    a: `No. Pianoforall assumes you have never played and can’t read music. Lesson one shows you where to put your hands and how to play your first chord. Each lesson adds one new thing, and you can repeat any lesson as often as you like.`,
  },
  {
    id: 'read-music',
    group: 'Is Pianoforall right for me?',
    q: 'Do I need to read music?',
    a: `No. You start by watching, listening and playing chords and rhythms. Reading comes in gradually, and Book 8 takes you through sheet music properly once the notes already mean something to you. You finish the course able to play by ear and read.`,
  },
  {
    id: 'age',
    group: 'Is Pianoforall right for me?',
    q: 'Am I too old to learn piano?',
    a: `No. Robin designed Pianoforall for adults, and many students start in their 50s, 60s and 70s. Adults spot patterns quickly and already know what music should sound like, which helps with a chord-and-rhythm approach. Short, regular practice matters far more than age.`,
  },
  {
    id: 'kids',
    group: 'Is Pianoforall right for me?',
    q: 'Is it suitable for children?',
    a: `Pianoforall works best for teenagers and adults. It isn’t designed for pre-teen children working alone, though some parents work through it alongside their kids. For a young child on their own, a course built for children, such as Hoffman Academy, is a better first step.`,
  },
  {
    id: 'already-play',
    group: 'Is Pianoforall right for me?',
    q: 'I can already read music. What will Pianoforall teach me?',
    a: `Chords, rhythm patterns, playing by ear and improvising: the skills many classically trained players never picked up. Students who can read often move through Book 1 quickly and get the most from the inversions, ballad, blues and jazz books.`,
  },
  {
    id: 'genres',
    group: 'Is Pianoforall right for me?',
    q: 'What styles of music will I learn?',
    a: `Rhythm-style pop piano, blues and rock ’n’ roll, ballads, jazz, improvisation and classical pieces. The aim is skills you can apply to any song, rather than a fixed list of songs.`,
  },
  {
    id: 'vs-youtube',
    group: 'Is Pianoforall right for me?',
    q: 'Why pay for a course when YouTube is free?',
    a: `YouTube is great for single songs and tips. It doesn’t tell you what to learn next, so most self-taught players end up with a pile of half-learned pieces and gaps in the basics. Pianoforall gives you one tested order, from your first chord to jazz and classical, with every video, audio clip and diagram sitting inside the lesson it belongs to.`,
  },
  {
    id: 'vs-apps',
    group: 'Is Pianoforall right for me?',
    q: 'How is Pianoforall different from apps like Simply Piano or Flowkey?',
    a: `Most apps listen to you play and score you as notes scroll past. They suit people who enjoy game-style feedback and learning song by song. Pianoforall teaches you how music fits together, through chords, rhythm patterns and playing by ear, so you can work songs out yourself. It is also a one-time purchase rather than a subscription.`,
  },

  // How it works
  {
    id: 'practice-time',
    group: 'How the course works',
    q: 'How long do I need to practise each day?',
    a: `About 15 to 30 minutes. Robin recommends short, regular sessions over long weekly ones, because your hands learn new movements between sessions. Many students find they practise longer because they enjoy it.`,
  },
  {
    id: 'how-long',
    group: 'How the course works',
    q: 'How long before I sound good?',
    a: `You play a two-handed chord pattern in the first lessons, and students often write in to say they were playing recognisable chord progressions within days. The full course has ${pfa.lessons} lessons, so expect to spend many months with it. Everyone moves at a different pace, which is why Robin doesn’t promise a deadline.`,
  },
  {
    id: 'keyboard',
    group: 'How the course works',
    q: 'Do I need a piano, or will a keyboard do?',
    a: `A keyboard is fine. Look for at least 61 full-size keys (76 or 88 if space and budget allow), touch-sensitive keys and a socket for a sustain pedal. Weighted keys are a bonus. An acoustic piano or digital piano works just as well.`,
  },
  {
    id: 'midi',
    group: 'How the course works',
    q: 'Do I need to connect my keyboard to a computer?',
    a: `No. Pianoforall doesn’t listen to or analyse your playing, so you don’t need cables, MIDI or a microphone. You watch and listen on any screen and play along on your instrument.`,
  },
  {
    id: 'access',
    group: 'How the course works',
    q: 'How do I access the lessons?',
    a: `Straight after you buy, you get access to the online course player, where you can start the first lesson in minutes. You can also download the complete course as ebooks with the video and audio built in, for practising offline.`,
  },
  {
    id: 'devices',
    group: 'How the course works',
    q: 'Which devices does it work on?',
    a: `Computers, tablets and phones. The online player runs in any modern browser. The offline ebooks open in the Books app on Mac, iPad and iPhone, and in the free Kotobee Reader app on Windows and Android. Kindle Fire tablets aren’t officially supported.`,
  },
  {
    id: 'offline',
    group: 'How the course works',
    q: 'Do I need to be online?',
    a: `Only for the online course player. Once you download the ebooks, every video and audio clip plays offline, which is handy if your piano is in a room with poor Wi‑Fi.`,
  },
  {
    id: 'print',
    group: 'How the course works',
    q: 'Can I print the books?',
    a: `Yes. You can print a whole book or just the pages you’re working on. Many students keep a tablet on the music stand for the videos and a printed page for the chord charts.`,
  },
  {
    id: 'support',
    group: 'How the course works',
    q: 'What if I get stuck?',
    a: `Ask a question under any lesson in the course player, post in The Piano Lounge student community, or email Robin at ${BRAND.email}. Robin reads every message and replies personally.`,
  },

  // Buying
  {
    id: 'price',
    group: 'Price, payment and refunds',
    q: `Is $${pfa.price} a one-time payment?`,
    a: `Yes. You pay $${pfa.price} once and keep the course for life, including future updates. There is no subscription and you will never be charged again for it.`,
  },
  {
    id: 'refund',
    group: 'Price, payment and refunds',
    q: `How does the ${GUARANTEE_DAYS}-day guarantee work?`,
    a: `If Pianoforall isn’t right for you, ask for a refund within ${GUARANTEE_DAYS} days of buying. Email Robin and he will set it up, or request it directly from ClickBank, the retailer that handles payments. You don’t need to give a reason.`,
  },
  {
    id: 'clickbank',
    group: 'Price, payment and refunds',
    q: 'Who processes the payment?',
    a: `ClickBank, a large online retailer of digital products, handles checkout and refunds. Your card statement will show a charge from CLKBANK*. You can review your order before you pay. For order questions, contact ClickBank or call ${LINKS.clickbankPhone}.`,
  },
  {
    id: 'free-trial',
    group: 'Price, payment and refunds',
    q: 'Can I try it before I buy?',
    a: `Yes. The free Test Drive includes real Pianoforall lessons (you learn a broken-chord ballad), the Mindful Notes ebook and access to The Piano Lounge community. You don’t need a card.`,
  },
  {
    id: 'bundles',
    group: 'Price, payment and refunds',
    q: 'Are there bundles?',
    a: `Yes. The three Classics By Ear courses together cost $${PRODUCTS.classicsBundle.price}. Pianoforall plus all three Classics By Ear courses costs $${PRODUCTS.completeBundle.price}. Each course on its own is $${pfa.price}.`,
  },
  {
    id: 'gift',
    group: 'Price, payment and refunds',
    q: 'Can I give Pianoforall as a gift?',
    a: `Yes. Buy the course with your own details, then email ${BRAND.email} with the recipient’s name and email address and an optional message. Robin will enrol them and send a personal welcome.`,
  },

  // Classics By Ear
  {
    id: 'cbe-what',
    group: 'Classics By Ear',
    q: 'What are the Classics By Ear courses?',
    a: `Short courses that each teach one classical work: Beethoven’s Moonlight Sonata (1st movement), Satie’s three Gnossiennes, or two Bach preludes. Robin breaks each piece into small sections and teaches the chords and patterns underneath, using video, keyboard diagrams and annotated sheet music.`,
  },
  {
    id: 'cbe-need-pfa',
    group: 'Classics By Ear',
    q: 'Do I need to finish Pianoforall first?',
    a: `No. Each Classics By Ear course stands on its own. If you’re new to piano, the Bach preludes and Satie’s first Gnossienne are gentler starting points than the Moonlight Sonata.`,
  },
  {
    id: 'cbe-reading',
    group: 'Classics By Ear',
    q: 'Do I need to read music for Classics By Ear?',
    a: `No. You learn each section by watching, listening and following keyboard diagrams. The written music is there alongside, so you can connect what you play to the notes on the page as you go.`,
  },
];

export const faqsById = (...ids: string[]) => ids.map((id) => FAQS.find((f) => f.id === id)!).filter(Boolean);
export const FAQ_GROUPS = [...new Set(FAQS.map((f) => f.group))];
