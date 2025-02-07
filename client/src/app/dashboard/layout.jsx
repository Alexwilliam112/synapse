// import useSWR from 'swr'
import ServerProtectedComponents from "@/components/ServerProtectedComponent";
import Navbar from "../../components/Navbar";
import Link from "next/link";
import Footer from '@/components/Footer'
import { AreaChart, BarChart3, ListMinus, LibraryBig } from "lucide-react"

export default function Layout({ children }) {
  // const { data, error } = useSWR('/api/navigation', fetcher)

  // if (error) return <div>Failed to load</div>
  // if (!data) return <div>Loading...</div>

  return (
    <>
      <ServerProtectedComponents>
        <Navbar />
        <div className="navbar bg-base-100 border-t">
          <div className="navbar-start">
            <p></p>
          </div>
          <div className="navbar-center justify-center hidden lg:flex">
            <ul className="menu menu-horizontal px-1">
              <li className="bg-[#323232] text-white rounded-lg"><Link href={"/dashboard"}><p className="flex gap-2"><BarChart3 className="h-5 w-5 " />Analytics</p></Link></li>
              <li><Link href={"/dashboard2"}><p className="flex gap-2"><ListMinus className="h-5 w-5 " />Details</p></Link></li>
            </ul>
          </div>
          <div className="navbar-end">
            <p></p>
          </div>
        </div>
        <>{children}</>
        <Footer />
      </ServerProtectedComponents>
    </>
  );
}
