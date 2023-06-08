import Image from "next/image"


const Loading = () => {
  return (
    <div className="w-full flex-center">
      <Image
        src="/assets/icons/loading.svg"
        alt="loading"
        width={50}
        height={50}
      />
    </div>
  )
}
export default Loading