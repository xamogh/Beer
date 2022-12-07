import { Tab, Tabs, Box, Grid, styled } from "@mui/material";
import * as React from "react";

const TabsContainerRoot = styled("div")(() => ({
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
}));

interface SchemaItem {
    label: string;
    key: string;
    component: React.ReactNode;
    actionItem?: React.ReactNode;
}

interface Props {
    defaultActiveKey?: string;
    schema: Array<SchemaItem>;
}

function a11yProps(index: string) {
    return {
        id: `simple-tab-${index}`,
        "aria-controls": `simple-tabpanel-${index}`,
    };
}

interface TabPanelProps {
    children?: React.ReactNode;
    index: string;
    value: string;
}

function TabPanel(props: TabPanelProps) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            {value === index && <Box>{children}</Box>}
        </div>
    );
}

export default function TabComponentRenderer(props: Props) {
    const { defaultActiveKey, schema } = props;

    const [activeTab, setActiveTab] = React.useState<string | undefined>(
        defaultActiveKey || schema[0]?.key || undefined
    );

    const activeSchemaItem = schema.find(
        (schemaItem) => schemaItem.key === activeTab
    );

    return (
        <Box sx={{ width: "100%" }}>
            <TabsContainerRoot>
                <Tabs
                    value={activeTab}
                    onChange={(_, v) => {
                        setActiveTab(v);
                    }}
                    aria-label="tabs-beer"
                    TabIndicatorProps={{
                        style: { display: "none" },
                    }}
                >
                    {schema.map((item) => (
                        <Tab
                            key={item.key}
                            label={item.label}
                            {...a11yProps(item.key)}
                            value={item.key}
                        />
                    ))}
                </Tabs>
                {activeSchemaItem?.actionItem && (
                    <Grid item xs={3}>
                        {activeSchemaItem.actionItem}
                    </Grid>
                )}
            </TabsContainerRoot>
            {schema.map((item) => (
                <TabPanel
                    value={activeTab || ""}
                    key={item.key}
                    index={item.key}
                >
                    {item.component}
                </TabPanel>
            ))}
        </Box>
    );
}
