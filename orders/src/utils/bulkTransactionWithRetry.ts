import { ClientSession, startSession } from 'mongoose'

export const bulkTransactionWithRetry = async (
    callback: (session: ClientSession) => Promise<void>,
    retry: number
) => {
    let count = 1
    const session: ClientSession = await startSession()

    session.startTransaction()
    console.log('----------------------------')
    console.log('Bắt đầu thực hiện giao dịch')
    try {
        await callback(session)
        console.log('Giao dịch thành công')
        await session.commitTransaction()
    } catch (error: any) {
        // If transient error, retry the whole transaction
        // Nếu có lỗi tạm thời, thực hiện lại toàn bộ giao dịch
        if (
            error.errorLabels &&
            error.errorLabels.indexOf('TransientTransactionError') >= 0 &&
            count <= retry
        ) {
            console.log('Lỗi giao dịch tạm thời, thực hiện lại giao dịch lần: ', count)
            await bulkTransactionWithRetry(callback, retry)
        } else {
            console.log('Huỷ bỏ giao dịch, có lỗi xảy ra')
            await session.abortTransaction()
            await session.endSession()
            throw error
        }
    }
}
