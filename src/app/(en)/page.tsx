import { PageFrame } from '@/components/page-frame';
import { getHomeMetadata, HomePage } from '@/content/pages/home';

export const metadata = getHomeMetadata('en');

export default function Page() {
  return (
    <PageFrame locale="en" path="/">
      <HomePage locale="en" />
    </PageFrame>
  );
}
