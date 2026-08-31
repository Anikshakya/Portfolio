import React from 'react';

export default function SectorHome({ triggerWarp = () => { } }) {
  const profilePicUrl = '/icons/portfolio.png';

  return (
    <section className="portfolio-home">
      <div className="home-inner">

        {/* ============================================================
           TOP BAR
        ============================================================ */}

        <header className="home-topbar apple-reveal delay-1">

          <div className="availability">
            <span className="availability-dot" />
            <span>AVAILABLE FOR WORK</span>
          </div>

          <div className="top-center">
            FLUTTER · WEB · FULL-STACK
          </div>

          <div className="top-right">
            BASED IN NEPAL
          </div>

        </header>


        {/* ============================================================
           MAIN
        ============================================================ */}

        <main className="home-main">

          {/* ========================================================
             LEFT — ABOUT / INFO
          ======================================================== */}

          <div className="profile-column apple-reveal delay-3">

            <div className="profile-card">

              {/* INFO */}

              <div className="profile-info">

                <div className="info-heading">
                  <span>ABOUT</span>
                  <span>01 / 04</span>
                </div>


                <div className="info-content">

                  <p className="info-intro">
                    Flutter & Web Developer focused on building
                    high-performance, scalable and beautifully
                    engineered digital products for mobile and web.
                  </p>


                  <p className="info-description">
                    I specialize in cross-platform application
                    development with Flutter and Dart, native
                    platform integration, APIs, Firebase and
                    modern backend systems.
                  </p>

                </div>


                <div className="tech-list">

                  <span>Flutter</span>
                  <span>Dart</span>
                  <span>React</span>
                  <span>Firebase</span>
                  <span>REST APIs</span>

                </div>

              </div>


              {/* IMAGE */}

              <div className="profile-visual">

                <img
                  src={profilePicUrl}
                  alt="Anik Shakya"
                  className="profile-image"
                  onError={(event) => {
                    event.currentTarget.style.display = 'none';
                  }}
                />

                <div className="profile-gradient" />


                <div className="profile-top">

                  <span>01</span>

                  <span>
                    PORTFOLIO
                  </span>

                </div>


                <div className="profile-bottom">

                  <div>
                    <strong>ANIK SHAKYA</strong>

                    <span>
                      SOFTWARE ENGINEER
                    </span>
                  </div>

                  <span className="profile-arrow">
                    ↗
                  </span>

                </div>

              </div>

            </div>

          </div>


          {/* ========================================================
             RIGHT — HERO
          ======================================================== */}

          <div className="hero-column">

            <div className="hero-eyebrow apple-reveal delay-1">
              SOFTWARE ENGINEER
            </div>


            <h1 className="hero-title apple-reveal delay-2">

              <span>I build</span>

              <span className="hero-muted">
                digital products
              </span>

              <span className="hero-gradient">
                people enjoy.
              </span>

            </h1>


            <p className="hero-description apple-reveal delay-3">
              Turning ideas into fast, reliable and polished
              digital experiences across mobile and web.
            </p>


            {/* ACTIONS */}

            <div className="hero-actions apple-reveal delay-4">

              <button
                className="primary-button"
                onClick={() => triggerWarp(1)}
              >
                <span>
                  Explore my work
                </span>

                <span className="button-arrow">
                  ↗
                </span>
              </button>


              <button
                className="secondary-button"
                onClick={() => triggerWarp(3)}
              >
                Get in touch
              </button>

            </div>


            {/* SOCIAL */}

            <div className="social-area apple-reveal delay-5">

              <span className="social-label">
                FIND ME ONLINE
              </span>


              <div className="social-links">

                <a
                  href="https://github.com/AnikShakya"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="social-link"
                >
                  <span>
                    GitHub
                  </span>

                  <span>
                    ↗
                  </span>
                </a>


                <a
                  href="https://www.linkedin.com/in/anik-shakya-67141b192/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="social-link"
                >
                  <span>
                    LinkedIn
                  </span>

                  <span>
                    ↗
                  </span>
                </a>

              </div>

            </div>

          </div>

        </main>


        {/* ============================================================
           FOOTER
        ============================================================ */}

        <footer className="home-footer apple-reveal delay-6">

          <div className="footer-left">

            <span className="footer-index">
              01
            </span>

            <span className="footer-text">
              BUILDING DIGITAL EXPERIENCES
            </span>

          </div>


          <div className="footer-center">

            <span className="footer-dot" />

            <span>
              4+ YEARS EXPERIENCE
            </span>

          </div>


          <button
            className="footer-contact"
            onClick={() => triggerWarp(3)}
          >
            START A CONVERSATION

            <span>
              ↗
            </span>
          </button>

        </footer>

      </div>


      {/* ==============================================================
         STYLES
      ============================================================== */}

      <style>{`

        /* ============================================================
           BASE
        ============================================================ */

        .portfolio-home {
          position: relative;

          width: 100%;
          height: 100%;

          min-height: 0;

          overflow: hidden;

          z-index: 5;

          box-sizing: border-box;
        }


        .home-inner {
          width:
            min(
              1180px,
              calc(100% - 72px)
            );

          height: 100%;

          margin: 0 auto;

          display: flex;

          flex-direction: column;

          padding:
            clamp(20px, 3vh, 34px)
            0
            clamp(16px, 2.5vh, 28px);

          box-sizing: border-box;
        }


        /* ============================================================
           TOP BAR
        ============================================================ */

        .home-topbar {
          display: grid;

          grid-template-columns:
            1fr
            1fr
            1fr;

          align-items: center;

          flex-shrink: 0;

          color:
            var(--text-muted);

          font-size: 8px;

          font-weight: 600;

          letter-spacing: .14em;
        }


        .availability {
          display: flex;

          align-items: center;

          gap: 8px;
        }


        .availability-dot {
          width: 5px;
          height: 5px;

          flex-shrink: 0;

          border-radius: 50%;

          background:
            #7dd3a8;

          box-shadow:
            0 0 0 4px
            rgba(125,211,168,.07),

            0 0 12px
            rgba(125,211,168,.35);
        }


        .top-center {
          text-align: center;

          opacity: .5;
        }


        .top-right {
          text-align: right;

          opacity: .5;
        }


        /* ============================================================
           MAIN
        ============================================================ */

        .home-main {
          flex: 1;

          min-height: 0;

          display: grid;

          grid-template-columns:
            1fr
            1fr;

          align-items: center;

          gap:
            clamp(
              55px,
              7vw,
              105px
            );

          padding:
            clamp(
              20px,
              3vh,
              42px
            )
            0;
        }


        /* ============================================================
           HERO
        ============================================================ */

        .hero-column {
          min-width: 0;

          display: flex;

          flex-direction: column;

          justify-content: center;
        }


        .hero-eyebrow {
          margin-bottom:
            clamp(
              15px,
              2vh,
              23px
            );

          color:
            var(--text-muted);

          font-size: 8px;

          font-weight: 600;

          letter-spacing: .18em;
        }


        .hero-title {
          margin: 0;

          display: flex;

          flex-direction: column;

          font-family:
            -apple-system,
            BlinkMacSystemFont,
            "SF Pro Display",
            "Segoe UI",
            sans-serif;

          font-size:
            clamp(
              4rem,
              6.1vw,
              6.6rem
            );

          font-weight: 700;

          line-height: .9;

          letter-spacing: -.075em;
        }


        .hero-title span {
          display: block;
        }


        .hero-muted {
          opacity: .9;
        }


        .hero-gradient {
          background:
            linear-gradient(
              105deg,
              #60a5fa 0%,
              #a78bfa 52%,
              #f472b6 100%
            );

          background-clip: text;

          -webkit-background-clip: text;

          -webkit-text-fill-color: transparent;
        }


        .hero-description {
          max-width: 480px;

          margin:
            clamp(
              21px,
              2.8vh,
              29px
            )
            0
            0;

          color:
            var(--text-secondary);

          font-size: 13px;

          line-height: 1.68;

          letter-spacing: -.008em;
        }


        /* ============================================================
           ACTIONS
        ============================================================ */

        .hero-actions {
          display: flex;

          align-items: center;

          gap: 9px;

          margin-top:
            clamp(
              20px,
              2.8vh,
              29px
            );
        }


        .primary-button,
        .secondary-button {
          height: 43px;

          padding:
            0 18px;

          border-radius:
            999px;

          font-family: inherit;

          font-size: 11px;

          cursor: pointer;

          transition:
            transform .35s
            cubic-bezier(.22,1,.36,1),

            background .25s ease,

            border-color .25s ease,

            box-shadow .25s ease;
        }


        .primary-button {
          display: inline-flex;

          align-items: center;

          justify-content: center;

          gap: 9px;

          border: none;

          background:
            var(--text-primary);

          color:
            var(--bg-base);

          font-weight: 600;

          box-shadow:
            0 9px 30px
            rgba(0,0,0,.18);
        }


        .button-arrow {
          font-size: 14px;

          transition:
            transform .35s
            cubic-bezier(.22,1,.36,1);
        }


        .primary-button:hover {
          transform:
            translateY(-2px);

          box-shadow:
            0 14px 40px
            rgba(0,0,0,.24);
        }


        .primary-button:hover
        .button-arrow {
          transform:
            translate(
              2px,
              -2px
            );
        }


        .secondary-button {
          border:
            1px solid
            rgba(255,255,255,.1);

          background:
            rgba(255,255,255,.035);

          color:
            var(--text-primary);

          backdrop-filter:
            blur(15px);

          -webkit-backdrop-filter:
            blur(15px);
        }


        .secondary-button:hover {
          transform:
            translateY(-2px);

          background:
            rgba(255,255,255,.065);

          border-color:
            rgba(255,255,255,.17);
        }


        /* ============================================================
           SOCIAL
        ============================================================ */

        .social-area {
          display: flex;

          align-items: center;

          gap: 24px;

          margin-top:
            clamp(
              28px,
              4vh,
              44px
            );

          padding-top: 16px;

          border-top:
            1px solid
            rgba(255,255,255,.07);

          max-width: 480px;
        }


        .social-label {
          flex-shrink: 0;

          color:
            var(--text-muted);

          font-size: 7px;

          font-weight: 600;

          letter-spacing: .13em;
        }


        .social-links {
          display: flex;

          align-items: center;

          gap: 25px;
        }


        .social-link {
          display: flex;

          align-items: center;

          gap: 6px;

          color:
            var(--text-secondary);

          text-decoration: none;

          font-size: 10px;

          font-weight: 500;

          transition:
            color .25s ease,
            transform .25s ease;
        }


        .social-link span:last-child {
          font-size: 12px;

          opacity: .55;

          transition:
            transform .25s ease;
        }


        .social-link:hover {
          color:
            var(--text-primary);

          transform:
            translateY(-1px);
        }


        .social-link:hover
        span:last-child {
          transform:
            translate(
              2px,
              -2px
            );
        }


        /* ============================================================
           PROFILE
        ============================================================ */

        .profile-column {
          min-width: 0;

          display: flex;

          justify-content: center;

          order: 1;
        }


        .profile-card {
          display: grid;

          grid-template-columns:
            1.05fr
            .95fr;

          width: 100%;

          height:
            clamp(
              350px,
              56vh,
              465px
            );

          overflow: hidden;

          border:
            1px solid
            rgba(255,255,255,.08);

          border-radius: 22px;

          background:
            rgba(255,255,255,.025);

          box-shadow:
            0 30px 90px
            rgba(0,0,0,.2);
        }


        /* ============================================================
           PROFILE INFO
        ============================================================ */

        .profile-info {
          display: flex;

          flex-direction: column;

          min-width: 0;

          padding:
            clamp(
              23px,
              3vw,
              35px
            );
        }


        .info-heading {
          display: flex;

          justify-content: space-between;

          padding-bottom: 14px;

          border-bottom:
            1px solid
            rgba(255,255,255,.07);

          color:
            var(--text-muted);

          font-size: 7px;

          font-weight: 600;

          letter-spacing: .14em;
        }


        .info-heading span:last-child {
          opacity: .4;
        }


        .info-content {
          margin-top:
            clamp(
              28px,
              4vh,
              42px
            );
        }


        .info-intro {
          margin: 0;

          color:
            var(--text-primary);

          font-size:
            clamp(
              17px,
              2vw,
              23px
            );

          font-weight: 600;

          line-height: 1.18;

          letter-spacing: -.035em;
        }


        .info-description {
          max-width: 350px;

          margin:
            20px 0 0;

          color:
            var(--text-secondary);

          font-size: 10.5px;

          line-height: 1.72;
        }


        /* ============================================================
           TECHNOLOGIES
        ============================================================ */

        .tech-list {
          display: flex;

          flex-wrap: wrap;

          gap: 6px;

          margin-top: auto;

          padding-top: 18px;
        }


        .tech-list span {
          padding:
            6px 9px;

          border:
            1px solid
            rgba(255,255,255,.07);

          border-radius:
            999px;

          background:
            rgba(255,255,255,.025);

          color:
            var(--text-muted);

          font-size: 7px;

          transition:
            color .25s ease,
            background .25s ease,
            border-color .25s ease;
        }


        .tech-list span:hover {
          color:
            var(--text-primary);

          background:
            rgba(255,255,255,.06);

          border-color:
            rgba(255,255,255,.13);
        }


        /* ============================================================
           PROFILE IMAGE
        ============================================================ */

        .profile-visual {
          position: relative;

          overflow: hidden;

          min-width: 0;

          background:
            radial-gradient(
              circle at 50% 35%,
              rgba(96,165,250,.14),
              transparent 65%
            );
        }


        .profile-image {
          width: 100%;

          height: 100%;

          display: block;

          object-fit: cover;

          object-position: center;

          transform:
            scale(1.01);

          transition:
            transform
            1.1s
            cubic-bezier(.22,1,.36,1);
        }


        .profile-card:hover
        .profile-image {
          transform:
            scale(1.045);
        }


        .profile-gradient {
          position: absolute;

          inset: 0;

          pointer-events: none;

          background:
            linear-gradient(
              to top,
              rgba(0,0,0,.62),
              transparent 48%
            );
        }


        .profile-top {
          position: absolute;

          top: 18px;

          left: 18px;

          right: 18px;

          display: flex;

          justify-content: space-between;

          color:
            rgba(255,255,255,.55);

          font-size: 7px;

          font-weight: 600;

          letter-spacing: .13em;
        }


        .profile-bottom {
          position: absolute;

          left: 18px;

          right: 18px;

          bottom: 18px;

          display: flex;

          align-items: flex-end;

          justify-content: space-between;

          color:
            rgba(255,255,255,.8);
        }


        .profile-bottom > div {
          display: flex;

          flex-direction: column;

          gap: 4px;
        }


        .profile-bottom strong {
          font-size: 8px;

          font-weight: 600;

          letter-spacing: .12em;
        }


        .profile-bottom span {
          font-size: 7px;

          letter-spacing: .1em;

          opacity: .55;
        }


        .profile-arrow {
          font-size: 16px !important;

          opacity: .7 !important;
        }


        /* ============================================================
           FOOTER
        ============================================================ */

        .home-footer {
          display: grid;

          grid-template-columns:
            1fr
            1fr
            1fr;

          align-items: center;

          flex-shrink: 0;

          min-height: 31px;

          border-top:
            1px solid
            rgba(255,255,255,.07);

          padding-top: 14px;
        }


        .footer-left {
          display: flex;

          align-items: center;

          gap: 9px;
        }


        .footer-index {
          color:
            var(--text-primary);

          font-size: 8px;

          font-weight: 600;
        }


        .footer-text,
        .footer-center {
          color:
            var(--text-muted);

          font-size: 7px;

          font-weight: 600;

          letter-spacing: .1em;
        }


        .footer-center {
          display: flex;

          align-items: center;

          justify-content: center;

          gap: 7px;
        }


        .footer-dot {
          width: 4px;

          height: 4px;

          border-radius: 50%;

          background:
            var(--text-muted);

          opacity: .6;
        }


        .footer-contact {
          justify-self: end;

          display: flex;

          align-items: center;

          gap: 6px;

          border: none;

          background: none;

          padding: 0;

          color:
            var(--text-secondary);

          font-family: inherit;

          font-size: 7px;

          font-weight: 600;

          letter-spacing: .1em;

          cursor: pointer;

          transition:
            color .25s ease;
        }


        .footer-contact span {
          font-size: 11px;
        }


        .footer-contact:hover {
          color:
            var(--text-primary);
        }


        /* ============================================================
           REVEAL
        ============================================================ */

        .apple-reveal {
          opacity: 0;

          transform:
            translateY(20px)
            scale(.99);

          filter:
            blur(5px);

          animation:
            apple-reveal
            .85s
            cubic-bezier(.22,1,.36,1)
            forwards;
        }


        @keyframes apple-reveal {

          to {
            opacity: 1;

            transform:
              translateY(0)
              scale(1);

            filter:
              blur(0);
          }

        }


        .delay-1 {
          animation-delay: .04s;
        }


        .delay-2 {
          animation-delay: .10s;
        }


        .delay-3 {
          animation-delay: .17s;
        }


        .delay-4 {
          animation-delay: .24s;
        }


        .delay-5 {
          animation-delay: .32s;
        }


        .delay-6 {
          animation-delay: .42s;
        }


        /* ============================================================
           SHORT DESKTOP
        ============================================================ */

        @media (max-height: 720px) {

          .home-inner {
            padding-top: 16px;

            padding-bottom: 12px;
          }


          .home-main {
            padding:
              15px 0;
          }


          .profile-card {
            height:
              min(
                52vh,
                390px
              );
          }


          .hero-title {
            font-size:
              clamp(
                3.5rem,
                5.8vw,
                5.7rem
              );
          }


          .hero-description {
            margin-top: 17px;
          }


          .hero-actions {
            margin-top: 17px;
          }


          .social-area {
            margin-top: 23px;
          }


          .info-content {
            margin-top: 24px;
          }

        }


        /* ============================================================
           TABLET
        ============================================================ */

        @media (max-width: 900px) {

          .portfolio-home {
            overflow-y: auto;
          }


          .home-inner {
            width:
              min(
                calc(100% - 40px),
                720px
              );

            height: auto;

            min-height: 100%;
          }


          .top-center {
            display: none;
          }


          .home-topbar {
            grid-template-columns:
              1fr 1fr;
          }


          .home-main {
            grid-template-columns:
              1fr;

            gap: 45px;

            padding:
              50px 0;
          }


          .hero-column {
            text-align: center;

            align-items: center;

            order: 1;
          }


          .profile-column {
            order: 2;
          }


          .hero-description {
            margin-left: auto;

            margin-right: auto;
          }


          .social-area {
            width: 100%;

            justify-content: center;
          }


          .profile-card {
            height:
              390px;
          }

        }


        /* ============================================================
           MOBILE
        ============================================================ */

        @media (max-width: 600px) {

          .home-inner {
            width:
              calc(100% - 28px);

            padding:
              18px 0 25px;
          }


          .home-topbar {
            font-size: 6.5px;
          }


          .home-main {
            gap: 42px;

            padding:
              42px 0;
          }


          .hero-title {
            font-size:
              clamp(
                2.9rem,
                13.5vw,
                4rem
              );
          }


          .hero-description {
            max-width:
              335px;

            font-size:
              12px;
          }


          .hero-actions {
            flex-direction: column;

            width: 100%;
          }


          .primary-button,
          .secondary-button {
            width: 100%;
          }


          .social-area {
            flex-direction: column;

            align-items: flex-start;

            gap: 13px;

            text-align: left;
          }


          .social-links {
            gap: 25px;
          }


          .profile-card {
            grid-template-columns:
              .95fr
              1.05fr;

            height:
              310px;

            border-radius:
              18px;
          }


          .profile-info {
            padding:
              20px
              17px;
          }


          .info-content {
            margin-top:
              22px;
          }


          .info-intro {
            font-size:
              15px;
          }


          .info-description {
            font-size:
              8.5px;
          }


          .tech-list {
            gap: 4px;
          }


          .tech-list span {
            padding:
              5px 7px;

            font-size:
              6px;
          }


          .home-footer {
            grid-template-columns:
              1fr 1fr;

            row-gap:
              12px;
          }


          .footer-center {
            justify-content:
              flex-end;
          }


          .footer-contact {
            grid-column:
              1 / -1;

            justify-self:
              start;
          }

        }


        /* ============================================================
           REDUCED MOTION
        ============================================================ */

        @media (prefers-reduced-motion: reduce) {

          .apple-reveal {
            opacity: 1;

            transform: none;

            filter: none;

            animation: none;
          }


          .profile-image {
            transition: none;
          }

        }

      `}</style>
    </section>
  );
}