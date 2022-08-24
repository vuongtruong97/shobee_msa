import React from 'react'
import styles from './ListChat.module.scss'
import DivStyle3 from 'common-components/UI/Div/DivStyle3'

function ListChat({ onlineUsers, listChat }) {
    return (
        <div className={styles.list}>
            <div className={styles.owner_info}>
                <div
                    className={styles.avatar}
                    style={{
                        backgroundImage: `url('https://getstream.github.io/website-react-examples/social-messenger/static/media/photo-1546967191-fdfb13ed6b1e.f4b6002cb82a4d5a6747.jpeg')`,
                    }}
                ></div>
                <span className={styles.owner_name}>Vuong Truong</span>
            </div>
            <div className={styles.list_chat}>
                <DivStyle3>
                    <div className={styles.conv_wrap}>
                        <div
                            className={styles.avatar}
                            style={{
                                backgroundImage: `url('https://getstream.github.io/website-react-examples/social-messenger/static/media/photo-1541271696563-3be2f555fc4e.24ecd158567cd9e350d1.jpeg')`,
                            }}
                        ></div>
                        <div className={styles.conv_info}>
                            <div className={styles.conv_name}>Eimi Fukada</div>
                            <div className={styles.conv_about}>jav hd</div>
                        </div>
                        <div className={styles.status}>Online</div>
                    </div>
                </DivStyle3>
                <DivStyle3>
                    <div className={styles.conv_wrap}>
                        <div
                            className={styles.avatar}
                            style={{
                                backgroundImage: `url('https://getstream.github.io/website-react-examples/social-messenger/static/media/photo-1541271696563-3be2f555fc4e.24ecd158567cd9e350d1.jpeg')`,
                            }}
                        ></div>
                        <div className={styles.conv_info}>
                            <div className={styles.conv_name}>Eimi Fukada</div>
                            <div className={styles.conv_about}>jav hd</div>
                        </div>
                        <div className={styles.status}>Online</div>
                    </div>
                </DivStyle3>
            </div>
        </div>
    )
}

export default ListChat
