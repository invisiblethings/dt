import { PageFrame } from '@/components/page-frame';
import { getAboutMetadata, AboutPage } from '@/content/pages/about';

export const metadata = getAboutMetadata('en');

export default function Page() {
  return (
    <PageFrame locale="en" path="/about">
      <AboutPage locale="en" />
    </PageFrame>
  );
}
