import Header from "./components/header";
import Footer from "./components/footer";
import TextField from "@mui/material/TextField";
import LoginPage from "./pages/loginPage";

function App() {
  return (
    <div className="min-h-screen flex flex-col bg-gray-100">
      <Header />
      <main className="flex-grow container mx-auto p-6 bg-white rounded-lg shadow-md flex items-center justify-center">
        <LoginPage />
      </main>
      <Footer />
    </div>
  );
}

export default App;
