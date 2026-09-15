import { PageFrame } from '@/components/page-frame';
import { getNotFoundMetadata, NotFoundPage } from '@/content/pages/not-found';

export const metadata = getNotFoundMetadata('en');

export default function NotFound() {
  // "/" rather than "/404": the language switcher cross-links whatever path
  // is passed, and there is no per-locale 404 route for it to point at.
  return (
    <PageFrame locale="en" path="/">
      <NotFoundPage locale="en" />
    </PageFrame>
  );
}
