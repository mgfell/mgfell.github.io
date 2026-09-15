import Profile from '../components/Profile';
import About from '../components/About';
import Projects from '../components/Projects';
import FutureProjects from '../components/FutureProjects';
import Footer from '../components/Footer';
import ParticlesBackground from '../components/ParticlesBackground';
import Heart from '../components/Heart';
import ScrollProgress from '../components/ScrollProgress';
import Loader from '../components/Loader';
import { releasedProjects, futureProjects } from '../data/projects';

export default function Home() {
  return (
    <>
      <Loader />
      <ScrollProgress />
      <ParticlesBackground />
      <Heart />

      <main className="w-full px-5 sm:px-10 lg:px-12 py-16 sm:py-20 lg:pl-16">
        <Profile
          nick="mgfell"
          tagline="developer & builder · making things on the internet"
          stats={[
            { label: 'since', value: '14 july 2026' },
            { label: 'projects', value: '3' },
            { label: 'based', value: 'on Earth' },
            { label: 'status', value: 'open to collab', accent: true },
          ]}
        />

        <About />

        <Projects projects={releasedProjects} />

        <FutureProjects projects={futureProjects} />
      </main>

      <Footer />
    </>
  );
}