import { sveltekit } from "@sveltejs/kit/vite";
import { defineConfig } from "vite";
import { SvelteKitPWA } from "@vite-pwa/sveltekit";

export default defineConfig({
	plugins: [
		sveltekit(),
		SvelteKitPWA({
			srcDir: "./src",
			scope: "/",
			base: process.env.BASE_PATH ?? "/",
			manifest: {
				name: "MidiMC",
				short_name: "MidiMC",
				scope: ".",
				start_url: process.env.BASE_PATH ?? "/",
				display: "standalone",
				theme_color: "#F0EAD2",
				background_color: "#302721",
				icons: [
					{
						src: "icons/manifest-icon-192.maskable.png",
						sizes: "192x193",
						type: "image/png",
						purpose: "any",
					},
					{
						src: "icons/manifest-icon-192.maskable.png",
						sizes: "192x192",
						type: "image/png",
						purpose: "maskable",
					},
					{
						src: "icons/manifest-icon-512.maskable.png",
						sizes: "512x512",
						type: "image/png",
						purpose: "any",
					},
					{
						src: "icons/manifest-icon-512.maskable.png",
						sizes: "512x512",
						type: "image/png",
						purpose: "maskable",
					},
				],
			},
			injectManifest: {
				globPatterns: ["client/**/*.{js,css,ico,png,svg,webp,woff,woff2}"],
			},
			workbox: {
				globPatterns: ["client/**/*.{js,css,ico,png,svg,webp,woff,woff2}"],
			},
		}),
	],
});
