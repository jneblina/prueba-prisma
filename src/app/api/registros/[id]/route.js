import { NextResponse } from "next/server";
import { prisma } from "@/libs/prisma";

export async function GET(request,{params: {id}}) {
    try{
        const estudiante = await prisma.estudiante.findFirst({
            where: {
                id: Number(id)
            }
        })
        if(!estudiante) {
            return NextResponse.json({
                mensaje: "Estudiante no existe",
            })
        }
        return NextResponse.json(estudiante)
    } catch(error){
        if(error instanceof Error)
            return NextResponse.json(error.message,{status: 500})
    }
    
}

export async function DELETE(request, {params:{id}}) {
    try {
        const estudiante = await prisma.estudiante.findFirst({
            where: {
                id: Number(id)
            }
        });
        if (!estudiante) {
            return NextResponse.json({
                mensaje: "Estudiante no existe",
            });
        }
        await prisma.estudiante.delete({
            where: {
                id: Number(id)
            }
        });
        return NextResponse.json({
            mensaje: "Estudiante eliminado correctamente"
        });
    } catch (error) {
        if (error instanceof Error) {
            return NextResponse.json(error.message, { status: 500 });
        }
    }
}

export async function PUT(request, { params: { id }, body }) {
    try {
        const estudiante = await prisma.estudiante.findFirst({
            where: {
                id: Number(id)
            }
        });

        if (!estudiante) {
            return NextResponse.json({
                mensaje: "Estudiante no existe",
            });
        }

        const {nombre,genero,edad,carrera} = await request.json()
        const actualizarEstudiante = await prisma.estudiante.update({
            where: {
                id: Number(id)
            },
            data: {
                nombre,
                genero,
                edad,
                carrera
            }
        });

        return NextResponse.json(actualizarEstudiante);
    } catch (error) {
        if (error instanceof Error) {
            return NextResponse.json(error.message, { status: 500 });
        }
    }
}