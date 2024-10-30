import React from "react";
import InputComponent from "../components/InputComponent";
import Container from "../components/Container";
import ButtonComponent from "../components/ButtonComponent";
import API from "../api";
import { Check, ChevronRight } from "lucide-react";
import Form from "../components/Form";
import Alert from "../components/Alert";
import NavComponent from "../components/NavComponent";
import { Group } from "../components/Group";

export default function Login() {
    const [loading, setLoading] = React.useState(false);
    const [email, setEmail] = React.useState("");
    const [password, setPassword] = React.useState("");
    const [config, setConfig] = React.useState({});
    const [checks, setChecks] = React.useState(new Map());
    const [error, setError] = React.useState(null);
    const [showAlert, setShowAlert] = React.useState(false);

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
                            description="Introdu adresa de email"
                            onInput={(e) =>
                                setEmail(e.target.value) &&
                                console.log("Email", e.target.value)
                            }
                            check={(val) => {
                                if (!val) {
                                    return {
                                        success: false,
                                        message: "Câmpul este obligatoriu",
                                    };
                                }
                                if (
                                    val.length < config.email_len[0] ||
                                    val.length > config.email_len[1]
                                ) {
                                    return {
                                        success: false,
                                        message: `Adresa de email trebuie să aibă între ${config.email_len[0]} și ${config.email_len[1]} caractere`,
                                    };
                                }

                                const emailRegex =
                                    /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
                                if (!emailRegex.test(val)) {
                                    return {
                                        success: false,
                                        message:
                                            "Adresa de email trebuie să fie de forma: adresa@domeniu.com",
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
                            placeholder="Parola"
                            description="Introdu parola ta"
                            onInput={(e) => setPassword(e.target.value)}
                            check={(val) => {
                                if (!val) {
                                    return {
                                        success: false,
                                        message: "Câmpul este obligatoriu",
                                    };
                                }
                                return { success: true, message: "" };
                            }}
                        ></InputComponent>
                    </Form.Check>
                </Form>

                <ButtonComponent
                    text="Conectează-te"
                    onClick={async (e) => {
                        if (!email || !password) {
                            return;
                        }

                        setLoading(true);
                        const data = await API.login(email, password);
                        console.log(data);
                        if (data.success) {
                            const user = await API.getUser(data.token);
                            API.cache("user", user.user);
                            setShowAlert(true);
                        } else {
                            setError(data.message);
                            setLoading(false);
                        }
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
            <Alert
                type="success"
                title="Logare validă"
                description="Te-ai logat cu succes, vei fi redirecționat în câteva secunde..."
                show={showAlert}
                timeout={2000}
                onTimeoutEnded={() => {
                    setLoading(false);
                    window.location.href = "/";
                }}
            >
                <Check className="icon"></Check>
            </Alert>
        </>
    );
}
