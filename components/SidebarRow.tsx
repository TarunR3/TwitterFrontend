import React, {SVGProps} from 'react'

interface Props{
    Icon: (props: SVGProps<SVGSVGElement>) => JSX.Element;
    title: string
}

function SidebarRow({Icon, title}: Props){
    return(
        <div className = "bg-black flex items-center space-x-2 rounded-full px-4 py-3 hover:bg-neutral-900 group">
            <Icon className = "h-10 w-10 text-white"/>
            <p className = "group-hover:text-white text-neutral-100 text-xl">{title}</p>
        </div>
    )
}

export default SidebarRow;