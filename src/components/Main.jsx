import { Route, Routes } from "react-router-dom";
import Home from "@pages/Home";
import Map from "@pages/Map";

const Main = () => {
  return (
    <main className="mainpage">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/Map" element={<Map />} />
      </Routes>
    </main>
  );
};
export default Main;
