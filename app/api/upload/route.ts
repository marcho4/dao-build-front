import { writeFile } from 'fs/promises';
import { NextRequest, NextResponse } from 'next/server';
import path from 'path';

export async function POST(request: NextRequest) {
    try {
        const formData = await request.formData();
        const file = formData.get('file') as File;
        const api_name = formData.get('api_name') as string;

        if (!file) {
            return NextResponse.json(
                { msg: 'No file uploaded' },
                { status: 400 }
            );
        }

        if (!api_name) {
            return NextResponse.json(
                { msg: 'No api_name provided' },
                { status: 400 }
            );
        }

        if (!file.type.startsWith('image/')) {
            return NextResponse.json(
                { msg: 'Only images are allowed' },
                { status: 400 }
            );
        }

        const filename = api_name + ".png";

        // Путь для сохранения в public
        const publicPath = path.join(process.cwd(), 'public');
        const filePath = path.join(publicPath, filename);

        // Конвертируем File в Buffer
        const bytes = await file.arrayBuffer();
        const buffer = Buffer.from(bytes);

        // Сохраняем файл
        await writeFile(filePath, buffer);

        // Возвращаем путь к файлу (относительно public)
        return NextResponse.json({
            url: `/${filename}.png`,
            success: true
        });

    } catch (error) {
        console.error('Upload error:', error);
        return NextResponse.json(
            { error: 'Upload failed' },
            { status: 500 }
        );
    }
}