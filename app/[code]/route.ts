// app/[code]/route.ts
import { NextResponse } from "next/server";
import { prisma } from "../../lib/prisma";

export async function GET(
  _req: Request,
  { params }: { params: { code: string } }
) {
  try {
    const code = String(params.code).toLowerCase();

    const link = await prisma.link.findUnique({
      where: { code }
    });

    if (!link) {
      return new NextResponse("Not found", { status: 404 });
    }

    await prisma.link.update({
      where: { code },
      data: { clicks: { increment: 1 }, lastClicked: new Date() }
    });

    return NextResponse.redirect(link.url, 302);
  } catch (err) {
    console.error("redirect error:", err);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
