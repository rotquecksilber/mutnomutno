import type { Metadata } from 'next';
import React from 'react';




export const metadata: Metadata = {
  robots: {
    index: false,
    follow: false,
  },
};

export default function AdminLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (

    <div>
      {children}
    </div>

  );
}
