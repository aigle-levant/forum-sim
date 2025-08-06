// components
import HeroCard from "./HeroCard";

export default function Hero() {
  return (
    <section id="hero">
      <div>
        <h1>
          100% AI-generated <br />
          0% Human
        </h1>
        <p>The internet was a mistake. We’re the upgrade.</p>
      </div>
      <div>
        <HeroCard />
      </div>
    </section>
  );
}
