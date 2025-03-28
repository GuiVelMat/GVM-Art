import getSeries from '@/actions/getSeries';
import React from 'react'
import { CardSeries } from '../shared/Cards/CardSeries';

const BentoGridSeries = async () => {
    const seriesList = await getSeries();

    const limitedSeriesList = seriesList.series.slice(0, 6);

    return (
        <section className='bg-gradient-to-b from-transparent to-zinc-600'>
            <div className='container mx-auto text-shadow-lg'>
                <h1 className='text-5xl italic font-bold text-white'>Your favourite series</h1>
                <div className="grid max-h-screen h-auto p-4 md:grid-cols-2 lg:grid-cols-6 lg:grid-rows-3 gap-5 mt-5">
                    {limitedSeriesList.map((series, index) => (
                        <CardSeries key={series.id} series={series} ind={index} />
                    ))}
                </div >
            </div>
        </section>

    )
}

export default BentoGridSeries;