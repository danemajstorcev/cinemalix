import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "@/lib/auth";
import Navbar from "@/components/layout/Navbar";
import MyListContent from "./mylist-content";

export const metadata = {
  title: "My List - Cinemalix",
};

export default async function MyListPage() {
  const session = await getServerSession(authOptions);
  if (!session) redirect("/auth/login");

  return (
    <div className="bg-netflix-dark min-h-screen">
      <Navbar />
      <MyListContent />
    </div>
  );
}
