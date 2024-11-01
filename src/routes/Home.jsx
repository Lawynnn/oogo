import React from "react";
import API from "../api";
import NavComponent from "../components/NavComponent";
import RideSearch from "../components/RideSearch";
import LinkButton from "../components/LinkButton";
import {
    ArrowRight,
    Facebook,
    Instagram,
    MoveRight,
    Palette,
    Twitter,
} from "lucide-react";
import Flex from "../components/Flex";
import Card from "../components/Card";
import { useParams } from "react-router-dom";

export default function Home() {
    const params = useParams();
    const [language, setLanguage] = React.useState(API.language);

    React.useEffect(() => {
        API.updateTheme();
        API.setLanguage(params);
        setLanguage(API.language);
        console.log(API.language);
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
                    {API.getTranslation("header_1", language)}
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
                        title={API.getTranslation("feature_1_title", language)}
                        description={API.getTranslation("feature_1", language)}
                    />
                    <Card
                        circle="left"
                        title={API.getTranslation("feature_2_title", language)}
                        description={API.getTranslation("feature_2", language)}
                    />
                    <Card
                        circle="right"
                        title={API.getTranslation("feature_3_title", language)}
                        description={API.getTranslation("feature_3", language)}
                    />
                    <Card
                        circle="right"
                        title={API.getTranslation("feature_4_title", language)}
                        description={API.getTranslation("feature_4", language)}
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
                        {API.getTranslation("search_rides", language)}
                    </LinkButton>
                </Flex>
                <Flex
                    className="section primary-section shield-section"
                    dir="row"
                    align="center"
                    justify="space-between"
                >
                    <h1 className="big-title">
                        {API.getTranslation("header_2", language)}
                    </h1>
                    <LinkButton
                        iconed={false}
                        className="safe-btn"
                        variant="filled"
                    >
                        {API.getTranslation("help_for_help", language)}
                    </LinkButton>
                </Flex>
                <Flex
                    className="section bg-section most-searched-section"
                    dir="column"
                    align="center"
                    justify="center"
                    gap="20px"
                >
                    <h1 className="big-title">{API.getTranslation("header_3", language)}</h1>
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
                        {API.getTranslation("publish_ride", language)}
                    </LinkButton>
                    <h1 className="big-title">
                        {API.getTranslation("header_4", language)}
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
                            {API.getTranslation("about_us", language)}
                        </LinkButton>
                        <LinkButton className="btn-link" href="/how-it-works">
                            {API.getTranslation("how_it_works", language)}
                        </LinkButton>
                        <LinkButton className="btn-link" href="/security">
                            {API.getTranslation("security", language)}
                        </LinkButton>
                        <LinkButton className="btn-link" href="/support">
                            {API.getTranslation("support_clients", language)}
                        </LinkButton>
                    </div>
                    <Flex className="middle-part" dir="column" align="center">
                        <div className="v-separator"></div>
                        <LinkButton
                            className="tos-button"
                            href="/tos"
                            iconed={false}
                        >
                            {API.getTranslation("terms_conditions", language)}
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
                            {API.getTranslation("change_theme", language)}
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
