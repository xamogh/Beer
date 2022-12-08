import { Box, Container, styled } from "@mui/material";
import * as React from "react";

const AboutRoot = styled("div")(() => ({
    width: "100%",
    height: "calc(100vh - 80px)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    fontSize: "64px",
    color: "grey",
    fontFamily: "cursive",
    textAlign: "center",
}));

export default function About() {
    return (
        <Container>
            <AboutRoot>
                <Box>
                    <Box>Beer Inc.</Box>
                    <Box fontSize="16px">@2022</Box>
                </Box>
            </AboutRoot>
        </Container>
    );
}
