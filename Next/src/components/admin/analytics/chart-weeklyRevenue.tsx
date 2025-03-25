"use client"

import { CartesianGrid, XAxis, LabelList, AreaChart, Area } from "recharts"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { type ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import React from "react"

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function ChartWeeklyRevenue({ products }: { products: any[] }) {
    const totalRevenue = products.reduce((acc, product) => acc + product.totalamount, 0);

    const chartConfig = {
        totalamount: {
            label: "Total Amount: ",
            color: "hsl(var(--chart-1))",
        },
        [products[0].date]: {
            label: `${products[0].date}`,
        },
        [products[1].date]: {
            label: `${products[1].date}`,
        },
        [products[2].date]: {
            label: `${products[2].date}`,
        },
        [products[3].date]: {
            label: `${products[3].date}`,
        },
        [products[4].date]: {
            label: `${products[4].date}`,
        },
        [products[5].date]: {
            label: `${products[5].date}`,
        },
        [products[6].date]: {
            label: `${products[6].date}`,
        },
    } satisfies ChartConfig

    return (
        <Card>
            <CardHeader>
                <CardTitle>Last 7 days revenue: <span className="text-green-600">{totalRevenue}€</span></CardTitle>
                <CardDescription>How much money have your earned per day for the last 7 days</CardDescription>
            </CardHeader>
            <CardContent>
                <ChartContainer config={chartConfig} className="h-[260px] w-full">
                    <AreaChart
                        accessibilityLayer
                        data={products}
                        margin={{
                            left: 12,
                            right: 12,
                        }}
                    >
                        <CartesianGrid vertical={false} />
                        <XAxis
                            dataKey="date"
                            tickLine={false}
                            axisLine={false}
                            tickMargin={8}
                            tickFormatter={(value) => {
                                // Verificar si value es un string o un objeto Date
                                if (typeof value === "string") {
                                    // Si es un string, intentar convertirlo a Date
                                    const date = new Date(value)
                                    return date.toLocaleDateString("es-ES", { day: "2-digit", month: "short" })
                                } else if (value instanceof Date) {
                                    // Si ya es un objeto Date
                                    return value.toLocaleDateString("es-ES", { day: "2-digit", month: "short" })
                                } else {
                                    // Fallback por si el valor no es reconocible
                                    return String(value)
                                }
                            }}
                        />
                        <ChartTooltip
                            cursor={false}
                            content={
                                <ChartTooltipContent
                                    labelFormatter={(value) => {
                                        // Formatear la fecha en el tooltip
                                        if (typeof value === "string") {
                                            const date = new Date(value)
                                            return date.toLocaleDateString("es-ES", {
                                                day: "2-digit",
                                                month: "long",
                                                year: "numeric",
                                            })
                                        } else if (value instanceof Date) {
                                            return value.toLocaleDateString("es-ES", {
                                                day: "2-digit",
                                                month: "long",
                                                year: "numeric",
                                            })
                                        }
                                        return String(value)
                                    }}
                                />
                            }
                        />
                        {/* type= natural, linear, step */}
                        <Area dataKey="totalamount" type="linear" fill="#33AF52" fillOpacity={0.4} stroke="#33AF52">
                            <LabelList position={"top"} offset={12} fontSize={12} />
                        </Area>
                    </AreaChart>
                </ChartContainer>
            </CardContent>
        </Card>
    )
}

