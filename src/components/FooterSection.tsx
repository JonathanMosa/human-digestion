const FooterSection = () => {
  return (
    <section className="bg-[#070707] flex justify-between items-center px-20 py-8">
      <div className="text-white/70 text-sm">Human Digestion</div>
      <div className="flex gap-4 text-gray-500 text-sm">
        <a
          href="https://github.com/JonathanMosa/human-digestion"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-white transition"
        >
          About
        </a>
        <a href="#lesson" className="hover:text-white transition">
          References
        </a>
        <a
          href="mailto:jonathanmosa2189@gmail.com"
          className="hover:text-white transition"
        >
          Email us
        </a>
      </div>
      <div className="text-white/40 text-sm">Built with Next.js</div>
    </section>
  );
};

export default FooterSection;
