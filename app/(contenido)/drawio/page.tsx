"use client"
import ChatPanel from "@/app/components/drawio/chat-panel";
import { useEffect, useState } from "react";
import { DrawIoEmbed } from "react-drawio";
import { useDiagram } from "@/contexts/diagram-context";
import DrawioLayout from "./layout";

export default function DrawioPage() {    
    const { drawioRef, handleDiagramExport } = useDiagram();
    const [isMobile, setIsMobile] = useState(false);
    const [isChatVisible, setIsChatVisible] = useState(true);

    return (
        <div className="flex h-screen bg-gray-100 relative">
            <div className={`${isChatVisible ? 'w-2/3' : 'w-full'} p-1 h-full relative transition-all duration-300 ease-in-out`}>
                <DrawIoEmbed 
                    ref={drawioRef}
                    onExport={handleDiagramExport}
                    urlParameters={{
                        spin: true,
                        libraries: false,
                        saveAndExit: false,
                        noExitBtn: true,
                    }}
                />
            </div>
            <div className={`${isChatVisible ? 'w-1/3' : 'w-12'} h-full p-1 transition-all duration-300 ease-in-out`}>
                <ChatPanel
                    isVisible={isChatVisible}
                    onToggleVisibility={() => setIsChatVisible(!isChatVisible)}
                />
            </div>
        </div>
    )
}