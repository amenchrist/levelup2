import React, { useState } from 'react';
import { INBOX, MISSIONS, TASKS, DETAILS, REFERENCES, EVENTS, REFERENCE, ADD, CALENDAR } from '../constants';
import { Item } from '../classes';
import NewTask from './NewTask';
import NewMission from './NewMission';
import { selectItem, ShipItems, selectTitle, ChangeNav } from '../actions';
import { connect } from 'react-redux';
import NewReference from './NewReference';
import NewEvent from './NewEvent';
import { amendList } from '../functions';

const mapStateToProps = state => {
    return {
        view: state.values.view,
        title: state.values.title,
        itemID: state.values.itemID,
        db: state.items.record.items,
        exp: state.UpdateExpReducer.exp
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        changeTitle: (title) => {
            return dispatch(selectTitle(title))
        },
        changeItemID: (id) => {
            return dispatch(selectItem(id))
        },
        shipItems: (items, agent, record) => {
            return dispatch(ShipItems(items, agent, record))
        },
        changeNav: (navObj) => {
            return dispatch(ChangeNav(navObj))
        }
    }
}

function NewItem({ submitFunction, title, updateExp, changeItemID, shipItems, db, changeTitle, itemID, changeNav, exp }) {

    // const [ type, setType ] = useState(title);
    const [ name, setName ] = useState('Enter item name');
    
    const InboxItems = db.Inbox;
    //console.log(InboxItems);

    function reset(){
        //changeTitle(INBOX);
        setName('Enter item name');
        // setDescription('');
    }

    function submitNewItem(event) {
        if(name !== 'Enter item name' && name !== '' ){
            let i = new Item(name);
            // InboxItems.unshift(i);
            // pushChanges("ADD", i, "Inbox");
            updateExp(5);
            amendList(db, INBOX, i, ADD, shipItems)
            changeNavigation(i.id);
            //submitFunction(event);
            reset();
            event.preventDefault();
        }
        event.preventDefault();
    }

    function changeNavigation(id){
        let nav = {
                title: INBOX,
                view: DETAILS,
                ID: id
            }
        changeNav(nav);
    }
    
    function displayTypeForm(){
        switch(true) {
            case title === TASKS:
                return <NewTask updateExp={updateExp} />
            case title === MISSIONS && parseInt(itemID) === 0:
                return <NewMission updateExp={updateExp} />
            case title === MISSIONS && parseInt(itemID) !== 0:
                return <NewTask updateExp={updateExp} />
            case title === REFERENCES:
                return <NewReference updateExp={updateExp} />
            case title === CALENDAR:
                return <NewEvent updateExp={updateExp} />
            case title === EVENTS:
                return <NewEvent updateExp={updateExp} />
            default:
                return (
                    <div className='h-100 w-100 center ba b--black-10 '>
                        <h1 className='tc gold b'>NEW ITEM</h1>
                        <form onSubmit={submitNewItem} className='flex flex-column' title={INBOX}>
                            <input className='pa2 mb2' type='text' autoFocus onChange={(e)=> setName(e.target.value)} placeholder='Enter item name...'  />
                            {/* <textarea value={description} onChange={(e) => setDescription(e.target.value)} /> */}
                            <input className='pa2 mb1' type='submit' value='submit' />
                        </form>
                    </div>
                )
        }
    }

    return (
        <div className='pa1 w-100 h-100'>
            <div className='pa1 w-100 flex justify-center'>
                <button className="f7 button w-20" onClick={(e)=> changeTitle(INBOX)}>INBOX</button>
                <button className="f7 button w-20" onClick={(e)=> changeTitle(TASKS)}>TASK</button>
                <button className="f7 button w-20" onClick={(e)=> changeTitle(MISSIONS)}>MISSION</button>
                <button className="f7 button w-20" onClick={(e)=> changeTitle(REFERENCES)}>REFERENCE</button>
                <button className="f7 button w-20" onClick={(e)=> changeTitle(EVENTS)}>EVENT</button>
                {/* <button className="button w-20" onClick={(e)=> changeTitle(e.target.value)}>FINANCE</button> */}
            </div>
                {displayTypeForm()}
        </div>
    )
}

export default connect(mapStateToProps, mapDispatchToProps)(NewItem);