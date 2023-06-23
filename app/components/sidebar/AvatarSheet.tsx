"use client"
import Avatar from "../Avatar"
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "./sheetComponent"

type Props = {
    name: string,
    image: string
    followers?: number
    following?: number
    email: string
    bio?: string
    
    
}




export default function AvatarSheet({followers, following, name, image, email, bio} :Props) {
    
  return (
   <Sheet>
          <SheetTrigger>
              <Avatar image={image} name={name} />
  </SheetTrigger>
  <SheetContent>
    <SheetHeader>
      <SheetTitle className="font-semibold text-gray-600">Account Info</SheetTitle>
      <SheetDescription className="py-2">
                      <div className="flex items-center justify-start gap-1">
                          <Avatar image={image} name={name} /> 
                              <p className="font-semibold">{name}</p>
        </div>
                    <p className="flex font-semibold text-yellow-500 ">
                      {email}
                    </p>
                   
                    <div className="flex items-center gap-2 py-4 font-medium text-purple-600">
                      <div className="flex items-center gap-1">
                        <p className="text-lg">{followers} </p>
                        <p className="text-sm text-gray-500">followers</p>
                      </div>
                      <p className="flex items-center gap-1">
                        <p className="text-lg">{following} </p>
                        <p className="text-sm text-gray-500">following</p>
                      </p>
                    </div>
                  
      </SheetDescription>
    </SheetHeader>
  </SheetContent>
</Sheet>

  )
}

