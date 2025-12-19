"use client";

import * as React from "react";
import { X } from "lucide-react";
import { cn } from "@/lib/utils";

interface CustomModalProps {
    isOpen: boolean;
    onClose: () => void;
    children: React.ReactNode;
    className?: string;
    showCloseButton?: boolean;
}

export function CustomModal({
    isOpen,
    onClose,
    children,
    className,
    showCloseButton = true,
}: CustomModalProps) {
    const modalRef = React.useRef<HTMLDivElement>(null);
    const previousActiveElement = React.useRef<HTMLElement | null>(null);

    // Handle escape key to close modal
    React.useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === "Escape" && isOpen) {
                onClose();
            }
        };

        if (isOpen) {
            document.addEventListener("keydown", handleKeyDown);
            // Store the currently focused element before opening
            previousActiveElement.current = document.activeElement as HTMLElement;
            // Prevent body scroll when modal is open
            document.body.style.overflow = "hidden";
        }

        return () => {
            document.removeEventListener("keydown", handleKeyDown);
            document.body.style.overflow = "";
        };
    }, [isOpen, onClose]);

    // Restore focus when modal closes
    React.useEffect(() => {
        if (!isOpen && previousActiveElement.current) {
            // Use setTimeout to ensure the modal is fully unmounted before restoring focus
            setTimeout(() => {
                previousActiveElement.current?.focus();
            }, 0);
        }
    }, [isOpen]);

    // Handle click outside to close
    const handleOverlayClick = (e: React.MouseEvent) => {
        if (e.target === e.currentTarget) {
            onClose();
        }
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50">
            {/* Overlay */}
            <div
                className="fixed inset-0 bg-black/80 animate-in fade-in-0 duration-200"
                onClick={handleOverlayClick}
            />
            {/* Modal Content */}
            <div
                ref={modalRef}
                role="dialog"
                aria-modal="true"
                className={cn(
                    "fixed left-[50%] top-[50%] z-50 grid translate-x-[-50%] translate-y-[-50%] border bg-background shadow-lg duration-200 animate-in fade-in-0 zoom-in-95 slide-in-from-left-1/2 slide-in-from-top-[48%] sm:rounded-lg",
                    className
                )}
                onClick={(e) => e.stopPropagation()}
            >
                {children}
                {showCloseButton && (
                    <button
                        onClick={onClose}
                        className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
                        aria-label="Close"
                    >
                        <X className="h-4 w-4" />
                    </button>
                )}
            </div>
        </div>
    );
}

export default CustomModal;
