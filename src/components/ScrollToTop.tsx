"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { ChevronUp } from "lucide-react";
import throttle from 'lodash.throttle';

const ScrollToTop = () => {
	const [isVisible, setIsVisible] = useState(false);
	const throttledToggleVisibility = useRef(
		throttle(() => {
			setIsVisible(window.scrollY > 200);
		}, 100)
	);

	const scrollToTop = useCallback(() => {
		window.scrollTo({
			top: 0,
			behavior: "smooth",
		});
	}, []);

	useEffect(() => {
		window.addEventListener("scroll", throttledToggleVisibility.current);
		return () => {
			window.removeEventListener("scroll", throttledToggleVisibility.current);
			throttledToggleVisibility.current.cancel();
		};
	}, []);

	return (
		<button
			aria-label="Scroll to top"
			onClick={scrollToTop}
			className={`fixed z-50 bottom-6 right-6 md:bottom-8 md:right-8 p-3 rounded-full shadow-2xl
        transition-opacity duration-200 ease-linear
        transition-transform duration-500 ease-out-back
        transform-gpu backdrop-blur-sm border border-white/10
        group focus:outline-none focus:ring-2 focus:ring-green-400/30
        ${
					isVisible
						? "opacity-100 scale-100"
						: "opacity-0 scale-50 pointer-events-none"
				}
        bg-gradient-to-br from-green-500/90 to-green-600/90 hover:from-green-600/90 hover:to-green-700/90
        hover:scale-110 active:scale-95`}
		>
			<ChevronUp className="w-6 h-6 text-white transition-transform duration-300 group-hover:-translate-y-0.5 drop-shadow-sm" />
		</button>
	);
};

export default ScrollToTop;
