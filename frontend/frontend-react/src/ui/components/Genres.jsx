import React from "react";
import '../styles/components/genres.css'
import { Link } from 'react-router-dom';

const Genres = () => {
  return (
    <div>
      <div className="cards-list">
        <Link to="/books/category/14" className="genre-link" reloadDocument>
          <div className="card-genres">
            <div className="card_image">
              <img src="https://images.unsplash.com/photo-1533613220915-609f661a6fe1?q=80&w=1964&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="Ficção" />
            </div>
            <div className="card_title title-white">
              <p>Fiction</p>
            </div>
          </div>
        </Link>
        <Link to="/books/category/15" className="genre-link" reloadDocument>
          <div className="card-genres">
            <div className="card_image">
              <img src="https://images.unsplash.com/photo-1474552226712-ac0f0961a954?q=80&w=2071&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" />
            </div>
            <div className="card_title title-white">
              <p>Romance</p>
            </div>
          </div>
        </Link>
        <Link to="/books/category/16" className="genre-link" reloadDocument>
          <div className="card-genres">
            <div className="card_image">
              <img src="https://images.unsplash.com/photo-1611673982501-93cabee16c77?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTh8fGZpYyVDMyVBNyVDMyVBM298ZW58MHx8MHx8fDA%3D" />
            </div>
            <div className="card_title title-white">
              <p>Horror</p>
            </div>
          </div>
        </Link>
        <Link to="/books/category/17" className="genre-link" reloadDocument>
          <div className="card-genres">
            <div className="card_image">
              <img src="https://images.unsplash.com/photo-1523804427826-322aa3cfaa42?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" />
            </div>
            <div className="card_title title-white">
              <p>Mystery</p>
            </div>
          </div>
        </Link>
        <Link to="/books/category/18" className="genre-link" reloadDocument>
          <div className="card-genres">
            <div className="card_image">
              <img src="https://images.unsplash.com/photo-1572297905000-240a65cf5b03?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" />
            </div>
            <div className="card_title title-white">
              <p>Suspense</p>
            </div>
          </div>
        </Link>
        <Link to="/books/category/19" className="genre-link" reloadDocument>
          <div className="card-genres">
            <div className="card_image">
              <img src="https://images.unsplash.com/photo-1452421822248-d4c2b47f0c81?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" />
            </div>
            <div className="card_title title-white">
              <p>Adventure</p>
            </div>
          </div>
        </Link>
        <Link to="/books/category/20" className="genre-link" reloadDocument>
          <div className="card-genres">
            <div className="card_image">
              <img src="https://images.unsplash.com/photo-1527874820113-232f012be7df?q=80&w=1915&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" />
            </div>
            <div className="card_title title-white">
              <p>Drama</p>
            </div>
          </div>
        </Link>
        <Link to="/books/category/21" className="genre-link" reloadDocument>
          <div className="card-genres">
            <div className="card_image">
              <img src="https://images.unsplash.com/photo-1579600161224-cac5a2971069?q=80&w=2071&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" />
            </div>
            <div className="card_title title-white">
              <p>Comedy</p>
            </div>
          </div>
        </Link>
        <Link to="/books/category/22" className="genre-link" reloadDocument>
          <div className="card-genres">
            <div className="card_image">
              <img src="https://images.unsplash.com/photo-1533271802434-53997a5f9e6c?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" />
            </div>
            <div className="card_title title-white">
              <p>Poetry</p>
            </div>
          </div>
        </Link>
        <Link to="/books/category/23" className="genre-link" reloadDocument>
          <div className="card-genres">
            <div className="card_image">
              <img src="https://images.unsplash.com/photo-1557989048-03456d01a26e?q=80&w=1935&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" />
            </div>
            <div className="card_title title-white">
              <p>Educational</p>
            </div>
          </div>
        </Link>
        <Link to="/books/category/24" className="genre-link" reloadDocument>
          <div className="card-genres">
            <div className="card_image">
              <img src="https://images.unsplash.com/photo-1550100136-e092101726f4?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" />
            </div>
            <div className="card_title title-white">
              <p>Fantasy</p>
            </div>
          </div>
        </Link>
        <Link to="/books/category/25" className="genre-link" reloadDocument>
          <div className="card-genres">
            <div className="card_image">
              <img src="https://images.unsplash.com/photo-1645113794469-626289330ea2?q=80&w=2073&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" />
            </div>
            <div className="card_title title-white">
              <p>Children</p>
            </div>
          </div>
        </Link>
      </div>
    </div>
  );
};

export default Genres;
