import {
    useFormField,
} from "./FormField.context";


export function FormFieldMessage({
    children,
}: {
    children: React.ReactNode;
}) {

    const {
        messageId,
    } = useFormField();


    return (
        <p
            id={messageId}
            role="alert"
            className="text-sm text-danger"
        >
            {children}
        </p>
    );
}