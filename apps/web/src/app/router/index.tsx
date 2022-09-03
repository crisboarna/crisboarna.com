import {BrowserRouter, Route, Routes} from "react-router-dom";
import Home from "../../pages/home";
import NotFound from "../../pages/not-found";

const Router = () => <BrowserRouter>
        <Routes>
            <Route path={"/"} element={<Home/>} />
            <Route path={"*"} element={<NotFound/>} />
        </Routes>
    </BrowserRouter>

export default Router;