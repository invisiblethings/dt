import { PageFrame } from '@/components/page-frame';
import { getPrivacyMetadata, PrivacyPage } from '@/content/pages/privacy';

export const metadata = getPrivacyMetadata('en');

export default function Page() {
  return (
    <PageFrame locale="en" path="/privacy">
      <PrivacyPage locale="en" />
    </PageFrame>
  );
}
