import { Hero } from "../sections/Hero";
import { Sponsorship } from "../sections/Sponsorship";
import { FeatureSection } from "../sections/FeatureSection";
import { ChloroFeelBanner } from "../sections/ChloroFeelBanner";
import { Steps } from "../sections/Steps";
import { Join } from "../sections/Join";
import { Footer } from "../sections/Footer";
import { useActiveContent } from "../lib/useActiveContent";
import { NewNavbar } from "../ui/NewNavbar";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export const Landing = () => {
  const content = useActiveContent();

  gsap.registerPlugin(ScrollTrigger);

  ScrollTrigger.defaults({
    toggleActions: "play none none reverse",
    markers: true,
  });
  const handleJoinClick = () => {
    document.getElementById("join")?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };

  return (
    <>
      <NewNavbar />
      <main>
        <section id="hero">
          <Hero onJoinClick={handleJoinClick} />
        </section>
        <section id="about">
          <Sponsorship />
        </section>

        {content?.feature && (
          <section id="feature">
            <FeatureSection
              id="video"
              data={content.feature}
              onJoinClick={handleJoinClick}
            />
          </section>
        )}
        {content?.chloroFeelBanner && (
          <section id="chloro-feel">
            <ChloroFeelBanner onJoinClick={handleJoinClick} />
          </section>
        )}
        {content?.steps && (
          <section id="steps">
            <Steps onJoinClick={handleJoinClick} />
          </section>
        )}

        <section id="join">
          <Join />
        </section>
      </main>
      <Footer />
    </>
  );
};
