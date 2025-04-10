import Application from "./Application.page";
import Button from "@mui/material/Button";

function App() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
      <div className="container mx-auto p-6 bg-white rounded-lg shadow-md"></div>
      <Application></Application>
      <Button variant="contained" color="primary">
        Hello MUI
      </Button>
    </div>
  );
}

export default App;
