import Blogs from "@/components/shared/Blogs";
import PeopleToFollow from "@/components/shared/PeopleToFollow";
import Topics from "@/components/shared/Topics";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";

export default async function Home() {
  return (
    <main className="flex-1 p-6">
      <div className="mx-auto">
        <header className="mb-6 flex items-center justify-between">
          <h2 className="text-2xl font-bold">Your Feed</h2>
          <div className="relative">
            <Search className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400" />
            <Input className="pl-8" placeholder="Search blogs..." />
          </div>
        </header>

        <PeopleToFollow />
        <Topics />
        <Blogs />
      </div>
    </main>
  );
}
