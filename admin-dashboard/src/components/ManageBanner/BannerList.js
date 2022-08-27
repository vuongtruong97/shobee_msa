import React from "react";
import {
    Card,
    Table,
    CardHeader,
    Col,
    Row,
    CardFooter,
    Button,
} from "reactstrap";

import ReactPaginate from "react-paginate";
import { BannerService } from "services";
import EditBrand from "./EditBanner";

function BannerList({
    data,
    toggleEditModal,
    activeEditModal,
    toggleAddCategory,
    HandlePageChange,
    pages,
}) {
    const [details, setDetails] = React.useState([]);

    const dbClickHandleBrand = (id) => async () => {
        try {
            const response = await BannerService.getBrandDetails(id);

            console.log(response);
            if (response.success) {
                setDetails(response?.data);
            }
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
                                    className="d-flex align-items-center py-2 px-1"
                                    onClick={toggleAddCategory}
                                >
                                    <i className="ni ni-fat-add text-lg mr-1" />
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
                                Hình Ảnh
                            </th>
                            <th
                                style={{
                                    fontSize: "0.75rem",
                                    fontWeight: "700",
                                    color: "rgb(38, 38, 38)",
                                }}
                            >
                                Loại Banner
                            </th>
                            <th
                                style={{
                                    fontSize: "0.75rem",
                                    fontWeight: "700",
                                    color: "rgb(38, 38, 38)",
                                }}
                            >
                                URL
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.map((item, index) => (
                            <tr
                                key={index}
                                onClick={dbClickHandleBrand(item?._id)}
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
                                    {item?.image_url ? (
                                        <img
                                            alt="banner_img"
                                            style={{ height: "150px" }}
                                            src={item?.image_url}
                                        />
                                    ) : (
                                        <span>
                                            Hình ảnh đã tải lên và đang được xử
                                            lý
                                        </span>
                                    )}
                                </td>
                                <td
                                    style={{
                                        fontSize: "0.875rem",
                                        fontWeight: "600",
                                        color: "rgb(38, 38, 38)",
                                    }}
                                >
                                    {item?.space_key}
                                </td>
                                <td
                                    style={{
                                        fontSize: "0.875rem",
                                        fontWeight: "600",
                                        color: "rgb(38, 38, 38)",
                                    }}
                                >
                                    {item?.url}
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
            <EditBrand
                data={details}
                isOpen={activeEditModal}
                toggle={toggleEditModal}
            />
        </>
    );
}

export default BannerList;
