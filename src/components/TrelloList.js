import React, { useState } from 'react'
import TrelloCard from './TrelloCard'
import TrelloCreate from './TrelloCreate'
import { Droppable, Draggable } from 'react-beautiful-dnd'
import styled from 'styled-components'
import { connect } from 'react-redux'
import { editTitle, deleteList } from './../actions'
import Icon from '@material-ui/core/Icon'

const ListContainer = styled.div`
    background-color: #dfe3e6;
    border-radius: 3px;
    width: 300px;
    height: 100%;
    padding: 8px;
    margin-right: 8px;

    h4 {
        margin: 10px;

        color: #172b4d;
        font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto,
            Noto Sans, Ubuntu, Droid Sans, Helvetica Neue, sans-serif;
        font-size: 14px;
    }
`

const StyledInput = styled.input`
    width: 100%;
    height: 100%;
    border: none;
    outline-color: blue;
    border-radius: 3px;
    margin-bottom: 3px;
    padding: 5px;
`

const TitleContainer = styled.div`
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    cursor: pointer;
`

const DeleteButton = styled(Icon)`
    cursor: pointer;
`

const ListTitle = styled.h4`
    transition: background 0.3s ease-in;
    ${TitleContainer}:hover & {
        background: #ccc;
    }
`

const TrelloList = ({ title, cards, listID, index, dispatch }) => {
    const [isEditing, setIsEditing] = useState(false)
    const [listTitle, setListTitle] = useState(title)

    const renderEditInput = () => {
        return (
            <from onSubmit={handleFinishEditing}>
                <StyledInput
                    type="text"
                    value={listTitle}
                    onChange={handleChange}
                    autoFocus
                    onFocus={handleFocus}
                    onBlur={handleFinishEditing}
                />
            </from>
        )
    }

    const handleFocus = e => {
        e.target.select()
    }

    const handleChange = e => {
        e.preventDefault()
        setListTitle(e.target.value)
    }

    const handleFinishEditing = () => {
        setIsEditing(false)
        dispatch(editTitle(listID, listTitle))
    }

    const handleDeleteList = () => {
        dispatch(deleteList(listID))
    }

    return (
        <Draggable draggableId={String(listID)} index={index}>
            {provided => (
                <ListContainer
                    {...provided.draggableProps}
                    ref={provided.innerRef}
                    {...provided.dragHandleProps}>
                    <Droppable droppableId={String(listID)} type="card">
                        {provided => (
                            <div>
                                <div>
                                    {isEditing ? (
                                        renderEditInput()
                                    ) : (
                                        <TitleContainer
                                            onClick={() => setIsEditing(true)}>
                                            <ListTitle>{listTitle}</ListTitle>
                                            <DeleteButton
                                                onClick={handleDeleteList}>
                                                delete
                                            </DeleteButton>
                                        </TitleContainer>
                                    )}
                                </div>
                                <div
                                    {...provided.droppableProps}
                                    ref={provided.innerRef}>
                                    {cards.map((card, index) => (
                                        <TrelloCard
                                            key={card.id}
                                            text={card.text}
                                            id={card.id}
                                            index={index}
                                            listID={listID}
                                        />
                                    ))}
                                    {provided.placeholder}
                                    <TrelloCreate listID={listID} />
                                </div>
                            </div>
                        )}
                    </Droppable>
                </ListContainer>
            )}
        </Draggable>
    )
}

export default connect()(TrelloList)
