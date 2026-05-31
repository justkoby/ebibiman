import './TransitionMarquee.css'

const TransitionMarquee = () => {
  const itemText = "AI MASTERCLASSES • ETA WEBINARS • FUTURE MINDS GHANA • TECH EDUCATION • "
  // Repeat enough times to span across any standard screen width
  const fullText = Array(4).fill(itemText).join("")

  return (
    <section className="transition-marquee-section">
      <div className="marquee-container">
        
        {/* Infinite Sliding Marquee Text behind the video */}
        <div className="marquee-wrapper">
          <div className="marquee-track">
            <span className="marquee-text">{fullText}</span>
            <span className="marquee-text">{fullText}</span>
          </div>
        </div>

        {/* Floating Capsule Video Pocket centered in front */}
        <div className="floating-video-capsule">
          <video 
            autoPlay 
            loop 
            muted 
            playsInline 
            className="capsule-video"
          >
            <source src="https://res.cloudinary.com/justkoby/video/upload/v1780198737/bg-video_pnwybf.mp4" type="video/mp4" />
          </video>
        </div>

      </div>
    </section>
  )
}

export default TransitionMarquee
