"use client";

import Link from "next/link";
import { useState, useEffect, useRef } from "react";
import { Menu, X, ChevronDown, Phone, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { Leaf } from "lucide-react";

type DropdownItem = {
  label: string;
  href: string;
};

type NavItem = {
  label: string;
  href: string;
  dropdown?: DropdownItem[];
};

// Define navigation structure with dropdown capabilities
const NAV_ITEMS = [
	{
		label: "Home",
		href: "/",
	},
	{
		label: "About Us",
		href: "/about-us",
		dropdown: [
			{ label: "Our Story", href: "/about-us#history" },
			{ label: "Our Team", href: "/about-us#team" },
			{ label: "Core Values", href: "/about-us#values" },
			{ label: "Theory of Change", href: "/about-us#theory-of-change" },
		],
	},
	{
		label: "Our Work",
		href: "/our-work",
		dropdown: [
			{ label: "Agriculture & Forestry", href: "/our-work#agriculture" },
			{ label: "Climate Change & Resilience", href: "/our-work#climate" },
			{ label: "Environment and Biodiversity", href: "/our-work#environment" },
			{ label: "Green Energy", href: "/our-work#green" },
			{ label: "Research and Development", href: "/our-work#research" },
		],
	},
	{
		label: "Get Involved",
		href: "/get-involved",
		dropdown: [
			{ label: "Partner with Us", href: "/get-involved#partnership" },
			{ label: "Donate", href: "/get-involved#donate" },
			{ label: "Volunteer", href: "/get-involved#volunteer" },
			{ label: "Subscribe", href: "/get-involved#subscribe" },
		],
	},
	{
		label: "News & Updates",
		href: "/news-resources",
		dropdown: [
			{ label: "Blog", href: "/news-resources#blog" },
			{ label: "Publications", href: "/news-resources#publications" },
			{ label: "Impact Stories", href: "/news-resources#impact" },
			{ label: "Careers", href: "/news-resources#careers" },
		],
	},
	{
		label: "Contact",
		href: "/contact-us",
	},
];

// Animation variants for mobile menu and dropdown items
const mobileMenuVariants = {
	open: { opacity: 1, height: "auto" },
	closed: { opacity: 0, height: 0 },
};

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
            {item.dropdown.map((dropItem: DropdownItem) => (
              <Link
                key={dropItem.href}
                href={dropItem.href}
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

export default function Header() {
	const [isMenuOpen, setIsMenuOpen] = useState(false);
	const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
	const [isScrolled, setIsScrolled] = useState(false);
	const pathname = usePathname();

	// Handle scroll effect
	useEffect(() => {
		const handleScroll = () => {
			setIsScrolled(window.scrollY > 20);
		};
		window.addEventListener("scroll", handleScroll);
		return () => window.removeEventListener("scroll", handleScroll);
	}, []);

	// Reset menu state on route change
	useEffect(() => {
		setIsMenuOpen(false);
		setActiveDropdown(null);
	}, [pathname]);

	const DesktopDropdown = ({ item }: { item: NavItem }) => {
		const timeoutRef = useRef<NodeJS.Timeout | null>(null);
		const dropdownRef = useRef<HTMLDivElement>(null);
	
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
	
		if (!item.dropdown) return null;
	
		return (
			<div
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
							className="absolute bg-white rounded-lg shadow-lg mt-2 py-2 w-56 lg:w-64 xl:w-80 border border-green-100"
							onMouseEnter={handleDropdownEnter}
							onMouseLeave={handleDropdownLeave}
						>
							{item.dropdown.map((dropItem: DropdownItem) => (
								<Link
									key={dropItem.href}
									href={dropItem.href}
									className={cn(
										'block px-3 lg:px-3 xl:px-4 py-2 xl:py-3 text-xs lg:text-sm xl:text-base font-medium hover:bg-green-50 transition-colors',
										pathname === dropItem.href ? 'border-l-4 border-primary font-semibold' : ''
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

	return (
		<div className="sticky top-0 w-full z-50">
			<div className={cn(
				"w-full border-b transition-all duration-300",
				isScrolled ? "bg-[#156936]/95 backdrop-blur-sm" : "bg-[#156936]"
			)}>
				<div className="container mx-auto px-4 sm:px-6 lg:px-8">
					<div className="flex justify-between items-center py-2">
						{/* Office Locations - Hidden on mobile */}
						<div className="hidden md:flex flex-1 space-x-4">
							<div className="flex items-center space-x-2">
								<Phone className="h-4 w-4 text-white" />
								<div className="flex flex-row justify-center items-center">
									<a
										href="tel:+15551234567"
										className="text-white font-medium text-xs lg:text-sm hover:text-slate-300"
									>
										+211 911 967 112
									</a>
									<span className="mx-2 text-white">|</span>
									<a
										href="tel:+15559876543"
										className="text-white font-medium text-xs lg:text-sm hover:text-slate-300"
									>
										+211 923 700 314
									</a>
								</div>
							</div>

							<div className="flex items-center space-x-2">
								<Mail className="h-4 w-4 text-white" />
								<a
									href="mailto:info@greenforlife.org"
									className="text-white font-medium text-xs lg:text-sm hover:text-slate-300"
								>
									info@green4life.africa
								</a>
							</div>
						</div>

						{/* Social Media Icons */}
						<div className="flex items-center space-x-3 ml-auto brightness-0 invert">
							<Link
								href="https://www.facebook.com/profile.php?id=61553897036925"
								className="hover:scale-110 transition-transform"
							>
								<Image
									src="/icons/Facebook.svg"
									alt="Facebook"
									width={29}
									height={29}
									className="rounded-full p-1"
								/>
							</Link>
							<Link
								href="https://www.instagram.com/sunra_ysfoundation19/"
								className="hover:scale-110 transition-transform"
							>
								<Image
									src="/icons/Instagram.svg"
									alt="Instagram"
									width={29}
									height={29}
									className="rounded-full p-1"
								/>
							</Link>
							<Link
								href="https://www.linkedin.com/"
								className="hover:scale-110 transition-transform"
							>
								<Image
									src="/icons/Linkedin.svg"
									alt="LinkedIn"
									width={29}
									height={29}
									className="rounded-full p-1"
								/>
							</Link>
							<Link
								href="https://www.youtube.com/@SunRaysFoundation"
								className="hover:scale-110 transition-transform"
							>
								<Image
									src="/icons/Youtube.svg"
									alt="YouTube"
									width={29}
									height={29}
									className="rounded-full p-1"
								/>
							</Link>
						</div>
					</div>
				</div>
			</div>

			<div className={cn(
				"w-full transition-all duration-300",
				isScrolled ? "bg-white/95 backdrop-blur-sm border-b" : "bg-white"
			)}>
				<div className="container mx-auto px-4 sm:px-6 lg:px-8">
					<div className="flex items-center justify-between h-16 min-[1020px]:h-20">
						{/* Logo */}
						<Link
							href="/"
							className="flex items-center space-x-2"
							aria-label="Home"
						>
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

						{/* Desktop Navigation */}
						<nav className="hidden lg:flex items-center space-x-1 lg:space-x-1 xl:space-x-2">
							{NAV_ITEMS.map((item) =>
								item.dropdown ? (
									<DesktopDropdown key={item.label} item={item} />
								) : (
									<Link
										key={item.href}
										href={item.href}
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
								{/* <Button
									variant="ghost"
									className="text-sm lg:text-sm xl:text-base hover:bg-green-50"
								>
									Sign in
								</Button> */}
								<div className="h-6 w-[0.5px] bg-gray-600" />
								<Button className="text-sm lg:text-sm xl:text-base text-black whitespace-nowrap">
									Give
									<Leaf className="w-5 h-5 lg:w-6 lg:h-6 xl:w-8 xl:h-8" />
								</Button>
							</div>
						</nav>

						<div className="lg:hidden flex items-center space-x-2 sm:space-x-4">
							<Button
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
							</Button>
							<div className="h-6 w-[0.5px] bg-gray-600" />
							<Button className="text-base text-black lg:text-base">
								Give
								<Leaf className="w-8 h-8" />
							</Button>

							{/* Mobile Menu Button */}
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

					{/* Mobile Menu */}
					<AnimatePresence>
						{isMenuOpen && (
							<motion.div
								initial={{ opacity: 0, y: -20 }}
								animate={{ opacity: 1, y: 0 }}
								exit={{ opacity: 0, y: -20 }}
								transition={{ duration: 0.2 }}
								className="absolute top-full left-0 w-full bg-white lg:hidden max-h-[80vh] overflow-y-auto shadow-lg"
								variants={mobileMenuVariants}
							>
								{NAV_ITEMS.map((item) =>
									item.dropdown ? (
										<MobileDropdown key={item.label} item={item} />
									) : (
										<Link
											key={item.href}
											href={item.href}
											className={cn(
												"block p-4 border-b text-green-700 hover:bg-green-50 transition-colors",
												pathname === item.href
													? "border-b-2 border-green-700 font-semibold"
													: ""
											)}
											onClick={() => setIsMenuOpen(false)}
										>
											{item.label}
										</Link>
									)
								)}
								<div className="pt-4 space-y-2">
									<Button
										variant="ghost"
										className="w-full hover:bg-green-50 justify-start"
									>
										<Image
											src="/icons/avatar.svg"
											alt="Sign-in"
											width={15}
											height={15}
											className="w-5 h-5"
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
											className="w-5 h-5"
										/>
										Subscribe to Our Newsletter.
									</Button>
								</div>
							</motion.div>
						)}
					</AnimatePresence>
				</div>
			</div>
		</div>
	);
}
