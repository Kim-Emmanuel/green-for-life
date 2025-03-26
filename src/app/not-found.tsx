import Link from "next/link";
import { Button } from "@/components/ui/button";
// import { AlertTriangle } from "lucide-react";
import Image from "next/image";

export default function NotFound() {
	return (
		<div className="min-h-screen flex flex-col items-center justify-center bg-background p-4">
			<div className="text-center max-w-md w-full">
				<div className="flex justify-center mb-6">
					{/* <AlertTriangle className="w-24 h-24 text-destructive" /> */}

					<Image
						src="/not-found.svg"
						alt="Not Found"
						width={300}
						height={300}
						className="object-cover"
					/>
				</div>
				<h1 className="text-4xl font-bold mb-4 text-foreground">
					404 - Page Not Found
				</h1>
				<p className="text-muted-foreground mb-6">
					Oops! The page you are looking for seems to have wandered off into the
					digital wilderness.
				</p>
				<div className="flex justify-center space-x-4">
					<Button asChild variant="default" className="text-black">
						<Link href="/">Return to Home</Link>
					</Button>
					<Button asChild variant="outline">
						<Link href="/contact">Contact Support</Link>
					</Button>
				</div>
			</div>
		</div>
	);
}
