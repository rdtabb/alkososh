import React, { ChangeEvent, useCallback, useState } from 'react'

import { Direction } from '../../types/direction'
import { ElementStates } from '../../types/element-states'
import { Button } from '../../ui/button/button'
import { RadioInput } from '../../ui/radio-input/radio-input'
import { SolutionLayout } from '../../ui/solution-layout/solution-layout'
import { preventDefault, performDelay } from '../../utils/utils'
import styles from '../common-form-layout.module.css'

import { SortingDisplay } from './sorting-display'

type SelectedType = 'selection' | 'bubble'

function getRandomArray() {
    const size = Math.floor(Math.random() * 15) + 3
    return Array(size)
        .fill(0)
        .map(() => Math.floor(Math.random() * 101))
}

export const SortingPage = () => {
    const [selectedType, setSelectedType] = useState<SelectedType>('bubble')
    const [randomArray, setRandomArray] = useState<number[]>(getRandomArray())
    const [isSorting, setIsSorting] = useState<boolean>(false)
    const [modIndecies, setModindecies] = useState<number[]>([])
    const [currChangingIndecies, setCurrChangingIndecies] = useState<number[]>([])

    const handleRadioChange = useCallback((event: ChangeEvent<HTMLInputElement>) => {
        setSelectedType(event.target.value as SelectedType)
    }, [])

    const bubbleSort = useCallback(
        async (direction: Direction): Promise<void> => {
            setIsSorting(true)
            const array = structuredClone(randomArray)

            for (let i = 0; i < array.length; i++) {
                for (let j = 0; j < array.length - i - 1; j++) {
                    setCurrChangingIndecies([j, j + 1])
                    await performDelay({ delayInMs: 500, setIsDelayPerforming: setIsSorting })
                    if (direction === Direction.Ascending) {
                        if (array[j] > array[j + 1]) {
                            const temp = array[j]
                            array[j] = array[j + 1]
                            array[j + 1] = temp
                            setModindecies((prev) => [...prev, j, j + 1])
                            setRandomArray([...array])
                        }
                    } else {
                        if (array[j] < array[j + 1]) {
                            const temp = array[j]
                            array[j] = array[j + 1]
                            array[j + 1] = temp
                            setModindecies((prev) => [...prev, j, j + 1])
                            setRandomArray([...array])
                        }
                    }
                }
            }

            setIsSorting(false)
            setModindecies([])
            setCurrChangingIndecies([])
        },
        [randomArray]
    )

    const selectionSort = useCallback(
        async (direction: Direction): Promise<void> => {
            setIsSorting(true)
            const array = structuredClone(randomArray)
            const n = array.length
            for (let i = 0; i < n; i++) {
                let min = i
                await performDelay({ delayInMs: 500, setIsDelayPerforming: setIsSorting })
                if (direction === Direction.Ascending) {
                    for (let j = i + 1; j < n; j++) {
                        if (array[j] < array[min]) {
                            min = j
                        }
                    }
                } else {
                    for (let j = i + 1; j < n; j++) {
                        if (array[j] > array[min]) {
                            min = j
                        }
                    }
                }
                if (min != i) {
                    const tmp = array[i]
                    array[i] = array[min]
                    array[min] = tmp
                    setCurrChangingIndecies([min, i])
                    setModindecies((prev) => [...prev, i, min])
                    setRandomArray([...array])
                }
            }
            setIsSorting(false)
            setModindecies([])
            setCurrChangingIndecies([])
        },
        [randomArray]
    )

    const handleSort = useCallback(
        (direction: Direction) => (): void => {
            if (selectedType === 'bubble') {
                bubbleSort(direction)
                return
            }

            selectionSort(direction)
        },
        [selectedType]
    )

    const columnState = useCallback(
        (idx: number): ElementStates => {
            if (currChangingIndecies.includes(idx)) {
                return ElementStates.Changing
            }

            if (modIndecies.includes(idx)) {
                return ElementStates.Default
            }

            return ElementStates.Default
        },
        [modIndecies, currChangingIndecies]
    )

    const generateNewArray = useCallback((): void => {
        setRandomArray([...getRandomArray()])
    }, [])

    return (
        <SolutionLayout title="Сортировка массива">
            <form className={styles['form']} onSubmit={preventDefault}>
                <RadioInput
                    label={'Выбор'}
                    value="selection"
                    checked={selectedType === 'selection'}
                    onChange={handleRadioChange}
                />
                <RadioInput
                    label={'Пузырёк'}
                    value="bubble"
                    checked={selectedType === 'bubble'}
                    onChange={handleRadioChange}
                />
                <div style={{ display: 'flex', gap: '8px' }}>
                    <Button
                        text="По возрастанию"
                        sorting={Direction.Ascending}
                        type="button"
                        onClick={handleSort(Direction.Ascending)}
                        value={Direction.Ascending}
                    />
                    <Button
                        text="По убыванию"
                        sorting={Direction.Descending}
                        type="button"
                        onClick={handleSort(Direction.Descending)}
                        value={Direction.Descending}
                    />
                    <Button
                        text="Новый массив"
                        type="button"
                        onClick={generateNewArray}
                        disabled={isSorting}
                    />
                </div>
            </form>
            <SortingDisplay array={randomArray} columnState={columnState} />
        </SolutionLayout>
    )
}
