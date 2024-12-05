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
    eleventyConfig.addPassthroughCopy("src/blogpost/data.json");

    // Load JSON data for blog posts
    eleventyConfig.addCollection("blogPosts", function() {
        const dataPath = path.join(__dirname, "src/blogpost/data.json");
        const rawData = fs.readFileSync(dataPath, 'utf-8');
        const jsonData = JSON.parse(rawData);
        return jsonData.data; // Assuming your JSON data is under the "data" key
    });

    // Cleanup
    eleventyConfig.on("eleventy.before", () => {
        const outputDirectory = path.join(__dirname, OUTPUT);
        if (fs.existsSync(outputDirectory)) {
            fs.rmSync(outputDirectory, { recursive: true, force: true });
        }
    });

    return { dir: { output: OUTPUT, input: INPUT } };
}
