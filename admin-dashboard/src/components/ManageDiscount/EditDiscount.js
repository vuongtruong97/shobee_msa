/* eslint-disable react-hooks/exhaustive-deps */
import React from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup"
import * as yup from "yup";
import {
    Modal,
    Button,
    FormGroup,
    Row,
    Col,
    Label
} from "reactstrap";
import classNames from "classnames/bind";
import saleIcon from "../../assets/img/icons/sale-svgrepo-com.svg";
import { DiscountService } from "services";
import { RESPONSE_CODE } from "constants/global";
import HorizontalInput from "components/CustomFields/HorizontalInput";
import { useToast } from "hooks";
import { TOAST_TYPE } from "constants/global";
const schema = yup.object({
    eventName: yup.string()
        .required("Vui lòng nhập tên sự kiện"),
    type: yup.string()
        .required("Vui lòng loại giảm giá"),
    pricePercent: yup.string().when("type", {
        is: (value) => value === "PERCENT",
        then: yup.string().required("Vui lòng nhập phần trăm giảm giá").test(
            "number-validation",
            "Vui lòng nhập số hợp lệ",
            (pricePercent) => !Number.isNaN(Number(pricePercent))
        )
    }),
    priceDiscount: yup.string().when("type", {
        is: (value) => value === "PRICE_DISCOUNT",
        then: yup.string().required("Vui lòng nhập giá giảm").test(
            "number-validation",
            "Vui lòng nhập số hợp lệ",
            (minDiscount) => !Number.isNaN(Number(minDiscount))
        )
    }),
    minDiscount: yup.string().when("type", {
        is: (value) => value === "PERCENT",
        then: yup.string().required("Vui lòng nhập giá giảm tối thiểu").test(
            "number-validation",
            "Vui lòng nhập số hợp lệ",
            (minDiscount) => !Number.isNaN(Number(minDiscount))
        )
    }),
    maxDiscount: yup.string().when("type", {
        is: (value) => value === "PERCENT",
        then: yup.string().required("Vui lòng nhập giá giảm tối đa").test(
            "number-validation",
            "Vui lòng nhập số hợp lệ",
            (maxDiscount) => !Number.isNaN(Number(maxDiscount))
        )
    }),
    startEvent: yup.string().nullable()
        .required("Vui lòng chọn ngày bắt đầu"),
    endEvent: yup.string().nullable()
        .required("Vui lòng chọn ngày kết thúc")
})

function EditDiscount(props) {
    const { isOpen, toggle, data } = props;
    const showToast = useToast();
    const {
        register,
        handleSubmit,
        control,
        getValues,
        setValue,
        formState: { errors },
        reset
    } = useForm({
        resolver: yupResolver(schema),
        defaultValues: React.useMemo(() => ({
            id: data?.id,
            eventName: data?.eventName ?? "",
            type: data?.type ?? "",
            pricePercent: data?.pricePercent ?? "",
            priceDiscount: data?.priceDiscount ?? "",
            minDiscount: data?.minDiscount ?? "",
            maxDiscount: data?.maxDiscount ?? "",
            startEvent: data?.startEvent ?? "",
            endEvent: data?.endEvent ?? ""
        }), [data])
    });

    React.useEffect(() => {
        if (data) {
            reset({
                id: data?.id,
                eventName: data?.eventName ?? "",
                type: data?.type ?? "",
                pricePercent: data?.pricePercent ?? "",
                priceDiscount: data?.priceDiscount ?? "",
                minDiscount: data?.minDiscount ?? "",
                maxDiscount: data?.maxDiscount ?? "",
                startEvent: data?.startEvent ?? "",
                endEvent: data?.endEvent ?? ""
            });
        }
    }, [data]);

    const onUpdateDiscount = async (data) => {
        try {
            const body = {
                eventName: data?.eventName ?? "",
                type: data?.type ?? "",
                startEvent: data?.startEvent ?? "",
                endEvent: data?.endEvent ?? "",
            }
            if (data?.type === "PERCENT") {
                body.pricePercent = Number(data?.pricePercent ?? 0);
                body.maxDiscount = Number(data?.maxDiscount ?? 0);
                body.minDiscount = Number(data?.minDiscount ?? 0);
            }
            if (data?.type === "PRICE_DISCOUNT") {
                body.priceDiscount = Number(data?.priceDiscount ?? 0);
            }

            const response = await DiscountService.updateDiscount(data?.id, body);
            if (response?.code === RESPONSE_CODE.UPDATE_SUCCEEDED) {
                showToast(response?.message);
                toggle(true);
            } else {
                showToast(response?.message, null, TOAST_TYPE.ERROR);
            }
        } catch (error) {
            const message = error?.response ? error?.response?.data?.message : error?.message;
            showToast(message, null, TOAST_TYPE.ERROR);
        }
    }

    const onDeleteDiscount = async (id) => {
        try {
            const response = await DiscountService.deleteDiscount(id);
            if (response?.code === RESPONSE_CODE.DELETE_SUCCEEDED) {
                showToast(response?.message);
                toggle(true);
            } else {
                showToast(response?.message, null, TOAST_TYPE.ERROR);
            }
        } catch (error) {
            const message = error?.response ? error?.response?.data?.message : error?.message;
            showToast(message, null, TOAST_TYPE.ERROR);
        }
    }

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
                    <form >
                        <  div className="bg-transparent pb-2 pt-3 px-lg-4">
                            <h2>Cập nhât mã giảm giá</h2>
                        </div>
                        <hr className="my-0" />
                        <Row className="pt-4 px-lg-4 m-0">
                            <Col lg={3}>
                                <div className="text-center">
                                    <img src={saleIcon} alt="" style={{ width: "70px", height: "70px" }} />
                                </div>
                            </Col>
                            <Col lg={9} style={{ overflowY: "auto" }}>
                                <HorizontalInput
                                    control={control}
                                    name="eventName"
                                    placeholder="Nhập tên sự kiện"
                                    type="text"
                                    label="Tên sự kiện"
                                />
                                <FormGroup tag="fieldset" className="mb-3">
                                    <legend style={{ fontSize: "0.875rem", fontWeight: "400" }}>
                                        Loại:
                                    </legend>
                                    <FormGroup>
                                        <div className="form-check">
                                            <input
                                                value="PERCENT"
                                                name="type"
                                                type="radio"
                                                {...register("type")}
                                                onChange={(e) => {
                                                    const { value } = e.target;
                                                    setValue("type", value, { shouldValidate: true });
                                                }}
                                                className={classNames("form-check-input", { "is-invalid": !!errors?.type })}
                                                style={{
                                                    height: "0.975rem",
                                                    width: "0.975rem"
                                                }}
                                            />
                                            {' '}
                                            <Label check style={{ fontSize: "0.975rem" }}>Giảm giá theo %</Label>
                                        </div>
                                        <FormGroup check>
                                            <div className="">
                                                <input
                                                    value="PRICE_DISCOUNT"
                                                    name="type"
                                                    {...register("type")}
                                                    type="radio"
                                                    onChange={(e) => {
                                                        const { value } = e.target;
                                                        setValue("type", value, { shouldValidate: true });
                                                    }}
                                                    className={classNames("form-check-input", { "is-invalid": !!errors?.type })}
                                                    style={{
                                                        height: "0.975rem",
                                                        width: "0.975rem"
                                                    }}
                                                />
                                                {' '}
                                                <Label check style={{ fontSize: "0.975rem" }}>Giảm giá theo VNĐ</Label>
                                            </div>
                                        </FormGroup>
                                        {errors?.type && (<div className="invalid-feedback d-block">{errors?.type?.message}</div>)}
                                    </FormGroup>
                                </FormGroup>
                                {/* price-percent */}
                                {getValues("type") === "PERCENT" && (
                                    <>
                                        <HorizontalInput
                                            control={control}
                                            name="pricePercent"
                                            placeholder="Nhập phần trăm giá giảm..."
                                            type="number"
                                            label="Phần trăm giá giảm"
                                        />
                                        <Row>
                                            <Col lg={6}>
                                                <HorizontalInput
                                                    control={control}
                                                    name="minDiscount"
                                                    placeholder="Nhập giá giảm tối thiểu..."
                                                    type="number"
                                                    label="Giá giảm tối thiểu"
                                                />
                                            </Col>
                                            <Col lg={6}>
                                                <HorizontalInput
                                                    control={control}
                                                    name="maxDiscount"
                                                    placeholder="Nhập giá giảm tối đa..."
                                                    type="number"
                                                    label="Giá giảm tối đa"
                                                />
                                            </Col>
                                        </Row>
                                    </>
                                )}
                                {/* price-discount */}
                                {getValues("type") === "PRICE_DISCOUNT" && (
                                    <HorizontalInput
                                        control={control}
                                        name="priceDiscount"
                                        placeholder="Nhập giá giảm..."
                                        type="number"
                                        label="Giá giảm"
                                    />
                                )}
                                <Row>
                                    <Col lg={6}>
                                        <HorizontalInput
                                            control={control}
                                            name="startEvent"
                                            type="date"
                                            label="Thời gian bắt đầu"
                                        />
                                    </Col>
                                    <Col lg={6}>
                                        <HorizontalInput
                                            control={control}
                                            name="endEvent"
                                            type="date"
                                            label="Thời gian kết thúc"
                                        />
                                    </Col>
                                </Row>
                            </Col>
                        </Row>
                        <hr className="my-0" />
                        <div className="pl-lg-4 d-flex align-items-center justify-content-between" style={{ paddingRight: "2.35rem", borderColor: "none" }}>
                            <div>
                                <Button
                                    className="my-4"
                                    type="button"
                                    onClick={() => {
                                        console.log(data?.id);
                                        onDeleteDiscount(data?.id);
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
                                    onClick={handleSubmit(onUpdateDiscount)}
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

export default EditDiscount;
