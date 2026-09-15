import { PageFrame } from '@/components/page-frame';
import { getSudokuAnswersMetadata, SudokuAnswersPage } from '@/content/pages/sudoku-answers';

export const metadata = getSudokuAnswersMetadata('en');

export default function Page() {
  return (
    <PageFrame locale="en" path="/sudoku-answers">
      <SudokuAnswersPage locale="en" />
    </PageFrame>
  );
}
