"use client";
import { Card, Carousel } from "@/components/projects/apple-cards-carousel";
import { data } from "@/components/projects/Data";
import { useMemo } from "react";

export default function AllProjects() {
  // Memoize cards to prevent re-rendering
  const cards = useMemo(
    () =>
      data.map((card, index) => (
        <Card key={card.src} card={card} index={index} layout={true} />
      )),
    []
  );

  return (
    <div className="w-full h-full pt-8" style={{ contain: 'layout style' }}>
      <h2 className="max-w-7xl mx-auto text-xl md:text-3xl font-bold text-neutral-800 dark:text-neutral-200 font-sans">
        My Projects
      </h2>
      <Carousel items={cards} />
    </div>
  );
}
