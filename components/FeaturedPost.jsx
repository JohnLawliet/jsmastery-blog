import React from 'react';
import moment from 'moment';
import Image from 'next/image';
import Link from 'next/link';
import { tw, apply } from 'twind';
import {css} from 'twind/css'

const BgImage = ({image}) => {
    // const instanceStyle = apply`absolute rounded-lg bg-center bg-no-repeat 
    // bg-cover shadow-md inline-block w-full h-72
    // ${css({
    //     backgroundImage: `url(${image})`
    // })}
    // `
    const instanceStyle = css({
        '@apply': 'absolute rounded-lg bg-center bg-no-repeat bg-cover shadow-md inline-block w-full h-72',
        backgroundImage: `url(${image})`
    })

    return <div className={tw(instanceStyle)}/>
}

const FeaturedPostCard = ({ post }) => (
  <div className={tw`relative h-72`}>
    <BgImage image={post.featuredImage.url}/>
    <div className={tw`absolute rounded-lg bg-center bg-gradient-to-b opacity-50 from-gray-400 via-gray-700 to-black w-full h-72`} />
    <div className={tw`flex flex-col rounded-lg p-4 items-center justify-center absolute w-full h-full`}>
      <p className={tw`text-white mb-4 text-shadow font-semibold text-xs`}>
        {moment(post.createdAt).format('MMM DD, YYYY')}
      </p>
      <p className={tw`text-white mb-4 text-shadow font-semibold text-2xl text-center`}>
        {post.title}
      </p>
      <div className={tw`flex items-center absolute bottom-5 w-full justify-center`}>
        <Image
          unoptimized
          alt={post.author.name}
          height="30px"
          width="30px"
          className={tw`align-middle drop-shadow-lg rounded-full`}
          src={post.author.photo.url}
        />
        <p className={tw`inline align-middle text-white text-shadow ml-2 font-medium`}>
            {post.author.name}
        </p>
      </div>
    </div>
    <Link href={`/post/${post.slug}`}>
    <span className={tw`cursor-pointer absolute w-full h-full`} />
    </Link>
  </div>
);

export default FeaturedPostCard;