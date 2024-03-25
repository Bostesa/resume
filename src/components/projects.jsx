import React, { Component } from 'react'

export default class Projects extends Component {
  render() {
    return (
		<div>
		<section className="colorlib-work" data-section="projects">
		  <div className="colorlib-narrow-content">
			<div className="row">
			  <div className="col-md-6 col-md-offset-3 col-md-pull-3 animate-box" data-animate-effect="fadeInLeft">
				<span className="heading-meta">My Work</span>
				<h2 className="colorlib-heading animate-box">Recent Projects</h2>
			  </div>
			</div>
			<div className="row">
			  <div className="col-md-4 animate-box" data-animate-effect="fadeInLeft">
				<div className="project" style={{backgroundImage: 'url(images/project-youtube.jpg)'}}>
				  <div className="desc">
					<div className="con">
					  <h3><a href="work.html">YouTube Comments Sentiment Analysis</a></h3>
					  <span>Python, NLP, Machine Learning</span>
					  <p>Using YouTube Data API for sentiment analysis with TensorFlow and scikit-learn, providing content optimization insights.</p>
					</div>
				  </div>
				</div>
			  </div>
			  <div className="col-md-4 animate-box" data-animate-effect="fadeInRight">
				<div className="project" style={{backgroundImage: 'url(images/project-smart-campus.jpg)'}}>
				  <div className="desc">
					<div className="con">
					  <h3><a href="work.html">SMART Campus</a></h3>
					  <span>IoT, Data Architecture, Machine Learning</span>
					  <p>Enhancing campus security and efficiency using IoT sensors, with a focus on real-time space availability.</p>
					</div>
				  </div>
				</div>
			  </div>
			  <div className="col-md-4 animate-box" data-animate-effect="fadeInTop">
				<div className="project" style={{backgroundImage: 'url(images/project-connect4.jpg)'}}>
				  <div className="desc">
					<div className="con">
					  <h3><a href="work.html">Advanced Connect4 AI</a></h3>
					  <span>Reinforcement Learning, PyTorch</span>
					  <p>Developing an AI for Connect4 using advanced Reinforcement Learning techniques and real-time interface via Flask API.</p>
					</div>
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
