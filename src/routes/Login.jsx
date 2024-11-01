import React from "react";
import InputComponent from "../components/InputComponent";
import Container from "../components/Container";
import ButtonComponent from "../components/ButtonComponent";
import API from "../api";
import { Check, ChevronRight } from "lucide-react";
import Form from "../components/Form";
import NavComponent from "../components/NavComponent";
import { Group } from "../components/Group";
import useTranslation from "../hooks/useTranslation";
import useAPI from "../hooks/useAPI";
import { useAlert } from "../hooks/useAlert";

export default function Login() {
    const [loading, setLoading] = React.useState(false);
    const [email, setEmail] = React.useState("");
    const [password, setPassword] = React.useState("");
    const [config, setConfig] = React.useState({});
    const [checks, setChecks] = React.useState(new Map());
    const [error, setError] = React.useState(null);

    const { translate, getLanguage } = useTranslation();
    const api = useAPI();
    const alert = useAlert();

    React.useEffect(() => {
        API.updateTheme();
    });

    React.useEffect(() => {
        (async () => {
            const data = await API.getConfig();
            if (data.success) setConfig(data.config);
        })();

        return () => {};
    }, []);

    return (
        <>
            <NavComponent></NavComponent>
            <Container dir="col" gap="10px" align="flex-start">
                <Form error={error}>
                    <Form.Check
                        onPass={(e) => {
                            setChecks((checks) => checks.set("email", true));
                            setError(null);
                        }}
                        onError={(e) => {
                            setChecks((checks) => checks.set("email", false));
                        }}
                    >
                        <InputComponent
                            type="text"
                            placeholder="E-mail"
                            description={translate("email_enter")}
                            onInput={(e) => setEmail(e.target.value)}
                            check={(val) => {
                                if (!val) {
                                    return {
                                        success: false,
                                        message: translate("required_field"),
                                    };
                                }
                                if (
                                    val.length < config.email_len[0] ||
                                    val.length > config.email_len[1]
                                ) {
                                    return {
                                        success: false,
                                        message: translate(
                                            "email_length_check",
                                            config.email_len[0],
                                            config.email_len[1]
                                        ),
                                    };
                                }

                                const emailRegex =
                                    /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
                                if (!emailRegex.test(val)) {
                                    return {
                                        success: false,
                                        message: translate("email_check"),
                                    };
                                }

                                return { success: true, message: "" };
                            }}
                        />
                    </Form.Check>
                    <Form.Check
                        onPass={(val) => {
                            setChecks((checks) => checks.set("password", true));
                            setError(null);
                        }}
                        onError={(val) => {
                            setChecks((checks) =>
                                checks.set("password", false)
                            );
                        }}
                    >
                        <InputComponent
                            type="password"
                            placeholder={translate("password")}
                            description={translate("password_enter")}
                            onInput={(e) => setPassword(e.target.value)}
                            check={(val) => {
                                if (!val) {
                                    return {
                                        success: false,
                                        message: translate("required_field"),
                                    };
                                }
                                return { success: true, message: "" };
                            }}
                        ></InputComponent>
                    </Form.Check>
                </Form>

                <ButtonComponent
                    text={translate("login")}
                    onClick={async (e) => {
                        if (!email || !password) {
                            return;
                        }

                        setLoading(true);

                        const d = await api.login(email, password);
                        if (!d.success) {
                            setError(d.message);
                            setLoading(false);
                            return;
                        }
                        setLoading(false);

                        alert.showAlert(
                            translate("success_login_message"),
                            translate("success_login_title"),
                            "success",
                            3000,
                            500,
                            () => {
                                window.location.href = `/${getLanguage()}`;
                            }
                        );
                    }}
                    loading={loading}
                    icon={ChevronRight}
                    disabled={
                        checks.size !== 2 ||
                        !Array.from(checks.values()).every((val) => val) ||
                        error !== null
                    }
                ></ButtonComponent>
            </Container>
        </>
    );
}
