import { GridProps, Link, styled, Tooltip, Typography } from "@mui/material";
import * as React from "react";
import { getIngredientNames, PunkApiBeer } from "../../../api/punkApi";
import EmptyView from "../../../components/EmptyView";
import InformationCard from "../../../components/InformationCard";
import List from "../../../components/List";
import AddBeerContainer from "./AddBeerContainer";

const ListContainerProps: GridProps = {
    rowSpacing: 3,
    columnSpacing: { xs: 1, sm: 2, md: 3 },
    height: "calc(100vh - 128px)",
};

const StyledLink = styled(Link)(() => ({
    textDecoration: "none",
    marginRight: "4px",
    cursor: "pointer",
    fontWeight: 700,
}));

export default function MyBeerListContainer() {
    return (
        <div>
            <List<PunkApiBeer>
                items={[]}
                itemRenderer={(row) => {
                    const { name, tagline, description, image_url } = row;
                    return (
                        <InformationCard
                            title={name}
                            subtitle={tagline}
                            text={description}
                            pictureElement={
                                <Tooltip
                                    title={`Ingredients: ${getIngredientNames(
                                        row
                                    )}`}
                                    arrow
                                    placement="top"
                                >
                                    <img
                                        src={image_url}
                                        height="120px"
                                        alt="beer"
                                    />
                                </Tooltip>
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
                containerProps={ListContainerProps}
            />
        </div>
    );
}
