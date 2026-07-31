import {
    useFormField,
} from "./FormField.context";


export function FormFieldLabel({
    children,
}: {
    children: React.ReactNode;
}) {

    const {
        id,
        required,
    } = useFormField();


    return (
        <label
            htmlFor={id}
            className="text-sm font-medium text-text"
        >
            {children}

            {required && (
                <span className="ml-1 text-danger">
                    *
                </span>
            )}
        </label>
    );
}