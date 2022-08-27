/* eslint-disable react-hooks/exhaustive-deps */
import React from "react";
import { useToast } from "hooks";
import { TOAST_TYPE } from "constants/global";
import { Container, Row, Col, Button, Card, CardBody, CardHeader, CardFooter } from "reactstrap";
import { DiscountService } from "services";
import { AddDiscount, DiscountList } from "components/ManageDiscount";
import ReactPaginate from "react-paginate";

function ManageDiscount() {
    const showToast = useToast();
    const [activeModal, setActiveModal] = React.useState(false);
    const [activeEditModal, setActiveEditModal] = React.useState(false);
    const [dataDiscount, setDataDiscount] = React.useState([]);
    const [pages, setPages] = React.useState();
    const getDiscountList = async () => {
        try {
            const res = await DiscountService.getDiscount();
            setDataDiscount(res.data);
            setPages(res?.total);
        } catch (error) {
            const message = error?.response
                ? error?.response?.data?.message || error?.response?.data?.error
                : error?.message;
            showToast(message, null, TOAST_TYPE.ERROR);
        }
    };
    const HandlePageChange = () => async (page) => {
        const currentPage = page.selected + 1;
        const res = await DiscountService.getDiscount(currentPage);
        setDataDiscount(res?.data);
    }

    const toggleAddDiscount = React.useCallback((refresh) => {
        setActiveModal((prevValue) => !prevValue);
        if (refresh === true) getDiscountList();
    }, []);

    const toggleEditModal = React.useCallback((refresh) => {
        setActiveEditModal((prevValue) => !prevValue);
        if (refresh === true) {
            HandlePageChange()
            getDiscountList()
        }
        ;
    }, []);

    React.useEffect(() => {
        getDiscountList();
    }, []);

    return (
        <>
            <div className="header bg-gradient-default pb-8 pt-5 pt-md-8 opacity-8">
                <Container fluid>
                    <h1 className="text-white mb-0">
                        Danh sách mã giảm giá
                    </h1>
                </Container>
            </div>
            <Container fluid>

                <DiscountList
                    data={dataDiscount}
                    toggleEditModal={toggleEditModal}
                    toggleAddDiscount={toggleAddDiscount}
                    activeEditModal={activeEditModal}
                    HandlePageChange={HandlePageChange()}
                    pages={pages}
                />


            </Container>
            <AddDiscount isOpen={activeModal} toggle={toggleAddDiscount} />
        </>
    );
}

export default ManageDiscount;