import React, { useState, useCallback, useEffect, ChangeEvent } from 'react'

import { SolutionLayout } from '../../ui/solution-layout/solution-layout'
import { preventDefault, performDelay } from '../../utils/utils'
import styles from '../common-form-layout.module.css'

import { FibonacciDisplay } from './fibonacci-display'
import { fibonacci, FIBONACCI_ACTION_DURATION } from './fibonacci-page.state'
// если имортировать из общей папки ui - у компонентов сбросятся стили по всей прилажке
// копирование в локальную папку страницы решило проблему
import { Button, Input } from './ui'

export const FibonacciPage = () => {
    const [newItem, setNewItem] = useState<string>('')
    const [isPerforming, setIsPerforming] = useState<boolean>(false)
    const [fibonacciSequence, setFibonacciSequence] = useState<number[]>([])

    const handleNewItemChange = useCallback((event: ChangeEvent<HTMLInputElement>): void => {
        setNewItem(event.target.value)
    }, [])

    const performFibonacci = useCallback(async (): Promise<void> => {
        if (parseInt(newItem) > 19) {
            return
        }

        const number = parseInt(newItem)
        const sequence: number[] = []
        for (let i = 1; i <= number; i++) {
            sequence.push(fibonacci(i))
            setFibonacciSequence([...sequence])
            await performDelay({
                delayInMs: FIBONACCI_ACTION_DURATION,
                setIsDelayPerforming: setIsPerforming
            })
        }
    }, [newItem])

    useEffect(() => {
        const enterHandler = (event: KeyboardEvent) => {
            if (event.key === 'Enter' && newItem && !isPerforming) {
                performFibonacci()
            }
        }

        document.addEventListener('keydown', enterHandler)

        return () => document.removeEventListener('keydown', enterHandler)
    }, [performFibonacci])

    return (
        <SolutionLayout title="Последовательность Фибоначчи">
            <form onSubmit={preventDefault} className={styles['form']}>
                <div className={styles['form__input-container']}>
                    <Input
                        value={newItem}
                        onChange={handleNewItemChange}
                        isLimitText
                        max={'19'}
                        type="number"
                    />
                    <Button
                        type="button"
                        text="Рассчитать"
                        onClick={performFibonacci}
                        disabled={!newItem || isPerforming}
                        isLoader={isPerforming}
                    />
                </div>
            </form>
            <section className={styles['display-wrapper']}>
                <FibonacciDisplay fibonacciSequence={fibonacciSequence} />
            </section>
        </SolutionLayout>
    )
}
