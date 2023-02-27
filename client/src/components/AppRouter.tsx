import React from "react";
import {Navigate, Route, Routes} from "react-router-dom";
import {MAIN_ROUTE, NOTES_ROUTE} from "../constants/routes";
import WelcomePage from "../pages/WelcomePage";
import NotesPage from "../pages/NotesPage/NotesPage";
import Layout from "./Layout";

const AppRouter = () => {
    return <Routes>
        <Route path="/" element={<Layout />}>
            <Route index element={<WelcomePage />} />
            <Route path={NOTES_ROUTE} element={< NotesPage/>}/>
            <Route path="*" element={<Navigate to={MAIN_ROUTE} replace />} />
        </Route>
    </Routes>;
};

export default AppRouter;