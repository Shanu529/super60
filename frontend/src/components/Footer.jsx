import { Link } from 'react-router-dom'
import { useEffect, useRef, useState } from 'react'
import { getWithFallback } from '../lib/api.js'
import { contactInfo as contactFallback } from '../data/fallback.js'

function findSocialUrl(socials, label) {
  const match = socials?.find((s) => s.label?.toLowerCase() === label.toLowerCase())
  return match?.url || '#'
}

export default function Footer() {
  const [email, setEmail] = useState('')
  const [subscribed, setSubscribed] = useState(false)
  const [socials, setSocials] = useState(contactFallback.socials || [])
  const footerRef = useRef(null)

  useEffect(() => {
    getWithFallback('/homepage/contact', contactFallback).then((data) => {
      if (data?.socials?.length) setSocials(data.socials)
    })
  }, [])

  useEffect(() => {
    const elements = footerRef.current?.querySelectorAll('.footer-reveal')

    if (!elements) return

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible')
            observer.unobserve(entry.target)
          }
        })
      },
      {
        threshold: 0.12,
      }
    )

    elements.forEach((element) => observer.observe(element))

    return () => observer.disconnect()
  }, [])

  const handleSubscribe = (e) => {
    e.preventDefault()

    if (!email) return

    setSubscribed(true)
    setEmail('')
  }

  return (
    <footer ref={footerRef} className="site-footer">

      {/* =========================
          NEWSLETTER
      ========================= */}

      <div className="container footer-top footer-reveal">

        <div className="footer-newsletter-content">

          <span className="eyebrow">
            Stay Updated
          </span>

          <h3>
            Get community news
            <br />
            <span>in your inbox</span>
          </h3>

        </div>

        <form
          className="footer-form"
          onSubmit={handleSubscribe}
        >

          <div className="footer-input-wrap">

            <input
              type="email"
              required
              placeholder="you@college.edu"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            <span className="input-arrow">
              →
            </span>

          </div>

          <button
            type="submit"
            className="btn btn-primary"
          >
            {subscribed ? 'Subscribed ✓' : 'Subscribe'}

            <span className="btn-icon">
              ↗
            </span>
          </button>

        </form>

      </div>


      {/* =========================
          FOOTER MAIN
      ========================= */}

      <div className="container footer-inner">

        {/* BRAND */}

        <div
          className="footer-brand footer-reveal"
          style={{ '--delay': '0ms' }}
        >

          <div className="footer-brand-name">

            <div className="footer-name">
              <span className="brand-red">
                the
              </span>{' '}
              Super 60
            </div>

            <div className="footer-sub">
              COMMUNITY
            </div>

          </div>


          <p className="footer-tag">
            A community of creators, dreamers &amp; doers — learning, building and growing together.
          </p>


          {/* SOCIALS */}

          <div className="footer-socials">

            <a
              href={findSocialUrl(socials, 'Instagram')}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
              className="social-link"
            >
              IG
            </a>

            <a
              href={findSocialUrl(socials, 'LinkedIn')}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
              className="social-link"
            >
              in
            </a>

            <a
              href={findSocialUrl(socials, 'GitHub')}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub"
              className="social-link"
            >
              GH
            </a>

          </div>

        </div>


        {/* EXPLORE */}

        <div
          className="footer-col footer-reveal"
          style={{ '--delay': '100ms' }}
        >

          <h4>
            Explore
          </h4>

          <Link to="/about">
            About Us
          </Link>

          <Link to="/community">
            Community
          </Link>

          <Link to="/events">
            Events
          </Link>

          <Link to="/projects">
            Projects
          </Link>

        </div>


        {/* PEOPLE */}

        <div
          className="footer-col footer-reveal"
          style={{ '--delay': '200ms' }}
        >

          <h4>
            People
          </h4>

          <Link to="/faculty">
            Our Faculty
          </Link>

          <Link to="/gallery">
            Gallery
          </Link>

          <Link to="/announcements">
            Announcements
          </Link>

          <Link to="/contact">
            Contact
          </Link>

        </div>


        {/* GET INVOLVED */}

        <div
          className="footer-col footer-reveal"
          style={{ '--delay': '300ms' }}
        >

          <h4>
            Get involved
          </h4>

          <a href="#join">
            Join Us
          </a>

          <a href="#events">
            Upcoming Events
          </a>

          <a href="#partners">
            Become a Partner
          </a>

        </div>

      </div>


      {/* =========================
          FOOTER BOTTOM
      ========================= */}

      <div
        className="container footer-bottom footer-reveal"
        style={{ '--delay': '400ms' }}
      >

        <span>
          © {new Date().getFullYear()} Super 60 Community. All rights reserved.
        </span>

        <div className="footer-bottom-links">
          <Link
            to="/login"
            className="footer-admin-link"
          >
            Account
          </Link>

          <Link
            to="/admin/login"
            className="footer-admin-link"
          >
            Admin
          </Link>
        </div>

      </div>


      <style>{`

        /* =====================================
           FOOTER
        ===================================== */

        .site-footer {
          position: relative;

          margin-top: 40px;

          padding-top: 70px;

          border-top:
            1px solid var(--line);

          overflow: hidden;
        }


        /* =====================================
           BACKGROUND GLOW
        ===================================== */

        .site-footer::before {
          content: '';

          position: absolute;

          width: 500px;
          height: 500px;

          left: 50%;
          top: -250px;

          transform:
            translateX(-50%);

          border-radius: 50%;

          background:
            var(--red);

          opacity: 0.025;

          filter: blur(120px);

          pointer-events: none;
        }


        /* =====================================
           SCROLL ANIMATION
        ===================================== */

        .footer-reveal {
          opacity: 0;

          transform:
            translateY(35px);

          transition:
            opacity 0.8s ease,
            transform 0.8s
            cubic-bezier(.2,.8,.2,1);

          transition-delay:
            var(--delay, 0ms);
        }

        .footer-reveal.is-visible {
          opacity: 1;

          transform:
            translateY(0);
        }


        /* =====================================
           NEWSLETTER
        ===================================== */

        .footer-top {
          position: relative;

          z-index: 2;

          display: flex;

          align-items: center;

          justify-content:
            space-between;

          gap: 35px;

          padding: 34px;

          margin-bottom: 65px;

          border-radius: 22px;

          border:
            1px solid var(--line);

          background:
            linear-gradient(
              145deg,
              rgba(255,255,255,0.04),
              rgba(255,255,255,0.01)
            );

          overflow: hidden;
        }


        .footer-top::before {
          content: '';

          position: absolute;

          width: 180px;
          height: 180px;

          right: -80px;
          top: -80px;

          border-radius: 50%;

          background:
            var(--red);

          opacity: 0.08;

          filter: blur(50px);
        }


        .footer-newsletter-content {
          position: relative;

          z-index: 2;
        }


        .footer-top h3 {
          font-family:
            var(--font-display);

          font-size:
            clamp(21px, 3vw, 28px);

          line-height: 1.15;

          margin:
            10px 0 0;
        }


        .footer-top h3 span {
          color:
            var(--red);
        }


        /* =====================================
           FORM
        ===================================== */

        .footer-form {
          position: relative;

          z-index: 2;

          display: flex;

          gap: 10px;

          align-items: center;
        }


        .footer-input-wrap {
          position: relative;
        }


        .footer-form input {
          width: 250px;

          height: 44px;

          background:
            var(--bg);

          border:
            1px solid var(--line);

          border-radius:
            999px;

          padding:
            0 42px 0 18px;

          color:
            var(--white);

          font-family:
            var(--font-body);

          font-size: 13px;

          transition:
            border-color 0.3s ease,
            box-shadow 0.3s ease;
        }


        .footer-form input::placeholder {
          color:
            var(--grey-dim);
        }


        .footer-form input:focus {
          outline: none;

          border-color:
            var(--red);

          box-shadow:
            0 0 0 3px
            rgba(255,40,40,0.08);
        }


        .input-arrow {
          position: absolute;

          right: 17px;
          top: 50%;

          transform:
            translateY(-50%);

          color:
            var(--grey);

          pointer-events: none;
        }


        .footer-form .btn {
          height: 44px;

          white-space: nowrap;
        }


        /* =====================================
           MAIN FOOTER
        ===================================== */

        .footer-inner {
          position: relative;

          z-index: 2;

          display: grid;

          grid-template-columns:
            1.6fr
            1fr
            1fr
            1fr;

          gap: 45px;

          padding-bottom: 55px;
        }


        /* =====================================
           BRAND
        ===================================== */

        .footer-brand-name {
          margin-bottom: 17px;
        }


        .footer-name {
          font-family:
            var(--font-display);

          font-weight: 700;

          font-size: 17px;
        }


        .brand-red {
          color:
            var(--red);
        }


        .footer-sub {
          margin-top: 3px;

          font-size: 9px;

          letter-spacing:
            0.18em;

          color:
            var(--grey);
        }


        .footer-tag {
          max-width: 340px;

          color:
            var(--grey);

          line-height: 1.65;

          font-size: 13px;

          margin: 0;
        }


        /* =====================================
           SOCIALS
        ===================================== */

        .footer-socials {
          display: flex;

          gap: 9px;

          margin-top: 20px;
        }


        .social-link {
          width: 36px;
          height: 36px;

          display: flex;

          align-items: center;

          justify-content: center;

          border:
            1px solid var(--line);

          border-radius: 50%;

          color:
            var(--grey);

          font-size: 10px;

          font-weight: 700;

          transition:
            transform 0.35s ease,
            color 0.3s ease,
            border-color 0.3s ease,
            background 0.3s ease;
        }


        .social-link:hover {
          transform:
            translateY(-5px);

          color:
            var(--white);

          background:
            var(--red);

          border-color:
            var(--red);
        }


        /* =====================================
           FOOTER COLUMNS
        ===================================== */

        .footer-col {
          display: flex;

          flex-direction: column;

          gap: 12px;
        }


        .footer-col h4 {
          font-family:
            var(--font-display);

          font-size: 11px;

          letter-spacing:
            0.12em;

          text-transform:
            uppercase;

          color:
            var(--white);

          margin:
            0 0 7px;
        }


        .footer-col h4::after {
          content: '';

          display: block;

          width: 22px;
          height: 2px;

          margin-top: 9px;

          border-radius: 3px;

          background:
            var(--red);
        }


        .footer-col a {
          position: relative;

          width: fit-content;

          color:
            var(--grey);

          font-size: 13px;

          transition:
            color 0.25s ease,
            transform 0.25s ease;
        }


        .footer-col a:hover {
          color:
            var(--white);

          transform:
            translateX(5px);
        }


        .footer-col a::before {
          content: '';

          position: absolute;

          left: -10px;
          top: 50%;

          width: 4px;
          height: 4px;

          border-radius: 50%;

          background:
            var(--red);

          transform:
            translateY(-50%)
            scale(0);

          transition:
            transform 0.25s ease;
        }


        .footer-col a:hover::before {
          transform:
            translateY(-50%)
            scale(1);
        }


        /* =====================================
           BOTTOM
        ===================================== */

        .footer-bottom {
          position: relative;

          z-index: 2;

          border-top:
            1px solid var(--line);

          padding:
            20px 24px;

          color:
            var(--grey-dim);

          font-size: 12px;

          display: flex;

          justify-content:
            space-between;

          align-items: center;
        }


        .footer-admin-link {
          color:
            var(--grey-dim);

          font-size: 11px;

          transition:
            color 0.25s ease;
        }

        .footer-bottom-links {
          display: flex;
          align-items: center;
          gap: 18px;
        }


        .footer-admin-link:hover {
          color:
            var(--red);
        }


        /* =====================================
           TABLET
        ===================================== */

        @media (max-width: 860px) {

          .footer-inner {
            grid-template-columns:
              1fr 1fr;

            gap: 40px;
          }

          .footer-brand {
            grid-column:
              span 2;
          }

          .footer-top {
            align-items:
              flex-start;

            flex-direction:
              column;
          }

          .footer-form {
            width: 100%;
          }

          .footer-input-wrap {
            flex: 1;
          }

          .footer-form input {
            width: 100%;
          }

        }


        /* =====================================
           MOBILE
        ===================================== */

        @media (max-width: 560px) {

          .site-footer {
            padding-top: 55px;
          }

          .footer-top {
            padding: 24px;

            margin-bottom: 50px;
          }

          .footer-form {
            flex-direction:
              column;

            align-items:
              stretch;

            width: 100%;
          }

          .footer-input-wrap {
            width: 100%;
          }

          .footer-form input {
            width: 100%;
          }

          .footer-form .btn {
            width: 100%;
          }

          .footer-inner {
            grid-template-columns:
              1fr;

            gap: 35px;
          }

          .footer-brand {
            grid-column:
              auto;
          }

          .footer-bottom {
            padding:
              18px 0;

            gap: 15px;

            align-items:
              flex-start;

            flex-direction:
              column;
          }

        }


        /* =====================================
           REDUCED MOTION
        ===================================== */

        @media (prefers-reduced-motion: reduce) {

          .footer-reveal {
            opacity: 1;

            transform: none;

            transition: none;
          }

          .social-link:hover,
          .footer-col a:hover {
            transform: none;
          }

        }

      `}</style>
    </footer>
  )
}