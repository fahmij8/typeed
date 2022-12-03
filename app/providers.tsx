'use client';

import { TypeedProvider } from '@/lib/context';

export default function Providers({ children }: { children: React.ReactNode }) {
  return <TypeedProvider>{children}</TypeedProvider>;
}
