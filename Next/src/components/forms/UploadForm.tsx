"use client"
import FileUpload from "@/components/Upload/FileUpload"
import type React from "react"
import { useEffect, useState } from "react"
import { useAppSelector } from "../../store/store"
import { selectCategories } from "../../store/slices/categoriesSlice"
import { selectSeries } from "../../store/slices/seriesSlice"
import { selectCollections } from "../../store/slices/collectionSlice"
import { selectTypes } from "../../store/slices/typesSlice"
import { Button } from "../ui/button"
import { useFileUpload } from "@/hooks/useFileUpload"
import { fetchWrapper } from "@/utils/fetch"
import { toast } from "@/hooks/use-toast"
import { useSession } from "next-auth/react"
import { redirect } from "next/navigation"

interface ProductForm {
    name: string
    categories: number[]
    size: string | null
    series: number
    collection: number
    types: { id: number; price: number }[]
    file: File | null
    email: string
}

interface UploadFormProps {
    productData?: ProductForm
    isEditing?: boolean
}

export default function UploadForm({ productData, isEditing = false }: UploadFormProps) {
    const session = useSession()
    const [product, setProduct] = useState<ProductForm>({
        name: "",
        categories: [],
        size: "",
        series: 0,
        collection: 0,
        types: [],
        file: null,
        email: session.data?.user.email || "",
    })
    const [loading, setLoading] = useState(false)
    const categories = useAppSelector(selectCategories)
    const series = useAppSelector(selectSeries)
    const collections = useAppSelector(selectCollections)
    const types = useAppSelector(selectTypes)
    const { uploadFiles } = useFileUpload()

    // Cargar datos del producto si estamos en modo edición
    useEffect(() => {
        if (isEditing && productData) {
            setProduct(productData)
        }
    }, [isEditing, productData])

    const onFieldChange = (val: Partial<ProductForm>) => {
        setProduct({ ...product, ...val })
    }

    const handleTypeSelection = (typeId: number, price: number) => {
        setProduct((prev) => {
            const existingType = prev.types.find((t) => t.id === typeId)
            if (existingType) {
                return {
                    ...prev,
                    types: prev.types.map((t) => (t.id === typeId ? { ...t, price } : t)),
                }
            } else {
                return {
                    ...prev,
                    types: [...prev.types, { id: typeId, price }],
                }
            }
        })
    }

    const handleFileChange = (file: File) => {
        if (file instanceof File) {
            setProduct((prev) => ({ ...prev, file }))
        } else {
            console.error("❌ Archivo inválido recibido en UploadForm")
        }
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setLoading(true)

        try {
            product.email = session.data?.user.email || ""

            // Si estamos editando y no hay un nuevo archivo, enviamos sin subir archivo
            if (!product.file && isEditing) {
                await fetchWrapper(`/api/products`, "PUT", product).then(() => {
                    toast({ title: "Producto actualizado exitosamente" })
                })
            } else if (product.file instanceof File) {
                const success = await uploadFiles([product.file])
                if (!success) {
                    console.error("Error: No se ha podido subir el archivo.")
                    setLoading(false)
                    return
                }

                // Determinar el método y URL basado en si estamos editando o creando
                const method = isEditing ? "PUT" : "POST"

                await fetchWrapper('/api/products', method, product).then(() => {
                    toast({
                        title: isEditing ? "Producto actualizado exitosamente" : "Producto creado exitosamente",
                    })
                })
            }
        } catch (error) {
            toast({
                title: isEditing ? "Error al actualizar el producto" : "Error al crear el producto",
            })
        }

        setLoading(false)
    }

    const handleSizeChange = (size: string) => {
        setProduct((prev) => ({
            ...prev,
            size: prev.size === size ? null : size,
        }))
    }

    return (
        <div className="flex justify-center items-center min-h-screen py-4 px-6">
            <form className="w-full max-w-screen-md space-y-6 shadow-md rounded-lg p-8 bg-zinc-500">
                <section>
                    <h1 className="text-3xl font-bold text-center mb-6">{isEditing ? "Edit Product" : "File upload"}</h1>
                    <FileUpload onFileChange={handleFileChange} />
                </section>

                {/* Name input */}
                <fieldset className="form-group mb-0">
                    <label className="block mb-1 text-lg font-semibold">Name</label>
                    <input
                        className="w-full px-3 py-2 text-gray-700 border rounded-md focus:outline-none focus:ring-2 focus:ring-gold focus:border-transparent"
                        type="text"
                        name="name"
                        placeholder={"product name"}
                        data-testid="input-name"
                        value={product.name}
                        onChange={(e) => onFieldChange({ name: e.target.value })}
                        disabled={loading}
                    />
                </fieldset>

                <div className="flex gap-4">
                    <fieldset className="form-group mb-0 w-1/2">
                        <label className="block mb-1 text-lg font-semibold">Series</label>
                        <select
                            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-gold focus:border-transparent text-black"
                            value={product.series}
                            onChange={(e) => setProduct({ ...product, series: Number(e.target.value) })}
                            disabled={loading}
                        >
                            <option value={0}>Select a series</option>
                            {series.map((series) => (
                                <option key={series.id} value={series.id}>
                                    {series.name}
                                </option>
                            ))}
                        </select>
                    </fieldset>

                    <fieldset className="form-group mb-0 w-1/2">
                        <label className="block mb-1 text-lg font-semibold">Collection</label>
                        <select
                            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-gold focus:border-transparent text-black"
                            value={product.collection}
                            onChange={(e) => setProduct({ ...product, collection: Number(e.target.value) })}
                            disabled={loading}
                        >
                            <option value={0}>Select a collection</option>
                            {collections.map((collection) => (
                                <option key={collection.id} value={collection.id}>
                                    {collection.name}
                                </option>
                            ))}
                        </select>
                    </fieldset>
                </div>

                {/* Size buttons */}
                <div className="flex gap-4">
                    <fieldset className="form-group mb-4 w-1/2">
                        <label className="block mb-2 text-lg font-semibold">Size</label>
                        <div className="flex flex-wrap gap-2">
                            {["tall", "wide", "square"].map((size) => (
                                <button
                                    key={size}
                                    type="button"
                                    onClick={() => handleSizeChange(size)}
                                    className={`px-4 py-2 rounded-md text-sm font-semibold transition-colors ${product.size === size ? "bg-gold text-white" : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                                        }`}
                                >
                                    {size}
                                </button>
                            ))}
                        </div>
                    </fieldset>

                    <fieldset className="form-group mb-4 w-1/2">
                        <label className="block mb-2 text-lg font-semibold">Categories</label>
                        <div className="flex flex-wrap gap-2">
                            {categories.map((category) => (
                                <button
                                    key={category.id}
                                    type="button"
                                    onClick={() => {
                                        setProduct((prev) => ({
                                            ...prev,
                                            categories: prev.categories.includes(category.id)
                                                ? prev.categories.filter((catId) => catId !== category.id)
                                                : [...prev.categories, category.id],
                                        }))
                                    }}
                                    className={`px-4 py-2 rounded-md text-sm font-semibold transition-colors ${product.categories.includes(category.id)
                                        ? "bg-gold text-white"
                                        : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                                        }`}
                                >
                                    {category.name}
                                </button>
                            ))}
                        </div>
                    </fieldset>
                </div>

                <div>
                    <fieldset className="form-group mb-0">
                        <label className="block mb-2 text-lg font-semibold">Types and prices</label>
                        <div className="space-y-2">
                            {types.map((type) => (
                                <div key={type.id} className="flex items-center gap-2">
                                    <button
                                        type="button"
                                        onClick={() => {
                                            const existingType = product.types.find((t) => t.id === type.id)
                                            if (existingType) {
                                                setProduct((prev) => ({
                                                    ...prev,
                                                    types: prev.types.filter((t) => t.id !== type.id),
                                                }))
                                            } else {
                                                handleTypeSelection(type.id, 0)
                                            }
                                        }}
                                        className={`px-4 py-2 rounded-md text-sm font-semibold transition-colors flex-grow text-left ${product.types.some((t) => t.id === type.id)
                                            ? "bg-gold text-white"
                                            : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                                            }`}
                                    >
                                        {type.name}
                                    </button>
                                    <input
                                        type="number"
                                        placeholder="Price"
                                        className="px-3 py-2 border rounded-md w-48 text-black focus:outline-none focus:ring-2 focus:ring-gold focus:border-transparent"
                                        value={product.types.find((t) => t.id === type.id)?.price || ""}
                                        onChange={(e) => handleTypeSelection(type.id, Number.parseFloat(e.target.value))}
                                        disabled={loading}
                                    />
                                </div>
                            ))}
                        </div>
                    </fieldset>
                </div>

                <Button
                    onClick={handleSubmit}
                    className="w-full bg-gold hover:bg-dark-gold text-white font-bold py-2 px-4 rounded-md transition-colors"
                >
                    {isEditing ? "Actualizar Producto" : "Crear Producto"}
                </Button>
            </form>
        </div>
    )
}

