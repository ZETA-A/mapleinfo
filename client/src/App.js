import { Routes, Route } from "react-router-dom";
import Titlebar from "./components/Titlebar/Titlebar";
import Home from "./pages/Home";
import Loading from "./pages/Loading";

function App() {
    return (
        <div>
            <Routes>
                <Route element={<Titlebar />}>
                    <Route path="/" element={<Home />} />
                    <Route path="/Loading" element={<Loading />} />
                </Route>
            </Routes>
        </div>
    );
}

export default App;
