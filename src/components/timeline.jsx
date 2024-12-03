import React, { Component } from 'react'

export default class Timeline extends Component {
  render() {
    return (
      <div>
        <section className="colorlib-experience" data-section="timeline">
          <div className="colorlib-narrow-content">
            <div className="row">
              <div className="col-md-6 col-md-offset-3 col-md-pull-3 animate-box" data-animate-effect="fadeInLeft">
                <span className="heading-meta">Highlights</span>
                <h2 className="colorlib-heading animate-box">Expierence</h2>
              </div>
            </div>
            <div className="row">
              <div className="col-md-12">
                <div className="timeline-centered">
                   <article className="timeline-entry animate-box" data-animate-effect="fadeInLeft">
                    <div className="timeline-entry-inner">
                      <div className="timeline-icon color-2">
                        <i className="icon-pen2" />
                      </div>
                      <div className="timeline-label">
                        <h2>Undergrad Researcher </h2><h2>UMBC <span>(Sep 2023-present)</span></h2>
                        <p>Developed a Smart Campus application using Lidar sensors and ML to predict and display real-time occupancy 
                          at campus food locations, developed a UI for app use. Optimized data communication with MQTT and 
                          RESTful APIs, managed RDBMS and TSDBMS databases, improved server processing by 25% 
                          through edge, and am currently working on a research paper as a main contributor.</p>
                    </div>
                  </article>
                  <article className="timeline-entry animate-box" data-animate-effect="fadeInLeft">
                    <div className="timeline-entry-inner">
                      <div className="timeline-icon color-3">
                        <i className="icon-pen2" />
                      </div>
                      <div className="timeline-label">
                        <h2>Fullstack Software Engineer intern </h2><h2>OmniSyncAI <span>(May 2024 - July 2024)</span></h2>
                        <p>Engineered user-friendly CRM account setup using Node.js, React, and PostgreSQL, reducing onboarding time and increasing team invitations through AI-powered recommendations.</p>
                      </div>
                    </div>
                  </article>
                  <article className="timeline-entry animate-box" data-animate-effect="fadeInTop">
                    <div className="timeline-entry-inner">
                      <div className="timeline-icon color-4">
                        <i className="icon-pen2" />
                      </div>
                      <div className="timeline-label">
                        <h2>Artifical intellgence Engineer intern </h2><h2>Radical AI <span>(Mar 2024 - May 2024)</span></h2>
                        <p>As an Artificial Intelligence Engineer at Radical AI, I am leveraging technologies such as OpenAI and Google Gemini to develop ReX, an AI coach who serves as a steadfast career companion for learners, offering personalized coaching, mentorship, and support throughout the various phases of their career lifecycle. </p>
                      </div>
                    </div>
                  </article>
                  <article className="timeline-entry begin animate-box" data-animate-effect="fadeInBottom">
                    <div className="timeline-entry-inner">
                      <div className="timeline-icon color-none">
                      </div>
                    </div>
                  </article>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    )
  }
}
