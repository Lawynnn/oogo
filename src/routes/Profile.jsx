import React from "react";
import NavComponent from "../components/NavComponent";
import Container from "../components/Container";
import Group from "../components/Group";
import LinkButton from "../components/LinkButton";
import Flex from "../components/Flex";
import API from "../api";
import Avatar from "../components/Avatar";
import InputComponent from "../components/InputComponent";
import { Save, X } from "lucide-react";
import RideSearch from "../components/RideSearch";

export default function Profile() {
    const [user, setUser] = React.useState(null);
    const [avatar, setAvatar] = React.useState(null);

    React.useEffect(() => {
        API.updateTheme();
        const u = API.getCache("user");
        if (!u) {
            return (window.location.href = "/login");
        }
        setUser(u);
        setAvatar(u.avatar);
    }, []);
    return (
        <>
            <NavComponent>
                {/* <RideSearch /> */}
            </NavComponent>
            <Container dir="column" align="center" justify="center" gap="10px">
                <Group
                    title="Setările personale"
                    description="Aici poți schimba setările contului tău"
                >
                    <Flex dir="row" align="center" gap="10px">
                        <Avatar src={avatar} size={"50px"}>
                            <Avatar.Placeholder>
                                {user?.names?.first[0] + user?.names?.last[0]}
                            </Avatar.Placeholder>
                        </Avatar>
                        <Flex dir="column" align="center" gap="5px">
                            <LinkButton variant="filled" icon={Save}>Salvează</LinkButton>
                            <LinkButton icon={X} className="danger">
                                Șterge avatarul
                            </LinkButton>
                        </Flex>
                    </Flex>
                </Group>
                <Group title="Despre tine" description="Informații despre tine">
                </Group>
            </Container>
        </>
    );
}
