import React from "react";
import { useForm } from "react-hook-form";
import { useToast } from "hooks";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { Modal, Button, Form, Row, Col } from "reactstrap";
import categoryIcon from "../../assets/img/icons/category.svg";
import { CategoryService } from "services";
import { RESPONSE_CODE } from "constants/global";
import HorizontalInput from "components/CustomFields/HorizontalInput";
import { TOAST_TYPE } from "constants/global";
import appendFormData from "helper/appenFormData";

const schema = yup.object({
    name: yup.string().required("Vui lòng nhập tên danh mục"),
    display_name: yup.string("Vui lòng nhập tên hiển thị danh mục").required(),
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

function AddCategory(props) {
    const { isOpen, toggle } = props;
    const showToast = useToast();

    const {
        control,
        handleSubmit,
        register,
        reset,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(schema),
        defaultValues: {
            name: "",
            display_name: "",
        },
    });

    const resetForm = () => {
        reset({
            name: "",
            display_name: "",
        });
    };

    const onCreateCategory = async (data) => {
        try {
            const body = {
                name: data?.name ?? "",
                display_name: data?.display_name ?? "",
                image: data.image,
            };

            const formData = appendFormData(body);
            const response = await CategoryService.postCategory(formData);

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
                            <h2>Thêm mới danh mục</h2>
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
                                    name="name"
                                    placeholder="Nhập tên danh mục"
                                    description="text"
                                    label="Tên danh mục"
                                />
                                <HorizontalInput
                                    control={control}
                                    name="display_name"
                                    placeholder="Nhập mô tên hiển thị"
                                    description="text"
                                    label="Tên hiện thị"
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
                                onClick={handleSubmit(onCreateCategory)}
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

export default AddCategory;
