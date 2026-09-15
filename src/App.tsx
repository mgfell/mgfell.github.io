import Profile from './components/Profile';
import About from './components/About';
import Projects from './components/Projects';
import FutureProjects from './components/FutureProjects';
import Footer from './components/Footer';
import ParticlesBackground from './components/ParticlesBackground';
import Heart from './components/Heart';
import ScrollProgress from './components/ScrollProgress';
import Loader from './components/Loader';

function App() {
  const projectsData = [
    {
      name: 'Project One',
      description: 'Short description of what this project does and why it exists.',
      link: '#',
    },
    {
      name: 'Project Two',
      description: 'Short description of what this project does and why it exists.',
      link: '#',
    },
    {
      name: 'Project Three',
      description: 'Short description of what this project does and why it exists.',
      link: '#',
    },
  ];

  const futureProjects = [
    {
      name: 'Project X',
      description: 'Something big and experimental. Details coming later.',
      status: 'in-development' as const,
    },
    {
      name: 'Project Y',
      description: 'An idea in the works. Maybe it will see the light.',
      status: 'future' as const,
    },
    {
      name: 'Project Z',
      description: 'Almost ready. Just a few finishing touches.',
      status: 'soon' as const,
    },
  ];

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

        <Projects projects={projectsData} />

        <FutureProjects projects={futureProjects} />
      </main>

      <Footer />
    </>
  );
}

export default App;