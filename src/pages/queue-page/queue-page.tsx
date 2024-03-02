import React, { useState, useMemo, useCallback, useEffect, type ChangeEvent } from 'react'

import { SolutionLayout } from '../../ui/solution-layout/solution-layout'
import { Input } from '../../ui/input/input'
import { Button } from '../../ui/button/button'
import { preventDefault, performDelay } from '../../utils/utils'

import styles from '../stack-page/stack-page.module.css'
import { QueueItem, queueController, QUEUE_CONTROLLER_ACTION_DURATION } from './queue-page.state'
import { QueueDisplay } from './queue-display'

export const QueuePage = () => {
    const [newItem, setNewItem] = useState<string>('')
    const [isPerformingEnqueue, setIsPerformingEnqueue] = useState<boolean>(false)
    const [isPerformingDequeue, setIsPerformingDequeue] = useState<boolean>(false)
    const [queue, setQueue] = useState<QueueItem[]>([])

    const handleNewItemChange = useCallback((event: ChangeEvent<HTMLInputElement>): void => {
        setNewItem(event.target.value)
    }, [])

    const isPerformingQueueAction: boolean = useMemo(
        () => isPerformingDequeue || isPerformingDequeue,
        [isPerformingDequeue, isPerformingEnqueue]
    )

    const enqueue = useCallback((): void => {
        if (!newItem) return

        setNewItem('')
        queueController.enqueue({ value: newItem, id: Date.now() })
        setQueue(queueController.getItems())
        performDelay({
            delayInMs: QUEUE_CONTROLLER_ACTION_DURATION,
            setIsDelayPerforming: setIsPerformingEnqueue
        })
    }, [setQueue, newItem])

    const dequeue = useCallback(async (): Promise<void> => {
        await performDelay({
            delayInMs: QUEUE_CONTROLLER_ACTION_DURATION,
            setIsDelayPerforming: setIsPerformingDequeue
        })
        queueController.dequeue()
        setQueue(queueController.getItems())
    }, [setQueue])

    const clearQueue = useCallback((): void => {
        setNewItem('')
        queueController.clear()
        setQueue([])
    }, [setQueue])

    useEffect(() => {
        const enterHandler = (event: KeyboardEvent): void => {
            if (event.key === 'Enter' && newItem && !isPerformingEnqueue) {
                enqueue()
            }
        }

        document.addEventListener('keydown', enterHandler)

        return () => document.removeEventListener('keydown', enterHandler)
    }, [enqueue])

    useEffect(
        () => () => {
            queueController.clear()
        },
        []
    )

    return (
        <SolutionLayout title="Очередь">
            <form onSubmit={preventDefault} className={styles['stack-form']}>
                <div className={styles['stack-form__input-container']}>
                    <Input
                        isLimitText
                        maxLength={4}
                        value={newItem}
                        onChange={handleNewItemChange}
                    />
                    <Button
                        type="button"
                        text="Добавить"
                        onClick={enqueue}
                        disabled={!newItem || isPerformingDequeue}
                        isLoader={isPerformingEnqueue}
                    />
                    <Button
                        type="button"
                        text="Удалить"
                        isLoader={isPerformingDequeue || isPerformingEnqueue}
                        onClick={dequeue}
                        disabled={!queue.length}
                    />
                </div>
                <Button
                    type="reset"
                    text="Очистить"
                    onClick={clearQueue}
                    disabled={!queue.length || isPerformingQueueAction}
                />
            </form>
            <section className={styles['display-wrapper']}>
                <QueueDisplay
                    queue={queue}
                    isPerformingDequeue={isPerformingDequeue}
                    isPerformingEnqueue={isPerformingEnqueue}
                />
            </section>
        </SolutionLayout>
    )
}
