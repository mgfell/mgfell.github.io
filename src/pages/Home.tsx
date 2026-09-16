import Profile from '../components/Profile';
import About from '../components/About';
import Projects from '../components/Projects';
import FutureProjects from '../components/FutureProjects';
import FAQ from '../components/FAQ';
import Footer from '../components/Footer';
import ParticlesBackground from '../components/ParticlesBackground';
import ScrollProgress from '../components/ScrollProgress';
import Loader from '../components/Loader';
import { releasedProjects, futureProjects } from '../data/projects';

export default function Home() {
  return (
    <>
      <Loader />
      <ScrollProgress />
      <ParticlesBackground />

      <main className="w-full px-5 sm:px-10 lg:px-16 py-24 sm:py-32 max-w-[1100px] mx-auto">
        <Profile
          nick="mgfell"
          tagline="developer & builder · making things on the internet"
          stats={[
            { label: 'since', value: '14 july 2026' },
            { label: 'projects', value: '3' },
            { label: 'based', value: 'on Earth' },
          ]}
        />

        <About />

        <Projects projects={releasedProjects} />

        <FutureProjects projects={futureProjects} />

        <FAQ />
      </main>

      <Footer />
    </>
  );
}