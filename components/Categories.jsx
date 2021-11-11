import Link from 'next/link'
import { getCategories } from '../services'
import { tw } from 'twind'
import { useQuery } from 'react-query'
import { Loader } from '.' 

const Categories = () => {
    const { isLoading, isError, data, error } = useQuery('categories', getCategories)

    if (isLoading){
        return <div><Loader /></div>
    }

    if (isError){
        return <div>Encountered a wild error : ${error}</div>
    }

    return (
        <div className={tw`bg-white shadow-lg rounded-lg p-8 mb-8 pb-12`}>
            <h3 className={tw`text-xl font-semibold mb-8 border-b pb-4`}>
                Categories
            </h3>
            {
                data.map(category => (
                    <Link 
                        key={category.slug}
                        href={`/category/${category.slug}`}
                    >
                        <span className={tw`cursor-pointer block pb-3 mb-3`}>
                            {category.name}
                        </span>
                    </Link>
                ))
            }
        </div>
    )
}

export default Categories
