import { Box, Link, styled, Typography } from "@mui/material";
import * as React from "react";
import { BeerQuery, useMyBeers } from "../../../api/beerServer";
import EmptyView from "../../../components/EmptyView";
import InformationCard from "../../../components/InformationCard";
import List from "../../../components/List";
import AddBeerContainer from "./AddBeerContainer";

const StyledLink = styled(Link)(() => ({
    textDecoration: "none",
    marginRight: "4px",
    cursor: "pointer",
    fontWeight: 700,
}));

export default function MyBeerListContainer() {
    const { data = [] } = useMyBeers();

    return (
        <Box
            height="calc(100vh - 140px)"
            overflow="auto"
            p={1}
            id="list__all_beers"
        >
            <List<BeerQuery>
                items={data}
                itemRenderer={(row) => {
                    const { name, genre, description, image } = row;
                    return (
                        <InformationCard
                            title={name}
                            subtitle={genre}
                            text={description}
                            pictureElement={
                                <img src={image} height="120px" alt="beer" />
                            }
                        />
                    );
                }}
                paginatorProps={{ hidePaginator: true }}
                loading={false}
                emptyView={
                    <EmptyView>
                        <Typography variant="subtitle2">
                            <AddBeerContainer
                                render={(onAddEvent) => (
                                    <StyledLink
                                        color="primary.dark"
                                        onClick={onAddEvent}
                                    >
                                        Click Here
                                    </StyledLink>
                                )}
                            />
                            to add your first beer!
                        </Typography>
                    </EmptyView>
                }
                onItemClick={(item) => console.log(item)}
            />
        </Box>
    );
}
