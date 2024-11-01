import React, { useContext } from 'react'
import Alert2 from '../components/Alert2';

const AlertContext = React.createContext();

export const AlertProvider = ({ children }) => {
    const [alert, setAlert] = React.useState({
        show: false,
        message: "",
        title: "",
        type: "info"
    })
    const [isFadingOut, setIsFadingOut] = React.useState(false);

    /**
     * @type {{messaage: string, title?: string, type?: ('info'|'error'|'warning'|'success'), timeout: number|3000, onAlertHided?: () => void}}
     */
    const showAlert = React.useCallback((message, title = "", type = "info", timeout = 3000, transition = 500, onAlertHided = null) => {
        setAlert({
            show: true,
            message,
            title,
            type,
        });
        setIsFadingOut(false);

        setTimeout(() => {
            setIsFadingOut(true);
            setTimeout(() => {
                setAlert({ ...alert, show: false });
                onAlertHided && onAlertHided();
            }, transition);
        }, timeout);
    }, [])

    return (
        <AlertContext.Provider value={{ showAlert }}>
            {children}
            {alert.show && <Alert2 type={alert.type} title={alert.title} message={alert.message} fadingOut={isFadingOut} />}
        </AlertContext.Provider>
    )
}

export const useAlert = () => useContext(AlertContext);
