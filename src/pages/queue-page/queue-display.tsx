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
                {queue.map((item, index) => {
                    const isHead = item !== null && index === queue.findIndex((item) => item !== null)
                    const isTail = item !== null && item.id === queue.filter((item) => item !== null).pop()?.id

                    const showBorder =
                        (isTail && isPerformingEnqueue) || (isHead && isPerformingDequeue)

                    return (
                        <li key={item?.id ?? index} className={styles['stack__item']}>
                            <p className={styles['stack__item-top']}>{isHead ? 'head' : ''}</p>
                            <p
                                className={styles['stack__item-value']}
                                style={{
                                    borderColor: showBorder ? 'purple' : 'blue'
                                }}
                            >
                                {item?.value ?? ''}
                            </p>
                            <p style={{ margin: 0 }}>{isTail ? 'tail' : index}</p>
                        </li>
                    )
                })}
            </ul>
        )
    }
)
