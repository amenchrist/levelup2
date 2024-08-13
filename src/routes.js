import {  useRoutes } from 'react-router-dom';
import './App.css';
import Main from './containers/Main';
import SplashPage from './pages/SplashPage';
import Home from './containers/Home';
import List from './components/List';
import { useMyStore } from './store';
import Stats from './containers/Stats';
import Details from './containers/Details';
import NewItem from './components/NewItem';
import Schedule from './containers/Schedule';
import NewPlayer from './components/NewPlayer';

export default function Router() {

    //IMPORTING RELEVANT VARIABLES
    //   const { user, currentPage, setCurrentPage } = useMyStore();

    const { isLoggedIn } = useMyStore();
  
  const routes = [
    { 
      path: '/', 
      element: isLoggedIn? <Main /> : <SplashPage/>,
      children: [
        { path: '', element: <Home /> },
        { path: ':category', element: <List /> },
        { path: ':category/:id', element: <Details /> },
        { path: 'new/:collection', element: <NewItem /> },
        { path: 'Schedule', element: <Schedule /> },
        { path: 'new-player', element: <NewPlayer /> },
        { path: 'stats', element: <Stats /> },
      ],
    },
  ]

  return useRoutes(routes);

}