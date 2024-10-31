import { CircleAlert } from "lucide-react";
import React from "react";

/**
 *
 * @param {{ children: React.ReactNode, error: string, gap: number }} props
 * @returns
 */
const Form = (props) => {
    const { children, error, gap = 5 } = props;

    return (
        <div
            className="form"
            {...props}
            style={{
                rowGap: gap + "px",
            }}
        >
            {error && (
                <div className="error-container">
                    <span className="error">{error}</span>
                </div>
            )}
            {children}
        </div>
    );
};

/**
 *
 * @param {{ onPass: (e: any) => void, onError: (e: any) => void, children: React.ReactNode, err: string }} props
 * @returns
 */
Form.Check = function Check({ onPass, onError, children, err }) {
    const [e, setE] = React.useState(null);
    React.useEffect(() => {
        setE(err);
    }, [err]);

    return (
        <div className="form-check">
            {e && (
                <div className="error-body">
                    <CircleAlert className="icon" />
                    <span className="error">{e}</span>
                </div>
            )}
            {React.Children.map(children, (child) => {
                return React.cloneElement(child, {
                    onError: (e) => {
                        setE(e.message);
                        onError && onError(e);
                    },
                    onPass: (e) => {
                        setE(null);
                        onPass && onPass(e);
                    },
                });
            })}
        </div>
    );
};

export default Form;
