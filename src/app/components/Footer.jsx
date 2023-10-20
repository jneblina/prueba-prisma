import Link from "next/link";

export default function Footer() {
    return (
        <footer className="bg-green-950 w-auto h-[20%] p-4 text-white text-left">
            <div className="flex flex-col sm:flex-row items-start justify-around">
                <div className="mb-4 sm:mb-0">
                    <img src="/assets/gobierno.svg" alt="" className="w-32 sm:w-40" />
                </div>
                <div className="flex flex-col mb-4 sm:mb-0">
                    <h1 className="font-bold">Enlaces</h1>
                    <Link href="https://www.gob.mx/publicaciones" className="underline">Publicaciones oficiales</Link>
                    <Link href="http://www.ordenjuridico.gob.mx/" className="underline">Marco jurídico</Link>                        
                    <Link href="https://consultapublicamx.plataformadetransparencia.org.mx/vut-web/faces/view/consultaPublica.xhtml" className="underline">Plataforma nacional de transparencia</Link>
                </div>
                <div className="flex flex-col">
                    <h1 className="font-bold">Síguenos en</h1>
                    <Link className="underline" href="https://www.facebook.com/gobmexico">Facebook</Link>
                    <Link className="underline" href="https://twitter.com/GobiernoMX">Twitter</Link>
                    <Link href={'/sie/error'}>Error</Link>
                </div>                
            </div>
        </footer>
    )
}
