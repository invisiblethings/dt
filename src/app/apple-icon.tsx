import { ImageResponse } from 'next/og';

export const runtime = 'nodejs';
// Emitted at build time into the static export.
export const dynamic = 'force-static';
export const size = { width: 180, height: 180 };
export const contentType = 'image/png';

/** Home-screen icon: the site mark — a 3x3 rule with one inked square. */
export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexWrap: 'wrap',
          background: '#21262C',
          padding: 24,
        }}
      >
        {Array.from({ length: 9 }, (_, i) => (
          <div
            key={i}
            style={{
              display: 'flex',
              width: 44,
              height: 44,
              background: i === 0 ? '#A93A2C' : 'transparent',
              borderRight: i % 3 === 2 ? 'none' : '3px solid #EDEAE0',
              borderBottom: i > 5 ? 'none' : '3px solid #EDEAE0',
            }}
          />
        ))}
      </div>
    ),
    size,
  );
}
