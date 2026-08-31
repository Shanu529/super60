import { useEffect, useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { getWithFallback, resolveImage, placeholderFor } from '../lib/api.js';
import { facultyList as fallback } from '../data/fallback.js';

gsap.registerPlugin(ScrollTrigger);

export default function FacultyHighlights() {
  const [items, setItems] = useState(fallback.slice(0, 3));
  const sectionRef = useRef(null);

  useEffect(() => {
    getWithFallback('/faculty', fallback).then((data) => setItems(data.slice(0, 3)));
  }, []);

  useEffect(() => {
    let ctx = gsap.context(() => {
      // Coordinated timeline for a highly professional, cinematic feel
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 80%', 
        }
      });

      // 1. Header elements slide in seamlessly
      tl.from('.reveal-head', {
        y: 30,
        opacity: 0,
        duration: 0.8,
        stagger: 0.15,
        ease: 'power3.out',
      })
      
      // 2. Cards glide up right after
      .from('.fh-card', {
        y: 40,
        opacity: 0,
        duration: 0.8,
        stagger: 0.15,
        ease: 'power3.out',
        clearProps: 'all' // Crucial: Enables Tailwind hover states after the animation finishes
      }, "-=0.4")
      
      // 3. Avatars scale in gently for a polished finishing touch
      .from('.fh-avatar-img', {
        scale: 0.8,
        opacity: 0,
        duration: 0.6,
        stagger: 0.15,
        ease: 'back.out(1.2)',
        clearProps: 'all'
      }, "-=0.6");

    }, sectionRef);

    return () => ctx.revert();
  }, [items]);

  return (
    <section ref={sectionRef} className="py-16 md:py-24 overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        
        {/* Responsive Header Section */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12 md:mb-16">
          <div className="max-w-2xl">
            <span className="reveal-head block uppercase font-semibold tracking-widest text-[var(--red)] text-xs md:text-sm mb-3">
              Faculty Highlights
            </span>
            <h2 className="reveal-head text-3xl md:text-4xl lg:text-5xl font-bold font-display text-[var(--white)] m-0 leading-tight">
              Guided by people who care
            </h2>
          </div>
          
          <div className="reveal-head shrink-0">
            <Link 
              to="/faculty" 
              className="inline-flex items-center justify-center border border-[var(--line)] rounded-full px-6 py-2.5 text-sm font-semibold whitespace-nowrap transition-all duration-300 hover:border-[var(--red)] hover:text-[var(--red)] hover:-translate-y-0.5"
            >
              Meet Our Faculty ↗
            </Link>
          </div>
        </div>

        {/* Responsive Grid: 1 col (mobile) -> 2 cols (tablet) -> 3 cols (desktop) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {items.map((f) => (
            <div 
              key={f._id} 
              className="fh-card flex flex-col items-center bg-[var(--bg-panel)] border border-[var(--line)] rounded-2xl p-8 text-center transition-all duration-300 hover:-translate-y-2 hover:border-[var(--red)] hover:shadow-lg"
            >
              <img
                className="fh-avatar-img w-20 h-20 rounded-full object-cover mb-5 border-2 border-[var(--line)]"
                src={resolveImage(f.image, 'avatar')}
                alt={f.name}
                onError={(e) => { e.currentTarget.src = placeholderFor('avatar') }}
              />
              <h3 className="text-xl font-semibold font-display text-[var(--white)] m-0 mb-1.5">
                {f.name}
              </h3>
              <span className="block text-[var(--red)] text-xs font-semibold mb-4 uppercase tracking-wider">
                {f.designation}
              </span>
              <p className="text-[var(--grey)] text-sm leading-relaxed m-0 flex-grow">
                {f.bio}
              </p>
            </div>
          ))}
        </div>
        
      </div>
    </section>
  );
}