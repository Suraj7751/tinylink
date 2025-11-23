// app/api/links/route.ts
import { NextResponse } from "next/server";
import { prisma } from "../../../lib/prisma";

export async function GET() {
  try {
    const links = await prisma.link.findMany({
      orderBy: { createdAt: "desc" }
    });
    return NextResponse.json(links);
  } catch (e) {
    return NextResponse.json({ error: "Failed to load links" }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const { url, code } = await req.json();

    if (!url) {
      return NextResponse.json({ error: "URL is required" }, { status: 400 });
    }

    // Normalize input (lowercase)
    let shortCode = code ? code.toLowerCase() : null;

    // Custom code validation: Only A–Z a–z 0–9, length 6–8
    if (shortCode) {
      if (!/^[a-zA-Z0-9]{6,8}$/.test(shortCode)) {
        return NextResponse.json(
          { error: "Custom code must be 6–8 characters, A–Z, a–z, 0–9 only." },
          { status: 400 }
        );
      }

      // Check duplicate custom code
      const exists = await prisma.link.findUnique({
        where: { code: shortCode }
      });
      if (exists) {
        return NextResponse.json(
          { error: "This code is already taken. Choose another one." },
          { status: 400 }
        );
      }
    }

    // Auto-generate fallback code (lowercase always)
    const finalCode =
      shortCode ??
      Math.random().toString(36).substring(2, 10).toLowerCase().slice(0, 8);

    const newLink = await prisma.link.create({
      data: {
        url,
        code: finalCode,
      }
    });

    return NextResponse.json(newLink);
  } catch (e) {
    return NextResponse.json({ error: "Error creating link" }, { status: 500 });
  }
}
