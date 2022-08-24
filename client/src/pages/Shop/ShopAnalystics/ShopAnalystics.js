import React from 'react'
import styles from './ShopAnalystics.module.scss'
import { Link } from 'react-router-dom'
import {
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
    LineChart,
    Line,
} from 'recharts'
import DivStyle1 from 'common-components/UI/Div/DivStyle1'
import DivStyle2 from 'common-components/UI/Div/DivStyle2'

const data = [
    {
        name: 'Thứ 2',
        sales_revenue: 5000,
        orders: 2400,
        views: 2400,
    },
    {
        name: 'Thứ 3',
        sales_revenue: 3000,
        orders: 1398,
        views: 2210,
    },
    {
        name: 'Thứ 4',
        sales_revenue: 2000,
        orders: 9800,
        views: 2290,
    },
    {
        name: 'Thứ 5',
        sales_revenue: 2780,
        orders: 3908,
        views: 2000,
    },
    {
        name: 'Thứ 6',
        sales_revenue: 1890,
        orders: 4800,
        views: 2181,
    },
    {
        name: 'Thứ 7',
        sales_revenue: 2390,
        orders: 3800,
        views: 2500,
    },
    {
        name: 'Chủ nhật',
        sales_revenue: 3490,
        orders: 4300,
        views: 2100,
    },
]

function ShopAnalystics() {
    return (
        <>
            <DivStyle1>
                <div className={styles.todo}>
                    <h2 className={styles.title}>Danh sách cần làm</h2>
                    <div className='row'>
                        <div className='col col-6 lg-3' style={{ marginBottom: '1rem' }}>
                            <DivStyle2 hover style={{ padding: '1rem', height: '100%' }}>
                                <Link to='#'>
                                    <div className={styles.todoInfo}>
                                        <b>23</b>
                                    </div>
                                    <div className={styles.todoName}>Chờ xác nhận</div>
                                </Link>
                            </DivStyle2>
                        </div>
                        <div className='col col-6 lg-3' style={{ marginBottom: '1rem' }}>
                            <DivStyle2 hover style={{ padding: '1rem', height: '100%' }}>
                                <Link to='#'>
                                    <div className={styles.todoInfo}>
                                        <b>23</b>
                                    </div>
                                    <div className={styles.todoName}>Chờ lấy hàng</div>
                                </Link>
                            </DivStyle2>
                        </div>
                        <div className='col col-6 lg-3' style={{ marginBottom: '1rem' }}>
                            <DivStyle2 hover style={{ padding: '1rem', height: '100%' }}>
                                <Link to='#'>
                                    <div className={styles.todoInfo}>
                                        <b>0</b>
                                    </div>
                                    <div className={styles.todoName}>
                                        Sản phẩm hết hàng
                                    </div>
                                </Link>
                            </DivStyle2>
                        </div>
                        <div className='col col-6 lg-3' style={{ marginBottom: '1rem' }}>
                            <DivStyle2 hover style={{ padding: '1rem', height: '100%' }}>
                                <Link to='#'>
                                    <div className={styles.todoInfo}>
                                        <b>2</b>
                                    </div>
                                    <div className={styles.todoName}>
                                        Sản phẩm bị khoá
                                    </div>
                                </Link>
                            </DivStyle2>
                        </div>
                    </div>
                </div>
            </DivStyle1>

            <DivStyle1 style={{ marginTop: '2rem' }}>
                <div className='row' style={{ padding: '2rem' }}>
                    <div className='col col-12 lg-8' style={{ height: '500px' }}>
                        <div>
                            <h2 className={styles.title}>Số liệu</h2>
                        </div>
                        <div className={styles.chartControl}></div>
                        <div className={styles.analystics}>
                            <ResponsiveContainer>
                                <LineChart
                                    data={data}
                                    margin={{
                                        top: 10,
                                        right: 30,
                                        left: 0,
                                        bottom: 0,
                                    }}
                                >
                                    <CartesianGrid strokeDasharray='3 3' />
                                    <XAxis dataKey='name' />
                                    <YAxis />
                                    <Tooltip />
                                    <Line
                                        type='monotone'
                                        dataKey='sales_revenue'
                                        stroke='#23049D'
                                    />
                                    <Line
                                        type='monotone'
                                        dataKey='views'
                                        stroke='#81B214'
                                    />
                                    <Line
                                        type='monotone'
                                        dataKey='orders'
                                        stroke='#FF2442'
                                    />
                                </LineChart>
                            </ResponsiveContainer>
                        </div>
                    </div>
                    <div className='col col-12 lg-4'>
                        <div className={styles.dataInfo}>
                            <div className={styles.inforItem}>
                                <h5>Luợt truy cập</h5>
                                <b>34</b>
                            </div>
                            <div className={styles.inforItem}>
                                <h5>Lượt xem</h5>
                                <b>34</b>
                            </div>
                            <div className={styles.inforItem}>
                                <h5>Đơn hàng</h5>
                                <b>34</b>
                            </div>
                            <div className={styles.inforItem}>
                                <h5>Tỷ lệ chuyển đổi</h5>
                                <b>34</b>
                            </div>
                        </div>
                    </div>
                </div>
            </DivStyle1>
        </>
    )
}

export default ShopAnalystics
