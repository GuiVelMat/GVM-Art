"use client"

import { Bar, BarChart, CartesianGrid, LabelList, XAxis, YAxis } from "recharts"
import React from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle, } from "@/components/ui/card"
import { ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent, } from "@/components/ui/chart"

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function ChartLikedProducts({ products }: { products: any[] }) {
    const chartConfig = {
        likeCount: {
            label: 'Likes',
            color: '#FA8C00',
        },
        [products[0].productName]: {
            label: `${products[0].productName}`,
        },
        [products[1].productName]: {
            label: `${products[1].productName}`,
        },
        [products[2].productName]: {
            label: `${products[2].productName}`,
        },
        [products[3].productName]: {
            label: `${products[3].productName}`,
        },
        [products[4].productName]: {
            label: `${products[4].productName}`,
        },
    } satisfies ChartConfig

    return (
        <Card>
            <CardHeader>
                <CardTitle>Most liked products</CardTitle>
                <CardDescription>Most popular products from left to right</CardDescription>
            </CardHeader>
            <CardContent>
                <ChartContainer config={chartConfig} className="min-h-[200px] w-full">
                    <BarChart
                        accessibilityLayer
                        data={products}
                        layout="vertical"
                        margin={{
                            right: 16,
                        }}
                    >
                        <CartesianGrid horizontal={false} />
                        <YAxis
                            dataKey="productName"
                            type="category"
                            tickLine={false}
                            tickMargin={10}
                            axisLine={false}
                            tickFormatter={(value) => value.slice(0, 3)}
                            hide
                        />
                        <XAxis dataKey="likeCount" type="number" hide />
                        <ChartTooltip cursor={false} content={<ChartTooltipContent indicator="line" />} />
                        <Bar dataKey="likeCount" layout="vertical" radius={4}>
                            <LabelList
                                dataKey="productName"
                                position="insideLeft"
                                offset={8}
                                className="fill-[#FFF] font-bold text-lg"
                                fontSize={12}
                            />
                            <LabelList dataKey="likeCount" position="right" offset={8} className="fill-foreground" fontSize={12} />
                        </Bar>
                    </BarChart>
                </ChartContainer>
            </CardContent>
        </Card>
    )
}
