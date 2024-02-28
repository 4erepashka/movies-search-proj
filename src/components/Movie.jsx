import 'materialize-css';
export default function Movie(props) {
  const {
    Title: title,
    Year: year,
    inmdbID: id,
    Type: type,
    Poster: poster,
  } = props;
  return (
    <div className="row card-wrapper">
      <div className="col s12 m12 l12 card-column ">
        <div className="card movie-card">
          <div className="card-image">
            {poster === "N/A" ? (
              <img
                src={`https://via.placeholder.com/300x450/text=${title}`}
                alt="poster"
              />
            ) : (
              <img src={poster}></img>
            )}
          </div>
          <span className="card-title">{title}</span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="30px"
            height="30px"
            viewBox="0 0 24 24"
            fill="none"
            className="card-more"
          >
            <path
              d="M12 6V18M12 6L7 11M12 6L17 11"
              stroke="#000000"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
          <div className="card-content">
            <div className="card-content_year">{year}</div>
            <div className="card-content_type">{type}</div>
          </div>
        </div>
      </div>
    </div>
  );
}
