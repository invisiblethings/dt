// Student messages published on pianoforall.com and academy.pianoforall.com.
// Wording is the student’s own; "…" marks where a longer message was shortened.
// Obvious typos (e.g. "instument") are corrected; nothing else is changed.
// Do not edit the quotes beyond trimming. Tags drive which page shows which quote.

export type Testimonial = {
  id: string;
  pull: string;
  quote: string;
  name: string;
  place?: string;
  tags: string[];
  course?: 'pianoforall' | 'moonlight' | 'satie' | 'bach';
};

export const TESTIMONIALS: Testimonial[] = [
  {
    id: 'bowen',
    pull: '“You have de-fanged the piano for me.”',
    quote:
      'I keep having moments of “is that all they are doing? … this isn’t such a big mystery after all and why, oh why did I let piano intimidate me for soooooooo long?” … I’m certainly not saying that piano is a breeze … what I am saying is that your course has given me basic tools and built my confidence so high that I do not fear wading into harder material.',
    name: 'Bob Bowen',
    place: 'Conway, Arkansas',
    tags: ['home', 'beginner', 'method'],
    course: 'pianoforall',
  },
  {
    id: 'derek',
    pull: '“I am 74 and have seen a few.”',
    quote:
      'Enjoying learning the piano like I’ve never – bless you for your insight into teaching – it works!! Please accept my highest respect for possibly the best tutorial of all time – I am 74 and have seen a few. You have made me a happy slave to my keyboard and sound!',
    name: 'Derek',
    place: 'Thornton Cleveleys, Lancashire, UK',
    tags: ['home', 'adult', 'older'],
    course: 'pianoforall',
  },
  {
    id: 'hoare',
    pull: '“I could barely play Mary Had a Little Lamb without sheet music.”',
    quote:
      'I grew up playing (mainly) classical piano, starting at 6 and carrying on until I left home at 18. By that time I was pretty good at rattling through Beethoven’s sonatas, but was always frustrated because I could barely play Mary Had a Little Lamb without sheet music. … All those years playing classical and I never really developed a basic understanding of chord sequences. Can’t get enough of those inversions now!',
    name: 'Ed Hoare',
    place: 'London, England',
    tags: ['home', 'returning', 'reader', 'by-ear'],
    course: 'pianoforall',
  },
  {
    id: 'cheeseman',
    pull: '“Too complicated … or too much theory and not enough actual playing.”',
    quote:
      'I have purchased home piano courses in the past, but could never seem to make any real progress. The lessons were either too complicated right from the start that I got frustrated and quit or there was too much theory and not enough actual playing music. … You still have to practice, but the practice is fun.',
    name: 'John Cheeseman',
    place: 'DeWitt, Michigan, USA',
    tags: ['home', 'beginner', 'method', 'quit-before'],
    course: 'pianoforall',
  },
  {
    id: 'collinsworth',
    pull: '“Bite size lessons that don’t overwhelm the student.”',
    quote:
      'As a 63 year old man I find it entertaining, educational and easily understood. I especially like the bite size lessons that doesn’t overwhelm the student (me). … a sense of accomplishment is immediate and inspires one to continue.',
    name: 'Bryan Collinsworth',
    place: 'Jacksonville, Florida, USA',
    tags: ['adult', 'older', 'course'],
    course: 'pianoforall',
  },
  {
    id: 'ravagli',
    pull: '“I actually study piano in a conservatory.”',
    quote:
      'I have been trained to read sheet music and like a robot to translate what is written in physical motions at the piano. … I’ve been working on the rhythms in book 1 these days … just practicing your book 1 for one week improved my Bach and Mozart in an amazing way and even my teacher is amazed at how more rhythmically precise and clean they are.',
    name: 'Daniel Ravagli',
    place: 'Italy',
    tags: ['reader', 'returning', 'method'],
    course: 'pianoforall',
  },
  {
    id: 'kidd',
    pull: '“All the video and audio files are embedded in the lesson.”',
    quote:
      'There are two things that make this course stand out. First, all the video and audio files are embedded in the lesson. … It’s so nice not to have three files going at the same time! The second thing is that you actually get to play in each lesson! And the songs are not “Mary had a Little Lamb” types! From the Beatles to Beethoven, it’s all there.',
    name: 'T. Dwight Kidd',
    place: 'Alabama, USA',
    tags: ['course', 'home'],
    course: 'pianoforall',
  },
  {
    id: 'stuart',
    pull: '“I’ve just turned fifty, and never played.”',
    quote:
      'I’ve just turned FIFTY, and NEVER played, or tried to play any type of musical instrument before. … (a year later) You have (and this is no overstatement) changed my life. I have always liked music but only to listen to. I can play that few tunes I set my goal as, only now I want to progress a little more.',
    name: 'Bob Stuart',
    place: 'Aberdeen, Scotland',
    tags: ['adult', 'beginner', 'older'],
    course: 'pianoforall',
  },
  {
    id: 'cook',
    pull: '“Like strumming a song on the guitar.”',
    quote:
      'I have been playing guitar for some years and as a result I have been able to relate really well to your method. I found with the standard way of learning piano from other books, that I was struggling from the start. … Using your method, I found that I could gain pleasure from playing a backing rhythm almost immediately, just like strumming a song on the guitar.',
    name: 'Gary Cook',
    place: 'UK',
    tags: ['guitar', 'method'],
    course: 'pianoforall',
  },
  {
    id: 'alabama-david',
    pull: '“The highest marks in Music Theory I and II.”',
    quote:
      'I have just completed my degree in Music at the local college. The knowledge I gained from your course is largely responsible for my having the highest marks in Music Theory I and II. … you teach first how music is put together (how chords are formed and the rhythms in which to play them) and then talk about reading.',
    name: 'David',
    place: 'Alabama, USA',
    tags: ['theory', 'reader', 'method'],
    course: 'pianoforall',
  },
  {
    id: 'le-busque',
    pull: '“I was considering giving the piano away.”',
    quote:
      'I’m virtually ecstatic with how I’ve finally managed to play after a year of slogging away trying to learn to read music. … I have literally tried everything I found online to learn and I was considering giving the piano away to a friend when fortunately I found your lessons.',
    name: 'Toni Le Busque',
    place: 'USA',
    tags: ['quit-before', 'reader', 'home'],
    course: 'pianoforall',
  },
  {
    id: 'neltner',
    pull: '“Who would ever have thought at age 60…”',
    quote:
      'Who would ever thought at age 60 that I could learn to play the piano. Your instructions make it fun and challenging to practice practice so you can move to the next lesson. … I am showing up my grandkids who never would dream I could do this.',
    name: 'Martin E. Neltner',
    place: 'Independence, Kentucky, USA',
    tags: ['older', 'adult'],
    course: 'pianoforall',
  },
  {
    id: 'smith',
    pull: '“You can’t phone up a piano tutor every five minutes.”',
    quote:
      'The video clips are also excellent – actually to see what I should be doing is so helpful. The fact that I can return over and again to any part I feel I need to improve is a much better way of proceeding. You can’t phone up a piano tutor every five minutes if you have forgotten something.',
    name: 'Rosalind Smith',
    place: 'East Ayrshire, Scotland',
    tags: ['returning', 'online'],
    course: 'pianoforall',
  },
  {
    id: 'stacey',
    pull: '“The iPad on the music stand.”',
    quote:
      'I had no problem downloading for my PC and also adding the info to my iPad … It’s fantastic to have the iPad on the music stand and be able to play, then read, then listen to an audio clip and watch a video clip.',
    name: 'Stacey (beginner)',
    place: 'Oklahoma, USA',
    tags: ['online', 'course'],
    course: 'pianoforall',
  },
  {
    id: 'grey',
    pull: '“I’ve even got my mum playing again.”',
    quote:
      'I’m playing everything now and it’s so exciting!!! I’m still only on Book 1 and I’ve learned so much already. … I’ve even got my Mum playing again thanks to you!',
    name: 'Jane Grey',
    place: 'London, UK',
    tags: ['beginner'],
    course: 'pianoforall',
  },
  {
    id: 'kelly',
    pull: '“The only piano course that I recommend to my students.”',
    quote:
      'Your course played a large part in the inspiration for my own guitar course, and it’s the only piano course that I recommend to my students.',
    name: 'Brian Kelly',
    place: 'Guitar teacher, zombieguitar.com',
    tags: ['teacher', 'guitar'],
    course: 'pianoforall',
  },
  {
    id: 'wortley',
    pull: '“Rock and blues … book one has given me a huge start.”',
    quote:
      'Like many people I have struggled with traditional piano courses but have found the chord based approach very much easier and satisfying to play. My main aim is to play rock and blues based piano and already book one has given me a huge start on the techniques and ‘turnarounds’ needed for this type of playing.',
    name: 'Andrew Wortley',
    place: 'Huddersfield, England',
    tags: ['blues', 'course'],
    course: 'pianoforall',
  },
  {
    id: 'riddell',
    pull: '“The easiest to use with my pupils.”',
    quote:
      'I have been testing out your Piano for All series with my pupils who are 7-12 years old. … I downloaded three different chordal piano series and bought several books but I found yours to be the easiest to use with my pupils.',
    name: 'Philippa Riddell, piano teacher',
    place: 'Christchurch, New Zealand',
    tags: ['teacher'],
    course: 'pianoforall',
  },
  // Classics By Ear (reviews published on academy.pianoforall.com course pages)
  {
    id: 'saygidegere',
    pull: '“I decided I needed 3 hands to play this song.”',
    quote:
      'I always stared at the notes of Moonlight Sonata and tried to play, but I decided I needed 3 hands to play this song, which meant it was impossible for me! Till I met this course. … It took me about 2 months to complete the course (studying only on weekends and in the evenings) and finally today I could play the whole song without mistake.',
    name: 'Yasemin Saygıdeğer',
    tags: ['classics', 'moonlight'],
    course: 'moonlight',
  },
  {
    id: 'kappenberg',
    pull: '“Never having played piano and not able to read notes.”',
    quote:
      'Quite a fast start and fast playing for a complete beginner. I have to stop the videos and play bits many times … Nevertheless, overall really good and enjoyable course, and I learned to play the 1st movement of the Moonlight Sonata never having played piano and not been able to read notes.',
    name: 'Claudia Kappenberg',
    tags: ['classics', 'moonlight', 'beginner'],
    course: 'moonlight',
  },
  {
    id: 'theotokis',
    pull: '“It is not for novices … do the Bach Preludes course first.”',
    quote:
      'Of course, this is a complex and fairly difficult piece, it is not for novices but with Robin Hall’s guidance, someone with a few years experience … can give it a go and with practice, the results will come. Also, a suggestion: if you find it difficult, do Robin Hall’s Bach Preludes course first or even his Satie course.',
    name: 'George Theotokis',
    tags: ['classics', 'moonlight'],
    course: 'moonlight',
  },
  {
    id: 'wei',
    pull: '“Last time I gave up at bar 5.”',
    quote:
      'I couldn’t possibly manage to learn this beautiful piece without this course, in only 28 days. (last time I wanted to learn it from sheet music and gave up at bar 5…) I played this piece in front of my family and got loads of praise.',
    name: 'Hua Wei',
    tags: ['classics', 'moonlight'],
    course: 'moonlight',
  },
  {
    id: 'satie-weekend',
    pull: '“Gnossienne No 1 over a weekend.”',
    quote:
      'As an adult piano learner, I’ve studied playing piano with all kinds of methods for years. Yet I can only play two simple pieces. Following this course though, I learned the Gnossienne No 1 over a weekend (less than 10 hours). … I get more interested in music theory now … as I can see how the chords work in action.',
    name: 'Classics By Ear student',
    place: 'Review on academy.pianoforall.com',
    tags: ['classics', 'satie'],
    course: 'satie',
  },
  {
    id: 'satie-structure',
    pull: '“You learn harmony first along with rhythm. Then the melody.”',
    quote:
      'Very good structure. You learn harmony (chords) first along with rhythm. Then the melody. All along with some background information. Learnt to play Gnossienne No.1 after few hours.',
    name: 'Classics By Ear student',
    place: 'Review on academy.pianoforall.com',
    tags: ['classics', 'satie'],
    course: 'satie',
  },
  {
    id: 'bach-months',
    pull: '“I struggled with the Prelude for months.”',
    quote:
      'I have struggled with the Prelude for months and so I took advantage of this course. After a week, I could play the piece really well.',
    name: 'Classics By Ear student',
    place: 'Review on academy.pianoforall.com',
    tags: ['classics', 'bach'],
    course: 'bach',
  },
  {
    id: 'bach-humans',
    pull: '“His starting point is how humans work.”',
    quote:
      'Robin Hall’s approach is brilliant – his starting point is how humans work (whereas most people’s starting point is how *music* works) – and then draws on that understanding to design his lessons.',
    name: 'Classics By Ear student',
    place: 'Review on academy.pianoforall.com',
    tags: ['classics', 'bach', 'method'],
    course: 'bach',
  },
];

export const byTag = (tag: string, limit = 99) => TESTIMONIALS.filter((t) => t.tags.includes(tag)).slice(0, limit);
export const byId = (...ids: string[]) => ids.map((id) => TESTIMONIALS.find((t) => t.id === id)!).filter(Boolean);
