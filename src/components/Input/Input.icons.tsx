import { Mail, Phone, Link2, Search, Hash, Lock, Eye, EyeOff, X } from "lucide-react";
import type { InputKind } from "./Input.types";

export const inputKindIcons: Partial<Record<InputKind, React.ComponentType<{ size?: number }>>> = {
    email: Mail,
    tel: Phone,
    url: Link2,
    search: Search,
    numeric: Hash,
    "password-current": Lock,
    "password-new": Lock,
};

export function Spinner() {
    return (
        <svg className="h-4 w-4 animate-spin text-text-muted" viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z" />
        </svg>
    );
}

export { Eye, EyeOff, X as ClearIcon };