import type { InputHTMLAttributes } from "react";
import './TextField.css'

type TextFieldProps = Omit<InputHTMLAttributes<HTMLInputElement>, 'id'> & {
    id: string
    label: string
}

function TextField({ id, label, ...inputProps }: TextFieldProps) {
    return (
        <div className="text-field">
            <label htmlFor={id}>{label}</label>
            <input id={id} {...inputProps} />
        </div>
    )
}

export default TextField