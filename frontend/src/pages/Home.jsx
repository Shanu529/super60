import Hero from '../components/Hero.jsx'
import ImageMarquee from '../components/ImageMarquee.jsx'
import Achievements from '../components/Achievements.jsx'
import AboutPreview from '../components/AboutPreview.jsx'
import VisionMission from '../components/VisionMission.jsx'
import WhyChooseUs from '../components/WhyChooseUs.jsx'
import Highlights from '../components/Highlights.jsx'
import StatsCounter from '../components/StatsCounter.jsx'
import FeaturedProjects from '../components/FeaturedProjects.jsx'
import FacultyHighlights from '../components/FacultyHighlights.jsx'
import EventsCarousel from '../components/EventsCarousel.jsx'
import GalleryPreview from '../components/GalleryPreview.jsx'
import LatestAnnouncements from '../components/LatestAnnouncements.jsx'
import YoutubeSection from '../components/YoutubeSection.jsx'
import Testimonials from '../components/Testimonials.jsx'
import CTASection from '../components/CTASection.jsx'

export default function Home() {
  return (
    <div className="page-enter">
      <Hero />
      <ImageMarquee />
      <Achievements />
      <AboutPreview />
      <VisionMission />
      <WhyChooseUs />
      <Highlights />
      <StatsCounter />
      <FeaturedProjects />
      <FacultyHighlights />
      <EventsCarousel />
      <GalleryPreview />
      <LatestAnnouncements />
      <YoutubeSection />
      <Testimonials />
      <CTASection />
    </div>
  )
}
