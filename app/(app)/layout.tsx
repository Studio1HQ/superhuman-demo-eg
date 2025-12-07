"use client";

import { ThemeProvider } from "@/hooks/use-theme";
import { VeltProvider } from "@veltdev/react";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <VeltProvider apiKey={process.env.NEXT_PUBLIC_VELT_ID || ""}>
      <ThemeProvider>{children}</ThemeProvider>
    </VeltProvider>
  );
}
