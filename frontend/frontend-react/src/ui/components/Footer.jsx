import React from 'react';
import '../styles/components/footer.css'

export default function Footer() {
  return (
    <div className="footer-dark">
      <footer>
        <div className="container">
          <div className="row">
            <div className="col-sm-6 col-md-3">
              <h3>Social Medias</h3>
              <ul>
                <li><a href="https://br.linkedin.com/in/christian-saturnino?trk=people-guest_people_search-card">Linkedin</a></li>
                <li><a href="https://github.com/ChristianPedbot">Git Hub</a></li>
                <li><a href="https://www.instagram.com/christian.saturnino">Instagram</a></li>
              </ul>
            </div>
            <div className="col-sm-6 col-md-3">
              <h3>Technologies</h3>
              <ul>
                <li><a href="https://pt.wikipedia.org/wiki/JavaScript">Js</a></li>
                <li><a href="https://pt.wikipedia.org/wiki/Node.js">Node</a></li>
                <li><a href="https://pt.wikipedia.org/wiki/React_(JavaScript)">React</a></li>
              </ul>
            </div>
            <div className="col-md-6 text">
              <h3>Ped<b>Reader</b></h3>
              <p>Developed by visionaries, for everyone who yearns for literary adventures.</p>
            </div>
          </div>
          <p className="copyright">PedReader © 2024</p>
        </div>
      </footer>
    </div>
  );
}
