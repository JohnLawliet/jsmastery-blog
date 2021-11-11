import { tw } from "twind"
import moment from 'moment'
import Link from 'next/link'

const PostCard = ({post}) => {
    return (
        <div className={tw`bg-white shadow-lg rounded-lg p-0 lg:p-8 pb-12 mb-8`}>
            <div className={tw`relative overflow-hidden shadow-md pb-80 mb-6`}>
                <img 
                src={post.featuredImage.url} 
                alt={post.title} 
                className={tw`object-top absolute h-80 w-full object-cover shadow-lg rounded-t-lg lg:rounded-lg`}
                />
            </div>
            <h1 className={tw`transition duration-700 text(center 3xl) mb-8 cursor-pointer hover:text-pink-600 font-semibold`}>
                <Link
                    href={`/post/${post.slug}`}
                >
                {post.slug}
                </Link>
            </h1>
            <div className={tw`block lg:flex text-center items-center justify-center mb-8 w-full`}>
                <div className={tw`flex items-center justify-center mb-4 mr-8 w-full lg:(mb-0 w-auto)`}>
                    <img 
                        alt={post.author.name}
                        className={tw`align-middle rounded-full h-[30px] w-[30px] object-contain`}
                        src={post.author.photo.url}
                    />
                    <p className={tw`inline align-middle text(lg gray-700) ml-2`}>{post.author.name}</p>
                </div>
                <div className={tw`font-medium text-gray-700`}>
                    <svg xmlns="http://www.w3.org/2000/svg" className={tw`h-6 w-6 inline mr-2 text-pink-500`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" 
                    />
                    </svg>
                    <span>
                        {moment(post.createdAt).format('MMMM DD, YYYY')}
                    </span>
                </div>
            </div>
            <p className={tw`text(center lg gray-700) font-normal px-4 lg:px-20 mb-8`}>
            {post.excerpt}
            </p>
            <div className={tw`text(center white lg) `}>
                <Link
                    href={`/post/${post.slug}`}
                >
                <a className={tw`transition duration-500 transform hover:-translate-y-1 inline-block bg-pink-600 font-medium rounded-full px-8 py-3 cursor-pointer`}>
                Continue Reading...
                </a>
                </Link>
            </div>
        </div>
    )
}

export default PostCard
