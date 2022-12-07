import { Box, Card, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";
import * as React from "react";

const StyledCard = styled(Card)(() => ({
    cursor: "pointer",
    display: "flex",
    transition: "0.2s ease",
    "&:hover": {
        backgroundColor: "#CEE5ED",
    },
}));

interface Props {
    title: string;
    subtitle: string;
    text: string;
    pictureElement: React.ReactNode;
}

export default function InformationCard(props: Props) {
    const { title, subtitle, text, pictureElement } = props;
    return (
        <StyledCard sx={{ p: 2 }}>
            <Box minWidth="72px" p={2}>
                {pictureElement}
            </Box>
            <Box height="144px" overflow="auto">
                <Typography variant="h6" fontWeight={600}>
                    {title}
                </Typography>
                <Typography
                    sx={{ color: "#CC903A" }}
                    fontWeight={600}
                    variant="subtitle2"
                >
                    {subtitle}
                </Typography>
                <Typography variant="body2" mt={0.5}>
                    {text}
                </Typography>
            </Box>
        </StyledCard>
    );
}
