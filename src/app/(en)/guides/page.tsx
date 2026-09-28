import { PageFrame } from '@/components/page-frame';
import { getGuidesIndexMetadata, GuidesIndexPage } from '@/content/pages/guides-index';

export const metadata = getGuidesIndexMetadata('en');

export default function Page() {
  return (
    <PageFrame locale="en" path="/guides">
      <GuidesIndexPage locale="en" />
    </PageFrame>
  );
}
