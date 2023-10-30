import React from 'react';
import { DONE, LIST, SOMEDAY, TASK } from '../constants';
import { useNavigate } from 'react-router-dom';
import { useStateContext } from '../Contexts/ContextProvider';

export default function TaskOverview() {

    const navigate = useNavigate()

    const {content} = useStateContext()
    let filteredContent = content.filter((entry) => (entry.type === TASK && entry.isTrashed === false) && entry.status !== DONE && entry.dueDate !== SOMEDAY);

    return (
        <article className="h-100 center bg-white ba b--black-10" data-view={LIST} title="TASKS" onClick={() => navigate('/tasks')}> 
            <div className="tc">
                <h1 className="f3 mb2">Tasks</h1>
                <h2 className="f5 fw4 gray mt0">({ filteredContent.length })</h2>
            </div>
        </article>
    );
}