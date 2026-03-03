import React from "react";
import { Hero } from "../sections/Hero";
import { Supplements } from "../sections/Supplements";
import { Catalog } from "../sections/Catalog";
import { FeatureSection } from "../sections/FeatureSection";
import { Testimonials } from "../sections/Testimonials";
import { Join } from "../sections/Join";
import { Footer } from "../sections/Footer";
import { Navbar } from "../ui/Navbar";
import { useActiveContent } from "../lib/useActiveContent";

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
      <Navbar />
      <main>
        <section id="hero">
          <Hero />
        </section>
        <section id="supplements">
          <Supplements />
        </section>
        <section id="sponsorship">
          <Catalog />
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
        <section id="testimonials">
          <Testimonials />
        </section>
        <section id="join">
          <Join />
        </section>
      </main>
      <Footer />
    </>
  );
};
