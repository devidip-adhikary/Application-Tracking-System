import Dashboard from "@/components/Dashboard/Dashboard";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "PSS Admin",
  description: "This is a ATS application",
};

export default function Home() {
  return <Dashboard />;
}
