import React from "react";
import { Featured } from "../../components/featured/Featured";
import { Slide } from "../../components/slide/Slide";
import { TrustedBy } from "../../components/trustedBy/TrustedBy";
import { CatCard } from "../../components/catCard/CatCard";
import { Propositions } from "../../components/propositions/Propositions";
import { Banner } from "../../components/banner/Banner";
import { ProjectCard } from "../../components/projectCard/ProjectCard";
import { cards, projects } from "../../data";
import "./Home.scss";

function Home() {
  return (
    <div className="home">
      <Featured />
      <TrustedBy />
      <Slide slidesToShow={5} arrowsScroll={5}>
        {cards.map((card) => (
          <CatCard item={card} key={card.id} />
        ))}
      </Slide>
      <Propositions />
      <Banner />
      <Slide slidesToShow={4} arrowsScroll={4}>
        {projects.map((project) => (
          <ProjectCard item={project} key={project.id} />
        ))}
      </Slide>
    </div>
  );
}

export { Home };
