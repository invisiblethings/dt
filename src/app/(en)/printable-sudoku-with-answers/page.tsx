import { PageFrame } from '@/components/page-frame';
import { getWithAnswersMetadata, WithAnswersPage } from '@/content/pages/with-answers';

export const metadata = getWithAnswersMetadata('en');

export default function Page() {
  return (
    <PageFrame locale="en" path="/printable-sudoku-with-answers">
      <WithAnswersPage locale="en" />
    </PageFrame>
  );
}
