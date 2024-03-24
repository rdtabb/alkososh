import React, { memo, useMemo } from 'react'

import { Circle } from '../../ui/circle/circle'
import { SecondaryCircle } from '../../ui/circle/secondary-circle'
import { ElementStates } from '../../types/element-states'
import styles from '../stack-page/stack-page.module.css'

import { LinkedList, ListNode, useListPageContext } from './list-page.state'
import { ArrowIcon } from '../../ui/icons/arrow-icon'

interface ListDisplayProps {
    linkedList: LinkedList | null
    newItem: string
}

export const ListDisplay = memo(({ linkedList, newItem }: ListDisplayProps) => {
    const {
        isAddingToTail,
        isAddingToHead,
        isDeletingFromHead,
        isDeletingFromTail,
        performedIndex,
        performingIndecies,
        isInserting
    } = useListPageContext()

    const listElements = (): JSX.Element[] => {
        const elements: JSX.Element[] = []

        if (!linkedList?.head) {
            return elements
        }

        let current: ListNode<string> | null = linkedList.head
        let index = 0

        while (current) {
            const isHead = index === 0
            const isTail = !current.next

            function getItemState(): ElementStates {
                if (performingIndecies.includes(index)) {
                    return ElementStates.Changing
                }

                if (performedIndex === index) {
                    return ElementStates.Modified
                }

                if (isHead && (isAddingToHead || isDeletingFromHead)) {
                    return ElementStates.Changing
                }

                if (isTail && (isAddingToTail || isDeletingFromTail)) {
                    return ElementStates.Changing
                }

                return ElementStates.Default
            }

            const getTail = (): string | JSX.Element => {
                if (isTail && !isAddingToTail) {
                    return 'tail'
                }

                if (isTail && isAddingToTail) {
                    return <SecondaryCircle value={newItem} />
                }

                return ''
            }

            const getHead = (): string | JSX.Element => {
                if (isHead && !isAddingToHead) {
                    return 'head'
                }

                if (isHead && isAddingToHead) {
                    return <SecondaryCircle value={newItem} />
                }

                if (isInserting && performingIndecies.at(-1) === index) {
                    return <SecondaryCircle value={newItem} />
                }

                return ''
            }

            const circle = (
                <>
                    <Circle
                        as={'li'}
                        key={index}
                        index={index}
                        letter={current.value}
                        head={getHead()}
                        tail={getTail()}
                        state={getItemState()}
                    />
                    {!isTail && <ArrowIcon key={index + 1} />}
                </>
            )

            current = current.next
            index++
            elements.push(circle)
        }

        return elements
    }

    return <ul className={styles['stack']}>{listElements()}</ul>
})
