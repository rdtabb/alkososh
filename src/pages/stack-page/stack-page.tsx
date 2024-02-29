import React, { ChangeEvent, useCallback, useState, useEffect } from 'react'

import { useAtom } from 'jotai'

import { Button } from '../../ui/button/button'
import { Input } from '../../ui/input/input'
import { SolutionLayout } from '../../ui/solution-layout/solution-layout'
import { preventDefault, performDelay } from '../../utils/utils'

import { StackDisplay } from './stack-display'
import styles from './stack-page.module.css'
import { stackAtom, stackController, STACK_CONTROLLER_ACTION_DURATION } from './stack-page.state'

export const StackPage = () => {
    const [newItem, setNewItem] = useState<string>('')
    const [isItemAdding, setIsItemAdding] = useState<boolean>(false)
    const [isItemDeleting, setIsItemDeleting] = useState<boolean>(false)
    const [stack, setStack] = useAtom(stackAtom)

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
            setStack([])
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
                        disabled={!newItem}
                        isLoader={isItemAdding}
                    />
                    <Button
                        type="button"
                        text="Удалить"
                        onClick={popFromStack}
                        disabled={!stack.length}
                    />
                </div>
                <Button
                    type="reset"
                    text="Очистить"
                    onClick={clearStack}
                    disabled={!stack.length}
                />
            </form>
            <StackDisplay isPerformingStackAction={isItemDeleting || isItemAdding} />
        </SolutionLayout>
    )
}
