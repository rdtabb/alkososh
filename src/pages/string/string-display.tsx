import React, { memo } from 'react'

import styles from '../common-form-layout.module.css'

interface StringDisplayProps {
    string: string[]
    performingIndex1: number | null
    performingIndex2: number | null
    performedIndexes: number[]
}

export const StringDisplay = memo(
    ({ string, performingIndex1, performingIndex2, performedIndexes }: StringDisplayProps) => {
        return (
            <ul className={styles['sequence']}>
                {string.map((value, index) => {
                    const getItemBorderColor = () => {
                        if (index === performingIndex1 || index === performingIndex2) {
                            return 'purple'
                        }
                        if (performedIndexes.includes(index)) {
                            return 'green'
                        }

                        return 'black'
                    }

                    return (
                        <li key={index} className={styles['sequence__item']}>
                            <p
                                className={styles['sequence__item-value']}
                                style={{ borderColor: getItemBorderColor() }}
                            >
                                {value}
                            </p>
                            <p style={{ margin: 0 }}>{index}</p>
                        </li>
                    )
                })}
            </ul>
        )
    }
)
