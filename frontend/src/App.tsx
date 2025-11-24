import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import MqSeries from "./pages/MqSeries";
import TestWcsButtons from "./pages/TestWcsButtons";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/mq" element={<MqSeries />} />
      <Route path="/mq/demande" element={<MqSeries />} />
      <Route path="/mq/cartographie" element={<MqSeries />} />
      <Route path="/test" element={<TestWcsButtons />} />
    </Routes>
  );
}

export default App;
