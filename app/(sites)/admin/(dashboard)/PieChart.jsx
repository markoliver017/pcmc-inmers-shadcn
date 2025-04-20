"use client";

import { File, PieChartIcon, TrendingUp } from "lucide-react";
import { LabelList, Pie, PieChart } from "recharts";

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

export function PieChartComponent({ chartData, chartConfig, total }) {
    return (
        <Card className="flex-1">
            <CardHeader className="items-center pb-0">
                <CardTitle>INMERS </CardTitle>
                <CardDescription>Medication Error Report Chart</CardDescription>
            </CardHeader>
            <CardContent className="flex-1 pb-0">
                <ChartContainer
                    config={chartConfig}
                    className="mx-auto aspect-square max-h-[250px] [&_.recharts-text]:fill-background"
                >
                    <PieChart>
                        <ChartTooltip
                            content={
                                <ChartTooltipContent
                                    nameKey="count"
                                    hideLabel
                                />
                            }
                        />
                        <Pie data={chartData} dataKey="count">
                            <LabelList
                                dataKey="name"
                                className="fill-background"
                                stroke="none"
                                fontSize={12}
                                formatter={(value) => chartConfig[value]?.label}
                            />
                        </Pie>
                    </PieChart>
                </ChartContainer>
            </CardContent>
            <CardFooter className="flex-col gap-2 text-sm">
                <div className="flex items-center gap-2 font-medium leading-none">
                    INMERS
                    <PieChartIcon className="h-4 w-4" />
                </div>
                <div className="leading-none text-muted-foreground">
                    Total number of reports ({total})
                </div>
                <div>
                    <ul className="list-none">
                        {chartData.map((report) => (
                            <li key={report.id} className="flex items-center">
                                <span
                                    style={{ backgroundColor: report.fill }}
                                    className=" mr-2 h-2 w-3"
                                ></span>
                                {report.name}
                            </li>
                        ))}
                    </ul>
                </div>
            </CardFooter>
        </Card>
    );
}
