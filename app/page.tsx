"use client";

import { useEffect, useMemo, useState } from "react";

type Campaign = {
  name: string;
  category: string;
  image: string;
  stills: string[];
};

const services = [
  "KOL Marketing",
  "KOL Strategy Development",
  "KOL Identification and Selection",
  "Campaign Planning Collaboration",
  "Content Creation",
  "Specialized Campaigns",
  "Legal and Compliance"
];

const processSteps = [
  "Plan and design campaigns around each brand objective.",
  "Control the promotion budget for the brand.",
  "Complete campaign work within the planned timeline."
];

const brands = [
  "Watsons",
  "Maybelline",
  "Natural",
  "Dayvita Launch",
  "OB Usagyuuun",
  "Anessa",
  "IMOU",
  "Clear",
  "Garnier",
  "L'Oreal",
  "Erb Body Oil",
  "Cremo",
  "NAIXUE",
  "Tuntunzai",
  "City Condo",
  "ELLE",
  "Central",
  "Tiktok Shop",
  "Amaze",
  "Mizumi",
  "Gatsby",
  "AIA",
  "Galaxy AI S25 Ultra",
  "Beauty clinics",
  "Ministry of Public Health"
];

const creatorHandles = [
  { handle: "NIEBNIEB", image: "/assets/extracted/pdf-p07-img03.png" },
  { handle: "DIANADANAI05", image: "/assets/extracted/pdf-p07-img04.png" },
  { handle: "BBBBIW69", image: "/assets/extracted/pdf-p07-img05.png" },
  { handle: "THANKYOUUTYTY", image: "/assets/extracted/pdf-p07-img06.png" },
  { handle: "MAYSA_NARUNSITA", image: "/assets/extracted/pdf-p08-img03.png" },
  { handle: "NATTAVALAN", image: "/assets/extracted/pdf-p08-img04.png" },
  { handle: "VIEWWANWALEE", image: "/assets/extracted/pdf-p08-img05.png" },
  { handle: "FOODYOUCANEATBKK", image: "/assets/extracted/pdf-p08-img06.png" },
  { handle: "UUFIT_", image: "/assets/extracted/pdf-p09-img03.png" },
  { handle: "PARKPPPD", image: "/assets/extracted/pdf-p09-img04.png" },
  { handle: "TALONPAITOUR", image: "/assets/extracted/pdf-p09-img05.png" },
  { handle: "PRAIFUNNN", image: "/assets/extracted/pdf-p09-img06.png" }
];

const campaigns: Campaign[] = [
  {
    name: "Watson Club KOL Campaign",
    category: "Retail beauty",
    image: "/assets/extracted/pdf-p10-img02.png",
    stills: ["/assets/extracted/pdf-p10-img02.png", "/assets/extracted/pdf-p10-img04.png", "/assets/extracted/pdf-p10-img06.png"]
  },
  {
    name: "Watsons x OB Usagyuuun KOL Campaign",
    category: "Character collaboration",
    image: "/assets/extracted/pdf-p11-img03.png",
    stills: ["/assets/extracted/pdf-p11-img02.png", "/assets/extracted/pdf-p11-img03.png", "/assets/extracted/pdf-p11-img06.png"]
  },
  {
    name: "Galaxy AI S25 Ultra KOL Campaign",
    category: "Technology",
    image: "/assets/extracted/pdf-p13-img02.png",
    stills: ["/assets/extracted/pdf-p13-img02.png", "/assets/extracted/pdf-p13-img04.png", "/assets/extracted/pdf-p13-img06.png"]
  },
  {
    name: "Mizumi Sunscreen KOL Campaign",
    category: "Skincare",
    image: "/assets/extracted/pdf-p14-img02.png",
    stills: ["/assets/extracted/pdf-p14-img02.png", "/assets/extracted/pdf-p14-img04.png", "/assets/extracted/pdf-p14-img06.png"]
  },
  {
    name: "Maybelline Lifter Gloss HYA KOL",
    category: "Makeup",
    image: "/assets/extracted/pdf-p20-img04.png",
    stills: ["/assets/extracted/pdf-p20-img02.png", "/assets/extracted/pdf-p20-img04.png", "/assets/extracted/pdf-p20-img06.png"]
  },
  {
    name: "Clear Men Anti-Dandruff Scalp Pro KOL",
    category: "Men's care",
    image: "/assets/extracted/pdf-p22-img05.png",
    stills: ["/assets/extracted/pdf-p22-img02.png", "/assets/extracted/pdf-p22-img04.png", "/assets/extracted/pdf-p22-img05.png"]
  }
];

const categories = [
  "Lifestyle",
  "IT",
  "Education",
  "Mom and kids",
  "Fitness",
  "Beauty",
  "Food",
  "Travel"
];

const assetPath = (path: string) => `${process.env.NEXT_PUBLIC_BASE_PATH || ""}${path}`;

export default function Home() {
  const [activeCampaign, setActiveCampaign] = useState(0);
  const campaign = campaigns[activeCampaign];

  const repeatedBrands = useMemo(() => [...brands, ...brands], []);

  useEffect(() => {
    const sections = document.querySelectorAll<HTMLElement>(".section-reveal");
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { rootMargin: "0px 0px -12% 0px", threshold: 0.08 }
    );

    sections.forEach((section) => observer.observe(section));
    document.documentElement.classList.add("motion-ready");

    let frame = 0;
    const updateFolds = () => {
      frame = 0;
      if (reduceMotion.matches) return;

      const revealDistance = window.innerHeight * 0.6;
      sections.forEach((section) => {
        const distanceIntoView = window.innerHeight - (section.offsetTop - window.scrollY);
        const progress = Math.min(1, Math.max(0, distanceIntoView / revealDistance));
        const remaining = (1 - progress) ** 2;

        section.style.setProperty("--fold-shift", `${remaining * 36}px`);
        section.style.setProperty("--fold-tilt", `${remaining * -4}deg`);
      });
    };
    const scheduleFolds = () => {
      if (!frame) frame = window.requestAnimationFrame(updateFolds);
    };

    updateFolds();
    window.addEventListener("scroll", scheduleFolds, { passive: true });
    window.addEventListener("resize", scheduleFolds);

    return () => {
      observer.disconnect();
      window.cancelAnimationFrame(frame);
      window.removeEventListener("scroll", scheduleFolds);
      window.removeEventListener("resize", scheduleFolds);
      document.documentElement.classList.remove("motion-ready");
    };
  }, []);

  return (
    <main>
      <nav className="site-nav" aria-label="Primary navigation">
        <a className="brand-mark" href="#top" aria-label="SEEKER home">
          SEEKER
        </a>
        <div className="nav-links">
          <a href="#work">Work</a>
          <a href="#services">Services</a>
          <a href="#creators">Creators</a>
          <a href="#about">About</a>
        </div>
        <a className="nav-cta" href="#contact">
          Start a Project
        </a>
      </nav>

      <section id="top" className="hero-section">
        <div className="hero-backdrop" aria-hidden="true" />
        <div className="hero-grid">
          <div className="hero-copy">
            <p className="kicker">Thailand KOL / Influencer / Affiliate Marketing</p>
            <h1>
              <span className="hero-line"><span>SEEKER</span></span>
              <span className="hero-line"><span>DIGITAL</span></span>
              <span className="hero-line"><span>MARKETING</span></span>
            </h1>
          </div>
          <div className="hero-panel" aria-label="Campaign visuals from SEEKER presentation">
            <img src={assetPath("/assets/extracted/pdf-p13-img02.png")} alt="" className="hero-portrait" />
            <img src={assetPath("/assets/extracted/pdf-p10-img02.png")} alt="" className="hero-lens" />
          </div>
        </div>
        <div className="hero-bottom">
          <p>
            SEEKER helps brands find suitable Influencers and KOLs, develop campaigns, create brand awareness,
            and support sales activation through creator-led content.
          </p>
          <a href="#work">View campaigns</a>
        </div>
      </section>

      <section id="services" className="services-section section-pad section-reveal">
        <div className="section-intro">
          <h2>Services built around creator fit.</h2>
        </div>
        <div className="service-list">
          {services.map((service) => (
            <div className="service-row" key={service}>
              <span>{service}</span>
            </div>
          ))}
        </div>
      </section>

      <section id="work" className="work-section section-pad section-reveal">
        <div className="work-heading">
          <h2>Featured work</h2>
          <p>Named campaigns from the SEEKER presentation, shown as a clickable prototype portfolio.</p>
        </div>
        <div className="work-grid">
          <div className="campaign-list" role="tablist" aria-label="Featured campaigns">
            {campaigns.map((item, index) => (
              <button
                className={activeCampaign === index ? "campaign-row active" : "campaign-row"}
                key={item.name}
                onClick={() => setActiveCampaign(index)}
                type="button"
                role="tab"
                aria-selected={activeCampaign === index}
              >
                <span>{item.name}</span>
                <small>{item.category}</small>
              </button>
            ))}
          </div>
          <div className="campaign-stage" role="tabpanel">
            <div className="campaign-content" key={campaign.name}>
              <img src={assetPath(campaign.image)} alt={`${campaign.name} campaign collage`} className="campaign-main" />
              <div className="campaign-meta">
                <p>{campaign.category}</p>
                <h3>{campaign.name}</h3>
              </div>
              <div className="campaign-stills">
                {campaign.stills.map((still) => (
                  <img src={assetPath(still)} alt="" key={still} />
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="creators" className="creators-section section-pad section-reveal">
        <div className="section-intro narrow">
          <h2>Creator network across the funnel.</h2>
          <p>
            Nano, Micro, Mid-Tier, and Macro influencers across lifestyle, IT, education, family, fitness, beauty,
            food, and travel.
          </p>
        </div>
        <div className="tier-strip" aria-label="Influencer tiers">
          <span>Nano 1k-9.9k</span>
          <span>Micro 10k-49k</span>
          <span>Mid-Tier 50k-500k</span>
          <span>Macro 500k-1m</span>
        </div>
        <div className="creator-track">
          {creatorHandles.map((creator) => (
            <article className="creator-card" key={creator.handle}>
              <img src={assetPath(creator.image)} alt={`TikTok profile ${creator.handle}`} />
              <p>TikTok: {creator.handle}</p>
            </article>
          ))}
        </div>
        <div className="category-cloud" aria-label="Creator categories">
          {categories.map((category) => (
            <span key={category}>{category}</span>
          ))}
        </div>
      </section>

      <section id="about" className="about-section section-pad section-reveal">
        <div className="process-block">
          <h2>Process</h2>
          <div>
            {processSteps.map((item, index) => (
              <p key={item}>
                <span>{String(index + 1).padStart(2, "0")}</span>
                {item}
              </p>
            ))}
          </div>
        </div>
        <div className="brand-marquee" aria-label="Brands listed in SEEKER presentation">
          <div>
            {repeatedBrands.map((brand, index) => (
              <span key={`${brand}-${index}`}>{brand}</span>
            ))}
          </div>
        </div>
      </section>

      <section className="affiliate-section section-pad section-reveal">
        <div className="affiliate-image">
          <img src={assetPath("/assets/extracted/pdf-p19-img02.png")} alt="Creator content visual from SEEKER presentation" />
        </div>
        <div className="affiliate-copy">
          <h2>Influencer plus affiliate.</h2>
          <p>
            SEEKER presents affiliate marketing as performance-based creator work: creators review products, share
            links or codes, and help brands measure sales, clicks, and conversion.
          </p>
          <ul>
            <li>Recruit creators who can produce affiliate clips at scale.</li>
            <li>Select creators that fit the product.</li>
            <li>Combine Influencer Marketing, Affiliate, Content Production, and PR.</li>
          </ul>
        </div>
      </section>

      <section id="contact" className="contact-section section-reveal">
        <div>
          <p className="kicker">Presented by Seeker Digital Marketing</p>
          <h2>Start a project with SEEKER.</h2>
        </div>
        <address>
          <a href="tel:+66927295849">0927295849</a>
          <a href="tel:+66656496194">0656496194</a>
          <a href="mailto:watcharawit.imk@gmail.com">watcharawit.imk@gmail.com</a>
          <a href="mailto:pataraponpond18@gmail.com">pataraponpond18@gmail.com</a>
          <span>Line: Seekerforwork, pondhk18</span>
        </address>
      </section>
    </main>
  );
}
