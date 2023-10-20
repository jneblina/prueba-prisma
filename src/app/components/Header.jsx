import Image from "next/image";
export default function Header() {
    return (
        <header className="bg-red-950 w-full h-[20%] p-4 text-white text-center">
            <div className="flex flex-row justify-between items-center">
                <h1 className="text-2xl font-bold ">ITE</h1>
                <Image 
                    src="/assets/gobierno.svg" 
                    alt="" 
                    className="w-32"
                    width={128}
                    height={128}
                />
            </div>
        </header>
    )
}

