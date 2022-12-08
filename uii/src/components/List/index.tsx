import { ArrowDownwardRounded } from "@mui/icons-material";
import { LoadingButton } from "@mui/lab";
import { Box, Grid, GridProps } from "@mui/material";
import * as React from "react";
import Spinner from "../Spinner";

type NoPaginator = { hidePaginator: true };
type YesPaginator = {
    hidePaginator: false;
    onPageNextClick: () => void;
    fetching: boolean;
};

type PaginatorProps = NoPaginator | YesPaginator;
interface Props<T> {
    items: Array<T>;
    onItemClick: (item: T) => void;
    itemRenderer: (item: T) => React.ReactNode;
    emptyView: React.ReactNode;
    loading: boolean;
    paginatorProps: PaginatorProps;
    containerProps?: GridProps;
    gridItemProps?: GridProps;
}

const DefaultListContainerProps: GridProps = {
    rowSpacing: 2,
    columnSpacing: { xs: 1, sm: 2, md: 2 },
};

const DefaultListGridItemProps: GridProps = {
    xs: 12,
    sm: 12,
    md: 6,
};

export default function List<T extends { id: number }>(props: Props<T>) {
    const {
        items,
        onItemClick,
        itemRenderer,
        emptyView,
        loading,
        containerProps = DefaultListContainerProps,
        gridItemProps = DefaultListGridItemProps,
        paginatorProps,
    } = props;

    if (items.length === 0) {
        return (
            <Box sx={{ height: "calc(100vh - 140px)" }}>
                {loading ? <Spinner /> : emptyView}
            </Box>
        );
    }

    return (
        <>
            <Grid container {...containerProps}>
                {items.map((item) => (
                    <Grid
                        item
                        onClick={() => onItemClick(item)}
                        key={item.id}
                        {...gridItemProps}
                    >
                        {itemRenderer(item)}
                    </Grid>
                ))}
            </Grid>
            {paginatorProps.hidePaginator ? null : (
                <Box display="flex" justifyContent="center" my={2}>
                    <LoadingButton
                        onClick={paginatorProps.onPageNextClick}
                        loading={paginatorProps.fetching}
                        endIcon={<ArrowDownwardRounded />}
                    >
                        Load more
                    </LoadingButton>
                </Box>
            )}
        </>
    );
}
