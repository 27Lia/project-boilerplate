import { Routes, Route } from "react-router-dom";
import NotFound from "@/pages/NotFound";

export default function App() {
  return (
    <Routes>
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}
