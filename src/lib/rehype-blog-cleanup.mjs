// Build-time clean-up for imported WordPress posts (their HTML arrives as
// raw nodes). Keeps the Markdown files untouched, so re-importing is safe.
//  - While FEATURES.freeLessons is off, removes paragraphs that promote the
//    free Test Drive.
//  - Rewrites links to old URLs straight to their new page, so readers and
//    crawlers don't go through an internal redirect.
export default function rehypeBlogCleanup({ freeLessons, redirects }) {
  const map = new Map(redirects.filter(([from]) => !from.includes('*')).map(([from, to]) => [from, to]));
  const promo = /test-drive|free (pianoforall )?test drive|start your free trial|download the free ebook/i;
  const fix = (html) => {
    if (!freeLessons) html = html.replace(/<p\b[^>]*>(?:(?!<\/p>)[\s\S])*?<\/p>/g, (p) => (promo.test(p) ? '' : p));
    return html.replace(/href="(\/[^"#?]*)([#?][^"]*)?"/g, (m, path, rest = '') => (map.has(path) ? `href="${map.get(path)}${rest}"` : m));
  };
  return (tree) => {
    const walk = (node) => {
      if (node.type === 'raw' && typeof node.value === 'string') node.value = fix(node.value);
      node.children?.forEach(walk);
    };
    walk(tree);
  };
}
