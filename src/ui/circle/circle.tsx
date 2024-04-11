import React from 'react'

import { ElementStates } from '../../types/element-states'

import styles from './circle.module.css'

interface CircleProps {
    state?: ElementStates
    letter?: string
    head?: string | React.ReactElement | null
    index?: number
    tail?: string | React.ReactElement | null
    tailType?: 'string' | 'element'
    extraClass?: string
    isSmall?: boolean
    as: React.ElementType
}

export const Circle = ({
    as: Component,
    state = ElementStates.Default,
    letter,
    head,
    index,
    tail,
    extraClass = '',
    isSmall
}: CircleProps) => {
    return (
        <Component className={`${styles.content} ${extraClass}`}>
            <div
                className={`text text_type_input text_color_input mb-4 ${
                    styles.absolute
                } ${styles.head} ${styles[typeof head === 'string' ? 'string' : 'element']}`}
            >
                {head}
            </div>
            <div className={`${styles.circle}  ${isSmall ? styles.small : ''} ${styles[state]}`}>
                <p className={`text text_type_circle text_color_input ${styles.letter}`}>
                    {letter}
                </p>
            </div>
            <p
                className={`text text_type_input text_color_input mt-4 ${styles.absolute} ${styles.index}`}
            >
                {index?.toString()}
            </p>
            <div
                className={`text text_type_input text_color_input mt-4 ${
                    styles.absolute
                } ${index?.toString() ? styles.tail60 : styles.tail30} ${
                    styles[typeof tail === 'string' ? 'string' : 'element']
                }`}
            >
                {tail}
            </div>
        </Component>
    )
}
