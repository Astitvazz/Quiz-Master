import React from 'react'
import { Trophy } from "lucide-react";

function Navbar() {
  return (
    <div>
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/10 backdrop-blur-lg border-b border-white/20">
            <div className="max-w-7xl mx-auto px-6 py-4">
                <div className="flex items-center space-x-2">
                    <div className="w-8 h-8 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full flex items-center justify-center">
                        <Trophy className="w-4 h-4 text-white" />
                    </div>
                    <span className="text-lg font-bold bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent">
                        Quiz Master
                    </span>
                </div>
            </div>
        </nav>
    </div>
  )
}

export default Navbar
