import React, { Component } from 'react'

export default class About extends Component {
  render() {
    return (
      <div>
        <section className="colorlib-about" data-section="about">
        <div className="colorlib-narrow-content">
            <div className="row">
            <div className="col-md-12">
                <div className="row row-bottom-padded-sm animate-box" data-animate-effect="fadeInLeft">
                <div className="col-md-12">
                    <div className="about-desc">
                    <span className="heading-meta">About Me</span>
                    <h2 className="colorlib-heading">Who Am I?</h2>
                    <p>Hi, I'm Nathan Samson, a computer science student passionate about software. Currently pursuing my Bachelor's degree at the University of Maryland Baltimore County, I feel in love with software due to LLm it was the first time i realized the transfromative impact software can have on human lives.</p>
                      <p>My software journey is filled with relevant coursework such as Computer Science, Calculus, and Physics, laying a strong foundation for my technical skills. My interest in problem-solving and analytical reasoning has led me to get incolved in software at my school beyond academics, I've been actively involved in IoT research and development, contributing to projects that harness the power of IoT for real-time data analysis and decision-making.</p>
                    </div>
                </div>
                </div>
            </div>
            </div>
        </div>
        </section>
        <section className="colorlib-about">
        <div className="colorlib-narrow-content">
            <div className="row">
            <div className="col-md-6 col-md-offset-3 col-md-pull-3 animate-box" data-animate-effect="fadeInLeft">
                <span className="heading-meta">What I do?</span>
                <h2 className="colorlib-heading">Here are some of my expertises</h2>
            </div>
            </div>
            <div className="row row-pt-md">
            <div className="col-md-4 text-center animate-box">
                <div className="services color-1">
                <span className="icon">
                    <i className="icon-bulb" />
                </span>
                <div className="desc">
                    <h3>AI/ML </h3>
                    <p>I have experience with AI with a expierence in developing and implementing ML algorithms and models utilizing frameworks such as TensorFlow and PyTorch to create systems and AI-driven solutions.</p>
                </div>
                </div>
            </div>
            <div className="col-md-4 text-center animate-box">
                <div className="services color-3">
                <span className="icon">
                    <i className="icon-phone3" />
                </span>
                <div className="desc">
                <h3>Software Development</h3>
                <p>I have experience in full-stack software development where i built robust and scalable applications using Node.js, React, and Python. Skilled in designing user interfaces and optimizing system performance to enhance efficiency. </p>
                </div>
                </div>
            </div>
            <div className="col-md-4 text-center animate-box">
                <div className="services color-5">
                <span className="icon">
                    <i className="icon-data" />
                </span>
                <div className="desc">
                <h3>Data Science</h3>
                    <p>I have expierence in data science specifically real-time data analytics, statistical analysis, and data visualization. Using Python and SQL to extract insights for data-informed decision-making.</p>
                </div>
                </div>
            </div>
          </div>
           <div className="row justify-content-center">
              <div className="col-md-4 offset-md-4 text-center animate-box">
                <div className="services color-2">
                  <span className="icon">
                    <i className="icon-data" />
                  </span>
                  <div className="desc">
                    <h3>Internet of Things</h3>
                    <p>
                      I have experience in designing IoT solutions,
                      specifically integrating sensors and devices for real-time
                      data collection and analysis. Also with utilizing
                      protocols like MQTT and edge computing to enhance system
                      performance.
                    </p>
                  </div>
                </div>
              </div>
            </div>
        </div>
        </section>
      </div>
    )
  }
}
