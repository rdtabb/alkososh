import React, { memo } from 'react'

import { ElementStates } from '../../types/element-states'
import { Column } from '../../ui/column/column'
import styles from '../common-form-layout.module.css'

interface SortingDisplayProps {
    array: number[]
    columnState: (idx: number) => ElementStates
}

export const SortingDisplay = memo(({ array, columnState }: SortingDisplayProps) => {
    return (
        <ul className={styles['sequence']} style={{ alignItems: 'end' }}>
            {array.map((item, index) => (
                <Column index={item} key={index} state={columnState(index)} />
            ))}
        </ul>
    )
})
