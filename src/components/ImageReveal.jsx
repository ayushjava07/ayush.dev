import React, { useRef, useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { Instagram, Linkedin, Twitter } from 'lucide-react';
import altman1 from '../assets/altman1.png';
import altman2 from '../assets/altman2.png';

export default function ImageReveal() {
    const containerRef = useRef(null);
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    // Smooth springs for the main cursor
    const springConfig = { damping: 20, stiffness: 150 };
    const smoothX = useSpring(mouseX, springConfig);
    const smoothY = useSpring(mouseY, springConfig);

    // Trailing springs for the blob tail effect
    // We'll create a few trailing points with increasing delay/dampening
    const trail1X = useSpring(mouseX, { damping: 30, stiffness: 120 });
    const trail1Y = useSpring(mouseY, { damping: 30, stiffness: 120 });

    const trail2X = useSpring(mouseX, { damping: 40, stiffness: 100 });
    const trail2Y = useSpring(mouseY, { damping: 40, stiffness: 100 });

    const trail3X = useSpring(mouseX, { damping: 50, stiffness: 80 });
    const trail3Y = useSpring(mouseY, { damping: 50, stiffness: 80 });

    useEffect(() => {
        const handleMouseMove = (e) => {
            // clientX/Y are better for full screen fixed/absolute
            mouseX.set(e.clientX);
            mouseY.set(e.clientY);
        };

        window.addEventListener('mousemove', handleMouseMove);
        return () => window.removeEventListener('mousemove', handleMouseMove);
    }, [mouseX, mouseY]);

    // Parallax for text (shifts opposite to mouse)
    const parallaxX = useTransform(smoothX, [0, window.innerWidth], [15, -15]);
    const parallaxY = useTransform(smoothY, [0, window.innerHeight], [15, -15]);

    return (
        <div ref={containerRef} className="relative w-full h-screen overflow-hidden bg-white cursor-none">

            {/* Background Image (Base) - Image 1 */}
            <div className="absolute inset-0 z-0">
                <img src={altman1} alt="Sam Altman Base" className="w-full h-full object-cover grayscale" />
            </div>

            {/* Revealed Image (Top) - Image 2 masked by Blob */}
            {/* We use an SVG mask to achieve the organic goo effect */}
            <div className="absolute inset-0 z-10 pointer-events-none">
                <svg className="w-full h-full absolute inset-0">
                    <defs>
                        <filter id="goo">
                            <feGaussianBlur in="SourceGraphic" stdDeviation="15" result="blur" />
                            <feColorMatrix in="blur" mode="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 22 -9" result="goo" />
                            <feComposite in="SourceGraphic" in2="goo" operator="atop" />
                        </filter>

                        <mask id="blob-mask">
                            <rect width="100%" height="100%" fill="black" />
                            <g filter="url(#goo)">
                                {/* Main Blob */}
                                <motion.circle cx={smoothX} cy={smoothY} r="180" fill="white" />

                                {/* Trailing Blobs */}
                                <motion.circle cx={trail1X} cy={trail1Y} r="140" fill="white" />
                                <motion.circle cx={trail2X} cy={trail2Y} r="100" fill="white" />
                                <motion.circle cx={trail3X} cy={trail3Y} r="60" fill="white" />
                            </g>
                        </mask>
                    </defs>
                </svg>

                {/* The Image that gets revealed through the mask */}
                <div className="absolute inset-0 w-full h-full" style={{ mask: 'url(#blob-mask)', WebkitMask: 'url(#blob-mask)' }}>
                    <img src={altman2} alt="Sam Altman Reveal" className="w-full h-full object-cover" />
                    {/* Overlay some subtle color or effect if needed */}
                </div>
            </div>

            {/* Subtle Background Wave Lines (behind text, on top of base image?) 
          Actually user said "background... wave lines". 
          Let's put them deep in z-index but reacting to mouse. 
      */}
            <svg className="absolute inset-0 z-0 opacity-20 pointer-events-none overflow-hidden">
                <motion.path
                    d="M0,500 Q400,400 800,500 T1600,500"
                    stroke="black" strokeWidth="2" fill="none"
                    style={{ pathLength: smoothX }} // Just a random reaction example
                />
                {/* We can make a more complex wave if needed */}
            </svg>


            {/* Content Layer with mix-blend-mode: difference for auto-inverting text */}
            <motion.div
                className="absolute inset-0 z-30 flex flex-col justify-between p-12 pointer-events-none mix-blend-difference text-white"
                style={{ x: parallaxX, y: parallaxY }}
            >
                {/* Header */}
                <div className="flex justify-between items-start w-full">
                    {/* Name */}
                    <div className="font-serif text-8xl font-bold leading-tight tracking-tighter">
                        <div>Sam</div>
                        <div>Altman</div>
                    </div>

                    {/* OpenAI Link */}
                    <a
                        href="https://openai.com"
                        target="_blank"
                        rel="noreferrer"
                        className="font-sans text-xl font-medium tracking-wide uppercase hover:underline pointer-events-auto cursor-pointer"
                    >
                        OpenAI
                    </a>
                </div>

                {/* Footer */}
                <div className="flex justify-end items-end w-full">
                    <div className="flex space-x-8">
                        <a href="#" className="pointer-events-auto hover:opacity-80 transition-opacity">
                            <Instagram size={32} fill="currentColor" />
                        </a>
                        <a href="#" className="pointer-events-auto hover:opacity-80 transition-opacity">
                            <Twitter size={32} fill="currentColor" />
                        </a>
                        <a href="#" className="pointer-events-auto hover:opacity-80 transition-opacity">
                            <Linkedin size={32} fill="currentColor" />
                        </a>
                    </div>
                </div>

            </motion.div>

        </div>
    );
}
