import React from "react";

const FooterSection = () => {
  return (
    <section className="bg-[#070707] flex justify-between items-center px-20 py-8">
      <div className="text-sm">Human Digestion</div>
      <div className="flex gap-4 text-gray-500 text-sm">
        <p>About</p>
        <p>References</p>
        <p>Email us</p>
      </div>
      <div className="text-gray-700 text-sm">Built with Next.js</div>
    </section>
  );
};

export default FooterSection;
