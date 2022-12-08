import * as React from "react";
import {
    CircularProgress,
    CircularProgressProps,
    styled,
    Typography,
} from "@mui/material";

const RootStyle = styled("div")(() => ({
    height: "100%",
    width: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "column",
}));

interface SpinnerProps extends CircularProgressProps {
    moduleText?: string;
    children?: React.ReactNode;
}

const DEFAULT_LOADER_TEXT = "This section is being generated! Please wait!";

export default function Spinner(props: SpinnerProps) {
    const { moduleText, children, ...circularProgressProps } = props;
    return (
        <RootStyle>
            <CircularProgress {...circularProgressProps} />
            {moduleText || (
                <Typography sx={{ mt: "32px" }}>
                    {DEFAULT_LOADER_TEXT}
                </Typography>
            )}
            {children}
        </RootStyle>
    );
}
