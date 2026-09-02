/**
 * PDF layout — ported from the original single-file prototype.
 *
 * jsPDF is pulled in with a dynamic import so it stays out of the initial page
 * bundle and only loads when someone actually asks for a PDF.
 */

import type { Puzzle } from './sudoku';
import { SITE } from './site';

export type PerPage = 1 | 2 | 4 | 6;
export type PageSize = 'a4' | 'letter';

export interface PdfOptions {
  perPage: PerPage;
  pageSize: PageSize;
  includeSolutions: boolean;
}

/** jsPDF font sizes are in points regardless of the document unit. */
const PT_TO_MM = 25.4 / 72;

/**
 * How far above the baseline a Helvetica digit's visual centre sits, in em.
 * From the font's own metrics: figures span -0.019em to 0.703em.
 */
const DIGIT_CENTRE_EM = 0.342;

const LAYOUTS: Record<PerPage, { cols: number; rows: number }> = {
  1: { cols: 1, rows: 1 },
  2: { cols: 1, rows: 2 },
  4: { cols: 2, rows: 2 },
  6: { cols: 2, rows: 3 },
};

/*
 * Page furniture, in millimetres.
 *
 * The aim is a sheet that fills the page: grids as large as the paper allows,
 * a caption tucked under each one, and a hairline rule closing off each row.
 * MARGIN stays at 12mm so the whole thing clears the non-printable edge of a
 * domestic printer without anyone having to scale the page down.
 */
const MARGIN = 12;
const HEADER_H = 5;
const FOOTER_H = 5;
/** Grid bottom to the caption baseline. */
const CAPTION_BASELINE = 4.2;
/** Caption baseline to the rule that closes the row. */
const CAPTION_RULE_GAP = 2.6;
const GUTTER_X = 9;
const MIN_ROW_GAP = 5;
/** Cap on how much leftover height is poured into the gaps between rows. */
const MAX_EXTRA_ROW_GAP = 0.18;

export function pageCounts(puzzleCount: number, perPage: PerPage, includeSolutions: boolean) {
  const puzzlePages = Math.ceil(puzzleCount / perPage);
  const solutionPages = includeSolutions ? Math.ceil(puzzleCount / perPage) : 0;
  return { puzzlePages, solutionPages, totalPages: puzzlePages + solutionPages };
}

export async function buildPdfBlob(puzzles: Puzzle[], opts: PdfOptions): Promise<Blob> {
  const { jsPDF } = await import('jspdf');
  const { perPage, pageSize, includeSolutions } = opts;
  const brand = `${SITE.wordmark.lead} ${SITE.wordmark.accent}`;

  const doc = new jsPDF({ unit: 'mm', format: pageSize });
  const pageW = doc.internal.pageSize.getWidth();
  const pageH = doc.internal.pageSize.getHeight();
  const { cols, rows } = LAYOUTS[perPage];

  const availW = pageW - 2 * MARGIN;
  const availH = pageH - 2 * MARGIN - HEADER_H - FOOTER_H;
  const captionH = CAPTION_BASELINE + CAPTION_RULE_GAP;

  /*
   * Size the grid from whichever axis runs out first. The width usually wins,
   * which is the point: the old layout took the height every time and left a
   * quarter of the page width empty on either side of the grids.
   */
  const gridFromW = (availW - GUTTER_X * (cols - 1)) / cols;
  const gridFromH = (availH - MIN_ROW_GAP * (rows - 1)) / rows - captionH;
  const gridSize = Math.min(gridFromW, gridFromH);

  /*
   * Any height left over is poured into the gaps between rows rather than
   * left to pool at the foot of the page — capped, so two rows never end up
   * marooned at opposite ends of the sheet. Whatever remains centres the block.
   */
  const slack = availH - rows * (gridSize + captionH) - MIN_ROW_GAP * (rows - 1);
  const extraPerGap =
    rows > 1 ? Math.min(Math.max(slack, 0) / (rows - 1), gridSize * MAX_EXTRA_ROW_GAP) : 0;
  const rowGap = MIN_ROW_GAP + extraPerGap;
  const rowPitch = gridSize + captionH + rowGap;

  const blockW = cols * gridSize + GUTTER_X * (cols - 1);
  const blockH = rows * (gridSize + captionH) + rowGap * (rows - 1);
  const startX = (pageW - blockW) / 2;
  const startY = MARGIN + HEADER_H + Math.max(0, (availH - blockH) / 2);

  const captionFont = Math.min(9, Math.max(6.5, gridSize * 0.09));

  function drawHeader(label: string) {
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(9);
    doc.setTextColor(33, 38, 44);
    doc.text(brand, startX, MARGIN + 3.5);
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(8);
    doc.setTextColor(130, 130, 120);
    doc.text(label, startX + blockW, MARGIN + 3.5, { align: 'right' });
  }

  function drawFooter(pageNum: number, totalPages: number) {
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(7.5);
    doc.setTextColor(150, 150, 140);
    doc.text(`${SITE.shortDomain} · ${pageNum} / ${totalPages}`, pageW / 2, pageH - MARGIN - 0.5, {
      align: 'center',
    });
  }

  function drawGrid(x: number, y: number, size: number, cells: number[]) {
    const c = size / 9;

    doc.setDrawColor(60, 60, 55);
    doc.setLineWidth(0.15);
    for (let i = 1; i < 9; i++) {
      if (i % 3 === 0) continue;
      doc.line(x + i * c, y, x + i * c, y + size);
      doc.line(x, y + i * c, x + size, y + i * c);
    }

    doc.setDrawColor(20, 24, 28);
    doc.setLineWidth(0.6);
    for (let i = 0; i <= 9; i += 3) {
      doc.line(x + i * c, y, x + i * c, y + size);
      doc.line(x, y + i * c, x + size, y + i * c);
    }

    /*
     * Vertical placement of the digits.
     *
     * jsPDF positions text by its baseline, and font sizes are always points
     * even when the document unit is millimetres. In Helvetica a digit runs
     * from -0.019em (the slight overshoot under the baseline on round figures)
     * up to 0.703em, so its visual centre sits 0.342em above the baseline.
     * Dropping the baseline by exactly that much is what puts the digit in the
     * middle of its cell.
     */
    const fontSize = c * 2.2;
    const digitCentreOffset = DIGIT_CENTRE_EM * fontSize * PT_TO_MM;

    doc.setFont('helvetica', 'bold');
    doc.setFontSize(fontSize);
    doc.setTextColor(20, 22, 26);
    for (let r = 0; r < 9; r++) {
      for (let cc = 0; cc < 9; cc++) {
        const v = cells[r * 9 + cc];
        if (v) {
          doc.text(String(v), x + cc * c + c / 2, y + r * c + c / 2 + digitCentreOffset, {
            align: 'center',
          });
        }
      }
    }
  }

  /** Puzzle number on the left, difficulty on the right, aligned to the grid. */
  function drawCaption(x: number, y: number, size: number, left: string, right: string) {
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(captionFont);
    doc.setTextColor(60, 62, 60);
    const baseline = y + size + CAPTION_BASELINE + captionFont * PT_TO_MM * 0.5;
    doc.text(left, x, baseline);
    doc.text(right, x + size, baseline, { align: 'right' });
  }

  /** Hairline closing off a row of puzzles, spanning the whole block. */
  function drawRowRule(rowIndex: number) {
    const yRule = startY + rowIndex * rowPitch + gridSize + captionH + captionFont * PT_TO_MM * 0.5;
    doc.setDrawColor(140, 138, 130);
    doc.setLineWidth(0.25);
    doc.line(startX, yRule, startX + blockW, yRule);
  }

  function drawSheet(slice: Puzzle[], solutions: boolean) {
    slice.forEach((pz, idx) => {
      const cx = idx % cols;
      const cy = Math.floor(idx / cols);
      const x = startX + cx * (gridSize + GUTTER_X);
      const y = startY + cy * rowPitch;
      drawGrid(x, y, gridSize, solutions ? pz.solution : pz.clues);
      drawCaption(
        x,
        y,
        gridSize,
        `#${pz.id}`,
        solutions
          ? `Solution · ${pz.difficulty}`
          : `Difficulty: ${pz.difficulty} · ${pz.clueCount} clues`,
      );
    });
    const filledRows = Math.ceil(slice.length / cols);
    for (let r = 0; r < filledRows; r++) drawRowRule(r);
  }

  const perPageCount = cols * rows;
  const { puzzlePages, solutionPages, totalPages } = pageCounts(
    puzzles.length,
    perPage,
    includeSolutions,
  );
  let pageNum = 0;

  for (let p = 0; p < puzzlePages; p++) {
    if (p > 0) doc.addPage();
    pageNum++;
    drawHeader('puzzles');
    drawSheet(puzzles.slice(p * perPageCount, (p + 1) * perPageCount), false);
    drawFooter(pageNum, totalPages);
  }

  if (includeSolutions) {
    for (let p = 0; p < solutionPages; p++) {
      doc.addPage();
      pageNum++;
      drawHeader('answer key');
      drawSheet(puzzles.slice(p * perPageCount, (p + 1) * perPageCount), true);
      drawFooter(pageNum, totalPages);
    }
  }

  return doc.output('blob');
}
