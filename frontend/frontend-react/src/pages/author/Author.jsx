import '../../ui/styles/author/author.css'
import EditButton from '../../ui/components/buttons/edit';
import { Link } from 'react-router-dom';
import React, { useState, useEffect } from 'react'
import { getUserInfoFromServer } from '../../data/utils/localStorage';


function Author({ author }) {
  const [userIsAdmin, setUserIsAdmin] = useState(null);
  const [userId, setUserId] = useState(null);

  useEffect(() => {
    const fetchUserInfo = async () => {
      const userInfo = await getUserInfoFromServer();
      setUserId(userInfo.userId);
      setUserIsAdmin(userInfo.isAdmin);
    };

    fetchUserInfo();
  }, []);

  if (!author) {
    return <p>Carregando...</p>;
  }

  return (
    <div className="author-div">
      <div className="book-card mb-3" style={{ maxWidth: '540px' }}>
        <div className="row g-0">
          <div className="col-md-4">
            <img src={author.img} className="img-fluid rounded-start" alt={author.name} />
          </div>
          <div className="col-md-8">
            <div className="card-author-body">
              <h5 className="card-author-title">{author.name}</h5>
              <p className="card-author-text">{author.biography}</p>
              <div className="btn-adm">
                <span className={userIsAdmin != null ? 'hidden' : ''}>
                  {userIsAdmin && (
                    <Link to={`/authors/${author.id}/edit`} reloadDocument ><EditButton author={author} /></Link>
                  )}
                </span>
              </div>

            </div>
          </div>
        </div>
        <span className={userIsAdmin != null ? 'hidden' : ''}>
          {userIsAdmin && (
            <button type="button" id="delete" className="btn btn-danger">X</button>
          )}
        </span>
      </div>

    </div>
  );
}

export default Author;
