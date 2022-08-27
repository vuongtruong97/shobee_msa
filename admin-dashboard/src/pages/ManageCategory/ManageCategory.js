/* eslint-disable react-hooks/exhaustive-deps */
import React from "react";
import { useToast } from "hooks";
import { TOAST_TYPE } from "constants/global";
import { Container } from "reactstrap";
import { CategoryService } from "services";
import { AddCategory, CategoryList } from "components/ManageCategory";

function ManageCategory() {
    const showToast = useToast();
    const [activeModal, setActiveModal] = React.useState(false);
    const [activeEditModal, setActiveEditModal] = React.useState(false);
    const [dataCategory, setDataCategory] = React.useState([]);
    const [pages, setPages] = React.useState();
    const getCategoryList = async () => {
        try {
            const res = await CategoryService.getCategory();
            setDataCategory(res.data);
            setPages(res?.total);
        } catch (error) {
            const message = error?.response
                ? error?.response?.data?.message || error?.response?.data?.error
                : error?.message;
            showToast(message, null, TOAST_TYPE.ERROR);
        }
    };
    const HandlePageChange = async (page) => {
        try {
            console.log(page);
            const currentPage = page.selected + 1;
            const res = await CategoryService.getCategory(currentPage);
            setDataCategory(res?.data);
        } catch (error) {
            const message = error?.response
                ? error?.response?.data?.message || error?.response?.data?.error
                : error?.message;
            showToast(message, null, TOAST_TYPE.ERROR);
        }
    };

    const toggleAddCategory = React.useCallback((refresh) => {
        setActiveModal((prevValue) => !prevValue);
        if (refresh === true) getCategoryList();
    }, []);

    const toggleEditModal = React.useCallback((refresh) => {
        setActiveEditModal((prevValue) => !prevValue);
        if (refresh === true) {
            HandlePageChange();
            getCategoryList();
        }
    }, []);

    React.useEffect(() => {
        getCategoryList();
    }, []);

    return (
        <>
            <div
                style={{
                    background:
                        "radial-gradient( circle 976px at 51.2% 51%,  rgba(11,27,103,1) 0%, rgba(16,66,157,1) 0%, rgba(11,27,103,1) 17.3%, rgba(11,27,103,1) 58.8%, rgba(11,27,103,1) 71.4%, rgba(16,66,157,1) 100.2%, rgba(187,187,187,1) 100.2% )",
                }}
                className="header pb-6 pt-5 pt-md-6 opacity-8"
            >
                <Container fluid>
                    <h1 className="text-white mb-0">
                        Quản lý danh mục sản phẩm
                    </h1>
                </Container>
            </div>
            <Container fluid>
                <CategoryList
                    data={dataCategory}
                    toggleEditModal={toggleEditModal}
                    toggleAddCategory={toggleAddCategory}
                    activeEditModal={activeEditModal}
                    HandlePageChange={HandlePageChange}
                    pages={pages}
                />
            </Container>
            <AddCategory isOpen={activeModal} toggle={toggleAddCategory} />
        </>
    );
}

export default ManageCategory;
