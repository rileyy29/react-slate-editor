import classNames from 'classnames';
import { CSSProperties, memo, useRef, useState } from 'react';
import styles from "../editor/Editor.module.scss";

interface ResizeableImageProps {
    uri?: string;
    shouldMaintainAspectRatio?: boolean;
    maxWidth?: number;
    maxHeight?: number;
    style?: CSSProperties;
}

export default memo(function ResizableImage({
    uri,
    shouldMaintainAspectRatio = true,
    maxWidth = 2000,
    maxHeight = 900,
    style
}: ResizeableImageProps) {
    const imageRef = useRef<HTMLImageElement>(null);
    const [isResizing, setIsResizing] = useState<boolean>(false);

    const handleResizeMouseDown = (event: any) => {
        if (!imageRef?.current) return;

        event.preventDefault();
        setIsResizing(true);

        const startX = event.clientX, startY = event.clientY;
        const startWidth = imageRef.current.clientWidth, startHeight = imageRef.current.clientHeight;
        const aspectRatio = startWidth / startHeight;

        const handleMouseMove = (e: MouseEvent) => {
            if (!imageRef?.current) {
                return;
            }

            const dx = Math.min((startWidth + (e.clientX - startX)), maxWidth);
            const dy = shouldMaintainAspectRatio ? dx / aspectRatio : startHeight + (e.clientY - startY);

            if (dy <= maxHeight) {
                imageRef.current.style.width = `${dx}px`;
                imageRef.current.style.height = `${dy}px`;
            }
        }

        const handleMouseUp = () => {
            setIsResizing(false);
            document.removeEventListener('mousemove', handleMouseMove);
            window.removeEventListener('mouseup', handleMouseUp);
        };

        document.addEventListener('mousemove', handleMouseMove);
        window.addEventListener('mouseup', handleMouseUp);
    };

    return (
        <div className={styles.slateImageWrapper}>
            <img
                ref={imageRef}
                src={uri}
                style={style}
                onClick={() => setIsResizing(!isResizing)}
                className={classNames(styles.withImage, { [styles.withResizing]: isResizing })} />
            {isResizing ? <div className={styles.withResizeHandle} onMouseDown={handleResizeMouseDown} /> : null}
        </div>
    )
});
