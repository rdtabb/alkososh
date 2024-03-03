import React, { memo, useMemo } from 'react'

import styles from '../stack-page/stack-page.module.css'

import { LinkedList, ListNode } from './list-page.state'

interface ListDisplayProps {
    linkedList: LinkedList | null
}

export const ListDisplay = memo(({ linkedList }: ListDisplayProps) => {
    const listElements = useMemo((): JSX.Element[] => {
        const elements: JSX.Element[] = []

        if (!linkedList?.head) {
            return elements
        }

        let current: ListNode<string> | null = linkedList.head
        let index = 0

        while (current) {
            const elem = (
                <li key={index} className={styles['stack__item']}>
                    <p className={styles['stack__item-value']}>{current.value}</p>
                    <p style={{ margin: 0 }}>{index}</p>
                </li>
            )

            current = current.next
            index++
            elements.push(elem)
        }

        return elements
    }, [linkedList])

    return <ul className={styles['stack']}>{listElements}</ul>
})
