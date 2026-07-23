import { AppShell } from "@/components/layout/app-shell";
import { auth } from "@/lib/auth";
import { ModifyLastSeen } from "@/lib/helper/helper";
import { Metadata } from "next";
import { headers } from "next/headers";

export const metadata: Metadata = {
  robots: {
    index: false,
    follow: false,
  },
};

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth.api.getSession({
    headers: await headers()
  });

  if (session?.user?.id) {
    await ModifyLastSeen(session.user.id);
  }
  return <AppShell>{children}</AppShell>;
}
