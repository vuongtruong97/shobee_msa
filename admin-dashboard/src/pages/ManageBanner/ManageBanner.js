/* eslint-disable react-hooks/exhaustive-deps */
import React from "react";
import { useToast } from "hooks";
import { TOAST_TYPE } from "constants/global";
import { Container } from "reactstrap";

import { BannerService } from "services";
import AddBanner from "components/ManageBanner/AddBanner";
import BannerList from "components/ManageBanner/BannerList";

function ManageBanner() {
    const showToast = useToast();
    const [activeModal, setActiveModal] = React.useState(false);
    const [activeEditModal, setActiveEditModal] = React.useState(false);
    const [dataBanner, setDataBanner] = React.useState([]);
    const [pages, setPages] = React.useState();
    const getBannerList = async () => {
        try {
            const res = await BannerService.getBrand();
            setDataBanner(res.data);
            setPages(res?.total);
        } catch (error) {
            const message = error?.response
                ? error?.response?.data?.message || error?.response?.data?.error
                : error?.message;
            showToast(message, null, TOAST_TYPE.ERROR);
        }
    };
    const HandlePageChange = async (page) => {
        const currentPage = page.selected + 1;
        const res = await BannerService.getBrand(currentPage);
        setDataBanner(res?.data);
    };

    const toggleAddBanner = React.useCallback((refresh) => {
        setActiveModal((prevValue) => !prevValue);
        if (refresh === true) getBannerList();
    }, []);

    const toggleEditModal = React.useCallback((refresh) => {
        setActiveEditModal((prevValue) => !prevValue);
        if (refresh === true) {
            HandlePageChange();
            getBannerList();
        }
    }, []);

    React.useEffect(() => {
        getBannerList();
    }, []);

    console.log(dataBanner);

    return (
        <>
            <div
                style={{
                    background:
                        "radial-gradient( circle 976px at 51.2% 51%,  rgba(11,27,103,1) 0%, rgba(16,66,157,1) 0%, rgba(11,27,103,1) 17.3%, rgba(11,27,103,1) 58.8%, rgba(11,27,103,1) 71.4%, rgba(16,66,157,1) 100.2%, rgba(187,187,187,1) 100.2% )",
                }}
                className="header pb-8 pt-5 pt-md-8 opacity-8"
            >
                <Container fluid>
                    <h1 className="text-white mb-0">Quản lý ảnh, slider</h1>
                </Container>
            </div>
            <Container fluid>
                <BannerList
                    data={dataBanner}
                    toggleEditModal={toggleEditModal}
                    toggleAddCategory={toggleAddBanner}
                    activeEditModal={activeEditModal}
                    HandlePageChange={HandlePageChange()}
                    pages={pages}
                />
            </Container>
            <AddBanner isOpen={activeModal} toggle={toggleAddBanner} />
        </>
    );
}

export default ManageBanner;
