import React from "react";
import { Hero } from "../sections/Hero";
import { Supplements } from "../sections/Supplements";
import { Catalog } from "../sections/Catalog";
import { Sponsorship } from "../sections/Sponsorship";
import { FeatureSection } from "../sections/FeatureSection";
import { ChloroFeelBanner } from "../sections/ChloroFeelBanner";
import { Testimonials } from "../sections/Testimonials";
import { Steps } from "../sections/Steps";
import { Join } from "../sections/Join";
import { Footer } from "../sections/Footer";
import { useActiveContent } from "../lib/useActiveContent";
import { NewNavbar } from "../ui/NewNavbar";
import { Menu } from "../ui/Menu/Menu";
import { menuDefaults } from "../ui/Menu/MenuDefaults";
import { NSPLogo } from "../ui/NSPLogo";
import { Navbar } from "../ui/Navbar";

export const Landing = () => {
  const content = useActiveContent();

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
          <Hero />
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
            <ChloroFeelBanner />
          </section>
        )}
        {content?.steps && (
          <section id="steps">
            <Steps />
          </section>
        )}
        {/* <section id="testimonials">
          <Testimonials />
        </section> */}
        <section id="join">
          <Join />
        </section>
      </main>
      <Footer />
    </>
  );
};
