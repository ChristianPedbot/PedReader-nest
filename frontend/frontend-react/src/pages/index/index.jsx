import '../../ui/styles/index/index.css'

export default function Index() {
  return (
    <div className="div-index">
      <div className="Reg">
        <div className="row">
          <div className="col-md-1"></div>
          <div className="col-md-6">
            <div className="text-index">
              <div className="header">
                <a className="titleped">Ped<b>Reader</b></a>
              </div>
              <p>
                <h3 className="desc">
                  Where literature and technology intertwine<br /> in a single digital reading experience, shaping <br /> the future of access to literary knowledge.
                </h3>
              </p>
            </div>
          </div>
          <div className="col-md-2">
            <div className="text-index-image">
              <img
                className="img-index"
                src="https://res.cloudinary.com/dechfylvy/image/upload/v1712944592/horgloxwebhbmcdk59zm.jpg"
                alt="Descrição da Imagem 2"
              />
            </div>
          </div>
        </div>
      </div>
    </div>

  );
}
