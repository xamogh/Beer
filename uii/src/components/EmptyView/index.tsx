import { Box, styled, Typography } from "@mui/material";
import * as React from "react";

const EmptyViewRoot = styled("div")(() => ({
    width: "100%",
    height: "100%",
    backgroundColor: "#f3f0f0",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
}));

interface Props {
    children?: React.ReactNode;
}

export default function EmptyView(props: Props) {
    const { children = null } = props;
    return (
        <EmptyViewRoot>
            <Box textAlign="center">
                <Typography variant="subtitle1">
                    Nothing to see here...
                </Typography>
                {children}
            </Box>
        </EmptyViewRoot>
    );
}
