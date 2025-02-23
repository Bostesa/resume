import React, { Component } from 'react'

export default class Introduction extends Component {
  render() {
    return (
      <div>
        <section id="colorlib-hero" className="js-fullheight" data-section="home">
          <div className="flexslider js-fullheight">
            <ul className="slides">
            <li style={{
                          backgroundImage: 'url(images/img_bg.jpg)',
                          backgroundSize: 'contain',  // Adjust as needed: 'cover' might also be suitable
                          backgroundPosition: 'right',
                          backgroundRepeat: 'no-repeat',
                          height: '700px',  // Set the height as needed
                          width: '100%',    // Ensure the width matches the parent container or as needed
                          listStyleType: 'none', // Optional: Remove the bullet point
                          padding: '10px',  // Optional: Add some padding if content is overlapping with the background
                        }} >
                <div className="overlay" />
                <div className="container-fluid">
                  <div className="row">
                    <div className="col-md-6 col-md-offset-3 col-md-pull-3 col-sm-12 col-xs-12 js-fullheight slider-text">
                      <div className="slider-text-inner js-fullheight">
                        <div className="desc">
                          <h1>Hi! <br />I'm Nathan </h1>
                          <p><a className="btn btn-primary btn-learn" href="/images/res2.pdf" target="_blank" rel="noopener noreferrer">
                          View CV<i className="icon-download4" />
  </a>
</p>

                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </li>
              <li style={{
                          backgroundImage: 'url(images/img_bg.jpg)',
                          backgroundSize: 'contain',  // Adjust as needed: 'cover' might also be suitable
                          backgroundPosition: 'right',
                          backgroundRepeat: 'no-repeat',
                          height: '700px',  // Set the height as needed
                          width: '100%',    // Ensure the width matches the parent container or as needed
                          listStyleType: 'none', // Optional: Remove the bullet point
                          padding: '10px',  // Optional: Add some padding if content is overlapping with the background
                        }} >
                <div className="overlay" />
                <div className="container-fluid">
                  <div className="row">
                    <div className="col-md-6 col-md-offset-3 col-md-pull-3 col-sm-12 col-xs-12 js-fullheight slider-text">
                      <div className="slider-text-inner">
                        <div className="desc">
                          <h1>I love building<br /> THINGS !!</h1>
                          <p><a className="btn btn-primary btn-learn" href="https://github.com/Bostesa" target="_blank" rel="noopener noreferrer">View Projects <i className="icon-briefcase3" /></a></p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </li>
            </ul>
          </div>
        </section>
      </div>
    )
  }
}
