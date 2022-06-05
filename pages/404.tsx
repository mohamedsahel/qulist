import Link from "next/link";

export default function NotFound() {
  return (
    <div className='inner-container text-center mt-[30vh]'>
      <h1 className='text-3xl text-gray-200'>Oooops</h1>
      <p className='text-4xl font-semibold text-white pt-2 pb-10'>
        I think you're lost 🙃
      </p>
      <Link href='/'>
        <button className='rounded-full bg-white py-3 px-6 hover:scale-105'>
          Go Back Home
        </button>
      </Link>
    </div>
  )
}
