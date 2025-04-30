"use client";

import Link from "next/link";
import { useState, useEffect, useRef } from "react";
import { Menu, X, ChevronDown, Phone, Mail, Leaf } from "lucide-react";
import { Button } from "@/components/ui/button";
import { usePathname } from "next/navigation";
import { cn, smoothScroll } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

type DropdownItem = {
	label: string;
	href: string;
};

type NavItem = {
	label: string;
	href: string;
	dropdown?: DropdownItem[];
};

// Animation variants
// const mobileMenuVariants = {
// 	open: { opacity: 1, height: "auto" },
// 	closed: { opacity: 0, height: 0 },
// };

const dropdownVariants = {
	open: {
		opacity: 1,
		y: 0,
		transition: { type: "spring", stiffness: 300, damping: 24 },
	},
	closed: {
		opacity: 0,
		y: -10,
		transition: { duration: 0.2 },
	},
};

// Navigation structure
const NAV_ITEMS: NavItem[] = [
	{
		label: "Home",
		href: "/",
	},
	{
		label: "About Us",
		href: "/about-us",
		dropdown: [
			{ label: "Who We Are", href: "/about-us" },
			{ label: "History", href: "/about-us#history" },
			{ label: "Team", href: "/about-us#team" },
			{ label: "Core Values", href: "/about-us#values" },
			{ label: "Theory of Change", href: "/about-us#theory-of-change" },
		],
	},
	{
		label: "Our Work",
		href: "/our-work",
		dropdown: [
			{ label: "Agriculture and Forestry", href: "/our-work#agriculture" },
			{ label: "Climate Change and Resilience", href: "/our-work#climate" },
			{ label: "Environment and Biodiversity", href: "/our-work#environment" },
			{ label: "Green Energy", href: "/our-work#green" },
			{ label: "Research and Development", href: "/our-work#research" },
		],
	},
	{
		label: "Get Involved",
		href: "/get-involved",
		dropdown: [
			{ label: "Partner with Us", href: "/get-involved#program-partnership" },
			{ label: "Donate", href: "/get-involved#program-donation" },
			{ label: "Volunteer", href: "/get-involved#program-volunteer" },
			{ label: "Subscribe", href: "/get-involved#program-subscribe" },
		],
	},
	{
		label: "News & Updates",
		href: "/news-resources",
		dropdown: [
			{ label: "Blog", href: "/news-resources#blog" },
			{ label: "Publications", href: "/news-resources#publications" },
			{ label: "Impact Stories", href: "/news-resources#impact" },
			{ label: "Tenders", href: "/news-resources#tenders"},
			{ label: "Careers", href: "/news-resources#careers" },
		],
	},
	{
		label: "Contact",
		href: "/contact-us",
	},
];

const handleNavClick = (
	e: React.MouseEvent<HTMLAnchorElement>,
	href: string
) => {
	const isHashLink = href.startsWith("#");
	if (isHashLink) {
		e.preventDefault();
		smoothScroll(href);
	}
};

// Components
const MobileDropdown = ({ item }: { item: NavItem }) => {
	const [isOpen, setIsOpen] = useState(false);
	const pathname = usePathname();

	if (!item.dropdown) return null;

	return (
		<div>
			<button
				onClick={() => setIsOpen(!isOpen)}
				className="w-full text-left flex justify-between items-center p-4 border-b hover:bg-green-50 transition-colors"
				aria-expanded={isOpen}
				aria-haspopup="true"
			>
				{item.label}
				<ChevronDown
					className={cn(
						"h-5 w-5 transition-transform duration-200",
						isOpen ? "rotate-180" : ""
					)}
				/>
			</button>
			<AnimatePresence>
				{isOpen && (
					<motion.div
						initial={{ opacity: 0, height: 0 }}
						animate={{ opacity: 1, height: "auto" }}
						exit={{ opacity: 0, height: 0 }}
						transition={{ duration: 0.2 }}
						className="pl-4 overflow-hidden"
					>
						{item.dropdown?.map((dropItem: DropdownItem) => (
							<Link
								key={dropItem.href}
								href={dropItem.href}
								onClick={(e) => handleNavClick(e, dropItem.href)}
								className={cn(
									"block p-4 border-b text-green-700 hover:bg-green-50 transition-colors",
									pathname === dropItem.href
										? "border-b-2 border-green-700 font-semibold"
										: ""
								)}
							>
								{dropItem.label}
							</Link>
						))}
					</motion.div>
				)}
			</AnimatePresence>
		</div>
	);
};

const DesktopDropdown = ({ item }: { item: NavItem }) => {
	const timeoutRef = useRef<NodeJS.Timeout | null>(null);
	const dropdownRef = useRef<HTMLDivElement>(null);
	const [hoveredItem, setHoveredItem] = useState<DropdownItem | null>(null);
	const containerRef = useRef<HTMLDivElement>(null);
	const [dropdownStyle, setDropdownStyle] = useState<React.CSSProperties>({});
	const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
	const pathname = usePathname();

	// Calculate available space and adjust dropdown width
	useEffect(() => {
		const calculatePosition = () => {
			if (containerRef.current && dropdownRef.current) {
				const containerRect = containerRef.current.getBoundingClientRect();
				const viewportWidth = window.innerWidth;
				const padding = 32; // Match container padding

				// Calculate maximum available width
				const maxWidth = viewportWidth - 2 * padding;
				const calculatedWidth = Math.min(600, maxWidth);

				// Check if dropdown overflows to the right
				const rightSpace = viewportWidth - containerRect.right;
				const leftAdjustment =
					rightSpace < calculatedWidth ? calculatedWidth - rightSpace : 0;

				setDropdownStyle({
					width: `${calculatedWidth}px`,
					left: `-${leftAdjustment}px`,
				});
			}
		};

		if (activeDropdown === item.label) {
			calculatePosition();
			window.addEventListener("resize", calculatePosition);
		}

		return () => window.removeEventListener("resize", calculatePosition);
	}, [activeDropdown, item.label]);

	const handleParentLeave = (e: React.MouseEvent) => {
		const isMovingToDropdown = dropdownRef.current?.contains(
			e.relatedTarget as Node
		);
		if (!isMovingToDropdown) {
			timeoutRef.current = setTimeout(() => {
				setActiveDropdown(null);
			}, 300);
		}
	};

	const handleDropdownEnter = () => {
		if (timeoutRef.current) {
			clearTimeout(timeoutRef.current);
			timeoutRef.current = null;
		}
		setActiveDropdown(item.label);
	};

	const handleDropdownLeave = () => {
		timeoutRef.current = setTimeout(() => {
			setActiveDropdown(null);
		}, 300);
	};

	const getPreviewContent = (label: string) => {
		switch (label) {
			case "Who We Are":
				return "Discover our journey and achievements shaping environmental conservation.";
			case "History":
				return "Explore the milestones and accomplishments of our organization. Our Mission and Vision.";
			case "Team":
				return "Meet our passionate team of sustainability experts.";
			case "Core Values":
				return "Learn about the principles guiding our environmental efforts.";
			case "Theory of Change":
				return "Understand our framework for creating lasting impact.";
			case "Agriculture and Forestry":
				return "Explore sustainable farming and forest management solutions.";
			case "Climate Change and Resilience":
				return "Strategies for combating climate challenges.";
			case "Environment and Biodiversity":
				return "Protecting ecosystems and preserving biodiversity.";
			case "Green Energy":
				return "Innovative renewable energy solutions for a cleaner future.";
			case "Research and Development":
				return "Cutting-edge research driving sustainable innovation. Our commitment to excellence.";
			case "Partner with Us":
				return "Collaborate with us to amplify environmental impact.";
			case "Donate":
				return "Support our mission through financial contributions.";
			case "Volunteer":
				return "Join hands with our dedicated volunteer community.";
			case "Subscribe":
				return "Stay updated with our latest initiatives and news.";
			case "Blog":
				return "Insights and stories from our environmental journey.";
			case "Publications":
				return "Access our research and policy documents.";
			case "Impact Stories":
				return "Real-world success stories of our interventions.";
			case "Tenders":
				return "Explore our current tenders and opportunities.";
			case "Careers":
				return "Join our team of environmental champions.";
			default:
				return "Explore our initiatives for sustainable development.";
		}
	};
	// if (!item.dropdown) return null;
	return (
		<div
			ref={containerRef}
			className="group relative"
			onMouseEnter={() => {
				setActiveDropdown(item.label);
				if (timeoutRef.current) {
					clearTimeout(timeoutRef.current);
					timeoutRef.current = null;
				}
			}}
			onMouseLeave={handleParentLeave}
		>
			<button
				className={cn(
					"flex items-center gap-1 px-2 lg:px-3 xl:px-4 py-2 rounded-md text-sm lg:text-sm xl:text-base font-medium transition-all duration-200 hover:bg-green-50",
					pathname.startsWith(item.href)
						? "border-b-2 border-primary font-semibold"
						: ""
				)}
				aria-expanded={activeDropdown === item.label}
				aria-haspopup="true"
			>
				{item.label}
				<ChevronDown className="w-3 h-3 lg:w-4 lg:h-4 transition-transform duration-200 group-hover:rotate-180" />
			</button>

			<AnimatePresence>
				{activeDropdown === item.label && (
					<motion.div
						ref={dropdownRef}
						variants={dropdownVariants}
						initial="closed"
						animate="open"
						exit="closed"
						className="absolute bg-white rounded-lg shadow-lg mt-2 py-2 border border-green-700/50 flex flex-col md:flex-row"
						style={dropdownStyle}
						onMouseEnter={handleDropdownEnter}
						onMouseLeave={handleDropdownLeave}
					>
						<div className="w-full md:w-1/2 border-b md:border-r border-green-700/50 overflow-y-auto max-h-[70vh] md:max-h-none">
							{item.dropdown?.map((dropItem: DropdownItem) => (
								<Link
									key={dropItem.href}
									href={dropItem.href}
									onClick={(e) => handleNavClick(e, dropItem.href)}
									onMouseEnter={() => setHoveredItem(dropItem)}
									onMouseLeave={() => setHoveredItem(null)}
									className={cn(
										"block px-4 py-3 text-sm font-medium hover:bg-green-50 transition-colors",
										pathname === dropItem.href
											? "border-l-4 border-primary font-semibold"
											: ""
									)}
								>
									{dropItem.label}
								</Link>
							))}
						</div>

						<div className="w-full md:w-1/2 p-4 min-h-[200px] md:min-h-auto overflow-y-auto">
							<AnimatePresence mode="wait">
								{hoveredItem ? (
									<motion.div
										key={hoveredItem.label}
										initial={{ opacity: 0, x: 10 }}
										animate={{ opacity: 1, x: 0 }}
										exit={{ opacity: 0, x: -10 }}
										transition={{ duration: 0.2 }}
										className="h-full"
									>
										<h3 className="text-lg font-semibold mb-2 text-green-800">
											{hoveredItem.label}
										</h3>
										<p className="text-sm text-gray-600">
											{getPreviewContent(hoveredItem.label)}
										</p>
									</motion.div>
								) : (
									<motion.div
										initial={{ opacity: 0 }}
										animate={{ opacity: 1 }}
										className="text-sm text-gray-500 h-full flex items-center justify-center text-center"
									>
										Hover over menu items to preview content
									</motion.div>
								)}
							</AnimatePresence>
						</div>
					</motion.div>
				)}
			</AnimatePresence>
		</div>
	);
};

const TopBar = () => (
	<div className="w-full bg-[#156936]">
		<div className="container mx-auto px-4 sm:px-6 lg:px-8">
			<div className="flex justify-between items-center py-2">
				<div className="hidden md:flex flex-1 space-x-4">
					<div className="flex items-center space-x-2">
						<Phone className="h-4 w-4 text-white" />
						<div className="flex flex-row justify-center items-center">
							<a
								href="tel:+211911967112"
								className="text-white font-medium text-xs lg:text-sm hover:text-slate-300"
							>
								+211 911 967 112
							</a>
							<span className="mx-2 text-white">|</span>
							<a
								href="tel:+211923700314"
								className="text-white font-medium text-xs lg:text-sm hover:text-slate-300"
							>
								+211 923 700 314
							</a>
						</div>
					</div>
					<div className="flex items-center space-x-2">
						<Mail className="h-4 w-4 text-white" />
						<a
							href="mailto:info@green4life.africa"
							className="text-white font-medium text-xs lg:text-sm hover:text-slate-300"
						>
							info@green4life.africa
						</a>
					</div>
				</div>
				<div className="flex items-center space-x-3 ml-auto brightness-0 invert">
					<SocialLinks />
				</div>
			</div>
		</div>
	</div>
);

const SocialLinks = () => (
	<>
		{[
			{
				href: "https://www.facebook.com/profile.php?id=61553897036925",
				icon: "Facebook",
			},
			{
				href: "https://www.instagram.com/g4l/",
				icon: "Instagram",
			},
			{ href: "https://www.linkedin.com/", icon: "Linkedin" },
			{ href: "https://www.youtube.com/@g4l", icon: "Youtube" },
		].map(({ href, icon }) => (
			<Link
				key={icon}
				href={href}
				className="hover:scale-110 transition-transform"
			>
				<Image
					src={`/icons/${icon}.svg`}
					alt={icon}
					width={29}
					height={29}
					className="rounded-full p-1"
				/>
			</Link>
		))}
	</>
);

const Logo = () => (
	<Link href="/" className="flex items-center space-x-2" aria-label="Home">
		<motion.div
			whileHover={{ scale: 1.05 }}
			transition={{ type: "spring", stiffness: 300 }}
			className="relative w-[100px] h-[60px] md:w-[110px] md:h-[70px] lg:w-[130px] lg:h-[80px]"
		>
			<Image
				src="/green-for-life.svg"
				alt="Green For Life"
				width={130}
				height={80}
				priority
				className="object-contain"
			/>
		</motion.div>
	</Link>
);

export default function Header() {
	const [isMenuOpen, setIsMenuOpen] = useState(false);
	const [isScrolled, setIsScrolled] = useState(false);
	const pathname = usePathname();

	useEffect(() => {
		const handleScroll = () => {
			if (typeof window !== "undefined") {
				setIsScrolled(window.scrollY > 20);
			}
		};
		window.addEventListener("scroll", handleScroll);
		return () => window.removeEventListener("scroll", handleScroll);
	}, []);

	useEffect(() => {
		setIsMenuOpen(false);
	}, [pathname]);

	return (
		<>
			<TopBar />
			<div className="sticky top-0 w-full z-50">
				<div
					className={cn(
						"w-full transition-all duration-300",
						isScrolled ? "bg-white/95 backdrop-blur-sm border-b" : "bg-white"
					)}
				>
					<div className="container mx-auto px-4 sm:px-6 lg:px-8">
						<div className="flex items-center justify-between h-16 min-[1020px]:h-20">
							<Logo />

							<nav className="hidden lg:flex items-center space-x-1 lg:space-x-1 xl:space-x-2">
								{NAV_ITEMS.map((item) =>
									item.dropdown ? (
										<DesktopDropdown key={item.label} item={item} />
									) : (
										<Link
											key={item.href}
											href={item.href}
											onClick={(e) => handleNavClick(e, item.href)}
											className={cn(
												"px-2 lg:px-3 xl:px-4 py-2 rounded-md text-sm lg:text-sm xl:text-base font-medium transition-all duration-200 hover:bg-green-50",
												pathname === item.href
													? "border-b-2 border-primary font-semibold"
													: ""
											)}
										>
											{item.label}
										</Link>
									)
								)}
								<div className="ml-2 lg:ml-3 xl:ml-4 flex items-center space-x-2 lg:space-x-3 xl:space-x-4">
									<div className="h-6 w-[0.5px] bg-gray-600" />
									<Button className="text-sm lg:text-sm xl:text-base text-white whitespace-nowrap">
										Give
										<Leaf className="w-5 h-5 lg:w-6 lg:h-6 xl:w-8 xl:h-8" />
									</Button>
								</div>
							</nav>

							<div className="lg:hidden flex items-center space-x-2 sm:space-x-4">
								{/* <Button
									variant="ghost"
									className="text-base lg:text-base hover:bg-green-50"
								>
									<span className="hidden sm:inline">Sign in</span>
									<Image
										src="/icons/avatar.svg"
										alt="Sign in"
										width={15}
										height={15}
										className="w-5 h-5 sm:ml-2"
									/>
								</Button> */}
								<div className="h-6 w-[0.5px] bg-white" />
								<Button className="text-base text-white lg:text-base">
									Give
									<Leaf className="w-8 h-8" />
								</Button>

								<button
									onClick={() => setIsMenuOpen(!isMenuOpen)}
									className="lg:hidden p-2 rounded-md hover:bg-green-50 transition-colors"
									aria-expanded={isMenuOpen}
									aria-label="Toggle menu"
								>
									<motion.div
										animate={{ rotate: isMenuOpen ? 90 : 0 }}
										transition={{ duration: 0.2 }}
									>
										{isMenuOpen ? (
											<X className="w-6 h-6" />
										) : (
											<Menu className="w-6 h-6" />
										)}
									</motion.div>
								</button>
							</div>
						</div>

						<AnimatePresence>
							{isMenuOpen && (
								<motion.div
									initial={{ opacity: 0, y: -20 }}
									animate={{ opacity: 1, y: 0 }}
									exit={{ opacity: 0, y: -20 }}
									transition={{ duration: 0.2 }}
									className="absolute top-full left-0 w-full bg-white lg:hidden max-h-[80vh] overflow-y-auto shadow-lg"
								>
									{NAV_ITEMS.map((item) =>
										item.dropdown ? (
											<MobileDropdown key={item.label} item={item} />
										) : (
											<Link
												key={item.href}
												href={item.href}
												onClick={(e) => {
													handleNavClick(e, item.href);
													setIsMenuOpen(false);
												}}
												className={cn(
													"block p-4 border-b text-green-700 hover:bg-green-50 transition-colors",
													pathname === item.href
														? "border-b-2 border-green-700 font-semibold"
														: ""
												)}
											>
												{item.label}
											</Link>
										)
									)}
									<div className="pt-4 space-y-2 px-4 pb-4">
										<Button
											variant="ghost"
											className="w-full hover:bg-green-50 justify-start"
										>
											<Image
												src="/icons/avatar.svg"
												alt="Sign-in"
												width={15}
												height={15}
												className="w-5 h-5 mr-2"
											/>
											Sign in
										</Button>
										<Button
											variant="ghost"
											className="w-full hover:bg-green-50 justify-start"
										>
											<Image
												src="/icons/envelope-closed.svg"
												alt="Subscribe"
												width={15}
												height={15}
												className="w-5 h-5 mr-2"
											/>
											Subscribe to Our Newsletter
										</Button>
									</div>
								</motion.div>
							)}
						</AnimatePresence>
					</div>
				</div>
			</div>
		</>
	);
}
