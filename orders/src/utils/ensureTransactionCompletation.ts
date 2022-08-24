import { ClientSession } from 'mongoose'

export async function ensureTransactionCompletion(
    session: ClientSession,
    maxRetryCount: number = 50
) {
    // When we are trying to split our operations into multiple transactions
    // Sometimes we are getting an error that the earlier transaction is still in progress
    // To avoid that, we ensure the earlier transaction has finished
    let count = 0
    while (session.inTransaction()) {
        if (count >= maxRetryCount) {
            break
        }
        // Adding a delay so that the transaction get be committed
        await new Promise((r) => setTimeout(r, 100))
        count++
    }
}
