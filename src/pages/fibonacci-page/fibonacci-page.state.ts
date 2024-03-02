export function fibonacci(number: number): number {
    if (number <= 1) {
        return number
    }

    return fibonacci(number - 1) + fibonacci(number - 2)
}

export const FIBONACCI_ACTION_DURATION = 500
