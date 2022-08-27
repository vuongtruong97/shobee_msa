/* eslint-disable react-hooks/exhaustive-deps */
import React from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { Modal, Button, FormGroup, Row, Col } from "reactstrap";
import categoryIcon from "../../assets/img/icons/category.svg";
import { CategoryService } from "services";
import { RESPONSE_CODE } from "constants/global";
import HorizontalInput from "components/CustomFields/HorizontalInput";
import { useToast } from "hooks";
import { TOAST_TYPE } from "constants/global";
import appendFormData from "helper/appenFormData";
const schema = yup.object({
    name: yup.string().notRequired(),
    display_name: yup.string().notRequired(),
    image: yup
        .mixed()
        .notRequired("Bạn chưa chọn ảnh")
        .test(
            "type",
            "File không đúng định dạng(JPEG,PNG,GIF,JPG,jfif)",
            (value) => {
                if (!value.length) {
                    return true;
                } else {
                    return value[0].name.match(
                        /\.(jpg|JPG|jpeg|JPEG|png|PNG|gif|GIF|jfif|JFIF)$/
                    );
                }
            }
        ),
});

function EditCategory(props) {
    const { isOpen, toggle, data } = props;
    const showToast = useToast();
    const {
        handleSubmit,
        register,
        control,
        formState: { errors },
        reset,
    } = useForm({
        resolver: yupResolver(schema),
        defaultValues: React.useMemo(
            () => ({
                id: data?.id,
                name: data?.name ?? "",
                display_name: data?.display_name ?? "",
            }),
            [data]
        ),
    });

    React.useEffect(() => {
        if (data) {
            reset({
                id: data?.id,
                name: data?.name ?? "",
                display_name: data?.display_name ?? "",
            });
        }
    }, [data]);

    const onUpdateCategory = async (data) => {
        try {
            const body = {
                name: data?.name ?? "",
                display_name: data?.display_name ?? "",
                image: data?.image ?? "",
            };

            const formData = appendFormData(body);
            const response = await CategoryService.updateCategory(
                data?.id,
                formData
            );

            if (response?.success) {
                showToast(response?.message);
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

    const onDeleteCategory = async (id) => {
        try {
            const response = await CategoryService.deleteCategory(id);
            if (response.success) {
                showToast(response?.message);
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
            toggle={toggle}
            style={{
                maxHeight: "calc(100% - 64px)",
                maxWidth: "768px",
                width: "calc(100% - 64px)",
            }}
        >
            <div className="modal-body p-0" style={{ overflowY: "auto" }}>
                <div className="bg-secondary shadow border-0 rounded-lg">
                    <form>
                        <div className="bg-transparent pb-2 pt-3 px-lg-4">
                            <h2>Cập nhật danh mục</h2>
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
                                    type="text"
                                    label="Tên danh mục"
                                />
                                <HorizontalInput
                                    control={control}
                                    name="display_name"
                                    placeholder="Nhập tên hiển thị"
                                    type="text"
                                    label="Tên hiển thị"
                                />
                            </Col>
                        </Row>
                        <hr className="my-0" />
                        <div
                            className="pl-lg-4 d-flex align-items-center justify-content-between"
                            style={{
                                paddingRight: "2.35rem",
                                borderColor: "none",
                            }}
                        >
                            <div>
                                <Button
                                    className="my-4"
                                    type="button"
                                    onClick={() => {
                                        onDeleteCategory(data?.id);
                                    }}
                                >
                                    <i className="fas fa-trash-alt text-danger" />
                                </Button>
                            </div>
                            <div>
                                <Button
                                    color="warning"
                                    outline
                                    className="my-4"
                                    type="button"
                                    onClick={toggle}
                                >
                                    Thoát
                                </Button>
                                <Button
                                    className="my-4"
                                    color="primary"
                                    type="submit"
                                    onClick={handleSubmit(onUpdateCategory)}
                                >
                                    Cập nhật
                                </Button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </Modal>
    );
}

export default EditCategory;
