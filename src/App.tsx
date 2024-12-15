import { Route, Routes } from "react-router-dom";
import { Home, LibraryActivities, LocalNew } from "./pages";

export const App = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/library-activities" element={<LibraryActivities />} />
        <Route path="/local-news" element={<LocalNew />} />
      </Routes>
    </div>
  );
};
