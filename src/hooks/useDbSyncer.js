import React, { useEffect } from 'react'
import { useMyStore } from '../store'

const useDbSyncer = () => {

  const { inbox, tasks, missions, events, references, setLastUpdated, lastUpdated  } = useMyStore();

  //Whenever there's a change in the store, sync with db
  useEffect(() => {
    
  }, [inbox]);

  useEffect(() => {

  }, [tasks]);

  useEffect(() => {

  }, [missions]);

  useEffect(() => {

  }, [events]);

  useEffect(() => {

  }, [references])

  return lastUpdated
}

export default useDbSyncer