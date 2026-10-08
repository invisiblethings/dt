// Which guide or course each blog category should point readers to.
// This is the internal-linking bridge from the blog to the money pages.
export const CATEGORY_LINKS: Record<string, { cta: 'course' | 'free' | 'classics'; related: { href: string; title: string; note?: string }[] }> = {
  'learn-piano': { cta: 'course', related: [
    { href: '/learn/learn-piano-online', title: 'Can you learn piano online?' },
    { href: '/how-it-works', title: 'How Pianoforall works' },
    { href: '/am-i-too-old-to-learn-piano', title: 'Am I too old to learn piano?' },
  ] },
  'classical-piano-composers': { cta: 'classics', related: [
    { href: '/classics-by-ear', title: 'Classics By Ear courses' },
    { href: '/classics-by-ear/erik-satie-gnossiennes', title: 'Learn Satie’s Gnossiennes' },
    { href: '/classics-by-ear/moonlight-sonata', title: 'Learn the Moonlight Sonata' },
  ] },
  'piano-curiosities': { cta: 'free', related: [
    { href: '/learn', title: 'Piano guides for beginners' },
    { href: '/learn/play-piano-by-ear', title: 'How to play piano by ear' },
  ] },
  'piano-gear-equipment': { cta: 'course', related: [
    { href: '/learn/choosing-a-keyboard', title: 'Choosing a keyboard or digital piano' },
    { href: '/beginner-keyboard-setup', title: 'Beginner keyboard setup' },
  ] },
  'piano-practice-tips': { cta: 'free', related: [
    { href: '/learn/piano-practice-routine', title: 'A simple piano practice routine' },
    { href: '/learn/how-long-does-it-take-to-learn-piano', title: 'How long does it take to learn piano?' },
  ] },
  'psychology-of-learning-piano': { cta: 'free', related: [
    { href: '/learn/piano-practice-routine', title: 'A simple piano practice routine' },
    { href: '/am-i-too-old-to-learn-piano', title: 'Am I too old to learn piano?' },
  ] },
  'singing-and-piano': { cta: 'course', related: [
    { href: '/learn/piano-chords-for-beginners', title: 'Piano chords for beginners' },
    { href: '/course#for-guitarists', title: 'Pianoforall for singers and songwriters' },
  ] },
};
