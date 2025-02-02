import { useEffect } from 'react';

type UseOutsideClickClose = {
    isOpen: boolean;
    onClose?: () => void;
    rootRef: React.RefObject<HTMLElement | null>;
};

export const useOutsideClickClose = ({
    isOpen,
    rootRef,
    onClose,
}: UseOutsideClickClose) => {
    useEffect(() => {
        const handleClick = (event: MouseEvent) => {
            const { target } = event;
            if (target instanceof Node && !rootRef.current?.contains(target)) {
                isOpen && onClose?.();
            }
        };

        window.addEventListener('mousedown', handleClick);

        return () => {
            window.removeEventListener('mousedown', handleClick);
        };
    }, [onClose, isOpen]);
};
