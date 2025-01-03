import { Metadata } from "next/dist/lib/metadata/types/metadata-interface";
import { AppProps } from "next/app";
import Dashboard from "@/components/Dashboard/Dashboard";

export const metadata: Metadata = {
  title: "PSS Admin",
  description: "This is an Application Tracker System",
};

export default function Home({ pageProps }: AppProps) {
  return <Dashboard {...pageProps} />;
}
