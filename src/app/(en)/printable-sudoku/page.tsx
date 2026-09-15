import { PageFrame } from '@/components/page-frame';
import { getDifficultyHubMetadata, DifficultyHubPage } from '@/content/pages/difficulty-hub';

export const metadata = getDifficultyHubMetadata('en');

export default function Page() {
  return (
    <PageFrame locale="en" path="/printable-sudoku">
      <DifficultyHubPage locale="en" />
    </PageFrame>
  );
}
