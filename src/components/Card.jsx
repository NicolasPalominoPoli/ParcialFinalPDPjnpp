const Card = ({imagen}) => {
  return (
    <img
      width="125" height="150"
      src={`${imagen}?w=164&h=164&fit=crop&auto=format`}
      srcSet={`${imagen}?w=164&h=164&fit=crop&auto=format&dpr=2 2x`}
      loading="lazy"
    />
  );
};

export default Card;
