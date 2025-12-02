
import React, { useState, useEffect, useRef } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { ArrowRight, Check, Lock, Star, Zap, BarChart2, BookOpen, Layers, ShieldCheck, ChevronDown, ChevronRight, X, CreditCard, FileText, Mail, Copy } from 'lucide-react';
import { PRODUCTS, TESTIMONIALS, PAIN_POINTS } from '../constants';
import { MockBackend } from '../services/mockBackend';
import { Product } from '../types';

export const LandingPage: React.FC = () => {
  const { scrollY } = useScroll();
  const y1 = useTransform(scrollY, [0, 500], [0, 100]);
  const y2 = useTransform(scrollY, [0, 500], [0, -50]);

  const [buyingProduct, setBuyingProduct] = useState<Product | null>(null);
  const [showPayPal, setShowPayPal] = useState(false);
  const [showSupportPopup, setShowSupportPopup] = useState(false);

  const handleBuy = (product: Product) => {
    setBuyingProduct(product);
    setShowPayPal(true);
  };

  const closePayPal = () => {
      setShowPayPal(false);
      setBuyingProduct(null);
  }

  const completePurchase = async () => {
      if(!buyingProduct) return;
      await MockBackend.createOrder(buyingProduct.id, 'Guest User', 'guest@example.com', 'PAYPAL');
      alert(`Payment Successful! Order for ${buyingProduct.name} confirmed. Please check your email.`);
      closePayPal();
  };

  return (
    <div className="bg-dark-900 text-white overflow-hidden selection:bg-gold-500 selection:text-black">
      
      {/* Hero Section */}
      <section className="relative min-h-screen flex flex-col justify-center items-center text-center px-6 pt-20">
        {/* Background Grids & Ambience */}
        <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full max-w-7xl border-x border-white/5"></div>
            <motion.div style={{ y: y1 }} className="absolute top-1/4 left-1/4 w-96 h-96 bg-gold-500/10 rounded-full blur-[120px]" />
            <motion.div style={{ y: y2 }} className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-blue-500/5 rounded-full blur-[120px]" />
            <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 brightness-100 contrast-150 mix-blend-overlay"></div>
            
            {/* Moving Grid Lines */}
            <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:100px_100px] [mask-image:radial-gradient(ellipse_at_center,black_40%,transparent_70%)]"></div>
        </div>

        <div className="relative z-10 max-w-4xl mx-auto space-y-8">
            <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="space-y-4"
            >
                <span className="inline-block py-1 px-3 rounded-full bg-white/5 border border-white/10 text-gold-400 text-xs font-medium tracking-widest uppercase shadow-[0_0_15px_rgba(224,194,112,0.15)]">
                    Premium Digital Trading eBooks
                </span>
                <h1 className="font-serif text-5xl md:text-7xl lg:text-8xl leading-[1.1] font-medium text-transparent bg-clip-text bg-gradient-to-b from-white via-white to-gray-400 tracking-tight">
                    Trade Like Institutions.<br />
                    Master Every Level.
                </h1>
            </motion.div>

            <motion.p 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4, duration: 0.8 }}
                className="text-lg md:text-xl text-gray-400 max-w-2xl mx-auto leading-relaxed"
            >
                From liquidity precision to institutional execution — discover four elite <strong>digital trading manuals</strong> built to scale your mindset, methods, and performance.
            </motion.p>

            <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6, duration: 0.8 }}
                className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-8"
            >
                <button 
                    onClick={() => document.getElementById('collection')?.scrollIntoView({ behavior: 'smooth' })}
                    className="group bg-white text-black px-8 py-4 rounded-full font-semibold text-sm hover:bg-gold-400 transition-all flex items-center gap-2 shadow-[0_0_20px_rgba(255,255,255,0.2)] hover:shadow-[0_0_20px_rgba(224,194,112,0.4)]"
                >
                    Explore eBooks
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </button>
                <button 
                    onClick={() => document.getElementById('pricing')?.scrollIntoView({ behavior: 'smooth' })}
                    className="px-8 py-4 rounded-full font-medium text-sm text-gray-300 hover:text-white border border-white/10 hover:border-gold-500/50 transition-all glass hover:bg-gold-500/5"
                >
                    View Pricing
                </button>
            </motion.div>
        </div>

        {/* 3D Mockup Graphic Placeholder */}
        <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.8, duration: 1 }}
            className="relative z-10 mt-24 w-full max-w-5xl mx-auto"
        >
             <div className="relative aspect-[16/9] rounded-t-3xl border-t border-x border-white/10 bg-gradient-to-b from-white/5 to-transparent overflow-hidden shadow-2xl backdrop-blur-sm">
                 <div className="absolute inset-0 flex items-center justify-center">
                    <div className="flex gap-4 md:gap-8 items-end translate-y-16 opacity-90">
                         {[1,2,3,4].map((i) => (
                             <div key={i} className={`w-32 md:w-48 aspect-[2/3] rounded-lg shadow-[0_20px_50px_rgba(0,0,0,0.5)] bg-gradient-to-br from-gray-900 to-black border border-white/10 transform transition-transform hover:-translate-y-4 duration-500 relative group overflow-hidden ${i===2 ? 'z-20 scale-110 shadow-gold-500/10' : 'z-10 scale-95 opacity-80'}`}>
                                 <div className="absolute inset-0 bg-gradient-to-tr from-gold-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                                 <div className="absolute bottom-6 left-6 right-6">
                                     <div className="h-1 w-8 bg-gold-500 mb-3 shadow-[0_0_10px_#E0C270]"></div>
                                     <div className="h-2 w-3/4 bg-gray-700 rounded-full mb-2"></div>
                                     <div className="h-2 w-1/2 bg-gray-800 rounded-full"></div>
                                 </div>
                                 <div className="absolute top-4 right-4 text-gold-600/20 font-serif font-bold text-6xl">
                                     0{i}
                                 </div>
                             </div>
                         ))}
                    </div>
                 </div>
                 {/* Reflection */}
                 <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-dark-900 via-dark-900/80 to-transparent z-30"></div>
             </div>
        </motion.div>
      </section>

      {/* Pain Points Section */}
      <section className="py-32 px-6 relative border-t border-white/5 bg-dark-800">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-20 items-center">
             <div>
                 <span className="text-red-400 font-medium tracking-widest uppercase text-xs mb-4 block">The Reality of Retail Trading</span>
                 <h2 className="font-serif text-4xl md:text-5xl text-white mb-8 leading-tight">If You’re a Trader, You’ve Probably Felt This…</h2>
                 <ul className="space-y-6">
                     {PAIN_POINTS.map((point, idx) => (
                         <li key={idx} className="flex items-start gap-4 text-gray-400 group hover:text-white transition-colors">
                             <div className="w-1.5 h-1.5 rounded-full bg-red-500 mt-2.5 shadow-[0_0_10px_rgba(239,68,68,0.5)] group-hover:scale-150 transition-transform"></div>
                             <span className="text-lg font-light">{point}</span>
                         </li>
                     ))}
                 </ul>
             </div>
             <div className="relative h-[600px] w-full bg-black rounded-2xl overflow-hidden border border-white/10 shadow-2xl group">
                  {/* Heatmap Graphic Simulation */}
                  <div className="absolute inset-0 bg-gradient-to-br from-red-900/20 via-black to-black"></div>
                  <div className="absolute inset-0 flex items-center justify-center opacity-30">
                      <div className="grid grid-cols-12 gap-1 w-full h-full p-4 scale-105 group-hover:scale-100 transition-transform duration-1000">
                           {Array.from({length: 144}).map((_, i) => (
                               <div key={i} className={`rounded-sm transition-colors duration-1000 ${Math.random() > 0.8 ? 'bg-red-500/40 animate-pulse' : 'bg-gray-800/20'}`}></div>
                           ))}
                      </div>
                  </div>
                  <div className="absolute bottom-10 left-10 right-10 p-8 glass rounded-xl border border-white/10 backdrop-blur-md">
                      <div className="w-10 h-10 mb-4 text-gold-500">
                          <Zap className="w-full h-full" />
                      </div>
                      <p className="font-serif text-xl italic text-gray-200">"The market is designed to transfer money from the active to the patient."</p>
                      <p className="text-sm text-gold-500 mt-2">— Warren Buffett</p>
                  </div>
             </div>
        </div>
      </section>

      {/* Collection Grid */}
      <section id="collection" className="py-32 px-6 bg-dark-900 relative">
         <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent"></div>
        <div className="max-w-7xl mx-auto">
            <div className="text-center mb-20">
                <span className="text-gold-500 font-medium tracking-widest uppercase text-xs">Digital eBook Collection</span>
                <h2 className="font-serif text-4xl md:text-5xl mt-4 text-white">Select Your Digital Manual</h2>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                {PRODUCTS.map((product) => (
                    <ProductCard key={product.id} product={product} onBuy={() => handleBuy(product)} isBuying={false} />
                ))}
            </div>
        </div>
      </section>

      {/* Four Levels of Mastery */}
      <section className="py-32 px-6 bg-dark-800 border-y border-white/5 relative overflow-hidden">
         {/* Ambient Glow */}
         <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-gold-500/5 rounded-full blur-[100px]"></div>
         
         <div className="max-w-7xl mx-auto relative z-10">
            <div className="text-center mb-16">
                 <h2 className="font-serif text-4xl md:text-5xl text-white">Four Levels of Mastery</h2>
                 <p className="text-gray-400 mt-4">The exact roadmap from novice to institutional professional.</p>
            </div>

            <div className="grid md:grid-cols-4 gap-4 relative">
                {/* Connecting Line (Desktop) */}
                <div className="hidden md:block absolute top-12 left-0 w-full h-0.5 bg-gradient-to-r from-white/5 via-gold-500/50 to-white/5 z-0"></div>

                {PRODUCTS.map((product, idx) => (
                    <div key={idx} className="relative z-10 flex flex-col items-center text-center group">
                        <div className="w-24 h-24 rounded-full bg-dark-900 border-2 border-white/10 group-hover:border-gold-500 transition-colors flex items-center justify-center mb-6 shadow-xl relative">
                            <div className="font-serif text-2xl text-white group-hover:text-gold-400">0{idx + 1}</div>
                            {/* Pulse effect for active node */}
                            <div className="absolute inset-0 rounded-full border border-gold-500/0 group-hover:border-gold-500/50 group-hover:scale-110 transition-all duration-500"></div>
                        </div>
                        <h3 className="text-lg font-medium text-white mb-2">{product.name}</h3>
                        <p className="text-xs text-gold-500 uppercase tracking-widest mb-3">Level {idx + 1}</p>
                        <p className="text-sm text-gray-500 max-w-[200px]">{product.tagline}</p>
                    </div>
                ))}
            </div>
         </div>
      </section>

      {/* Chapter Breakdown (Accordion Style) */}
      <section className="py-32 px-6 bg-dark-900">
           <div className="max-w-4xl mx-auto">
                <h2 className="font-serif text-4xl md:text-5xl mb-16 text-center text-white">What You'll Discover Inside</h2>
                <div className="space-y-4">
                    {PRODUCTS.map((product, i) => (
                        <div key={i} className="group border border-white/10 rounded-2xl bg-white/[0.02] hover:bg-white/[0.04] transition-all duration-300 overflow-hidden hover:border-white/20">
                            <details className="group">
                                <summary className="p-6 md:p-8 cursor-pointer flex justify-between items-center list-none outline-none">
                                    <div className="flex gap-6 items-center">
                                        <span className="font-serif text-4xl text-white/10 group-hover:text-gold-500/50 transition-colors">0{i+1}</span>
                                        <div>
                                            <h3 className="text-xl font-medium text-white group-hover:text-gold-100 transition-colors">{product.name}</h3>
                                            <p className="text-sm text-gray-500 mt-1">{product.tagline}</p>
                                        </div>
                                    </div>
                                    <div className="p-2 rounded-full border border-white/10 bg-white/5 group-hover:bg-gold-500 group-hover:text-black group-hover:border-gold-500 transition-all transform group-open:rotate-180">
                                        <ChevronDown className="w-5 h-5" />
                                    </div>
                                </summary>
                                <div className="px-8 pb-8 pl-24 text-gray-400 text-sm border-t border-white/5 pt-6 animate-in slide-in-from-top-2">
                                    <div className="grid md:grid-cols-2 gap-8">
                                        {product.chapters?.map((chapter, cIdx) => (
                                            <div key={cIdx}>
                                                <h4 className="text-gold-400 font-medium mb-2">{cIdx + 1}. {chapter.title}</h4>
                                                <ul className="space-y-1">
                                                    {chapter.points.map((pt, pIdx) => (
                                                        <li key={pIdx} className="flex items-start gap-2">
                                                            <div className="w-1 h-1 bg-gray-600 rounded-full mt-2"></div>
                                                            <span>{pt}</span>
                                                        </li>
                                                    ))}
                                                </ul>
                                            </div>
                                        ))}
                                    </div>
                                    <div className="mt-8 pt-6 border-t border-white/5 flex items-center justify-between">
                                        <div className="flex items-center gap-2 text-gold-500 text-xs uppercase tracking-widest">
                                            <BookOpen className="w-4 h-4" />
                                            <span>Full PDF Manual + Video Case Studies</span>
                                        </div>
                                        <button onClick={() => handleBuy(product)} className="text-white hover:text-gold-400 font-medium text-sm flex items-center gap-2 transition-colors">
                                            Get this module <ArrowRight className="w-4 h-4" />
                                        </button>
                                    </div>
                                </div>
                            </details>
                        </div>
                    ))}
                </div>
           </div>
      </section>

      {/* Why Traders Choose TradSolution */}
      <section className="py-32 px-6 bg-black relative border-y border-white/10">
          <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-16 items-center">
               <div className="order-2 md:order-1">
                   {/* Waveform Graphic */}
                   <div className="relative h-96 w-full rounded-2xl overflow-hidden bg-dark-800 border border-white/10 flex items-center justify-center">
                        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20"></div>
                        <div className="flex items-end gap-1 h-32 w-full px-8 opacity-50">
                             {Array.from({length: 40}).map((_, i) => (
                                 <div 
                                    key={i} 
                                    className="flex-1 bg-gold-500 rounded-t-sm animate-pulse" 
                                    style={{ 
                                        height: `${Math.random() * 100}%`,
                                        animationDelay: `${i * 0.05}s`,
                                        animationDuration: '1.5s'
                                    }} 
                                 />
                             ))}
                        </div>
                        <div className="absolute top-8 left-8 p-4 glass rounded-xl border border-white/5">
                            <p className="text-xs text-gray-400 uppercase tracking-wider mb-1">System Status</p>
                            <div className="flex items-center gap-2">
                                <div className="w-2 h-2 rounded-full bg-green-500 shadow-[0_0_8px_#22c55e]"></div>
                                <span className="text-white font-medium">Edge Detected</span>
                            </div>
                        </div>
                   </div>
               </div>
               <div className="order-1 md:order-2">
                    <span className="text-gold-500 font-medium tracking-widest uppercase text-xs mb-4 block">The Advantage</span>
                    <h2 className="font-serif text-4xl text-white mb-6">Why Traders Choose TradSolution</h2>
                    <div className="space-y-8">
                        {[
                            { title: "Institutional Methodology", desc: "No retail tricks. Pure order flow and market structure derived from bank trading desks." },
                            { title: "Zero Indicators", desc: "We strip away the noise. Learn to read price, volume, and liquidity. Nothing else." },
                            { title: "Measurable Edge", desc: "Every strategy is backed by 10+ years of backtesting data and live verification." }
                        ].map((item, i) => (
                            <div key={i} className="flex gap-4">
                                <div className="w-12 h-12 rounded-full bg-white/5 border border-white/10 flex items-center justify-center shrink-0 text-gold-400">
                                    <Check className="w-5 h-5" />
                                </div>
                                <div>
                                    <h3 className="text-white font-medium text-lg mb-1">{item.title}</h3>
                                    <p className="text-gray-400 leading-relaxed">{item.desc}</p>
                                </div>
                            </div>
                        ))}
                    </div>
               </div>
          </div>
      </section>

      {/* Testimonials */}
      <section className="py-32 px-6 bg-dark-800 overflow-hidden">
          <div className="max-w-7xl mx-auto">
              <h2 className="font-serif text-4xl text-center mb-16 text-white">Trader Success Stories</h2>
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                  {TESTIMONIALS.map((t, i) => (
                      <div key={i} className="glass p-8 rounded-2xl relative border border-white/5 hover:border-gold-500/30 transition-all duration-300">
                          <div className="absolute top-6 right-6 text-gold-500/20">
                              <Star className="w-8 h-8 fill-current" />
                          </div>
                          <p className="text-gray-300 italic mb-8 relative z-10 leading-relaxed min-h-[80px]">"{t.text}"</p>
                          <div className="flex items-center gap-4">
                              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-gold-400 to-gold-600 flex items-center justify-center text-black font-bold font-serif text-sm shadow-lg">
                                  {t.initials}
                              </div>
                              <div>
                                  <p className="text-white text-sm font-medium">{t.name}</p>
                                  <p className="text-xs text-gray-500">{t.role}</p>
                              </div>
                          </div>
                      </div>
                  ))}
              </div>
          </div>
      </section>

      {/* Bonuses */}
      <section className="py-24 px-6 border-y border-white/5 bg-[#0F0F0F]">
          <div className="max-w-7xl mx-auto text-center">
               <span className="inline-block px-4 py-1 rounded-full bg-gold-500/10 text-gold-400 border border-gold-500/20 text-xs tracking-widest font-medium uppercase mb-6">
                   Included Free
               </span>
               <h2 className="font-serif text-3xl md:text-4xl mb-12 text-white">Exclusive Bonus Material</h2>
               <div className="grid md:grid-cols-4 gap-8">
                    {[
                        { title: "Liquidity Cheat Sheet", icon: Layers },
                        { title: "Entry Model Cards", icon: BookOpen },
                        { title: "Funded Calculator", icon: BarChart2 },
                        { title: "Psychology Reset", icon: Zap }
                    ].map((b, i) => (
                        <div key={i} className="flex flex-col items-center gap-4 group cursor-default">
                             <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-white/5 to-white/0 border border-white/10 flex items-center justify-center text-gold-400 group-hover:scale-110 group-hover:bg-gold-500 group-hover:text-black transition-all duration-300 shadow-xl">
                                 <b.icon className="w-8 h-8" />
                             </div>
                             <h3 className="text-sm font-medium text-gray-300 group-hover:text-white transition-colors">{b.title}</h3>
                        </div>
                    ))}
               </div>
               <div className="mt-12">
                   <button onClick={() => document.getElementById('pricing')?.scrollIntoView({behavior: 'smooth'})} className="text-gold-400 hover:text-white border-b border-gold-400/50 hover:border-white transition-colors pb-1 text-sm font-medium">
                       Unlock All Bonuses Free with Any Purchase
                   </button>
               </div>
          </div>
      </section>

       {/* Guarantee */}
       <section className="py-20 px-6">
           <div className="max-w-3xl mx-auto glass-gold p-10 md:p-14 rounded-3xl text-center relative overflow-hidden group">
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-gold-500 to-transparent opacity-50"></div>
                {/* Shine effect */}
                <div className="absolute inset-0 bg-gradient-to-tr from-white/0 via-white/5 to-white/0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"></div>
                
                <ShieldCheck className="w-12 h-12 text-gold-400 mx-auto mb-6" />
                <h3 className="font-serif text-2xl text-white mb-4">100% Satisfaction Guarantee</h3>
                <p className="text-gray-300 leading-relaxed">
                    If these <strong>digital manuals</strong> don’t feel premium, valuable, or transformative, request a 100% refund within 7 days — no questions asked. We trade on probability, and we're betting you'll love this.
                </p>
           </div>
       </section>

      {/* Final Pricing CTA */}
      <section id="pricing" className="py-32 px-6 bg-black text-center relative">
          <div className="max-w-4xl mx-auto">
               <h2 className="font-serif text-5xl md:text-6xl mb-6 text-white">Start Trading Like a Professional.</h2>
               <p className="text-xl text-gray-500 mb-12">Select your level of mastery. (Instant PDF Download)</p>
               
               <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                   {PRODUCTS.map((p) => (
                       <button 
                           key={p.id}
                           onClick={() => handleBuy(p)}
                           className="group relative overflow-hidden bg-white/5 hover:bg-gold-500 border border-white/10 rounded-2xl p-6 transition-all duration-300"
                       >
                           <div className="relative z-10">
                                <p className="text-xs text-gray-400 uppercase tracking-widest group-hover:text-black/60 mb-2">{p.name}</p>
                                <p className="font-serif text-3xl text-white group-hover:text-black mb-4">€{p.price}</p>
                                <span className="inline-flex items-center gap-2 text-xs font-medium text-white group-hover:text-black opacity-0 group-hover:opacity-100 transition-opacity transform translate-y-2 group-hover:translate-y-0">
                                    Buy Now <ArrowRight className="w-3 h-3" />
                                </span>
                           </div>
                       </button>
                   ))}
               </div>
          </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-6 border-t border-white/10 text-center text-gray-600 text-sm bg-black">
          <p>© 2024 TradSolution. All rights reserved.</p>
          <div className="flex justify-center gap-6 mt-4">
              <a href="#" className="hover:text-white transition-colors">Privacy</a>
              <a href="#" className="hover:text-white transition-colors">Terms</a>
              <a href="#" className="hover:text-white transition-colors">Contact</a>
          </div>
      </footer>

      {/* PayPal Checkout Modal */}
      <AnimatePresence>
        {showPayPal && buyingProduct && (
            <div className="fixed inset-0 z-[100] flex items-center justify-center px-4">
                <motion.div 
                    initial={{ opacity: 0 }} 
                    animate={{ opacity: 1 }} 
                    exit={{ opacity: 0 }}
                    onClick={closePayPal}
                    className="absolute inset-0 bg-black/80 backdrop-blur-sm"
                />
                <motion.div 
                    initial={{ opacity: 0, scale: 0.95, y: 20 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95, y: 20 }}
                    className="relative w-full max-w-md bg-white rounded-xl shadow-2xl overflow-hidden"
                >
                    {/* Fake PayPal Header */}
                    <div className="bg-[#003087] p-4 flex justify-between items-center">
                        <span className="text-white font-bold italic text-xl">PayPal</span>
                        <div className="flex gap-2">
                             <div className="text-white/80 text-xs">Sandbox Mode</div>
                             <button onClick={closePayPal} className="text-white/80 hover:text-white"><X className="w-5 h-5"/></button>
                        </div>
                    </div>
                    
                    <div className="p-8">
                        <div className="flex justify-between items-start mb-8 border-b border-gray-100 pb-6">
                            <div>
                                <h3 className="font-bold text-gray-900 text-lg">TradSolution Ltd.</h3>
                                <p className="text-sm text-gray-500">{buyingProduct.name}</p>
                            </div>
                            <div className="text-right">
                                <span className="block text-2xl font-bold text-gray-900">€{buyingProduct.price.toFixed(2)}</span>
                                <span className="text-xs text-gray-500">EUR</span>
                            </div>
                        </div>

                        <div className="space-y-4">
                             <button onClick={completePurchase} className="w-full bg-[#FFC439] hover:bg-[#F4BB30] text-black/80 font-bold py-3 rounded-full shadow-sm transition-colors flex items-center justify-center gap-2">
                                 Pay with <span className="font-bold italic text-blue-900">PayPal</span>
                             </button>
                             <div className="relative text-center my-4">
                                 <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-gray-200"></div></div>
                                 <span className="relative bg-white px-2 text-xs text-gray-500 uppercase">Or Pay with Card</span>
                             </div>
                             <button onClick={completePurchase} className="w-full bg-black text-white font-bold py-3 rounded-full hover:bg-gray-800 transition-colors flex items-center justify-center gap-2">
                                 <CreditCard className="w-4 h-4" /> Debit or Credit Card
                             </button>
                             
                             {/* Request Invoice Button */}
                             <button 
                                onClick={() => setShowSupportPopup(true)} 
                                className="w-full bg-white text-gray-600 font-bold py-3 rounded-full border border-gray-200 hover:bg-gray-50 hover:border-gray-300 transition-colors flex items-center justify-center gap-2 mt-2"
                             >
                                 <FileText className="w-4 h-4" /> Request Invoice
                             </button>
                        </div>
                        
                        <p className="text-center text-[10px] text-gray-400 mt-6">
                            This is a simulated checkout for the demo environment. No real funds will be charged.
                        </p>
                    </div>
                </motion.div>
            </div>
        )}
      </AnimatePresence>
      
      {/* Support Popup Modal */}
      <AnimatePresence>
          {showSupportPopup && (
              <div className="fixed inset-0 z-[110] flex items-center justify-center px-4">
                  <motion.div 
                      initial={{ opacity: 0 }} 
                      animate={{ opacity: 1 }} 
                      exit={{ opacity: 0 }}
                      onClick={() => setShowSupportPopup(false)}
                      className="absolute inset-0 bg-black/50 backdrop-blur-sm"
                  />
                  <motion.div 
                      initial={{ opacity: 0, scale: 0.95, y: 10 }}
                      animate={{ opacity: 1, scale: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.95, y: 10 }}
                      className="relative w-full max-w-sm bg-white rounded-xl shadow-2xl overflow-hidden p-6 text-center"
                  >
                        <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4 text-blue-600">
                             <Mail className="w-6 h-6" />
                        </div>
                        <h3 className="text-lg font-bold text-gray-900 mb-2">Request Invoice</h3>
                        <p className="text-sm text-gray-500 mb-6">
                            For manual invoicing and corporate orders, please contact our support team.
                        </p>
                        
                        <div className="bg-gray-50 rounded-lg p-3 border border-gray-200 flex items-center justify-center gap-2 mb-6 cursor-pointer hover:bg-gray-100 transition-colors" onClick={() => {navigator.clipboard.writeText('support@tradsolution.com'); alert('Copied!')}}>
                             <code className="text-sm font-mono text-gray-800">support@tradsolution.com</code>
                             <Copy className="w-3 h-3 text-gray-400" />
                        </div>

                        <button 
                            onClick={() => setShowSupportPopup(false)}
                            className="w-full bg-gray-900 text-white font-semibold py-2.5 rounded-lg hover:bg-gray-800 transition-colors"
                        >
                            Close
                        </button>
                  </motion.div>
              </div>
          )}
      </AnimatePresence>

    </div>
  );
};

const ProductCard: React.FC<{ product: Product, onBuy: () => void, isBuying: boolean }> = ({ product, onBuy, isBuying }) => {
    return (
        <div className="group relative bg-white/5 rounded-3xl p-1 border border-white/10 hover:border-gold-500/50 hover:shadow-[0_0_30px_-5px_rgba(224,194,112,0.15)] transition-all duration-500 flex flex-col h-full">
             <div className="bg-dark-900 rounded-[22px] p-6 flex flex-col h-full relative overflow-hidden">
                 {/* Product Image Placeholder */}
                 <div className="aspect-[3/4] mb-6 bg-gradient-to-br from-gray-800 to-black rounded-xl border border-white/5 shadow-2xl group-hover:scale-105 transition-transform duration-500 relative flex items-center justify-center overflow-hidden">
                      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.1),transparent)]"></div>
                      <div className="text-center p-4 relative z-10">
                          <h4 className="font-serif text-2xl text-gray-200 leading-tight">{product.name}</h4>
                          <div className="mt-4 w-12 h-1 bg-gold-500 mx-auto opacity-50 group-hover:w-20 transition-all duration-500 shadow-[0_0_10px_#E0C270]"></div>
                      </div>
                 </div>

                 <div className="flex-1 flex flex-col">
                      <div className="flex justify-between items-baseline mb-3">
                           <span className="text-gold-400 text-xs font-bold tracking-widest uppercase bg-gold-500/10 px-2 py-1 rounded">Level 0{product.level}</span>
                           <span className="text-white font-serif text-xl">€{product.price}</span>
                      </div>
                      <p className="text-gray-400 text-sm leading-relaxed mb-6 flex-1">{product.tagline}</p>
                 </div>

                 <button 
                    onClick={onBuy}
                    disabled={isBuying}
                    className="w-full py-3 rounded-xl bg-white text-black font-semibold text-sm hover:bg-gold-400 transition-colors flex justify-center items-center gap-2 group-hover:shadow-[0_0_15px_rgba(255,255,255,0.3)]"
                 >
                    {isBuying ? 'Processing...' : 'Buy Now'}
                    {!isBuying && <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />}
                 </button>
             </div>
        </div>
    );
};
