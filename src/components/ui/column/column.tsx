import React from 'react'

import { ElementStates } from '../../../types/element-states'

import styles from './column.module.css'

interface ColumnProps {
    index: number
    state?: ElementStates
    extraClass?: string
}

export const Column = ({ index, state = ElementStates.Default, extraClass = '' }: ColumnProps) => (
    <div className={`${styles.content} ${extraClass}`}>
        <div
            className={`${styles.column} ${styles[state]}`}
            style={{ height: (320 * index) / 100 || 1 }}
        />
        <p className={`text text_type_column text_color_input mt-3`}>{index}</p>
    </div>
)
