import { Articles } from "@/components/Home/article";
import Banner from "@/components/Home/Banner";
import FeaturedProperties from "@/components/Home/FeaturedProperties";
import { Partners } from "@/components/Home/partners";
import { StateAvailable } from "@/components/Home/state_available";
import { Layout } from "@/components/Layout";

export default function Home() {
  return (
    <Layout>
      <Banner />
      <Partners />
      <FeaturedProperties />
      <StateAvailable />
      <Articles />
    </Layout>
  );
}
