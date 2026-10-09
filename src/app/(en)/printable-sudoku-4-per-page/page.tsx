import { PageFrame } from '@/components/page-frame';
import { getFourPerPageMetadata, FourPerPagePage } from '@/content/pages/four-per-page';

export const metadata = getFourPerPageMetadata('en');

export default function Page() {
  return (
    <PageFrame locale="en" path="/printable-sudoku-4-per-page">
      <FourPerPagePage locale="en" />
    </PageFrame>
  );
}
