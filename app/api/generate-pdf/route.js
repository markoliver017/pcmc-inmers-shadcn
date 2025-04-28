import { NextResponse } from "next/server";
import puppeteer from "puppeteer";


export async function POST(request) {
    const body = await request.json();
    const { html } = body;

    if (!html) {
        return NextResponse.json(
            { message: "HTML content required" },
            { status: 400 }
        );
    }

    try {
        const browser = await puppeteer.launch({
            headless: "new",
            args: ["--no-sandbox", "--disable-setuid-sandbox"],
            margins: (5, 5, 5, 5),
        });

        const page = await browser.newPage();

        await page.setContent(html, {
            waitUntil: "networkidle0",
        });

        const pdfBuffer = await page.pdf({
            path: "report.pdf",
            format: "A4",
            landscape: true,
            margin: {
                top: "10mm",
                bottom: "10mm",
                left: "5mm",
                right: "5mm",
            },
            printBackground: true,
            displayHeaderFooter: true,
            footerTemplate: `
                <div style="width: 100%; font-size: 10px; text-align: center; color: #999;">
                    Page <span class="pageNumber"></span> of <span class="totalPages"></span>
                </div>
            `,
            headerTemplate: `<div></div>`,
        });

        await browser.close();

        return new NextResponse(pdfBuffer, {
            headers: {
                "Content-Type": "application/pdf",
                "Content-Disposition": 'attachment; filename="file.pdf"',
            },
        });
    } catch (err) {
        console.error("PDF generation error:", err);
        return NextResponse.json(
            { message: "PDF generation failed" },
            { status: 500 }
        );
    }
}
