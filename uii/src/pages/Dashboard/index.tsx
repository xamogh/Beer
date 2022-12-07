import { Button, Container } from "@mui/material";
import * as React from "react";
import TabComponentRenderer from "../../components/TabComponentRenderer";
import AddBeerContainer from "./containers/AddBeerContainer";
import AllBeerListContainer from "./containers/AllBeerListContainer";
import MyBeerListContainer from "./containers/MyBeerListContainer";

export default function Dashboard() {
    return (
        <Container maxWidth="lg">
            <TabComponentRenderer
                schema={[
                    {
                        key: "all-beers",
                        label: "All Beers",
                        component: <AllBeerListContainer />,
                    },
                    {
                        key: "my-beers",
                        label: "My Beers",
                        component: <MyBeerListContainer />,
                        actionItem: (
                            <AddBeerContainer
                                render={(onAddEvent) => (
                                    <Button
                                        onClick={onAddEvent}
                                        variant="contained"
                                        size="small"
                                    >
                                        Add a New Beer
                                    </Button>
                                )}
                            />
                        ),
                    },
                ]}
            />
        </Container>
    );
}
