import {  useRoutes, Navigate, useLocation } from 'react-router-dom';
import { useStateContext } from './Contexts/ContextProvider';
import './App.css';
import Main from './containers/Main';
import SplashPage from './pages/SplashPage';

export default function Router() {

    //IMPORTING RELEVANT VARIABLES
    //   const { user, currentPage, setCurrentPage } = useMyStore();

    const { isLoggedIn } = useStateContext();
  
  const routes = [
    { 
      path: '/', 
      element: isLoggedIn? <Main /> : <SplashPage/>,
      children: [
        { path: '', element: <h1>Home</h1> },
        { path: 'inbox', element: <h1>Inbox</h1> },
        { path: 'tasks', element: <h1>Tasks</h1> },
        { path: 'missions', element: <h1>Missions</h1>},
        { path: 'stats', element: <h1>Stats</h1> },
      ],
    },
  ]

  return useRoutes(routes);

}