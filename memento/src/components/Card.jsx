const Card = ({ image, selected, onClick }) => {

  return (
    <div className="card">
      <div className={selected && 'selected'}>
        <img 
          alt="card face"
          className="card-face" 
          src={image}
        />
        <img 
          alt="card back" 
          className="card-back" 
          src={'/assets/valorant1.png'}
          onClick={onClick}
        />
      </div>
    </div>
  );
};

export default Card;