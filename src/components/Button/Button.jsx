import React from 'react';
import './button.scss';

export default function Button({ text, type, onClick }) {
    return (
        <button
            // eslint-disable-next-line react/button-has-type
            type={type || 'button'}
            onClick={onClick}
            className="default_button"
        >
            {text}
        </button>
    );
}
