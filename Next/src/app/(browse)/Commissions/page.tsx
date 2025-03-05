import ArtCarousel from '@/components/carousel/CommisionCarousel';
import { CommissionForm } from '@/components/forms/CommissionForm';
import React from 'react';

const Commissions = () => {
    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-4xl font-bold text-center text-white">Art Commissions</h1>
            <div className="flex mb-8">
                <div className="w-1/2 pr-2">
                    <ArtCarousel sheet={1} />
                </div>
                <div className="w-1/2 pl-2">
                    <ArtCarousel sheet={2} />
                </div>
            </div>
            <div className="flex justify-center">
                <div className="w-full max-w-2xl">
                    <h2 className="text-2xl text-white font-semibold mb-4 text-center">Request a Commission</h2>
                    <CommissionForm />
                </div>
            </div>
        </div>
    )
};

export default Commissions