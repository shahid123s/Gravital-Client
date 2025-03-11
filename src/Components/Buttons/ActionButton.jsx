import React from 'react'

function ActionButton({ buttonColor, title, handleAction, isDisabled, actionId}) {

    const color = buttonColor === 'orange'
    ? 'bg-orange-400'
    : buttonColor === 'red'
    ? 'bg-red-500'
    : buttonColor === 'green'
    ? 'bg-lime-600' : 'bg-[#4A90E2]';
    

    return (
        <button
            className={`block w-full px-4 py-2 text-sm align-middle rounded-lg text-left overflow-hidden hover:${color}`}
            onClick={() => handleAction(title, actionId)}
            disabled={isDisabled}
        >
            {title}
        </button>

    )
}

export default ActionButton
