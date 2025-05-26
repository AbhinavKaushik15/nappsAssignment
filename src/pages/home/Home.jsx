import BlogPostCard from "../../components/blogPostCard/BlogPostCard";
import HeroSection from "../../components/heroSection/HeroSection";
import Layout from "../../components/layout/Layout";

const Home = () => {
  return (
    <Layout>
      <HeroSection />
      <BlogPostCard />
    </Layout>
  );
};

export default Home;
