import { Box, Tooltip } from "@mui/material";
import * as React from "react";
import {
    getIngredientNames,
    PunkApiBeer,
    usePunkApiBeers,
} from "../../../api/punkApi";
import EmptyView from "../../../components/EmptyView";
import InformationCard from "../../../components/InformationCard";
import List from "../../../components/List";
import scrollOnMutation from "../../../utils/scrollOnMutation";

let nextPage = 2;

export default function AllBeerListContainer() {
    const { isLoading, data, fetchNextPage, isFetching } = usePunkApiBeers();

    const completeDataSet = React.useMemo(() => {
        if (!data) return [];
        return data.pages.reduce((acc, cur) => acc.concat(...cur), []);
    }, [data]);

    return (
        <Box
            height="calc(100vh - 140px)"
            overflow="auto"
            p={1}
            id="list__all_beers"
        >
            <List<PunkApiBeer>
                items={completeDataSet}
                paginatorProps={{
                    hidePaginator: false,
                    onPageNextClick: () => {
                        fetchNextPage({ pageParam: nextPage });
                        nextPage++;
                        scrollOnMutation("list__all_beers", 64);
                    },
                    fetching: isFetching,
                }}
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
            />
        </Box>
    );
}
