import React from "react";
import API from "../api";
import Container from "../components/Container";
import NavComponent from "../components/NavComponent";
import { Popup } from "../components/Popup";
import ComboBox from "../components/ComboBox";
import RideSearch from "../components/RideSearch";
import LinkButton from "../components/LinkButton";
import { Group } from "../components/Group";
import Avatar from "../components/Avatar";
import InputComponent from "../components/InputComponent";
import ButtonComponent from "../components/ButtonComponent";
import { Save } from "lucide-react";
import BackButton from "../components/BackButton";
import Form from "../components/Form";

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
            <Container
                gap="10px"
                dir="column"
                justify="flex-end"
                align="flex-end"
            >
                <Group title="My awesome group" description="Ceva grupa misto">
                    <Group
                        title="Avatar Settings"
                        description="Modifica setarile avatarului"
                    >
                        <BackButton></BackButton>
                        <LinkButton href="/settings">
                            Modifică setările
                        </LinkButton>
                        <Form.Check>
                            <InputComponent
                                type="text"
                                placeholder="Ceva test"
                                check={(v) => {
                                    if (!v)
                                        return {
                                            success: false,
                                            message: "Câmpul este obligatoriu",
                                        };
                                    return { success: true };
                                }}
                            ></InputComponent>
                        </Form.Check>

                        <Avatar src={avatar}>
                            <Avatar.Placeholder>BUT</Avatar.Placeholder>
                        </Avatar>
                        <ButtonComponent
                            text="Salvează"
                            icon={Save}
                        ></ButtonComponent>
                    </Group>
                    <ComboBox
                        search={true}
                        items={items}
                        placeholder={"Nicio mașină selectată"}
                        searchplaceholder={"Caută o mașină..."}
                    ></ComboBox>
                </Group>
            </Container>
        </>
    );
}
