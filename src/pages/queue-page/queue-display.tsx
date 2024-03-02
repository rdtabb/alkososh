import React, { memo } from 'react'

import styles from '../stack-page/stack-page.module.css'

import { type QueueItem } from './queue-page.state'

interface QueueDisplayProps {
    queue: QueueItem[]
    isPerformingEnqueue: boolean
    isPerformingDequeue: boolean
}

export const QueueDisplay = memo(
    ({ queue, isPerformingDequeue, isPerformingEnqueue }: QueueDisplayProps) => {
        return (
            <ul className={styles['stack']}>
                {queue.map(({ value, id }, index) => {
                    const isHead = index === queue.length
                    const isTail = index === 0

                    const showBorder =
                        (isHead && isPerformingEnqueue) || (isTail && isPerformingDequeue)

                    return (
                        <li key={id} className={styles['stack__item']}>
                            <p className={styles['stack__item-top']}>
                                {index === queue.length ? 'head' : ''}
                            </p>
                            <p
                                className={styles['stack__item-value']}
                                style={{
                                    borderColor: showBorder ? 'purple' : 'black'
                                }}
                            >
                                {value}
                            </p>
                            <p style={{ margin: 0 }}>{index === 0 ? 'tail' : index}</p>
                        </li>
                    )
                })}
            </ul>
        )
    }
)
