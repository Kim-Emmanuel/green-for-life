// app/api/upload/route.ts
import { NextRequest, NextResponse } from "next/server";
import fs from "fs/promises";
import path from "path";
import { v4 as uuidv4 } from "uuid";
import { existsSync } from "fs";

// Move this interface to a separate types file if possible
interface UploadResponse {
	url: string;
	filename: string;
	size: number;
	mimetype: string;
}

export async function POST(req: NextRequest) {
	try {
		// Create uploads directory if it doesn't exist
		const uploadDir = path.join(process.cwd(), "public/uploads");

		// Check if directory exists and is writable
		try {
			if (!existsSync(uploadDir)) {
				await fs.mkdir(uploadDir, { recursive: true });
				console.log("Created uploads directory:", uploadDir);
			}

			// Test write permissions
			const testFile = path.join(uploadDir, ".test");
			await fs.writeFile(testFile, "");
			await fs.unlink(testFile);
		} catch (dirError) {
			console.error("Directory error:", dirError);
			return NextResponse.json(
				{
					error: "Server configuration error - upload directory not accessible",
				},
				{ status: 500 }
			);
		}

		// Parse form data
		const formData = await req.formData();
		const file = formData.get("file") as File | null;

		if (!file) {
			return NextResponse.json({ error: "No file uploaded" }, { status: 400 });
		}

		console.log("Received file:", {
			name: file.name,
			type: file.type,
			size: file.size,
		});

		// Validate file type
		const allowedTypes = ["image/jpeg", "image/webp", "image/png", "image/gif"];
		if (!allowedTypes.includes(file.type)) {
			return NextResponse.json(
				{
					error: "Invalid file type. Only JPEG, WEBP, PNG, and GIF are allowed",
				},
				{ status: 400 }
			);
		}

		// Validate file size (5MB max)
		const maxSize = 5 * 1024 * 1024;
		if (file.size > maxSize) {
			return NextResponse.json(
				{ error: "File size exceeds 5MB limit" },
				{ status: 400 }
			);
		}

		// Generate unique filename
		const extension = path.extname(file.name);
		const filename = `${uuidv4()}${extension}`;
		const filePath = path.join(uploadDir, filename);

		// Write file to disk
		const buffer = Buffer.from(await file.arrayBuffer());
		await fs.writeFile(filePath, buffer);

		console.log("File saved successfully:", {
			path: filePath,
			size: buffer.length,
		});

		// Construct URL using environment variable or default path
		const baseUrl = (process.env.UPLOAD_URL || "public/uploads").replace(/\/$/, "");
		const url = `${baseUrl}/${filename}`;

		// Return the response
		const response: UploadResponse = {
			url,
			filename,
			size: file.size,
			mimetype: file.type,
		};

		console.log("Upload successful:", response);
		return NextResponse.json(response);
	} catch (error) {
		console.error("Upload error:", error);
		// Log additional error details if available
		if (error instanceof Error) {
			console.error("Error details:", {
				name: error.name,
				message: error.message,
				stack: error.stack,
			});
		}
		return NextResponse.json(
			{ error: "Internal server error during file upload" },
			{ status: 500 }
		);
	}
}

// // app/api/upload/route.ts
// import { NextRequest, NextResponse } from 'next/server'
// import fs from 'fs/promises'
// import path from 'path'
// import { v4 as uuidv4 } from 'uuid'
// import { existsSync } from 'fs'

// // Move this interface to a separate types file if possible
// interface UploadResponse {
//   url: string
//   filename: string
//   size: number
//   mimetype: string
// }

// export async function POST(req: NextRequest) {
//   try {
//     // Create uploads directory if it doesn't exist
//     const uploadDir = path.join(process.cwd(), 'public/uploads')

//     // Check if directory exists and is writable
//     try {
//       if (!existsSync(uploadDir)) {
//         await fs.mkdir(uploadDir, { recursive: true })
//         console.log('Created uploads directory:', uploadDir)
//       }

//       // Test write permissions
//       const testFile = path.join(uploadDir, '.test')
//       await fs.writeFile(testFile, '')
//       await fs.unlink(testFile)
//     } catch (dirError) {
//       console.error('Directory error:', dirError)
//       return NextResponse.json(
//         { error: 'Server configuration error - upload directory not accessible' },
//         { status: 500 }
//       )
//     }

//     // Parse form data
//     const formData = await req.formData()
//     const file = formData.get('file') as File | null

//     if (!file) {
//       return NextResponse.json(
//         { error: 'No file uploaded' },
//         { status: 400 }
//       )
//     }

//     console.log('Received file:', {
//       name: file.name,
//       type: file.type,
//       size: file.size
//     })

//     // Validate file type
//     const allowedTypes = ['image/jpeg', 'image/webp', 'image/png', 'image/gif']
//     if (!allowedTypes.includes(file.type)) {
//       return NextResponse.json(
//         { error: 'Invalid file type. Only JPEG, WEBP, PNG, and GIF are allowed' },
//         { status: 400 }
//       )
//     }

//     // Validate file size (5MB max)
//     const maxSize = 5 * 1024 * 1024
//     if (file.size > maxSize) {
//       return NextResponse.json(
//         { error: 'File size exceeds 5MB limit' },
//         { status: 400 }
//       )
//     }

//     // Generate unique filename
//     const extension = path.extname(file.name)
//     const filename = `${uuidv4()}${extension}`
//     const filePath = path.join(uploadDir, filename)

//     // Write file to disk
//     const buffer = Buffer.from(await file.arrayBuffer())
//     await fs.writeFile(filePath, buffer)

//     console.log('File saved successfully:', {
//       path: filePath,
//       size: buffer.length
//     })

//     // Construct URL path only - let Next.js handle the full URL construction
//     const url = `/uploads/${filename}`

//     // Return the response
//     const response: UploadResponse = {
//       url,
//       filename,
//       size: file.size,
//       mimetype: file.type
//     }

//     console.log('Upload successful:', response)
//     return NextResponse.json(response)

//   } catch (error) {
//     console.error('Upload error:', error)
//     // Log additional error details if available
//     if (error instanceof Error) {
//       console.error('Error details:', {
//         name: error.name,
//         message: error.message,
//         stack: error.stack
//       })
//     }
//     return NextResponse.json(
//       { error: 'Internal server error during file upload' },
//       { status: 500 }
//     )
//   }
// }
