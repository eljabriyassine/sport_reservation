import Image from "next/image";
import Layout from "@/components/Layout/Layout";
import ManagerOfTheMonth from "@/components/ManagerOfTheMonth";
import Hero from "@/components/Hero";
import Feature from "@/components/Feature";
import Pricing from "@/components/Pricing";

export default function Home() {
  return (
    <>
      <Layout>
        <ManagerOfTheMonth />
        <Hero />
        <Feature />
        <Pricing />
      </Layout>
    </>
  );
}
