const LocationFormatter = ({ location }) => {
  const formattedLocation = location
    ? location.split(", ").reverse().join(", ")
    : "";

  return <span>{formattedLocation}</span>;
};

export default LocationFormatter;
