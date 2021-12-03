import { SITE_NAME } from "../../lib/constants"

const Footer = () => {
  return (
    <footer className="bg-gray-100">
      <div className="max-w-7xl mx-auto py-12 px-8 md:flex md:items-center md:justify-between">
        <div className="mt-8 md:mt-0 md:order-1">
          <p className="text-center text-base text-gray-400">
            &copy; 2021 { SITE_NAME }. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}

export default Footer