"use client"

import { useSession } from "next-auth/react"
import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"

import Profile from "@components/Profile"

const MyProfile = () => {
  const router = useRouter();
  const { data: session } = useSession()

  const [myPosts, setMyPosts] = useState([])

  useEffect(() => {
    const fetchPosts = async () => {
      const response = await fetch(`/api/users/${session?.user.id}/posts`)
      const data = await response.json()

      setMyPosts(data)
    };

    if (session?.user.id) fetchPosts()
  }, [session?.user.id])

  const handleEdit = (post) => {
    router.push(`/update-prompt?id=${post._id}`)
  };

  const handleDelete = async (post) => {
    const hasConfirmed = confirm(
      "Are you sure you want to delete this prompt?"
    );

    if (hasConfirmed) {
      try {
        await fetch(`/api/prompt/${post._id.toString()}`, {
          method: "DELETE",
        });

        const filteredPosts = myPosts.filter((item) => item._id !== post._id)

        setMyPosts(filteredPosts);
      } catch (error) {
        console.log(error)
      }
    }
  };

  return (
    <Profile
      name={session?.user.name}
      desc="Welcome to your personalized Ki-MOODER page!

      This is your space to share your KI's and inspire others with the power of the 気. You can:
      
      Write about your KIs and experiences.
      Share photos and videos of your KIs.
      Connect with other Ki-MOODERs from around the world."
      data={myPosts}
      handleEdit={handleEdit}
      handleDelete={handleDelete}
    />
  );
};

export default MyProfile