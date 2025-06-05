"use client";
import { useEffect, useRef } from "react";
import { useState } from 'react';
import { Menu, X } from 'lucide-react'; // optional, replace with emoji/icons if needed


export default function Navbar() {
    const [brpt, setBrpt] = useState(() =>
        typeof window !== 'undefined' ? window.innerWidth : 0
      );
      const [isClient, setIsClient] = useState(false);
    
      useEffect(() => {
        setIsClient(true);  // mark client hydration complete
      
        const handleResize = () => {
          setBrpt(window.innerWidth);
        };
      
        window.addEventListener('resize', handleResize);
        handleResize();

        return () => window.removeEventListener('resize', handleResize);
      }, []);
      if (!isClient) return null; 

      return (
        <>
            <div className="flex flex-row pl-10 pr-10 pt-7 pb-7 justify-between" style={{ fontFamily: "monospace" }}>
                <div className="text-2xl font-bold" >
                    posts.baltej
                </div>
                <div className="flex flex-row gap-x-10 text-lg">
                    {/* URLS OR MENU BUTTON*/}
                    {(brpt >= 768) ? <URLs/> : <MenuSheet />}
                </div>
            </div>
        </>
    )
}

const getCurrentBreakpoint = () => {
    if (typeof window === 'undefined') return null; // guard for server-side
  
    const width = window.innerWidth;
  
    return width;
    // if (width >= 1536) return '2xl';
    // if (width >= 1280) return 'xl';
    // if (width >= 1024) return 'lg';
    // if (width >= 768) return 'md';
    // if (width >= 640) return 'sm';
  };
  
function URLs(){
    return (
    <>
    <div className="cursor-pointer">
        Home
    </div>
    <div className="cursor-pointer">
        About
    </div>
    <div className="cursor-pointer">
        Contact Me
    </div>
    <div className="cursor-pointer">
        Recents
    </div>
    </>
    );
}


export function MenuSheet() {
    const [open, setOpen] = useState(false);

    return (
        <div className="relative z-50">
            {/* Menu Button */}
            <button
                onClick={() => setOpen(!open)}
                className="fixed top-5 right-5 z-50 p-3 bg-black rounded-full shadow-md hover:bg-gray-100 transition-all duration-200"
            >
                {open ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5 text-white"/>}
            </button>

            {/* Overlay */}
            {open && (
                <div
                    onClick={() => setOpen(false)}
                    className="fixed inset-0 bg-black/30 backdrop-blur-sm"
                />
            )}

            {/* Sheet Panel */}
            <div
                className={`fixed top-0 right-0 h-full w-64 bg-black shadow-xl transform transition-transform duration-300 ease-in-out ${open ? 'translate-x-0' : 'translate-x-full'
                    }`}
            >
                <div className="p-6 space-y-4">
                    <h2 className="text-xl font-semibold">Navigation</h2>
                    <ul className="space-y-2">
                        <li>
                            <a
                                href="/"
                                className="block p-2 rounded hover:bg-gray-100 text-white"
                            >
                                Home
                            </a>
                        </li>
                        <li>
                            <a
                                href="/about"
                                className="block p-2 rounded hover:bg-gray-100 text-white"
                            >
                                About
                            </a>
                        </li>
                        <li>
                            <a
                                href="/projects"
                                className="block p-2 rounded hover:bg-gray-100 text-white"
                            >
                                Contact Me
                            </a>
                        </li>
                        <li>
                            <a
                                href="/contact"
                                className="block p-2 rounded hover:bg-gray-100 text-white"
                            >
                                Recents
                            </a>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    );
}