import MainFooter from "./footer";
import MainHeader from "./header";
import { OverlayNav } from "./overlay";

export default function MainLayout({ children }: { children: React.ReactNode }) {
    return (
        <div className="min-h-screen">
            <div
                className="absolute -z-10 sm:w-[600px] w-[300px] sm:h-[600px] h-[300px] sm:left-[calc(50%-300px)] left-[calc(50%-150px)] -translate-y-1/3 bg-[radial-gradient(circle,#2563eb33,transparent_70%)] rounded-full" />
            <MainHeader />
            {children}
            <MainFooter />
            <OverlayNav />
        </div>
    )
}