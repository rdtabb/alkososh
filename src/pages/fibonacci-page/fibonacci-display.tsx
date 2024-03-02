import { memo } from 'react'

import styles from '../common-form-layout.module.css'

interface FibonacciDisplayProps {
    fibonacciSequence: number[]
    isPerforming: boolean
}

const marginStyle = { margin: 0 }

export const FibonacciDisplay = memo(
    ({ fibonacciSequence, isPerforming }: FibonacciDisplayProps) => {
        return (
            <ul className={styles['sequence']}>
                {fibonacciSequence.map((number, index) => (
                    <li key={index} className={styles['sequence__item']}>
                        <p
                            className={styles['sequence__item-value']}
                            style={{
                                borderColor:
                                    isPerforming && index === fibonacciSequence.length - 1
                                        ? 'purple'
                                        : 'black'
                            }}
                        >
                            {number}
                        </p>
                        <p style={marginStyle}>{index}</p>
                    </li>
                ))}
            </ul>
        )
    }
)
