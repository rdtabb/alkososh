import React, { useState, useCallback, useEffect, ChangeEvent } from 'react'
import { flushSync } from 'react-dom'

import { Button } from '../../ui/button/button'
import { Input } from '../../ui/input/input'
import { SolutionLayout } from '../../ui/solution-layout/solution-layout'
import { preventDefault, performDelay } from '../../utils/utils'
import styles from '../stack-page/stack-page.module.css'

import { ListDisplay } from './list-display'
import {
    LinkedList,
    linkedListController,
    useListPageContext,
    LIST_ACTION_DURATION
} from './list-page.state'

export const ListPage = (): JSX.Element => {
    const [newItem, setNewItem] = useState<string>('')
    const [index, setIndex] = useState<string>('')
    const [linkedList, setLinkedList] = useState<LinkedList | null>(null)
    const {
        setIsAddingToHead,
        setIsDeletingFromHead,
        setIsDeletingFromTail,
        setIsAddingToTail,
        setPerformingIndecies,
        setPerformedIndex,
        setIsInserting
    } = useListPageContext()

    const handleNewItemChange = useCallback((event: ChangeEvent<HTMLInputElement>): void => {
        setNewItem(event.target.value)
    }, [])

    const handleIndexChange = useCallback((event: ChangeEvent<HTMLInputElement>): void => {
        setIndex(event.target.value)
    }, [])

    const nullifyPerformedIndex = useCallback(async () => {
        return new Promise((res) => {
            setTimeout(() => {
                setPerformedIndex(null)
                res(200)
            }, LIST_ACTION_DURATION)
        })
    }, [])

    const addToTail = useCallback(async (): Promise<void> => {
        await performDelay({
            delayInMs: LIST_ACTION_DURATION,
            setIsDelayPerforming: setIsAddingToTail
        })
        linkedListController.addToTail(newItem)
        const new_list = linkedListController.getList()
        setLinkedList(new_list)
        setPerformedIndex(new_list.length - 1)
        setNewItem('')
        await nullifyPerformedIndex()
    }, [newItem])

    const addToHead = useCallback(async (): Promise<void> => {
        await performDelay({
            delayInMs: LIST_ACTION_DURATION,
            setIsDelayPerforming: setIsAddingToHead
        })
        linkedListController.addToHead(newItem)

        const new_list = linkedListController.getList()
        setLinkedList(new_list)
        setPerformedIndex(0)
        setNewItem('')
        await nullifyPerformedIndex()
    }, [newItem])

    const removeFromHead = useCallback(async (): Promise<void> => {
        linkedListController.removeFromHead()
        setLinkedList(linkedListController.getList())
        await performDelay({
            delayInMs: LIST_ACTION_DURATION,
            setIsDelayPerforming: setIsDeletingFromHead
        })
    }, [])

    const removeFromTail = useCallback(async (): Promise<void> => {
        linkedListController.removeFromTail()
        setLinkedList(linkedListController.getList())
        await performDelay({
            delayInMs: LIST_ACTION_DURATION,
            setIsDelayPerforming: setIsDeletingFromTail
        })
    }, [])

    const insertAtIndex = useCallback(async (): Promise<void> => {
        setIsInserting(true)
        await linkedListController.insertAtIndex(parseInt(index), newItem, async (i: number) => {
            flushSync(() => {
                setPerformingIndecies((prev) => [...prev, i - 1])
            })
            await performDelay({
                delayInMs: LIST_ACTION_DURATION
            })
        })
        setLinkedList(linkedListController.getList())
        setPerformedIndex(parseInt(index))
        setIsInserting(false)
        setPerformingIndecies([])
        await nullifyPerformedIndex()
    }, [index, newItem])

    const deleteAtIndex = useCallback(async (): Promise<void> => {
        await linkedListController.deleteAtIndex(parseInt(index), async (i: number) => {
            flushSync(() => {
                setPerformingIndecies((prev) => [...prev, i - 1])
            })
            await performDelay({
                delayInMs: LIST_ACTION_DURATION
            })
        })
        setLinkedList(linkedListController.getList())
        setPerformingIndecies([])
    }, [index])

    useEffect(() => {
        const enterHandler = (event: KeyboardEvent): void => {
            if (event.key === 'Enter' && newItem) {
                addToHead()
            }
        }

        document.addEventListener('keydown', enterHandler)

        return () => document.removeEventListener('keydown', enterHandler)
    }, [addToHead])

    useEffect(
        () => () => {
            linkedListController.clear()
        },
        []
    )

    return (
        <SolutionLayout title="Связный список">
            <form onSubmit={preventDefault} className={styles['stack-form']}>
                <div>
                    <div className={styles['stack-form__input-container']}>
                        <Input
                            isLimitText
                            maxLength={4}
                            value={newItem}
                            onChange={handleNewItemChange}
                            placeholder="Введите значение"
                        />
                        <Button
                            type="button"
                            text="Добавить в head"
                            disabled={!newItem}
                            onClick={addToHead}
                        />
                        <Button
                            type="button"
                            text="Добавить в tail"
                            disabled={!newItem}
                            onClick={addToTail}
                        />
                        <Button type="button" text="Удалить из head" onClick={removeFromHead} />
                        <Button type="button" text="Удалить из tail" onClick={removeFromTail} />
                    </div>
                    <div className={styles['stack-form__input-container']}>
                        <Input
                            value={index}
                            onChange={handleIndexChange}
                            placeholder="Введите индекс"
                        />
                        <Button
                            type="button"
                            text="Добавить по индексу"
                            disabled={!newItem || !index}
                            onClick={insertAtIndex}
                        />
                        <Button
                            type="button"
                            text="Удалить по индексу"
                            onClick={deleteAtIndex}
                            disabled={!index}
                        />
                    </div>
                </div>
            </form>
            <section className={styles['display-wrapper']}>
                <ListDisplay linkedList={linkedList} newItem={newItem} />
            </section>
        </SolutionLayout>
    )
}
