import React from "react";
import "../styles/NavComponent.css";
import { Popup } from "./Popup";
import API from "../api";
import Avatar from "./Avatar";
import Flex from "./Flex";
import ButtonComponent from "./ButtonComponent";
import LinkButton from "./LinkButton";

import { User, Car, LogOut, Ban } from "lucide-react";
import Alert from "./Alert";
import ComboBox from "./ComboBox";

export default function NavComponent(props) {
    const [user, setUser] = React.useState(null);
    const [pop, setPop] = React.useState(false);

    const [error, setError] = React.useState(false);
    const [title, setTitle] = React.useState("");
    const [description, setDescription] = React.useState("");
    const [loading, setLoading] = React.useState(false);
    const [showAlert, setShowAlert] = React.useState(false);

    React.useEffect(() => {
        const u = API.getCache("user");
        if (!u) {
            return console.log("UNAUTHORIZED");
        }

        setUser(u);
    }, []);
    return (
        <>
            <div className="navbar-wrapper">
                <nav className="navbar">
                    <header className="navbar-header">
                        <img
                            className="navbar-logo"
                            onClick={(e) => (window.location.href = "/")}
                            src="/assets/CarTravelSmall.png"
                            alt="Logo"
                        />
                    </header>
                    <footer className="navbar-footer">
                        <Popup
                            className="navbar-popup"
                            active={pop}
                            vgap={25}
                            float={"bottom"}
                            header={
                                <Avatar
                                    src={user?.avatar}
                                    onClick={(e) => setPop(!pop)}
                                >
                                    <Avatar.Placeholder>
                                        {user?.names?.first[0] +
                                            user?.names?.last[0] || "CT"}
                                    </Avatar.Placeholder>
                                </Avatar>
                            }
                        >
                            <Flex dir="column" align="flex-start" gap="5px">
                                {!user ? (
                                    <>
                                        <LinkButton href="/login">
                                            Conectează-te
                                        </LinkButton>
                                        <LinkButton
                                            desc="Beneficiază de cursele fără taxe"
                                            href="/register"
                                        >
                                            Înregistrează-te
                                        </LinkButton>
                                    </>
                                ) : (
                                    <>
                                        <LinkButton
                                            icon={User}
                                            desc={`${
                                                user?.names?.first +
                                                " " +
                                                user?.names?.last
                                            }`}
                                            href="/profile"
                                        >
                                            Profilul meu
                                        </LinkButton>
                                        <LinkButton
                                            href="/rides/add"
                                            icon={Car}
                                        >
                                            Adaugă o cursă
                                        </LinkButton>
                                        <LinkButton
                                            icon={LogOut}
                                            className="danger"
                                            onClick={async (e) => {
                                                setLoading(true);
                                                const res = await API.logout(user.token);
                                                if (res.success) {
                                                    API.deleteCache("user");
                                                    setShowAlert(true);
                                                    setError(false);
                                                    setTitle(
                                                        "Te-ai deconectat cu succes!"
                                                    );
                                                    setDescription(
                                                        "Te-ai deconectat cu succes, vei fi redirecționat în câteva secunde..."
                                                    );
                                                } else {
                                                    setError(true);
                                                    setLoading(false);
                                                    setTitle("Eroare la deconectare");
                                                    setDescription(res.message);
                                                    setShowAlert(true);
                                                }
                                            }}
                                        >
                                            Deconectează-te
                                        </LinkButton>
                                    </>
                                )}
                            </Flex>
                        </Popup>
                    </footer>
                </nav>
                {props.children}
            </div>
            <Alert
                type={error ? "error" : "success"}
                title={title}
                description={description}
                show={showAlert}
                timeout={3000}
                onTimeoutEnded={() => {
                    if (error) {
                        setLoading(false);
                        setShowAlert(false);
                        return;
                    }

                    setLoading(false);
                    window.location.reload();
                }}
            >
                <Ban className="icon"></Ban>
            </Alert>
        </>
    );
}
