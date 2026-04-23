import { motion, useInView } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { useRef } from "react";

export const WordsPullUp = ({ text, className = "", showAsterisk = false, style }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  const words = text.split(" ");
  return (
    <div ref={ref} className={`inline-flex flex-wrap ${className}`} style={style}>
      {words.map((word, i) => {
        const isLast = i === words.length - 1;
        return (
          <motion.span key={i} initial={{ y: 20, opacity: 0 }} animate={isInView ? { y: 0, opacity: 1 } : {}} transition={{ duration: 0.6, delay: i * 0.08, ease: [0.16, 1, 0.3, 1] }} className="inline-block relative" style={{ marginRight: isLast ? 0 : "0.25em" }}>
            {word}
            {showAsterisk && isLast && <span className="absolute top-[0.65em] -right-[0.3em] text-[0.31em]">*</span>}
          </motion.span>
        );
      })}
    </div>
  );
};

export const PrismaHero = () => {
  return (
    <section className="h-screen w-full">
      <div className="relative h-full w-full overflow-hidden rounded-2xl md:rounded-[2rem]">
        <video autoPlay loop muted playsInline className="absolute inset-0 h-full w-full object-cover" src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260405_170732_8a9ccda6-5cff-4628-b164-059c500a2b41.mp4" />
        <div className="noise-overlay pointer-events-none absolute inset-0 opacity-[0.7] mix-blend-overlay" />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-black/80" />

        <div className="absolute bottom-0 left-0 right-0 px-4 pb-12 sm:px-6 md:px-10">
          <div className="grid grid-cols-12 items-end gap-4">
            <div className="col-span-12 lg:col-span-8">
              <h2 className="text-xl md:text-2xl font-light text-white mb-2 tracking-wide">Behavioural Researcher · Product Builder</h2>
              <h1 className="font-medium leading-[0.85] tracking-[-0.07em] text-[26vw] sm:text-[24vw] md:text-[22vw] lg:text-[20vw] xl:text-[19vw] 2xl:text-[20vw]" style={{ color: "#E1E0CC" }}>
                <WordsPullUp text="Arvind" showAsterisk={false} />
              </h1>
            </div>
            <div className="col-span-12 flex flex-col gap-6 pb-6 lg:col-span-4 lg:pb-10">
              <motion.p initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 0.8, delay: 0.5, ease: [0.16, 1, 0.3, 1] }} className="text-sm md:text-base text-gray-200 font-light" style={{ lineHeight: 1.5 }}>
                Ideas live in the in-between. Between curiosity and courage. Between data and instinct. That's where I work — turning human behaviour into intuitive experiences, trying to understand the 'Why' behind what we do.
              </motion.p>
              <motion.a href="#work" initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 0.8, delay: 0.7, ease: [0.16, 1, 0.3, 1] }} className="group inline-flex items-center gap-2 self-start rounded-full bg-white py-1 pl-5 pr-1 text-sm font-semibold text-black transition-all hover:gap-3 sm:text-base">
                See My Work
                <span className="flex h-9 w-9 items-center justify-center rounded-full bg-black transition-transform group-hover:scale-110 sm:h-10 sm:w-10">
                  <ArrowRight className="h-4 w-4" style={{ color: "#E1E0CC" }} />
                </span>
              </motion.a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
