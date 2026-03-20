import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/nextjs";

export default function Home() {
  return (
    <main className="flex-1 flex flex-col items-center justify-center p-24">
      <h1 className="text-4xl font-bold mb-8 text-center">Italian Restaurant</h1>
      <div className="flex gap-4">
        <SignedOut>
          <div className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-md font-semibold transition-colors">
            <SignInButton />
          </div>
        </SignedOut>
        <SignedIn>
          <div className="flex items-center gap-4 bg-gray-100 px-6 py-3 rounded-md">
            <span className="text-lg font-medium">Welcome back!</span>
            <UserButton afterSignOutUrl="/" />
          </div>
        </SignedIn>
      </div>
    </main>
  );
}