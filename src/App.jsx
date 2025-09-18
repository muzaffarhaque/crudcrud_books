import {createBrowserRouter, RouterProvider} from "react-router-dom";
import {Home} from './pages';
import { ToastContainer } from 'react-toastify';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.scss'
import { ErrorPage } from "./components";
import RootLayout from "./pages/RootLayout";
function App() {
    // const router = createBrowserRouter([
    //     {
    //         path: "/",
    //         element: <Home/>
    //     }
    // ]);

     const router = createBrowserRouter([
        {
            path: "/",
            element: <RootLayout/>,
            errorElement: <ErrorPage/>,
            children:[
                {
                    path: "/",
                    element: <Home/>,
                },
                // {
                //     path: "/dashboard",
                //     element: <Dashboard/>,
                // },
            ]
        }
    ]);
    return (
    <> 
     <RouterProvider router={router}/>
     <ToastContainer /> 
    </>)
}

export default App
