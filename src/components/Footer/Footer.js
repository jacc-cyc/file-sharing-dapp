import React from 'react';
import './Footer.css';
import { Link } from 'react-router-dom';

function Footer() {
  return (
    <div className='footer-container'>


      <section class='social-media'>
        <div class='social-media-wrap'>

          {/* Platform Name and Logo */}
          <div class='footer-logo'>
            <Link to='/' className='social-logo'>
            <i class="fa-regular fa-file"></i>
              FileShare
            </Link>
          </div>

          {/* Website Right */}
          <div class='website-rights'>CityU FYP © 2021-2022</div>

          {/* Social Media Icons */}
          <div class='social-icons'>

            <div class='social-icon-link'>
              {/* GitHub, Source Code Link*/}
            <a target="_blank" rel="noopener noreferrer" href="https://github.com/jacc-cyc/file-sharing-dapp" className="source-code">Source Code</a>
              <i class="fa-brands fa-github" />
            </div>

          </div>
          
        </div>
      </section>
    </div>
  );
}

export default Footer;
