import styles from "./Toolbar.module.scss";

export default function Toolbar({ children }: React.PropsWithChildren) {
    return (
        <div className={styles.toolbarWrapper}>
            <div className={styles.withToolbarInner}>
                {children}
            </div>
        </div>
    )
}
