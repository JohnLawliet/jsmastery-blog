import { tw } from "twind"
import Image from 'next/image'

const Author = ({author}) => {
    return (
        <div className={tw`text-center mt-20 mb-8 p-12 relative rounded-lg bg-black bg-opacity-20`}>
            <div className={tw`absolute left-0 right-0 -top-14`}>
                <Image
                    alt={author.name}
                    unoptimized
                    height={100}
                    width={100} 
                    src={author.photo.url} 
                    alt={author.name} 
                    className={tw`object-cover align-middle rounded-full`}
                />
            </div>
            <h3 className={tw`text(xl white) my-4 font-bold`}>
            {author.name}
            </h3>       
            <p className={tw`text(white lg)`}>{author.bio}</p>     
        </div>
    )
}

export default Author
