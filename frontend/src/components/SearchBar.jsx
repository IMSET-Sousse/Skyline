function SearchBar({ setCity, fetchWeather, city }) {
    return (
      <div className="search-bar">
        <input
          type="text"
          placeholder="Enter city"
          value={city}
          onChange={(e) => setCity(e.target.value)}
        />
        <button onClick={fetchWeather}>Search</button>
      </div>
    );
  }
  
  export default SearchBar;
  