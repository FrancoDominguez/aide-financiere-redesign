import { useState } from "react";
import { Routes, Route } from "react-router-dom";
import Header from "./components/header";
import Footer from "./components/footer";
import AppDrawer from "./components/drawer";
import LoginPage from "./pages/loginPage";
import MyAccountPage from "./pages/myAccountPage";
import SignupPage from "./pages/signupPage";
import LandingPage from "./pages/landingPage";
import ApplicationPage from "./pages/applicationPage";

function App() {
  const [open, setOpen] = useState(false);

  const toggleDrawer = (isOpen) => () => {
    setOpen(isOpen);
  };

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <AppDrawer open={open} toggleDrawer={toggleDrawer} />
      <Header onOpenDrawer={toggleDrawer(true)} />
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
