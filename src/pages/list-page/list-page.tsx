import React, { useState, useCallback, useEffect, ChangeEvent } from 'react'

import { Button } from '../../ui/button/button'
import { Input } from '../../ui/input/input'
import { SolutionLayout } from '../../ui/solution-layout/solution-layout'
import { preventDefault } from '../../utils/utils'
import styles from '../stack-page/stack-page.module.css'

import { ListDisplay } from './list-display'
import { LinkedList, linkedListController } from './list-page.state'

export const ListPage = (): JSX.Element => {
    const [newItem, setNewItem] = useState<string>('')
    const [index, setIndex] = useState<string>('')
    const [linkedList, setLinkedList] = useState<LinkedList | null>(null)

    const handleNewItemChange = useCallback((event: ChangeEvent<HTMLInputElement>): void => {
        setNewItem(event.target.value)
    }, [])

    const handleIndexChange = useCallback((event: ChangeEvent<HTMLInputElement>): void => {
        setIndex(event.target.value)
    }, [])

    const addToTail = useCallback((): void => {
        linkedListController.addToTail(newItem)
        setLinkedList(linkedListController.getList())
        setNewItem('')
    }, [newItem])

    const addToHead = useCallback((): void => {
        linkedListController.addToHead(newItem)
        setLinkedList(linkedListController.getList())
    }, [newItem])

    const removeFromHead = useCallback((): void => {
        linkedListController.removeFromHead()
        setLinkedList(linkedListController.getList())
    }, [])

    const removeFromTail = useCallback((): void => {
        linkedListController.removeFromTail()
        setLinkedList(linkedListController.getList())
    }, [])

    const insertAtIndex = useCallback((): void => {
        linkedListController.insertAtIndex(parseInt(index), newItem)
        setLinkedList(linkedListController.getList())
        console.log(linkedListController)
    }, [index, newItem])

    const deleteAtIndex = useCallback((): void => {
        linkedListController.deleteAtIndex(parseInt(index))
        setLinkedList(linkedListController.getList())
    }, [index])

    useEffect(() => {
        const enterHandler = (event: KeyboardEvent): void => {
            if (event.key === 'Enter' && newItem) {
                addToTail()
            }
        }

        document.addEventListener('keydown', enterHandler)

        return () => document.removeEventListener('keydown', enterHandler)
    }, [addToTail])

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
                <ListDisplay linkedList={linkedList} />
            </section>
        </SolutionLayout>
    )
}
