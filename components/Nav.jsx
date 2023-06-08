'use client'
import Link from 'next/link'
import Image from 'next/image'
import { useState, useEffect } from 'react'
import { signIn, signOut, useSession, getProviders  } from 'next-auth/react'


const Nav = () => {
const { data: session } = useSession()
const [providers, setProviders] = useState(null)
const [toggleDropdown, setToggleDropdown] = useState(false)


useEffect(() => {
  const setUpProviders = async () => {
    const response = await getProviders()
    setProviders(response)
  }
  setUpProviders()
}, [])

  return (
    <nav className='flex-between w-full mb-16 pt-3'>
      <Link href='/' className='flex-gap-2 flex-center'>
      <Image src='/assets/images/ki-mood-tag.svg'
      alt='logo'
      width={30}
      height={30}
      className='object-contain'
      />  
      <p className='logo_text ml-2'>Ki-MOOD</p>
      <p className='text-gray-300  px-3 py-2 text-sm font-small'>What is your Ki what is your MOOD Power!</p>
      </Link>

      <div class="sm:flex hidden space-x-4">
       
          {session?.page === '/profile' ? (  
            <Link href="/profile" className="bg-gray-900
             text-white rounded-md px-3 py-2 text-sm font-medium"
              aria-current='page'>My Profile</Link>
          ) : (
          <Link href="/profile" className="profile-link">My Profile</Link>
          )
          }
            {/* <Link href="/profile" className="bg-gray-900 text-white rounded-md px-3 py-2 text-sm font-medium" aria-current='page'>My Profile</Link> */}
            
            <Link href="#" className="profile-link">Projects</Link>
            <Link href="#" className="profile-link">Chat</Link>

            </div>
   
    {/* Desktop Navigation */}
    <div className='sm:flex hidden'>
      {session?.user ? (
        <div className='flex gap-3 md:gap-5'>
          <Link href='/create-prompt' 
          className='black_btn'>
            Create MOOD
          </Link>

          <button type="button" onClick={signOut} className='outline_btn'>
            Sign Out
          </button>

          <Link href='/profile'>
            <Image src={session?.user?.image}
            alt='profile'
            width={37}
            height={37}
            className='rounded-full'
            />
          </Link>
        
        </div>  
        
        ):(
          <>
  {providers && Object.values(providers).map((provider) => (
      <button 
      type='button'
      key={provider.name}
      onClick={() => signIn(provider.id)}
      className='black_btn'
      >
        Sign in with {provider.name}
      </button>
    
  ))}
          </>
    )}
    </div>


{/* Mobile Navigation */}

<div className='sm:hidden flex relative'>

{session?.user ? (
          <div className='flex'>
            <Image
              src={session?.user.image}
              width={37}
              height={37}
              className='rounded-full'
              alt='profile'
              onClick={() => setToggleDropdown(!toggleDropdown)}
            />

            {toggleDropdown && (
              <div className='dropdown'>
                <Link
                  href='/profile'
                  className='dropdown_link'
                  onClick={() => setToggleDropdown(false)}
                >
                  My Profile
                </Link>
                <Link
                  href='/create-prompt'
                  className='dropdown_link'
                  onClick={() => setToggleDropdown(false)}
                >
                  Create MOOD
                </Link>
                <Link href='/about' 
                className='dropdown_link'
                onClick={() => setToggleDropdown(false)}
                >About</Link>

                <Link href='/' 
                className='dropdown_link'
                onClick={() => setToggleDropdown(false)}
                >Blogs</Link>

                <Link href='/' 
                className='dropdown_link'
                onClick={() => setToggleDropdown(false)}
                >Chat</Link>
              
                <button
                  type='button'
                  onClick={() => {
                    setToggleDropdown(false);
                    signOut();
                  }}
                  className='mt-5 w-full black_btn'
                >
                  Sign Out
                </button>
              </div>
            )}
          </div>
        ) : (
          <>
            {providers &&
              Object.values(providers).map((provider) => (
                <button
                  type='button'
                  key={provider.name}
                  onClick={() => {
                    signIn(provider.id);
                  }}
                  className='black_btn'
                >
                  Sign in
                </button>
              ))}
          </>
        )}
      </div>
    </nav>
  );
};

export default Nav;