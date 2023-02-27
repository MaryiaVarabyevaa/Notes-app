import React from "react";
import {Navigate, Route, Routes} from "react-router-dom";
import {MAIN_ROUTE, NOTES_ROUTE} from "../constants/routes";
import WelcomePage from "../pages/WelcomePage";
import NotesPage from "../pages/NotesPage/NotesPage";

const AppRouter = () => {
    return <Routes>
        <Route index element={<WelcomePage />} />
        <Route path={NOTES_ROUTE} element={< NotesPage/>}/>
        <Route path="*" element={<Navigate to={MAIN_ROUTE} replace />} />
    </Routes>;
};

export default AppRouter;