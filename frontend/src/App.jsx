// src/App.jsx
import { useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  useLocation,
} from "react-router-dom";
import { useEffect } from "react";
import "./App.css";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import FloatingActionButton from "./components/FloatingActionButton";
import HomePage from "./pages/HomePage";
import UploadPage from "./pages/UploadPage";

// Component to scroll to top on route change
function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}


function App() {
  // const { authState, user } = useContext(AuthContext);
  const [uploadedFiles, setUploadedFiles] = useState([]);
  const [extractedData, setExtractedData] = useState(null);

  // Handler for file uploads
  const handleFileUpload = (files) => {
    setUploadedFiles(files);
  };

  // Handler for form submission (mock extraction for demo)
  const handleSubmit = () => {
    const mockExtractedData = {
      name: "John Doe",
      dob: "01/01/1990",
      gender: "Male",
      identifier: "ABCDE1234F",
    };
    setExtractedData(mockExtractedData);
  };

  return (
    <Router>
      <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 flex flex-col">
        <ScrollToTop />
        <Navbar />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<HomePage />} />

            <Route
              path="/upload"
              element={

                <UploadPage
                  uploadedFiles={uploadedFiles}
                  onFileUpload={handleFileUpload}
                  onSubmit={handleSubmit}
                />

              }
            />

            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </main>
        <FloatingActionButton />
        <Footer />
      </div>
    </Router>
  );
}

export default App;
