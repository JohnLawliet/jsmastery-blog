import { tw } from "twind"
import {useState, useEffect, useRef} from 'react'
import {submitComment} from '../services'
import { useMutation } from 'react-query'
import { toast } from 'react-toastify';

const CommentsForm = ({slug}) => {
    const toastId = useRef(null);
    const notify = () => toastId.current = toast("Sending to server for review", { autoClose: false });
    const update = () => toast.update(toastId.current, {
        render: "Successfully submitted, awaiting moderation",
        type: toast.TYPE.INFO,
        autoClose: 2000
    })
    const errorToast = (err) => toast.update(toastId, {
        render: err.message,
        type: toast.TYPE.ERROR,
        autoClose: 2000
    });

    const [error, setError] = useState(false)
    const commentEl = useRef()
    const nameEl = useRef()
    const emailEl = useRef()
    const storeDataEl = useRef()
    const mutation = useMutation(async ({commentObj}) => submitComment(commentObj), {
        onMutate: (data) => {
            notify()
            return console.log("DATA MUTATION :",data)
        },
        
        onSuccess: (data) => { 
            update()
            return console.log('mutation data', data)
          },

        onError: (error, _variables, context) => {            
            errorToast(error)
            return console.log('error: ', error.message)
        }
    })

    useEffect(() => {
        nameEl.current.value=window.localStorage.getItem('name')
        emailEl.current.value=window.localStorage.getItem('email')
    }, [])

    const handleSubmission = () => {
        setError(false)
        const {value:comment} = commentEl.current
        const {value:name} = nameEl.current
        const {value:email} = emailEl.current
        const {checked:storeData} = storeDataEl.current

        if (!comment || !name || !email){
            setError(true)
            return
        }

        const commentObj = {
            name, email, comment, slug
        }

        // in react, adding window isn't required but in nextjs it is
        if (storeData){
            window.localStorage.setItem('name',name)
            window.localStorage.setItem('email',email)
        }
        else{
            window.localStorage.removeItem('name',name)
            window.localStorage.removeItem('email',email)
        }

        mutation.mutate({commentObj})
    }

    return (
        <>
            <div className={tw`bg-white shadow-lg rounded-lg mb-8 pb-12 p-8`}>
                <h1 className={tw`text-xl mb-8 font-semibold pb-4 border-b`}>Leave a Reply</h1>
                <div className={tw`grid grid-cols-1 gap-4 mb-4`}>
                    <textarea 
                        ref={commentEl} 
                        className={tw`p-4 outline-none w-full rounded-lg focus:ring-2 focus:ring-gray-200 bg-gray-100 text(gray-700)`}
                        placeholder="Comment"
                        name="comment"
                    /> 
                </div>
                <div className={tw`grid grid-cols-1 gap-4 mb-4 lg:grid-cols-2`}>
                    <input 
                        type="text" 
                        ref={nameEl}
                        className={tw`py-2 px-4 outline-none w-full rounded-lg focus:ring-2 focus:ring-gray-200 bg-gray-100 text(gray-700)`}
                        placeholder="Name"
                        name="name"
                    />
    
                    <input 
                        type="email" 
                        ref={emailEl}
                        className={tw`py-2 px-4 outline-none w-full rounded-lg focus:ring-2 focus:ring-gray-200 bg-gray-100 text(gray-700)`}
                        placeholder="Email"
                        name="email"
                    />
                </div>
                <div className={tw`grid grid-cols-1 gap-4 mb-4`}>
                    <div>
                        <input 
                            type="checkbox" 
                            ref={storeDataEl} 
                            id="storeData" 
                            name="storeData"
                        />
                        <label 
                            htmlFor="storeData" 
                            className={tw`text-gray-500 cursor-pointer ml-2`}
                        >
                        Save my email and name for next time I comment
                        </label>
                    </div>
                
                </div>
                {error && <p className={tw`text(xs red-500)`}>All fields are required</p>}
    
                <div className={tw`mt-8`}>
                    <button 
                    type="button" 
                    onClick={handleSubmission}
                    className={tw`transition duration-500 ease hover:bg-indigo-900  inline-block bg-pink-600 text(lg white) rounded-full px-8 py-3 cursor-pointer`}
                    >
                    Post Comment
                    </button>
                    
                </div>
            </div>
        </>
    )
}

export default CommentsForm
