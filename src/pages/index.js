import Card from '@/components/card/card';
import Footer from '@/components/footer/footer';
import Hero from '@/components/hero/hero';
import Layout from '@/components/layout/layout';
import Navbar from '../components/navbar/navbar';
import Testimonials from './../components/testimonials/testimonials';

export default function Home() {
  return (
    <div>
      <Hero />
      <Layout>
        <Navbar />
        <Card />
        <Testimonials />
        <Footer />
      </Layout>
    </div>
  )
}
