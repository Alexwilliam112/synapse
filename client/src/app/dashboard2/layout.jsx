// import useSWR from 'swr'
import ServerProtectedComponents from "@/components/ServerProtectedComponent";
import Navbar from "../../components/Navbar";
import Link from "next/link";
import Footer from '@/components/Footer'

export default function Layout({ children }) {
  // const { data, error } = useSWR('/api/navigation', fetcher)

  // if (error) return <div>Failed to load</div>
  // if (!data) return <div>Loading...</div>

  return (
    <>
      <ServerProtectedComponents>
        <Navbar />
        <div className="navbar bg-base-100">
          <div className="navbar-start">
            <p></p>
          </div>
          <div className="navbar-center justify-center hidden lg:flex">
            <ul className="menu menu-horizontal px-1">
              <li><Link href={"/dashboard"}><p>Analytics</p></Link></li>
              <li className="bg-[#323232] text-white rounded-lg"><Link href={"/dashboard2"}><p>Details</p></Link></li>
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
