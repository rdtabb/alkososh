import React, { memo } from 'react'

import styles from './stack-page.module.css'
import { StackItem } from './stack-page.state'

interface StackDisplayProps {
    stack: StackItem[]
    isPerformingStackAction: boolean
}

export const StackDisplay = memo(({ isPerformingStackAction, stack }: StackDisplayProps) => (
    <ul className={styles['stack']}>
        {stack.map(({ value, id, isHead }, index) => (
            <li key={id} className={styles['stack__item']}>
                <p className={styles['stack__item-top']}>{isHead ? 'top' : ''}</p>
                <p
                    className={styles['stack__item-value']}
                    style={{
                        borderColor: isPerformingStackAction && isHead ? 'purple' : 'blue'
                    }}
                >
                    {value}
                </p>
                <p style={{ margin: 0 }}>{index}</p>
            </li>
        ))}
    </ul>
))
