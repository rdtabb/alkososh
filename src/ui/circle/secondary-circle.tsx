import React, { CSSProperties } from 'react'

interface SecondaryCircleProps {
    value: string
}

const divStyle: CSSProperties = {
    display: 'grid',
    placeItems: 'center',
    width: '56px',
    height: '56px',
    border: '3px solid rgba(210, 82, 225, 1)',
    borderRadius: '50%'
}

const textStyle: CSSProperties = {
    fontSize: '18px',
    fontWeight: '600',
    lineHeight: '22px',
    textAlign: 'center'
}

export const SecondaryCircle = ({ value }: SecondaryCircleProps): JSX.Element => {
    return (
        <div style={divStyle}>
            <p style={textStyle}>{value}</p>
        </div>
    )
}
