import { Routes, Route } from "react-router-dom";
import Header from "./components/header";
import Footer from "./components/footer";
import LoginPage from "./pages/loginPage";
import MyAccountPage from "./pages/myAccountPage";
import SignupPage from "./pages/signupPage";
import LandingPage from "./pages/landingPage";
import ApplicationPage from "./pages/applicationPage"

function App() {
  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Header />
      <main className="flex-grow container mx-auto p-6 block items-center justify-center">
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route path="/landing" element={<LandingPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/my-account" element={<MyAccountPage />} />
          <Route path="/application" element={<ApplicationPage />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

export default App;
