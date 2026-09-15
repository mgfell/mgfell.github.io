import Profile from './components/Profile';
import About from './components/About';
import Projects from './components/Projects';
import Footer from './components/Footer';
import ParticlesBackground from './components/ParticlesBackground';
import Heart from './components/Heart';

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

  return (
    <>
      <ParticlesBackground />
      <Heart />

      <main className="w-full px-12 py-20 pl-16">
        <Profile
          nick="mgfell"
          tagline="developer & builder · making things on the internet"
          avatarText="MG"
          stats={[
            { label: 'since', value: '14 july 2026' },
            { label: 'projects', value: '3' },
            { label: 'based', value: 'on Earth' },
            { label: 'status', value: 'open to collab', accent: true },
          ]}
        />

        <About />

        <Projects projects={projectsData} />
      </main>

      <Footer />
    </>
  );
}

export default App;