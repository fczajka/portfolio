"use client";

import { useState, useEffect, useRef, MutableRefObject } from "react";
import { UseElementOnScreenProps } from "../public/types";

export default function useElementOnScreen(options: UseElementOnScreenProps) {
    const containerRef = useRef(null);
    const [isVisible, setIsVisible] = useState(false);

    const callback = (entries: IntersectionObserverEntry[]) => {
        const [entry] = entries;
        if (entry.isIntersecting) {
            setIsVisible(entry.isIntersecting);
        }
    };

    useEffect(() => {
        let observerRefValue = null as Element | null;

        const observer = new IntersectionObserver(callback, options);

        if (containerRef.current) {
            observer.observe(containerRef.current);
            let observerRefValue = containerRef.current;
        }

        return () => {
            if (observerRefValue) {
                observer.unobserve(observerRefValue);
            }
        };
    }, [containerRef, options]);

    return [containerRef, isVisible] as [
        MutableRefObject<HTMLDivElement | null>,
        boolean
    ];
}
