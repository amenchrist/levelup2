import {  useRoutes, Navigate, useLocation } from 'react-router-dom';
import { useStateContext } from './Contexts/ContextProvider';
import './App.css';
import Main from './containers/Main';
import SplashPage from './pages/SplashPage';
import Home from './containers/Home';
import ListContainer from './containers/ListContainer';

export default function Router() {

    //IMPORTING RELEVANT VARIABLES
    //   const { user, currentPage, setCurrentPage } = useMyStore();

    const { isLoggedIn } = useStateContext();

    
  
  const routes = [
    { 
      path: '/', 
      element: isLoggedIn? <Main /> : <SplashPage/>,
      children: [
        { path: '', element: <Home /> },
        { path: 'inbox', element: <ListContainer title={'Inbox'} /> },
        { path: 'tasks', element: <ListContainer title={'Tasks'} /> },
        { path: 'missions', element: <ListContainer title={'Missions'} />},
        { path: 'stats', element: <h1>Stats</h1> },
      ],
    },
  ]

  return useRoutes(routes);

}