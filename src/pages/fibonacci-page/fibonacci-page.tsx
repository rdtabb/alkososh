import React, { useState, useCallback, useEffect, type ChangeEvent } from 'react'

import styles from '../common-form-layout.module.css'
import { Input } from '../../ui/input/input'
import { Button } from '../../ui/button/button'
import { SolutionLayout } from '../../ui/solution-layout/solution-layout'
import { preventDefault, performDelay } from '../../utils/utils'

import { fibonacci, FIBONACCI_ACTION_DURATION } from './fibonacci-page.state'
import { FibonacciDisplay } from './fibonacci-display'

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
        for (let i = 0; i < number; i++) {
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
                        isLimitText
                        max={'19'}
                        type="number"
                        value={newItem}
                        onChange={handleNewItemChange}
                    />
                    <Button
                        type="button"
                        text="Рассчитать"
                        onClick={performFibonacci}
                        disabled={!newItem || isPerforming}
                    />
                </div>
            </form>
            <section className={styles['display-wrapper']}>
                <FibonacciDisplay
                    fibonacciSequence={fibonacciSequence}
                    isPerforming={isPerforming}
                />
            </section>
        </SolutionLayout>
    )
}
