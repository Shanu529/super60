import { useEffect, useState } from 'react'
import Reveal from '../components/motion/Reveal.jsx'
import RevealGroup from '../components/motion/RevealGroup.jsx'
import RevealItem from '../components/motion/RevealItem.jsx'
import { fadeUp } from '../lib/motion.js'
import { getWithFallback, resolveImage, placeholderFor } from '../lib/api.js'
import { hod as hodFallback, mentor as mentorFallback, academicTeacher as teacherFallback, facultyList as facultyFallback } from '../data/fallback.js'

function FeaturedPerson({ eyebrow, person, fields }) {
  return (
    <Reveal as="section" className="featured-person">
      <div className="container">
        <div className="fp-person-card">
          <img
            className="fp-person-avatar-img"
            src={resolveImage(person.image, 'avatar')}
            alt={person.name}
            onError={(e) => { e.currentTarget.src = placeholderFor('avatar') }}
          />
          <div className="fp-person-body">
            <span className="eyebrow">{eyebrow}</span>
            <h2>{person.name}</h2>
            <span className="fp-person-role">{person.designation}</span>
            <p className="fp-person-bio">{person.bio}</p>
            <div className="fp-person-meta">
              {fields.map(([label, value]) => (
                value ? (
                  <div key={label} className="fp-meta-item">
                    <span className="fp-meta-label">{label}</span>
                    <span className="fp-meta-value">
                      {Array.isArray(value) ? value.join(', ') : value}
                    </span>
                  </div>
                ) : null
              ))}
            </div>
          </div>
        </div>
      </div>

      <style>{`
        .fp-person-card {
          display: grid;
          grid-template-columns: 220px 1fr;
          gap: 36px;
          background: linear-gradient(150deg, var(--bg-panel), var(--bg-panel-2));
          border: 1px solid var(--line);
          border-radius: 24px;
          padding: 40px;
          transition: border-color 0.35s ease;
        }
        .fp-person-card:hover { border-color: var(--red); }
        .fp-person-avatar-img {
          width: 100%;
          aspect-ratio: 1;
          border-radius: 20px;
          object-fit: cover;
          border: 1px solid var(--line);
        }
        .fp-person-body h2 {
          font-family: var(--font-display);
          font-size: clamp(22px, 3vw, 30px);
          margin: 10px 0 4px;
        }
        .fp-person-role {
          color: var(--red);
          font-size: 14px;
          font-weight: 600;
        }
        .fp-person-bio {
          color: var(--grey);
          line-height: 1.75;
          margin: 18px 0 24px;
          max-width: 640px;
        }
        .fp-person-meta {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 14px 28px;
        }
        .fp-meta-item {
          display: flex;
          flex-direction: column;
          gap: 4px;
          border-top: 1px solid var(--line);
          padding-top: 10px;
        }
        .fp-meta-label {
          font-size: 11px;
          text-transform: uppercase;
          letter-spacing: 0.08em;
          color: var(--grey-dim);
        }
        .fp-meta-value {
          font-size: 14px;
          color: var(--white);
        }
        @media (max-width: 720px) {
          .fp-person-card { grid-template-columns: 1fr; padding: 28px; }
          .fp-person-avatar-img { max-width: 140px; }
          .fp-person-meta { grid-template-columns: 1fr; }
        }
      `}</style>
    </Reveal>
  )
}

function FacultyGrid({ items }) {
  return (
    <Reveal as="section" className="faculty-grid-section">
      <div className="container">
        <div className="section-head">
          <span className="eyebrow">Faculty Members</span>
          <h2>Learn from people who've been there</h2>
        </div>
        <RevealGroup as="div" className="faculty-grid" stagger={0.08}>
          {items.map((f) => (
            <RevealItem as="div" className="faculty-card" variants={fadeUp} key={f._id}>
              <img
                className="faculty-avatar-img"
                src={resolveImage(f.image, 'avatar')}
                alt={f.name}
                onError={(e) => { e.currentTarget.src = placeholderFor('avatar') }}
              />
              <h3>{f.name}</h3>
              <span className="faculty-role">{f.designation}</span>
              <span className="faculty-qual">{f.qualification}</span>
              <p>{f.bio}</p>
              <div className="faculty-tags">
                <div>
                  <span className="tag-label">Subjects</span>
                  <div className="tag-row">
                    {f.subjects?.map((s) => <span key={s}>{s}</span>)}
                  </div>
                </div>
                <div>
                  <span className="tag-label">Interests</span>
                  <div className="tag-row">
                    {f.interests?.map((s) => <span key={s}>{s}</span>)}
                  </div>
                </div>
              </div>
            </RevealItem>
          ))}
        </RevealGroup>
      </div>

      <style>{`
        .faculty-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 20px;
        }
        .faculty-card {
          background: var(--bg-panel);
          border: 1px solid var(--line);
          border-radius: 18px;
          padding: 28px;
          transition: transform 0.3s ease, border-color 0.3s ease;
        }
        .faculty-card:hover {
          transform: translateY(-6px);
          border-color: var(--red);
        }
        .faculty-avatar-img {
          width: 56px;
          height: 56px;
          border-radius: 50%;
          object-fit: cover;
          margin-bottom: 14px;
          border: 1px solid var(--line);
        }
        .faculty-card h3 {
          font-family: var(--font-display);
          font-size: 17px;
          margin: 0 0 4px;
        }
        .faculty-role {
          display: block;
          color: var(--red);
          font-size: 13px;
          font-weight: 600;
        }
        .faculty-qual {
          display: block;
          color: var(--grey-dim);
          font-size: 12px;
          margin: 4px 0 12px;
        }
        .faculty-card p {
          color: var(--grey);
          font-size: 14px;
          line-height: 1.65;
          margin: 0 0 16px;
        }
        .faculty-tags {
          display: flex;
          gap: 24px;
          border-top: 1px solid var(--line);
          padding-top: 14px;
        }
        .tag-label {
          display: block;
          font-size: 10px;
          text-transform: uppercase;
          letter-spacing: 0.08em;
          color: var(--grey-dim);
          margin-bottom: 6px;
        }
        .tag-row {
          display: flex;
          flex-wrap: wrap;
          gap: 6px;
        }
        .tag-row span {
          font-size: 11px;
          border: 1px solid var(--line);
          border-radius: 999px;
          padding: 3px 9px;
          color: var(--grey);
        }
        @media (max-width: 720px) {
          .faculty-grid { grid-template-columns: 1fr; }
        }
      `}</style>
    </Reveal>
  )
}

export default function Faculty() {
  const [hod, setHod] = useState(hodFallback)
  const [mentor, setMentor] = useState(mentorFallback)
  const [teacher, setTeacher] = useState(teacherFallback)
  const [facultyList, setFacultyList] = useState(facultyFallback)

  useEffect(() => {
    getWithFallback('/hod', hodFallback).then(setHod)
    getWithFallback('/mentor', mentorFallback).then(setMentor)
    getWithFallback('/teacher', teacherFallback).then(setTeacher)
    getWithFallback('/faculty', facultyFallback).then(setFacultyList)
  }, [])

  return (
    <div className="page-enter faculty-page">
      <Reveal as="section" className="faculty-hero">
        <div className="container">
          <span className="eyebrow">Our Faculty</span>
          <h1>The people guiding Super 60</h1>
          <p className="lead">
            From department leadership to hands-on mentorship, our faculty shape every part of the
            community's journey.
          </p>
        </div>
      </Reveal>

      <FeaturedPerson
        eyebrow="Head of Department"
        person={hod}
        fields={[
          ['Department', hod.department],
          ['Experience', hod.experience],
          ['Academic Background', hod.education],
          ['Areas of Expertise', hod.expertise],
          ['Research Interests', hod.research],
        ]}
      />

      <FacultyGrid items={facultyList} />

      <FeaturedPerson
        eyebrow="Our Mentor"
        person={mentor}
        fields={[
          ['Responsibilities', mentor.responsibilities],
          ['Background', mentor.background],
          ['Contributions', mentor.contributions],
        ]}
      />

      <FeaturedPerson
        eyebrow="Academic Teacher"
        person={teacher}
        fields={[
          ['Experience', teacher.experience],
          ['Academic Work', teacher.academicWork],
          ['Areas of Expertise', teacher.expertise],
        ]}
      />

      <style>{`
        .faculty-hero {
          padding-top: 72px;
          padding-bottom: 24px;
          text-align: center;
        }
        .faculty-hero h1 {
          font-family: var(--font-display);
          font-weight: 700;
          font-size: clamp(30px, 5vw, 48px);
          margin: 14px 0 12px;
        }
        .faculty-hero .lead {
          color: var(--grey);
          max-width: 560px;
          margin: 0 auto;
        }
      `}</style>
    </div>
  )
}
