import React from 'react'
import styles from './Footer.module.scss'
import commonLogo from '../../../assets/images/payment.png'
import qr from '../../../assets/images/qrImg.png'
import applePng from '../../../assets/images/apple_store.png'
import googlePlayPng from '../../../assets/images/googleplay.png'
import appgalleryPng from '../../../assets/images/appgallery.png'

import { BsFacebook, BsInstagram, BsLinkedin } from 'react-icons/bs'

function Footer() {
    return (
        <footer className={styles.footer}>
            <hr className={styles.line}></hr>
            <div className='container'>
                <div className={styles.section}>
                    <div className={styles.about}>
                        <h4 className={styles.title}>
                            SHOBEE - GÌ CŨNG CÓ, MUA HẾT Ở SHOBEE
                        </h4>
                        <p className={styles.paragraph}>
                            Shobee - ứng dụng mua sắm trực tuyến thú vị, tin cậy, an toàn
                            và miễn phí! Shobee là nền tảng giao dịch trực tuyến hàng đầu
                            ở Đông Nam Á, có trụ sở chính ở Singapore, đã có mặt ở khắp
                            các khu vực Singapore, Malaysia, Indonesia, Thái Lan,
                            Philippines, Đài Loan, Brazil, México, Colombia, Chile,
                            Poland, Spain, Argentina. Với sự đảm bảo của Shobee, bạn sẽ
                            mua hàng trực tuyến an tâm và nhanh chóng hơn bao giờ hết!
                        </p>
                    </div>
                    <div className={styles.about}>
                        <h4 className={styles.title}>
                            MUA SẮM VÀ BÁN HÀNG ONLINE ĐƠN GIẢN, NHANH CHÓNG VÀ AN TOÀN
                        </h4>
                        <p className={styles.paragraph}>
                            Nếu bạn đang tìm kiếm một trang web để mua và bán hàng trực
                            tuyến thì shobee.snobdev.online là một sự lựa chọn tuyệt vời
                            dành cho bạn. Bản chất của Shobee là một social E-commerce
                            platform - nền tảng trang web thương mại điện tử tích hợp mạng
                            xã hội. Điều này cho phép người mua và người bán hàng dễ dàng
                            tương tác, trao đổi thông tin về sản phẩm và chương trình
                            khuyến mãi của shop. Nhờ nền tảng đó, việc mua bán trên Shobee
                            trở nên nhanh chóng và đơn giản hơn. Bạn có thể trò chuyện
                            trực tiếp với nhà bán hàng để hỏi trực tiếp về mặt hàng cần
                            mua. Còn nếu bạn muốn tìm mua những dòng sản phẩm chính hãng,
                            uy tín, Shobee Mall chính là sự lựa chọn lí tưởng dành cho
                            bạn. Để bạn có thể dễ dàng khi tìm hiểu và sử dụng sản phẩm,
                            Shobee Blog- trang blog thông tin chính thức của Shobee - sẽ
                            giúp bạn có thể tìm được cho mình các kiến thức về xu hướng
                            thời trang, review công nghệ, mẹo làm đẹp, tin tức tiêu dùng
                            và deal giá tốt bất ngờ.
                        </p>
                    </div>
                </div>
                <hr></hr>
            </div>
            <div className='container'>
                <div className={styles.section}>
                    <div className='row'>
                        <div className='col col-12 sm-3 md-3 lg-3 xl-3'>
                            <div className={styles.title}>CHĂM SÓC KHÁCH HÀNG</div>
                            <div className={styles.options}>
                                <div className={styles.option}>Trung Tâm Trợ Giúp</div>
                                <div className={styles.option}>Shobee Blog</div>
                                <div className={styles.option}>Shobee Mall</div>
                                <div className={styles.option}>Shobee Xu</div>
                                <div className={styles.option}>Hướng Dẫn Mua Hàng</div>
                                <div className={styles.option}>Hướng Dẫn Bán Hàng</div>
                                <div className={styles.option}>Thanh Toán</div>
                                <div className={styles.option}>Vận Chuyển</div>
                                <div className={styles.option}>Trả Hàng & Hoàn Tiền</div>
                                <div className={styles.option}>Chăm Sóc Khách Hàng</div>
                                <div className={styles.option}>Chính Sách Bảo Hành</div>
                            </div>
                        </div>
                        <div className='col col-12 sm-3 md-3 lg-3 xl-3'>
                            <div className={styles.title}>VỀ SHObEE</div>
                            <div className={styles.options}>
                                <div className={styles.option}>
                                    <div className={styles.option}>
                                        Giới Thiệu Về Shobee Việt Nam
                                    </div>
                                    <div className={styles.option}>Tuyển Dụng</div>
                                    <div className={styles.option}>Điều Khoản Shobee</div>
                                    <div className={styles.option}>
                                        Chính Sách Bảo Mật
                                    </div>
                                    <div className={styles.option}>Chính Hãng</div>
                                    <div className={styles.option}>Kênh Người Bán</div>
                                    <div className={styles.option}>Flash Sales</div>
                                    <div className={styles.option}>
                                        Chương Trình Tiếp Thị Liên Kết Shobee
                                    </div>
                                    <div className={styles.option}>
                                        Liên Hệ Với Truyền Thông
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className='col col-12 sm-3 md-3 lg-3 xl-3'>
                            <div className={styles.title}>THANH TOÁN</div>
                            <div className={styles.options}>
                                <div className={styles.imageGrid}>
                                    <div className='row'>
                                        <div className='col col-6 sm-6 md-6 lg-4 xl-4'>
                                            <div
                                                className={styles.imageBg}
                                                style={{
                                                    backgroundImage: `url(${commonLogo})`,
                                                    backgroundSize: '1200%',
                                                    backgroundPosition: '100% 44%',
                                                }}
                                            ></div>
                                        </div>
                                        <div className='col col-6 sm-6 md-6 lg-4 xl-4'>
                                            <div
                                                className={styles.imageBg}
                                                style={{
                                                    backgroundImage: `url(${commonLogo})`,
                                                    backgroundSize:
                                                        '1203.6363636363637% 741.3793103448276%',
                                                    backgroundPosition:
                                                        '63.26194398682043% 54.83870967741935%',
                                                }}
                                            ></div>
                                        </div>
                                        <div className='col col-6 sm-6 md-6 lg-4 xl-4'>
                                            <div
                                                className={styles.imageBg}
                                                style={{
                                                    backgroundImage: `url(${commonLogo})`,
                                                    backgroundSize:
                                                        '1203.6363636363637% 800%',
                                                    backgroundPosition:
                                                        '63.26194398682043% 30.729166666666668%',
                                                }}
                                            ></div>
                                        </div>
                                        <div className='col col-6 sm-6 md-6 lg-4 xl-4'>
                                            <div
                                                className={styles.imageBg}
                                                style={{
                                                    backgroundImage: `url(${commonLogo})`,
                                                    backgroundSize: '1324% 800%',
                                                    backgroundPosition:
                                                        '1.6339869281045751% 5.181347150259067%',
                                                }}
                                            ></div>
                                        </div>
                                        <div className='col col-6 sm-6 md-6 lg-4 xl-4'>
                                            <div
                                                className={styles.imageBg}
                                                style={{
                                                    backgroundImage: `url(${commonLogo})`,
                                                    backgroundSize:
                                                        '1324% 741.3793103448276%',
                                                    backgroundPosition:
                                                        '101% 5.376344086021505%',
                                                }}
                                            ></div>
                                        </div>
                                        <div className='col col-6 sm-6 md-6 lg-4 xl-4'>
                                            <div
                                                className={styles.imageBg}
                                                style={{
                                                    backgroundImage: `url(${commonLogo})`,
                                                    backgroundSize:
                                                        '1203.6363636363637% 741.3793103448276%',
                                                    backgroundPosition:
                                                        '100% 67.20430107526882%',
                                                }}
                                            ></div>
                                        </div>
                                        <div className='col col-6 sm-6 md-6 lg-4 xl-4'>
                                            <div
                                                className={styles.imageBg}
                                                style={{
                                                    backgroundImage: `url(${commonLogo})`,
                                                    backgroundSize:
                                                        '472.85714285714283% 320%',
                                                    backgroundPosition:
                                                        '86.01532567049809% 6.329113924050633%',
                                                }}
                                            ></div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className={styles.title}>ĐƠN VỊ VẬN CHUYỂN</div>
                            <div className={styles.options}>
                                <div className={styles.imageGrid}>
                                    <div className='row'>
                                        <div className='col col-6 sm-6 md-6 lg-4 xl-4'>
                                            <div
                                                className={styles.imageBg}
                                                style={{
                                                    backgroundImage: `url(${commonLogo})`,
                                                    backgroundSize:
                                                        '596.3963963963964% 500%',
                                                    backgroundPosition:
                                                        '20.689655172413794% 66.49746192893402%',
                                                }}
                                            ></div>
                                        </div>
                                        <div className='col col-6 sm-6 md-6 lg-4 xl-4'>
                                            <div
                                                className={styles.imageBg}
                                                style={{
                                                    backgroundImage: `url(${commonLogo})`,
                                                    backgroundSize: '619.444% 298.611%',
                                                    backgroundPosition:
                                                        '13.2542% 6.99301%',
                                                }}
                                            ></div>
                                        </div>
                                        <div className='col col-6 sm-6 md-6 lg-4 xl-4'>
                                            <div
                                                className={styles.imageBg}
                                                style={{
                                                    backgroundImage: `url(${commonLogo})`,
                                                    backgroundSize:
                                                        '1203.6363636363637% 741.3793103448276%',
                                                    backgroundPosition:
                                                        '29.9835255354201% 44.086021505376344%',
                                                }}
                                            ></div>
                                        </div>
                                        <div className='col col-6 sm-6 md-6 lg-4 xl-4'>
                                            <div
                                                className={styles.imageBg}
                                                style={{
                                                    backgroundImage: `url(${commonLogo})`,
                                                    backgroundSize: '517.188% 221.969%',
                                                    backgroundPosition:
                                                        '85.95505617977528% 100%',
                                                }}
                                            ></div>
                                        </div>
                                        <div className='col col-6 sm-6 md-6 lg-4 xl-4'>
                                            <div
                                                className={styles.imageBg}
                                                style={{
                                                    backgroundImage: `url(${commonLogo})`,
                                                    backgroundSize:
                                                        '1203.6363636363637% 796.2962962962963%',
                                                    backgroundPosition:
                                                        '40.362438220757824% 88.29787234042553%',
                                                }}
                                            ></div>
                                        </div>
                                        <div className='col col-6 sm-6 md-6 lg-4 xl-4'>
                                            <div
                                                className={styles.imageBg}
                                                style={{
                                                    backgroundImage: `url(${commonLogo})`,
                                                    backgroundSize: '511.828% 313.462%',
                                                    backgroundPosition:
                                                        '33.74340949033392% 6.134969325153374%',
                                                }}
                                            ></div>
                                        </div>
                                        <div className='col col-6 sm-6 md-6 lg-4 xl-4'>
                                            <div
                                                className={styles.imageBg}
                                                style={{
                                                    backgroundImage: `url(${commonLogo})`,
                                                    backgroundSize: '1003.33% 626.923%',
                                                    backgroundPosition:
                                                        '42.691% 63.4921%',
                                                }}
                                            ></div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className='col col-12 sm-3 md-3 lg-3 xl-3'>
                            <div className={styles.title}>THEO DÕI CHÚNG TÔI TRÊN</div>
                            <div className={styles.options}>
                                <div className={styles.option}>
                                    <div className={styles.option}>
                                        <BsFacebook />
                                        Facebook
                                    </div>
                                    <div className={styles.option}>
                                        <BsInstagram /> Instagram
                                    </div>
                                    <div className={styles.option}>
                                        <BsLinkedin /> Linkedin
                                    </div>
                                </div>
                            </div>
                            <div className={styles.title}>
                                TẢI ỨNG DỤNG SHObEE NGAY THÔI
                            </div>
                            <div className={styles.options}>
                                <div className={styles.dowload}>
                                    <div
                                        className={styles.qrCode}
                                        style={{ backgroundImage: `url(${qr})` }}
                                    ></div>
                                    <div className={styles.platform}>
                                        <div
                                            className={styles.platformPng}
                                            style={{
                                                backgroundImage: `url(${applePng})`,
                                            }}
                                        ></div>
                                        <div
                                            className={styles.platformPng}
                                            style={{
                                                backgroundImage: `url(${googlePlayPng})`,
                                            }}
                                        ></div>
                                        <div
                                            className={styles.platformPng}
                                            style={{
                                                backgroundImage: `url(${appgalleryPng})`,
                                            }}
                                        ></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <hr></hr>
            </div>
            <div className={styles.policy}>
                <div className='container'>
                    <div className={styles.policyTitle}>
                        <div>CHÍNH SÁCH BẢO MẬT</div>
                        <div>QUY CHẾ HOẠT ĐỘNG</div>
                        <div>CHÍNH SÁCH VẬN CHUYỂN</div>
                        <div>CHÍNH SÁCH TRẢ HÀNG VÀ HOÀN TIỀN</div>
                    </div>
                    <div className={styles.policyTitle}>
                        <div
                            className={styles.licenseImg}
                            style={{
                                backgroundImage: `url(${commonLogo})`,
                                backgroundSize: '551.6666666666666% 477.77777777777777%',
                                backgroundPosition:
                                    '14.391143911439114% 99.41176470588235%',
                                width: '12rem',
                            }}
                        ></div>
                        <div
                            className={styles.licenseImg}
                            style={{
                                backgroundImage: `url(${commonLogo})`,
                                backgroundSize: '1379.1666666666667% 447.9166666666667%',
                                backgroundPosition:
                                    '1.6286644951140066% 92.21556886227545%',
                                width: '5rem',
                            }}
                        ></div>
                    </div>
                    <div className={styles.paragraph2}>Công ty TNHH Shopee</div>
                    <div className={styles.paragraph2}>
                        <div className={styles.paragraph2}>
                            Địa chỉ: Tầng 4-5-6, Tòa nhà Capital Place, số 29 đường Liễu
                            Giai, Phường Ngọc Khánh, Quận Ba Đình, Thành phố Hà Nội, Việt
                            Nam. Tổng đài hỗ trợ: 19001221 - Email: cskh@hotro.shopee.vn
                        </div>
                        <div className={styles.paragraph2}>
                            Chịu Trách Nhiệm Quản Lý Nội Dung: Nguyễn Đức Trí - Điện thoại
                            liên hệ: 024 73081221 (ext 4678)
                        </div>
                        <div className={styles.paragraph2}>
                            Mã số doanh nghiệp: 0106773786 do Sở Kế hoạch & Đầu tư TP Hà
                            Nội cấp lần đầu ngày 10/02/2015
                        </div>
                        <div className={styles.paragraph2}>
                            © 2015 - Bản quyền thuộc về Công ty TNHH Shopee
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    )
}

export default Footer
