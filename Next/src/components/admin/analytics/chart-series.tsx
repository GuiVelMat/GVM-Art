"use client"

import { Bar, BarChart, CartesianGrid, LabelList, XAxis } from "recharts"
import React from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle, } from "@/components/ui/card"
import { ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent, } from "@/components/ui/chart"

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function ChartSeries({ products }: { products: any[] }) {
    const chartConfig = {
        likeCount: {
            label: 'Likes',
            color: '#FA8C00',
        },
        [products[0].seriesName]: {
            label: `${products[0].seriesName}`,
        },
        [products[1].seriesName]: {
            label: `${products[1].seriesName}`,
        },
        [products[2].seriesName]: {
            label: `${products[2].seriesName}`,
        },
        [products[3].seriesName]: {
            label: `${products[3].seriesName}`,
        },
        [products[4].seriesName]: {
            label: `${products[4].seriesName}`,
        },
    } satisfies ChartConfig

    return (
        <Card>
            <CardHeader>
                <CardTitle>Most popular Series</CardTitle>
                <CardDescription>Most popular series from left to right</CardDescription>
            </CardHeader>
            <CardContent>
                <ChartContainer config={chartConfig} className="min-h-[200px] w-full">
                    <BarChart accessibilityLayer data={products}>
                        <CartesianGrid vertical={false} />
                        <XAxis
                            dataKey="seriesName"
                            tickLine={false}
                            tickMargin={10}
                            axisLine={false}
                            tickFormatter={(value) => value}
                        />
                        <ChartTooltip content={<ChartTooltipContent />} />
                        <Bar dataKey="likeCount" radius={4}>
                            <LabelList position="top" offset={12} className="fill-foreground" fontSize={12} />
                        </Bar>
                    </BarChart>
                </ChartContainer>
            </CardContent>
        </Card>
    )
}
