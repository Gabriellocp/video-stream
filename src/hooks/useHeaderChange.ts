import { useEffect } from "react";

export function useHeaderChange(title: string, previous?: string) {
    useEffect(() => {
        window.dispatchEvent(new CustomEvent('header-title', { detail: { title, previous } }))
    }, [])
}