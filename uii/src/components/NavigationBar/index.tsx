import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import MenuIcon from "@mui/icons-material/Menu";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import { NavLink } from "react-router-dom";
import { styled, Theme } from "@mui/material/styles";
import { Container } from "@mui/material";

export const DRAWER_WIDTH = 240;

const StyledLink = styled(NavLink)(() => ({
    textDecoration: "none",
    marginLeft: "16px",
}));

const StyledToolbar = styled(Toolbar)(({ theme }) => ({
    padding: 0,
    [theme.breakpoints.up("xs")]: {
        padding: 0,
    },
}));

const SmDownNoneUpBlock = (theme: Theme) => ({
    [theme.breakpoints.down("sm")]: {
        display: "none",
    },
    [theme.breakpoints.up("sm")]: {
        display: "block",
    },
});

const SmDownBlockUpNone = (theme: Theme) => ({
    [theme.breakpoints.down("sm")]: {
        display: "block",
    },
    [theme.breakpoints.up("sm")]: {
        display: "none",
    },
});

const StyledLogoNav = styled(Typography)(({ theme }) => ({
    flexGrow: 1,
    ...SmDownNoneUpBlock(theme),
}));

const StyledLogoDrawer = styled(Typography)(() => ({
    padding: 8,
}));

const StyledDrawerLinksContainer = styled(Typography)(({ theme }) => ({
    ...SmDownNoneUpBlock(theme),
}));

const StyledDrawer = styled(Drawer)(({ theme }) => ({
    "& .MuiDrawer-paper": {
        boxSizing: "border-box",
        width: DRAWER_WIDTH,
    },
    ...SmDownBlockUpNone(theme),
}));

function DrawerPill(props: NavigationItemSchema) {
    const { id, label, navigateTo } = props;
    return (
        <ListItem key={id} disablePadding>
            <ListItemButton sx={{ textAlign: "center" }}>
                <StyledLink to={navigateTo}>
                    <ListItemText primary={label} />
                </StyledLink>
            </ListItemButton>
        </ListItem>
    );
}

export interface NavigationItemSchema {
    label: string;
    id: string;
    navigateTo: string;
}

interface Props {
    logo: string;
    navigationItems: Array<NavigationItemSchema>;
}

export default function DrawerAppBar(props: Props) {
    const { logo, navigationItems } = props;

    const [mobileOpen, setMobileOpen] = React.useState(false);

    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen);
    };

    const drawer = (
        <Box onClick={handleDrawerToggle} sx={{ textAlign: "center" }}>
            <StyledLogoDrawer variant="h6">{logo}</StyledLogoDrawer>
            <Divider />
            <List>
                {navigationItems.map((item) => (
                    <DrawerPill {...item} key={item.id} />
                ))}
            </List>
        </Box>
    );

    return (
        <Box sx={{ display: "flex" }}>
            <AppBar component="nav" color="default">
                <Container>
                    <StyledToolbar>
                        <IconButton
                            color="inherit"
                            aria-label="open drawer"
                            edge="start"
                            onClick={handleDrawerToggle}
                            sx={{ mr: 2, display: { sm: "none" } }}
                        >
                            <MenuIcon />
                        </IconButton>
                        <StyledLogoNav variant="h6">{logo}</StyledLogoNav>
                        <StyledDrawerLinksContainer>
                            {navigationItems.map(
                                ({ id, label, navigateTo }) => (
                                    <StyledLink
                                        to={navigateTo}
                                        key={id}
                                        style={({ isActive }) =>
                                            isActive ? { fontWeight: 600 } : {}
                                        }
                                    >
                                        {label}
                                    </StyledLink>
                                )
                            )}
                        </StyledDrawerLinksContainer>
                    </StyledToolbar>
                </Container>
            </AppBar>
            <Box component="nav">
                <StyledDrawer
                    variant="temporary"
                    open={mobileOpen}
                    onClose={handleDrawerToggle}
                    ModalProps={{
                        keepMounted: true,
                    }}
                >
                    {drawer}
                </StyledDrawer>
            </Box>
        </Box>
    );
}
