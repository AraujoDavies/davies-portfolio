import { About } from "./components/About";
import { Certifications } from "./components/Certifications";
import { Contact } from "./components/Contact";
import { Experience } from "./components/Experience";
import { Footer } from "./components/Footer";
import { Header } from "./components/Header";
import { Hero } from "./components/Hero";
import { PageNav } from "./components/PageNav";
import { Projects } from "./components/Projects";
import { Stack } from "./components/Stack";
import { Stats } from "./components/Stats";
import { NavigationProvider, useNavigation } from "./navigation";
import { ThemeProvider } from "./theme";

function PageContent() {
  const { pageIndex } = useNavigation();

  return (
    <>
      {pageIndex === 0 ? (
        <>
          <Hero />
          <Stats />
        </>
      ) : null}
      {pageIndex === 1 ? <Projects /> : null}
      {pageIndex === 2 ? <Experience /> : null}
      {pageIndex === 3 ? <Stack /> : null}
      {pageIndex === 4 ? (
        <>
          <About />
          <Certifications />
        </>
      ) : null}
      {pageIndex === 5 ? <Contact /> : null}
    </>
  );
}

function Shell() {
  return (
    <div className="page">
      <Header />
      <main>
        <div className="page-view">
          <PageContent />
        </div>
        <PageNav />
      </main>
      <Footer />
    </div>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <NavigationProvider>
        <Shell />
      </NavigationProvider>
    </ThemeProvider>
  );
}
