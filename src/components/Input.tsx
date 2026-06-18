import React, { useEffect, useId, useState, type HTMLInputTypeAttribute, type ReactNode } from "react"
import { BsEye } from "react-icons/bs"

type InputProps = {
    refValue: React.RefObject<string>
    label?: string,
    defaultValue?: string,
    type?: React.HTMLInputTypeAttribute,
}

export const InputChildren: React.FC<InputProps> = ({ refValue, type = "text", defaultValue = "", label }) => {
    const id = useId();
    useEffect(() => {
        refValue.current = defaultValue;
    }, [])
    return <>
        {label && <label htmlFor={id}>{label}:</label>}
        <input
            className="form-control"
            id={id}
            type={type}
            defaultValue={defaultValue}
            onChange={(e) => {
                refValue.current = e.target.value
            }}
        />
    </>
}

export const InputPassword: React.FC<InputProps> = ({ refValue, defaultValue = "", label }) => {
    const [type, setType] = useState<HTMLInputTypeAttribute>("password");

    return <>
        <InputChildren
            refValue={refValue}
            type={type}
            defaultValue={defaultValue}
            label={label}
        />
        <span onClick={() => {
            if (type == 'password') {
                setType('text')
            } else {
                setType('password')
            }
        }}>
            <BsEye />
        </span>
    </>
}

export const Input: React.FC<InputProps> = ({ refValue, type = "text", defaultValue = "", label}) => {
    let inpt: ReactNode = null;
    if (type == "password") {
        inpt = <InputPassword
            refValue={refValue}
            defaultValue={defaultValue}
            label={label}
        />
    } else {
        inpt = <InputChildren
            refValue={refValue}
            type={type}
            defaultValue={defaultValue}
            label={label}
        />
    }
    return <>
        <div className="form-group">
            {inpt}
        </div>
    </>
}