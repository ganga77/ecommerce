'use client'
import Image from "next/image"
import { UserButton } from "@clerk/nextjs"
import { navLinks } from "@/lib/constants"
import Link from "next/link"
import { Menu } from "lucide-react"
import { useState } from "react"
import { usePathname } from "next/navigation"

export default function TopBar(){
    const [dropDown, setDropDown] = useState(false)
    const pathName = usePathname();
    return (
        <div className="sticky top-0 z-20 w-full flex justify-between items-center px-8 py-4 bg-blue-300 shadow-xl lg:hidden">
            <Image src="/logo.png" alt="Logo" width={150} height={70}/>

            <div className="flex gap-8 max-md:hidden">
                {navLinks.map(link => (
                    <Link href={link.url} key={link.label}
                    className={`flex gap-4 text-body-medium ${pathName === link.url ? 'text-blue-800': 'text-white-100'}`}>
                    <p>{link.label}</p>
                    </Link>
                ))}
            </div>

            <div className="relative flex gap-4 items-center">
                <Menu className="cursor-pointer md:hidden" onClick={() => setDropDown(!dropDown)}/>
                {dropDown && (
                  <div className="absolute top-12 right-6 flex flex-col gap-8 p-5 bg-white shadow-xl rounded-lg">
                    {navLinks.map(link => (
                        <Link href={link.url} key={link.label}>
                            <p className="text-black">{link.label}</p>
                        </Link>
                    ))}
                  </div>  
                )}
                <UserButton />
               
            </div>
        </div>
    )
}