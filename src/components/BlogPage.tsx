import React, { useState } from 'react'
import { ArrowLeft, BookOpen, User, Calendar, Award, Link as LinkIcon, Check } from 'lucide-react'
import './BlogPage.css'

interface BlogPageProps {
  articleId: 'nita-bill' | 'tech-issues-2026' | 'ai-coming-for-you'
  onBack: () => void
}

const BlogPage: React.FC<BlogPageProps> = ({ articleId, onBack }) => {
  const [copied, setCopied] = useState(false)

  const articleDetails = {
    'nita-bill': {
      category: 'Tech Policy & Advocacy',
      title: "Ghana's Digital Future Is at Stake - The NITA Bill Must Do Better",
      tagline: "Why we must ensure the new legal architecture of our IT sector builds inclusion and fosters innovation, not isolation and capture.",
      authors: "Samuel Sasu Adonteng & Margaret Edem Gasu",
      date: "June 2025",
      image: "/images/nita_bill_opinion.png",
      caption: "Conceptual illustration representing legal structures and digital ecosystems in Ghana."
    },
    'tech-issues-2026': {
      category: 'Thought Leadership',
      title: "Five Technology Issues to Watch Out For in 2026",
      tagline: "situtating global transitions in AI, cybersecurity, inclusion, fintech, and green tech within Ghana's development context.",
      authors: "Samuel Sasu Adonteng, Peter Kwasi Kodjie, Margaret Edem Gasu & Rexford Akrong",
      date: "June 2026",
      image: "/images/tech_trends_2026.png",
      caption: "Conceptual illustration representing the 2026 technological landscape: AI, security, connectivity, fintech, and green sustainability."
    },
    'ai-coming-for-you': {
      category: 'Opinion Piece',
      title: "AI is coming for you!",
      tagline: "Exploring the double-edged sword of AI, its transformative potential, and the challenges it poses for society.",
      authors: "Samuel Sasu Adonteng & Margaret Edem Gasu",
      date: "March 8, 2025",
      image: "/images/ai_coming_for_you.png",
      caption: "Conceptual illustration representing the integration of artificial intelligence and human capabilities."
    }
  }[articleId]

  const shareUrl = window.location.href
  const shareTitle = articleDetails.title

  const handleShare = (platform: 'twitter' | 'linkedin' | 'facebook' | 'copy') => {
    if (platform === 'twitter') {
      window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(shareTitle)}&url=${encodeURIComponent(shareUrl)}`, '_blank')
    } else if (platform === 'linkedin') {
      window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`, '_blank')
    } else if (platform === 'facebook') {
      window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`, '_blank')
    } else if (platform === 'copy') {
      navigator.clipboard.writeText(shareUrl).then(() => {
        setCopied(true)
        setTimeout(() => setCopied(false), 2000)
      })
    }
  }

  return (
    <article className="blog-article-page">
      {/* Article Header Nav */}
      <header className="blog-article-header-nav">
        <button onClick={onBack} className="blog-back-btn">
          <ArrowLeft className="back-icon" />
          <span>Back to Home</span>
        </button>
      </header>

      {/* Main Content Area */}
      <div className="blog-article-container">
        
        {/* Title Group */}
        <div className="blog-title-group">
          <div className="blog-category">
            <BookOpen className="cat-icon" />
            <span>{articleDetails.category}</span>
          </div>
          <h1 className="blog-title">
            {articleDetails.title}
          </h1>
          <p className="blog-tagline">
            {articleDetails.tagline}
          </p>
        </div>

        {/* Share and Metadata Row */}
        <div className="blog-meta-share-wrapper">
          {/* Metadata */}
          <div className="blog-meta-grid">
            <div className="blog-meta-item">
              <User className="meta-icon" />
              <div>
                <span className="meta-label">Written By</span>
                <span className="meta-value">{articleDetails.authors}</span>
              </div>
            </div>
            <div className="blog-meta-item">
              <Calendar className="meta-icon" />
              <div>
                <span className="meta-label">Date Published</span>
                <span className="meta-value">{articleDetails.date}</span>
              </div>
            </div>
            <div className="blog-meta-item">
              <Award className="meta-icon" />
              <div>
                <span className="meta-label">Publisher</span>
                <span className="meta-value">Ebibiman Tech Alliance</span>
              </div>
            </div>
          </div>

          {/* Social Share Bar */}
          <div className="blog-share-bar">
            <span className="share-label">Share Article</span>
            <div className="share-buttons">
              <button onClick={() => handleShare('twitter')} className="share-btn twitter-btn" title="Share on X">
                <svg viewBox="0 0 24 24" width="14" height="14" fill="currentColor">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                </svg>
              </button>
              <button onClick={() => handleShare('linkedin')} className="share-btn linkedin-btn" title="Share on LinkedIn">
                <svg viewBox="0 0 24 24" width="14" height="14" fill="currentColor">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0z"/>
                </svg>
              </button>
              <button onClick={() => handleShare('facebook')} className="share-btn facebook-btn" title="Share on Facebook">
                <svg viewBox="0 0 24 24" width="14" height="14" fill="currentColor">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                </svg>
              </button>
              <button onClick={() => handleShare('copy')} className="share-btn copy-btn" title="Copy Link">
                {copied ? <Check size={14} className="copied-icon" /> : <LinkIcon size={14} />}
                {copied && <span className="copied-tooltip">Copied!</span>}
              </button>
            </div>
          </div>
        </div>

        {/* Featured Image */}
        <div className="blog-featured-image-wrap">
          <img 
            src={articleDetails.image} 
            alt={articleDetails.title} 
            className="blog-featured-img"
          />
          <div className="blog-image-caption">
            {articleDetails.caption}
          </div>
        </div>

        {/* Body Copy */}
        <div className="blog-body-content">
          {articleId === 'nita-bill' ? (
            /* NITA BILL ARTICLE CONTENT */
            <>
              <p className="blog-intro-lead">
                Ghana is at an inflection point. With the African Continental Free Trade Area accelerating cross-border digital commerce, with fintech and agritech startups reshaping livelihoods from Accra to Tamale, and with government services migrating online at pace, the legal architecture that governs our information technology sector has never mattered more. The National Information Technology Authority Bill, 2025, which proposes to repeal and replace the NITA Act of 2008, is, in theory, an opportunity to build that architecture for the next generation. We at Ebibiman Tech Alliance believe in that project. We have waited for it. Which is precisely why we cannot stay silent about the ways this bill, as currently drafted, could do serious harm.
              </p>

              <h2 className="blog-section-title">Credit Where It Is Due</h2>
              <p>
                Let us begin honestly. There is genuine progress in this legislation, and we will not pretend otherwise.
              </p>
              <p>
                The regulatory sandbox framework in <strong>section 60</strong> is a welcome and overdue provision. By creating a controlled environment in which innovators can test new products and business models under relaxed regulatory conditions, the bill signals that Ghana understands innovation cannot be governed by yesterday's rules.
              </p>
              <p>
                The digital inclusion mandate in <strong>section 63</strong> - which explicitly centres persons with disabilities, women, rural populations, and marginalised groups - gives legal force to values that have too often remained aspirational.
              </p>
              <p>
                The Multi-Stakeholder Advisory Forum in <strong>section 64</strong>, drawing in civil society, academia, the private sector, and development partners, could be a meaningful check on regulatory insularity if properly resourced and empowered. And the commitment to adaptive, technology-neutral regulation in <strong>section 62</strong>, including explicit reference to artificial intelligence, blockchain, and the Internet of Things, reflects a legislature paying attention to where the world is heading.
              </p>
              <p className="blog-pull-quote">
                "These provisions deserve to be defended, strengthened, and funded. They are not sufficient reason, however, to ignore what the bill gets dangerously wrong."
              </p>

              <h2 className="blog-section-title">Where the Bill Falls Short</h2>
              
              <div className="blog-criticism-card">
                <h3><span>1</span> The citizenship lock-out will cost us investment and innovation</h3>
                <p>
                  <strong>Section 37</strong> restricts ICT licences to Ghanaian citizens or companies wholly owned by citizens. The intent - to protect local industry - is understandable. The effect, however, would be to bar joint ventures, foreign-co-invested startups, and diaspora-owned technology companies that do not meet a strict "wholly owned" threshold from operating legally in our market.
                </p>
                <p>
                  In a sector defined by cross-border capital, global talent, and international partnership, this is not protection - it is isolation. Ghanaian entrepreneurs seeking Series A investment from Silicon Valley or Lagos-based venture capital will find that accepting that capital potentially invalidates their licence. The bill should distinguish between protecting Ghanaian participation and mandating Ghanaian exclusivity. They are not the same thing, and conflating them will drive capital and talent elsewhere.
                </p>
              </div>

              <div className="blog-criticism-card">
                <h3><span>2</span> Universal professional certification will not build capacity - it will create a bottleneck</h3>
                <p>
                  <strong>Section 46</strong> requires that every ICT professional in both public and private institutions be certified by NITA before they can be appointed. The goal of professionalising the sector is laudable. But conferring a single statutory body with monopoly certification authority over an entire profession - without specifying timelines, grandfathering provisions, reciprocal recognition of existing qualifications, or independent oversight of the certification process itself - creates serious risks.
                </p>
                <p>
                  It creates a chokepoint through which every developer, systems analyst, network engineer, and IT support officer in Ghana must pass. It concentrates enormous gatekeeping power in a single institution. And where there is unchecked gatekeeping power, there is the documented risk of regulatory capture - where the body's decisions begin to serve industry insiders rather than public interest. Parliament should require transparent, independently audited certification criteria and establish an appeals pathway that is genuinely independent of NITA.
                </p>
              </div>

              <div className="blog-criticism-card">
                <h3><span>3</span> NITA cannot be regulator, enforcer, judge, and funder all at once</h3>
                <p>
                  Perhaps the most structurally troubling feature of this bill is the concentration of functions within and around a single authority. NITA licenses operators (<strong>section 35–40</strong>), enforces compliance (<strong>section 71–72</strong>), audits public ICT systems (<strong>section 56</strong>), chairs the Dispute Resolution Committee that adjudicates conflicts between licensees (<strong>section 75–77</strong>), and - critically - funds the National Information Technology Tribunal through its own budget (<strong>section 82</strong>).
                </p>
                <p>
                  The Tribunal exists to hear appeals against NITA's own decisions. A body that funds the court that reviews its decisions is not independent in any meaningful sense of the word. This is not speculation about future abuse; it is a structural design flaw that creates the appearance, and the reality, of institutional conflict of interest. International best practice demands that appellate and adjudicative bodies have autonomous, parliamentary-appropriated funding. Ghana's constitution and principles of natural justice demand no less.
                </p>
              </div>

              <div className="blog-criticism-card">
                <h3><span>4</span> The offences provisions are dangerously imprecise</h3>
                <p>
                  <strong>Section 95</strong> contains a range of criminal offences that, as drafted, lack the definitional precision required for fair and predictable enforcement. A provision making it an offence to "negligently cause a cybersecurity breach" exposes every system administrator, software developer, and cloud operator in Ghana to potential criminal liability for incidents that may result from circumstances beyond their control - a misconfigured third-party library, an unforeseen zero-day vulnerability, a targeted state-sponsored attack.
                </p>
                <p>
                  Similarly, the offence of engaging in "fraudulent ICT practices, including but not limited to cryptocurrency scams" sweeps so broadly that legitimate cryptocurrency exchanges, Web3 developers, and DeFi platforms could find themselves ensnared by provisions written with fraud in mind. Criminal legislation must define its terms. Vague offences do not deter bad actors - they empower selective prosecution and chill the very innovation the bill elsewhere claims to promote.
                </p>
              </div>

              <div className="blog-criticism-card">
                <h3><span>5</span> The e-government company raises a profound conflict of interest</h3>
                <p>
                  <strong>Sections 31 to 34</strong> establish a government-owned e-government ICT infrastructure company, to be incorporated and licensed by NITA within six months of the Act coming into force. This company will manage government data centres, cloud hosting, digital identity platforms, and enterprise software for the public sector.
                </p>
                <p>
                  It will compete - or coexist - with private ICT service providers in the same market NITA regulates. And under <strong>section 6</strong>, the Ministry that owns this company sits on NITA's governing board. The regulator, the regulated government company, and the shareholder of that company are institutionally entangled. Private sector actors, including the many Ghanaian tech SMEs who stand to compete for public sector contracts, will rightly ask whether they will receive equal regulatory treatment. This is not a hypothetical concern; it is the predictable consequence of a structural design that Parliament must address.
                </p>
              </div>

              <h2 className="blog-section-title">What Parliament Must Do Now</h2>
              <p>
                Ebibiman Tech Alliance calls on the Parliament of Ghana to pause the passage of this bill and subject it to deeper, structured public consultation - not a single hearing in Accra, but regional engagements that include tech hubs, universities, and professional associations in Kumasi, Takoradi, Tamale, and beyond.
              </p>
              <p>
                We call for an independent legal and technical review panel to assess the constitutional implications of the certification monopoly, the appellate funding arrangement, and the citizenship licensing restrictions. We call for explicit alignment with the Data Protection Act and the forthcoming Electronic Transactions Act, so that Ghanaians know their rights as data subjects within this regulatory framework. And we call for a parliamentary oversight mechanism - a dedicated committee reporting schedule - so that NITA's exercise of its enormous powers remains subject to democratic accountability, not merely executive discretion.
              </p>

              <h2 className="blog-section-title">The Ghana We Are Building Toward</h2>
              <p>
                Good digital governance is not a constraint on growth. It is the condition for it. A NITA that is genuinely independent, structurally fair, transparent in its licensing, and precise in its enforcement would be a competitive advantage for Ghana - a signal to investors, innovators, and our own young technologists that this country takes the rule of law in the digital economy seriously.
              </p>
              <p>
                That Ghana is possible. This bill, as drafted, does not yet build it. We believe it can. But only if we are honest enough, now, to say so.
              </p>

              {/* About ETA Section */}
              <div className="blog-about-eta">
                <h3>About Ebibiman Tech Alliance</h3>
                <p>
                  Ebibiman Tech Alliance is a Ghanaian civil society organisation working at the intersection of digital rights, technology policy, and inclusive innovation. We welcome dialogue with Parliament, the Ministry, and NITA on all matters raised in this article.
                </p>
              </div>
            </>
          ) : articleId === 'tech-issues-2026' ? (
            /* TECH ISSUES 2026 ARTICLE CONTENT */
            <>
              <p className="blog-intro-lead">
                The year 2026 marks a critical point in the global technology landscape. Rapid advances in artificial intelligence, digital finance, connectivity, climate technologies, and cybersecurity are no longer unfolding at the margins of society but are reshaping the core of economies, institutions, and everyday life. According to the World Economic Forum and the World Bank, these technological shifts are redefining how people work, access services, manage resources, and participate in the digital economy; often at a pace that outstrips policy, infrastructure, and skills development.
              </p>
              <p>
                For developing economies, particularly in Africa, these changes present a dual reality: unprecedented opportunities for leapfrogging traditional development barriers, alongside heightened risks of exclusion, job displacement, and digital vulnerability if transitions are poorly managed. Ghana, with its growing digital ecosystem and youthful population, stands at the centre of this moment.
              </p>
              <p>
                This article highlights five key technology issues to watch out for in 2026, drawing on verifiable data and insights from leading global and African institutions, including the World Economic Forum, the World Bank, the African Union, and Smart Africa. Beyond identifying global trends, the analysis situates them within Ghana’s development context, focusing on five priority sectors – employment, health, education, fintech, and agriculture. These sectors have been chosen for their central role in economic resilience, human development, and inclusive growth. Together, these sectors represent both the greatest exposure to technological disruption and the strongest potential for transformative impact if technology is strategically harnessed.
              </p>

              <h2 className="blog-section-title">5 Key Technology Issues to Watch</h2>

              <div className="blog-criticism-card">
                <h3><span>1</span> Artificial Intelligence and Automation Transforming Work</h3>
                <p>
                  Artificial Intelligence is revolutionizing economies and the nature of work. Advancements in AI – from generative AI chatbots to robotics – are driving productivity and innovation across industries. However, they also bring disruption to labour markets. The World Economic Forum projects that about 69 million new jobs will be created by emerging tech (like AI and the green transition) in the next five years, but 83 million could be eliminated by automation and other pressures, meaning roughly one-quarter of jobs worldwide will be disrupted by 2027.
                </p>
                <p>
                  This shift makes upskilling and reskilling more critical than ever; governments and businesses are urged to foster a culture of lifelong learning to help workers adapt. In Africa, the stakes are high given the continent’s young workforce – the World Bank estimates 230 million jobs in Africa will require digital or AI skills by 2030. Forward-looking organizations and governments are investing in AI strategies and training. The goal is to harness AI for economic growth (such as new digital services and improved efficiency) while managing its impact on employment. In 2026, AI is not just a tech trend but a transformative force reshaping how we work, demanding proactive policies on education, job transition, and ethical AI use.
                </p>
              </div>

              <div className="blog-criticism-card">
                <h3><span>2</span> Cybersecurity and Data Privacy in a Hyperconnected Era</h3>
                <p>
                  Cyber threats are escalating, making cybersecurity and data privacy top priorities. As businesses, governments, and individuals conduct more of their activities online, cyber-attacks have grown in frequency and sophistication globally. Data breaches and ransomware target not only corporations but also critical infrastructure and personal data, posing severe economic and security risks. In fact, cybercrime is on track to cost the world trillions of dollars annually (estimated at $10.5 trillion per year by 2025).
                </p>
                <p>
                  Africa is not spared – the continent’s rapid digitalization has exposed vulnerabilities. A recent UN Economic Commission for Africa report suggests Africa may already be losing around 10% of its GDP to cyberattacks and digital fraud, a startling figure underscoring the need for action. Meanwhile, governments are stepping up efforts on data protection: many African countries have enacted data privacy laws, and the African Union’s Malabo Convention on cybersecurity is pushing for higher standards, though implementation remains uneven. In 2026, organizations will be expected to invest more in cyber resilience – from zero-trust security architectures to AI-driven threat detection – and to train skilled cybersecurity professionals. Protecting user data and privacy is equally paramount as digital services expand.
                </p>
              </div>

              <div className="blog-criticism-card">
                <h3><span>3</span> Connectivity and Digital Inclusion: Bridging the Divide</h3>
                <p>
                  Bridging the digital divide remains a critical challenge and opportunity. Digital technologies have spread rapidly, but access to the internet and digital services is still far from equal. Globally, about 5.6 billion people (roughly 68% of the world’s population) were online by 2025, leaving an estimated 2.5+ billion people still offline. This gap is even more pronounced in Africa: internet penetration on the continent was only about 39% in 2023, compared to 87% in Europe. In other words, nearly two out of three Africans remain offline.
                </p>
                <p>
                  The infrastructure coverage has improved – for example, over 76% of West Africa’s population is now under 4G coverage – but usage lags behind. Key barriers include affordability and digital literacy. On average, mobile internet in Africa costs about 4.6% of monthly income (well above the 2% affordability target), and entry-level smartphones can cost weeks of income for many families. Social factors also play a role: women in Africa are 35% less likely to be online than men, reflecting gender gaps in access.
                </p>
                <p>
                  To close this divide, there should be renewed commitment from governments and private actors. There’s a push for digital public infrastructure – affordable broadband, public Wi-Fi, digital IDs, and payment systems – to increase adoption. International partners (World Bank, African Union, etc.) are supporting programs in digital skills training and affordable devices to ensure more people, especially in developing countries, can participate in the digital economy. Bridging the connectivity gap is not just a social imperative; it will unlock new markets, talent, and innovations by bringing the next billion users online.
                </p>
              </div>

              <div className="blog-criticism-card">
                <h3><span>4</span> Fintech and the Digital Economy Revolution</h3>
                <p>
                  Financial technology (fintech) is revolutionizing banking, inclusion, and commerce. The fintech sector continues its rapid growth as more people and businesses adopt digital finance solutions. From mobile payment apps and online banking to cryptocurrencies and crowdfunding, technology is transforming how we manage money. Globally, 79% of adults now have some form of financial account, a figure that has risen sharply thanks to mobile and digital banking innovations.
                </p>
                <p>
                  Nowhere is this fintech leap more evident than in Africa, which has become the world’s leader in mobile money. Africa accounts for almost 70% of the world’s $1 trillion mobile money transactions, and in Sub-Saharan Africa, nearly 10% of GDP is transacted through mobile money services – far outpacing other regions. This has brought millions of “unbanked” people into the financial system, spurring entrepreneurship and reducing poverty. The fintech industry itself is booming: it’s now Africa’s fastest-growing start-up sector and is projected to reach $230 billion in value by 2025, growing 10% annually.
                </p>
                <p>
                  Globally, fintech trends to watch in 2026 include the rise of central bank digital currencies (CBDCs) – over 80% of central banks are now researching or piloting digital versions of national currencies – and the expansion of open banking, which allows consumers to securely share financial data across services to get better rates and personalized products. Digital finance is also enabling faster cross-border remittances and new forms of credit for small businesses through alternative data. For consumers and businesses alike, fintech is making financial services more accessible, efficient, and tailored. Regulators, meanwhile, are working to keep pace, updating policies on digital payments, crypto-assets, and consumer protection to ensure stability and trust in this fast-moving digital economy.
                </p>
              </div>

              <div className="blog-criticism-card">
                <h3><span>5</span> Green Tech and Climate Innovation for Sustainability</h3>
                <p>
                  Technologies for climate resilience and sustainable development are gaining urgency. With climate change’s impacts intensifying – global average temperatures hit record highs in 2024, accompanied by a slew of extreme weather events – there is a spotlight on “green” technology solutions. These range from clean energy to climate-smart agriculture. Governments and industries are investing in renewable energy technologies like solar, wind, and battery storage to transition away from fossil fuels; notably, world leaders (G20) even committed to triple global renewable energy capacity by 2030 in recent agreements.
                </p>
                <p>
                  Equally important are technologies that help societies adapt to climate impacts. Climate-tech innovation in 2026 will include advanced climate forecasting, flood and drought early-warning systems, and new materials for resilient infrastructure. In agriculture, which is especially critical for Africa, digital technology is a game-changer. By integrating AI, remote sensing (satellite imagery), and data analytics, farmers can optimize planting and irrigation, use predictive tools for weather and pests, and thus transform traditional farming into a more productive and climate-smart system. This is vital because agriculture remains the backbone of livelihoods in many developing countries – for example, it employs over half of Africa’s workforce and a significant share of Ghana’s as well.
                </p>
                <p>
                  We are also seeing growth in the “circular economy” tech that reduces waste, such as recycling innovations and bio-engineered alternatives to plastics. Meanwhile, green financing is rising to support these innovations; global investment in climate adaptation and mitigation technologies continues to grow year-on-year. In 2026 and beyond, expect technology to be at the forefront of efforts to combat climate change – whether through cutting emissions (clean tech) or boosting resilience (agritech, water-tech, etc.). These solutions not only protect the planet but also create new economic opportunities in sustainable industries.
                </p>
              </div>

              <h2 className="blog-section-title">Ghana: How These Trends Affect Key Sectors</h2>
              <p>
                In Ghana, we will need to closely monitor and embrace these technology trends to advance Ghana’s socio-economic resilience. In line with Ghana’s digital transformation goals, five priority sectors – Employment, Health, Education, Fintech, and Agriculture – stand to be significantly impacted:
              </p>

              <div className="blog-sector-section">
                <h4>Employment</h4>
                <p>
                  Digital technology presents both risks and opportunities for employment in Ghana. While automation and AI threaten to disrupt certain job categories, the digital economy also offers significant potential for job creation if skills development keeps pace with global trends. In response, the government has introduced initiatives such as the One Million Coders Programme, aimed at equipping young people with basic coding and ICT skills. While this is a positive starting point, there is growing concern that such programmes may be insufficiently aligned with the direction in which technology and labour markets are moving.
                </p>
                <p>
                  As AI becomes embedded across sectors, skills demand is shifting beyond basic coding toward a deeper understanding of AI systems, data literacy, machine learning concepts, responsible AI use, and applied skills such as prompt engineering, human-AI collaboration, and AI-assisted problem-solving. This underscores the need for a more coordinated and future-ready national skills strategy, one that actively engages private-sector employers, technology firms, startups, universities, and innovation hubs to deliver practical, demand-driven training. Such an approach should prepare individuals not only for employment but also for digital entrepreneurship, freelancing, and AI-enabled enterprise creation. Without clear pathways from training to income generation, regular curriculum updates, and stronger public-private collaboration, well-intentioned skills programmes risk becoming outdated before they achieve meaningful labour-market impact.
                </p>
              </div>

              <div className="blog-sector-section">
                <h4>Health</h4>
                <p>
                  Technology-driven innovation is improving healthcare access and outcomes in Ghana. A striking example is the use of drones to deliver medical supplies to remote clinics – a service that has dramatically cut delivery times for blood, vaccines, and medications. A recent study in Ghana’s Ashanti region showed that facilities served by medical drone deliveries saw maternal death rates drop by 56.4% after implementation, an indicator of how life-saving this tech can be.
                </p>
                <p>
                  Beyond drones, Ghana’s health sector is adopting telemedicine platforms to connect patients in underserved areas with urban medical specialists, reducing the need to travel for care. Digital health records and mobile health apps are being introduced to streamline patient information and remind people to take medications or attend check-ups. Notably, Ghana is also leveraging its fintech prowess for health financing: mobile money platforms and insurance innovations are enabling more Ghanaians to save and pay for health services digitally, easing the burden of out-of-pocket expenses. By investing in these e-health solutions, Ghana aims to achieve more inclusive and efficient healthcare, aligning with the country’s efforts toward Universal Health Coverage.
                </p>
              </div>

              <div className="blog-sector-section">
                <h4>Education</h4>
                <p>
                  In Ghana’s education sector, digital technology is playing an increasingly pivotal role. The government and partners are integrating digital tools into classrooms to enhance teaching and learning. For instance, there are programs equipping schools with computers and internet connectivity, and training teachers in online pedagogies. This shift gained momentum after the COVID-19 pandemic and continues in 2026 with blended learning models.
                </p>
                <p>
                  However, challenges persist – particularly the urban-rural divide in connectivity and resources. While cities enjoy fairly high internet coverage, many rural schools still struggle (reflecting the broader trend that only about 38–40% of West Africa’s population actually uses the internet despite much higher network coverage). To address this, initiatives like distance learning via radio, offline educational content, and public-private partnerships for school connectivity are underway. Ghana is also emphasizing digital literacy and coding in the curriculum, recognizing that tomorrow’s jobs will require tech proficiency. By prioritizing education technology (EdTech) and closing the digital gap, Ghana seeks to empower its students with 21st-century skills. These efforts will help produce graduates who can actively participate in the digital economy, driving innovation and growth in the long run.
                </p>
              </div>

              <div className="blog-sector-section">
                <h4>Fintech</h4>
                <p>
                  Fintech is a bright spot in Ghana’s development, mirroring the wider African boom in digital finance. Ghanaians have rapidly adopted mobile money and other digital financial services – using them for everything from everyday payments to business transactions. This has greatly advanced financial inclusion. For example, farmers and traders in remote areas can safely transact and save money via mobile wallets instead of cash. Ghana’s fintech ecosystem is also innovating in areas like peer-to-peer lending, e-commerce payments, and remittances.
                </p>
                <p>
                  Crucially, the Bank of Ghana has been proactive: Ghana was among the first African countries to pilot a central bank digital currency (CBDC), known as the eCedi, to modernize the payment system. (As context, globally 86% of central banks are now exploring or testing CBDCs, and Ghana is at the forefront of this trend in Africa.) The eCedi pilot, alongside robust mobile money infrastructure, positions Ghana to have a very efficient digital payment landscape. Fintech growth is also attracting investment and startups to Ghana, contributing to job creation in tech and finance. To ensure stability, regulators are updating frameworks for things like consumer protection and cybersecurity in financial services. Overall, fintech is enabling Ghana to build a more inclusive and dynamic economy – one where a wide range of citizens and businesses can easily access credit, savings, and payment services, thus spurring entrepreneurship and reducing inequality.
                </p>
              </div>

              <div className="blog-sector-section">
                <h4>Agriculture</h4>
                <p>
                  Agriculture is critical for Ghana’s socio-economic resilience, employing a large portion of the population and contributing to food security and exports. Technology is increasingly seen as key to transforming this sector. Ghanaian farmers are beginning to embrace agritech solutions – for instance, using mobile apps to get market price information or weather forecasts via SMS, which helps them make better decisions on when and what to plant or sell.
                </p>
                <p>
                  There are also efforts to introduce precision agriculture tools: some farms now use drones for crop monitoring or spraying, and sensor systems that monitor soil moisture to optimize irrigation. These innovations can significantly boost productivity and resource efficiency. Climate change makes tech adoption in agriculture even more urgent; irregular rainfall and new pest outbreaks threaten yields, so tools like climate-resilient seed varieties, satellite-based early warning systems, and AI-driven advisory services are invaluable.
                </p>
                <p>
                  Given that agriculture still employs over 50% of Africa’s workforce on average (and a substantial share of Ghana’s), improving this sector has a broad development impact – higher incomes for farming communities, more stable food supplies, and opportunities for agro-processing industries. The Ghanaian government, recognizing this, has policies to support mechanization, digital extension services (e.g., advising farmers via mobile), and better rural connectivity. By harnessing technology in agriculture, Ghana aims to move from subsistence farming towards a more modern, sustainable agribusiness model that can withstand climate challenges and contribute to economic growth.
                </p>
              </div>

              <h2 className="blog-section-title">Conclusion</h2>
              <p>
                Taken together, the impacts of technology across employment, health, education, fintech, and agriculture point to a clear conclusion: technology is no longer a standalone sector in Ghana, but a foundational enabler of national resilience, productivity, and inclusion. Its transformative potential will only be fully realized if digital adoption is matched with strategic coordination, particularly in skills development, infrastructure expansion, regulatory readiness, and public-private collaboration.
              </p>
              <p>
                Ghana’s experience shows that when technology is purposefully aligned with development priorities, it can reduce inequalities, expand access to essential services, and unlock new economic opportunities. However, without continuous investment in advanced digital skills, responsible AI governance, and equitable access, especially for rural and marginalized communities, technological progress risks deepening existing divides. The central policy implication, therefore, is that Ghana must treat technology not merely as an innovation agenda but as a core pillar of socio-economic planning, embedding digital readiness into all sectors to drive sustainable growth, competitiveness, and long-term national development.
              </p>

              {/* Reusable Authors Section */}
              <h2 className="blog-section-title">About the Authors</h2>
              <div className="blog-authors-container">
                <div className="blog-author-profile">
                  <h5>Samuel Sasu Adonteng</h5>
                  <p>Samuel Sasu Adonteng is the Chief Technical Officer at AASU and the Lead Programmes Officer for Education and Students’ Rights at AASU. He serves as the Union’s primary contact with UNESCO’s COVID-19 Global Education Coalition and the ECW Youth Sub-group. He specializes in quality assurance and innovation, with experience in facilitating multi-stakeholder dialogues. Samuel is dedicated to promoting social justice through initiatives focused on ending hunger, ensuring equal opportunities, and advancing human rights. He is a co-founder of the Ebibiman Tech Alliance, a tech startup focused on blending indigenous knowledge with technology.</p>
                </div>
                <div className="blog-author-profile">
                  <h5>Peter Kwasi Kodjie</h5>
                  <p>Peter Kwasi Kodjie is the Coordinator of the Media and Website Unit of the University of Professional Studies, Accra. He has been an influential voice in the Tuning Africa Project Advisory Group (TAPAG) Phase II and the Harmonization of African Higher Education Quality Assurance and Accreditation (HAQAA3) Initiative. Peter serves on the Governing Council of the Magna Charta Observatory (MCO). Additionally, he is a founding member of the Global Student Forum (GSF) and a founding Trustee of the 100 Million Campaign. As a Steering Committee Member for the Youth Mobility for Africa Flagship Initiative and the CAPSI-MasterCard Foundation Project, Peter advocates for enhanced learning opportunities, youth empowerment, and climate justice.</p>
                </div>
                <div className="blog-author-profile">
                  <h5>Margaret Edem Gasu</h5>
                  <p>Margaret Edem Gasu is a multidisciplinary professional working across technology, design, and public systems, with a strong focus on impact and people. She is a UI/UX designer and web developer operating at the intersection of design and technology. As the co-founder of Ebibiman, she is committed to building African-led innovation that blends culture, community, and impact. Grounded in faith and driven by purpose, she balances strategic thinking with creativity, always drawn to work that empowers people and builds systems that genuinely serve them.</p>
                </div>
                <div className="blog-author-profile">
                  <h5>Rexford Akrong</h5>
                  <p>Rexford Akrong is an international development practitioner and a research manager at Education Sub-Saharan Africa, whose focus is on using evidence to support policy making on issues including youth and women employment and poverty reduction. His research interests are in youth employment, environment and natural resource management, and agricultural global value chains.</p>
                </div>
              </div>
            </>
          ) : (
            /* AI IS COMING FOR YOU ARTICLE CONTENT */
            <>
              <p className="blog-intro-lead">
                The headline may sound ominous, but the reality of artificial intelligence (AI) is far more nuanced. AI is not just a harbinger of job displacement or a threat to human ingenuity; it is also a powerful tool that, when used correctly, can revolutionize industries, enhance productivity, and improve quality of life.
              </p>
              <p>
                However, its rapid advancement raises critical questions about its impact on employment, human cognition, and societal structures. This article delves into the double-edged sword of AI, exploring its transformative potential and the challenges it poses.
              </p>

              <h2 className="blog-section-title">The Evolution of AI: From Checkers to Generative Models</h2>
              <p>
                AI has come a long way since its inception in the 1950s. The first documented success of an AI program was Christopher Strachey’s checkers game in 1951. Fast forward to 1997, when IBM’s Deep Blue defeated chess grandmaster Garry Kasparov, and 2011, when IBM Watson won Jeopardy!. These milestones marked the beginning of AI’s journey into mainstream consciousness.
              </p>
              <p>
                The advent of generative AI, spearheaded by OpenAI’s GPT models in 2018, has been a game-changer. Tools like ChatGPT, Google’s Gemini, and Anthropic’s Claude have democratized access to AI, enabling users to generate text, audio, images, and more with simple prompts.
              </p>
              <p>
                By 2025, models like DeepSeek’s R1 and V3, have achieved near-parity with competitors at a fraction of the cost, further accelerating AI adoption.
              </p>
              <p>
                AI’s applications are vast, from sequencing RNA for vaccines to modeling human speech. Its ability to perceive, reason, and generalize has made it indispensable across industries. But as AI continues to evolve, its implications for society grow more complex.
              </p>

              <h2 className="blog-section-title">The Bright Side: How AI Benefits Humanity</h2>
              
              <div className="blog-criticism-card">
                <h3><span>1</span> Enhanced Business Automation</h3>
                <p>
                  AI is transforming how businesses operate. According to a 2023 IBM survey, 42% of enterprise-scale businesses have integrated AI into their operations, with another 40% considering it. Chatbots and digital assistants handle customer queries, while AI-driven data analysis provides instant insights, enabling faster and more informed decision-making.
                </p>
                <p>
                  Mike Mendelson of NVIDIA highlights that AI’s potential lies in its ability to solve domain-specific problems, often in ways humans might not anticipate. This capability is driving innovation and efficiency across sectors, from healthcare to finance.
                </p>
              </div>

              <div className="blog-criticism-card">
                <h3><span>2</span> Accelerated Innovation</h3>
                <p>
                  AI is not just automating tasks; it’s also accelerating innovation. Anthropic CEO Dario Amodei predicts that AI could speed up research in fields like biology by tenfold, compressing decades of progress into just a few years. This “compressed 21st century” could lead to breakthroughs in areas like gene editing and climate change mitigation.
                </p>
              </div>

              <div className="blog-criticism-card">
                <h3><span>3</span> Personalized Experiences</h3>
                <p>
                  In education, AI tailors learning experiences to individual students, while in healthcare, it aids in diagnosing diseases and streamlining drug discovery. AI’s ability to analyze vast amounts of data ensures that services are more personalized and effective than ever before.
                </p>
              </div>

              <h2 className="blog-section-title">The Dark Side: Challenges and Risks of AI</h2>

              <div className="blog-criticism-card">
                <h3><span>1</span> Job Disruption</h3>
                <p>
                  One of the most pressing concerns is AI’s impact on employment. A 2023 Resume Builder survey found that 37% of companies using AI have already replaced workers, with 44% anticipating layoffs in 2024. Jobs in customer service, manufacturing, and even creative fields like content writing and graphic design are at risk.
                </p>
                <p>
                  However, AI is also creating new roles, such as machine learning engineers and AI ethics specialists. The challenge lies in ensuring that workers are reskilled to fill these emerging positions. As Klara Nahrstedt, a computer science professor at the University of Illinois, notes, “We need to invest tremendously in education to retrain people for new jobs.”
                </p>
              </div>

              <div className="blog-criticism-card">
                <h3><span>2</span> Data Privacy and Ethical Concerns</h3>
                <p>
                  AI’s reliance on vast amounts of data raises significant privacy concerns. The FTC has investigated Open AI for potential violations of European data protection laws, highlighting the need for stricter regulations. The Biden-Harris administration’s AI Bill of Rights is a step in the right direction, but more robust frameworks are needed to protect consumer data.
                </p>
              </div>

              <div className="blog-criticism-card">
                <h3><span>3</span> Bias and Misinformation</h3>
                <p>
                  AI systems often reflect the biases of their creators. Facial recognition technology, for example, has been shown to favor lighter-skinned individuals, perpetuating racial inequalities. Additionally, the rise of deep fakes and AI-generated misinformation threatens to erode trust in media and institutions.
                </p>
              </div>

              <div className="blog-criticism-card">
                <h3><span>4</span> Environmental Impact</h3>
                <p>
                  The energy required to train and maintain AI models is staggering. Some estimates suggest that AI could increase carbon emissions by up to 80%, undermining efforts to combat climate change. While AI can optimize supply chains and reduce waste, its environmental costs must be carefully managed.
                </p>
              </div>

              <h2 className="blog-section-title">The Future of AI: Opportunities and Threats</h2>
              <p>
                AI’s potential to transform society is immense, but its risks cannot be ignored. The key lies in responsible development and deployment. As AI becomes more integrated into our lives, we must address issues like job displacement, data privacy, and environmental sustainability.
              </p>
              <p>
                The rise of AI also presents an opportunity to redefine work. By automating repetitive tasks, AI can free humans to focus on creative and strategic endeavours. However, this requires a concerted effort to reskill workers and ensure that the benefits of AI are distributed equitably.
              </p>
              <p>
                AI is not inherently good or evil; it is a tool whose impact depends on how we use it. While it has the potential to displace jobs and exacerbate inequalities, it also offers unprecedented opportunities for innovation and growth. The challenge is to navigate this dual reality with foresight and responsibility.
              </p>
              <p>
                As we stand on the brink of an AI-driven future, the question is not whether AI is coming for us, but how we will choose to meet it. By embracing AI’s potential while addressing its challenges, we can ensure that it serves as a force for good, enhancing human capabilities rather than replacing them.
              </p>

              {/* Reusable About ETA Section */}
              <div className="blog-about-eta">
                <h3>About Ebibiman Tech Alliance</h3>
                <p>
                  The Ebibiman Tech Alliance (ETA) is a pioneering initiative dedicated to promoting indigenous knowledge in technology across Africa. ETA is committed to fostering the ethical and humane use of technology to benefit society, while simultaneously enhancing digital skills, entrepreneurship, and employment opportunities in the tech sector.
                </p>
                <p style={{ marginTop: '12px', fontStyle: 'italic', fontWeight: 600 }}>
                  AI is here to stay. The question is: Are we ready?
                </p>
              </div>
            </>
          )}
        </div>

        {/* Footer Actions */}
        <div className="blog-article-footer">
          <button onClick={onBack} className="blog-footer-back-btn">
            <ArrowLeft className="back-icon" />
            <span>Return to Homepage</span>
          </button>
        </div>

      </div>
    </article>
  )
}

export default BlogPage
