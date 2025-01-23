function Navbar({ setDarkMode, darkMode }) {
    return (
      <nav className="navbar">
        <div className="logo">Skyline</div>
        <label className="switch">
          <input
            type="checkbox"
            onChange={() => setDarkMode(!darkMode)}
            checked={darkMode}
          />
          <span className="slider"></span>
        </label>
      </nav>
    );
  }
  
  export default Navbar;
  