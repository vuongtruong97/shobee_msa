import React from "react";
import classes from "./Loading.scss";
import classNames from "classnames/bind";

const cx = classNames.bind(classes);

function Loading() {
    return (
        <div className={cx("loading__container")}>
            <div className={cx("cycles")}>
                <div className={cx("cycle")} />
                <div className={cx("cycle")} />
                <div className={cx("cycle")} />
                <div className={cx("cycle")} />
                <div className={cx("cycle")} />
                <div className={cx("text")} />
            </div>
        </div>
    );
}

export default Loading;