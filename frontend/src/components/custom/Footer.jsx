import React from 'react'

const Footer = () => {
  return (
    <div>
    <footer className="bg-gray-900 text-white py-4 mt-8">
      <div className="flex flex-col sm:flex-row items-center justify-around text-center sm:text-left">
        <p className="text-sm mb-2 sm:mb-0">
          &copy; {new Date().getFullYear()} CinemaNow. All rights reserved.
        </p>
        <p className="text-sm">
          Made with ❤️ by Vaibhav Raj
        </p>
      </div>
    </footer>
</div>
  )
}

export default Footer
