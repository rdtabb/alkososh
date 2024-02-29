import React, { memo } from 'react'

import { useAtomValue } from 'jotai'

import styles from './stack-page.module.css'
import { stackAtom } from './stack-page.state'

interface StackDisplayProps {
    isPerformingStackAction: boolean
}

export const StackDisplay = memo(({ isPerformingStackAction }: StackDisplayProps) => {
    const stack = useAtomValue(stackAtom)

    return (
        <ul className={styles['stack']}>
            {stack.map(({ value, id, isHead }, index) => (
                <li key={id} className={styles['stack__item']}>
                    <p className={styles['stack__item-top']}>{isHead ? 'top' : ''}</p>
                    <p
                        className={styles['stack__item-value']}
                        style={{
                            borderColor: isPerformingStackAction && isHead ? 'purple' : 'black'
                        }}
                    >
                        {value}
                    </p>
                    <p style={{ margin: 0 }}>{index}</p>
                </li>
            ))}
        </ul>
    )
})
