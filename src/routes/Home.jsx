import React from "react";
import API from "../api";
import Container from "../components/Container";
import NavComponent from "../components/NavComponent";
import { Popup } from "../components/Popup";
import ComboBox from "../components/ComboBox";
import RideSearch from "../components/RideSearch";
import LinkButton from "../components/LinkButton";
import Group from "../components/Group";
import Avatar from "../components/Avatar";
import InputComponent from "../components/InputComponent";
import ButtonComponent from "../components/ButtonComponent";
import {
    ArrowRight,
    Facebook,
    Instagram,
    MoveRight,
    Palette,
    Save,
    Twitter,
} from "lucide-react";
import BackButton from "../components/BackButton";
import Form from "../components/Form";
import Flex from "../components/Flex";
import Card from "../components/Card";

export default function Home() {
    const [user, setUser] = React.useState(null);
    const [avatar, setAvatar] = React.useState(null);
    const [pop, setPop] = React.useState(false);

    const items = [
        {
            name: "Ford",
            description: "Mașină populară în Europa",
        },
        {
            name: "Chevrolet",
            description: "Mașină populară în America",
        },
        {
            name: "Toyota",
            description: "Mașină populară în Asia",
        },
        {
            name: "Volkswagen",
            description: "Mașină populară în Europa",
        },
        {
            name: "BMW",
            description: "Mașină de lux",
        },
    ];

    React.useEffect(() => {
        API.updateTheme();
        const u = API.getCache("user");
        if (!u) {
            return console.log("UNAUTHORIZED");
        }
        setUser(u);
        setAvatar(u.avatar);
    }, []);
    return (
        <>
            <NavComponent>
                <div className="ride-wrapper">
                    <RideSearch></RideSearch>
                </div>
            </NavComponent>
            <Flex className="sections" dir="column" align="center" gap="0px">
                <h1 className="big-title">
                    Caută curse spre locația dorită, și în siguranță
                </h1>

                <Flex
                    className="section secondary-section features-section"
                    dir="row"
                    align="center"
                    justify="space-evenly"
                    gap="10px"
                >
                    <Card
                        circle="left"
                        title="Încredere maximă"
                        description="Călătorești în siguranță, cu mașini atent verificate de echipa Oogo."
                    />
                    <Card
                        circle="left"
                        title="Preferințele curselor"
                        description="Ai șansa de ați alege preferințele cursei pe care o dorești."
                    />
                    <Card
                        circle="right"
                        title="Costuri reduse"
                        description="Economisește bani cu curse accesibile pentru toate buzunarele."
                    />
                    <Card
                        circle="right"
                        title="Curse oriunde"
                        description="Ajungi rapid la destinația ta oriunde în România."
                    />
                </Flex>
                <Flex
                    className="section bg-section search-section"
                    dir="column"
                    align="center"
                    justify="center"
                >
                    <LinkButton
                        iconed={MoveRight}
                        className="search-rides-btn"
                        variant="filled"
                    >
                        Caută curse astăzi
                    </LinkButton>
                </Flex>
                <Flex
                    className="section primary-section shield-section"
                    dir="row"
                    align="center"
                    justify="space-between"
                >
                    <h1 className="big-title">
                        Siguranța ta este în mâinile noastre
                    </h1>
                    <LinkButton
                        iconed={false}
                        className="safe-btn"
                        variant="filled"
                    >
                        Ajută-ne să te protejăm
                    </LinkButton>
                </Flex>
                <Flex
                    className="section bg-section most-searched-section"
                    dir="column"
                    align="center"
                    justify="center"
                    gap="20px"
                >
                    <h1 className="big-title">Cele mai căutate curse</h1>
                    <Flex
                        className="buttons"
                        dir="row"
                        align="center"
                        justify="space-evenly"
                    >
                        <LinkButton
                            iconed={false}
                            className="most-searched-btn"
                            variant="outline"
                        >
                            București <ArrowRight className="icon" /> Constanța
                        </LinkButton>
                        <LinkButton
                            iconed={false}
                            className="most-searched-btn"
                            variant="outline"
                        >
                            Iași <ArrowRight className="icon" /> București
                        </LinkButton>
                        <LinkButton
                            iconed={false}
                            className="most-searched-btn"
                            variant="outline"
                        >
                            Cluj-Napoca <ArrowRight className="icon" />{" "}
                            Timișoara
                        </LinkButton>
                    </Flex>
                </Flex>
                <Flex
                    className="section secondary-section publish-section"
                    dir="row"
                    align="center"
                    justify="space-between"
                >
                    <LinkButton
                        iconed={false}
                        className="publish-btn"
                        variant="filled"
                    >
                        Publică o cursă acum
                    </LinkButton>
                    <h1 className="big-title">
                        Economisește 100% din valoarea cursei
                    </h1>
                </Flex>
                <Flex
                    className="section tertiary-section footer-section"
                    dir="row"
                    align="center"
                    justify="space-between"
                >
                    <div className="card card-btns">
                        <LinkButton className="btn-link" href="/about">
                            Despre noi
                        </LinkButton>
                        <LinkButton className="btn-link" href="/how-it-works">
                            Cum funcționează
                        </LinkButton>
                        <LinkButton className="btn-link" href="/security">
                            Securitate
                        </LinkButton>
                        <LinkButton className="btn-link" href="/support">
                            Suport clienți
                        </LinkButton>
                    </div>
                    <Flex className="middle-part" dir="column" align="center">
                        <div className="v-separator"></div>
                        <LinkButton
                            className="tos-button"
                            href="/tos"
                            iconed={false}
                        >
                            Termeni și condiții
                        </LinkButton>
                        <img
                            src="/assets/oogoLogoWhite.png"
                            alt="Logo Small"
                            className="logo"
                        />
                    </Flex>
                    <Flex className="links" dir="column" align="center">
                        <LinkButton
                            className="link-btn"
                            variant="ghost"
                            icon={Palette}
                            iconed={false}
                            onClick={(e) => {
                                e.preventDefault();
                                const theme = API.getTheme();
                                API.setTheme(
                                    theme === "light" ? "dark" : "light"
                                );

                                API.updateTheme();
                            }}
                        >
                            Schimbă tema
                        </LinkButton>
                        <LinkButton
                            className="link-btn"
                            variant="ghost"
                            href="#facebok"
                            icon={Facebook}
                            iconed={false}
                        >
                            Facebook
                        </LinkButton>
                        <LinkButton
                            className="link-btn"
                            variant="ghost"
                            href="#instagram"
                            icon={Instagram}
                            iconed={false}
                        >
                            Instagram
                        </LinkButton>
                        <LinkButton
                            className="link-btn"
                            variant="ghost"
                            href="#twitter"
                            icon={Twitter}
                            iconed={false}
                        >
                            Twitter
                        </LinkButton>
                    </Flex>
                </Flex>
            </Flex>
        </>
    );
}
