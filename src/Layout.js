
// import User from './components/User/User';
import Admin from './components/Admin/Admin';
import HomePage from './components/Home/HomePage';
import ManageUser from './components/Admin/Content/ManageUser';
import DashBoard from './components/Admin/Content/DashBoard';
import Login from './components/Auth/Login';
import { ToastContainer } from 'react-toastify';
import { Suspense } from 'react';
import {
    Routes,
    Route
} from "react-router-dom"
import App from './App';
import Register from './components/Auth/Register';
import ListQuiz from './components/User/ListQuiz';
import DetailQuiz from './components/User/DetailQuiz'
import ManageQuiz from './components/Admin/Content/Quiz/ManageQuiz';
import ManageQuestion from './components/Admin/Content/Question/ManageQuestion';
import PrivateRoute from './routes/PrivateRoute';
const Notfound = () => {
    return (
        <div className='alert alert-danger container mt-3'>404. Not found data with your current URL</div>
    )
}

const Layout = (props) => {
    return (
        <Suspense fallback="...is loading">
            <Routes>
                <Route path="/" element={<App />}>
                    <Route index element={<HomePage />} />

                    <Route path="users" element={
                        <PrivateRoute>
                            <ListQuiz />
                        </PrivateRoute>
                    } />
                </Route>

                <Route path="/quiz/:id" element={<DetailQuiz />} />

                <Route path="/admins" element={
                    <PrivateRoute>
                        <Admin />
                    </PrivateRoute>
                } >
                    <Route index element={<DashBoard />} />
                    <Route path="manage-users" element={<ManageUser />} />
                    <Route path="manage-quizes" element={<ManageQuiz />} />
                    <Route path="manage-questions" element={<ManageQuestion />} />
                </Route>

                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/test" element={<PrivateRoute />} />
                <Route path="*" element={<Notfound />} />
            </Routes>
            <ToastContainer
                position="top-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
            />
        </Suspense>
    )
}

export default Layout