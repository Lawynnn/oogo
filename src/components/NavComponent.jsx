import React from "react";
import "../styles/NavComponent.css";
import { Popup } from "./Popup";
import Avatar from "./Avatar";
import Flex from "./Flex";
import LinkButton from "./LinkButton";
import { User, Car, LogOut } from "lucide-react";
import useAPI from "../hooks/useAPI";
import { useAlert } from "../hooks/useAlert";
import useTranslation from "../hooks/useTranslation";
import useCache from "../hooks/useCache";

export default function NavComponent(props) {
    const [pop, setPop] = React.useState(false);

    const api = useAPI();
    const alert = useAlert();
    const userCache = useCache("user");
    if (!userCache.cache) {
        console.log("No user cache found");
    }

    userCache.cache && userCache.expired && userCache.deleteCache();

    const { translate, getLanguage } = useTranslation();

    return (
        <>
            <div className="navbar-wrapper">
                <nav className="navbar">
                    <header
                        className="navbar-header"
                        onClick={(e) =>
                            (window.location.href = `/${getLanguage()}`)
                        }
                    >
                        <img
                            className="navbar-logo"
                            src="/assets/oogoLogoWhite.png"
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
                                    src={userCache.cache?.avatar}
                                    onClick={(e) => setPop(!pop)}
                                >
                                    <Avatar.Placeholder>
                                        {userCache.cache?.names?.first[0] +
                                            userCache.cache?.names?.last[0] || "GO"}
                                    </Avatar.Placeholder>
                                </Avatar>
                            }
                        >
                            <Flex dir="column" align="flex-start" gap="5px">
                                {!userCache.cache ? (
                                    <>
                                        <LinkButton
                                            href={`${getLanguage()}/login`}
                                        >
                                            {translate("login")}
                                        </LinkButton>
                                        <LinkButton
                                            desc={translate(
                                                "register_message_promote"
                                            )}
                                            href={`${getLanguage()}/register`}
                                        >
                                            {translate("register")}
                                        </LinkButton>
                                    </>
                                ) : (
                                    <>
                                        <LinkButton
                                            icon={User}
                                            desc={`${
                                                userCache.cache?.names?.first +
                                                " " +
                                                userCache.cache?.names?.last
                                            }`}
                                            href={`${getLanguage()}/profile`}
                                        >
                                            {translate("profile")}
                                        </LinkButton>
                                        <LinkButton
                                            href={`${getLanguage()}/rides/add`}
                                            icon={Car}
                                        >
                                            {translate("add_ride")}
                                        </LinkButton>
                                        <LinkButton
                                            icon={LogOut}
                                            className="danger"
                                            onClick={async (e) => {
                                                const r = await api.logout();
                                                if (r.success) {
                                                    return alert.showAlert(
                                                        translate(
                                                            "success_logout_message"
                                                        ),
                                                        translate(
                                                            "success_logout_title"
                                                        ),
                                                        "success",
                                                        3000,
                                                        500,
                                                        () => {
                                                            window.location.href = `/${getLanguage()}`;
                                                        }
                                                    );
                                                }
                                                alert.showAlert(
                                                    translate(
                                                        "error_logout_message"
                                                    ),
                                                    translate(
                                                        "error_logout_title"
                                                    ),
                                                    "error",
                                                    3000,
                                                    500
                                                );
                                            }}
                                        >
                                            {translate("logout")}
                                        </LinkButton>
                                    </>
                                )}
                            </Flex>
                        </Popup>
                    </footer>
                </nav>
                {props.children}
            </div>
        </>
    );
}
