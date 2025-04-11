import { Routes, Route } from "react-router-dom";
import Header from "./components/header";
import Footer from "./components/footer";
import LoginPage from "./pages/loginPage";
import MyAccountPage from "./pages/myAccountPage";
import SignupPage from "./pages/signupPage";
import LandingPage from "./pages/landingPage";

function App() {
  return (
    <div className="min-h-screen flex flex-col bg-gray-100">
      <Header />
      <main className="flex-grow container mx-auto my-4 p-6 bg-white rounded-lg shadow-md flex items-center justify-center">
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route path="/landing" element={<LandingPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/my-account" element={<MyAccountPage />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

export default App;
