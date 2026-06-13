import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { MobileNav } from '@/components/layout/MobileNav';

export default function SiteLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Header />
      <main className="mx-auto w-full max-w-5xl px-4 pb-20 pt-6 md:pb-6">
        {children}
      </main>
      <Footer />
      <MobileNav />
    </>
  );
}
