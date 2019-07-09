import React, { useState, useEffect } from 'react'
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

const TrelloList = ({ title, cards, listId, index, dispatch }) => {
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
        dispatch(editTitle(listId, listTitle))
    }

    const handleDeleteList = () => {
        dispatch(deleteList(listId))
    }

    return (
        <Draggable draggableId={String(listId)} index={index}>
            {provided => (
                <ListContainer
                    {...provided.draggableProps}
                    ref={provided.innerRef}
                    {...provided.dragHandleProps}>
                    <Droppable droppableId={String(listId)} type="card">
                        {provided => (
                            <div
                                {...provided.droppableProps}
                                ref={provided.innerRef}>
                                {/* <h4>{title}</h4> */}
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
                                {cards.map((card, index) => (
                                    <TrelloCard
                                        key={card.id}
                                        index={index}
                                        text={card.text}
                                        id={card.id}
                                        index={index}
                                        listId={listId}
                                    />
                                ))}
                                {provided.placeholder}
                                <TrelloCreate listId={listId} />
                            </div>
                        )}
                    </Droppable>
                </ListContainer>
            )}
        </Draggable>
    )
}

export default connect()(TrelloList)
