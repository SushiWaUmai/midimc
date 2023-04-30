import { sveltekit } from "@sveltejs/kit/vite";
import { defineConfig } from "vite";
import { SvelteKitPWA } from "@vite-pwa/sveltekit";

export default defineConfig({
	plugins: [
		sveltekit(),
		SvelteKitPWA({
			registerType: "autoUpdate",
			injectRegister: "auto",
			manifest: {
				name: "MidiMC",
				short_name: "MidiMC",
				scope: ".",
				start_url: process.env.BASE_PATH ?? "/",
				icons: [
					{
						src: "icons/manifest-icon-192.maskable.png",
						sizes: "192x192",
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
				theme_color: "#F0EAD2",
				background_color: "#302721",
				display: "fullscreen",
				orientation: "portrait-primary",
			},
		}),
	],
});
