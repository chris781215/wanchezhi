import { NextResponse } from 'next/server';
import { writeFile, mkdir } from 'fs/promises';
import { join } from 'path';

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const files = formData.getAll('images') as File[];

    if (!files || files.length === 0) {
      return NextResponse.json({ success: false, error: '没有上传图片' }, { status: 400 });
    }

    if (files.length > 9) {
      return NextResponse.json({ success: false, error: '最多上传 9 张图片' }, { status: 400 });
    }

    // Ensure upload directory exists
    const uploadDir = join(process.cwd(), 'public', 'uploads');
    await mkdir(uploadDir, { recursive: true });

    const urls: string[] = [];

    for (const file of files) {
      if (!file.type.startsWith('image/')) {
        continue;
      }

      // Generate unique filename
      const ext = file.name.split('.').pop() || 'jpg';
      const filename = `${Date.now()}-${Math.random().toString(36).slice(2, 8)}.${ext}`;
      const filepath = join(uploadDir, filename);

      // Read and write file
      const bytes = await file.arrayBuffer();
      const buffer = Buffer.from(bytes);
      await writeFile(filepath, buffer);

      urls.push(`/uploads/${filename}`);
    }

    return NextResponse.json({ success: true, data: { urls } });
  } catch (error) {
    console.error('Upload error:', error);
    return NextResponse.json({ success: false, error: '上传失败' }, { status: 500 });
  }
}
