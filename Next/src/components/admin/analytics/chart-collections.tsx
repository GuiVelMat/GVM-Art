"use client"

import { Bar, BarChart, CartesianGrid, XAxis, LabelList } from "recharts"
import React from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle, } from "@/components/ui/card"
import { ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent, } from "@/components/ui/chart"

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function ChartCollection({ products }: { products: any[] }) {
    const chartConfig = {
        likeCount: {
            label: 'Likes',
            color: '#FA8C00',
        },
        [products[0].collectionName]: {
            label: `${products[0].collectionName}`,
        },
        [products[1].collectionName]: {
            label: `${products[1].collectionName}`,
        },
        [products[2].collectionName]: {
            label: `${products[2].collectionName}`,
        },
        [products[3].collectionName]: {
            label: `${products[3].collectionName}`,
        },
        [products[4].collectionName]: {
            label: `${products[4].collectionName}`,
        },
    } satisfies ChartConfig

    return (
        <Card>
            <CardHeader>
                <CardTitle>Most popular collections</CardTitle>
                <CardDescription>Most popular collections from left to right</CardDescription>
            </CardHeader>
            <CardContent>
                <ChartContainer config={chartConfig} className="min-h-[200px] w-full">
                    <BarChart accessibilityLayer data={products}>
                        <CartesianGrid vertical={false} />
                        <XAxis
                            dataKey="collectionName"
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
