import { tw } from "twind"
import Link from 'next/link'
import { useQuery } from 'react-query'
import { getCategories } from "../services"

const Header = () => {
    const { isLoading, isError, data, error } = useQuery('categories', getCategories)

    if (isLoading){
        return <div>Loading...</div>
    }

    if (isError){
        return <div>Encountered a wild error : ${error}</div>
    }

    return (
        <div className={tw`container mx-auto px-10 mb-8`}>
            <div className={tw`text-white border-b flex justify-between items-center py-8`}>
                <Link href="/">
                    <span className={tw`cursor-pointer font-bold text-4xl `}>
                    GraphCMS
                    </span>
                </Link>
                <div className={tw`hidden md:flex space-x-4 font-medium`}>
                {
                    data.map((category) => (
                        <Link 
                            key={category.slug}
                            href={`/category/${category.slug}`}
                            className={tw`bg-red-400`}
                        >
                        {category.name}
                        </Link>
                    ))
                }
                </div>
            </div>
        </div>
    )
}

export default Header
