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
                <h2 className="colorlib-heading animate-box">Expierence/Projects</h2>
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
                        <h2>Artificial Intelligence Engineer intern at Radical AI <span>Apr 2024-present</span></h2>
                        <p>As an Artificial Intelligence Engineer at Radical AI, I am leveraging technologies such as OpenAI and Google Gemini to develop ReX, an AI coach who serves as a steadfast career companion for learners, offering personalized coaching, mentorship, and support throughout the various phases of their career lifecycle. </p>
                      </div>
                    </div>
                  </article>
                  <article className="timeline-entry animate-box" data-animate-effect="fadeInLeft">
                    <div className="timeline-entry-inner">
                      <div className="timeline-icon color-3">
                        <i className="icon-pen2" />
                      </div>
                      <div className="timeline-label">
                        <h2>Undergrad Researcher at UMBC <span>Sep 2023-present</span></h2>
                        <p>I collaborated with the DAMS research lab on IoT projects specifically the SMART CAMPUS project, developing algorithms for data analysis and designing a cloud-based server infrastructure for enhanced data processing. I also integrated various technologies to improve real-time data communication and predictive analytics for environmental monitoring and occupancy detection..</p>
                      </div>
                    </div>
                  </article>
                  <article className="timeline-entry animate-box" data-animate-effect="fadeInTop">
                    <div className="timeline-entry-inner">
                      <div className="timeline-icon color-4">
                        <i className="icon-pen2" />
                      </div>
                      <div className="timeline-label">
                        <h2>YouTube Comments Sentiment Analysis <span>Python, NLP, Machine Learning</span></h2>
                        <p>Using YouTube Data API for sentiment analysis with TensorFlow and scikit-learn, providing content optimization insights.</p>
                      </div>
                    </div>
                  </article>
                  <article className="timeline-entry animate-box" data-animate-effect="fadeInLeft">
                    <div className="timeline-entry-inner">
                      <div className="timeline-icon color-5">
                        <i className="icon-pen2" />
                      </div>
                      <div className="timeline-label">
                        <h2>Advanced Connect4 AI <span>Reinforcement Learning, PyTorch</span></h2>
                        <p>Developing an AI for Connect4 using employing advanced Reinforcement Learning techniques including Distributional Dueling Networks, Noisy Nets, and Prioritized Experience Replay. Also has real-time interface via Flask API.</p>
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
