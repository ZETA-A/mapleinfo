import styles from "./Titlebar.module.css";
import { Outlet } from "react-router-dom";

function Titlebar() {
    return (
        <>
            <div id={styles.Titlebar}></div>
            <main>
                <Outlet />
            </main>
        </>
    );
}

export default Titlebar;
