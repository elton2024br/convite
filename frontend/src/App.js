import { useRef, useEffect, useState } from "react";
import { motion, useInView, useScroll, useTransform } from "framer-motion";
import "@/App.css";

const LOGO_URL = "https://customer-assets.emergentagent.com/job_32aff93b-21a6-449c-8699-e871ad5b9dbf/artifacts/6yez64l7_97af9554-cb1c-4de8-8194-773b304d456b.jpg";
const VIDEO_URL = "https://customer-assets.emergentagent.com/job_32aff93b-21a6-449c-8699-e871ad5b9dbf/artifacts/4r7k8fvm_Locked_aerial_timelapse_202602101923_34rrq.mp4";
const VIDEO_URL_2 = "https://customer-assets.emergentagent.com/job_32aff93b-21a6-449c-8699-e871ad5b9dbf/artifacts/lst3bw5v_Prompt_cinematic_drone_1080p_202602101950.mp4";
const HERO_FALLBACK = "https://images.unsplash.com/photo-1758781102552-b6ed66cbafe3?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NDQ2NDF8MHwxfHNlYXJjaHwxfHxtaXN0eSUyMG1vdW50YWluJTIwcGluZSUyMGZvcmVzdCUyMGNpbmVtYXRpYyUyMGZvZ3xlbnwwfHx8fDE3NzE5NjU3NjV8MA&ixlib=rb-4.1.0&q=85";

const WHATSAPP_NUMBER = "5535991232422";
const WHATSAPP_MESSAGE = encodeURIComponent("Olá! Gostaria de confirmar minha presença no pré-lançamento do Complexo Imobiliário e Turístico Monte Verde no dia 21/03.");
const WHATSAPP_URL = `https://wa.me/${WHATSAPP_NUMBER}?text=${WHATSAPP_MESSAGE}`;
const MAPS_URL = "https://www.google.com/maps/place/22%C2%B052'06.1%22S+46%C2%B007'48.2%22W/@-22.8683567,-46.1326256,17z/data=!3m1!4b1!4m4!3m3!8m2!3d-22.8683567!4d-46.1300507?hl=pt-BR&entry=ttu&g_ep=EgoyMDI2MDIyMi4wIKXMDSoASAFQAw%3D%3D";

const ATTRACTION_VIDEO = "/videos/atracao.mp4";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.9, delay: i * 0.18, ease: [0.25, 0.46, 0.45, 0.94] }
  })
};

const WhatsAppIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
  </svg>
);

const MapPinIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
    <circle cx="12" cy="10" r="3" />
  </svg>
);

const CalendarIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
    <line x1="16" y1="2" x2="16" y2="6" />
    <line x1="8" y1="2" x2="8" y2="6" />
    <line x1="3" y1="10" x2="21" y2="10" />
  </svg>
);

const ClockIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10" />
    <polyline points="12 6 12 12 16 14" />
  </svg>
);

const StarIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
  </svg>
);

const AnimatedSection = ({ children, className, id, ...props }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.15 });

  return (
    <div ref={ref} className={className} id={id} {...props}>
      {typeof children === "function" ? children(isInView) : children}
    </div>
  );
};

const SectionDivider = ({ variant }) => (
  <div className={`section-divider ${variant === "brown" ? "section-divider-brown" : ""}`}>
    <div className="section-divider-ornament" />
  </div>
);

const HeroSection = () => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"]
  });
  const videoY = useTransform(scrollYProgress, [0, 1], ["0%", "20%"]);

  const scrollToDetails = () => {
    document.getElementById("details")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="hero-section" ref={ref} data-testid="hero-section">
      <motion.video
        className="hero-video-bg"
        autoPlay
        muted
        loop
        playsInline
        poster={HERO_FALLBACK}
        style={{ y: videoY }}
        data-testid="hero-video"
      >
        <source src={VIDEO_URL} type="video/mp4" />
      </motion.video>
      <div className="hero-overlay" />

      <motion.div
        className="hero-content"
        initial="hidden"
        animate="visible"
      >
        <motion.div className="hero-logo-wrapper" variants={fadeUp} custom={0}>
          <img
            src={LOGO_URL}
            alt="Monte Verde - Complexo Imobiliário e Turístico"
            className="hero-logo"
            data-testid="hero-logo"
          />
        </motion.div>

        <motion.div className="hero-divider" variants={fadeUp} custom={1} />

        <motion.p className="hero-subtitle" variants={fadeUp} custom={2}>
          Convite Exclusivo
        </motion.p>

        <motion.h1 className="hero-title" variants={fadeUp} custom={3} data-testid="hero-title">
          Você está convidado para um <em>marco</em> em Monte Verde
        </motion.h1>
      </motion.div>

      <motion.div
        className="scroll-indicator"
        onClick={scrollToDetails}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.8, duration: 1 }}
        data-testid="scroll-indicator"
      >
        <span>Descubra</span>
        <div className="scroll-line" />
      </motion.div>
    </section>
  );
};

const DetailsSection = () => {
  return (
    <AnimatedSection className="details-section" id="details" data-testid="details-section">
      {(isInView) => (
        <>
          <div className="details-bg-texture" />
          <div className="details-content">
            <motion.span
              className="details-label"
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7 }}
              data-testid="details-label"
            >
              Pré-Lançamento
            </motion.span>

            <motion.div
              className="event-date-block"
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.9, delay: 0.15 }}
            >
              <div className="event-day" data-testid="event-date">21</div>
              <div className="event-month">Março</div>
            </motion.div>

            <motion.div
              className="details-divider"
              initial={{ opacity: 0, scaleX: 0 }}
              animate={isInView ? { opacity: 0.5, scaleX: 1 } : {}}
              transition={{ duration: 0.6, delay: 0.3 }}
            />

            <motion.div
              className="event-info-row"
              initial={{ opacity: 0, x: -20 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.4 }}
            >
              <div className="event-info-icon">
                <ClockIcon />
              </div>
              <div className="event-info-text">
                <div className="event-time" data-testid="event-time">A partir das 15h</div>
                <div className="event-time-label">Horário</div>
              </div>
            </motion.div>

            <motion.div
              className="event-info-row"
              initial={{ opacity: 0, x: -20 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.55 }}
            >
              <div className="event-info-icon">
                <MapPinIcon />
              </div>
              <div className="event-info-text">
                <div className="event-location" data-testid="event-location">Fazenda da Mata</div>
                <div className="event-address">Monte Verde - Camanducaia/MG</div>
              </div>
            </motion.div>

            <motion.div
              className="exclusivity-message"
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.9, delay: 0.7 }}
              data-testid="exclusivity-message"
            >
              <p className="exclusivity-text">
                Preços especiais para pessoas exclusivas iguais a você
              </p>
            </motion.div>
          </div>
        </>
      )}
    </AnimatedSection>
  );
};

const AttractionSection = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const videoRef = useRef(null);

  const handlePlayClick = () => {
    if (videoRef.current) {
      videoRef.current.play();
      setIsPlaying(true);
    }
  };

  return (
    <AnimatedSection className="attraction-section" data-testid="attraction-section">
      {(isInView) => (
        <>
          <div className="attraction-content">
            <motion.span
              className="details-label"
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7 }}
            >
              Atração Especial
            </motion.span>

            <motion.h2
              className="attraction-title"
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.15 }}
            >
              Presença Confirmada
            </motion.h2>

            <motion.div
              className="attraction-video-wrapper"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.9, delay: 0.3 }}
            >
              {!isPlaying && (
                <div className="custom-play-overlay" onClick={handlePlayClick}>
                  <div className="custom-play-button">
                    <svg viewBox="0 0 24 24" fill="currentColor" width="48" height="48">
                      <path d="M8 5v14l11-7z" />
                    </svg>
                  </div>
                </div>
              )}
              <video
                ref={videoRef}
                src={ATTRACTION_VIDEO}
                controls={isPlaying}
                playsInline
                className="attraction-video"
                onPlay={() => setIsPlaying(true)}
                onPause={() => setIsPlaying(false)}
              />
            </motion.div>
          </div>
        </>
      )}
    </AnimatedSection>
  );
};

const CTASection = () => {
  return (
    <AnimatedSection className="cta-section" data-testid="cta-section">
      {(isInView) => (
        <>
          <video
            className="cta-bg-image"
            autoPlay
            muted
            loop
            playsInline
            data-testid="cta-video"
          >
            <source src={VIDEO_URL_2} type="video/mp4" />
          </video>
          <div className="cta-overlay" />

          <div className="cta-content">
            <motion.div
              className="cta-seal"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.7 }}
            >
              <StarIcon />
            </motion.div>

            <motion.h2
              className="cta-title"
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.15 }}
              data-testid="cta-title"
            >
              Garanta sua presença neste momento único
            </motion.h2>

            <motion.p
              className="cta-subtitle"
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.25 }}
            >
              Confirme pelo WhatsApp e receba todas as informações do evento
            </motion.p>

            <motion.div
              className="cta-buttons"
              initial={{ opacity: 0, y: 25 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.35 }}
            >
              <a
                href={WHATSAPP_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary"
                data-testid="confirm-presence-btn"
              >
                <WhatsAppIcon />
                Confirmar Presença
              </a>

              <a
                href={MAPS_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-secondary"
                data-testid="directions-btn"
              >
                <MapPinIcon />
                Como Chegar
              </a>
            </motion.div>

            <motion.div
              className="cta-footer"
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : {}}
              transition={{ duration: 0.8, delay: 0.6 }}
            >
              <div className="footer-divider" />
              <img
                src={LOGO_URL}
                alt="Monte Verde"
                className="cta-footer-logo"
                data-testid="footer-logo"
              />
              <p className="cta-footer-text">
                Complexo Imobiliário e Turístico Monte Verde
              </p>
            </motion.div>
          </div>
        </>
      )}
    </AnimatedSection>
  );
};

function App() {
  return (
    <>
      <div className="noise-overlay" />
      <HeroSection />
      <SectionDivider />
      <DetailsSection />
      <SectionDivider />
      <AttractionSection />
      <SectionDivider variant="brown" />
      <CTASection />
    </>
  );
}

export default App;
