import React from "react";
import Container from "../components/Container";
import ButtonComponent from "../components/ButtonComponent";
import API from "../api";
import Alert from "../components/Alert";
import { Ban, LogOut as Disconnect } from "lucide-react";

export default function Logout() {
    const [loading, setLoading] = React.useState(false);
    const [showAlert, setShowAlert] = React.useState(false);
    const [description, setDescription] = React.useState("");
    const [title, setTitle] = React.useState("");
    const [user, setUser] = React.useState({});
    const [error, setError] = React.useState(false);
    React.useEffect(() => {
        const u = API.getCache("user");
        if (!u) {
            window.location.href = "/login";
            return;
        }

        setUser(u);
    }, []);

    return (
        <>
            <Container dir="col" align="center">
                <ButtonComponent
                    text="Deconectează-te"
                    loading={loading}
                    icon={Disconnect}
                    onClick={async (e) => {
                        setLoading(true);
                        const res = await API.logout();
                        if (res.success) {
                            setShowAlert(true);
                            setTitle("Te-ai deconectat cu succes!");
                            setDescription("Te-ai deconectat cu succes, vei fi redirecționat în câteva secunde...");
                        } else {
                            setError(true);
                            setLoading(false);
                            setTitle("Eroare la deconectare");
                            setDescription(res.message);
                            setShowAlert(true);
                        }
                    }}
                ></ButtonComponent>
            </Container>
            <Alert
                type={error ? "error" : "success"}
                title={title}
                description={description}
                show={showAlert}
                timeout={3000}
                onTimeoutEnd={() => {
                    if(error) {
                        setLoading(false);
                        setShowAlert(false);
                        setError(false);
                        return;
                    }

                    setLoading(false);
                    window.location.href = "/";
                }}
            >
                <Ban className="icon"></Ban>
            </Alert>
        </>
    );
}
