import React, { Suspense, useEffect } from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { ROLES } from 'constants/roles.constants'
import userAPI from 'services/user-api/user-api'
import cartAPI from 'services/cart-api/cart-api'
import { userActions } from 'store/userSlice/userSlice'
import RequireAuth from 'common-components/RequireAuth/RequireAuth'

import ToastContainer from 'common-components/UI/Toast/Toast'
import Loading from './pages/Loading/Loading'
import MainLayout from 'common-components/Layouts/MainLayout/MainLayout'

const AuthLayout = React.lazy(() =>
    import('common-components/Layouts/AuthLayout/AuthLayout')
)
const AdminLayout = React.lazy(() =>
    import('common-components/Layouts/AdminLayout/AdminLayout')
)

const Product = React.lazy(() => import('./pages/Product/Product'))
const Dashboard = React.lazy(() => import('./pages/Dashboard/Dashboard'))
const Blog = React.lazy(() => import('./pages/Blog/Blog'))
const Home = React.lazy(() => import('./pages/Home/Home'))
const User = React.lazy(() => import('./pages/User/User'))
const Category = React.lazy(() => import('./pages/Category/Category'))
const Cart = React.lazy(() => import('./pages/Cart/Cart'))
const CartCheckout = React.lazy(() => import('./pages/Cart/CartCheckout'))

const RegisterShop = React.lazy(() => import('./pages/Shop/RegisterShop'))
const ShopAnalystics = React.lazy(() =>
    import('./pages/Shop/ShopAnalystics/ShopAnalystics')
)
const ManageProducts = React.lazy(() =>
    import('./pages/Shop/ManageProducts/ManageProducts')
)
const ProductsTable = React.lazy(() =>
    import('./pages/Shop/components/ProductsTable/ProductsTable')
)
const AddProduct = React.lazy(() =>
    import('./pages/Shop/components/AddProduct/AddProduct')
)

const Chat = React.lazy(() => import('./pages/Shop/Chat/Chat'))

const AuthPage = React.lazy(() => import('./pages/Auth/AuthPage'))

const Welcome = React.lazy(() => import('./pages/Welcome/Welcome'))
const NotFound = React.lazy(() => import('./pages/NotFound/NotFound'))
const NotAuthorPage = React.lazy(() => import('./pages/NotFound/NotAuthor'))

const Profile = React.lazy(() => import('./pages/User/Profile/Profile'))
const Address = React.lazy(() => import('./pages/User/Address/Address'))

function App() {
    const isLoggedIn = useSelector((state) => state.user.isLoggedIn)

    const dispatch = useDispatch()
    //check user login and set user infor to redux

    if (isLoggedIn) {
        userAPI
            .getUserInfo()
            .then((res) => dispatch(userActions.setUserInfo(res.data.data)))

        cartAPI
            .getCartList({ limit: 5 })
            .then((res) => dispatch(userActions.setCartInfo(res.data.data)))
    }

    return (
        <>
            <Suspense fallback={<Loading />}>
                <Routes>
                    {/* User view */}
                    <Route path='/welcome' element={<Welcome />}>
                        <Route index path='new-user' element={<h2>Hello New User</h2>} />
                    </Route>

                    <Route path='/' element={<MainLayout />}>
                        <Route index element={<Home />} />
                        <Route path='/category/:category' element={<Category />} />
                        <Route path='product/:id' element={<Product />} />
                        <Route path='blog' element={<Blog />} />

                        <Route element={<RequireAuth />}>
                            <Route path='shop/register' element={<RegisterShop />} />
                        </Route>

                        <Route
                            element={
                                <RequireAuth
                                    allowRoles={[ROLES.SELLER, ROLES.USER, ROLES.ADMIN]}
                                />
                            }
                        >
                            <Route path='cart' element={<Cart />} />
                            <Route path='checkout' element={<CartCheckout />} />
                        </Route>

                        <Route
                            element={
                                <RequireAuth
                                    allowRoles={[ROLES.SELLER, ROLES.USER, ROLES.ADMIN]}
                                />
                            }
                        >
                            <Route path='user' element={<User />}>
                                <Route path='profile' element={<Profile />} />
                                <Route path='address' element={<Address />} />
                                <Route path='password' element={<Address />} />
                                <Route path='orders' element={<Profile />} />
                                <Route path='notifications' element={<Profile />} />
                                <Route path='vouchers' element={<Profile />} />
                            </Route>
                        </Route>
                    </Route>

                    <Route path='/auth' element={<AuthLayout />}>
                        <Route path='register' element={<AuthPage />} />
                        <Route path='login' element={<AuthPage />} />
                    </Route>

                    {/* Admin Manage */}
                    <Route element={<RequireAuth allowRoles={['ADMIN']} />}>
                        <Route path='/admin' element={<AdminLayout />}>
                            <Route path='dashboard' element={<Dashboard />} />
                        </Route>
                    </Route>

                    {/* Shop Manage */}
                    <Route element={<RequireAuth allowRoles={['SELLER', 'ADMIN']} />}>
                        <Route path='shop-manage/*' element={<AdminLayout />}>
                            <Route index element={<ShopAnalystics />} />
                            <Route path='products' element={<ManageProducts />}>
                                <Route index element={<ProductsTable />} />
                                <Route path='add' element={<AddProduct />} />
                            </Route>
                            <Route path='chat' element={<Chat />} />
                        </Route>
                    </Route>

                    <Route path='/not-author' element={<NotAuthorPage />} />
                    <Route path='*' element={<NotFound />} />
                </Routes>
            </Suspense>
            <ToastContainer />
        </>
    )
}

export default App
