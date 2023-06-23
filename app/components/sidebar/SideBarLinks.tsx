
import Link from "next/link";
import { ReactNode } from "react";




type Props = {
  icon: ReactNode
  href: string
  text:string
  
}

export default function SideBarLinks({ icon, href , text}: Props) {
  return (
    <div className="py-1">
      <Link href={href} className="flex items-center gap-1.5 hover:rounded-full hover:bg-gray-200 px-4 py-3" >{icon} <span className="font-semibold text-gray-500 ">{text}</span></Link>
      </div>
  )
}
