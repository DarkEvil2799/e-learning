
type Props = {
  avatar?: string|null
  name?: string|null
  role?: string|null
}

export default function UserInformationCard({
  avatar,
  name,
  role
}: Props) {
  return (
    <div className="bg-white overflow-hidden mb-10">
      <div className="rounded-lg bg-blue-100 p-6">
        <div className="sm:flex sm:items-center sm:justify-between">
          <div className="sm:flex sm:space-x-5">
            <div className="flex-shrink-0">
              <img className="mx-auto h-20 w-20 rounded-full" src={avatar ?? ""} alt="" />
            </div>
            <div className="mt-4 text-center sm:mt-0 sm:pt-1 sm:text-left">
              <p className="text-sm font-medium text-gray-600">Welcome back,</p>
              <p className="text-xl font-bold text-gray-900 sm:text-2xl">{name}</p>
              <p className="text-base font-medium capitalize text-gray-600">{role ?? "student"}</p>
            </div>
          </div>
          {/* <div className="mt-5 flex justify-center sm:mt-0">
            <a
              href="#"
              className="flex justify-center items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
            >
              View profile
            </a>
          </div> */}
        </div>
      </div>
      {/* <div className="border-t border-gray-200 bg-gray-50 grid grid-cols-1 divide-y divide-gray-200 sm:grid-cols-3 sm:divide-y-0 sm:divide-x">
        {stats.map((stat) => (
          <div key={stat.label} className="px-6 py-5 text-sm font-medium text-center">
            <span className="text-gray-900">{stat.value}</span> <span className="text-gray-600">{stat.label}</span>
          </div>
        ))}
      </div> */}
    </div>
  )
}