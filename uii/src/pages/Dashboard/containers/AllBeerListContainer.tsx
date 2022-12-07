import { Box, Button, GridProps, Tooltip } from "@mui/material";
import * as React from "react";
import {
    getIngredientNames,
    PunkApiBeer,
    useBeers,
} from "../../../api/punkApi";
import EmptyView from "../../../components/EmptyView";
import InformationCard from "../../../components/InformationCard";
import List from "../../../components/List";

const ListContainerProps: GridProps = {
    rowSpacing: 3,
    columnSpacing: { xs: 1, sm: 2, md: 3 },
    height: "calc(100vh - 128px)",
};

let page = 2;

export default function AllBeerListContainer() {
    const { isLoading, data, fetchNextPage } = useBeers();

    const completeDataSet = React.useMemo(() => {
        if (!data) return [];
        return data.pages.reduce((acc, cur) => acc.concat(...cur), []);
    }, [data]);

    return (
        <Box pb={2}>
            <Button
                onClick={() => {
                    fetchNextPage({ pageParam: page });
                    page++;
                }}
            >
                Next page
            </Button>
            <List<PunkApiBeer>
                items={completeDataSet}
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
                loading={isLoading}
                emptyView={<EmptyView />}
                onItemClick={(item) => console.log(item)}
                containerProps={ListContainerProps}
            />
        </Box>
    );
}
