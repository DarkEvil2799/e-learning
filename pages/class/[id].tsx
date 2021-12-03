import type { NextPage } from 'next'
import { useSession } from 'next-auth/client'
import router from 'next/router'
import { useEffect, useState } from 'react'
import AnnouncementList from '../../components/class/AnnouncementList'
import { Chatbox } from '../../components/class/Chatbox'
import CreateAnnouncement from '../../components/class/CreateAnnouncement'
import BaseLayout from '../../components/layout/BaseLayout'
import { API_BASE_URL } from '../../lib/constants'
import {joinClass} from '../../utils/livesteam'

type Props = {
  classId: string
}

const ClassPage: NextPage<Props> = ({
  classId
}: Props) => {
  const [session, loading] = useSession();
  const [joined, setJoined] = useState(false);
  const [announcementOpen, setAnnouncementOpen] = useState(false)
  const [theClass, setTheClass] = useState<null|any>(null)

  const appendAnnouncement = (a:any) => {
    if ("announcements" in theClass) {
      setTheClass({...theClass, "announcements": [a, ...theClass.announcements]})
      console.log("in " + a)
    } else {
      setTheClass({...theClass, "announcements": [a]})
      console.log("not in " + a)
    }
  }

  useEffect(() => {
    fetch(`${API_BASE_URL}/classes/${classId}`)
      .then((response) => response.json())
      .then((fetchedClass) => setTheClass(fetchedClass))
      .catch((error) => console.log(error))
  }, [])
  
  useEffect(() => {
    if (!loading && !session?.user) {
      router.push('/login')
    }
  }, [loading])

  return (
    <>
    {!loading && theClass !== null && (
    <BaseLayout title="Class Room">
      { session?.user.role === "lecturer" && (
        <CreateAnnouncement 
          currentClass={theClass}
          setOpen={setAnnouncementOpen} 
          open={announcementOpen}
          appendAnnouncement={appendAnnouncement} />
      ) }
      <div className="max-w-7xl mx-auto px-8">
        <div className="relative pt-8 pb-10 lg:py-16">
          <div className="relative mx-auto">
            <div className="text-left">
              <h2 className="text-2xl tracking-tight font-black text-gray-900 sm:text-4xl">
                { theClass.title }
              </h2>
              <p className="font-medium mt-2 text-gray-500 max-w-3xl">
                { theClass.description }
              </p>
              <AnnouncementList announcements={theClass.announcements} fullWidth={true} />

            </div>  
            <div className="grid lg:grid-cols-3 gap-4 md:gap-8 pt-4 sm:pt-8 lg:pt-10 lg:gap-8">
              <div className="lg:col-span-2">
                <div id="livestream" className="aspect-w-16 aspect-h-9 h-96 bg-gray-200 rounded-lg">
                </div>
                <div className="float-right mt-4">
                  { session?.user.role === "lecturer" && (
                    <button 
                      disabled={joined} 
                      onClick={() => setAnnouncementOpen(true)} 
                      className="mr-4 px-4 py-2 rounded text-white bg-blue-500 disabled:bg-blue-300">
                      Create announcement
                    </button>                    
                  )}
                  <button 
                    disabled={joined} 
                    onClick={() => {
                      joinClass(classId, theClass.title, session?.user?.name ?? "A student"); 
                      setJoined(true)
                    }} 
                    className="px-4 py-2 rounded text-white bg-green-500 disabled:bg-green-300">
                    Join class
                  </button>
                </div>
              </div>
              <div className="lg:col-span-1 h-auto">
                <div className="bg-gray-100 rounded-lg">
                  <Chatbox
                    classId={classId} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>   
    </BaseLayout>
    )}
    </>
  )
}

export async function getServerSideProps(context: any) {
  return {
    props: {
      classId: context.params.id
    }, 
  }
}

export default ClassPage
