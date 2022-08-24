import React from 'react'
import styles from './Conversation.module.scss'
import DivStyle2 from 'common-components/UI/Div/DivStyle2'
import NeuButton from 'common-components/UI/Button/NeuButton'

import classNames from 'classnames/bind'

const cx = classNames.bind(styles)

function Conversation({ handleSubmit }) {
    return (
        <div className={styles.conversation}>
            <div className={styles.convst_head}>
                <div
                    className={styles.avatar}
                    style={{
                        backgroundImage: `url('https://getstream.github.io/website-react-examples/social-messenger/static/media/photo-1546967191-fdfb13ed6b1e.f4b6002cb82a4d5a6747.jpeg')`,
                    }}
                ></div>
                <span className={styles.convst_name}>Eimi Fukada</span>
            </div>
            <div className={styles.convst_view}>
                <DivStyle2 style={{ height: '100%', padding: '1rem 0' }}>
                    <div className={styles.message}>
                        <div
                            className={styles.avatar}
                            style={{
                                backgroundImage: `url('https://getstream.github.io/website-react-examples/social-messenger/static/media/photo-1546967191-fdfb13ed6b1e.f4b6002cb82a4d5a6747.jpeg')`,
                            }}
                        ></div>
                        <div
                            className={cx('mess_content', { other: true, owner: false })}
                        >
                            <div
                                className={cx('mess_text', { other: true, owner: false })}
                            >
                                Hi, Why can't we add another project in our account. Not
                                sure what's going on.
                            </div>
                            <div
                                className={cx('mess_time', { other: true, owner: false })}
                            >
                                03-03-18
                            </div>
                        </div>
                    </div>
                    <div className={cx('message', { owner: true })}>
                        <div
                            className={styles.avatar}
                            style={{
                                backgroundImage: `url('https://getstream.github.io/website-react-examples/social-messenger/static/media/photo-1546967191-fdfb13ed6b1e.f4b6002cb82a4d5a6747.jpeg')`,
                            }}
                        ></div>
                        <div className={styles.mess_content}>
                            <div className={styles.mess_text}>
                                Hi, Why can't we add another project in our account. Not
                                sure what's going on. Hi, Why can't we add another project
                                in our account. Not sure what's going on.Hi, Why can't we
                                add another project in our account. Not sure what's going
                                on.Hi, Why can't we add another project in our account.
                                Not sure what's going on.Hi, Why can't we add another
                                project in our account. Not sure what's going on.Hi, Why
                                can't we add another project in our account. Not sure
                                what's going on.😀😀😀😀
                            </div>
                            <div className={styles.mess_time}>03-03-18</div>
                        </div>
                    </div>
                </DivStyle2>
            </div>
            <div className={styles.convst_form}>
                <input className={styles.convst_input} />
                <NeuButton onClick={handleSubmit} primary>
                    Send
                </NeuButton>
            </div>
        </div>
    )
}

export default Conversation
