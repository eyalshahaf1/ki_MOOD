import Feed from "@components/Feed"

const Home = () => {
  return (
    <section className='w-full flex-center flex-col' >
      {/* head_text is a class in the css file */}
    <h1 className='head_text text-center'> 
    What is your Ki? 
      <br className=' max-md:hidden'/>
      <span className='orange_gradient text-center'>what is your MOOD Power!</span>
    </h1>
    {/* desc is a class in the css file */}
    <p className='desc text-center'>気 'KI' is one of the most familiar Kanji character.</p> 
    <br className='hidden'/>

     <p className='desc text-center'>From fans of modern manga to practitioners of Aikido, acupuncture and Eastern Asia medication.</p>
     <br className='hidden'/>
      <p className='desc text-center break-normal ...'>By combining KI with other syllables KI can mean many things such as: 
      “heart, mind, spirit, value, humor or energy. Describe your mood and condition in all aspect of life.</p>
<Feed />
    </section>
  )
}

export default Home