import "./App.css";
import SearchWeather from "./components/SearchWeather";
import SearchWeather2 from "./components/SearchWeather2";

function App() {
  return (
    <>
      <div
        className="vh-100 d-flex align-items-center justify-content-center"
        style={{
          minHeight: "100vh",
          background: `url("https://images.pexels.com/photos/314726/pexels-photo-314726.jpeg") no-repeat center center fixed`,
          backgroundSize: "cover",
          position: "relative",
          // filter: "blur(4px)",
        }}
      >
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            backgroundColor: "rgba(0, 0, 0, 0.5)", // Warna gelap dan transparan
          }}
        ></div>
        {/* <SearchWeather  /> */}
        <SearchWeather2 />
      </div>
    </>
  );
}

export default App;
