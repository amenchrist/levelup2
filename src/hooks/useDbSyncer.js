import React, { useEffect } from 'react'
import { useMyStore } from '../store'
import { UpdateItem } from '../api';

const useDbSyncer = () => {

  const { setLastUpdated, dbUpdatePending  } = useMyStore();

  //Whenever there's a change in the store, sync with db

  console.log('db sync online')

  useEffect(() => {

    console.log('running db syncer')

    if (dbUpdatePending.length > 0) {

      //find and update current item
      if(UpdateItem(dbUpdatePending[0])){
        // dbUpdatePending.shift()
      }

    }

    
  }, [dbUpdatePending]);

  

  // useEffect(() => {

  // }, [tasks]);

  // useEffect(() => {

  // }, [missions]);

  // useEffect(() => {

  // }, [events]);

  // useEffect(() => {

  // }, [references])

  const lastUpdated = new Date().getTime();
  setLastUpdated(lastUpdated)

  return lastUpdated
}

export default useDbSyncer