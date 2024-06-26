import React, { ChangeEvent, useCallback, useState, useEffect, useMemo } from 'react'

import { Button } from '../../ui/button/button'
import { Input } from '../../ui/input/input'
import { SolutionLayout } from '../../ui/solution-layout/solution-layout'
import { preventDefault, performDelay } from '../../utils/utils'

import { StackDisplay } from './stack-display'
import styles from './stack-page.module.css'
import { stackController, STACK_CONTROLLER_ACTION_DURATION, StackItem } from './stack-page.state'

export const StackPage = (): JSX.Element => {
    const [newItem, setNewItem] = useState<string>('')
    const [isItemAdding, setIsItemAdding] = useState<boolean>(false)
    const [isItemDeleting, setIsItemDeleting] = useState<boolean>(false)
    const [stack, setStack] = useState<StackItem[]>([])

    const isPerformingStackAction = useMemo(
        () => isItemDeleting || isItemAdding,
        [isItemDeleting, isItemAdding]
    )

    const handleNewItemChange = useCallback((event: ChangeEvent<HTMLInputElement>): void => {
        setNewItem(event.target.value)
    }, [])

    const pushToStack = useCallback((): void => {
        if (!newItem) return

        setNewItem('')
        stackController.push({ value: newItem, id: Date.now(), isHead: true })
        setStack(stackController.getItems())
        performDelay({
            delayInMs: STACK_CONTROLLER_ACTION_DURATION,
            setIsDelayPerforming: setIsItemAdding
        })
    }, [setStack, newItem])

    const popFromStack = useCallback(async (): Promise<void> => {
        await performDelay({
            delayInMs: STACK_CONTROLLER_ACTION_DURATION,
            setIsDelayPerforming: setIsItemDeleting
        })
        stackController.pop()
        setStack(stackController.getItems())
    }, [setStack])

    const clearStack = useCallback((): void => {
        setNewItem('')
        stackController.clear()
        setStack([])
    }, [setStack])

    useEffect(() => {
        const enterHandler = (event: KeyboardEvent) => {
            if (event.key === 'Enter' && newItem && !isItemAdding) {
                pushToStack()
            }
        }

        document.addEventListener('keydown', enterHandler)

        return () => document.removeEventListener('keydown', enterHandler)
    }, [pushToStack])

    useEffect(
        () => () => {
            stackController.clear()
        },
        []
    )

    return (
        <SolutionLayout title="Стек">
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
                        onClick={pushToStack}
                        disabled={!newItem || isItemDeleting}
                        isLoader={isItemAdding}
                    />
                    <Button
                        type="button"
                        text="Удалить"
                        onClick={popFromStack}
                        disabled={!stack.length}
                        isLoader={isItemDeleting}
                    />
                </div>
                <Button
                    type="reset"
                    text="Очистить"
                    onClick={clearStack}
                    disabled={!stack.length}
                />
            </form>
            <section className={styles['display-wrapper']}>
                <StackDisplay stack={stack} isPerformingStackAction={isPerformingStackAction} />
            </section>
        </SolutionLayout>
    )
}
