import React, { memo, useMemo } from 'react'

import { Circle } from '../../ui/circle/circle'
import { ElementStates } from '../../types/element-states'
import styles from '../stack-page/stack-page.module.css'

import { LinkedList, ListNode, useListPageContext } from './list-page.state'

interface ListDisplayProps {
    linkedList: LinkedList | null
}

export const ListDisplay = memo(({ linkedList }: ListDisplayProps) => {
    const { isAddingToTail, isAddingToHead, isDeletingFromHead, isDeletingFromTail } =
        useListPageContext()

    const listElements = useMemo((): JSX.Element[] => {
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
                if (isHead && (isAddingToHead || isDeletingFromHead)) {
                    return ElementStates.Changing
                }

                if (isTail && (isAddingToTail || isDeletingFromTail)) {
                    return ElementStates.Changing
                }

                return ElementStates.Default
            }

            const circle = (
                <Circle
                    index={index}
                    letter={current.value}
                    head={isHead ? 'head' : ''}
                    tail={isTail ? 'tail' : ''}
                    state={getItemState()}
                />
            )

            current = current.next
            index++
            elements.push(circle)
        }

        return elements
    }, [linkedList])

    return <ul className={styles['stack']}>{listElements}</ul>
})
