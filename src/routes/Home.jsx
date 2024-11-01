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
import useTranslation from "../hooks/useTranslation";

export default function Home() {
    const { translate } = useTranslation();
    React.useEffect(() => {
        API.updateTheme();
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
                    {translate("header_1")}
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
                        title={translate("feature_1_title")}
                        description={translate("feature_1")}
                    />
                    <Card
                        circle="left"
                        title={translate("feature_2_title")}
                        description={translate("feature_2")}
                    />
                    <Card
                        circle="right"
                        title={translate("feature_3_title")}
                        description={translate("feature_3")}
                    />
                    <Card
                        circle="right"
                        title={translate("feature_4_title")}
                        description={translate("feature_4")}
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
                        {translate("search_rides")}
                    </LinkButton>
                </Flex>
                <Flex
                    className="section primary-section shield-section"
                    dir="row"
                    align="center"
                    justify="space-between"
                >
                    <h1 className="big-title">
                        {translate("header_2")}
                    </h1>
                    <LinkButton
                        iconed={false}
                        className="safe-btn"
                        variant="filled"
                    >
                        {translate("help_for_help")}
                    </LinkButton>
                </Flex>
                <Flex
                    className="section bg-section most-searched-section"
                    dir="column"
                    align="center"
                    justify="center"
                    gap="20px"
                >
                    <h1 className="big-title">{translate("header_3")}</h1>
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
                        {translate("publish_ride")}
                    </LinkButton>
                    <h1 className="big-title">
                        {translate("header_4")}
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
                            {translate("about_us")}
                        </LinkButton>
                        <LinkButton className="btn-link" href="/how-it-works">
                            {translate("how_it_works")}
                        </LinkButton>
                        <LinkButton className="btn-link" href="/security">
                            {translate("security")}
                        </LinkButton>
                        <LinkButton className="btn-link" href="/support">
                            {translate("support_clients")}
                        </LinkButton>
                    </div>
                    <Flex className="middle-part" dir="column" align="center">
                        <div className="v-separator"></div>
                        <LinkButton
                            className="tos-button"
                            href="/tos"
                            iconed={false}
                        >
                            {translate("terms_conditions")}
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
                            {translate("change_theme")}
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
