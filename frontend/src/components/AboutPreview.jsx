// import { Link } from 'react-router-dom'

// const FOCUS_AREAS = [
//   { title: 'Peer-to-Peer Learning', desc: 'Members teach and mentor each other through hands-on sessions.' },
//   { title: 'Real-World Projects', desc: 'Bridging classroom theory with practical, ship-it experience.' },
//   { title: 'Community Events', desc: 'Talks, hackathons and meetups that bring the community together.' },
// ]

// export default function AboutPreview() {
//   return (
//     <section className="about-preview">
//       <div className="container about-grid">
//         <div>
//           <span className="eyebrow">About Our Community</span>
//           <h2 className="about-title">
//             The <span className="highlight">Super 60</span> Community
//           </h2>
//           <p className="about-sub">Learn, Build, and Grow Together.</p>
//         </div>

//         <div className="about-side">
//           <blockquote>
//             "Super 60 Community is a global hub where everyone is welcome. We empower
//             students to bridge the gap between theory and practice through peer-to-peer
//             learning and real-world solutions."
//           </blockquote>

//           <div className="focus-block">
//             <h3>Our Main Focus</h3>
//             <ul>
//               {FOCUS_AREAS.map((f) => (
//                 <li key={f.title}>
//                   <strong>{f.title}</strong>
//                   <span>{f.desc}</span>
//                 </li>
//               ))}
//             </ul>
//           </div>

//           <Link to="/about" className="btn btn-primary">
//             Learn More <span className="btn-icon">↗</span>
//           </Link>
//         </div>
//       </div>

//       <style>{`
//         .about-preview {
//           background: radial-gradient(ellipse at top right, rgba(229,35,27,0.08), transparent 60%);
//         }
//         .about-grid {
//           display: grid;
//           grid-template-columns: 0.9fr 1.1fr;
//           gap: 60px;
//         }
//         .about-title {
//           font-family: var(--font-display);
//           font-weight: 700;
//           font-size: clamp(30px, 4.5vw, 48px);
//           margin: 14px 0 6px;
//         }
//         .about-sub {
//           color: var(--grey);
//           font-size: 18px;
//         }
//         blockquote {
//           font-family: var(--font-quote);
//           font-style: italic;
//           font-size: 18px;
//           line-height: 1.7;
//           color: var(--white);
//           margin: 0 0 36px;
//           padding: 0;
//         }
//         .focus-block h3 {
//           font-family: var(--font-display);
//           font-size: 13px;
//           letter-spacing: 0.14em;
//           color: var(--grey);
//           margin-bottom: 18px;
//         }
//         .focus-block ul {
//           list-style: none;
//           padding: 0;
//           margin: 0 0 32px;
//           display: flex;
//           flex-direction: column;
//           gap: 16px;
//         }
//         .focus-block li {
//           display: flex;
//           flex-direction: column;
//           gap: 4px;
//           padding: 16px;
//           border: 1px solid var(--line);
//           border-radius: 10px;
//         }
//         .focus-block strong {
//           font-family: var(--font-display);
//         }
//         .focus-block span {
//           color: var(--grey);
//           font-size: 14px;
//         }
//         @media (max-width: 860px) {
//           .about-grid {
//             grid-template-columns: 1fr;
//           }
//         }
//       `}</style>
//     </section>
//   )
// }

import { useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

const FOCUS_AREAS = [
  { title: 'Peer-to-Peer Learning', desc: 'Members teach and mentor each other through hands-on sessions.' },
  { title: 'Real-World Projects', desc: 'Bridging classroom theory with practical, ship-it experience.' },
  { title: 'Community Events', desc: 'Talks, hackathons and meetups that bring the community together.' },
];

export default function AboutPreview() {
  const sectionRef = useRef(null);

  useEffect(() => {
    let ctx = gsap.context(() => {
      
      // 1. Animate the left column content
      gsap.from('.about-left > *', {
        y: 40,
        opacity: 0,
        duration: 0.8,
        stagger: 0.2,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 80%', 
        },
      });

      // 2. Create a timeline for the right column to sequence the elements
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: '.about-side',
          start: 'top 80%',
        }
      });

      // Chain the animations on the timeline
      tl.from('blockquote', { 
          x: 30, // Slight slide in from the right
          opacity: 0, 
          duration: 0.8, 
          ease: 'power3.out' 
        })
        .from('.focus-block h3', { 
          y: 20, 
          opacity: 0, 
          duration: 0.5 
        }, '-=0.4') // Start 0.4s before the blockquote finishes
        .from('.focus-block li', { 
          y: 20, 
          opacity: 0, 
          duration: 0.5, 
          stagger: 0.15 
        }, '-=0.2') // Stagger the list items
        .from('.btn', { 
          y: 20, 
          opacity: 0, 
          duration: 0.5 
        }, '-=0.2');

    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="about-preview">
      <div className="container about-grid">
        
        {/* Added 'about-left' class for easier GSAP targeting */}
        <div className="about-left">
          <span className="eyebrow">About Our Community</span>
          <h2 className="about-title">
            The <span className="highlight">Super 60</span> Community
          </h2>
          <p className="about-sub">Learn, Build, and Grow Together.</p>
        </div>

        <div className="about-side">
          <blockquote>
            "Super 60 Community is a global hub where everyone is welcome. We empower
            students to bridge the gap between theory and practice through peer-to-peer
            learning and real-world solutions."
          </blockquote>

          <div className="focus-block">
            <h3>Our Main Focus</h3>
            <ul>
              {FOCUS_AREAS.map((f) => (
                <li key={f.title}>
                  <strong>{f.title}</strong>
                  <span>{f.desc}</span>
                </li>
              ))}
            </ul>
          </div>

          <Link to="/about" className="btn btn-primary">
            Learn More <span className="btn-icon">↗</span>
          </Link>
        </div>
      </div>

      <style>{`
        /* Added basic container styling */
        .container {
          max-width: 1200px;
          margin: 0 auto;
          padding: 80px 20px;
        }
        .about-preview {
          background: radial-gradient(ellipse at top right, rgba(229,35,27,0.08), transparent 60%);
          overflow: hidden; /* Prevents horizontal scrollbar if elements slide in from the side */
        }
        .about-grid {
          display: grid;
          grid-template-columns: 0.9fr 1.1fr;
          gap: 60px;
        }
        .eyebrow {
          text-transform: uppercase;
          font-weight: 600;
          letter-spacing: 1px;
          color: var(--red, #e74c3c);
          display: block;
        }
        .about-title {
          font-family: var(--font-display);
          font-weight: 700;
          font-size: clamp(30px, 4.5vw, 48px);
          margin: 14px 0 6px;
        }
        .highlight {
          color: var(--red, #e74c3c);
        }
        .about-sub {
          color: var(--grey, #666);
          font-size: 18px;
        }
        blockquote {
          font-family: var(--font-quote);
          font-style: italic;
          font-size: 18px;
          line-height: 1.7;
          /* Assumed standard text color since your background gradient seems light */
          color: var(--text-main, #333); 
          margin: 0 0 36px;
          padding: 0 0 0 20px;
          border-left: 3px solid var(--red, #e74c3c);
        }
        .focus-block h3 {
          font-family: var(--font-display);
          font-size: 13px;
          letter-spacing: 0.14em;
          text-transform: uppercase;
          color: var(--grey, #666);
          margin-bottom: 18px;
        }
        .focus-block ul {
          list-style: none;
          padding: 0;
          margin: 0 0 32px;
          display: flex;
          flex-direction: column;
          gap: 16px;
        }
        .focus-block li {
          display: flex;
          flex-direction: column;
          gap: 4px;
          padding: 16px;
          border: 1px solid var(--line, #eaeaea);
          border-radius: 10px;
          background: var(--bg-panel, #fff);
        }
        .focus-block strong {
          font-family: var(--font-display);
        }
        .focus-block span {
          color: var(--grey, #666);
          font-size: 14px;
        }
        .btn {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: 12px 24px;
          background: var(--red, #e74c3c);
          color: white;
          text-decoration: none;
          border-radius: 8px;
          font-weight: 600;
          transition: transform 0.2s ease;
        }
        .btn:hover {
          transform: translateY(-2px);
        }
        @media (max-width: 860px) {
          .about-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </section>
  );
}