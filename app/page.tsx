import Link from 'next/link'
import { Button } from "@/components/ui/button"

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
      <h1 className="text-4xl font-bold mb-8">Welcome to My Next.js App</h1>
      <p className="text-xl mb-8">This app is built with Next.js 14, shadcn/ui, and Tailwind CSS.</p>
      <Link href="/candidates">
        <Button>View Candidates</Button>
      </Link>
    </main>
  );
}