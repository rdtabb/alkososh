import React, { useState, useCallback, ChangeEvent } from 'react'

import { Button } from '../../ui/button/button'
import { Input } from '../../ui/input/input'
import { SolutionLayout } from '../../ui/solution-layout/solution-layout'
import { preventDefault, performDelay } from '../../utils/utils'
import styles from '../common-form-layout.module.css'

import { StringDisplay } from './string-display'

const STRING_ACTION_DURATION = 1000

function swapArrayItems<T extends Array<any>>(array: T, index1: number, index2: number) {
    ;[array[index1], array[index2]] = [array[index2], array[index1]]
}

export const StringPage = () => {
    const [newItem, setNewItem] = useState<string>('')
    const [string, setString] = useState<string[]>([])
    const [isReversing, setIsReversing] = useState<boolean>(false)
    const [performingIndexes, setPerformingIndexes] = useState<{
        index1: number | null
        index2: number | null
    }>({ index1: null, index2: null })

    const handleNewItemChange = useCallback((event: ChangeEvent<HTMLInputElement>): void => {
        setNewItem(event.target.value)
    }, [])

    const performReverse = useCallback(async (): Promise<void> => {
        if (!newItem) {
            return
        }

        setIsReversing(true)
        let startIdx = 0
        let endIdx = newItem.length - 1
        const stringArr = newItem.split('')

        while (startIdx < endIdx) {
            swapArrayItems<string[]>(stringArr, startIdx, endIdx)
            setPerformingIndexes({ index1: startIdx, index2: endIdx })
            setString([...stringArr])
            await performDelay({
                delayInMs: STRING_ACTION_DURATION
            })

            startIdx++
            endIdx--
        }

        setPerformingIndexes({ index1: null, index2: null })
        setIsReversing(false)
    }, [newItem])

    return (
        <SolutionLayout title="Строка">
            <form onSubmit={preventDefault} className={styles['form']}>
                <div className={styles['form__input-container']}>
                    <Input value={newItem} onChange={handleNewItemChange} />
                    <Button
                        type="button"
                        text="развернуть"
                        onClick={performReverse}
                        disabled={!newItem || isReversing}
                        isLoader={isReversing}
                    />
                </div>
            </form>
            <section className={styles['display-wrapper']}>
                <StringDisplay
                    string={string}
                    performingIndex1={performingIndexes.index1}
                    performingIndex2={performingIndexes.index2}
                />
            </section>
        </SolutionLayout>
    )
}
