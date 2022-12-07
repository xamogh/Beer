import * as React from "react";
import { styled } from "@mui/material/styles";
import NavigationBar from "../components/NavigationBar";
import { Box } from "@mui/material";
import { Outlet } from "react-router-dom";
import Spinner from "../components/Spinner";

const RootStyle = styled("div")({
    minHeight: "100%",
    overflow: "hidden",
});

const MainStyle = styled("div")(() => ({
    overflow: "auto",
    minHeight: "100%",
    marginTop: "72px",
}));

export default function RootLayout() {
    return (
        <RootStyle>
            <NavigationBar
                logo="Beer"
                navigationItems={[
                    { id: "1", label: "Dashboard", navigateTo: "/" },
                    { id: "2", label: "About", navigateTo: "/about" },
                ]}
            />
            <MainStyle>
                <React.Suspense
                    fallback={
                        <Box mt="25vh">
                            <Spinner />
                        </Box>
                    }
                >
                    <Outlet />
                </React.Suspense>
            </MainStyle>
        </RootStyle>
    );
}
