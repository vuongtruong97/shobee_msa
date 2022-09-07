export const handleStatus = (status) => {
    switch (status) {
        case 'PENDING':
            return 'CHỜ XÁC NHẬN'
        case 'CONFIRM':
            return 'CHỜ LẤY HÀNG'
        case 'SHIPPING':
            return 'ĐANG GIAO'
        case 'COMPLETED':
            return 'ĐÃ GIAO'
        case 'CANCELLED':
            return 'ĐÃ HUỶ'
        case 'REFUND':
            return 'TRẢ HÀNG, HOÀN TIỀN'
    }
}
