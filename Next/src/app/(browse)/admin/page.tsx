import { getCollectionPopularity, getMonthlySales, getMostBoughtProduct, getMostLikedProduct, getSeriesPopularity, getWeeklySales } from "@/actions/getAnalytics";
import { ChartBoughtProducts } from "@/components/admin/analytics/chart-BoughtProducts";
import { ChartCollection } from "@/components/admin/analytics/chart-collections";
import { ChartLikedProducts } from "@/components/admin/analytics/chart-LikedProducts";
import { ChartSeries } from "@/components/admin/analytics/chart-series";
import { ChartWeeklyRevenue } from "@/components/admin/analytics/chart-weeklyRevenue";
import React from "react";

const AdminPage = async () => {
    const productPopularity = await getMostLikedProduct();
    const productBought = await getMostBoughtProduct();
    const seriesPopularity = await getSeriesPopularity();
    const collectionPopularity = await getCollectionPopularity();
    const weeklySales = await getWeeklySales();

    return (
        <div className="container mx-auto pt-8">
            <div className="mb-3">
                <h1 className="text-3xl font-bold tracking-tight">Analytics</h1>
                <p className="text-muted-foreground mt-2">
                    Up to date analytics from the platform products and revenue.
                </p>
            </div>

            <div className="justify-around">
                <div className="grid grid-cols-3 gap-4">
                    <ChartLikedProducts products={productPopularity} />

                    <ChartSeries products={seriesPopularity} />
                    <ChartCollection products={collectionPopularity} />

                    <ChartBoughtProducts products={productBought} />
                    <div className="col-span-2">
                        <ChartWeeklyRevenue products={weeklySales} />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default AdminPage;