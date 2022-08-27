import { NumberFormat } from "helper/utilties";
import moment from "moment";
import React from "react";
import ReactPaginate from "react-paginate";
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
import { DiscountService } from "services";
import EditDiscount from "./EditDiscount";

function DiscountList({
    data,
    toggleEditModal,
    activeEditModal,
    toggleAddDiscount,
    HandlePageChange,
    pages,
}) {
    const [details, setDetails] = React.useState([]);

    const dbClickHandleDiscount = (id) => async () => {
        try {
            const response = await DiscountService.getDiscountDetails(id);
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
                                    className="d-flex align-items-center py-2 px-1"
                                    onClick={toggleAddDiscount}
                                >
                                    <i className="ni ni-fat-add text-lg mr-1" />
                                    Thêm mới
                                </Button>
                            </Col>
                        </Row>
                    </div>
                </CardHeader>
                <CardBody>
                    <Table bordered hover responsive>
                        <thead
                            style={{ backgroundColor: "rgb(250, 250, 250)" }}
                        >
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
                                    Tên sự Kiện
                                </th>
                                <th
                                    style={{
                                        fontSize: "0.75rem",
                                        fontWeight: "700",
                                        color: "rgb(38, 38, 38)",
                                    }}
                                >
                                    Loại
                                </th>
                                <th
                                    style={{
                                        fontSize: "0.75rem",
                                        fontWeight: "700",
                                        color: "rgb(38, 38, 38)",
                                    }}
                                >
                                    giảm giá tối thiểu
                                </th>
                                <th
                                    style={{
                                        fontSize: "0.75rem",
                                        fontWeight: "700",
                                        color: "rgb(38, 38, 38)",
                                    }}
                                >
                                    giảm giá tối đa
                                </th>
                                <th
                                    style={{
                                        fontSize: "0.75rem",
                                        fontWeight: "700",
                                        color: "rgb(38, 38, 38)",
                                    }}
                                >
                                    giảm giá(VNĐ)
                                </th>
                                <th
                                    style={{
                                        fontSize: "0.75rem",
                                        fontWeight: "700",
                                        color: "rgb(38, 38, 38)",
                                    }}
                                >
                                    giảm giá(%)
                                </th>
                                <th
                                    style={{
                                        fontSize: "0.75rem",
                                        fontWeight: "700",
                                        color: "rgb(38, 38, 38)",
                                    }}
                                >
                                    Thời gian bắt đầu
                                </th>
                                <th
                                    style={{
                                        fontSize: "0.75rem",
                                        fontWeight: "700",
                                        color: "rgb(38, 38, 38)",
                                    }}
                                >
                                    Thời gian kết thúc
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {data.map((item, index) => (
                                <tr
                                    key={index}
                                    onClick={dbClickHandleDiscount(item?.id)}
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
                                            fontSize: "0.875rem",
                                            fontWeight: "600",
                                            color: "rgb(38, 38, 38)",
                                        }}
                                    >
                                        {item?.eventName}
                                    </td>
                                    <td
                                        style={{
                                            fontSize: "0.875rem",
                                            fontWeight: "600",
                                            color: "rgb(38, 38, 38)",
                                        }}
                                    >
                                        {item?.type === "PERCENT"
                                            ? "Giảm giá theo %"
                                            : "Giảm giá theo VNĐ"}
                                    </td>
                                    <td
                                        style={{
                                            fontSize: "0.875rem",
                                            fontWeight: "600",
                                            color: "rgb(38, 38, 38)",
                                        }}
                                    >
                                        {NumberFormat(item?.minDiscount)}
                                    </td>
                                    <td
                                        style={{
                                            fontSize: "0.875rem",
                                            fontWeight: "600",
                                            color: "rgb(38, 38, 38)",
                                        }}
                                    >
                                        {NumberFormat(item?.maxDiscount)}
                                    </td>
                                    <td
                                        style={{
                                            fontSize: "0.875rem",
                                            fontWeight: "600",
                                            color: "rgb(38, 38, 38)",
                                        }}
                                    >
                                        {NumberFormat(item?.priceDiscount)}
                                    </td>
                                    <td
                                        style={{
                                            fontSize: "0.875rem",
                                            fontWeight: "600",
                                            color: "rgb(38, 38, 38)",
                                        }}
                                    >
                                        {item?.pricePercent}
                                    </td>
                                    <td
                                        style={{
                                            fontSize: "0.875rem",
                                            fontWeight: "600",
                                            color: "rgb(38, 38, 38)",
                                        }}
                                    >
                                        {moment(item?.startEvent).format(
                                            "DD/MM/YYYY"
                                        )}
                                    </td>
                                    <td
                                        style={{
                                            fontSize: "0.875rem",
                                            fontWeight: "600",
                                            color: "rgb(38, 38, 38)",
                                        }}
                                    >
                                        {moment(item?.endEvent).format(
                                            "DD/MM/YYYY"
                                        )}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                </CardBody>

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
            <EditDiscount
                data={details}
                isOpen={activeEditModal}
                toggle={toggleEditModal}
            />
        </>
    );
}

export default DiscountList;
