import { motion } from 'motion/react';
import { Target, ShieldCheck, Award } from 'lucide-react';

export default function About() {
  return (
    <div className="page-shell">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <header className="mb-24 text-center">
          <h1 className="text-5xl md:text-8xl font-black italic tracking-tighter uppercase mb-6 text-fab-black">Our <span className="text-fab-yellow">Culture</span></h1>
          <p className="text-fab-text-muted max-w-2xl mx-auto text-lg leading-relaxed font-bold uppercase tracking-widest">
            More than a brand. It's an expression of freedom.
          </p>
        </header>

        {/* Story Section */}
        <section className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center mb-40">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="aspect-square rounded-3xl overflow-hidden border-4 border-white shadow-xl bg-fab-gray-light"
          >
            <img
              src="https://picsum.photos/seed/retail-office/1200/1200"
              alt="Our Story"
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
          </motion.div>
          <div className="space-y-10">
            <h2 className="text-4xl md:text-6xl font-black italic tracking-tighter uppercase text-fab-black leading-none">Standardizing <br />Premium Lifestyles</h2>
            <p className="text-fab-text-muted leading-relaxed font-medium">
              DORJIGHOR was born from a simple observation: quality apparel should be accessible. We've spent years perfecting our manufacturing process, sourcing the finest materials, and collaborating with bold designers to bring you limited-edition drops that define your persona.
            </p>
            <p className="text-fab-text-muted leading-relaxed font-medium">
              Every piece of clothing that leaves our factory is a testament to our commitment to excellence. We don't just sell clothes; we provide the gear for your next adventure.
            </p>
            <div className="grid grid-cols-2 gap-8 pt-10 border-t border-fab-gray-medium">
              <div className="space-y-1">
                <span className="text-5xl font-black italic tracking-tighter text-fab-black">300k+</span>
                <p className="text-[10px] uppercase font-black tracking-[2px] text-fab-yellow">Community Members</p>
              </div>
              <div className="space-y-1">
                <span className="text-5xl font-black italic tracking-tighter text-fab-black">10M+</span>
                <p className="text-[10px] uppercase font-black tracking-[2px] text-fab-yellow">Units Shipped</p>
              </div>
            </div>
          </div>
        </section>

        {/* Values - Fab style */}
        <section className="bg-fab-black text-white rounded-[40px] py-28 px-12 mb-40 shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-96 h-96 bg-fab-yellow/10 rounded-full blur-[100px]"></div>
          
          <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-16 relative z-10">
            <div className="flex flex-col items-center text-center space-y-6">
              <div className="p-6 bg-white/10 rounded-2xl text-fab-yellow">
                <Target size={40} />
              </div>
              <h3 className="text-2xl font-black italic tracking-tighter uppercase">Our Mission</h3>
              <p className="text-sm text-white/60 leading-relaxed font-medium">
                To bridge the gap between high-end quality and everyday affordability, empowering our customers through style.
              </p>
            </div>
            <div className="flex flex-col items-center text-center space-y-6">
              <div className="p-6 bg-white/10 rounded-2xl text-fab-yellow">
                <ShieldCheck size={40} />
              </div>
              <h3 className="text-2xl font-black italic tracking-tighter uppercase">Our Ethics</h3>
              <p className="text-sm text-white/60 leading-relaxed font-medium">
                We maintain full transparency in our supply chain, ensuring ethical labor practices and sustainable material sourcing.
              </p>
            </div>
            <div className="flex flex-col items-center text-center space-y-6">
              <div className="p-6 bg-white/10 rounded-2xl text-fab-yellow">
                <Award size={40} />
              </div>
              <h3 className="text-2xl font-black italic tracking-tighter uppercase">Our Goal</h3>
              <p className="text-sm text-white/60 leading-relaxed font-medium">
                To be the most trusted lifestyle brand in Asia, known for innovation, quality, and consumer-first mindset.
              </p>
            </div>
          </div>
        </section>

        {/* Team */}
        <section className="text-center">
           <span className="text-sm font-bold uppercase tracking-[0.4em] text-brand-gold mb-6 block">The Artisans</span>
           <h2 className="text-4xl font-serif mb-16">The Minds Behind The Stitch</h2>
           <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
             {[1, 2, 3, 4].map((i) => (
                <div key={i} className="group">
                  <div className="ratio-portrait rounded-2xl overflow-hidden mb-6 grayscale group-hover:grayscale-0 transition-all duration-500">
                    <img
                      src={`https://picsum.photos/seed/artisan-${i}/600/750`}
                      alt="Artisan"
                      className="w-full h-full object-cover"
                      referrerPolicy="no-referrer"
                    />
                  </div>
                  <h4 className="text-lg font-serif mb-1">Md. Rahat Hossain</h4>
                  <p className="text-[10px] uppercase tracking-widest text-brand-ink/60">Master Cutter</p>
                </div>
             ))}
           </div>
        </section>
      </div>
    </div>
  );
}
