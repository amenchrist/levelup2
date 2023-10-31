import React from 'react';
import { INBOX_ITEM, LIST, PROCESSED } from '../constants';
import { useNavigate } from 'react-router-dom';
import { useMyStore } from '../store';

export default function InboxOverview() {

    const navigate = useNavigate();
    const content = useMyStore(store => store.inbox);

    let filteredContent = content.filter((entry) => (entry.type === INBOX_ITEM && entry.isTrashed === false) && entry.status !== PROCESSED );

    return (
        <article className="h-100 center bg-white br1 ba b--black-10" data-view={LIST} title="INBOX" onClick={() => navigate('/Inbox')}>
            <div className="tc">
                <h1 className="f3 mb2">{ filteredContent.length }</h1>
                <h2 className="f5 fw4 gray mt0">Inbox</h2>
            </div>
        </article>
    );
}
