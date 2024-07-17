// import useSWR from 'swr'
import ServerProtectedComponents from "@/components/ServerProtectedComponent";
import Navbar from "../../../components/Navbar";
// import Footer from './footer'

export default function Layout({ children }) {
  // const { data, error } = useSWR('/api/navigation', fetcher)

  // if (error) return <div>Failed to load</div>
  // if (!data) return <div>Loading...</div>

  return (
    <>
      <ServerProtectedComponents>
        <>{children}</>
      </ServerProtectedComponents>
    </>
  );
}
