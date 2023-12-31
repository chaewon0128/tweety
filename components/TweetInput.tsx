import { ITweetInput } from "../type/type";
import { PlusIcon, SendIcon } from "../icons/icons";
import { useEffect } from "react";
import cls from "../lib/cls";



export default function TweetInput({ onTweet, handleSubmit, register, tweetImage, image, setTweetImage }: ITweetInput) {

    useEffect(() => {
        if (image && image.length > 0) {
            setTweetImage(URL.createObjectURL(image[0]))
        }
    }, [image])


    return (
        <form onSubmit={handleSubmit(onTweet)} className='fixed bottom-2 min-w-[500px] flex '>
            <label htmlFor="tweetInput" className="sr-only">tweet input</label>
            <textarea id="tweetInput" {...register("Tweet")} className={cls(`border mx-auto w-[95%] pl-14 pr-28 pt-[14px] resize-none h-12`, tweetImage ? "rounded-xl h-60 pr-56 pt-14 " : "rounded-full h-14")} rows={tweetImage ? 4 : 1} />
            <button aria-label="전송 버튼" className='absolute right-8 top-[15px] bg-[#4286f4]  text-white  h-7 px-2 rounded-full '>
                <SendIcon />
            </button>
            <label aria-label="이미지 추가 버튼" htmlFor="tweetImg" className="cursor-pointer text-white p-1 absolute left-6 top-3 rounded-full bg-[#4286f4] " >
                <PlusIcon />
            </label>
            <input hidden {...register("tweetImg")} id="tweetImg" accept="image/*" type="file" />
            {tweetImage ? (
                <>
                    <div className="absolute right-10 top-16 border rounded-md w-36 h-36 overflow-hidden ">
                        <img src={tweetImage} className="w-full" alt="preview" />
                    </div>
                </>) : null}
        </form>
    )
}

