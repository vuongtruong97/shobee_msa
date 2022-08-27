import React from "react";
import { Controller } from "react-hook-form";
import {
    FormGroup,
    Input,
    InputGroup,
    InputGroupAddon,
    InputGroupText,
    Label
} from "reactstrap";
import PropTypes from "prop-types"
import classNames from "classnames";

function HorizontalInput(props) {
    const {
        control,
        name,
        placeholder,
        type,
        icon,
        label
    } = props;

    return (
        <FormGroup>
            {label && (<Label style={{ fontSize: "0.875rem", fontWeight: "400" }}>{label}</Label>)}
            <Controller
                name={name}
                control={control}
                render={({
                    field: { onChange, value, onBlur },
                    fieldState: { error }
                }) => {
                    return (
                        <>
                            <InputGroup className={classNames("input-group-alternative mb-3", { "is-invalid": !!error })}>
                                {icon && (
                                    <InputGroupAddon addonType="prepend">
                                        <InputGroupText>
                                            {icon}
                                        </InputGroupText>
                                    </InputGroupAddon>
                                )}
                                <Input
                                    name={name}
                                    placeholder={placeholder}
                                    type={type}
                                    onChange={onChange}
                                    value={value}
                                    onBlur={onBlur}
                                />
                            </InputGroup>
                            {error && (
                                <div className="invalid-feedback d-block mt--2">{error?.message}</div>
                            )}
                        </>
                    )
                }}
            />
        </FormGroup>
    );
}

HorizontalInput.propTypes = {
    control: PropTypes.any.isRequired,
    name: PropTypes.string.isRequired,
    placeholder: PropTypes.string,
    type: PropTypes.string,
    icon: PropTypes.oneOfType([PropTypes.elementType, PropTypes.object]),
    label: PropTypes.string
};

HorizontalInput.defaultProps = {
    placeholder: "",
    type: "text",
    icon: null,
    label: ""
};

export default React.memo(HorizontalInput);
