import Admin from '@/components/Admin/admin';

import { Metadata } from 'next';

export const metadata: Metadata = {
  robots: {
    index: false,
    follow: false,
  },
};

export default function AdminPage() {
  return <Admin />;
}
