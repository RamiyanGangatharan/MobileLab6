import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import ejsPlugin from '@11ty/eleventy-plugin-ejs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default function(eleventyConfig) {
    const OUTPUT = "dist";
    const INPUT = "src";
    
    eleventyConfig.addPlugin(ejsPlugin);
    eleventyConfig.setTemplateFormats(["md", "ejs", "njk"]);
    eleventyConfig.addPassthroughCopy("./src/img");
    eleventyConfig.addPassthroughCopy("404.ejs");

    // Cleanup
    eleventyConfig.on("eleventy.before", () => {
        const outputDirectory = path.join(__dirname, OUTPUT);
        if (fs.existsSync(outputDirectory)) {fs.rmSync(outputDirectory, { recursive: true, force: true });}
    });

    return { dir: { output: OUTPUT, input: INPUT } };
}
