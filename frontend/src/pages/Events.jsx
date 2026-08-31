import EventsCarousel from '../components/EventsCarousel.jsx'
import AchievementsGallery from '../components/AchievementsGallery.jsx'

export default function Events() {
  return (
    <div className="events-page">
      <section className="events-hero">
        <div className="container">
          <span className="eyebrow">Events</span>
          <h1>Vibrant events, hands-on sessions</h1>
          <p className="lead">
            From flagship summits to hands-on workshops — see what's coming up and
            what we've pulled off so far.
          </p>
        </div>
      </section>

      {/* <EventsCarousel />
      <AchievementsGallery /> */}
      
      <EventsCarousel limit={null} />
      <AchievementsGallery />

      <style>{`
        .events-hero {
          padding-top: 72px;
          padding-bottom: 24px;
          text-align: center;
        }
        .events-hero h1 {
          font-family: var(--font-display);
          font-weight: 700;
          font-size: clamp(30px, 5vw, 48px);
          margin: 14px 0 12px;
        }
        .lead {
          color: var(--grey);
          max-width: 560px;
          margin: 0 auto;
        }
      `}</style>
    </div>
  )
}
