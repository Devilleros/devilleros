import { DiagramProvider } from "@/contexts/diagram-context";

export default function DrawioLayout({children}: Readonly<{children: React.ReactNode}>) {
    return (
        <DiagramProvider>
            {children}
        </DiagramProvider>
    )
}