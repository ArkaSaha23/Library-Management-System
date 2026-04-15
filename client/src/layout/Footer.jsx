import React, { Component } from 'react'

export default class Footer extends Component {
  render() {
    return (
      <div className="z-5 flex items-center justify-center bottom-0 w-full h-12 bg-gray-700">
      <p className="text-md font-semibold text-gray-300">
        &copy; {new Date().getFullYear} Arka Saha. All rights reserved.
      </p>
    </div>
    )
  }
}
