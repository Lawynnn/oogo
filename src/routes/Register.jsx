import React from "react";
import Container from "../components/Container";
import InputComponent from "../components/InputComponent";
import ButtonComponent from "../components/ButtonComponent";
import { Calendar, ChevronRight } from "lucide-react";
import Flex from "../components/Flex";
import BackButton from "../components/BackButton";
import API from "../api";
import { OTPGroup, OTPInput, OTPSeparator, OTPSlot } from "../components/OTP";

export default function Register() {
    const [renderStep, setRenderStep] = React.useState(0);

    const [email, setEmail] = React.useState("");
    const [password, setPassword] = React.useState("");
    const [confirmPassword, setConfirmPassword] = React.useState("");
    const [firstName, setFirstName] = React.useState("");
    const [lastName, setLastName] = React.useState("");
    const [dob, setDob] = React.useState("");
    const [submitDisabled, setSubmitDisabled] = React.useState(true);
    const [otp, setOtp] = React.useState("");

    const [loading, setLoading] = React.useState(false);

    function setTab(index) {
        React.startTransition(() => {
            setRenderStep(index);
        });
    }

    if (renderStep === 3) {
        return (
            <Container dir="col" gap="10px" align="center">
                <div className="wrapper">
                    {/* <BackButton onClick={() => setTab(0)}></BackButton> */}
                    <h2 className="otp-description">We've sent you an code via email, paste into here</h2>
                    <OTPInput
                        length={6}
                        w={70}
                        onModify={(value) => {
                            setOtp(value);
                        }}
                    />
                    <ButtonComponent
                        style={{
                            width: "100%",
                        }}
                        text="Next"
                        icon={ChevronRight}
                        disabled={otp.length !== 6}
                        loading={loading}
                        onClick={async () => {
                            setLoading(true);
                            const res = await API.verify(otp, {
                                email,
                                password,
                                names: {
                                    first: firstName,
                                    last: lastName,
                                },
                                birth: dob,
                            });

                            const user = await API.getUser(res.token);
                            API.cache("user", user.user);
                            
                            setLoading(false);
                            console.log(res);
                        }}
                    ></ButtonComponent>
                </div>
            </Container>
        );
    } else if (renderStep === 1) {
        return (
            <Container dir="col" gap="10px" align="flex-start">
                <Flex dir="row" gap="10px">
                    <InputComponent
                        type="text"
                        placeholder="First Name"
                        description="Enter your first name (eg. John)"
                        value={firstName}
                        onInput={(e) => setFirstName(e.target.value)}
                    ></InputComponent>
                    <InputComponent
                        type="text"
                        placeholder="Last Name"
                        description="Enter your last name (eg. Doe)"
                        value={lastName}
                        onInput={(e) => setLastName(e.target.value)}
                    ></InputComponent>
                </Flex>
                <InputComponent
                    type="date"
                    description="Enter your date of birth"
                    value={dob}
                    onInput={(e) => setDob(e.target.value)}
                ></InputComponent>
                <ButtonComponent
                    text="Next"
                    icon={ChevronRight}
                    onClick={() => {
                        setTab(2);
                        // TODO complete checks
                    }}
                ></ButtonComponent>
            </Container>
        );
    } else if (renderStep === 2) {
        return (
            <Container dir="col" gap="10px" align="flex-start">
                <BackButton onClick={() => setTab(1)}></BackButton>
                <InputComponent
                    type="password"
                    placeholder="Password"
                    description="Enter your password"
                    value={password}
                    onInput={(e) => {
                        setPassword(e.target.value);
                        if (e.target.value !== confirmPassword) {
                            setSubmitDisabled(true);
                        } else {
                            setSubmitDisabled(false);
                        }
                    }}
                ></InputComponent>
                <InputComponent
                    type="password"
                    placeholder="Confirm Password"
                    description="Confirm your password"
                    value={confirmPassword}
                    onInput={(e) => {
                        setConfirmPassword(e.target.value);
                        if (e.target.value !== password) {
                            setSubmitDisabled(true);
                        } else {
                            setSubmitDisabled(false);
                        }
                    }}
                ></InputComponent>
                <ButtonComponent
                    text="Next"
                    icon={ChevronRight}
                    disabled={submitDisabled}
                    onClick={() => {
                        // TODO complete checks
                        setTab(3);
                    }}
                ></ButtonComponent>
            </Container>
        );
    }

    return (
        <Container dir="col" gap="10px" align="flex-start">
            <InputComponent
                type="text"
                placeholder="Email"
                description="Enter your email"
                onInput={(e) => setEmail(e.target.value)}
                value={email}
            ></InputComponent>
            <ButtonComponent
                text="Next"
                icon={ChevronRight}
                loading={loading}
                onClick={async () => {
                    // TODO complete checks
                    setLoading(true);
                    const res = await API.register(email);
                    setLoading(false);
                    if (!res.success) {
                        console.log(res);
                        return;
                    }
                    console.log(res);
                    setTab(1);
                }}
            ></ButtonComponent>
        </Container>
    );
}
