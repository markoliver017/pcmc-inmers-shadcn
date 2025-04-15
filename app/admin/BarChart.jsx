"use client";

import { TrendingUp } from "lucide-react";
import {
    Bar,
    BarChart,
    CartesianGrid,
    LabelList,
    XAxis,
    YAxis,
} from "recharts";

import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@components/ui/card";
import {
    ChartConfig,
    ChartContainer,
    ChartTooltip,
    ChartTooltipContent,
} from "@components/ui/chart";

export default function Component({ chartData, chartConfig, total }) {
    return (
        <Card className="flex-1">
            <CardHeader>
                <CardTitle>
                    Integrated National Medication Error Reporting System
                </CardTitle>
                <CardDescription>INMERS</CardDescription>
            </CardHeader>
            <CardContent>
                <ChartContainer config={chartConfig}>
                    <BarChart
                        accessibilityLayer
                        data={chartData}
                        layout="vertical"
                        margin={{
                            right: 16,
                        }}
                    >
                        <CartesianGrid horizontal={false} />
                        <YAxis
                            dataKey="name"
                            type="category"
                            tickLine={false}
                            tickMargin={10}
                            axisLine={false}
                            tickFormatter={(value) => value.slice(0, 3)}
                            hide
                        />
                        <XAxis dataKey="count" type="number" hide />
                        <ChartTooltip
                            cursor={false}
                            content={<ChartTooltipContent indicator="line" />}
                        />
                        <Bar
                            dataKey="count"
                            layout="vertical"
                            fill="var(--color-desktop)"
                            radius={4}
                        >
                            {/* <LabelList
                                dataKey="name"
                                position="insideLeft"
                                offset={8}
                                className="lg:font-bold sm:text-xs lg:text-lg"
                                fontSize="10px"
                            /> */}
                            <LabelList
                                dataKey="name"
                                position="right"
                                offset={8}
                                className="fill-foreground hidden xl:block"
                                fontSize={12}
                            />
                        </Bar>
                    </BarChart>
                </ChartContainer>
            </CardContent>
            <CardFooter className="flex-col items-start gap-2 text-sm">
                {/* <div className="flex gap-2 font-medium leading-none">
                    Trending up by 5.2% this month{" "}
                    <TrendingUp className="h-4 w-4" />
                </div> */}
                <div className="leading-none text-muted-foreground">
                    Showing overall form submission (<b>{total}</b>)
                </div>
            </CardFooter>
        </Card>
    );
}
