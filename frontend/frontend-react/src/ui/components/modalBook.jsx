import React, { useState, useEffect } from 'react';
import '../styles/components/modalBook.css'
import axiosInstance from '../../data/axios/axios';

export default function ModalBook({ bookId }) {
  const [returnDate, setReturnDate] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchReturnDate = async () => {
      try {
        const response = await axiosInstance.get(`/locations/${bookId}`);
        const returnDate = response.data.return_date;
        const separatedDate = returnDate.split("T");
        const formattedDate = separatedDate[0];
        setReturnDate(formattedDate);
      } catch (error) {
      }
    };

    fetchReturnDate();
  }, [bookId]);

  return (
    <>
      <button className="unavailable-btn" data-bs-toggle="modal" data-bs-target="#exampleModal">Unavailable</button>
      <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <img className='modal-image' src="https://res.cloudinary.com/dechfylvy/image/upload/v1714756895/Firefly_fa%C3%A7a_um_robo_com_detalhes_em_azul_triste_pois_nao_conseguiu_seu_livro_favorito_93466_xwjqoh.jpg" alt="" />
            </div>
            <div className="modal-body">
              {error ? (
                <p>Too bad! Your book is already reserved, but don't be sad! As soon as we have his return date we will let you know here!</p>
              ) : (
                <>
                  <p>Too Bad! Your book is already reserved, but don't be sad! Look when he comes back:</p>
                  <p><li><b>{returnDate}</b></li></p>
                </>
              )}
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-success" data-bs-dismiss="modal">Ok</button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
