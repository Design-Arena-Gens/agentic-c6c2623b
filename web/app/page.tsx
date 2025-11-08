import Link from "next/link";
import Image from "next/image";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-zinc-100 text-zinc-900">
      <header className="sticky top-0 z-20 border-b border-zinc-200 bg-white/80 backdrop-blur supports-[backdrop-filter]:bg-white/60">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
          <div className="flex items-center gap-2">
            <Image src="/favicon.ico" alt="Logo" width={28} height={28} className="rounded" />
            <span className="text-xl font-semibold tracking-tight">Haven Estates</span>
          </div>
          <nav className="hidden items-center gap-6 md:flex">
            <a href="#listings" className="text-sm text-zinc-700 transition hover:text-zinc-900">Listings</a>
            <a href="#features" className="text-sm text-zinc-700 transition hover:text-zinc-900">Features</a>
            <a href="#testimonials" className="text-sm text-zinc-700 transition hover:text-zinc-900">Testimonials</a>
            <Link
              href="/dashboard"
              className="rounded-full bg-zinc-900 px-5 py-2 text-sm font-medium text-white transition hover:bg-zinc-700"
            >
              Dashboard
            </Link>
          </nav>
          <Link
            href="/dashboard"
            className="md:hidden rounded-full bg-zinc-900 px-4 py-2 text-sm font-medium text-white transition hover:bg-zinc-700"
          >
            Dashboard
          </Link>
        </div>
      </header>

      <main>
        {/* Hero */}
        <section className="mx-auto max-w-7xl px-6 pb-16 pt-20 md:pt-28">
          <div className="grid items-center gap-10 md:grid-cols-2">
            <div>
              <h1 className="text-4xl font-semibold leading-tight tracking-tight md:text-6xl">
                Find your next home with confidence
              </h1>
              <p className="mt-4 max-w-prose text-lg text-zinc-600">
                Explore curated listings, schedule viewings, and manage bookings seamlessly. Modern tools
                designed for buyers, sellers, and agents.
              </p>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <Link
                  href="/dashboard"
                  className="inline-flex items-center justify-center rounded-full bg-zinc-900 px-6 py-3 text-white transition hover:-translate-y-0.5 hover:bg-zinc-800 active:translate-y-0"
                >
                  Go to Dashboard
                </Link>
                <a
                  href="#features"
                  className="inline-flex items-center justify-center rounded-full border border-zinc-300 px-6 py-3 text-zinc-800 transition hover:bg-zinc-50"
                >
                  Learn more
                </a>
              </div>
              <div className="mt-10 flex items-center gap-6 opacity-80">
                <Image src="/vercel.svg" alt="" width={80} height={20} className="dark:invert" />
                <Image src="/next.svg" alt="" width={80} height={20} className="dark:invert" />
                <span className="text-sm text-zinc-500">Powered by Next.js</span>
              </div>
            </div>
            <div className="relative">
              <div className="absolute -inset-4 -z-10 rounded-2xl bg-gradient-to-tr from-zinc-200 to-zinc-50 blur-2xl" />
              <div className="w-full overflow-hidden rounded-2xl ring-1 ring-zinc-200 shadow-xl">
                <div className="h-72 w-full bg-gradient-to-br from-zinc-100 via-white to-zinc-200 md:h-96">
                  <div className="h-full w-full bg-[radial-gradient(circle_at_20%_20%,rgba(0,0,0,0.035)_0,transparent_40%),radial-gradient(circle_at_80%_0%,rgba(0,0,0,0.035)_0,transparent_35%),radial-gradient(circle_at_10%_90%,rgba(0,0,0,0.04)_0,transparent_35%)]" />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Features */}
        <section id="features" className="mx-auto max-w-7xl px-6 py-16">
          <h2 className="text-2xl font-semibold">Why choose Haven</h2>
          <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {[
              {
                title: "Curated Listings",
                desc: "Hand-picked homes with detailed insights and media.",
              },
              {
                title: "Effortless Scheduling",
                desc: "One-click booking with calendar coordination.",
              },
              {
                title: "Trusted Agents",
                desc: "Work with top-rated professionals in your area.",
              },
            ].map((f) => (
              <div
                key={f.title}
                className="group rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-md"
              >
                <div className="mb-3 h-10 w-10 rounded-full bg-zinc-900/90 text-white flex items-center justify-center">
                  <span className="text-sm">?</span>
                </div>
                <h3 className="text-lg font-medium">{f.title}</h3>
                <p className="mt-2 text-zinc-600">{f.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* CTA */}
        <section className="mx-auto max-w-7xl px-6 py-16">
          <div className="rounded-3xl bg-zinc-900 p-10 text-white">
            <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-center">
              <div>
                <h3 className="text-2xl font-semibold">Ready to schedule a viewing?</h3>
                <p className="mt-2 max-w-prose text-zinc-300">
                  Use the dashboard to book an online or in-person meeting.
                </p>
              </div>
              <Link
                href="/dashboard"
                className="rounded-full bg-white px-6 py-3 text-zinc-900 transition hover:-translate-y-0.5 hover:bg-zinc-100"
              >
                Open Dashboard
              </Link>
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t border-zinc-200 py-10 text-center text-sm text-zinc-500">
        ? {new Date().getFullYear()} Haven Estates. All rights reserved.
      </footer>
    </div>
  );
}
