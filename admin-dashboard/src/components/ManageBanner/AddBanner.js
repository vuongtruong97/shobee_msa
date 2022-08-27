import React from "react";
import { useForm } from "react-hook-form";
import { useToast } from "hooks";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { Modal, Button, Form, Row, Col } from "reactstrap";
import categoryIcon from "../../assets/img/icons/category.svg";

import { RESPONSE_CODE } from "constants/global";
import HorizontalInput from "components/CustomFields/HorizontalInput";
import { TOAST_TYPE } from "constants/global";
import { BannerService } from "services";
import appendFormData from "helper/appenFormData";

const schema = yup.object({
    space_key: yup.string().required("Vui lòng nhập space_key"),
    url: yup.string().required("Vui lòng nhập url"),
    image: yup
        .mixed()
        .required("Bạn chưa chọn ảnh")
        .test("fileLength", "Vui lòng chọn ít nhất 1 hình ảnh", (value) => {
            return value && value.length > 0;
        })
        .test(
            "type",
            "File không đúng định dạng(JPEG,PNG,GIF,JPG,jfif)",
            (value) => {
                return (
                    value[0] &&
                    value[0].name.match(
                        /\.(jpg|JPG|jpeg|JPEG|png|PNG|gif|GIF|jfif|JFIF)$/
                    )
                );
            }
        ),
});

function AddBanner(props) {
    const { isOpen, toggle } = props;
    const showToast = useToast();

    const {
        control,
        handleSubmit,
        reset,
        watch,
        register,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(schema),
        defaultValues: {
            space_key: "",
            url: "",
            image: "",
        },
    });

    const image = watch("image");

    console.log(errors);
    console.log(image);

    const resetForm = () => {
        reset({
            space_key: "",
            url: "",
            image: null,
        });
    };

    const onCreateBanner = async (data) => {
        try {
            const body = {
                space_key: data?.space_key ?? "",
                url: data?.url ?? "",
                image: data.image,
            };

            const fd = appendFormData(body);
            console.log(fd);

            const response = await BannerService.postBrand(fd);

            console.log(response);
            if (response.success) {
                showToast(response?.message);
                resetForm();
                toggle(true);
            } else {
                showToast(response?.message, null, TOAST_TYPE.ERROR);
            }
        } catch (error) {
            const message = error?.response
                ? error?.response?.data?.message
                : error?.message;
            showToast(message, null, TOAST_TYPE.ERROR);
        }
    };

    return (
        <Modal
            className="modal-dialog-centered"
            size="sm"
            isOpen={isOpen}
            toggle={() => {
                resetForm();
                toggle();
            }}
            style={{
                maxHeight: "calc(100% - 64px)",
                maxWidth: "768px",
                width: "calc(100% - 64px)",
            }}
        >
            <div className="modal-body p-0" style={{ overflowY: "auto" }}>
                <div className="bg-secondary shadow border-0 rounded-lg">
                    <Form role="form">
                        <div className="bg-transparent pb-2 pt-3 px-lg-4">
                            <h2>Thêm mới banner</h2>
                        </div>
                        <hr className="my-0" />
                        <Row className="pt-4 px-lg-4 m-0">
                            <Col lg={3}>
                                <div className="text-center">
                                    <img
                                        src={categoryIcon}
                                        alt=""
                                        style={{
                                            width: "70px",
                                            height: "70px",
                                        }}
                                    />
                                </div>
                            </Col>
                            <Col lg={9} style={{ overflowY: "auto" }}>
                                <div
                                    style={{
                                        display: "flex",
                                        flexDirection: "column",
                                        paddingBottom: "1rem",
                                    }}
                                >
                                    <label htmlFor="image">Chọn ảnh </label>
                                    <input
                                        id="image"
                                        type="file"
                                        {...register("image")}
                                    />
                                    {errors?.image && (
                                        <div
                                            style={{
                                                color: "var(--orange)",
                                                fontSize: "13px",
                                            }}
                                        >
                                            {errors?.image.message}
                                        </div>
                                    )}
                                </div>
                                <HorizontalInput
                                    control={control}
                                    name="space_key"
                                    placeholder="Nhập loại banner"
                                    description="text"
                                    label="Loại banner"
                                />
                                <HorizontalInput
                                    control={control}
                                    name="url"
                                    placeholder="URL Banner"
                                    description="text"
                                    label="URL Banner"
                                />
                            </Col>
                        </Row>
                        <hr className="my-0" />
                        <div
                            className="pl-lg-4 text-right"
                            style={{
                                paddingRight: "2.35rem",
                                borderColor: "none",
                            }}
                        >
                            <Button
                                color="warning"
                                outline
                                className="my-4"
                                description="button"
                                onClick={() => {
                                    resetForm();
                                    toggle();
                                }}
                            >
                                Thoát
                            </Button>
                            <Button
                                className="my-4"
                                color="primary"
                                description="submit"
                                onClick={handleSubmit(onCreateBanner)}
                            >
                                Thêm mới
                            </Button>
                        </div>
                    </Form>
                </div>
            </div>
        </Modal>
    );
}

export default AddBanner;
