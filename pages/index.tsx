import { AcademicCapIcon, PlusIcon } from '@heroicons/react/outline'
import type { NextPage } from 'next'
import { useSession } from 'next-auth/client'
import Link from 'next/link'
import router from 'next/router'
import { useEffect, useState } from 'react'
import { ClassCard } from '../components/class/ClassCard'
import BaseLayout from '../components/layout/BaseLayout'
import { API_BASE_URL } from '../lib/constants'
import UserInformationCard from '../components/auth/UserInformationCard'
import Calendar from 'react-calendar'
import 'react-calendar/dist/Calendar.css';
import FileList from '../components/class/FileList'
import AnnouncementList from '../components/class/AnnouncementList'

const ClassListPage: NextPage = () => {
  const [session, loading] = useSession()
  const [files, setFiles] = useState(Array())
  const [announcements, setAnnouncements] = useState(Array())
  const [classes, setClasses] = useState<null|any[]>(null)
  useEffect(() => {
    fetch(`${API_BASE_URL}/classes`)
      .then((response) => response.json())
      .then((fetchedClasses) => {
        setClasses(fetchedClasses);
        const messages = Array();
        const announces = Array();
        fetchedClasses.forEach((c:any) => {
          if ("announcements" in c) {
            c.announcements.forEach((a:any) => {
              announces.push(a)
            });
          }
          c.messages.filter((m:any) => "attachment" in m).forEach((f:any) => {
            f.attachment['course'] = c.title
            f.attachment['time'] = f.timestamp
            messages.push(f.attachment)
          });
        });
        setFiles([...files, ...messages])
        setAnnouncements([...announcements, ...announces])
      })
      .catch((error) => console.log(error))
  }, [])

  useEffect(() => {
    if (!loading && !session?.user) {
      router.push('/login')
    }
  }, [loading])
  return (
    <>
    {!loading && classes !== null && (
    <BaseLayout title="Home Page
    ">
      <div className="flex px-8">
        <div className="pt-8 pb-10 lg:py-16 gap-8 mx-auto w-auto md:inline-flex">
          <div className="max-w-7xl">
            <UserInformationCard 
              avatar={session?.user.image}
              name={session?.user.name}
              role={session?.user.role} />
            <div className="relative mx-auto">
              <div className="text-left pb-4 sm:pb-6 lg:pb-8">
                <h2 className="text-4xl tracking-tight font-black text-gray-900 sm:text-5xl">
                  Your classes
                </h2>
              </div>    
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-8 lg:gap-8">
                {classes.map((aClass:any) => (
                  <ClassCard key={aClass.id} theClass={aClass} />
                ))}
                { session?.user?.role === "lecturer" && (
                  <Link href="/create">
                  <button
                    type="button"
                    className="relative  block w-full text-gray-400 border-4 border-gray-300 border-dashed rounded-lg p-12 text-center hover:border-blue-500 hover:text-blue-500 active:bg-gray-100"
                  >
                    <AcademicCapIcon className="mx-auto h-12 w-12" />
                    <span className="mt-2 block text-sm font-medium">Create a new class</span>
                  </button>                  
                  </Link>
                )}
              </div>
            </div>
          </div>
          <div className="flex-shrink">
            <Calendar className="mx-auto mt-8 md:mt-0" />
            <FileList files={files} />
            <AnnouncementList announcements={announcements} />
          </div>
        </div>
      </div>   
    </BaseLayout>
    )}
    </>
  )
}

export default ClassListPage
