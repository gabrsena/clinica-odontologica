
import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom/client';
import { 
  Phone, 
  Instagram, 
  MapPin, 
  CheckCircle2, 
  Menu, 
  X, 
  ChevronRight, 
  Sparkles, 
  ShieldCheck, 
  Star, 
  Stethoscope,
  Smile,
  Shield,
  Gem
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

/**
 * CONSTANTS
 */
const WHATSAPP_LINK = "https://wa.me/5515999999999";

// Otimização das animações: margin profunda para disparar mais perto do centro da tela
const fadeIn = {
  initial: { opacity: 0, y: 50 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-25%" }, // Dispara quando o elemento está 25% dentro da tela
  transition: { duration: 0.9, ease: [0.16, 1, 0.3, 1] }
};

const slideUp = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-20%" },
  transition: { duration: 0.7, ease: "easeOut" }
};

const staggerContainer = {
  initial: {},
  whileInView: { transition: { staggerChildren: 0.12 } },
  viewport: { once: true }
};

const cardHover = {
  scale: 1.02,
  y: -5,
  boxShadow: "0 15px 30px rgba(197, 160, 89, 0.15)",
  transition: { type: "spring" as const, stiffness: 300, damping: 18 }
};

/**
 * COMPONENTS
 */

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Início', href: '#home' },
    { name: 'Especialidades', href: '#especialidades' },
    { name: 'A Doutora', href: '#doutora' },
    { name: 'Diferenciais', href: '#diferenciais' },
    { name: 'Contato', href: '#contato' },
  ];

  return (
    <nav className={`fixed w-full z-50 transition-all duration-500 ${scrolled ? 'bg-white/95 backdrop-blur-md shadow-md py-3' : 'bg-transparent py-6'}`}>
      <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="flex flex-col items-start"
        >
          <span className="font-serif text-xl sm:text-2xl font-bold tracking-tighter text-slate-900 leading-none">
            Dra. <span className="text-champagne">Ana Beatriz</span>
          </span>
          <span className="text-[8px] sm:text-[10px] tracking-[0.2em] uppercase font-light text-slate-500 mt-1">Odontologia & Estética</span>
        </motion.div>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center space-x-6 lg:space-x-8">
          {navLinks.map((link, idx) => (
            <motion.a 
              key={link.name} 
              href={link.href} 
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
              className="text-[11px] uppercase tracking-widest font-medium hover:text-champagne transition-all duration-300 relative group"
            >
              {link.name}
              <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-champagne transition-all duration-300 group-hover:w-full"></span>
            </motion.a>
          ))}
          <motion.a 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            href={WHATSAPP_LINK}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-champagne text-white px-6 py-2.5 rounded-full text-[11px] uppercase tracking-widest font-bold hover:brightness-110 transition-all shadow-lg shadow-champagne/20"
          >
            Agendar
          </motion.a>
        </div>

        {/* Mobile Toggle */}
        <button className="md:hidden text-slate-900 p-2" onClick={() => setIsOpen(!isOpen)} aria-label="Menu">
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-0 bg-white z-40 md:hidden pt-28 px-8 flex flex-col"
          >
            <div className="flex flex-col space-y-6 text-center">
              {navLinks.map((link) => (
                <a 
                  key={link.name} 
                  href={link.href} 
                  onClick={() => setIsOpen(false)}
                  className="text-2xl font-serif text-slate-800 border-b border-slate-50 pb-2 active:text-champagne transition-colors"
                >
                  {link.name}
                </a>
              ))}
              <a 
                href={WHATSAPP_LINK}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-champagne text-white py-4 rounded-xl text-lg font-bold shadow-xl shadow-champagne/20 mt-4"
              >
                Falar no WhatsApp
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

const SectionHeading = ({ subtitle, title, centered = true }: { subtitle: string, title: string, centered?: boolean }) => (
  <motion.div 
    variants={fadeIn}
    initial="initial"
    whileInView="whileInView"
    viewport={{ once: true, margin: "-15%" }}
    className={`mb-10 sm:mb-16 ${centered ? 'text-center' : 'text-left'}`}
  >
    <span className="text-champagne font-bold tracking-[0.4em] uppercase text-[10px] sm:text-xs mb-3 block">
      {subtitle}
    </span>
    <h2 className="text-3xl sm:text-5xl font-serif text-slate-900 leading-tight">
      {title}
    </h2>
    <div className={`w-16 sm:w-20 h-[1.5px] bg-champagne mt-6 ${centered ? 'mx-auto' : 'mr-auto'}`}></div>
  </motion.div>
);

const Hero = () => {
  return (
    <section id="home" className="relative min-h-[90vh] md:min-h-screen flex items-center pt-24 overflow-hidden">
      <div className="absolute top-0 right-0 w-full md:w-1/3 h-full bg-medical-chic -z-10 opacity-30 md:opacity-40"></div>
      <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-12 items-center">
        <div className="space-y-6 sm:space-y-8 text-center md:text-left">
          <motion.div 
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center space-x-2 bg-platinum/50 px-4 py-2 rounded-full"
          >
            <Sparkles size={14} className="text-champagne" />
            <span className="text-[10px] uppercase tracking-[0.2em] font-bold text-slate-600">Referência em Sorocaba</span>
          </motion.div>
          <motion.h1 
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-4xl sm:text-6xl lg:text-7xl font-serif leading-[1.1] text-slate-900"
          >
            Sua melhor versão <br />
            começa por um <br />
            <span className="italic text-champagne">sorriso.</span>
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-base sm:text-lg text-slate-600 leading-relaxed max-w-lg mx-auto md:mx-0 font-light"
          >
            Excelência em Harmonização Orofacial e Odontologia Estética no Parque Campolim. Tecnologia avançada para sua saúde e estética.
          </motion.p>
          <motion.div 
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-6 justify-center md:justify-start"
          >
            <a href={WHATSAPP_LINK} className="bg-champagne text-white px-8 py-4 rounded-full font-bold shadow-xl hover:scale-105 active:scale-95 transition-all flex items-center justify-center group">
              Agendar Avaliação
              <ChevronRight size={18} className="ml-2 group-hover:translate-x-1 transition-transform" />
            </a>
            <a href="#especialidades" className="border border-slate-200 text-slate-700 px-8 py-4 rounded-full font-medium hover:bg-slate-50 transition-all flex items-center justify-center text-sm">
              Nossas Especialidades
            </a>
          </motion.div>
        </div>

        {/* Hero Photo - Oculta no Mobile */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95, x: 30 }}
          animate={{ opacity: 1, scale: 1, x: 0 }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          className="hidden md:block relative"
        >
          <div className="aspect-[4/5] rounded-[60px] sm:rounded-[100px] overflow-hidden shadow-2xl border-[8px] lg:border-[12px] border-white relative z-10">
            <img 
              src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80&w=1200" 
              alt="Edifício Premium em Sorocaba" 
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent"></div>
            <div className="absolute bottom-10 left-10 right-10 text-white">
              <div className="flex items-center space-x-2">
                <MapPin size={18} className="text-champagne" />
                <span className="text-xs sm:text-sm uppercase tracking-[0.2em] font-bold">Business Center • Sorocaba</span>
              </div>
            </div>
          </div>
          <div className="absolute -top-10 -right-10 w-48 h-48 bg-champagne/10 rounded-full blur-3xl -z-0"></div>
          <div className="absolute -bottom-10 -left-10 w-48 h-48 bg-platinum/30 rounded-full blur-3xl -z-0"></div>
        </motion.div>
      </div>
    </section>
  );
};

const Specialties = () => {
  const items = [
    { title: 'Lentes de Contato', desc: 'Facetas ultra-finas para transformar sua estética dental.', icon: Gem },
    { title: 'Harmonização Facial', desc: 'Realce seus traços naturais com procedimentos precisos.', icon: Sparkles },
    { title: 'Implantes Dentários', desc: 'Segurança e biotecnologia para recuperar sua mastigação.', icon: Stethoscope },
    { title: 'Invisalign', desc: 'Ortodontia premium com alinhadores imperceptíveis.', icon: Smile }
  ];

  return (
    <section id="especialidades" className="py-20 sm:py-28 bg-medical-chic overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        <SectionHeading subtitle="Áreas de Atuação" title="Excelência Clínica Digital" />
        <motion.div 
          variants={staggerContainer}
          initial="initial"
          whileInView="whileInView"
          viewport={{ once: true, margin: "-20%" }}
          className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8"
        >
          {items.map((item, idx) => {
            const Icon = item.icon;
            return (
              <motion.div 
                key={idx} 
                variants={fadeIn}
                whileHover={cardHover}
                className="bg-white p-8 sm:p-12 rounded-[40px] border border-slate-50 flex flex-col items-center text-center group cursor-default shadow-sm hover:shadow-xl transition-all"
              >
                <div className="w-16 h-16 bg-platinum/40 rounded-3xl flex items-center justify-center mb-8 text-champagne group-hover:bg-champagne group-hover:text-white transition-all duration-500 transform group-hover:rotate-6">
                  <Icon size={30} strokeWidth={1.5} />
                </div>
                <h3 className="text-xl font-serif mb-4 text-slate-900 group-hover:text-champagne transition-colors">{item.title}</h3>
                <p className="text-sm text-slate-500 leading-relaxed font-light">{item.desc}</p>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
};

const DoctorBiography = () => {
  return (
    <section id="doutora" className="py-24 sm:py-32 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid md:grid-cols-2 gap-12 sm:gap-20 items-center">
          <motion.div 
            initial={{ opacity: 0, x: -60 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-25%" }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            className="relative"
          >
            <div className="aspect-[4/5] rounded-[50px] sm:rounded-[60px] overflow-hidden shadow-2xl border-[10px] sm:border-[16px] border-white relative z-10 mx-auto md:mx-0 max-w-sm md:max-w-none">
              <img 
                src="https://images.unsplash.com/photo-1559839734-2b71f1536780?auto=format&fit=crop&q=80&w=1200" 
                alt="Dra. Ana Beatriz sorrindo" 
                className="w-full h-full object-cover"
              />
            </div>
            <div className="hidden sm:block absolute -top-16 -left-16 text-[180px] lg:text-[220px] font-serif font-bold text-slate-50 -z-0 select-none leading-none opacity-50">Dra.</div>
          </motion.div>
          
          <motion.div 
            variants={fadeIn}
            initial="initial"
            whileInView="whileInView"
            viewport={{ once: true, margin: "-25%" }}
            className="space-y-6 text-center md:text-left"
          >
            <SectionHeading subtitle="Sua confiança é prioridade" title="Humanização & Arte" centered={false} />
            <p className="text-slate-600 leading-relaxed text-base sm:text-lg font-light">
              Especialista em Reabilitação Oral e Harmonização Facial, a <strong>Dra. Ana Beatriz</strong> une ciência e estética para criar resultados naturais e personalizados.
            </p>
            <p className="text-slate-600 leading-relaxed text-base sm:text-lg font-light">
              Em nossa clínica em Sorocaba, cada paciente é único. Utilizamos planejamento digital em 3D para garantir que você visualize sua transformação antes mesmo de começar.
            </p>
            <div className="grid grid-cols-2 gap-4 pt-6 text-left">
              {['Scanner 3D', 'Fluxo Digital', 'Equipamento Top', 'Biossegurança'].map((tag, i) => (
                <div key={i} className="flex items-center space-x-2">
                  <CheckCircle2 size={14} className="text-champagne shrink-0" />
                  <span className="text-[10px] sm:text-xs font-bold text-slate-800 uppercase tracking-widest">{tag}</span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

const Differentials = () => {
  const items = [
    { title: "Biossegurança", desc: "Rigidez hospitalar para sua total segurança.", icon: Shield },
    { title: "Privacidade", desc: "Atendimento exclusivo e discreto no Campolim.", icon: ShieldCheck },
    { title: "Previsibilidade", desc: "Veja o seu novo sorriso em 3D antes de iniciar.", icon: Sparkles }
  ];

  return (
    <section id="diferenciais" className="py-20 sm:py-24 bg-slate-900 text-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        <SectionHeading subtitle="Padrão Premium" title="Por Que Nos Escolher?" />
        <motion.div 
          variants={staggerContainer}
          initial="initial"
          whileInView="whileInView"
          viewport={{ once: true, margin: "-20%" }}
          className="grid md:grid-cols-3 gap-12 sm:gap-16"
        >
          {items.map((item, idx) => {
            const Icon = item.icon;
            return (
              <motion.div key={idx} variants={fadeIn} className="flex flex-col items-center text-center">
                <div className="w-20 h-20 rounded-full border border-champagne/20 flex items-center justify-center mb-8 text-champagne bg-white/5 hover:bg-champagne/20 transition-all duration-500">
                  <Icon size={32} />
                </div>
                <h3 className="text-2xl font-serif mb-4">{item.title}</h3>
                <p className="text-slate-400 font-light text-sm leading-relaxed max-w-xs">{item.desc}</p>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
};

const Footer = () => {
  const [showFloat, setShowFloat] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowFloat(window.scrollY > window.innerHeight * 0.8);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <footer id="contato" className="bg-medical-chic pt-20 pb-12 relative px-4 sm:px-0">
      <div className="max-w-7xl mx-auto sm:px-6">
        <div className="flex flex-col md:grid md:grid-cols-12 gap-10 lg:gap-16 items-start mb-16">
          
          {/* Informações de Contato */}
          <motion.div 
            variants={fadeIn}
            initial="initial"
            whileInView="whileInView"
            viewport={{ once: true }}
            className="w-full md:col-span-5 space-y-10 text-center md:text-left flex flex-col items-center md:items-start"
          >
            <div>
              <span className="font-serif text-3xl sm:text-4xl font-bold tracking-tighter text-slate-900 leading-none block">
                Dra. <span className="text-champagne">Ana Beatriz</span>
              </span>
              <p className="mt-4 text-slate-500 font-light max-w-sm">
                Odontologia de luxo e harmonização facial personalizada no coração de Sorocaba.
              </p>
            </div>
            
            <div className="space-y-6 w-full max-w-xs md:max-w-none">
              <div className="flex flex-col md:flex-row items-center space-y-3 md:space-y-0 md:space-x-5 group cursor-pointer">
                <div className="w-12 h-12 rounded-2xl bg-white flex items-center justify-center text-champagne shadow-md group-hover:bg-champagne group-hover:text-white transition-all duration-300">
                  <Phone size={20} />
                </div>
                <div className="flex flex-col text-center md:text-left">
                  <span className="text-[10px] uppercase tracking-widest font-black text-slate-400">Atendimento</span>
                  <span className="text-base font-semibold text-slate-700">(15) 99999-9999</span>
                </div>
              </div>

              <div className="flex flex-col md:flex-row items-center space-y-3 md:space-y-0 md:space-x-5 group cursor-pointer">
                <div className="w-12 h-12 rounded-2xl bg-white flex items-center justify-center text-champagne shadow-md group-hover:bg-champagne group-hover:text-white transition-all duration-300">
                  <Instagram size={20} />
                </div>
                <div className="flex flex-col text-center md:text-left">
                  <span className="text-[10px] uppercase tracking-widest font-black text-slate-400">Instagram</span>
                  <span className="text-base font-semibold text-slate-700">@dra.anabeatriz</span>
                </div>
              </div>

              <div className="flex flex-col md:flex-row items-center space-y-3 md:space-y-0 md:space-x-5 group cursor-pointer">
                <div className="w-12 h-12 rounded-2xl bg-white flex items-center justify-center text-champagne shadow-md group-hover:bg-champagne group-hover:text-white transition-all duration-300">
                  <MapPin size={20} />
                </div>
                <div className="flex flex-col text-center md:text-left">
                  <span className="text-[10px] uppercase tracking-widest font-black text-slate-400">Localização</span>
                  <span className="text-base font-semibold text-slate-700 leading-tight">Parque Campolim, Sorocaba/SP</span>
                </div>
              </div>
            </div>
          </motion.div>
          
          {/* Google Maps Container */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.98, y: 30 }}
            whileInView={{ opacity: 1, scale: 1, y: 0 }}
            viewport={{ once: true }}
            className="w-full md:col-span-7 h-[300px] sm:h-[450px] rounded-[30px] sm:rounded-[40px] overflow-hidden shadow-2xl border-[6px] sm:border-[12px] border-white relative mt-8 md:mt-0"
          >
            <iframe 
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3659.324204561845!2d-47.4729096!3d-23.5385966!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x94c5f532a87d0955%3A0xc39f863d085955b2!2sParque%20Campolim%2C%20Sorocaba%20-%20SP!5e0!3m2!1spt-BR!2sbr!4v1700000000000!5m2!1spt-BR!2sbr" 
              className="w-full h-full border-0 grayscale hover:grayscale-0 transition-all duration-1000" 
              allowFullScreen={true}
              loading="lazy"
            ></iframe>
          </motion.div>
        </div>
        
        {/* Footer Bottom */}
        <div className="pt-12 border-t border-slate-200 text-center">
          <p className="text-[9px] sm:text-[10px] text-slate-400 uppercase tracking-[0.3em] font-medium leading-loose">
            © 2024 Dra. Ana Beatriz • RT: CRO-SP 00000 <br />
            Odontologia Estética & Reabilitação Orofacial Premium.
          </p>
        </div>
      </div>
      
      {/* Botão Flutuante de WhatsApp - Luxo, Dinâmico e Magnético */}
      <AnimatePresence>
        {showFloat && (
          <motion.a 
            initial={{ opacity: 0, scale: 0.2, x: 100, rotate: -45 }}
            animate={{ 
              opacity: 1, 
              scale: 1, 
              x: 0, 
              rotate: 0,
              boxShadow: [
                "0 20px 40px rgba(197, 160, 89, 0.2)",
                "0 25px 50px rgba(197, 160, 89, 0.4)",
                "0 20px 40px rgba(197, 160, 89, 0.2)"
              ],
              transition: { 
                opacity: { duration: 0.4 },
                scale: { type: "spring", stiffness: 260, damping: 20 },
                boxShadow: { repeat: Infinity, duration: 3, ease: "easeInOut" }
              }
            }}
            exit={{ opacity: 0, scale: 0.2, x: 100, rotate: 45 }}
            whileHover={{ 
              scale: 1.12, 
              backgroundColor: "rgba(255, 255, 255, 0.9)",
              boxShadow: "0 30px 60px rgba(197, 160, 89, 0.5)",
              transition: { duration: 0.2 }
            }}
            whileTap={{ scale: 0.9 }}
            href={WHATSAPP_LINK} 
            target="_blank" 
            rel="noopener noreferrer"
            className="fixed bottom-6 right-6 sm:bottom-10 sm:right-10 z-50 bg-white/80 backdrop-blur-2xl text-champagne p-4 sm:p-5 rounded-full border border-champagne/40 flex items-center justify-center group"
            aria-label="Agendar via WhatsApp"
          >
            {/* Ícone com animação de balanço suave */}
            <motion.div
              animate={{ 
                rotate: [-5, 5, -5],
                scale: [1, 1.05, 1]
              }}
              transition={{ 
                repeat: Infinity, 
                duration: 4, 
                ease: "easeInOut" 
              }}
              className="relative z-10"
            >
              <Phone size={32} className="sm:size-38 group-hover:rotate-12 transition-transform duration-500" />
            </motion.div>
            
            {/* Ponto de Notificação Pulsante */}
            <span className="absolute -top-1 -right-1 flex h-4 w-4 z-20">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-champagne opacity-75"></span>
              <span className="relative inline-flex rounded-full h-4 w-4 bg-champagne border border-white"></span>
            </span>
            
            {/* Tooltip Lateral Elegante */}
            <motion.span 
              initial={{ opacity: 0, x: 15, filter: "blur(4px)" }}
              whileHover={{ opacity: 1, x: 0, filter: "blur(0px)" }}
              transition={{ duration: 0.3 }}
              className="hidden lg:block absolute right-full mr-6 bg-white/95 backdrop-blur-md px-6 py-3 rounded-2xl text-[10px] font-black text-slate-800 shadow-2xl border border-slate-100 uppercase tracking-[0.3em] whitespace-nowrap pointer-events-none"
            >
              Fale Conosco
            </motion.span>

            {/* Efeito de Brilho de Fundo (Glow) */}
            <div className="absolute inset-0 rounded-full bg-champagne/5 group-hover:bg-champagne/10 blur-xl -z-0 transition-colors"></div>
          </motion.a>
        )}
      </AnimatePresence>
    </footer>
  );
};

const App = () => {
  return (
    <div className="relative selection:bg-champagne/10 selection:text-champagne antialiased">
      <Navbar />
      <Hero />
      <Specialties />
      <DoctorBiography />
      <Differentials />
      <Footer />
    </div>
  );
};

// Renderização Principal
const rootElement = document.getElementById('root');
if (rootElement) {
  const root = ReactDOM.createRoot(rootElement);
  root.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );
}
