import { ImageResponse } from 'next/og';
import { SAMPLE_PUZZLES } from '@/lib/samples';
import { SITE } from '@/lib/site';

export const runtime = 'nodejs';
// Emitted at build time into the static export.
export const dynamic = 'force-static';
export const alt =
  'A printable sudoku sheet: a 9x9 puzzle grid with heavy 3x3 box borders, beside the words free printable sudoku, ready to download as a PDF';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

const PAPER = '#EDEAE0';
const PAPER_DEEP = '#E2DECE';
const INK = '#21262C';
const INK_SOFT = '#565C5F';
const RULE = '#C9C2AC';
const STAMP = '#A93A2C';

/**
 * The site-wide Open Graph / Twitter card image, rendered at build time from
 * the same sample puzzle the pages show. Root-level, so every route inherits it.
 */
export default function OpengraphImage() {
  const cells = SAMPLE_PUZZLES.medium.clues;

  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          background: PAPER,
          padding: 64,
          alignItems: 'center',
          gap: 56,
        }}
      >
        <div style={{ display: 'flex', flexDirection: 'column', flex: 1 }}>
          <div style={{ display: 'flex', fontSize: 30, fontWeight: 700, letterSpacing: 2 }}>
            <span style={{ color: INK }}>{SITE.wordmark.lead}&nbsp;</span>
            <span style={{ color: STAMP }}>{SITE.wordmark.accent}</span>
          </div>
          <div
            style={{
              display: 'flex',
              marginTop: 26,
              fontSize: 62,
              lineHeight: 1.12,
              fontWeight: 700,
              color: INK,
              maxWidth: 560,
            }}
          >
            Free printable sudoku, ready to download as a PDF
          </div>
          <div style={{ display: 'flex', marginTop: 26, fontSize: 26, color: INK_SOFT, maxWidth: 540 }}>
            Easy to expert · 1–6 puzzles per page · A4 or US Letter · answer key included
          </div>
          <div
            style={{
              display: 'flex',
              marginTop: 34,
              padding: '10px 20px',
              background: STAMP,
              color: '#fff',
              fontSize: 22,
              fontWeight: 700,
              borderRadius: 3,
            }}
          >
            Every puzzle verified to have one solution
          </div>
        </div>

        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            background: '#fff',
            padding: 22,
            borderRadius: 3,
            boxShadow: '0 18px 34px -18px rgba(33,38,44,0.4)',
          }}
        >
          <div style={{ display: 'flex', flexWrap: 'wrap', width: 434, border: `4px solid ${INK}` }}>
            {cells.map((value, i) => {
              const row = Math.floor(i / 9);
              const col = i % 9;
              return (
                <div
                  key={i}
                  style={{
                    display: 'flex',
                    width: 46,
                    height: 46,
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: 26,
                    color: INK,
                    borderRight:
                      col === 8
                        ? 'none'
                        : (col + 1) % 3 === 0
                          ? `3px solid ${INK}`
                          : `1px solid ${RULE}`,
                    borderBottom:
                      row === 8
                        ? 'none'
                        : (row + 1) % 3 === 0
                          ? `3px solid ${INK}`
                          : `1px solid ${RULE}`,
                    background: value === 0 ? PAPER_DEEP + '30' : '#fff',
                  }}
                >
                  {value === 0 ? '' : String(value)}
                </div>
              );
            })}
          </div>
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              width: 434,
              marginTop: 14,
              fontSize: 16,
              color: INK_SOFT,
            }}
          >
            <span>#{SAMPLE_PUZZLES.medium.code}</span>
            <span>medium · {SAMPLE_PUZZLES.medium.clueCount} clues</span>
          </div>
        </div>
      </div>
    ),
    size,
  );
}
