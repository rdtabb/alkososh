import React, { memo } from 'react'

import styles from '../common-form-layout.module.css'

interface FibonacciDisplayProps {
    fibonacciSequence: number[]
}

const marginStyle = { margin: 0 }

export const FibonacciDisplay = memo(({ fibonacciSequence }: FibonacciDisplayProps) => {
    return (
        <ul className={styles['sequence']}>
            {fibonacciSequence.map((number, index) => (
                <li key={index} className={styles['sequence__item']}>
                    <p
                        className={styles['sequence__item-value']}
                        style={{
                            borderColor: 'blue'
                        }}
                    >
                        {number}
                    </p>
                    <p style={marginStyle}>{index}</p>
                </li>
            ))}
        </ul>
    )
})
