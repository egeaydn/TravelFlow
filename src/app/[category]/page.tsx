export default async function CategoryPage({params}: {params: Promise<{category: string}>}){
    const {category} = await params

    return (
        <h1 className="mt-02">{category}</h1>
    )
}