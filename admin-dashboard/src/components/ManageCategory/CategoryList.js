import React from "react";
import {
    Card,
    Table,
    CardBody,
    CardHeader,
    Col,
    Row,
    CardFooter,
    Button,
} from "reactstrap";
import { CategoryService } from "services";
import EditCategory from "./EditCategory";
import ReactPaginate from "react-paginate";

function CategoryList({
    data,
    toggleEditModal,
    activeEditModal,
    toggleAddCategory,
    HandlePageChange,
    pages,
}) {
    const [details, setDetails] = React.useState([]);

    const dbClickHandleCategory = (id) => async () => {
        try {
            const response = await CategoryService.getCategoryDetails(id);
            setDetails(response?.data);
        } catch (error) {
            console.log(error);
        }
        toggleEditModal();
    };

    return (
        <>
            <Card className="shadow mt-4">
                <CardHeader>
                    <div>
                        <Row className="align-items-center">
                            <Col xs="9">
                                <div
                                    className="input-group"
                                    style={{ width: "75%" }}
                                >
                                    <div
                                        className="form-outline"
                                        style={{ width: "50%" }}
                                    >
                                        <input
                                            id="search-input"
                                            type="search"
                                            className="form-control"
                                            placeholder="Search..."
                                            style={{ width: "100%" }}
                                        />
                                    </div>
                                    <button
                                        id="search-button"
                                        type="button"
                                        className="btn btn-primary"
                                    >
                                        <i className="fas fa-search"></i>
                                    </button>
                                </div>
                            </Col>
                            <Col
                                className="d-flex align-items-center justify-content-end"
                                xs="3"
                            >
                                <Button
                                    color="primary"
                                    className="d-flex align-items-center py-2 p-2"
                                    onClick={toggleAddCategory}
                                >
                                    Thêm mới
                                </Button>
                            </Col>
                        </Row>
                    </div>
                </CardHeader>
                <Table bordered hover responsive>
                    <thead style={{ backgroundColor: "rgb(250, 250, 250)" }}>
                        <tr>
                            <th
                                scope="col"
                                style={{
                                    fontSize: "0.75rem",
                                    fontWeight: "700",
                                    color: "rgb(38, 38, 38)",
                                }}
                            >
                                #
                            </th>
                            <th
                                style={{
                                    fontSize: "0.75rem",
                                    fontWeight: "700",
                                    color: "rgb(38, 38, 38)",
                                }}
                            >
                                Ảnh đại diện
                            </th>
                            <th
                                style={{
                                    fontSize: "0.75rem",
                                    fontWeight: "700",
                                    color: "rgb(38, 38, 38)",
                                }}
                            >
                                Tên danh mục
                            </th>
                            <th
                                style={{
                                    fontSize: "0.75rem",
                                    fontWeight: "700",
                                    color: "rgb(38, 38, 38)",
                                }}
                            >
                                Tên hiển thị
                            </th>
                            <th
                                style={{
                                    fontSize: "0.75rem",
                                    fontWeight: "700",
                                    color: "rgb(38, 38, 38)",
                                }}
                            >
                                Slug
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.map((item, index) => (
                            <tr
                                key={index}
                                onClick={dbClickHandleCategory(item?.id)}
                                style={{ cursor: "pointer" }}
                            >
                                <th
                                    scope="row"
                                    style={{
                                        fontSize: "0.875rem",
                                        fontWeight: "600",
                                        color: "rgb(38, 38, 38)",
                                    }}
                                >
                                    {index + 1}
                                </th>
                                <td
                                    style={{
                                        display: "flex",
                                        justifyContent: "center",
                                    }}
                                >
                                    <img
                                        style={{
                                            height: "80px",
                                        }}
                                        alt="cate_icon"
                                        src={item?.image_url}
                                    />
                                </td>
                                <td
                                    style={{
                                        fontSize: "0.875rem",
                                        fontWeight: "600",
                                        color: "rgb(38, 38, 38)",
                                    }}
                                >
                                    {item?.name}
                                </td>
                                <td
                                    style={{
                                        fontSize: "0.875rem",
                                        fontWeight: "600",
                                        color: "rgb(38, 38, 38)",
                                    }}
                                >
                                    {item?.display_name}
                                </td>
                                <td
                                    style={{
                                        fontSize: "0.875rem",
                                        fontWeight: "600",
                                        color: "rgb(38, 38, 38)",
                                    }}
                                >
                                    {item?.slug}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
                <CardFooter>
                    <ReactPaginate
                        previousLabel={"<"}
                        nextLabel={">"}
                        breakLabel={"..."}
                        marginPagesDisplayed={3}
                        pageRangeDisplayed={2}
                        containerClassName={"pagination justify-content-end "}
                        pageClassName={"page-item"}
                        pageLinkClassName={"page-link"}
                        previousClassName={"page-item"}
                        previousLinkClassName={"page-link font-weight-bold"}
                        nextClassName={"page-item"}
                        nextLinkClassName={"page-link font-weight-bolder"}
                        activeClassName={"active"}
                        pageCount={pages}
                        onPageChange={HandlePageChange}
                    />
                </CardFooter>
            </Card>
            <EditCategory
                data={details}
                isOpen={activeEditModal}
                toggle={toggleEditModal}
            />
        </>
    );
}

export default CategoryList;
