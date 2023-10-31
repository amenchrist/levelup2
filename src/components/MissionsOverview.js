import React from 'react';
import { DONE, LIST, MISSION, MISSIONS, SOMEDAY } from '../constants';
import { useNavigate } from 'react-router-dom';
import { useStateContext } from '../Contexts/ContextProvider';
import { useMyStore } from '../store';

export default function MissionsOverview() {

    const navigate = useNavigate()
    const content = useMyStore((store) => store.missions)

    let filteredContent = content.filter((entry) => (entry.type === MISSION && entry.isTrashed === false) && entry.status !== DONE && entry.dueDate !== SOMEDAY);

    return (
        <article className="h-100 center bg-white ba b--black-10" title={MISSIONS} data-view={LIST} onClick={() => navigate('Missions')}>
            <div className="tc">
                <h1 className="f3 mb2">Missions</h1>
                <h2 className="f5 fw4 gray mt0">({ filteredContent.length })</h2>
            </div>
        </article>
    );
}
