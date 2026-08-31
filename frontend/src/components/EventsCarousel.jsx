import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import {
  getWithFallback,
  resolveImage,
  placeholderFor,
} from '../lib/api.js';

import { events as fallback } from '../data/fallback.js';
import { useEventModal } from '../context/EventModalContext.jsx';
import usePrefersReducedMotion from '../hooks/usePrefersReducedMotion.js';

gsap.registerPlugin(ScrollTrigger);

export default function EventsCarousel({ limit = 6 }) {
  
  const [events, setEvents] = useState(fallback);

  const { openEvent, activeEvent } = useEventModal();
  const reduced = usePrefersReducedMotion();

  const sectionRef = useRef(null);
  const headerRef = useRef(null);
  const eyebrowRef = useRef(null);
  const titleRef = useRef(null);
  const buttonRef = useRef(null);
  const trackRef = useRef(null);

  // useEffect(() => {
  //   getWithFallback('/events?limit=6', fallback).then(setEvents);
  // }, []);

  useEffect(() => {
  const endpoint = limit ? `/events?limit=${limit}` : '/events';
  getWithFallback(endpoint, fallback).then(setEvents);
}, [limit]);


  useLayoutEffect(() => {
    if (reduced) return;

    const ctx = gsap.context(() => {
      const cards = gsap.utils.toArray('.event-card');
      const images = gsap.utils.toArray('.event-image');

      /*
      ========================================
      HEADER INITIAL STATE
      ========================================
      */

      gsap.set(eyebrowRef.current, {
        opacity: 0,
        y: 20,
      });

      gsap.set(titleRef.current, {
        opacity: 0,
        y: 40,
        clipPath: 'inset(0 0 100% 0)',
      });

      gsap.set(buttonRef.current, {
        opacity: 0,
        y: 20,
      });

      /*
      ========================================
      CARD INITIAL STATE
      ========================================
      */

      gsap.set(cards, {
        opacity: 0,
        y: 70,
        scale: 0.97,
        rotateX: 4,
        transformPerspective: 1000,
      });

      /*
      ========================================
      HEADER SCROLL ANIMATION
      ========================================
      */

      const headerTimeline = gsap.timeline({
        scrollTrigger: {
          trigger: headerRef.current,
          start: 'top 88%',
          end: 'top 55%',
          scrub: 1,
        },
      });

      headerTimeline
        .to(eyebrowRef.current, {
          opacity: 1,
          y: 0,
          duration: 0.7,
          ease: 'power3.out',
        })
        .to(
          titleRef.current,
          {
            opacity: 1,
            y: 0,
            clipPath: 'inset(0 0 0% 0)',
            duration: 1,
            ease: 'power4.out',
          },
          '-=0.4'
        )
        .to(
          buttonRef.current,
          {
            opacity: 1,
            y: 0,
            duration: 0.7,
            ease: 'power3.out',
          },
          '-=0.5'
        );

      /*
      ========================================
      CARD SCROLL REVEAL
      ========================================
      */

      cards.forEach((card, index) => {
        gsap.to(card, {
          opacity: 1,
          y: 0,
          scale: 1,
          rotateX: 0,
          duration: 1,
          delay: index * 0.05,
          ease: 'power4.out',

          scrollTrigger: {
            trigger: card,
            start: 'top 92%',
            end: 'top 60%',
            scrub: 1.1,
          },
        });
      });

      /*
      ========================================
      IMAGE PARALLAX
      ========================================
      */

      images.forEach((image) => {
        gsap.fromTo(
          image,
          {
            yPercent: -8,
            scale: 1.06,
          },
          {
            yPercent: 8,
            scale: 1.02,
            ease: 'none',

            scrollTrigger: {
              trigger: image,
              start: 'top bottom',
              end: 'bottom top',
              scrub: 1.5,
            },
          }
        );
      });

      /*
      ========================================
      SUBTLE TRACK PARALLAX
      ========================================
      */

      gsap.to(trackRef.current, {
        y: -15,
        ease: 'none',

        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top bottom',
          end: 'bottom top',
          scrub: 2,
        },
      });

      ScrollTrigger.refresh();
    }, sectionRef);

    return () => ctx.revert();
  }, [events, reduced]);

  return (
    <section
      ref={sectionRef}
      className="
        relative
        py-16
        md:py-24
        overflow-hidden
        bg-[var(--bg-body,#0a0a0a)]
      "
    >
      {/* ========================================
          BACKGROUND GLOW
      ======================================== */}

      <div
        className="
          pointer-events-none
          absolute
          top-1/4
          left-1/2
          -translate-x-1/2
          w-[450px]
          h-[450px]
          rounded-full
          bg-[var(--red)]
          opacity-[0.025]
          blur-[130px]
        "
      />

      <div
        className="
          container
          mx-auto
          px-5
          lg:px-8
          max-w-7xl
          relative
          z-10
        "
      >

        {/* ========================================
            HEADER
        ======================================== */}

        <div
          ref={headerRef}
          className="
            flex
            flex-col
            md:flex-row
            md:items-end
            justify-between
            gap-6
            mb-10
          "
        >
          <div className="max-w-xl">

            {/* Eyebrow */}

            <span
              ref={eyebrowRef}
              className="
                block
                uppercase
                font-semibold
                tracking-[0.18em]
                text-[var(--red)]
                text-[10px]
                md:text-[11px]
                mb-3
              "
            >
              Our Events
            </span>

            {/* Main Heading */}

            <h2
              ref={titleRef}
              className="
                text-[36px]
                sm:text-[42px]
                md:text-[48px]
                lg:text-[52px]
                font-bold
                font-display
                text-[var(--white)]
                m-0
                leading-[1.05]
                tracking-[-0.025em]
              "
            >
              Experience the{' '}
              <span className="text-[var(--red)]">
                excitement.
              </span>
            </h2>
          </div>

          {/* View All Button */}

          <div
            ref={buttonRef}
            className="shrink-0"
          >
            <Link
              to="/events"
              className="
                group
                inline-flex
                items-center
                justify-center
                bg-[var(--bg-panel)]
                border
                border-[var(--line)]
                text-[var(--white)]
                rounded-full
                px-5
                py-2.5
                text-xs
                font-medium
                transition-all
                duration-300
                hover:border-[var(--red)]
                hover:bg-[var(--red)]
              "
            >
              View All Events

              <span
                className="
                  ml-2
                  text-sm
                  transition-transform
                  duration-300
                  group-hover:translate-x-1
                "
              >
                →
              </span>
            </Link>
          </div>
        </div>

        {/* ========================================
            EVENT CAROUSEL
        ======================================== */}

        <div
          ref={trackRef}
          className="
            flex
            gap-5
            overflow-x-auto
            pb-10
            -mx-5
            px-5
            sm:mx-0
            sm:px-0
            snap-x
            snap-mandatory
            hide-scrollbar
          "
        >
          {events.map((e, index) => {
            const isOpenSource =
              activeEvent &&
              activeEvent._id === e._id;

            return (
              <button
                key={e._id || e.title}
                type="button"
                className="
                  event-card
                  group
                  relative
                  shrink-0
                  w-[82vw]
                  sm:w-[320px]
                  lg:w-[330px]
                  snap-center
                  sm:snap-start
                  bg-[var(--bg-panel)]
                  border
                  border-[var(--line)]
                  rounded-2xl
                  text-left
                  cursor-pointer
                  overflow-hidden
                  flex
                  flex-col
                  focus-visible:outline
                  focus-visible:outline-2
                  focus-visible:outline-[var(--red)]
                  will-change-transform
                "
                onClick={() => openEvent(e)}
                aria-haspopup="dialog"
                style={{
                  visibility: isOpenSource
                    ? 'hidden'
                    : 'visible',
                }}
              >

                {/* ========================================
                    HOVER GLOW
                ======================================== */}

                <div
                  className="
                    absolute
                    inset-0
                    bg-gradient-to-b
                    from-transparent
                    to-[var(--red)]
                    opacity-0
                    transition-opacity
                    duration-500
                    group-hover:opacity-5
                    pointer-events-none
                    z-10
                  "
                />

                {/* ========================================
                    IMAGE
                ======================================== */}

                <div
                  className="
                    h-[165px]
                    relative
                    w-full
                    overflow-hidden
                    bg-black/20
                  "
                >
                  <img
                    className="
                      event-image
                      absolute
                      inset-0
                      w-full
                      h-[120%]
                      object-cover
                      will-change-transform
                      transition-transform
                      duration-700
                      ease-out
                      group-hover:scale-105
                    "
                    src={resolveImage(
                      e.image,
                      'event'
                    )}
                    alt={e.title}
                    onError={(img) => {
                      img.currentTarget.src =
                        placeholderFor('event');
                    }}
                  />

                  {/* Image Gradient */}

                  <div
                    className="
                      absolute
                      inset-0
                      bg-gradient-to-t
                      from-[var(--bg-panel)]
                      via-transparent
                      to-transparent
                      opacity-85
                      pointer-events-none
                    "
                  />

                  {/* Event Initial */}

                  <span
                    className="
                      absolute
                      top-3
                      left-3
                      w-8
                      h-8
                      rounded-lg
                      bg-[var(--red)]
                      text-white
                      text-xs
                      font-bold
                      flex
                      items-center
                      justify-center
                      font-display
                      shadow-lg
                      shadow-red-500/20
                    "
                  >
                    {e.title?.charAt(0)}
                  </span>

                  {/* Event Number */}

                  <span
                    className="
                      absolute
                      top-3
                      right-3
                      text-white/50
                      text-[10px]
                      font-mono
                    "
                  >
                    {String(index + 1).padStart(2, '0')}
                  </span>
                </div>

                {/* ========================================
                    CONTENT
                ======================================== */}

                <div
                  className="
                    p-5
                    flex
                    flex-col
                    grow
                    relative
                    z-10
                  "
                >

                  {/* Title */}

                  <h4
                    className="
                      font-display
                      text-[17px]
                      font-semibold
                      text-[var(--white)]
                      mb-4
                      leading-[1.35]
                      line-clamp-2
                      transition-colors
                      duration-300
                      group-hover:text-[var(--red)]
                    "
                  >
                    {e.title}
                  </h4>

                  {/* Event Metadata */}

                  <div
                    className="
                      flex
                      flex-col
                      gap-2
                      text-[var(--grey)]
                      text-[13px]
                      font-medium
                      mb-5
                    "
                  >
                    <span className="flex items-center gap-2">
                      <span
                        className="
                          text-[var(--red)]
                          opacity-80
                          text-xs
                        "
                      >
                        📍
                      </span>

                      <span className="truncate">
                        {e.location}
                      </span>
                    </span>

                    <span className="flex items-center gap-2">
                      <span
                        className="
                          text-[var(--red)]
                          opacity-80
                          text-xs
                        "
                      >
                        📅
                      </span>

                      {new Date(
                        e.date
                      ).toLocaleDateString(
                        'en-IN',
                        {
                          weekday: 'short',
                          month: 'short',
                          day: '2-digit',
                          year: 'numeric',
                        }
                      )}
                    </span>
                  </div>

                  {/* Bottom */}

                  <div
                    className="
                      flex
                      justify-between
                      items-center
                      border-t
                      border-[var(--line)]
                      pt-4
                      mt-auto
                    "
                  >
                    <span
                      className="
                        font-display
                        text-[10px]
                        text-[var(--grey)]
                        uppercase
                        tracking-[0.16em]
                        font-semibold
                      "
                    >
                      Super 60
                    </span>

                    <span
                      className="
                        text-[var(--red)]
                        text-xs
                        font-semibold
                        transition-transform
                        duration-300
                        group-hover:translate-x-1
                      "
                    >
                      Know More →
                    </span>
                  </div>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* ========================================
          HIDE SCROLLBAR
      ======================================== */}

      <style>{`
        .hide-scrollbar::-webkit-scrollbar {
          display: none;
        }

        .hide-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }

        .event-card {
          transform-style: preserve-3d;
          backface-visibility: hidden;
        }
      `}</style>
    </section>
  );
}