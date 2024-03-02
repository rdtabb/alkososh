import React, { memo } from 'react'

import styles from '../common-form-layout.module.css'

interface StringDisplayProps {
    string: string[]
    performingIndex1: number | null
    performingIndex2: number | null
}

export const StringDisplay = memo(
    ({ string, performingIndex1, performingIndex2 }: StringDisplayProps) => {
        return (
            <ul className={styles['sequence']}>
                {string.map((value, index) => (
                    <li key={index} className={styles['sequence__item']}>
                        <p
                            className={styles['sequence__item-value']}
                            style={{
                                borderColor:
                                    index === performingIndex1 || index === performingIndex2
                                        ? 'purple'
                                        : 'black'
                            }}
                        >
                            {value}
                        </p>
                        <p style={{ margin: 0 }}>{index}</p>
                    </li>
                ))}
            </ul>
        )
    }
)