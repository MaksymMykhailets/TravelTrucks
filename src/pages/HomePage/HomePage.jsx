const HomePage = () => {
  return (
    <div>
      <h1>Welcome to TravelTrucks</h1>
      <button onClick={() => (window.location.href = "/catalog")}>
        View Now
      </button>
    </div>
  );
};

export default HomePage;
