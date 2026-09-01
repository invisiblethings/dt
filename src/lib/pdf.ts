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

const LAYOUTS: Record<PerPage, { cols: number; rows: number }> = {
  1: { cols: 1, rows: 1 },
  2: { cols: 1, rows: 2 },
  4: { cols: 2, rows: 2 },
  6: { cols: 2, rows: 3 },
};

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
  const margin = 16;
  const { cols, rows } = LAYOUTS[perPage];
  const gutterX = 10;
  const gutterY = 16;
  const headerH = 8;
  const footerH = 8;
  const labelH = 6;
  const usableW = pageW - 2 * margin;
  const usableH = pageH - 2 * margin - headerH - footerH;
  const cellAreaW = (usableW - gutterX * (cols - 1)) / cols;
  const cellAreaH = (usableH - gutterY * (rows - 1)) / rows;
  const gridSize = Math.min(cellAreaW, cellAreaH - labelH);

  function drawHeader(label: string) {
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(10);
    doc.setTextColor(33, 38, 44);
    doc.text(brand, margin, margin - 3);
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(8);
    doc.setTextColor(130, 130, 120);
    doc.text(label, pageW - margin, margin - 3, { align: 'right' });
  }

  function drawFooter(pageNum: number, totalPages: number) {
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(7.5);
    doc.setTextColor(150, 150, 140);
    doc.text(`${SITE.shortDomain} · ${pageNum} / ${totalPages}`, pageW / 2, pageH - 7, {
      align: 'center',
    });
  }

  function drawGrid(x: number, y: number, size: number, cells: number[], label: string) {
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

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(c * 2.5);
    doc.setTextColor(25, 28, 32);
    for (let r = 0; r < 9; r++) {
      for (let cc = 0; cc < 9; cc++) {
        const v = cells[r * 9 + cc];
        if (v) {
          doc.text(String(v), x + cc * c + c / 2, y + r * c + c / 2 + c * 0.17, {
            align: 'center',
          });
        }
      }
    }

    doc.setFont('courier', 'normal');
    doc.setFontSize(7.2);
    doc.setTextColor(120, 120, 112);
    doc.text(label, x, y + size + 4.5);
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
    const slice = puzzles.slice(p * perPageCount, (p + 1) * perPageCount);
    slice.forEach((pz, idx) => {
      const cx = idx % cols;
      const cy = Math.floor(idx / cols);
      const x = margin + cx * (cellAreaW + gutterX) + (cellAreaW - gridSize) / 2;
      const y = margin + headerH + cy * (cellAreaH + gutterY);
      drawGrid(x, y, gridSize, pz.clues, `#${pz.id}  ·  ${pz.difficulty}  ·  ${pz.clueCount} clues`);
    });
    drawFooter(pageNum, totalPages);
  }

  if (includeSolutions) {
    for (let p = 0; p < solutionPages; p++) {
      doc.addPage();
      pageNum++;
      drawHeader('answer key');
      const slice = puzzles.slice(p * perPageCount, (p + 1) * perPageCount);
      slice.forEach((pz, idx) => {
        const cx = idx % cols;
        const cy = Math.floor(idx / cols);
        const x = margin + cx * (cellAreaW + gutterX) + (cellAreaW - gridSize) / 2;
        const y = margin + headerH + cy * (cellAreaH + gutterY);
        drawGrid(x, y, gridSize, pz.solution, `#${pz.id} solution`);
      });
      drawFooter(pageNum, totalPages);
    }
  }

  return doc.output('blob');
}
