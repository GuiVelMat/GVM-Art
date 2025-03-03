import type { ProductItem } from "@/types/Product"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Edit, ExternalLink } from "lucide-react"
import Image from "next/image"
import React from "react"
import Link from "next/link"

export const CardProductAdmin = (product: ProductItem) => {
    return (
        <Card className="flex flex-col sm:flex-row gap-6 p-4 hover:shadow-lg transition-shadow">
            <div className="relative w-full sm:w-[200px] h-[200px] rounded-lg overflow-hidden bg-muted">
                <Image
                    src={`/assets/products/${product.ImagesProduct[0].src}`}
                    alt={product.name}
                    fill
                    className="object-cover"
                />
            </div>

            <div className="flex-1 flex flex-col justify-between">
                <div className="space-y-2">
                    <div className="flex items-start justify-between gap-2">
                        <div>
                            <h2 className="text-xl font-semibold line-clamp-2">{product.name} #{product.id}</h2>
                            <p className="text-sm text-muted-foreground mt-1">Col: {product.collections.name}</p>
                            <p className="text-sm text-muted-foreground mt-1">Series: {product.series.name}</p>
                        </div>
                    </div>
                </div>

                <div className="flex flex-col items-end gap-2 mt-4">
                    <Link href={`/admin/products/edit/${product.slug}`} passHref>
                        <Button variant="outline" size="sm" className="flex items-center gap-2">
                            <Edit className="w-4 h-4" />
                            Editar
                        </Button>
                    </Link>
                    <Link href={`/Details/${product.slug}`} target="_blank" rel="noopener noreferrer">
                        <Button size="sm" className="bg-zinc-800 hover:bg-zinc-600 flex items-center gap-2">
                            <ExternalLink className="w-4 h-4" />
                            Go to shop
                        </Button>
                    </Link>
                </div>
            </div>
        </Card>
    )
}

