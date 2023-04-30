import { sveltekit } from "@sveltejs/kit/vite";
import type { UserConfig } from "vite";
import { SvelteKitPWA } from "@vite-pwa/sveltekit";

const basePath = process.env.BASE_PATH ? `${process.env.BASE_PATH}/` : "/";

const config: UserConfig = {
	plugins: [
		sveltekit(),
		SvelteKitPWA({
			scope: "/",
			base: basePath,
			strategies: "generateSW",
			registerType: "autoUpdate",
			injectRegister: "auto",
			manifest: {
				name: "MidiMC",
				short_name: "MidiMC",
				scope: "/",
				start_url: basePath,
				display: "standalone",
				theme_color: "#302721",
				background_color: "#F0EAD2",
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
		}),
	],
};

export default config;
