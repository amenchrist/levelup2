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
        { path: 'new', element: <NewItem /> },
        { path: 'Schedule', element: <Schedule /> },
        

        // { path: 'tasks', element: <ListContainer title={'Tasks'} /> },
        // { path: 'tasks/:id', element: <h2>Task Details</h2> },
        // { path: 'missions', element: <ListContainer title={'Missions'} />},
        // { path: 'missions/:id', element: <h2>Mission Details</h2> },
        { path: 'stats', element: <Stats /> },
      ],
    },
  ]

  return useRoutes(routes);

}