import React from "react";
import { Card, CardBody, CardTitle, Container, Row, Col } from "reactstrap";

function Header() {
    return (
        <>
            <div
                style={{
                    background: "linear-gradient(-180deg,#f53d2d,#f63)",
                }}
                className="header pb-8 pt-5 pt-md-8"
            >
                <Container fluid>
                    <div className="header-body">
                        {/* Card stats */}
                        <Row>
                            <Col lg="6" xl="3">
                                <Card className="card-stats mb-4 mb-xl-0">
                                    <CardBody>
                                        <Row>
                                            <div className="col">
                                                <CardTitle
                                                    tag="h5"
                                                    className="text-uppercase text-muted mb-0"
                                                >
                                                    Tổng lượt truy cập
                                                </CardTitle>
                                                <span className="h2 font-weight-bold mb-0">
                                                    350,897
                                                </span>
                                            </div>
                                            <Col className="col-auto">
                                                <div className="icon icon-shape bg-danger text-white rounded-circle shadow">
                                                    <i className="fas fa-chart-bar" />
                                                </div>
                                            </Col>
                                        </Row>
                                        <p className="mt-3 mb-0 text-muted text-sm">
                                            <span className="text-success mr-2">
                                                <i className="fa fa-arrow-up" />{" "}
                                                3.48%
                                            </span>{" "}
                                            <span className="text-nowrap">
                                                Từ đầu tháng
                                            </span>
                                        </p>
                                    </CardBody>
                                </Card>
                            </Col>
                            <Col lg="6" xl="3">
                                <Card className="card-stats mb-4 mb-xl-0">
                                    <CardBody>
                                        <Row>
                                            <div className="col">
                                                <CardTitle
                                                    tag="h5"
                                                    className="text-uppercase text-muted mb-0"
                                                >
                                                    Số lượng đơn hàng
                                                </CardTitle>
                                                <span className="h2 font-weight-bold mb-0">
                                                    888
                                                </span>
                                            </div>
                                            <Col className="col-auto">
                                                <div className="icon icon-shape bg-warning text-white rounded-circle shadow">
                                                    <i className="fas fa-chart-pie" />
                                                </div>
                                            </Col>
                                        </Row>
                                        <p className="mt-3 mb-0 text-muted text-sm">
                                            <span className="text-danger mr-2">
                                                <i className="fas fa-arrow-down" />{" "}
                                                3.48%
                                            </span>{" "}
                                            <span className="text-nowrap">
                                                So với ngày hôm trước
                                            </span>
                                        </p>
                                    </CardBody>
                                </Card>
                            </Col>
                            <Col lg="6" xl="3">
                                <Card className="card-stats mb-4 mb-xl-0">
                                    <CardBody>
                                        <Row>
                                            <div className="col">
                                                <CardTitle
                                                    tag="h5"
                                                    className="text-uppercase text-muted mb-0"
                                                >
                                                    Số lượng người dùng mới
                                                </CardTitle>
                                                <span className="h2 font-weight-bold mb-0">
                                                    222
                                                </span>
                                            </div>
                                            <Col className="col-auto">
                                                <div className="icon icon-shape bg-yellow text-white rounded-circle shadow">
                                                    <i className="fas fa-users" />
                                                </div>
                                            </Col>
                                        </Row>
                                        <p className="mt-3 mb-0 text-muted text-sm">
                                            <span className="text-success mr-2">
                                                <i className="fas fa-arrow-up" />{" "}
                                                5.10%
                                            </span>{" "}
                                            <span className="text-nowrap">
                                                So với tuần trước
                                            </span>
                                        </p>
                                    </CardBody>
                                </Card>
                            </Col>
                            <Col lg="6" xl="3">
                                <Card className="card-stats mb-4 mb-xl-0">
                                    <CardBody>
                                        <Row>
                                            <div className="col">
                                                <CardTitle
                                                    tag="h5"
                                                    className="text-uppercase text-muted mb-0"
                                                >
                                                    Hiệu suất
                                                </CardTitle>
                                                <span className="h2 font-weight-bold mb-0">
                                                    49,65%
                                                </span>
                                            </div>
                                            <Col className="col-auto">
                                                <div className="icon icon-shape bg-info text-white rounded-circle shadow">
                                                    <i className="fas fa-percent" />
                                                </div>
                                            </Col>
                                        </Row>
                                        <p className="mt-3 mb-0 text-muted text-sm">
                                            <span className="text-success mr-2">
                                                <i className="fas fa-arrow-up" />{" "}
                                                12%
                                            </span>{" "}
                                            <span className="text-nowrap">
                                                Từ đầu tháng
                                            </span>
                                        </p>
                                    </CardBody>
                                </Card>
                            </Col>
                        </Row>
                    </div>
                </Container>
            </div>
        </>
    );
}

export default Header;
